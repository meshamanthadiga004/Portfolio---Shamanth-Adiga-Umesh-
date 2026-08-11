import { education, experience } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Experience() {
  return (
    <Section id="experience" label="Experience" title="Where I've worked">
      <div className="space-y-10">
        {experience.map((job, i) => (
          <Reveal key={`${job.org}-${job.period}`} delay={i * 60}>
            <div className="grid gap-3 md:grid-cols-[152px_minmax(0,1fr)] md:gap-10">
              <p className="text-xs text-[var(--muted)] md:pt-1">{job.period}</p>
              <div>
                <h3 className="font-serif text-lg tracking-tight">{job.role}</h3>
                <p className="mt-0.5 text-sm text-[var(--muted)]">
                  {job.org} · {job.location}
                </p>
                <ul className="mt-3 space-y-2">
                  {job.points.map((point, j) => (
                    <li
                      key={j}
                      className="max-w-2xl pl-4 text-sm leading-relaxed text-[var(--muted)] before:mr-3 before:-ml-4 before:text-[var(--accent)] before:content-['—']"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <h3 className="mt-16 mb-8 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
        Education
      </h3>

      <div className="space-y-8">
        {education.map((ed, i) => (
          <Reveal key={ed.school} delay={i * 60}>
            <div className="grid gap-3 md:grid-cols-[152px_minmax(0,1fr)] md:gap-10">
              <p className="text-xs text-[var(--muted)] md:pt-1">{ed.period}</p>
              <div>
                <h4 className="font-serif text-lg tracking-tight">{ed.degree}</h4>
                <p className="mt-0.5 text-sm text-[var(--muted)]">{ed.school}</p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
                  {ed.detail}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
