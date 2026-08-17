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
  "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3", // gauge
  "M5 20V8M12 20V3M19 20v-7M2 20h20", // ascending bars
  "M5 2h14v20H5zM8 6h8M8 11h2M12 11h2M16 11h2M8 15h2M12 15h2M16 15h2M8 19h6", // calculator
  "M6 4h12l-7 8 7 8H6", // sigma / summation
  "M6 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM18 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM19 5L5 19", // percent
  "M3 3v18h18M7 15.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM11 11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM15 13.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 7.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z", // scatter plot
  "M3 4h18l-7 8v7l-4 2v-9z", // funnel
  "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM16 16l5 5M8.5 12v2M11 9.5v4.5M13.5 11.5v2.5", // analysis / magnifier on data
  "M9 3h6v3H9zM6 5H5v16h14V5h-1M9 11h6M9 15h6", // clipboard
  "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 11.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6z", // target
  "M12 3v18M7 21h10M5 7h14M5 7l-3 6h6zM19 7l3 6h-6z", // balance / weighing
  "M3 3h18v12H3zM12 15v4M8 21l4-2 4 2M7 11l3-3 2 2 4-4", // presentation
  "M3 21h18M6 21v-4M10 21v-8M14 21v-12M18 21v-6", // histogram
  "M10 2h4v3h-4zM3 10h4v3H3zM17 10h4v3h-4zM10 18h4v3h-4zM12 5v5M5 13v3h14v-3M12 16v2", // flowchart
  "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8.5 8h7M8.5 11h7M14 8c0 3-5.5 1-5.5 3.5L14 16", // currency / rupee
  "M3 12h4l3-7 4 14 3-7h4", // waveform / signal
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
    let fieldHeight = 0; // wrap distance for the credits scroll
    let paused = false;

    const p = { x: -9999, y: -9999, dx: 0, dy: 0 };

    /* Stencil colour and weight follow the active theme, so the field is
       light-on-dark or dark-on-light as appropriate. */
    let strokeColor = "#ffffff";
    let opacity = cfg.iconOpacity;
    const readPalette = () => {
      const cs = getComputedStyle(document.documentElement);
      strokeColor =
        cs.getPropertyValue("--glyph").trim() ||
        cs.getPropertyValue("--ink").trim() ||
        strokeColor;
      const o = parseFloat(cs.getPropertyValue("--glyph-opacity"));
      opacity = Number.isFinite(o) ? o : cfg.iconOpacity;
    };

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
        g.strokeStyle = strokeColor;
        g.lineWidth = cfg.strokeWidth;
        g.lineJoin = "round";
        g.lineCap = "round";
        g.stroke(new Path2D(d));
        return c;
      });
    };

    const build = () => {
      readPalette();
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
      const cols = Math.ceil(w / cfg.spacing) + 2;
      /* Two extra rows so wrapping happens off-screen, never in view. */
      const rows = Math.ceil(h / cfg.spacing) + 2;
      fieldHeight = rows * cfg.spacing;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          /* Deterministic pick + offset, so the layout is stable across
             resizes rather than reshuffling. */
          const hash = Math.abs((i * 73856093) ^ (j * 19349663));
          const jx = ((hash % 101) / 100 - 0.5) * cfg.jitter;
          const jy = (((hash >> 7) % 101) / 100 - 0.5) * cfg.jitter;
          /* Offsetting alternate rows breaks the square lattice — this is
             what gives the field its zigzag. */
          const stagger = (j % 2) * cfg.spacing * cfg.rowStagger;
          const hx = i * cfg.spacing + stagger + jx;
          const hy = j * cfg.spacing + jy;
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
      ctx.globalAlpha = opacity;
      const s = cfg.iconSize;
      for (const g of glyphs) {
        const sp = sprites[g.sprite];
        if (sp) ctx.drawImage(sp, g.x - s / 2, g.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      const r2 = cfg.influenceRadius * cfg.influenceRadius;
      const margin = cfg.spacing;

      for (const g of glyphs) {
        /* Credits drift. Home and current position move together, so the
           spring never fights the scroll — only cursor displacement does. */
        g.hy -= cfg.creditSpeed;
        g.y -= cfg.creditSpeed;
        if (g.hy < -margin) {
          g.hy += fieldHeight;
          g.y += fieldHeight;
        }

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
      }

      p.dx = 0;
      p.dy = 0;
      paint();

      /* The field always drifts, so the loop runs continuously — but only
         while the tab is actually visible. */
      frame = paused ? 0 : requestAnimationFrame(step);
    };

    const kick = () => {
      if (!frame && !paused) frame = requestAnimationFrame(step);
    };

    const onVisibility = () => {
      paused = document.hidden;
      if (!paused) kick();
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
    /* Reduced motion gets a still field — no drift, no push. */
    if (!reduced) kick();

    if (interactive) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    /* Re-stroke the sprites when the theme flips — they carry a baked-in
       colour, so a token change alone isn't enough. */
    const themeObserver = new MutationObserver(() => {
      readPalette();
      buildSprites();
      paint();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="page-backdrop" aria-hidden="true">
      <canvas ref={canvasRef} className="dot-canvas" />
    </div>
  );
}
