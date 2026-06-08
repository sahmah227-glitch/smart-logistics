import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Smart Logistics Navigator | AI-Powered Route Optimization",
  description:
    "Transform millions of routing possibilities into the single most profitable dispatch decision. Enterprise-grade trucking logistics intelligence powered by AI.",
  keywords: [
    "logistics software",
    "route optimization",
    "trucking dispatch",
    "fleet management",
    "AI logistics",
    "deadhead reduction",
  ],
  authors: [{ name: "Smart Logistics Navigator" }],
  openGraph: {
    title: "Smart Logistics Navigator | AI-Powered Route Optimization",
    description:
      "Transform millions of routing possibilities into the single most profitable dispatch decision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-navy-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
