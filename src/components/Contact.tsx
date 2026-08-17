import { profile } from "@/content/profile";
import Portrait from "./Portrait";
import Reveal from "./Reveal";
import Section from "./Section";
import Socials from "./Socials";

export default function Contact() {
  return (
    <Section id="contact" num="05" label="Contact" title="Let's talk, connect with me">
      <Reveal>
        <div className="card p-6 text-center sm:p-8">
          <p className="lead mx-auto text-[var(--muted)]">
            {profile.contactNote}
          </p>

          <div className="mt-10">
            <p className="eyebrow">Best way to reach me</p>
            <a
              href={`mailto:${profile.email}`}
              className="grad-text mt-4 inline-block break-all text-2xl italic leading-tight transition-opacity hover:opacity-75 sm:text-4xl"
            >
              {profile.email}
            </a>
          </div>

          {profile.phone ? (
            <p className="mx-auto mt-8 text-[var(--muted)]">
              Prefer to call?{" "}
              <a
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                className="whitespace-nowrap text-[var(--ink)] underline decoration-[var(--hair)] underline-offset-4 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
              >
                {profile.phone}
              </a>
              . Email reaches me fastest and keeps everything in one thread —
              I&rsquo;ll always reply there first.
            </p>
          ) : null}

          <Socials className="mt-10 justify-center" includeEmail includePhone />

          {profile.resumeHref ? (
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost mt-8"
            >
              Download résumé ↗
            </a>
          ) : null}
        </div>
      </Reveal>

      <Reveal delay={200}>
        <Portrait />
      </Reveal>
    </Section>
  );
}
