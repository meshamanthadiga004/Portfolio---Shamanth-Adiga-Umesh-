import type { Metadata } from "next";
import { adjacent, profile } from "@/content/profile";
import Dock from "@/components/Dock";
import Footer from "@/components/Footer";
import LiveBackdrop from "@/components/LiveBackdrop";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SoundSystem from "@/components/SoundSystem";

export const metadata: Metadata = {
  title: `Adjacent — ${profile.name}`,
  description:
    "Company Secretary track and extra-curricular work alongside the MBA.",
};

export default function AdjacentPage() {
  const { companySecretary: cs, music } = adjacent;

  return (
    <>
      <LiveBackdrop />
      <SoundSystem />

      <div className="above">
        <Nav />
        <main className="pt-24">
          {/* ------------------------------------------------------ header */}
          <section className="px-6 pb-4 pt-12">
            <div className="shell text-center">
              <Reveal>
                <p className="eyebrow">Adjacent</p>
              </Reveal>
              <Reveal delay={70}>
                <h1 className="section-title mt-5">Beside the MBA</h1>
              </Reveal>
              <Reveal delay={140}>
                <div className="card mt-8 p-6 text-left sm:p-8">
                  <p className="lead mx-auto text-[var(--muted)]">
                    {adjacent.intro}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* --------------------------------------------- company secretary */}
          <Section id="cs" num="01" label="Qualification" title={cs.heading}>
            <Reveal>
              <div className="card p-6 sm:p-8">
                <p className="lead mx-auto text-[var(--muted)]">{cs.body}</p>
              </div>
            </Reveal>

            <div
              className="mt-12 grid"
              style={{ gap: "var(--card-gap)" }}
            >
              {cs.stages.map((s, i) => (
                <Reveal key={s.stage} delay={i * 60}>
                  <div className="card p-6 sm:p-7">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="sub-title">{s.stage}</h3>
                      <span className="meta">{s.full}</span>
                      <span className="chip ml-auto">{s.status}</span>
                    </div>
                    <p className="mt-3 text-[var(--muted)]">{s.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {cs.subjects.length > 0 ? (
              <Reveal delay={200}>
                <div className="card mt-8 p-6 sm:p-7">
                  <h3 className="eyebrow">Papers that overlap the MBA</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cs.subjects.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ) : null}
          </Section>

          {/* -------------------------------------------------------- music */}
          <Section
            id="music"
            num="02"
            label="Extra-curricular"
            title={music.heading}
          >
            <Reveal>
              <div className="card p-6 sm:p-8">
                <p className="lead mx-auto text-[var(--muted)]">{music.body}</p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {music.practice.map((m, i) => (
                <Reveal key={m.name} delay={i * 60}>
                  <div className="card h-full p-6">
                    <h3 className="sub-title">{m.name}</h3>
                    <p className="mt-3 text-[var(--muted)]">{m.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {music.highlights.length > 0 ? (
              <div
                className="mt-8 grid"
                style={{ gap: "var(--card-gap)" }}
              >
                {music.highlights.map((hl, i) => (
                  <Reveal key={hl.title} delay={i * 60}>
                    <div className="card p-6 sm:p-7">
                      <p className="eyebrow">{hl.year}</p>
                      <h3 className="sub-title mt-3">{hl.title}</h3>
                      <p className="mt-3 text-[var(--muted)]">{hl.detail}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : null}

            {music.links.some((l) => l.href) ? (
              <Reveal delay={160}>
                <div className="mt-8 flex flex-wrap justify-center gap-6">
                  {music.links
                    .filter((l) => l.href)
                    .map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)] underline underline-offset-4 transition-opacity hover:opacity-75"
                      >
                        {l.label} ↗
                      </a>
                    ))}
                </div>
              </Reveal>
            ) : null}
          </Section>

          {/* -------------------------------------------------------- other */}
          {adjacent.other.length > 0 ? (
            <Section id="other" num="03" label="Also" title="Elsewhere">
              <div className="grid" style={{ gap: "var(--card-gap)" }}>
                {adjacent.other.map((o, i) => (
                  <Reveal key={o.title} delay={i * 60}>
                    <div className="card p-6 sm:p-7">
                      <h3 className="sub-title">{o.title}</h3>
                      <p className="mt-3 text-[var(--muted)]">{o.detail}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Section>
          ) : null}

          <div className="px-6 pb-8 text-center">
            <a href="/" className="btn btn-ghost">
              ← Back to the main page
            </a>
          </div>
        </main>
        <Footer />
        <Dock />
      </div>
    </>
  );
}
