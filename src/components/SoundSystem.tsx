"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { theme } from "@/content/theme";

const STORAGE_KEY = "sound";

/**
 * Synthesised UI sound: a soft intro chord, a tick on clicks, and a faint
 * marker as sections pass. Everything is generated with the Web Audio API,
 * so there are no audio files to download.
 *
 * Browsers refuse to start audio before the visitor interacts with the page,
 * so the AudioContext is created lazily on the first gesture — the intro
 * plays then, not on load. That is a platform rule, not a preference.
 *
 * Tuning lives in theme.ts under `audio`.
 */
export default function SoundSystem() {
  const cfg = theme.audio;
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const introDone = useRef(false);
  const lastScroll = useRef(0);

  /* Restore the saved preference. */
  useEffect(() => {
    if (!cfg.enabled) return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setOn(saved === null ? cfg.startEnabled : saved === "on");
    } catch {
      setOn(cfg.startEnabled);
    }
  }, [cfg.enabled, cfg.startEnabled]);

  const ctx = useCallback(() => {
    if (!ctxRef.current) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  /** One soft sine blip with an exponential tail. */
  const tone = useCallback(
    (freq: number, dur: number, gain: number, delay = 0, type: OscillatorType = "sine") => {
      const ac = ctx();
      if (!ac) return;
      const t0 = ac.currentTime + delay;
      const osc = ac.createOscillator();
      const amp = ac.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      amp.gain.setValueAtTime(0.0001, t0);
      amp.gain.exponentialRampToValueAtTime(
        Math.max(0.0002, gain * cfg.volume),
        t0 + 0.012
      );
      amp.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(amp).connect(ac.destination);
      osc.start(t0);
      osc.stop(t0 + dur + 0.02);
    },
    [ctx, cfg.volume]
  );

  /* Sound effects ---------------------------------------------------------- */

  const playIntro = useCallback(() => {
    // A quiet rising fifth — brief, and it resolves rather than lingering.
    tone(392.0, 1.5, 0.5, 0); // G4
    tone(587.33, 1.5, 0.36, 0.1); // D5
    tone(783.99, 1.8, 0.26, 0.22); // G5
  }, [tone]);

  const playClick = useCallback(() => tone(880, 0.07, 0.34), [tone]);
  const playScroll = useCallback(() => tone(320, 0.06, 0.14, 0, "triangle"), [tone]);

  /* Wiring ----------------------------------------------------------------- */

  useEffect(() => {
    if (!cfg.enabled || !on) return;

    const onFirstGesture = () => {
      if (!introDone.current && cfg.intro) {
        introDone.current = true;
        playIntro();
      }
    };

    const onClick = (e: MouseEvent) => {
      if (!cfg.click) return;
      const el = (e.target as HTMLElement)?.closest("a,button");
      if (el) playClick();
    };

    window.addEventListener("pointerdown", onFirstGesture, { once: true });
    document.addEventListener("click", onClick);

    let observer: IntersectionObserver | undefined;
    if (cfg.scroll && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          const now = Date.now();
          if (now - lastScroll.current < 600) return; // throttle
          if (entries.some((en) => en.isIntersecting)) {
            lastScroll.current = now;
            playScroll();
          }
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      document.querySelectorAll("section[id]").forEach((s) => observer!.observe(s));
    }

    return () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      document.removeEventListener("click", onClick);
      observer?.disconnect();
    };
  }, [cfg, on, playIntro, playClick, playScroll]);

  if (!cfg.enabled) return null;

  const toggle = () => {
    const next = !on;
    setOn(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {
      /* private browsing — the choice just won't persist */
    }
    if (next) {
      // Turning it on is itself a gesture, so the intro can play immediately.
      if (!introDone.current && cfg.intro) {
        introDone.current = true;
        playIntro();
      } else {
        playClick();
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Mute sound" : "Enable sound"}
      title={on ? "Sound on" : "Sound off"}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--hair)] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M11 5 6 9H2v6h4l5 4V5z" />
        {on ? (
          <>
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </>
        ) : (
          <path d="M22 9l-6 6M16 9l6 6" />
        )}
      </svg>
    </button>
  );
}
