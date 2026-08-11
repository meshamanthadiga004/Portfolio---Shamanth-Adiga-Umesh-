import { profile } from "@/content/profile";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--hair)] px-6 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a
          href="#top"
          className="text-xs text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
