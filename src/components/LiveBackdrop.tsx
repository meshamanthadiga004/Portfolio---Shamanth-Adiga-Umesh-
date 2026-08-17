"use client";

import { useEffect, useRef } from "react";
import { theme } from "@/content/theme";

type Dot = {
  hx: number; // home x
  hy: number; // home y
  x: number;
  y: number;
  vx: number;
  vy: number;
};

/**
 * A field of dots that gets shoved by the cursor.
 *
 * Dots are pushed along the direction the pointer is actually travelling —
 * not away from it — so the field parts like sand as you sweep across, then
 * springs back. Nothing brightens or glows: the motion is the entire effect,
 * which is what keeps text over the top readable.
 *
 * All tuning lives in theme.ts under `backdrop`.
 */
export default function LiveBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cfg = theme.backdrop;
    if (!cfg.enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const fine = window.matchMedia?.("(pointer: fine)").matches;
    const interactive = fine && !reduced;

    let w = 0;
    let h = 0;
    let dots: Dot[] = [];
    let frame = 0;
    let restFrames = 0;

    /* Pointer position and the delta between the last two moves — the delta is
       what gives us a direction to push in. */
    const p = { x: -9999, y: -9999, dx: 0, dy: 0 };

    let ink = "236 238 240";
    const readPalette = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue("--ink")
        .trim();
      /* --ink is a hex; convert once to "r g b" for rgb(... / alpha). */
      if (v.startsWith("#")) {
        const hex = v.slice(1);
        const full =
          hex.length === 3
            ? hex
                .split("")
                .map((ch) => ch + ch)
                .join("")
            : hex;
        const n = parseInt(full, 16);
        ink = `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
      }
    };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const cols = Math.ceil(w / cfg.dotSpacing) + 1;
      const rows = Math.ceil(h / cfg.dotSpacing) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const hx = i * cfg.dotSpacing;
          const hy = j * cfg.dotSpacing;
          dots.push({ hx, hy, x: hx, y: hy, vx: 0, vy: 0 });
        }
      }
    };

    const paint = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = `rgb(${ink} / ${cfg.dotOpacity})`;
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, cfg.dotSize, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      let moving = false;
      const r2 = cfg.influenceRadius * cfg.influenceRadius;

      for (const d of dots) {
        /* Push along the pointer's travel direction, strongest at the centre
           of the influence circle. */
        if (interactive && (p.dx !== 0 || p.dy !== 0)) {
          const ax = d.hx - p.x;
          const ay = d.hy - p.y;
          const dist2 = ax * ax + ay * ay;
          if (dist2 < r2) {
            const falloff = 1 - Math.sqrt(dist2) / cfg.influenceRadius;
            d.vx += p.dx * cfg.pushStrength * falloff;
            d.vy += p.dy * cfg.pushStrength * falloff;
          }
        }

        /* Spring home, then damp. */
        d.vx += (d.hx - d.x) * cfg.springBack;
        d.vy += (d.hy - d.y) * cfg.springBack;
        d.vx *= cfg.damping;
        d.vy *= cfg.damping;
        d.x += d.vx;
        d.y += d.vy;

        /* Cap displacement so a fast sweep can't fling dots across the page. */
        const ox = d.x - d.hx;
        const oy = d.y - d.hy;
        const off = Math.hypot(ox, oy);
        if (off > cfg.maxOffset) {
          const k = cfg.maxOffset / off;
          d.x = d.hx + ox * k;
          d.y = d.hy + oy * k;
        }

        if (Math.abs(d.vx) > 0.02 || Math.abs(d.vy) > 0.02 || off > 0.4) {
          moving = true;
        }
      }

      /* The delta is consumed each frame — one move, one shove. */
      p.dx = 0;
      p.dy = 0;

      paint();

      restFrames = moving ? 0 : restFrames + 1;
      if (restFrames > 6) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(step);
    };

    const kick = () => {
      restFrames = 0;
      if (!frame) frame = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      if (p.x > -9998) {
        /* Clamp the per-event delta so flicking the mouse isn't violent. */
        p.dx = Math.max(-18, Math.min(18, e.clientX - p.x));
        p.dy = Math.max(-18, Math.min(18, e.clientY - p.y));
      }
      p.x = e.clientX;
      p.y = e.clientY;
      kick();
    };

    const onResize = () => {
      build();
      paint();
    };

    readPalette();
    build();
    paint();

    if (interactive) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="page-backdrop" aria-hidden="true">
      <canvas ref={canvasRef} className="dot-canvas" />
    </div>
  );
}
