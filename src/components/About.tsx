import { profile } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function About() {
  return (
    <Section id="about" num="01" label="About">
      <div className="space-y-8">
        {profile.about.map((para, i) => (
          <Reveal key={i} delay={i * 70}>
            <p className="lead mx-auto text-[var(--muted)]">{para}</p>
          </Reveal>
        ))}
      </div>

      {profile.stats.length > 0 ? (
        <Reveal delay={140}>
          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--hair)] bg-[var(--hair)] sm:grid-cols-4">
            {profile.stats.map((s) => (
              <div
                key={s.label}
                className="bg-[var(--surface)] px-5 py-7 text-center"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="tabular grad-text text-4xl leading-none">
                  {s.value}
                </dd>
                <p className="mx-auto mt-3 text-xs leading-snug text-[var(--muted)]">
                  {s.label}
                </p>
              </div>
            ))}
          </dl>
        </Reveal>
      ) : null}

      <div className="mt-16 grid gap-5 sm:grid-cols-3">
        {profile.pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 70}>
            <div className="card h-full p-6">
              <h3 className="text-base">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-[1.8] text-[var(--muted)]">
                {pillar.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
