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
      className: "border-[var(--accent)] text-[var(--accent)]",
    },
    planned: {
      label: "Planned",
      className: "border-dashed border-[var(--hair)] text-[var(--muted)]",
    },
  };

export default function ProjectCard({
  project,
  /** The top divider is suppressed on the first card. Passed explicitly rather
   *  than via `first:` — each card sits in its own Reveal wrapper, so every one
   *  of them is a first child. */
  isFirst = false,
}: {
  project: Project;
  isFirst?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const status = STATUS_STYLES[project.status];
  const hasDetail = project.approach.length > 0 || project.outcome.length > 0;

  return (
    <article
      id={project.slug}
      className={`card-hover -mx-4 grid gap-6 rounded-lg px-4 py-10 md:grid-cols-[152px_minmax(0,1fr)] md:gap-10 ${
        isFirst ? "" : "border-t border-[var(--hair)]"
      }`}
    >
      {/* Left rail: when, where, status */}
      <div className="flex flex-row flex-wrap items-center gap-3 md:flex-col md:items-start md:gap-2 md:pt-1">
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${status.className}`}
        >
          {status.label}
        </span>
        <span className="text-xs text-[var(--muted)]">{project.timeframe}</span>
        <span className="text-xs text-[var(--muted)] md:mt-1">
          {project.context}
        </span>
      </div>

      {/* Right: the substance */}
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--accent)]">
          {project.category}
        </p>

        <h3 className="mt-2 font-serif text-xl leading-snug tracking-tight sm:text-2xl">
          {project.title}
        </h3>

        <p className="mt-3 max-w-2xl leading-relaxed text-[var(--muted)]">
          {project.problem}
        </p>

        {project.metrics.length > 0 ? (
          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd className="tabular font-serif text-3xl">{m.value}</dd>
                <p className="mt-0.5 text-xs text-[var(--muted)]">{m.label}</p>
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
              className="mt-6 text-sm text-[var(--accent)] underline underline-offset-4 transition-opacity hover:opacity-75"
            >
              {open ? "Hide detail" : "How I approached it"}
            </button>

            {open ? (
              <div
                id={`${project.slug}-detail`}
                className="mt-6 grid gap-8 rounded-lg bg-[var(--accent-soft)] p-6 sm:grid-cols-2"
              >
                <div>
                  <h4 className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                    Approach
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {project.approach.map((point, i) => (
                      <li
                        key={i}
                        className="text-sm leading-relaxed text-[var(--ink)]"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                    {project.status === "shipped" ? "Outcome" : "Intended outcome"}
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {project.outcome.map((point, i) => (
                      <li
                        key={i}
                        className="text-sm leading-relaxed text-[var(--ink)]"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="rounded border border-[var(--hair)] px-2 py-0.5 text-xs text-[var(--muted)]"
            >
              {tool}
            </span>
          ))}
        </div>

        {project.links && project.links.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-5">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline underline-offset-4 transition-colors hover:text-[var(--accent)]"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
