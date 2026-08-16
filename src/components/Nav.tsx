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
      {/* ---------------------------------------------- desktop: top header */}
      <header className="fixed inset-x-0 top-0 z-50 hidden border-b border-[var(--hair)] bg-[var(--paper)]/85 backdrop-blur-md lg:flex">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#top"
            className="text-lg font-medium tracking-[0.18em] text-[var(--ink)] uppercase transition-colors hover:text-[var(--accent)]"
          >
            {profile.name}
          </a>

          <nav className="flex items-center gap-6 text-sm text-[var(--muted)]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={active === link.href ? "true" : undefined}
                className={`transition-colors hover:text-[var(--ink)] ${
                  active === link.href ? "text-[var(--ink)]" : ""
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </header>

      {/* ------------------------------------------------- mobile: compact bar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--hair)] bg-[var(--paper)]/85 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-6">
          <a href="#top" className="text-sm tracking-wide">
            {profile.name}
          </a>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="text-sm text-[var(--muted)]"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-[var(--hair)] bg-[var(--paper)] px-6 py-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-[var(--hair-soft)] py-3 text-sm text-[var(--muted)] last:border-0"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </header>
    </>
  );
}
