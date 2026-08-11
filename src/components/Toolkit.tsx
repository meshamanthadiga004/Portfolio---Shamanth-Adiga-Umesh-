import { certifications, toolkit } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Toolkit() {
  return (
    <Section id="toolkit" label="Toolkit" title="How I work">
      <div className="grid gap-10 sm:grid-cols-2">
        {toolkit.map((group, i) => (
          <Reveal key={group.group} delay={i * 60}>
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                {group.group}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-[var(--hair)] px-2.5 py-1 text-sm text-[var(--ink)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {certifications.length > 0 ? (
        <>
          <h3 className="mt-16 mb-6 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
            Certifications
          </h3>
          <ul className="divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
            {certifications.map((cert) => (
              <li
                key={cert.name}
                className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3.5"
              >
                {cert.href ? (
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline underline-offset-4 hover:text-[var(--accent)]"
                  >
                    {cert.name} ↗
                  </a>
                ) : (
                  <span className="text-sm">{cert.name}</span>
                )}
                <span className="text-sm text-[var(--muted)]">{cert.issuer}</span>
                <span className="ml-auto text-xs text-[var(--muted)]">
                  {cert.year}
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </Section>
  );
}
