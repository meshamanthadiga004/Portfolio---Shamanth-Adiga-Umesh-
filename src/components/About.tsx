import { profile } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function About() {
  return (
    <Section id="about" num="01" label="About">
      <div className="grid gap-14 md:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          {profile.about.map((para, i) => (
            <Reveal key={i} delay={i * 70}>
              <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg sm:leading-relaxed">
                {para}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="space-y-7">
          {profile.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 70}>
              <div className="border-l-2 border-[var(--accent)] pl-4">
                <h3 className="text-sm font-medium">{pillar.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
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
