import { education, experience } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Experience() {
  return (
    <Section id="experience" num="03" label="Experience" title="Where I've worked">
      <div className="grid gap-5">
        {experience.map((job, i) => (
          <Reveal key={`${job.org}-${job.period}`} delay={i * 60}>
            <div className="card p-6 sm:p-8">
              <p className="eyebrow">{job.period}</p>
              <h3 className="mt-4 text-xl sm:text-2xl">{job.role}</h3>
              <p className="mt-1.5 text-[17px] text-[var(--muted)]">
                {job.org} · {job.location}
              </p>
              <ul className="mt-5 space-y-3">
                {job.points.map((point, j) => (
                  <li
                    key={j}
                    className="pl-5 text-[var(--muted)] before:-ml-5 before:mr-3 before:text-[var(--accent)] before:content-['—']"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <h3 className="eyebrow mt-20 mb-8 text-center">Education</h3>

      <div className="grid gap-5">
        {education.map((ed, i) => (
          <Reveal key={ed.school} delay={i * 60}>
            <div className="card p-6 sm:p-8">
              <p className="eyebrow">{ed.period}</p>
              <h4 className="mt-4 text-xl sm:text-2xl">{ed.degree}</h4>
              <p className="mt-1.5 text-[17px] text-[var(--muted)]">{ed.school}</p>
              <p className="mt-4 text-[var(--muted)]">{ed.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
