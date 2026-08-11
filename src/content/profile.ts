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
  name: "Shamanth Adiga Umesh",
  /** Appears in the browser tab and in Google results. */
  seoTitle: "Shamanth Adiga Umesh — MBA | Data Science & Analytics",
  seoDescription:
    "TODO: One line a recruiter would read in search results. e.g. MBA candidate at X, working at the intersection of strategy, finance and analytics.",
  /** Your live URL once deployed. Used for social share cards. */
  siteUrl: "https://your-portfolio.vercel.app",

  // -------------------------------------------------------------------- hero
  /** Short. This is your positioning, not your job title. */
  headline:
    "I turn ambiguous business problems into decisions to can act on.",
  /** 1-2 sentences under the headline. Concrete beats grand. */
  subhead:
    "TODO: MBA candidate at Jain Deemed-to be-University, [Data Science & Analytics]. I work across strategy, financial analysis and product analytics — building the case, the model, and the recommendation.",
  location: "Bengaluru, KA, India",
  /**
   * Path to your resume PDF. Leave as "" and every Résumé button hides itself —
   * better than linking to a 404. When you have the file, drop it in public/
   * with this exact name and restore the path below.
   */
  resumeHref: "", // "/Shamanth_Adiga_Umesh_Resume.pdf"


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
    slug: "smartphone-market-analytics",
    title:
      "What Drives Smartphone Pricing — Specifications or the Buyer?",
    category: "Analytics",
    status: "shipped",
    timeframe: "Jul 2026",
    context: "MBA data science capstone",
    problem:
      "A smartphone retailer wanted to know whether price, adoption and satisfaction are driven by what a device is, or by who is buying it — the answer decides whether segmentation should be built on specifications or on demographics.",
    approach: [
      "Ran 18 hypothesis tests — t-tests, ANOVA and chi-square — across 990 records and 22 variables in Python, testing brand, hardware specification and buyer demographics against price tier.",
      "Tested specification effects and demographic effects separately, so the demographic question could be answered rather than assumed.",
      "Built 15 Tableau worksheets into a 12-panel storyboard, mapping each statistical result to a merchandising decision it could inform.",
    ],
    outcome: [
      "Brand is the dominant price driver (ANOVA F = 105.69, p < 0.001), and operating system determines hardware tier — RAM F = 143.92, screen size F = 389.85.",
      "No demographic variable held up — neither age, gender nor occupation predicted device choice — so recommended specification-based segmentation over demographic targeting.",
      "Mumbai salaries came in significantly above Delhi (p = 0.00024), consistent with the regional skew toward premium devices.",
    ],
    metrics: [
      { value: "990", label: "Records, 22 variables" },
      { value: "18", label: "Hypothesis tests run" },
      { value: "0", label: "Demographic predictors that held" },
    ],
    tools: [
      "Python",
      "Pandas",
      "SciPy",
      "ANOVA",
      "Chi-square",
      "Tableau",
      "Jupyter",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/meshamanthadiga004/smartphone-market-analytics",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // TEMPLATE — copy this block for each new project.
  // Delete it once you have two or three real projects; an empty pipeline
  // reads better than a visible placeholder.
  // --------------------------------------------------------------------------
  {
    slug: "next-project",
    title: "TODO: Name the project by its question, not its topic",
    category: "Strategy", // Strategy | Finance | Analytics | Operations | Marketing
    status: "planned", // shipped | in-progress | planned
    timeframe: "TODO: Planned — Oct 2026",
    context: "TODO: Self-initiated / Course capstone / Live project with [X]",
    problem:
      "TODO: The decision you're answering, in one sentence. Write this before you start — it sharpens the project.",
    approach: [
      "TODO: The method you intend to use — data source, framework, test.",
    ],
    outcome: [
      "TODO: What good looks like. Keep it as an intention until it's done.",
    ],
    metrics: [],
    tools: ["TODO: Excel", "Python"],
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
