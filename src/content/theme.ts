/* ============================================================================
   VISUAL CONTROL PANEL

   Every colour, font size, spacing value and animation setting on the site is
   defined here. Change a number in this file and it propagates everywhere —
   you should never need to touch a component to adjust the look.

   Content (your name, projects, experience) lives in profile.ts instead.

   HOW IT WORKS
   The `color`, `type`, `layout` and `media` blocks are injected into the page
   as CSS custom properties by src/app/layout.tsx. The `sections`, `backdrop`
   and `audio` blocks are read directly by their components.
   ========================================================================== */

export const theme = {
  /* ---------------------------------------------------------------- SECTIONS
     Switch any part of the site off without deleting it. `false` removes the
     section from the page AND its link from the navigation; the code and your
     content stay exactly where they are, ready to switch back on.

     Use this rather than commenting code out — nothing gets lost, and turning
     something back on is a one-word edit. */
  sections: {
    about: true,
    work: true,
    experience: true,
    toolkit: true,
    certifications: false, // the list at the bottom of Toolkit
    contact: true,
    adjacent: true, // the /adjacent page and its header link
  },

  /* ------------------------------------------------------------------ COLOUR
     Black and gold. `gold` is the accent used for links and highlights;
     `gradFrom`/`gradTo` are the two ends of every gradient on the site. */
  /* Two palettes. Light is the default; the header toggle switches to dark and
     remembers the choice. Both gradients run bronze -> gold with no cool
     tones, so gradient text never picks up a blue cast. */
  color: {
    light: {
      paper: "#F7F5F1", // page background
      surface: "#FFFFFF", // cards, panels
      surfaceAlpha: 1, // card translucency, 0 = invisible, 1 = solid
      ink: "#17150F", // body text
      muted: "#6A6459", // secondary text
      gold: "#7A5C25", // accent: links, active nav — deep enough to read
      goldSoft: "#F5EEDF", // tinted panel behind expanded project detail
      gradFrom: "#7A5C25", // gradient start (dark bronze)
      gradTo: "#C6A353", // gradient end (gold)
      hair: "rgb(23 21 15 / 0.14)", // borders
      hairSoft: "rgb(23 21 15 / 0.07)", // faint dividers
      /* Backdrop stencils, inverted against the paper. Thin antialiased
         strokes lose a lot of weight, so this sits higher than it looks. */
      glyph: "#100E08", // near-black on light paper
      glyphOpacity: 0.22,
    },
    dark: {
      paper: "#0D0F12",
      surface: "#15181C",
      surfaceAlpha: 1,
      ink: "#FBFCFD", // near-white body text
      muted: "#BCC4CB", // secondary text — lifted so it stays readable
      gold: "#D4B87A",
      goldSoft: "#1C1C18",
      gradFrom: "#A8823A", // dark bronze
      gradTo: "#E7CE93", // pale gold
      hair: "rgb(255 255 255 / 0.13)",
      hairSoft: "rgb(255 255 255 / 0.07)",
      glyph: "#ECEEF0", // white on black — unchanged
      glyphOpacity: 0.13,
    },
  },

  /** Which palette a first-time visitor sees. */
  defaultTheme: "light" as "light" | "dark",

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
    headerWidth: "76rem", // wider, so nav sits near the screen edges
    /* With solid cards the panels supply their own weight, so the section
       padding is the gap between cards rather than around loose text. */
    sectionPaddingY: "3.25rem", // vertical breathing room per section
    sectionGap: "2rem", // gap under a section heading
    cardRadius: "18px",
    cardPadding: "2rem",
    cardGap: "1.25rem", // space between stacked cards

    /* Hero — the panel above About. */
    heroMinHeight: "82svh", // height of the hero band. "auto" shrinks to fit.
    heroCardPadY: "3.5rem", // padding inside the hero card, top and bottom
    heroCardPadX: "2.5rem", // and left/right
  },

  /* ------------------------------------------------------------------- MEDIA
     Displayed sizes for the portrait and signature. The images keep their own
     aspect ratios (set in profile.ts), so changing the width here scales the
     height with it — nothing is ever stretched or cropped. */
  media: {
    portraitWidth: "19rem", // ~304px
    signatureWidth: "11rem", // ~176px
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
    creditSpeed: 0.7, // px per frame — roughly 18px/sec at 60fps
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
    /* Cello foundation through to a high shimmer — the low C2 is what gives
       the chord its weight. */
    introChord: [65.41, 130.81, 196.0, 261.63, 329.63, 392.0, 523.25],
    introAttack: 1.3, // seconds to swell in — the bow taking hold
    introSustain: 1.2, // seconds held at full before the fade begins
    introRelease: 4.8, // seconds to fade out
    introDetune: 7, // cents between voices of each note
    introVibrato: 5.2, // Hz — string section vibrato rate
    introBow: 0.5, // breath of bow noise at onset, 0 = none
    introReverb: 0.55, // hall size, 0 = dry. This is most of the "grand".
    introShimmer: true, // high octave entering late, for lift

    /* Small bell. Inharmonic partials, quick decay, no sustain. */
    click: true,
    clickVolume: 0.16, // notification-gentle
    clickPitch: 1250, // Hz fundamental — higher is a thinner "ting"
    clickDecay: 0.3, // seconds

    /* Mouse-wheel ratchet. Off — the ticking competed with the bell on every
       link. Set true to bring it back; scrollDetent is px between ticks, so
       raise it for fewer ("trr"), lower it for more ("trrrrr"). */
    scroll: false,
    scrollVolume: 0.42,
    scrollDetent: 26,
    scrollTone: 1100, // Hz centre of each tick — lower is softer
    scrollBody: 0.5, // low-end thump under each tick, 0 = none
  },
};

export type Theme = typeof theme;
