"use client";

import { useState } from "react";
import { profile } from "@/content/profile";

/**
 * Portrait plus signature for the Contact section.
 *
 * The frame follows the photo's own aspect ratio rather than forcing a
 * square, so nothing is cropped. If you swap the image, update
 * profile.portraitSize to match.
 *
 * The signature is painted as a masked block rather than an <img>, so the
 * area around the strokes stays fully transparent and the backdrop shows
 * through. See .signature in globals.css.
 */
export default function Portrait() {
  const [portraitFailed, setPortraitFailed] = useState(false);

  const { portrait, portraitSize, signature, signatureSize, name } = profile;
  const showPortrait = portrait && !portraitFailed;
  const showSignature = Boolean(signature);

  return (
    /* Widths come from theme.ts -> media.portraitWidth / signatureWidth. */
    <figure
      className="mx-auto mt-16 text-center"
      style={{ maxWidth: "var(--portrait-width)" }}
    >
      {showPortrait ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={portrait}
          alt={name}
          width={portraitSize.width}
          height={portraitSize.height}
          onError={() => setPortraitFailed(true)}
          className="h-auto w-full rounded-2xl border border-[var(--hair)]"
        />
      ) : (
        <div className="flex aspect-[413/531] w-full items-center justify-center rounded-2xl border border-dashed border-[var(--hair)] bg-[var(--surface)]">
          <span className="meta px-6">Save your photo as public/portrait.png</span>
        </div>
      )}

      {showSignature ? (
        <figcaption className="mt-6">
          {/* Masked block, not an <img> — see .signature in globals.css. */}
          <span
            role="img"
            aria-label={`${name} signature`}
            className="signature mx-auto"
            style={{
              width: "var(--signature-width)",
              aspectRatio: `${signatureSize.width} / ${signatureSize.height}`,
            }}
          />
        </figcaption>
      ) : null}
    </figure>
  );
}
