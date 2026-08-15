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
      {/* ---------------------------------------------- desktop: vertical rail */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-20 flex-col items-center justify-between py-8 lg:flex">
        <a
          href="#top"
          className="rail-name py-2 transition-colors hover:text-[var(--accent)]"
        >
          {profile.name}
        </a>

        <nav className="flex flex-col items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-label={link.label}
              aria-current={active === link.href ? "true" : undefined}
              className="group relative flex items-center justify-center p-1"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  active === link.href
                    ? "h-2.5 w-2.5 bg-[var(--accent)]"
                    : "h-1.5 w-1.5 bg-[var(--muted)] opacity-45 group-hover:opacity-100"
                }`}
              />
              <span className="pointer-events-none absolute left-6 whitespace-nowrap rounded-full border border-[var(--hair)] bg-[var(--surface)] px-3 py-1 text-xs opacity-0 shadow-[var(--lift)] transition-opacity duration-200 group-hover:opacity-100">
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        <ThemeToggle />
      </aside>

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
