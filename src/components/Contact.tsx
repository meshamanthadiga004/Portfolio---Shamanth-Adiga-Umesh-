import { profile } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Contact() {
  return (
    <Section id="contact" num="05" label="Contact" title="Let's talk">
      <Reveal>
        <p className="max-w-2xl text-lg leading-[1.65] text-[var(--muted)]">
          {profile.contactNote}
        </p>
      </Reveal>

      <Reveal delay={80}>
        <a
          href={`mailto:${profile.email}`}
          className="script mt-8 inline-block text-3xl leading-tight transition-opacity hover:opacity-75 sm:text-5xl"
        >
          {profile.email}
        </a>
      </Reveal>

      <Reveal delay={140}>
        <div className="mt-10 flex flex-wrap gap-6">
          {profile.socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--muted)] underline underline-offset-4 transition-colors hover:text-[var(--ink)]"
            >
              {s.label} ↗
            </a>
          ))}
          {profile.resumeHref ? (
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--muted)] underline underline-offset-4 transition-colors hover:text-[var(--ink)]"
            >
              Résumé ↗
            </a>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
