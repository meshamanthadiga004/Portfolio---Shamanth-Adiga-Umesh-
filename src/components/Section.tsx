export default function Section({
  id,
  label,
  /** Two-digit editorial numeral shown beside the label, e.g. "01". */
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
    /* No top border or rule — sections flow into one another as a single
       continuous scroll; only the anchor id marks the boundary. */
    <section id={id} className={`px-6 py-24 sm:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-14 text-center">
          <p className="eyebrow flex items-center justify-center gap-3">
            {num ? <span className="tabular grad-text">{num}</span> : null}
            <span>{label}</span>
          </p>
          {title ? (
            <h2 className="mt-5 text-3xl leading-[1.2] sm:text-[2.75rem] sm:leading-[1.15]">
              {title}
            </h2>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
