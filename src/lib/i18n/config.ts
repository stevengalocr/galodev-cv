export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** A value that exists in both languages. */
export type Bilingual<T = string> = { es: T; en: T };

export const otherLocale = (l: Locale): Locale => (l === "es" ? "en" : "es");
