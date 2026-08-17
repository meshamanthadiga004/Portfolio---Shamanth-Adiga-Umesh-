import ThemeToggle from "./ThemeToggle";

/**
 * Fixed theme switch in the bottom-right corner. Lives outside the header so
 * it stays put through every scroll and every page.
 */
export default function Dock() {
  return (
    <div className="fixed bottom-5 right-5 z-50 rounded-full border border-[var(--hair)] bg-[var(--surface)] p-1.5 shadow-[0_10px_34px_rgb(0_0_0/0.18)] sm:bottom-6 sm:right-6">
      <ThemeToggle />
    </div>
  );
}
