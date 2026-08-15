import { profile } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function About() {
  return (
    <Section id="about" num="01" label="About">
      <div className="grid gap-14 md:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-5">
          {profile.about.map((para, i) => (
            <Reveal key={i} delay={i * 70}>
              <p className="max-w-2xl text-lg leading-[1.65] sm:text-xl sm:leading-[1.6]">
                {para}
              </p>
            </Reveal>
          ))}

          {profile.stats.length > 0 ? (
            <Reveal delay={140}>
              <dl className="corner-dots mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--hair)] bg-[var(--hair)] sm:grid-cols-4">
                {profile.stats.map((s) => (
                  <div key={s.label} className="bg-[var(--surface)] px-5 py-6">
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="tabular font-serif text-4xl leading-none">
                      {s.value}
                    </dd>
                    <p className="mt-2.5 text-xs leading-snug text-[var(--muted)]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}
        </div>

        <div className="space-y-6">
          {profile.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 70}>
              <div className="card p-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
                    aria-hidden="true"
                  />
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {pillar.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
