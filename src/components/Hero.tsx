import { profile } from "@/content/profile";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-[92svh] items-center px-6 py-32"
    >
      <div className="shell text-center">
        <Reveal>
          <p className="eyebrow">{profile.location}</p>
        </Reveal>

        <Reveal delay={70}>
          <h1 className="hero-name mt-8">
            {profile.nameLead}{" "}
            <span className="grad-text italic">{profile.nameAccent}</span>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="hero-headline mx-auto mt-9 max-w-2xl">
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
