import { profile } from "@/content/profile";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    /* Height and padding come from theme.ts -> layout.heroMinHeight /
       heroCardPadY / heroCardPadX. */
    <section
      id="top"
      className="flex items-center px-6 py-20"
      style={{ minHeight: "var(--hero-min-height)" }}
    >
      <div className="shell">
        <Reveal>
          <div
            className="card text-center"
            style={{
              paddingBlock: "var(--hero-card-pad-y)",
              paddingInline: "var(--hero-card-pad-x)",
            }}
          >
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
