import type { Metadata } from "next";
import { PT_Serif } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

/* Self-hosted at build time by next/font — no external requests at runtime,
   no layout shift, nothing to load before first paint. */
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

/* Applies the saved theme before first paint so the page never flashes the
   wrong palette. Falls through to the OS preference when nothing is saved. */
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ptSerif.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
