import { profile } from "@/content/profile";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-[92svh] items-center px-6 py-32"
    >
      <div className="mx-auto w-full max-w-3xl text-center">
        <Reveal>
          <p className="eyebrow">{profile.location}</p>
        </Reveal>

        <Reveal delay={70}>
          <h1 className="mt-8 text-[2.75rem] leading-[1.15] sm:text-6xl sm:leading-[1.12]">
            {profile.nameLead}{" "}
            <span className="grad-text italic">{profile.nameAccent}</span>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="mx-auto mt-9 max-w-2xl text-2xl leading-[1.6] sm:text-[1.75rem] sm:leading-[1.5]">
            {profile.headline}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <p className="lead mx-auto mt-7 max-w-2xl text-[var(--muted)]">
            {profile.subhead}
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
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
