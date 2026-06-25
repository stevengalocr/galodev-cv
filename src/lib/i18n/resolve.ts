import type { Bilingual, Locale } from "./config";

function isBilingual<T>(value: unknown): value is Bilingual<T> {
  return (
    typeof value === "object" &&
    value !== null &&
    "es" in value &&
    "en" in value
  );
}

/** Pick the locale variant of a bilingual value; pass through plain values. */
export function resolveBilingual<T>(value: Bilingual<T> | T, locale: Locale): T {
  if (isBilingual<T>(value)) {
    return value[locale];
  }
  return value;
}
