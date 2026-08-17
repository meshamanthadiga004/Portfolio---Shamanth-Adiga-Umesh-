"use client";

import { useMemo, useState } from "react";
import { projects } from "@/content/profile";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Work() {
  const [filter, setFilter] = useState<string>("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    []
  );

  const shown = useMemo(
    () =>
      filter === "All" ? projects : projects.filter((p) => p.category === filter),
    [filter]
  );

  const completed = projects.filter((p) => p.status === "shipped").length;

  return (
    <Section id="work" num="02" label="Work" title="Selected projects">
      <Reveal>
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`rounded-full border px-4 py-1.5 text-[17px] transition-colors ${
                filter === cat
                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                  : "border-[var(--hair)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="mt-2 w-full text-center text-[15px] text-[var(--muted)]">
            {completed} complete · {projects.length - completed} in the pipeline
          </span>
        </div>
      </Reveal>

      <div className="grid" style={{ gap: "var(--card-gap)" }}>
        {shown.map((project, i) => (
          <Reveal key={project.slug} delay={Math.min(i, 3) * 60}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
        {shown.length === 0 ? (
          <p className="py-10 text-[17px] text-[var(--muted)]">
            Nothing here yet under {filter}.
          </p>
        ) : null}
      </div>
    </Section>
  );
}
