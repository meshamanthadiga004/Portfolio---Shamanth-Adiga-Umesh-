"use client";

import { useEffect, useRef } from "react";

/* Grid geometry */
const SPACING = 34; // px between dots
const RADIUS = 165; // pointer influence radius
const BASE_ALPHA = 0.16; // resting dot opacity
const RING = 26; // cursor ring radius

/**
 * Fixed-position dot grid that responds to the pointer: dots near the cursor
 * brighten and grow, thin lines connect them back to a ring that trails the
 * cursor. Everything is viewport-fixed, so scrolling costs nothing — the
 * canvas only redraws while the pointer is actually moving, then idles.
 *
 * Degrades to a plain static grid for coarse pointers and reduced motion.
 */
export default function LiveBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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
    let frame = 0;
    let idleFrames = 0;

    /* Actual pointer, and the ring that eases toward it. */
    const target = { x: -9999, y: -9999 };
    const ring = { x: -9999, y: -9999 };

    /* Palette is read from CSS variables so the canvas tracks the theme. */
    let dot = "23 26 29";
    let hot = "176 141 87";
    const readPalette = () => {
      const cs = getComputedStyle(document.documentElement);
      dot = cs.getPropertyValue("--dot").trim() || dot;
      hot = cs.getPropertyValue("--dot-hot").trim() || hot;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      /* Ease the ring toward the pointer for a trailing feel. */
      if (interactive) {
        ring.x += (target.x - ring.x) * 0.12;
        ring.y += (target.y - ring.y) * 0.12;
      }

      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * SPACING;
          const y = j * SPACING;

          let t = 0;
          if (interactive) {
            const dx = x - ring.x;
            const dy = y - ring.y;
            const dist = Math.hypot(dx, dy);
            if (dist < RADIUS) t = 1 - dist / RADIUS;
          }

          if (t > 0) {
            /* Connector back to the ring. */
            ctx.beginPath();
            ctx.moveTo(ring.x, ring.y);
            ctx.lineTo(x, y);
            ctx.strokeStyle = `rgb(${hot} / ${(t * t * 0.3).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.arc(x, y, 1 + t * 1.7, 0, Math.PI * 2);
          ctx.fillStyle =
            t > 0
              ? `rgb(${hot} / ${(BASE_ALPHA + t * 0.6).toFixed(3)})`
              : `rgb(${dot} / ${BASE_ALPHA})`;
          ctx.fill();
        }
      }

      /* The cursor ring itself. */
      if (interactive && target.x > -9998) {
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, RING, 0, Math.PI * 2);
        ctx.strokeStyle = `rgb(${hot} / 0.32)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ring.x, ring.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${hot} / 0.6)`;
        ctx.fill();
      }
    };

    /* Run only while something is moving; stop once the ring settles. */
    const loop = () => {
      const settled =
        Math.abs(target.x - ring.x) < 0.4 && Math.abs(target.y - ring.y) < 0.4;
      draw();
      idleFrames = settled ? idleFrames + 1 : 0;
      if (idleFrames > 10) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(loop);
    };

    const kick = () => {
      idleFrames = 0;
      if (!frame) frame = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (ring.x < -9998) {
        ring.x = e.clientX;
        ring.y = e.clientY;
      }
      kick();
    };

    const onLeave = () => {
      target.x = -9999;
      target.y = -9999;
      kick();
    };

    const onResize = () => {
      resize();
      kick();
      draw();
    };

    readPalette();
    resize();
    draw();

    if (interactive) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("resize", onResize);

    /* Repaint when the theme flips, so dot colours follow. */
    const themeObserver = new MutationObserver(() => {
      readPalette();
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const scheme = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onScheme = () => {
      readPalette();
      draw();
    };
    scheme?.addEventListener("change", onScheme);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      scheme?.removeEventListener("change", onScheme);
      themeObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="page-gradient" aria-hidden="true">
      <canvas ref={canvasRef} className="dot-canvas" />
    </div>
  );
}
