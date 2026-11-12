import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Steven · Full-stack engineer — GaloDev",
    template: "%s · Steven — GaloDev",
  },
  description:
    "Full-stack engineer. I design and build SaaS products end to end — architecture, frontend, backend, database and security. Six real products in production.",
  openGraph: {
    type: "website",
    title: "Steven · Full-stack engineer — GaloDev",
    description:
      "Six real products, built solo. Architecture, security and engineering depth.",
    images: ["/og/default.png"], // ASSET: see ASSETS-TODO.md
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-bg font-sans text-text antialiased">{children}</body>
    </html>
  );
}
