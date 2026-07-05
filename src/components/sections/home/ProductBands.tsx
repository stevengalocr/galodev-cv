"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/content/work";
import { resolveBilingual } from "@/lib/i18n/resolve";
import type { Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/dictionaries";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Logo-forward product showcase: each product owns a full-width band tinted with
 * its brand accent. The logo is the hero; depth lives on the case-study page.
 *
 * Logos are ASSETS (see ASSETS-TODO.md). Until they exist, the product name is
 * rendered as a wordmark placeholder. Flip LOGOS_READY to true once the files
 * are at /public/logos/<slug>.svg.
 */
const LOGOS_READY = false;

export function ProductBands({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section id="work" className="relative scroll-mt-24">
      <div className="mx-auto max-w-page px-5 pt-24 sm:px-8 sm:pt-32">
        <SectionHeading
          eyebrow={dict.home.workEyebrow}
          title={dict.home.workTitle}
          lead={dict.home.workLead}
        />
      </div>

      <div className="mt-14 border-t border-border">
        {PROJECTS.map((p, i) => {
          const right = i % 2 === 1;
          return (
            <Reveal key={p.slug}>
              <Link
                href={`/${locale}/work/${p.slug}`}
                style={{ ["--accent" as string]: p.accent }}
                className="group relative block border-b border-border"
              >
                {/* accent wash, alternating side, intensifies on hover */}
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 opacity-40 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(55% 130% at ${right ? "88%" : "12%"} 50%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)`,
                  }}
                />
                {/* bottom accent line draws in on hover */}
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-strong group-hover:scale-x-100"
                />

                <div className="mx-auto flex max-w-page flex-col gap-5 px-5 py-12 sm:flex-row sm:items-center sm:gap-10 sm:px-8 sm:py-20">
                  {/* index (with orbiting mote) + kind */}
                  <div className="flex items-center gap-4 sm:w-44 sm:shrink-0 sm:flex-col sm:items-start sm:gap-2">
                    <span className="relative inline-flex h-9 w-9 items-center justify-center font-mono text-sm text-faint">
                      0{i + 1}
                      <span
                        aria-hidden
                        className="absolute inset-0 motion-safe:[animation:orbit-spin_7s_linear_infinite]"
                        style={{ animationDelay: `${i * -1.75}s` }}
                      >
                        <span className="absolute -top-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />
                      </span>
                    </span>
                    <span className="font-mono text-[0.7rem] uppercase tracking-wider text-faint">
                      {resolveBilingual(p.kind, locale)}
                    </span>
                  </div>

                  {/* logo (hero) / wordmark placeholder + tagline */}
                  <div className="flex-1">
                    {LOGOS_READY ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`/logos/${p.slug}.svg`}
                        alt={`${p.name} logo`}
                        className="h-14 w-auto opacity-90 transition-opacity duration-300 group-hover:opacity-100 sm:h-20"
                      />
                    ) : (
                      <span className="block text-5xl font-semibold tracking-tighter text-text transition-colors duration-300 group-hover:text-accent sm:text-7xl">
                        {p.name}
                      </span>
                    )}
                    <span className="mt-4 block max-w-md text-pretty text-muted">
                      {resolveBilingual(p.tagline, locale)}
                    </span>
                  </div>

                  {/* arrow */}
                  <ArrowUpRight className="h-7 w-7 shrink-0 self-start text-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent sm:h-10 sm:w-10 sm:self-center" />
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      {!LOGOS_READY && (
        <p className="mx-auto mt-6 max-w-page px-5 font-mono text-xs text-faint sm:px-8">
          {"// ASSET: logos en /public/logos/<slug>.svg — ver ASSETS-TODO.md"}
        </p>
      )}
    </section>
  );
}
