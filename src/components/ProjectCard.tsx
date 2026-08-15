"use client";

import { useState } from "react";
import type { Project, ProjectStatus } from "@/content/profile";

const STATUS_STYLES: Record<ProjectStatus, { label: string; className: string }> =
  {
    shipped: {
      label: "Complete",
      className: "border-[var(--hair)] text-[var(--muted)]",
    },
    "in-progress": {
      label: "In progress",
      className:
        "border-[color-mix(in_srgb,var(--accent)_50%,transparent)] text-[var(--accent)]",
    },
    planned: {
      label: "Planned",
      className: "border-dashed border-[var(--hair)] text-[var(--muted)]",
    },
  };

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const status = STATUS_STYLES[project.status];
  const hasDetail = project.approach.length > 0 || project.outcome.length > 0;

  return (
    <article id={project.slug} className="card card-interactive p-6 sm:p-8">
      {/* Meta row */}
      <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
          {project.category}
        </span>
        <span className="text-[var(--hair)]">·</span>
        <span className="text-xs text-[var(--muted)]">{project.timeframe}</span>
        <span className="text-[var(--hair)]">·</span>
        <span className="text-xs text-[var(--muted)]">{project.context}</span>
        <span
          className={`ml-auto rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      <h3 className="font-serif text-2xl leading-[1.15] sm:text-[2rem]">
        {project.title}
      </h3>

      <p className="mt-4 max-w-2xl leading-relaxed text-[var(--muted)]">
        {project.problem}
      </p>

      {project.metrics.length > 0 ? (
        <dl className="mt-7 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--hair)] bg-[var(--hair)] sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div key={m.label} className="bg-[var(--surface)] px-5 py-4">
              <dt className="sr-only">{m.label}</dt>
              <dd className="tabular font-serif text-3xl leading-none">
                {m.value}
              </dd>
              <p className="mt-2 text-xs leading-snug text-[var(--muted)]">
                {m.label}
              </p>
            </div>
          ))}
        </dl>
      ) : null}

      {hasDetail ? (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={`${project.slug}-detail`}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] transition-opacity hover:opacity-75"
          >
            {open ? "Hide detail" : "How I approached it"}
            <span
              aria-hidden="true"
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            >
              ↓
            </span>
          </button>

          {open ? (
            <div
              id={`${project.slug}-detail`}
              className="mt-6 grid gap-8 rounded-xl bg-[var(--accent-soft)] p-6 sm:grid-cols-2"
            >
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  Approach
                </h4>
                <ul className="mt-3 space-y-3">
                  {project.approach.map((point, i) => (
                    <li key={i} className="text-sm leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  {project.status === "shipped" ? "Outcome" : "Intended outcome"}
                </h4>
                <ul className="mt-3 space-y-3">
                  {project.outcome.map((point, i) => (
                    <li key={i} className="text-sm leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tools.map((tool) => (
          <span key={tool} className="chip">
            {tool}
          </span>
        ))}
      </div>

      {project.links && project.links.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-5 border-t border-[var(--hair-soft)] pt-5">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium transition-colors hover:text-[var(--accent)]"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}
