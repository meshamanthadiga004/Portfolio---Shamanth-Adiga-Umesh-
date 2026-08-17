import { profile } from "@/content/profile";

export default function Footer() {
  return (
    <footer className="px-6 pb-14">
      <div className="shell border-t border-[var(--hair)] pt-8">
        {/* Three columns on desktop so the location sits dead centre; stacks
            on narrow screens. */}
        <div className="grid gap-4 text-center sm:grid-cols-3 sm:items-center">
          <p className="meta sm:text-left">
            © {new Date().getFullYear()} {profile.name}
          </p>

          <p className="meta">{profile.location}</p>

          <a
            href="#top"
            className="meta transition-colors hover:text-[var(--accent)] sm:text-right"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
