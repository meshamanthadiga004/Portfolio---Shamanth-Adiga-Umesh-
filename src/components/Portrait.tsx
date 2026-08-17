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
 * The signature file is white-on-black. Rather than shipping two versions,
 * the .signature class drops the background out with a blend mode and
 * inverts the strokes for the light theme — see globals.css.
 */
export default function Portrait() {
  const [portraitFailed, setPortraitFailed] = useState(false);
  const [signFailed, setSignFailed] = useState(false);

  const { portrait, portraitSize, signature, signatureSize, name } = profile;
  const showPortrait = portrait && !portraitFailed;
  const showSignature = signature && !signFailed;

  return (
    <figure className="mx-auto mt-16 max-w-[19rem] text-center">
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
          <span className="signature-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={signature}
              alt={`${name} signature`}
              width={signatureSize.width}
              height={signatureSize.height}
              onError={() => setSignFailed(true)}
              className="signature h-auto w-44"
            />
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}
