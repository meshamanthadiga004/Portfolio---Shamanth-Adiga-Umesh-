import type { Metadata } from "next";
import { PT_Serif } from "next/font/google";
import { profile } from "@/content/profile";
import { theme } from "@/content/theme";
import "./globals.css";

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-pt",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: profile.seoTitle,
  description: profile.seoDescription,
  openGraph: {
    title: profile.seoTitle,
    description: profile.seoDescription,
    url: profile.siteUrl,
    siteName: profile.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: profile.seoTitle,
    description: profile.seoDescription,
  },
};

/* Everything in theme.ts becomes a CSS custom property here, so editing that
   file is enough to restyle the site. */
const { type: t, layout: l } = theme;

type Palette = (typeof theme.color)["light"];
const palette = (c: Palette, scheme: "light" | "dark") => `
color-scheme:${scheme};
--paper:${c.paper};
--surface:${c.surface};
--surface-alpha:${c.surfaceAlpha};
--ink:${c.ink};
--muted:${c.muted};
--accent:${c.gold};
--accent-soft:${c.goldSoft};
--grad-from:${c.gradFrom};
--grad-to:${c.gradTo};
--grad:linear-gradient(115deg,${c.gradFrom} 0%,${c.gradTo} 100%);
--hair:${c.hair};
--hair-soft:${c.hairSoft};
--glyph:${c.glyph};
--glyph-opacity:${c.glyphOpacity};`;

const tokens = `:root{${palette(theme.color.light, "light")}
--wash:${theme.backdrop.washOpacity};
--body-size:${t.bodySize};
--body-leading:${t.bodyLeading};
--body-tracking:${t.bodyTracking};
--lead-size:${t.leadSize};
--lead-leading:${t.leadLeading};
--meta-size:${t.metaSize};
--hero-name:${t.heroName};
--hero-headline:${t.heroHeadline};
--section-label:${t.sectionLabel};
--section-label-tracking:${t.sectionLabelTracking};
--section-title:${t.sectionTitle};
--section-title-leading:${t.sectionTitleLeading};
--card-title:${t.cardTitle};
--sub-title:${t.subTitle};
--metric-value:${t.metricValue};
--stat-value:${t.statValue};
--chip-size:${t.chipSize};
--content-width:${l.contentWidth};
--header-width:${l.headerWidth};
--section-pad-y:${l.sectionPaddingY};
--section-gap:${l.sectionGap};
--card-radius:${l.cardRadius};
--card-padding:${l.cardPadding};
--card-gap:${l.cardGap};
}
:root[data-theme="dark"]{${palette(theme.color.dark, "dark")}}`;

/* Applies the saved choice before first paint, so there is no flash of the
   wrong palette. No prefers-color-scheme fallback — the default is fixed by
   theme.defaultTheme, and only an explicit toggle overrides it. */
const themeScript = `try{var t=localStorage.getItem('theme')||'${theme.defaultTheme}';if(t==='dark'){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ptSerif.variable} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: tokens }} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
