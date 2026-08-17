import { certifications, toolkit } from "@/content/profile";
import { theme } from "@/content/theme";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Toolkit() {
  return (
    <Section id="toolkit" num="04" label="Toolkit" title="How I work">
      <div className="grid sm:grid-cols-2 gap-5">
        {toolkit.map((group, i) => (
          <Reveal key={group.group} delay={i * 60}>
            <div className="card h-full p-6 sm:p-7">
              <h3 className="eyebrow">{group.group}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Switched off in theme.ts -> sections.certifications. */}
      {theme.sections.certifications && certifications.length > 0 ? (
        <>
          <h3 className="eyebrow mt-20 mb-8 text-center">Certifications</h3>
          <ul className="card divide-y divide-[var(--hair-soft)] px-6 py-2 sm:px-8">
            {certifications.map((cert) => (
              <li
                key={cert.name}
                className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-4"
              >
                {cert.href ? (
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 transition-colors hover:text-[var(--accent)]"
                  >
                    {cert.name} ↗
                  </a>
                ) : (
                  <span>{cert.name}</span>
                )}
                <span className="text-[17px] text-[var(--muted)]">
                  {cert.issuer}
                </span>
                <span className="tabular ml-auto text-[17px] text-[var(--muted)]">
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
