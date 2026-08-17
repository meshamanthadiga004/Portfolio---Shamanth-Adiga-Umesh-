import { profile } from "@/content/profile";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-[82svh] items-center px-6 py-24"
    >
      <div className="shell">
        <Reveal>
          <div className="card px-6 py-14 text-center sm:px-10 sm:py-16">
            <h1 className="hero-name">
              {profile.nameLead}{" "}
              <span className="grad-text italic">{profile.nameAccent}</span>
            </h1>

            <p className="hero-headline mx-auto mt-8 max-w-2xl">
              {profile.headline}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {profile.resumeHref ? (
                <a
                  href={profile.resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Résumé ↗
                </a>
              ) : null}
              <a
                href="#work"
                className={
                  profile.resumeHref ? "btn btn-ghost" : "btn btn-primary"
                }
              >
                See the work
              </a>
              <a href="#contact" className="btn btn-ghost">
                Get in touch
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
