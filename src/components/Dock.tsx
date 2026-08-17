import Socials from "./Socials";
import ThemeToggle from "./ThemeToggle";

/**
 * Fixed control cluster in the bottom-right corner: social links and the
 * theme switch. Lives outside the header so it stays put through every
 * scroll and every page, rather than being tied to the nav.
 */
export default function Dock() {
  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-[var(--hair)] bg-[var(--surface)] p-1.5 shadow-[0_10px_34px_rgb(0_0_0/0.18)] sm:bottom-6 sm:right-6"
      /* Sits above the backdrop but must never trap clicks meant for it. */
    >
      <Socials />
      <span
        aria-hidden="true"
        className="mx-0.5 h-5 w-px bg-[var(--hair)]"
      />
      <ThemeToggle />
    </div>
  );
}
