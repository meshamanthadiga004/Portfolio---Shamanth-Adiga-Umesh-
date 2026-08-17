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
  /**
   * The hero sets your name in two parts: `nameLead` in roman, then
   * `nameAccent` in gradient italic. Move the split wherever it reads best.
   * The left rail uses the full `name` above, not these.
   */
  nameLead: "Shamanth",
  nameAccent: "Adiga Umesh",
  /** Appears in the browser tab and in Google results. */
  seoTitle: "Shamanth Adiga Umesh — MBA | Data Science & Analytics",
  seoDescription:
    "TODO: One line a recruiter would read in search results. e.g. MBA candidate at X, working at the intersection of strategy, finance and analytics.",
  /** Your live URL once deployed. Used for social share cards. */
  siteUrl: "https://your-portfolio.vercel.app",

  // -------------------------------------------------------------------- hero
  /** Short. This is your positioning, not your job title. */
  headline:
    "I turn ambiguous business problems into decisions someone can act on.",
  location: "Bengaluru, KA, India",
  /**
   * Path to your resume PDF. Leave as "" and every Résumé button hides itself —
   * better than linking to a 404. When you have the file, drop it in public/
   * with this exact name and restore the path below.
   */
  resumeHref: "/Shamanth_Adiga_Umesh_Resume.pdf",


  // ------------------------------------------------------------------- about
  about: [
    "MBA candidate at JAIN (Deemed-to-be University), Bengaluru, specialising in Data Science & Analytics. I work across strategy, financial analytics, risk analysis and product analytics — building the case, the model, and the recommendation.",
    "TODO: Paragraph two. What kind of problems you're drawn to and why — describe the work rather than yourself. Two or three sentences.",
    "TODO: Paragraph three. Your background before the MBA and what it gives you that a pure generalist doesn't have. End with what you're looking for next.",
  ],

  /**
   * Academic record, shown in a bordered grid under the About text.
   * Set to [] to hide the grid entirely.
   *
   * Keep the format consistent across all four — either every entry is a
   * percentage or every entry is on a 10-point scale, not a mix. If your
   * boards were graded differently, write the unit into the label.
   */
  academics: [
    { value: "TODO: 92%", label: "Class X" },
    { value: "TODO: 88%", label: "Class XII" },
    { value: "TODO: 8.1", label: "B.Com / 10" },
    { value: "TODO: 8.4", label: "MBA / 10" },
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
  email: "shamanthadiga@hotmail.com",
  /** Secondary contact, shown under the email. "" hides it. */
  phone: "+91 8660572898",
  /**
   * Square photo shown at the end of the Contact section. Put the file in
   * public/ and reference it from the site root, e.g. "/portrait.jpg".
   * Leave "" and a labelled placeholder holds the space instead.
   */
  portrait: "/portrait.jpg",
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
    context: "MBA Data Science & Analytics",
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
    role: "Intern - Compliance and Regulatory Associate",
    org: "Bharadwaj and Hosmat, Chartered Accountants",
    location: "Bengaluru",
    period: "Jan 2025 - Apr 2025",
    /** 2-3 bullets. Lead each with the verb, close with the number. */
    points: [
      "Filed monthly GSTR-1, GSTR-3B, TDS, PF, and ESI returns for 10–20 clients on Tally Prime, on time and without errors.",
      "Reconciled financial records and drafted responses to GST notices, including cases where the penalty demand was simply wrong.",
      "Handled compliance for trusts and non-profits under the Indian Trusts Act, 1882, closure filings included.",
      "Supported company incorporations, statutory registrations, and RoC filings under the Companies Act, plus post-incorporation compliance and record-keeping.",
      "Worked directly with the GST Department, Income Tax Department, and Registrar of Companies to keep assignments on schedule.",
    ],
  },
];

// ============================================================================
// EDUCATION
// ============================================================================

/* `href` is optional — when set, the card gets a link out. The CS entry uses
   it to reach the Adjacent page, where the full track is laid out. */
export const education = [
  {
    degree: "Company Secretary (CS)",
    school: "Institute of Company Secretaries of India (ICSI)",
    period: "TODO: 2024 — present",
    detail:
      "TODO: One line on the current stage — which programme you're in and what's next.",
    href: "/adjacent",
    hrefLabel: "See the full CS track",
  },
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

/* Sections of the single-scroll home page. Hrefs are absolute so they also
   work from /adjacent, which is a separate page. */
export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Toolkit", href: "/#toolkit" },
  { label: "Contact", href: "/#contact" },
];

/* Separate pages, shown in the header after a visual gap. */
export const pageLinks = [{ label: "Adjacent", href: "/adjacent" }];

// ============================================================================
// ADJACENT — lives on its own page at /adjacent, not in the home scroll.
//
// Company Secretary first, then everything extra-curricular. I have filled in
// the structure (the ICSI route really does run CSEET -> Executive ->
// Professional -> training), but every fact about YOU is a TODO — I won't
// invent qualifications or performances, since those are exactly the claims a
// recruiter or the institute would verify.
// ============================================================================

export const adjacent = {
  intro:
    "TODO: Two sentences on why these sit beside the MBA rather than under it — what the CS route gives you that a management degree doesn't, and what music gives you that neither does.",

  companySecretary: {
    heading: "Company Secretary",
    body: "TODO: A short paragraph. Why you took up CS alongside the MBA, and where you intend it to lead — governance, compliance, secretarial practice, or as a complement to finance work.",
    /** The ICSI route, in order. Set `status` honestly. */
    stages: [
      {
        stage: "CSEET",
        full: "Company Secretary Executive Entrance Test",
        status: "TODO: Cleared / Registered / Planned",
        detail: "TODO: Month and year, and score or percentile if you want it here.",
      },
      {
        stage: "Executive Programme",
        full: "CS Executive — Modules I & II",
        status: "TODO: In progress / Cleared / Not started",
        detail:
          "TODO: Which modules and papers are cleared, and which attempt you're targeting next.",
      },
      {
        stage: "Professional Programme",
        full: "CS Professional",
        status: "TODO: Planned",
        detail: "TODO: Target window, and elective if you've chosen one.",
      },
      {
        stage: "Practical Training",
        full: "ICSI practical training",
        status: "TODO: Planned",
        detail: "TODO: Where, or the kind of firm you're aiming for.",
      },
    ],
    /** Subjects worth naming because they overlap with the MBA. */
    subjects: [
      "TODO: Company Law",
      "Securities Laws & Capital Markets",
      "Corporate Governance",
      "Tax Laws",
      "Financial & Strategic Management",
    ],
  },

  music: {
    heading: "Music",
    body: "TODO: A short paragraph. What you play, how long you've played it, and what it actually demands of you — the discipline angle lands better than the hobby angle.",
    /** Instruments, voice, production — whatever applies. */
    practice: [
      {
        name: "TODO: Instrument or discipline",
        detail: "TODO: Years, training, style or tradition, teacher if relevant.",
      },
      {
        name: "TODO: Second instrument or discipline",
        detail: "TODO: Years, training, style.",
      },
    ],
    /** Performances, recordings, competitions, ensembles. */
    highlights: [
      {
        title: "TODO: Performance, ensemble or release",
        year: "TODO: 2025",
        detail: "TODO: One line — venue, occasion, role, or what came of it.",
      },
    ],
    /** Optional. Public links: YouTube, SoundCloud, Spotify. Delete if none. */
    links: [{ label: "TODO: Listen", href: "" }],
  },

  /** Anything else that belongs beside the CV — sport, volunteering, writing. */
  other: [
    {
      title: "TODO: Activity",
      detail: "TODO: One line on what it involved and over what period.",
    },
  ],
};
