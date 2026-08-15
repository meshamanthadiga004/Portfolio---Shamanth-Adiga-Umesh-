import { profile } from "@/content/profile";
import InteractiveGradient from "./InteractiveGradient";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[92svh] items-center overflow-hidden px-6 py-32"
    >
      <InteractiveGradient />

      <div className="mx-auto w-full max-w-3xl text-center">
        <Reveal>
          <p className="eyebrow">{profile.location}</p>
        </Reveal>

        <Reveal delay={70}>
          <h1 className="mt-8 text-[2.6rem] leading-[1.15] sm:text-6xl sm:leading-[1.12]">
            {profile.nameLead}{" "}
            <span className="grad-text italic">{profile.nameAccent}</span>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="mx-auto mt-9 max-w-2xl text-xl leading-[1.7] sm:text-2xl sm:leading-[1.6]">
            {profile.headline}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-7 max-w-xl text-[var(--muted)]">
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
