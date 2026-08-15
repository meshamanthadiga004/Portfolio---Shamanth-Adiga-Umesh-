export default function Section({
  id,
  label,
  /** Two-digit editorial numeral shown above the label, e.g. "01". */
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
    <section id={id} className={`px-6 py-28 sm:py-36 ${className}`}>
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-16 text-center">
          <hr className="grad-rule mx-auto mb-10 w-24" />
          <p className="eyebrow flex items-center justify-center gap-3">
            {num ? <span className="tabular grad-text">{num}</span> : null}
            <span>{label}</span>
          </p>
          {title ? (
            <h2 className="mt-6 text-3xl leading-[1.2] sm:text-[2.75rem] sm:leading-[1.15]">
              {title}
            </h2>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
