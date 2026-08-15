export default function Section({
  id,
  label,
  /** Two-digit editorial numeral shown before the label, e.g. "01". */
  num,
  title,
  children,
  className = "",
}: {
  id: string;
  label: string;
  num?: string;
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
          <p className="flex shrink-0 items-baseline gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)] sm:w-32">
            {num ? (
              <span className="tabular text-[var(--accent)]">{num}</span>
            ) : null}
            <span>{label}</span>
          </p>
          {title ? (
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
              {title}
            </h2>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
