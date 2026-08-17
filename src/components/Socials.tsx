import { profile } from "@/content/profile";

/* Inline paths so there are no icon-library dependencies and no network
   requests. Matched by the `label` field in profile.socials. */
const ICONS: Record<string, string> = {
  linkedin:
    "M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z",
  github:
    "M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.9c-2.78.62-3.37-1.23-3.37-1.23-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.34 1.12 2.91.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2z",
  email: "M3 5h18v14H3zM3 6l9 7 9-7",
  call: "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.6a1 1 0 0 1-.25 1z",
};

/* Stroked outlines rather than solid fills. */
const STROKED = new Set(["email"]);

export default function Socials({
  className = "",
  includeEmail = false,
  includePhone = false,
}: {
  className?: string;
  includeEmail?: boolean;
  includePhone?: boolean;
}) {
  const items = [...profile.socials];
  if (includeEmail) {
    items.push({ label: "Email", href: `mailto:${profile.email}` });
  }
  if (includePhone && profile.phone) {
    items.push({
      label: "Call",
      href: `tel:${profile.phone.replace(/\s+/g, "")}`,
    });
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {items.map((s) => {
        const key = s.label.toLowerCase();
        const path = ICONS[key];
        const external = !/^(mailto:|tel:)/.test(s.href);
        return (
          <a
            key={s.href}
            href={s.href}
            target={external ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hair)] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {path ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={STROKED.has(key) ? "none" : "currentColor"}
                stroke={STROKED.has(key) ? "currentColor" : "none"}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={path} />
              </svg>
            ) : (
              <span className="text-xs">{s.label.slice(0, 2)}</span>
            )}
          </a>
        );
      })}
    </div>
  );
}
