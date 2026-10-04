/**
 * One-command deploy.
 *
 *   npm run deploy                  build, commit, push
 *   npm run deploy -- "my message"  same, with your own commit message
 *   npm run deploy -- --fast        skip the build check
 *
 * Why it builds first: if the code doesn't compile, Vercel's build fails and
 * the site silently stays on the old version. Catching that here takes ~30
 * seconds and tells you exactly what's wrong, instead of leaving you
 * wondering why the site didn't change.
 */

import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

/* fileURLToPath, not URL.pathname — this folder contains spaces and an "&",
   which pathname percent-encodes into a path that doesn't exist. */
const root = fileURLToPath(new URL("..", import.meta.url));

const args = process.argv.slice(2);
const fast = args.includes("--fast");
const message =
  args.filter((a) => !a.startsWith("--")).join(" ") ||
  `Update site content — ${new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;

const run = (cmd, quiet = false) =>
  execSync(cmd, {
    cwd: root,
    stdio: quiet ? "pipe" : "inherit",
    encoding: "utf8",
  });

const capture = (cmd) =>
  execSync(cmd, { cwd: root, encoding: "utf8" }).trim();

const step = (n, text) => console.log(`\n[${n}/4] ${text}`);

try {
  /* ---------------------------------------------------- 1. anything to do? */
  step(1, "Checking for changes…");
  const changes = capture("git status --porcelain");
  if (!changes) {
    console.log("\nNothing to deploy — no files have changed since the last push.");
    console.log("If the site still looks wrong, the last deploy may have failed.");
    console.log("Check: https://vercel.com/dashboard\n");
    process.exit(0);
  }
  console.log(
    changes
      .split("\n")
      .map((l) => "       " + l.trim())
      .join("\n")
  );

  /* -------------------------------------------------------- 2. does it build? */
  if (fast) {
    step(2, "Skipping build check (--fast)");
  } else {
    step(2, "Building — this catches errors before Vercel sees them…");
    run("node node_modules/next/dist/bin/next build", true);
    console.log("       Build OK.");
  }

  /* ------------------------------------------------------------- 3. commit */
  step(3, `Committing: "${message}"`);
  run("git add -A");
  run(`git commit -q -m ${JSON.stringify(message)}`);

  /* --------------------------------------------------------------- 4. push */
  step(4, "Pushing to GitHub…");
  run("git push -q");

  console.log("\n✓ Deployed. Vercel rebuilds automatically — give it ~1 minute.");
  console.log("  https://portfolio-shamanth-adiga-umesh.vercel.app");
  console.log("  Then hard-refresh the page: Ctrl + Shift + R\n");
} catch (err) {
  console.error("\n✗ Deploy stopped.\n");

  const out = `${err.stdout ?? ""}${err.stderr ?? ""}`.trim() || err.message;
  if (out) console.error(out + "\n");

  if (/Type error|Failed to compile|error TS/i.test(out)) {
    console.error("That's a code error — nothing was pushed, so the live site is");
    console.error("untouched. Fix what's listed above and run it again.\n");
  } else if (/could not read Username|Authentication failed|403/i.test(out)) {
    console.error("GitHub refused the push. Sign in when the browser window opens,");
    console.error("or check your credentials in Windows Credential Manager.\n");
  } else if (/rejected|non-fast-forward|behind/i.test(out)) {
    console.error("GitHub has commits you don't. Run:  git pull --rebase");
    console.error("then deploy again.\n");
  }

  process.exit(1);
}
