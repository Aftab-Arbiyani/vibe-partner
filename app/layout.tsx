import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const BASE_URL = "http://localhost:9002";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "VibePartner — Human Pair Programming When Your Vibe-Coded App Breaks",
    template: "%s | VibePartner",
  },
  description:
    "Stuck on a Cursor error? Lovable deployment failing? VibePartner connects non-technical founders with senior developers for async bug fixes and live pair programming. First session free.",
  keywords: [
    "pair programming",
    "vibe coding",
    "Cursor help",
    "Lovable help",
    "Bolt help",
    "non-technical founders",
    "fix ai generated code",
    "vibe coding support",
    "AI builder help",
  ],
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "VibePartner",
    title: "VibePartner — Human Pair Programming When Your Vibe-Coded App Breaks",
    description:
      "Stuck on a Cursor error? Lovable deployment failing? VibePartner connects non-technical founders with senior developers for async bug fixes and live pair programming.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "VibePartner — Human support for AI builders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VibePartner — Human Pair Programming When Your Vibe-Coded App Breaks",
    description:
      "Stuck on a Cursor error? Lovable deployment failing? VibePartner fixes vibe-coded apps fast — async or live screen share.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0D0D0D] text-white">{children}</body>
    </html>
  );
}
