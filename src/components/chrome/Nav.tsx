"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/dictionaries";
import { LocaleToggle } from "./LocaleToggle";
import { cn } from "@/lib/utils/cn";

export function Nav({ locale, dict }: { locale: Locale; dict: Dict }) {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: `/${locale}#work`, label: dict.nav.work },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href: string) => pathname.startsWith(href.split("#")[0]) && href.includes("/about") === pathname.includes("/about");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-page items-center justify-between px-5 sm:px-8">
        <Link href={`/${locale}`} className="group flex items-center gap-2 font-mono text-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-accent transition-transform duration-500 group-hover:scale-125" />
          <span className="font-semibold tracking-tight">galodev</span>
          <span className="text-faint">/steven</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-3">
          <ul className="hidden items-center gap-1 sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm transition-colors",
                    isActive(l.href) ? "text-text" : "text-muted hover:text-text",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <LocaleToggle locale={locale} />
        </div>
      </nav>
    </header>
  );
}
