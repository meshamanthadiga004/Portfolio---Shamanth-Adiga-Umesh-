"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/content/profile";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--hair)] bg-[var(--paper)]/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <a
          href="#top"
          className="font-serif text-base tracking-tight hover:text-[var(--accent)]"
        >
          {profile.name}
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              {link.label}
            </a>
          ))}
          {profile.resumeHref ? (
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--hair)] px-4 py-1.5 text-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Résumé
            </a>
          ) : null}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-sm text-[var(--muted)]">
              {open ? "Close" : "Menu"}
            </span>
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--hair)] bg-[var(--paper)] md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col px-6 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--hair)] py-3 text-sm text-[var(--muted)] last:border-0"
              >
                {link.label}
              </a>
            ))}
            {profile.resumeHref ? (
              <a
                href={profile.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 text-sm text-[var(--accent)]"
              >
                Résumé ↗
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
