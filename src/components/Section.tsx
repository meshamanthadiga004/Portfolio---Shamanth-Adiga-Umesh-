export default function Section({
  id,
  label,
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
    /* Sizes come from theme.ts via .eyebrow / .section-title. */
    <section id={id} className={`section-pad px-6 ${className}`}>
      <div className="shell">
        <div
          className="text-center"
          style={{ marginBottom: "var(--section-gap)" }}
        >
          <p className="eyebrow flex items-center justify-center gap-3">
            {num ? <span className="tabular grad-text">{num}</span> : null}
            <span>{label}</span>
          </p>
          {title ? <h2 className="section-title mt-5">{title}</h2> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
