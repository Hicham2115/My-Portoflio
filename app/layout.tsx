import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hicham Kamani",
    template: "%s | Hicham Kamani",
  },
  description: "Full-stack developer building fast, SEO-ready web products with React, Next.js, TypeScript and Laravel.",
  keywords: ["full-stack developer", "React", "Next.js", "TypeScript", "Laravel", "web development", "SEO"],
  authors: [{ name: "Hicham Kamani" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Hicham Kamani",
    title: "Hicham Kamani — code that refuses to slow down.",
    description: "Full-stack developer building fast, SEO-ready web products with React, Next.js, TypeScript and Laravel.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hicham Kamani",
    description: "Full-stack developer building fast, SEO-ready web products with React, Next.js, TypeScript and Laravel.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
