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
    bodySize: "1rem", // 16px base
    bodyLeading: "1.8", // line height — higher = looser
    bodyTracking: "0.004em", // letter spacing
    leadSize: "1.1875rem", // intro paragraphs (About, Contact)
    leadLeading: "1.75",
    metaSize: "0.875rem", // dates, org names, small print

    // Hero
    heroName: "clamp(2.5rem, 6.4vw, 4.25rem)",
    heroHeadline: "clamp(1.35rem, 2.8vw, 1.75rem)",

    // Section headings — left large on purpose, they anchor each section.
    sectionLabel: "0.9375rem", // the small ABOUT / WORK eyebrow
    sectionLabelTracking: "0.24em",
    sectionTitle: "clamp(2rem, 4.4vw, 3.25rem)",
    sectionTitleLeading: "1.14",

    // Cards
    cardTitle: "clamp(1.35rem, 2.6vw, 1.8rem)", // project titles
    subTitle: "1.3rem", // job roles, degrees
    metricValue: "2.25rem", // numbers inside project cards
    statValue: "2.25rem", // numbers in the About stat grid
    chipSize: "0.875rem",
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
    spacing: 118, // px between icons — larger = sparser
    iconSize: 22, // icon width/height in px. Keep small.
    iconOpacity: 0.13, // resting opacity, 0-1. These sit behind body text,
    // so raise carefully — past ~0.18 they start to compete with it.
    strokeWidth: 1.5, // stencil line weight, in the icon's own 24px grid

    /* The field drifts upward forever, like film credits. */
    creditSpeed: 0.22, // px per frame — roughly 13px/sec at 60fps
    jitter: 30, // px of random offset per icon. Higher = more zigzag.
    rowStagger: 0.5, // alternate rows shift by this fraction of `spacing`

    /* Cursor interaction. Low springBack plus high damping is what makes the
       field go messy on hover and take a couple of seconds to re-settle. */
    influenceRadius: 165, // how far from the cursor icons react
    pushStrength: 0.85, // how hard icons are shoved. Higher = messier.
    springBack: 0.018, // pull back home. Lower = slower, looser recovery.
    damping: 0.94, // velocity decay. Higher = drifts longer before settling.
    maxOffset: 55, // px cap on displacement

    washOpacity: 0.16, // the soft gradient glow behind everything
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
    enabled: true, // false disables all sound site-wide
    volume: 0.2, // master volume, 0-1. Keep gentle.

    /* Bowed string ensemble. Each note is built additively from a harmonic
       series of sines rather than a sawtooth — that is the difference
       between "strings" and "synth pad". */
    intro: true,
    introVolume: 1.0, // relative to master
    introChord: [130.81, 196.0, 261.63, 329.63, 392.0, 523.25], // C major spread
    introAttack: 1.1, // seconds to swell in — the bow taking hold
    introRelease: 3.6, // seconds to fade out
    introDetune: 6, // cents between the two voices of each note
    introVibrato: 5.2, // Hz — string section vibrato rate
    introBow: 0.5, // breath of bow noise at onset, 0 = none

    /* Small bell. Inharmonic partials, quick decay, no sustain. */
    click: true,
    clickVolume: 0.42,
    clickPitch: 1250, // Hz fundamental — higher is a thinner "ting"
    clickDecay: 0.3, // seconds

    /* Mouse-wheel ratchet. One detent tick per `scrollDetent` pixels, so a
       fast scroll runs them together into a "trrrr" and a slow one ticks. */
    scroll: true,
    scrollVolume: 0.5,
    scrollDetent: 13, // px of scroll between ticks
  },
};

export type Theme = typeof theme;
