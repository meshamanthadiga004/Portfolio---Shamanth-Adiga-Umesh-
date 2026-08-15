import { profile } from "@/content/profile";

export default function Footer() {
  return (
    <footer className="px-6 pb-16">
      <div className="mx-auto w-full max-w-3xl border-t border-[var(--hair)] pt-8 text-center">
        <p className="text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a
          href="#top"
          className="mt-3 inline-block text-xs text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
