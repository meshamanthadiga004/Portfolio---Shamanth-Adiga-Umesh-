"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/content/profile";
import ThemeToggle from "./ThemeToggle";

/** Initials for the compact nav mark, e.g. "Shamanth Adiga Umesh" -> "SAU". */
const initials = profile.name
  .split(/\s+/)
  .filter(Boolean)
  .map((w) => w[0]?.toUpperCase() ?? "")
  .join("")
  .slice(0, 3);

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  /* Highlight the section currently in view. */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0 || typeof IntersectionObserver === "undefined")
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="nav-pill mx-auto flex w-full max-w-3xl items-center justify-between gap-3 py-2 pl-4 pr-2">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <span className="status-dot" aria-hidden="true" />
          <span>{initials}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                active === link.href
                  ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          {profile.resumeHref ? (
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-[var(--ink)] px-4 py-1.5 text-sm text-[var(--paper)] transition-opacity hover:opacity-85 sm:inline-block"
            >
              Résumé
            </a>
          ) : (
            <a
              href="#contact"
              className="hidden rounded-full bg-[var(--ink)] px-4 py-1.5 text-sm text-[var(--paper)] transition-opacity hover:opacity-85 sm:inline-block"
            >
              Contact
            </a>
          )}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="px-2 text-sm text-[var(--muted)] md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="nav-pill mx-auto mt-2 w-full max-w-3xl overflow-hidden p-2 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-full px-4 py-2.5 text-sm text-[var(--muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
