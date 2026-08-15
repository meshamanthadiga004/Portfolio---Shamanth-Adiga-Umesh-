import { profile } from "@/content/profile";

export default function Footer() {
  return (
    <footer className="px-6 pb-12">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 border-t border-[var(--hair)] pt-8">
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
