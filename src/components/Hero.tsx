import { profile } from "@/content/profile";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="top" className="px-6 pb-20 pt-36 sm:pb-28 sm:pt-44">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
            {profile.location}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="max-w-3xl font-serif text-[2rem] leading-[1.15] tracking-tight sm:text-5xl sm:leading-[1.1]">
            {profile.headline}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            {profile.subhead}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="rounded-full bg-[var(--ink)] px-6 py-2.5 text-sm text-[var(--paper)] transition-opacity hover:opacity-85"
            >
              See the work
            </a>
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--hair)] px-6 py-2.5 text-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Résumé ↗
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="px-2 py-2.5 text-sm text-[var(--muted)] underline underline-offset-4 transition-colors hover:text-[var(--ink)]"
            >
              {profile.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
