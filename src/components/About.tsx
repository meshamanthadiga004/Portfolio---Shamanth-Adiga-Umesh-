import { profile } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function About() {
  return (
    <Section id="about" num="01" label="About" title="Who I am">
      <Reveal>
        <div className="card space-y-6 p-6 sm:p-8">
          {profile.about.map((para, i) => (
            <p key={i} className="lead mx-auto text-[var(--muted)]">
              {para}
            </p>
          ))}
        </div>
      </Reveal>

      {profile.academics.length > 0 ? (
        <Reveal delay={140}>
          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--hair)] bg-[var(--hair)] sm:grid-cols-4">
            {profile.academics.map((a) => (
              <div
                key={a.label}
                className="bg-[var(--surface)] px-5 py-7 text-center"
              >
                <dt className="sr-only">{a.label}</dt>
                <dd className="tabular grad-text stat-value">{a.value}</dd>
                <p className="mx-auto mt-3 text-[15px] leading-snug text-[var(--muted)]">
                  {a.label}
                </p>
              </div>
            ))}
          </dl>
        </Reveal>
      ) : null}

      <div
        className="mt-16 grid sm:grid-cols-3"
        style={{ gap: "var(--card-gap)" }}
      >
        {profile.pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 70}>
            <div className="card h-full p-6">
              <h3 className="text-xl">{pillar.title}</h3>
              <p className="mt-3 text-[17px] leading-[1.8] text-[var(--muted)]">
                {pillar.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
