import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { PROJECT_SLUGS } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const paths = ["", "/about", "/contact", ...PROJECT_SLUGS.map((s) => `/work/${s}`)];

  return locales.flatMap((locale) =>
    paths.map((p) => ({
      url: `${base}/${locale}${p}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
  );
}
