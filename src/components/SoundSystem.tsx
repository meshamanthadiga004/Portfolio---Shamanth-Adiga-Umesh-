"use client";

import { useEffect } from "react";
import { theme } from "@/content/theme";

/**
 * Synthesised UI sound. Renders nothing — it only wires up listeners.
 *
 * All sounds are generated with the Web Audio API, so there is nothing to
 * download and no copyrighted audio involved. The selection blip is built to
 * sit in the same family as a console menu select: a bright square-wave click
 * with a fast downward pitch drop. The scroll tick models a mouse wheel
 * detent — a very short filtered noise burst.
 *
 * Browsers refuse to start audio until the visitor interacts with the page,
 * so the context is created lazily on the first gesture. The intro chord
 * plays at that moment, not on load. That is a platform rule, not a choice.
 *
 * Tuning lives in theme.ts under `audio`.
 */
export default function SoundSystem() {
  const cfg = theme.audio;

  useEffect(() => {
    if (!cfg.enabled) return;

    let ac: AudioContext | null = null;
    let noise: AudioBuffer | null = null;
    let introDone = false;
    let lastScroll = 0;

    const ctx = () => {
      if (!ac) {
        const AC =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!AC) return null;
        ac = new AC();

        /* One short white-noise buffer, reused for every mechanical tick. */
        const len = Math.floor(ac.sampleRate * 0.05);
        noise = ac.createBuffer(1, len, ac.sampleRate);
        const data = noise.getChannelData(0);
        for (let i = 0; i < len; i++) {
          data[i] = (Math.random() * 2 - 1) * (1 - i / len);
        }
      }
      if (ac.state === "suspended") void ac.resume();
      return ac;
    };

    /** Pitched blip with an optional glide, for menu-style selects. */
    const blip = (
      from: number,
      to: number,
      dur: number,
      gain: number,
      type: OscillatorType = "square",
      delay = 0
    ) => {
      const a = ctx();
      if (!a) return;
      const t0 = a.currentTime + delay;
      const osc = a.createOscillator();
      const amp = a.createGain();
      const lp = a.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 3200;
      osc.type = type;
      osc.frequency.setValueAtTime(from, t0);
      if (to !== from) osc.frequency.exponentialRampToValueAtTime(to, t0 + dur);
      amp.gain.setValueAtTime(0.0001, t0);
      amp.gain.exponentialRampToValueAtTime(
        Math.max(0.0002, gain * cfg.volume),
        t0 + 0.006
      );
      amp.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(lp).connect(amp).connect(a.destination);
      osc.start(t0);
      osc.stop(t0 + dur + 0.02);
    };

    /** Short filtered noise burst — the mouse-wheel detent. */
    const tick = (gain: number, freq: number) => {
      const a = ctx();
      if (!a || !noise) return;
      const t0 = a.currentTime;
      const src = a.createBufferSource();
      const bp = a.createBiquadFilter();
      const amp = a.createGain();
      src.buffer = noise;
      bp.type = "bandpass";
      bp.frequency.value = freq;
      bp.Q.value = 6;
      amp.gain.setValueAtTime(gain * cfg.volume, t0);
      amp.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.05);
      src.connect(bp).connect(amp).connect(a.destination);
      src.start(t0);
    };

    /* Voices ---------------------------------------------------------------- */

    // Console-menu select: bright click that drops in pitch.
    const playSelect = () => blip(1180, 620, 0.085, 0.5);

    // Rising fifth, played once when the visitor first interacts.
    const playIntro = () => {
      blip(392.0, 392.0, 1.3, 0.34, "sine", 0);
      blip(587.33, 587.33, 1.3, 0.24, "sine", 0.09);
      blip(783.99, 783.99, 1.6, 0.17, "sine", 0.2);
    };

    const playScroll = () => tick(0.5, 2400);

    /* Wiring ---------------------------------------------------------------- */

    const onFirstGesture = () => {
      if (introDone) return;
      introDone = true;
      if (cfg.intro) playIntro();
    };

    const onPointerDown = (e: PointerEvent) => {
      onFirstGesture();
      if (!cfg.click) return;
      if ((e.target as HTMLElement)?.closest("a,button")) playSelect();
    };

    window.addEventListener("pointerdown", onPointerDown);

    let observer: IntersectionObserver | undefined;
    if (cfg.scroll && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          if (!introDone) return; // stay silent until audio is unlocked
          const now = Date.now();
          if (now - lastScroll < 500) return;
          if (entries.some((en) => en.isIntersecting)) {
            lastScroll = now;
            playScroll();
          }
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      document
        .querySelectorAll("section[id]")
        .forEach((s) => observer!.observe(s));
    }

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      observer?.disconnect();
      void ac?.close();
    };
  }, [cfg]);

  return null;
}
