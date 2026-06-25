"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/content/work";
import { resolveBilingual } from "@/lib/i18n/resolve";
import type { Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/dictionaries";
import { EASE } from "@/lib/motion/easings";
import { usePrefersReducedMotion } from "@/lib/motion/reduced";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProductMap({ locale, dict }: { locale: Locale; dict: Dict }) {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="work" className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-page">
        <SectionHeading
          eyebrow={dict.home.workEyebrow}
          title={dict.home.workTitle}
          lead={dict.home.workLead}
        />

        <div className="relative mt-16">
          {/* the spine */}
          <div className="absolute bottom-0 left-[18px] top-0 w-px sm:left-1/2 sm:-translate-x-1/2">
            <div className="h-full w-full bg-border" />
            {!reduced && (
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-20% 0px -40% 0px" }}
                transition={{ duration: 1.6, ease: EASE.inOut }}
                style={{ originY: 0 }}
                className="absolute inset-0 w-full bg-gradient-to-b from-accent/0 via-accent/60 to-accent/0"
              />
            )}
          </div>

          <ol className="space-y-10 sm:space-y-16">
            {PROJECTS.map((p, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={p.slug}
                  className="relative pl-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:pl-0"
                  style={{ ["--accent" as string]: p.accent }}
                >
                  {/* node */}
                  <span
                    aria-hidden
                    className="absolute left-[12px] top-7 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-bg bg-accent motion-safe:[animation:node-pulse_3s_var(--ease-out)_infinite] sm:left-1/2"
                    style={{ boxShadow: `0 0 22px 2px ${p.accent}`, animationDelay: `${i * 0.6}s` }}
                  />

                  {/* spacer for alternating side on desktop */}
                  {!left && <div className="hidden sm:block" />}

                  <motion.div
                    initial={reduced ? false : { opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{ duration: 0.6, ease: EASE.out }}
                    className={left ? "sm:pr-12" : "sm:pl-12"}
                  >
                    <Link
                      href={`/${locale}/work/${p.slug}`}
                      className="group block rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 ease-out-strong hover:-translate-y-1 hover:border-accent/50 hover:glow active:scale-[0.99] sm:p-8"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-mono text-xs text-faint">
                          0{i + 1} / {resolveBilingual(p.kind, locale)}
                        </span>
                        <ArrowUpRight className="h-5 w-5 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      </div>

                      <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                        {p.name}
                      </h3>
                      <p className="mt-3 text-pretty text-muted">
                        {resolveBilingual(p.tagline, locale)}
                      </p>

                      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-faint">
                        <span className="text-accent">{resolveBilingual(p.status, locale)}</span>
                        <span className="h-3 w-px bg-border" />
                        {p.stack.slice(0, 3).map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                    </Link>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
