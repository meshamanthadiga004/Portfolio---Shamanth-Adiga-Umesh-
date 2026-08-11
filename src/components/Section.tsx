export default function Section({
  id,
  label,
  title,
  children,
  className = "",
}: {
  id: string;
  /** Small uppercase eyebrow above the heading. */
  label: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`border-t border-[var(--hair)] py-20 sm:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-10">
          <p className="shrink-0 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)] sm:w-32">
            {label}
          </p>
          {title ? (
            <h2 className="font-serif text-2xl leading-tight tracking-tight sm:text-3xl">
              {title}
            </h2>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
