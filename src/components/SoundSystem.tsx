"use client";

import { useEffect } from "react";
import { theme } from "@/content/theme";

/**
 * Synthesised UI sound. Renders nothing — it only wires up listeners.
 *
 * Everything is generated live with the Web Audio API. Nothing is sampled, so
 * no copyrighted game or film audio is reproduced; the sounds are built to sit
 * in a similar family, not to be copies.
 *
 *   intro   a slow orchestral swell — six chord tones, three detuned sawtooth
 *           voices each, entering staggered under a filter that opens as it
 *           rises. Vibrato from a shared LFO gives it the string-section wobble.
 *   click   a soft, muffled select. Deliberately flat in pitch: a downward
 *           glide is what made the previous version sound like a laser.
 *   scroll  a continuous rolling texture. A looping brown-noise source runs
 *           silently and its gain follows scroll speed, so it swells while the
 *           page moves in either direction and fades when it stops.
 *
 * Browsers block audio until the visitor interacts, so the context is built
 * lazily on the first gesture and the swell plays then — not on load.
 *
 * Tuning lives in theme.ts under `audio`.
 */
export default function SoundSystem() {
  const cfg = theme.audio;

  useEffect(() => {
    if (!cfg.enabled) return;

    let ac: AudioContext | null = null;
    let clickNoise: AudioBuffer | null = null;
    let rollGain: GainNode | null = null;
    let rollStarted = false;
    let unlocked = false;

    let lastY = window.scrollY;
    let lastT = performance.now();
    let idleTimer: number | undefined;

    const ctx = () => {
      if (!ac) {
        const AC =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!AC) return null;
        ac = new AC();

        /* Short decaying white noise for the click transient. */
        const n = Math.floor(ac.sampleRate * 0.04);
        clickNoise = ac.createBuffer(1, n, ac.sampleRate);
        const d = clickNoise.getChannelData(0);
        for (let i = 0; i < n; i++) {
          d[i] = (Math.random() * 2 - 1) * (1 - i / n);
        }
      }
      if (ac.state === "suspended") void ac.resume();
      return ac;
    };

    /* ------------------------------------------------------------- intro */

    const playIntro = () => {
      const a = ctx();
      if (!a) return;
      const t0 = a.currentTime + 0.05;
      const {
        introChord,
        introAttack,
        introRelease,
        introDetune,
        introVolume,
      } = cfg;

      const master = a.createGain();
      const lp = a.createBiquadFilter();
      lp.type = "lowpass";
      lp.Q.value = 0.7;
      lp.frequency.setValueAtTime(280, t0);
      lp.frequency.exponentialRampToValueAtTime(
        4200,
        t0 + introAttack + 0.6
      );

      master.gain.setValueAtTime(0.0001, t0);
      master.gain.exponentialRampToValueAtTime(
        Math.max(0.0002, cfg.volume * introVolume),
        t0 + introAttack
      );
      master.gain.exponentialRampToValueAtTime(
        0.0001,
        t0 + introAttack + introRelease
      );

      /* Shared vibrato, so the whole section moves together. */
      const lfo = a.createOscillator();
      const lfoAmt = a.createGain();
      lfo.frequency.value = 5.1;
      lfoAmt.gain.value = 3.5; // cents
      lfo.connect(lfoAmt);
      lfo.start(t0);
      lfo.stop(t0 + introAttack + introRelease + 0.2);

      introChord.forEach((freq, i) => {
        for (const cents of [-introDetune, 0, introDetune]) {
          const osc = a.createOscillator();
          const g = a.createGain();
          osc.type = "sawtooth";
          osc.frequency.value = freq;
          osc.detune.value = cents;
          lfoAmt.connect(osc.detune);
          /* Upper voices quieter, so the chord doesn't turn shrill. */
          g.gain.value = 0.14 / (i * 0.4 + 1);
          osc.connect(g).connect(lp);
          osc.start(t0 + i * 0.07); // staggered entry
          osc.stop(t0 + introAttack + introRelease + 0.2);
        }
      });

      lp.connect(master).connect(a.destination);
    };

    /* ------------------------------------------------------------- click */

    const playClick = () => {
      const a = ctx();
      if (!a) return;
      const t0 = a.currentTime;
      const vol = cfg.volume * cfg.clickVolume;

      /* Warm body — flat pitch, muffled. */
      const osc = a.createOscillator();
      const amp = a.createGain();
      const lp = a.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 1500;
      osc.type = "triangle";
      osc.frequency.value = 523;
      amp.gain.setValueAtTime(0.0001, t0);
      amp.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), t0 + 0.005);
      amp.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.07);
      osc.connect(lp).connect(amp).connect(a.destination);
      osc.start(t0);
      osc.stop(t0 + 0.09);

      /* Tiny transient so it reads as a physical select, not a beep. */
      if (clickNoise) {
        const src = a.createBufferSource();
        const nlp = a.createBiquadFilter();
        const namp = a.createGain();
        src.buffer = clickNoise;
        nlp.type = "lowpass";
        nlp.frequency.value = 2200;
        namp.gain.setValueAtTime(vol * 0.28, t0);
        namp.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.035);
        src.connect(nlp).connect(namp).connect(a.destination);
        src.start(t0);
      }
    };

    /* ------------------------------------------------------------ scroll */

    const startRoll = () => {
      const a = ctx();
      if (!a || rollStarted) return;
      rollStarted = true;

      /* Brown noise loops smoothly and sounds like rolling rather than hiss. */
      const len = Math.floor(a.sampleRate * 2);
      const buf = a.createBuffer(1, len, a.sampleRate);
      const d = buf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < len; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        d[i] = last * 3.5;
      }

      const src = a.createBufferSource();
      const bp = a.createBiquadFilter();
      rollGain = a.createGain();
      src.buffer = buf;
      src.loop = true;
      bp.type = "bandpass";
      bp.frequency.value = cfg.scrollTone;
      bp.Q.value = 1.1;
      rollGain.gain.value = 0;
      src.connect(bp).connect(rollGain).connect(a.destination);
      src.start();
    };

    const onScroll = () => {
      if (!cfg.scroll || !unlocked) return;
      startRoll();
      if (!rollGain || !ac) return;

      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastY);
      const dt = Math.max(1, now - lastT);
      lastY = window.scrollY;
      lastT = now;

      /* Speed in px/ms, softly clamped. Direction is irrelevant — up and
         down both roll. */
      const speed = Math.min(1, dy / dt / 2.2);
      const target = cfg.volume * cfg.scrollVolume * speed;
      rollGain.gain.setTargetAtTime(target, ac.currentTime, 0.05);

      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        if (rollGain && ac) {
          rollGain.gain.setTargetAtTime(0, ac.currentTime, 0.09);
        }
      }, 90);
    };

    /* ------------------------------------------------------------- wiring */

    const onPointerDown = (e: PointerEvent) => {
      if (!unlocked) {
        unlocked = true;
        if (cfg.intro) playIntro();
        return; // the unlocking gesture shouldn't also fire a click
      }
      if (cfg.click && (e.target as HTMLElement)?.closest("a,button")) {
        playClick();
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idleTimer);
      void ac?.close();
    };
  }, [cfg]);

  return null;
}
