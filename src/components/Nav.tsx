"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/content/profile";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  /* Highlight whichever section is currently in view. */
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.href.replace("#", "")))
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
    <>
      {/* ------------------------------- top bar: name + theme toggle only */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <a
            href="#top"
            className="text-base tracking-[0.16em] uppercase transition-colors hover:text-[var(--accent)]"
          >
            {profile.name}
          </a>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="meta lg:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {/* mobile dropdown — the left rail is desktop-only */}
        {open ? (
          <div className="mx-6 rounded-2xl border border-[var(--hair)] bg-[var(--surface)] px-5 py-2 shadow-[var(--lift)] lg:hidden">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="meta block border-b border-[var(--hair-soft)] py-3 last:border-0"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </header>

      {/* ----------------------- left rail: section links, stacked vertically */}
      <nav
        aria-label="Sections"
        className="fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 lg:flex xl:left-12"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={active === link.href ? "true" : undefined}
            className="rail-link flex items-center gap-3"
          >
            <span
              aria-hidden="true"
              className={`block h-px transition-all duration-300 ${
                active === link.href
                  ? "w-7 bg-[var(--accent)]"
                  : "w-3 bg-[var(--muted)] opacity-50"
              }`}
            />
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}
