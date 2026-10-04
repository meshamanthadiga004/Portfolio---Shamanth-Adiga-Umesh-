"use client";

import { useMemo, useState } from "react";
import { projects } from "@/content/profile";
import { theme } from "@/content/theme";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Work() {
  const [filter, setFilter] = useState<string>("All");

  /* Two ways a project can be held back, both set by hand:
     - hidden: true on the project itself, in profile.ts
     - theme.sections.pipelineProjects = false, which hides every unfinished one
     Everything below counts only what survives this, so the filter chips and
     the counter can never advertise a project nobody can see. */
  const visible = useMemo(
    () =>
      projects.filter((p) => {
        if (p.hidden) return false;
        if (!theme.sections.pipelineProjects && p.status !== "shipped")
          return false;
        return true;
      }),
    []
  );

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(visible.map((p) => p.category)))],
    [visible]
  );

  const shown = useMemo(
    () =>
      filter === "All" ? visible : visible.filter((p) => p.category === filter),
    [filter, visible]
  );

  const completed = visible.filter((p) => p.status === "shipped").length;
  const pipeline = visible.length - completed;

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
            {completed} complete
            {pipeline > 0 ? ` · ${pipeline} in the pipeline` : ""}
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
