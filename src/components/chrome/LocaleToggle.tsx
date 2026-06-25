"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, otherLocale, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils/cn";

/** Swaps the leading /es | /en segment, preserving the rest of the path. */
export function LocaleToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;

  const swap = (target: Locale) => {
    const parts = pathname.split("/");
    // parts[0] === "" (leading slash), parts[1] === current locale
    if ((locales as readonly string[]).includes(parts[1])) {
      parts[1] = target;
    } else {
      parts.splice(1, 0, target);
    }
    return parts.join("/") || `/${target}`;
  };

  const next = otherLocale(locale);

  return (
    <div className="flex items-center gap-1 font-mono text-xs">
      {locales.map((l) => (
        <Link
          key={l}
          href={swap(l)}
          aria-current={l === locale ? "true" : undefined}
          className={cn(
            "rounded px-1.5 py-0.5 uppercase transition-colors",
            l === locale ? "text-text" : "text-faint hover:text-muted",
          )}
        >
          {l}
        </Link>
      ))}
      <span className="sr-only">Switch to {next.toUpperCase()}</span>
    </div>
  );
}
