/* ============================================================================
   VISUAL CONTROL PANEL

   Every colour, font size, spacing value and animation setting on the site is
   defined here. Change a number in this file and it propagates everywhere —
   you should never need to touch a component to adjust the look.

   Content (your name, projects, experience) lives in profile.ts instead.

   HOW IT WORKS
   The `color`, `type` and `layout` blocks are injected into the page as CSS
   custom properties by src/app/layout.tsx. The `backdrop` and `audio` blocks
   are read directly by their components.

   The site is dark-only. There is no light theme.
   ========================================================================== */

export const theme = {
  /* ------------------------------------------------------------------ COLOUR
     Black and gold. `gold` is the accent used for links and highlights;
     `gradFrom`/`gradTo` are the two ends of every gradient on the site. */
  color: {
    paper: "#0D0F12", // page background
    surface: "#15181C", // cards, panels
    surfaceAlpha: 0.72, // card translucency, 0 = invisible, 1 = solid
    ink: "#ECEEF0", // body text
    muted: "#98A2A9", // secondary text
    gold: "#C9AC72", // accent: links, active nav, bullets
    goldSoft: "#1C1C18", // tinted panel behind expanded project detail
    gradFrom: "#8CA0AE", // gradient start (cool slate)
    gradTo: "#D4B87A", // gradient end (warm gold)
    hair: "rgb(255 255 255 / 0.13)", // borders
    hairSoft: "rgb(255 255 255 / 0.07)", // faint dividers
  },

  /* -------------------------------------------------------------------- TYPE
     `clamp(min, preferred, max)` scales smoothly between phone and desktop.
     To make something bigger everywhere, raise all three numbers. */
  type: {
    // Body copy
    bodySize: "1.125rem", // 18px base
    bodyLeading: "1.85", // line height — higher = looser
    bodyTracking: "0.004em", // letter spacing
    leadSize: "1.375rem", // intro paragraphs (About, Contact)
    leadLeading: "1.75",
    metaSize: "0.9375rem", // dates, org names, small print

    // Hero
    heroName: "clamp(2.75rem, 7vw, 4.75rem)",
    heroHeadline: "clamp(1.5rem, 3.2vw, 2rem)",

    // Section headings — "About", "Selected projects", etc.
    sectionLabel: "0.9375rem", // the small ABOUT / WORK eyebrow
    sectionLabelTracking: "0.24em",
    sectionTitle: "clamp(2.5rem, 5.5vw, 3.75rem)",
    sectionTitleLeading: "1.12",

    // Cards
    cardTitle: "clamp(1.5rem, 3vw, 2.05rem)", // project titles
    subTitle: "1.5rem", // job roles, degrees
    metricValue: "2.5rem", // numbers inside project cards
    statValue: "2.75rem", // numbers in the About stat grid
    chipSize: "0.9375rem",
  },

  /* ------------------------------------------------------------------ LAYOUT */
  layout: {
    contentWidth: "48rem", // centred column for all sections
    headerWidth: "72rem", // wider, so nav sits near the screen edges
    sectionPaddingY: "7rem", // vertical breathing room per section
    sectionGap: "3.5rem", // gap under a section heading
    cardRadius: "18px",
    cardPadding: "2rem",
    cardGap: "1.25rem", // space between stacked cards
  },

  /* ---------------------------------------------------------------- BACKDROP
     The dot field behind the page. Dots sit still until the cursor passes,
     then get pushed in the direction the cursor is travelling and drift back.
     Nothing brightens — the movement is the whole effect, which keeps text
     readable. */
  backdrop: {
    enabled: true,
    dotSpacing: 36, // px between dots — larger = sparser
    dotSize: 1.3, // dot radius in px
    dotOpacity: 0.17, // resting opacity, 0-1. Keep low.
    influenceRadius: 120, // how far from the cursor dots react
    pushStrength: 0.55, // how hard dots are shoved. Higher = more dramatic.
    springBack: 0.05, // pull back home. Higher = snappier return.
    damping: 0.88, // velocity decay. Lower = settles faster.
    maxOffset: 26, // px cap on displacement, stops dots flying away
    washOpacity: 0.16, // the soft gradient glow behind the dots
  },

  /* ------------------------------------------------------------------- AUDIO
     All sounds are synthesised in the browser with the Web Audio API — there
     are no audio files to download.

     `startEnabled: false` is deliberate. Browsers block sound until the
     visitor interacts with the page, so audio cannot play on load no matter
     what this is set to; and recruiters often browse at work, where an
     unexpected noise is worse than no noise. The toggle in the header lets
     anyone turn it on, and the choice is remembered. */
  audio: {
    enabled: true, // false removes the sound toggle entirely
    startEnabled: false, // true = on by default once the visitor interacts
    volume: 0.18, // master volume, 0-1. Keep gentle.
    intro: true, // soft chord on first interaction
    click: true, // tick on links and buttons
    scroll: true, // faint tick as sections pass
  },
};

export type Theme = typeof theme;
