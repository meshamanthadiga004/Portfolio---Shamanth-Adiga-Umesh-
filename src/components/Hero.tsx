import { profile } from "@/content/profile";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      id="top"
      className="hero-wash px-6 pb-24 pt-36 sm:pb-32 sm:pt-44"
    >
      <div className="mx-auto w-full max-w-5xl">
        {profile.availability ? (
          <Reveal>
            <p className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[var(--hair)] bg-[var(--surface)] px-3.5 py-1.5 text-xs text-[var(--muted)]">
              <span className="status-dot" aria-hidden="true" />
              {profile.availability}
              <span className="text-[var(--hair)]">·</span>
              {profile.location}
            </p>
          </Reveal>
        ) : null}

        <Reveal delay={60}>
          <h1 className="text-[3.25rem] font-semibold leading-[0.95] tracking-[-0.03em] sm:text-8xl">
            {profile.nameLead}
            <br />
            <span className="script font-normal tracking-[-0.01em]">
              {profile.nameAccent}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-9 max-w-2xl text-xl leading-[1.45] tracking-[-0.01em] sm:text-2xl">
            {profile.headline}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)]">
            {profile.subhead}
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn btn-primary">
              See the work
            </a>
            {profile.resumeHref ? (
              <a
                href={profile.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Résumé ↗
              </a>
            ) : null}
            <a href="#contact" className="btn btn-ghost">
              Get in touch
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
