/* ============================================================================
   THIS IS THE ONLY FILE YOU NEED TO EDIT.
   Everything on the site is driven from here. Replace the placeholder values
   (marked with TODO) with your own. Adding a project = adding one object to
   the `projects` array below.
   ========================================================================== */

export type ProjectStatus = "shipped" | "in-progress" | "planned";

export type Project = {
  /** URL-safe id, used as the anchor link. Keep it unique. */
  slug: string;
  title: string;
  /** Shown as the small tag above the title. Keep to one of your themes. */
  category: "Strategy" | "Finance" | "Analytics" | "Operations" | "Marketing";
  status: ProjectStatus;
  /** e.g. "Mar 2026" for finished work, "Target: Jun 2026" for planned work. */
  timeframe: string;
  /** Who it was for / where it lived. "Self-initiated" is a fine answer. */
  context: string;
  /** One sentence. The business question you were actually answering. */
  problem: string;
  /** 2-4 bullets. What you did — method, data, framework. */
  approach: string[];
  /** 2-3 bullets. What came out of it. Quantify wherever you honestly can. */
  outcome: string[];
  /** 0-3 headline numbers. These are what a recruiter's eye lands on. */
  metrics: { value: string; label: string }[];
  /** Tools, frameworks, methods. Shown as small badges. */
  tools: string[];
  /** Deck, model, dashboard, write-up. Omit or leave empty if not public yet. */
  links?: { label: string; href: string }[];
};

export const profile = {
  // ---------------------------------------------------------------- identity
  name: "TODO: Your Full Name",
  /** Appears in the browser tab and in Google results. */
  seoTitle: "TODO: Your Full Name — MBA | Strategy & Finance",
  seoDescription:
    "TODO: One line a recruiter would read in search results. e.g. MBA candidate at X, working at the intersection of strategy, finance and analytics.",
  /** Your live URL once deployed. Used for social share cards. */
  siteUrl: "https://your-portfolio.vercel.app",

  // -------------------------------------------------------------------- hero
  /** Short. This is your positioning, not your job title. */
  headline:
    "I turn ambiguous business problems into decisions someone can act on.",
  /** 1-2 sentences under the headline. Concrete beats grand. */
  subhead:
    "TODO: MBA candidate at [School], [Specialisation]. I work across strategy, financial analysis and product analytics — building the case, the model, and the recommendation.",
  location: "TODO: City, Country",
  /** Put your resume PDF at public/resume.pdf and leave this as-is. */
  resumeHref: "/resume.pdf",

  // ------------------------------------------------------------------- about
  about: [
    "TODO: Paragraph one. What kind of problems you're drawn to and why. Avoid adjectives about yourself — describe the work instead. Two or three sentences.",
    "TODO: Paragraph two. Your background before the MBA and what it gives you that a pure generalist doesn't have. End with what you're looking for next.",
  ],

  // ------------------------------------------------- what you're good at
  /** 3-4 pillars. These are the claims your projects below have to prove. */
  pillars: [
    {
      title: "Structured problem-solving",
      body: "TODO: Issue trees, hypothesis-driven analysis, MECE breakdowns — and knowing when the framework is getting in the way.",
    },
    {
      title: "Financial modelling",
      body: "TODO: Three-statement models, DCF and comparables, unit economics and scenario analysis in Excel.",
    },
    {
      title: "Data & analytics",
      body: "TODO: SQL, Python and dashboarding to get from raw data to a number a decision can hang on.",
    },
  ],

  // --------------------------------------------------------------- contact
  email: "TODO: you@example.com",
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/TODO" },
    { label: "GitHub", href: "https://github.com/TODO" }, // delete if unused
  ],
  /** Closing line above the email address. */
  contactNote:
    "TODO: I'm looking for [summer internship / full-time] roles in [consulting / corporate finance / product]. Happy to talk about anything on this page.",
};

// ============================================================================
// PROJECTS — the core of the page.
//
// Order matters: put your strongest work first, regardless of date. Set
// `status: "in-progress"` or `"planned"` for work you haven't finished; it
// renders with a status badge so nothing here overstates what you've done.
// ============================================================================

export const projects: Project[] = [
  {
    slug: "market-entry-study",
    title: "TODO: Market Entry Assessment — [Company] into [Market]",
    category: "Strategy",
    status: "shipped",
    timeframe: "TODO: Mar 2026",
    context: "TODO: National case competition / Course capstone / Self-initiated",
    problem:
      "TODO: State the decision, not the topic. 'Should [X] enter [Y] market, and if so through which channel?' beats 'A study of the [Y] market.'",
    approach: [
      "TODO: Sized the market bottom-up from [source], cross-checked against [source].",
      "TODO: Screened three entry modes against capital intensity, time-to-revenue and regulatory exposure.",
      "TODO: Interviewed N practitioners / ran a survey of N respondents to test the demand assumption.",
    ],
    outcome: [
      "TODO: Recommended [specific action] over [alternative], on the basis of [the one number that decided it].",
      "TODO: Placed top-N of M teams / adopted by [whoever] / published at [link].",
    ],
    metrics: [
      { value: "TODO ₹XXCr", label: "Addressable market sized" },
      { value: "TODO 3", label: "Entry modes evaluated" },
      { value: "TODO Top 5", label: "of 120 teams" },
    ],
    tools: ["Porter's Five Forces", "TAM/SAM/SOM", "Excel", "PowerPoint"],
    links: [
      { label: "Deck (PDF)", href: "TODO: link to a public Drive/Notion file" },
    ],
  },
  {
    slug: "equity-valuation",
    title: "TODO: Equity Research & DCF Valuation — [Ticker]",
    category: "Finance",
    status: "shipped",
    timeframe: "TODO: Jan 2026",
    context: "TODO: Finance & Investment Club / Independent",
    problem:
      "TODO: Is [Company] mispriced at its current level, and what would have to be true for the market to be right?",
    approach: [
      "TODO: Built a three-statement model with revenue driven by [volume × price / segment build-up].",
      "TODO: Valued via DCF (WACC X%, terminal growth Y%) and triangulated against a comparables set of N peers.",
      "TODO: Ran scenarios on the two assumptions the valuation was most sensitive to.",
    ],
    outcome: [
      "TODO: Arrived at a fair value of ₹X vs a market price of ₹Y — a BUY/HOLD/SELL with a Z% margin of safety.",
      "TODO: Thesis rested on [the non-consensus view], which the sell-side was under-weighting.",
    ],
    metrics: [
      { value: "TODO ₹X", label: "Intrinsic value / share" },
      { value: "TODO ±X%", label: "vs market price" },
      { value: "TODO 5yr", label: "Forecast horizon" },
    ],
    tools: ["DCF", "Comparable Companies", "Sensitivity Analysis", "Excel"],
    links: [{ label: "Model & write-up", href: "TODO" }],
  },
  {
    slug: "product-teardown",
    title: "TODO: Growth Analysis — [Product]",
    category: "Analytics",
    status: "in-progress",
    timeframe: "TODO: In progress — targeting May 2026",
    context: "TODO: Self-initiated",
    problem:
      "TODO: Where is [Product] losing users between acquisition and habit, and which fix has the best return on effort?",
    approach: [
      "TODO: Rebuilt the funnel from public data / an instrumented clone and located the largest drop-off.",
      "TODO: Segmented cohorts by acquisition channel to separate a traffic-quality problem from a product problem.",
      "TODO: Sized each candidate intervention by reach × expected lift × build cost.",
    ],
    outcome: [
      "TODO: Expected outcome — leave this honest while the work is open. 'Aiming to produce a prioritised backlog with sized impact per item.'",
    ],
    metrics: [{ value: "TODO", label: "Fill in on completion" }],
    tools: ["SQL", "Python", "Cohort Analysis", "RICE Prioritisation"],
  },
  {
    slug: "ops-improvement",
    title: "TODO: Process Redesign — [Function] at [Company]",
    category: "Operations",
    status: "planned",
    timeframe: "TODO: Planned — Aug 2026",
    context: "TODO: Live project with [Company] / Summer internship",
    problem:
      "TODO: The question you'll be answering. Write it now — it sharpens the project before you start.",
    approach: [
      "TODO: Planned method. Value stream mapping, time-and-motion study, queueing analysis — whatever you actually intend to do.",
    ],
    outcome: [
      "TODO: What good looks like. Keep it as an intention, not a claim.",
    ],
    metrics: [],
    tools: ["Value Stream Mapping", "Lean", "Excel"],
  },
];

// ============================================================================
// EXPERIENCE — reverse-chronological.
// ============================================================================

export const experience = [
  {
    role: "TODO: Summer Intern — Strategy",
    org: "TODO: Company Name",
    location: "TODO: City",
    period: "TODO: Apr 2026 — Jun 2026",
    /** 2-3 bullets. Lead each with the verb, close with the number. */
    points: [
      "TODO: What you owned, and the result. 'Rebuilt the vendor scorecard across 40 suppliers, cutting quarterly review time from 3 weeks to 4 days.'",
      "TODO: Second bullet.",
    ],
  },
  {
    role: "TODO: Previous Role",
    org: "TODO: Company Name",
    location: "TODO: City",
    period: "TODO: 2022 — 2025",
    points: [
      "TODO: Pre-MBA experience. This is what makes your MBA profile specific — don't undersell it.",
    ],
  },
];

// ============================================================================
// EDUCATION
// ============================================================================

export const education = [
  {
    degree: "TODO: MBA, [Specialisation]",
    school: "TODO: Institute Name",
    period: "TODO: 2025 — 2027",
    detail:
      "TODO: CGPA / rank / relevant coursework / club and committee roles. One line.",
  },
  {
    degree: "TODO: B.[Tech/Com/A], [Major]",
    school: "TODO: University Name",
    period: "TODO: 2019 — 2023",
    detail: "TODO: CGPA, honours, anything that still signals something.",
  },
];

// ============================================================================
// CERTIFICATIONS & TOOLKIT
// ============================================================================

export const certifications = [
  {
    name: "TODO: e.g. CFA Level I",
    issuer: "TODO: CFA Institute",
    year: "TODO: 2026",
    href: "", // optional credential link
  },
  {
    name: "TODO: e.g. Financial Modelling & Valuation",
    issuer: "TODO: Wall Street Prep",
    year: "TODO: 2025",
    href: "",
  },
];

export const toolkit = [
  {
    group: "Analysis",
    items: ["TODO: Excel (advanced)", "Financial Modelling", "DCF", "SQL", "Python"],
  },
  {
    group: "Frameworks",
    items: ["TODO: Porter's Five Forces", "MECE / Issue Trees", "Unit Economics", "RICE"],
  },
  {
    group: "Tools",
    items: ["TODO: Power BI", "Tableau", "PowerPoint", "Notion"],
  },
  {
    group: "Domains",
    items: ["TODO: Consumer", "Fintech", "SaaS", "Manufacturing"],
  },
];

// ============================================================================
// NAV — remove an entry here to remove the section link from the header.
// ============================================================================

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Toolkit", href: "#toolkit" },
  { label: "Contact", href: "#contact" },
];
