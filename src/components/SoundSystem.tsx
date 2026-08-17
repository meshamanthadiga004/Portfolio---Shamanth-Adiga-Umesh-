"use client";

import { useEffect } from "react";
import { theme } from "@/content/theme";

/**
 * Synthesised UI sound. Renders nothing — it only wires up listeners.
 *
 * Everything is generated live with the Web Audio API; nothing is sampled.
 *
 *   intro   a bowed string ensemble. Each chord tone is built additively from
 *           a harmonic series of sines with 1/n^1.2 rolloff — that spectrum is
 *           what reads as "strings"; a sawtooth through a lowpass reads as a
 *           synth pad instead. Two voices per note detuned by a few cents give
 *           section width, a shared LFO adds vibrato, and a short breath of
 *           bandpassed noise at the onset stands in for bow bite.
 *
 *   click   a small bell: three inharmonic partials (1, 2.76, 5.4 — the ratios
 *           that make struck metal sound like a bell rather than a tone) with
 *           quick decay and no sustain. Pure sines, no noise transient; the
 *           noise is what made the previous version sound like a cowbell.
 *
 *   scroll  a mouse-wheel ratchet. Distance scrolled is accumulated and one
 *           very short click fires per detent, so scrolling fast runs the
 *           ticks together into a "trrrr" and scrolling slowly ticks
 *           individually — the way a real wheel behaves. Works in both
 *           directions.
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
    let noise: AudioBuffer | null = null;
    let unlocked = false;

    let lastY = window.scrollY;
    let travel = 0; // px accumulated since the last detent
    let lastTick = 0;

    const ctx = () => {
      if (!ac) {
        const AC =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!AC) return null;
        ac = new AC();

        const n = Math.floor(ac.sampleRate * 0.4);
        noise = ac.createBuffer(1, n, ac.sampleRate);
        const d = noise.getChannelData(0);
        for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
      }
      if (ac.state === "suspended") void ac.resume();
      return ac;
    };

    /* --------------------------------------------------------- intro: strings */

    const playIntro = () => {
      const a = ctx();
      if (!a) return;
      const t0 = a.currentTime + 0.05;
      const { introChord, introAttack, introRelease, introDetune } = cfg;
      const end = t0 + introAttack + introRelease;

      const master = a.createGain();
      master.gain.setValueAtTime(0.0001, t0);
      master.gain.exponentialRampToValueAtTime(
        Math.max(0.0002, cfg.volume * cfg.introVolume),
        t0 + introAttack
      );
      master.gain.exponentialRampToValueAtTime(0.0001, end);

      /* Body resonance — a gentle peak in the low mids, like an instrument
         cavity, keeps the additive stack from sounding sterile. */
      const body = a.createBiquadFilter();
      body.type = "peaking";
      body.frequency.value = 320;
      body.Q.value = 1.1;
      body.gain.value = 4;
      body.connect(master).connect(a.destination);

      /* Shared vibrato so the whole section moves together. */
      const lfo = a.createOscillator();
      const lfoAmt = a.createGain();
      lfo.frequency.value = cfg.introVibrato;
      lfoAmt.gain.value = 4; // cents
      lfo.connect(lfoAmt);
      lfo.start(t0);
      lfo.stop(end + 0.2);

      introChord.forEach((freq, i) => {
        /* Fewer harmonics as pitch rises — the upper ones would be inaudible
           and only cost oscillators. */
        const partials = Math.max(3, 8 - i);
        const noteStart = t0 + i * 0.09; // staggered bows

        for (const cents of [-introDetune, introDetune]) {
          for (let n = 1; n <= partials; n++) {
            const osc = a.createOscillator();
            const g = a.createGain();
            osc.type = "sine";
            osc.frequency.value = freq * n;
            osc.detune.value = cents + (n % 2 ? 1.5 : -1.5);
            lfoAmt.connect(osc.detune);
            /* 1/n^1.2 rolloff, scaled down for higher notes in the chord. */
            g.gain.value = (0.13 / Math.pow(n, 1.2)) / (i * 0.45 + 1);
            osc.connect(g).connect(body);
            osc.start(noteStart);
            osc.stop(end + 0.2);
          }
        }
      });

      /* Bow bite: a breath of filtered noise under the attack. */
      if (noise && cfg.introBow > 0) {
        const src = a.createBufferSource();
        const bp = a.createBiquadFilter();
        const g = a.createGain();
        src.buffer = noise;
        src.loop = true;
        bp.type = "bandpass";
        bp.frequency.value = 2200;
        bp.Q.value = 0.8;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(
          Math.max(0.0002, cfg.volume * cfg.introBow * 0.06),
          t0 + 0.25
        );
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + introAttack + 0.8);
        src.connect(bp).connect(g).connect(a.destination);
        src.start(t0);
        src.stop(t0 + introAttack + 1);
      }
    };

    /* ------------------------------------------------------------ click: bell */

    const playClick = () => {
      const a = ctx();
      if (!a) return;
      const t0 = a.currentTime;
      const vol = cfg.volume * cfg.clickVolume;
      /* Inharmonic ratios — this is what separates a bell from a beep. */
      const partials: [number, number, number][] = [
        [1, 1, cfg.clickDecay],
        [2.76, 0.5, cfg.clickDecay * 0.6],
        [5.4, 0.22, cfg.clickDecay * 0.35],
      ];
      for (const [ratio, amp, dur] of partials) {
        const osc = a.createOscillator();
        const g = a.createGain();
        osc.type = "sine";
        osc.frequency.value = cfg.clickPitch * ratio;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(
          Math.max(0.0002, vol * amp),
          t0 + 0.003
        );
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        osc.connect(g).connect(a.destination);
        osc.start(t0);
        osc.stop(t0 + dur + 0.02);
      }
    };

    /* -------------------------------------------------------- scroll: ratchet */

    const playDetent = () => {
      const a = ctx();
      if (!a || !noise) return;
      const t0 = a.currentTime;
      const src = a.createBufferSource();
      const hp = a.createBiquadFilter();
      const g = a.createGain();
      src.buffer = noise;
      /* Start at a random point so successive ticks aren't identical. */
      const offset = Math.random() * 0.3;
      hp.type = "highpass";
      hp.frequency.value = 2600;
      g.gain.setValueAtTime(cfg.volume * cfg.scrollVolume * 0.5, t0);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.018);
      src.connect(hp).connect(g).connect(a.destination);
      src.start(t0, offset, 0.03);
    };

    const onScroll = () => {
      if (!cfg.scroll || !unlocked) return;
      const y = window.scrollY;
      travel += Math.abs(y - lastY);
      lastY = y;

      const now = performance.now();
      while (travel >= cfg.scrollDetent) {
        travel -= cfg.scrollDetent;
        /* Hard rate limit — a flung scroll must not queue 200 ticks. */
        if (now - lastTick >= 11) {
          lastTick = now;
          playDetent();
        }
      }
    };

    /* ------------------------------------------------------------- wiring */

    const onPointerDown = (e: PointerEvent) => {
      if (!unlocked) {
        unlocked = true;
        lastY = window.scrollY;
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
      void ac?.close();
    };
  }, [cfg]);

  return null;
}
