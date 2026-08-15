"use client";

import { useEffect, useRef } from "react";

/**
 * A drifting aurora that leans toward the pointer. Pointer position is written
 * to CSS custom properties inside a rAF so we never write styles more than
 * once per frame. Falls back to the idle drift animation on touch, and to a
 * static wash when the visitor prefers reduced motion.
 */
export default function InteractiveGradient() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const fine = window.matchMedia?.("(pointer: fine)").matches;
    if (reduced || !fine) return;

    let frame = 0;
    let pending: { x: number; y: number } | null = null;

    const apply = () => {
      frame = 0;
      if (!pending) return;
      el.style.setProperty("--mx", `${pending.x}%`);
      el.style.setProperty("--my", `${pending.y}%`);
      pending = null;
    };

    const onMove = (e: PointerEvent) => {
      pending = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="aurora" aria-hidden="true" />;
}
