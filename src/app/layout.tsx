import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

/* Self-hosted at build time by next/font — no external requests at runtime,
   no layout shift, and nothing to load before first paint. */
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-body",
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

/* Applies the saved theme before first paint so the page never flashes the
   wrong palette. Runs synchronously in <head>; falls through to the OS
   preference when nothing has been saved. */
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
