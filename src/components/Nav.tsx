"use client";

import { useEffect, useState } from "react";
import { navLinks, pageLinks, profile } from "@/content/profile";
import Socials from "./Socials";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  /* Solidify the bar once the page moves, so it stays readable over content. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Highlight whichever section is currently in view. */
  useEffect(() => {
    /* Hrefs are "/#about" so they work from other pages too — take the id
       from after the hash. */
    const sections = navLinks
      .map((l) => document.getElementById(l.href.split("#")[1] ?? ""))
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
    /* Fixed for the whole page, so navigation is always one click away. */
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--hair)] bg-[color-mix(in_srgb,var(--paper)_82%,transparent)] backdrop-blur-lg"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[var(--header-width)] items-center justify-between gap-6 px-6 py-4">
        <a
          href="#top"
          className="shrink-0 text-[15px] tracking-[0.16em] uppercase transition-colors hover:text-[var(--accent)]"
        >
          {profile.name}
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className={`relative text-[15px] transition-colors ${
                active === link.href
                  ? "text-[var(--ink)]"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              {link.label}
              <span
                aria-hidden="true"
                className={`absolute -bottom-1.5 left-0 h-px transition-all duration-300 ${
                  active === link.href ? "w-full" : "w-0"
                }`}
                style={{ background: "var(--grad)" }}
              />
            </a>
          ))}

          {/* Separate pages sit after a divider, so they read as a different
              kind of destination from the in-page sections. */}
          <span
            aria-hidden="true"
            className="mx-1 h-4 w-px bg-[var(--hair)]"
          />

          {pageLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Socials className="hidden sm:flex" />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="text-[15px] text-[var(--muted)] lg:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-6 mb-3 rounded-2xl border border-[var(--hair)] bg-[var(--surface)] px-5 py-2 shadow-[var(--lift)] lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-[var(--hair-soft)] py-3 text-[17px] text-[var(--muted)] last:border-0"
            >
              {link.label}
            </a>
          ))}
          {pageLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="mt-1 block border-t border-[var(--hair)] py-3 text-[17px] text-[var(--accent)]"
            >
              {link.label} →
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
