"use client";

import { useEffect, useRef } from "react";
import { theme } from "@/content/theme";

/* Stencil glyphs, drawn as strokes on a 24x24 grid. Business-analytics
   instruments: charts, spreadsheets, markets, machines. Add or remove entries
   freely — the field picks from whatever is in this list. */
const ICONS: string[] = [
  "M4 20V11M10 20V4M16 20V14M2 20h20", // bar chart
  "M3 17l5-5 4 3 7-8M3 3v18h18", // line chart on axes
  "M7 3v18M5 7h4v9H5zM17 2v18M15 7h4v8h-4z", // candlesticks
  "M3 4h18v16H3zM3 9h18M3 14.5h18M9 4v16M15 4v16", // spreadsheet
  "M4 5h16v10H4zM2 18h20M9 18h6", // laptop
  "M3 4h18v12H3zM9 20h6M12 16v4", // monitor
  "M12 2c3 3.2 4.2 7 4.2 10.2L12 16.5l-4.2-4.3C7.8 9 9 5.2 12 2zM8.6 15.6L6.5 20l4-1.9M15.4 15.6l2.1 4.4-4-1.9", // rocket
  "M12 3a9 9 0 1 0 9 9h-9V3z", // pie chart
  "M3 17l6-6 4 4 7-7M15 8h6v6", // trend arrow
  "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3", // database
  "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3", // gauge / cog
  "M5 20V8M12 20V3M19 20v-7M2 20h20", // ascending bars
];

type Glyph = {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  sprite: number;
};

/**
 * A field of small stencil icons that gets shoved by the cursor.
 *
 * Icons are pre-rendered once to offscreen canvases, then blitted with
 * drawImage each frame — stroking a dozen paths per icon per frame would be
 * far too expensive. They are pushed along the direction the pointer is
 * travelling and spring back; nothing brightens, so text stays readable.
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
    let dpr = 1;
    let glyphs: Glyph[] = [];
    let sprites: HTMLCanvasElement[] = [];
    let frame = 0;
    let restFrames = 0;

    const p = { x: -9999, y: -9999, dx: 0, dy: 0 };

    /** Render each stencil once at device resolution. */
    const buildSprites = () => {
      const px = Math.ceil(cfg.iconSize * dpr);
      sprites = ICONS.map((d) => {
        const c = document.createElement("canvas");
        c.width = px;
        c.height = px;
        const g = c.getContext("2d");
        if (!g) return c;
        g.scale(px / 24, px / 24);
        g.strokeStyle = "#ffffff";
        g.lineWidth = cfg.strokeWidth;
        g.lineJoin = "round";
        g.lineCap = "round";
        g.stroke(new Path2D(d));
        return c;
      });
    };

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildSprites();

      glyphs = [];
      const cols = Math.ceil(w / cfg.spacing) + 1;
      const rows = Math.ceil(h / cfg.spacing) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          /* Deterministic pick + offset, so the layout is stable across
             resizes rather than reshuffling. */
          const hash = Math.abs((i * 73856093) ^ (j * 19349663));
          const jitterX = ((hash % 37) - 18) * 0.8;
          const jitterY = (((hash >> 5) % 37) - 18) * 0.8;
          const hx = i * cfg.spacing + jitterX;
          const hy = j * cfg.spacing + jitterY;
          glyphs.push({
            hx,
            hy,
            x: hx,
            y: hy,
            vx: 0,
            vy: 0,
            sprite: hash % ICONS.length,
          });
        }
      }
    };

    const paint = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = cfg.iconOpacity;
      const s = cfg.iconSize;
      for (const g of glyphs) {
        const sp = sprites[g.sprite];
        if (sp) ctx.drawImage(sp, g.x - s / 2, g.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      let moving = false;
      const r2 = cfg.influenceRadius * cfg.influenceRadius;

      for (const g of glyphs) {
        if (interactive && (p.dx !== 0 || p.dy !== 0)) {
          const ax = g.hx - p.x;
          const ay = g.hy - p.y;
          const dist2 = ax * ax + ay * ay;
          if (dist2 < r2) {
            const falloff = 1 - Math.sqrt(dist2) / cfg.influenceRadius;
            g.vx += p.dx * cfg.pushStrength * falloff;
            g.vy += p.dy * cfg.pushStrength * falloff;
          }
        }

        g.vx += (g.hx - g.x) * cfg.springBack;
        g.vy += (g.hy - g.y) * cfg.springBack;
        g.vx *= cfg.damping;
        g.vy *= cfg.damping;
        g.x += g.vx;
        g.y += g.vy;

        const ox = g.x - g.hx;
        const oy = g.y - g.hy;
        const off = Math.hypot(ox, oy);
        if (off > cfg.maxOffset) {
          const k = cfg.maxOffset / off;
          g.x = g.hx + ox * k;
          g.y = g.hy + oy * k;
        }

        if (Math.abs(g.vx) > 0.02 || Math.abs(g.vy) > 0.02 || off > 0.4) {
          moving = true;
        }
      }

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
