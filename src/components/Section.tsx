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
    <section id={id} className={`px-6 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-12 border-t border-[var(--hair)] pt-6">
          <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            {num ? <span className="tabular text-[var(--accent)]">{num}</span> : null}
            <span>{label}</span>
          </p>
          {title ? (
            <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.1] tracking-[-0.02em] sm:text-5xl">
              {title}
            </h2>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
