"use client";

import { useState } from "react";
import { profile } from "@/content/profile";

/**
 * Square portrait for the Contact section. Falls back to a labelled
 * placeholder if the file is missing, so a not-yet-added photo shows a hint
 * rather than a broken-image icon.
 */
export default function Portrait() {
  const [failed, setFailed] = useState(false);
  const show = profile.portrait && !failed;

  return (
    <figure className="mx-auto mt-16 max-w-xs text-center">
      {show ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={profile.portrait}
          alt={profile.name}
          width={320}
          height={320}
          loading="lazy"
          onError={() => setFailed(true)}
          className="aspect-square w-full rounded-2xl border border-[var(--hair)] object-cover"
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-dashed border-[var(--hair)] bg-[var(--surface)]">
          <span className="meta px-6">
            Save your photo as public{profile.portrait || "/portrait.jpg"}
          </span>
        </div>
      )}
      <figcaption className="meta mt-4">{profile.name}</figcaption>
    </figure>
  );
}
