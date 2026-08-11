# MBA Portfolio

A single-page portfolio built for an MBA profile: projects are framed as
**problem → approach → outcome** with headline metrics, and unfinished work
carries an honest status badge instead of being dressed up as complete.

Next.js 15 (App Router) · React 19 · Tailwind CSS 4 · TypeScript. No runtime
dependencies beyond React — animations use CSS and `IntersectionObserver`.

---

## The one file you edit

Everything on the page comes from [`src/content/profile.ts`](src/content/profile.ts).
Name, headline, projects, experience, education, certifications, nav links —
all of it. You should not need to touch a component to add content.

Every placeholder is marked `TODO:`. To find what's left:

```bash
grep -rn "TODO:" src/content/profile.ts
```

## Adding a project

Append an object to the `projects` array. The one that matters:

```ts
{
  slug: "unit-economics-teardown",
  title: "Unit Economics Teardown — Quick Commerce in Tier-2 India",
  category: "Finance",
  status: "in-progress",           // "shipped" | "in-progress" | "planned"
  timeframe: "Targeting Jul 2026",
  context: "Self-initiated",
  problem: "At what order density does a dark store break even?",
  approach: ["...", "..."],
  outcome: ["..."],
  metrics: [{ value: "₹41", label: "Contribution / order" }],
  tools: ["Excel", "Cohort Analysis"],
  links: [{ label: "Model", href: "https://..." }],
}
```

Projects render in array order, **not** by date — put your strongest work
first. The category filter chips and the "N complete · N in the pipeline"
counter update themselves.

Three notes on writing them well:

- **`problem` should name a decision**, not a topic. "Should X enter Y, and
  through which channel?" reads better than "A study of the Y market."
- **`metrics` are what a recruiter's eye lands on.** Three at most. If you
  can't quantify honestly, leave the array empty — a fabricated number is the
  one mistake that ends a conversation.
- **For `in-progress` and `planned` work**, the detail panel relabels itself
  "Intended outcome". Keep those bullets as intentions.

## Your résumé

Drop the PDF at `public/resume.pdf`. The header, hero and contact buttons all
point there already.

---

## Running it locally

Node 24 is installed at `C:\Program Files\nodejs`. Dependencies are already
installed, so:

```bash
npm run dev
```

Open http://localhost:3000.

### Known gotcha: the `&` in the folder path

This project lives under `Claude & Cowork`. On Windows, `npm.cmd` passes the
project path to `cmd.exe` unquoted, and `cmd.exe` treats `&` as a command
separator — so it truncates the path and fails with:

```
'Cowork\Portfolio\node_modules\.bin\' is not recognized as an internal or external command
```

Two ways around it:

- **Run `next` through Node directly**, bypassing the `cmd.exe` wrapper. This is
  what `.claude/launch.json` does:
  `"C:\Program Files\nodejs\node.exe" node_modules/next/dist/bin/next dev`
- **Rename the parent folder** to drop the ampersand (e.g. `Claude-Cowork`).
  This is the durable fix — the same breakage will hit other npm-based tools,
  and it costs nothing to do before you have a git remote attached.

Vercel is unaffected; it builds under a clean Linux path.

### If Tailwind throws `Missing field 'negated' on ScannerOptions.sources`

Turbopack cached the old PostCSS plugin against a newer native binding. Delete
the cache and restart:

```bash
rm -rf .next
```

## Deploying to Vercel

You do not need Node locally for this — Vercel builds in the cloud.

1. Create a GitHub repo and push this folder:

```bash
git init && git add -A && git commit -m "Initial portfolio"
```

2. Add your remote and push (replace the URL):

```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git && git branch -M main && git push -u origin main
```

3. At [vercel.com/new](https://vercel.com/new), import the repo. Vercel detects
   Next.js on its own — no configuration needed. It builds and gives you a live
   URL.
4. Set `siteUrl` in `profile.ts` to that URL so link previews resolve correctly.

Every later push to `main` redeploys automatically, so adding a project is:
edit `profile.ts` → commit → push.

## Design notes

- **Light and dark** both ship, switching on the visitor's system setting via
  `prefers-color-scheme`. Colours live as CSS variables at the top of
  `src/app/globals.css` — change `--color-accent` there and it propagates.
- **Type** uses system serif for headings and system sans for body, so there
  are no webfont requests and nothing to load before first paint.
- **Reduced motion** is respected: `prefers-reduced-motion` disables the
  scroll reveals and smooth scrolling entirely.
