import { profile } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Contact() {
  return (
    <Section id="contact" num="05" label="Contact" title="Let's talk">
      <Reveal>
        <p className="lead mx-auto text-center text-[var(--muted)]">
          {profile.contactNote}
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-12 text-center">
          <p className="eyebrow">Best way to reach me</p>
          <a
            href={`mailto:${profile.email}`}
            className="grad-text mt-4 inline-block break-all text-2xl italic leading-tight transition-opacity hover:opacity-75 sm:text-4xl"
          >
            {profile.email}
          </a>
        </div>
      </Reveal>

      {profile.phone ? (
        <Reveal delay={120}>
          <p className="mx-auto mt-8 text-center text-[var(--muted)]">
            Prefer to call?{" "}
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              className="whitespace-nowrap text-[var(--ink)] underline decoration-[var(--hair)] underline-offset-4 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
            >
              {profile.phone}
            </a>
            . Email reaches me fastest and keeps everything in one thread — I&rsquo;ll
            always reply there first.
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={160}>
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {profile.socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[17px] text-[var(--muted)] underline underline-offset-4 transition-colors hover:text-[var(--accent)]"
            >
              {s.label} ↗
            </a>
          ))}
          {profile.resumeHref ? (
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[17px] text-[var(--muted)] underline underline-offset-4 transition-colors hover:text-[var(--accent)]"
            >
              Résumé ↗
            </a>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
