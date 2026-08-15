import { profile } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Contact() {
  return (
    <Section id="contact" num="05" label="Contact" title="Let's talk">
      <Reveal>
        <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          {profile.contactNote}
        </p>
      </Reveal>

      <Reveal delay={80}>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-block font-serif text-2xl tracking-tight underline decoration-[var(--hair)] underline-offset-8 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)] sm:text-3xl"
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
