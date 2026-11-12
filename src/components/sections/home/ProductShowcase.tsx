"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PROJECTS, getIcon, getShot } from "@/content/work";
import type { Project } from "@/content/work/types";
import { resolveBilingual } from "@/lib/i18n/resolve";
import type { Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/dictionaries";
import { usePrefersReducedMotion } from "@/lib/motion/reduced";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrowserFrame, PhoneFrame, hostOf } from "@/components/ui/DeviceFrame";

/**
 * The six products as a deck, on every device: each card pins under the nav and
 * the next one slides over it, while the ones underneath settle back. The card
 * is laid out to fit one screen at each size (compact on phones); `.stack-card`
 * in globals.css only pins where that is true, so on very short viewports it
 * falls back to a plain list and nothing is clipped.
 */
export function ProductShowcase({ locale, dict }: { locale: Locale; dict: Dict }) {
  const reduced = usePrefersReducedMotion();
  const deckRef = useRef<HTMLOListElement>(null);
  const [stacked, setStacked] = useState(false);
  const { scrollYProgress } = useScroll({ target: deckRef, offset: ["start start", "end end"] });

  // Follow the CSS: the deck is "stacked" exactly when the cards are sticky.
  useEffect(() => {
    const sync = () => {
      const card = deckRef.current?.querySelector(".stack-card");
      setStacked(!!card && getComputedStyle(card).position === "sticky");
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <section id="work" className="relative scroll-mt-24 px-4 pt-16 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-page">
        <SectionHeading
          eyebrow={dict.home.workEyebrow}
          title={dict.home.workTitle}
          lead={dict.home.workLead}
        />

        {/* quick index: jump to any product */}
        <nav aria-label={dict.home.workEyebrow} className="-mx-4 mt-7 overflow-x-auto px-4 sm:mx-0 sm:mt-10 sm:px-0">
          <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            {PROJECTS.map((p) => (
              <li key={p.slug}>
                <a
                  href={`#${p.slug}`}
                  style={{ ["--accent" as string]: p.accent }}
                  className="press flex items-center gap-2 rounded-full border border-border bg-surface/60 py-1.5 pl-1.5 pr-4 text-sm text-muted transition-colors duration-200 hover:border-accent/60 hover:text-text"
                >
                  <Image src={getIcon(p)} alt="" width={24} height={24} className="h-6 w-6 rounded-full" />
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ol ref={deckRef} className="mt-7 space-y-5 sm:mt-14 sm:space-y-8 lg:space-y-10">
          {PROJECTS.map((p, i) => (
            <ProductCard
              key={p.slug}
              project={p}
              index={i}
              total={PROJECTS.length}
              locale={locale}
              dict={dict}
              progress={scrollYProgress}
              animate={stacked && !reduced}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProductCard({
  project: p,
  index,
  total,
  locale,
  dict,
  progress,
  animate,
}: {
  project: Project;
  index: number;
  total: number;
  locale: Locale;
  dict: Dict;
  progress: MotionValue<number>;
  animate: boolean;
}) {
  // While later cards slide over this one, it settles back a little.
  const behind = total - 1 - index;
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - behind * 0.022]);
  const shade = useTransform(progress, [start, 1], [0, Math.min(0.5, behind * 0.11)]);

  const desktop = getShot(p, "desktop");
  const mobile = getShot(p, "mobile");
  const flip = index % 2 === 1;

  const count = (
    <span className="font-mono text-xs text-faint">
      <span className="text-accent">{String(index + 1).padStart(2, "0")}</span> /{" "}
      {String(total).padStart(2, "0")}
    </span>
  );

  return (
    <li
      id={p.slug}
      className="stack-card scroll-mt-24"
      style={{ ["--accent" as string]: p.accent, ["--i" as string]: index }}
    >
      <motion.article
        style={animate ? { scale } : undefined}
        className="relative origin-top overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b0c14] sm:rounded-[2rem]"
      >
        {/* brand light: a wash from the visual's corner + a hairline on top */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(70% 90% at ${flip ? "0%" : "100%"} 0%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 62%), radial-gradient(50% 60% at ${flip ? "100%" : "0%"} 100%, color-mix(in srgb, var(--accent) 7%, transparent), transparent 70%)`,
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 70%, transparent), transparent)",
          }}
        />

        <div className="relative grid md:grid-cols-2 md:items-center">
          {/* copy */}
          <div className={`p-5 pb-0 sm:p-10 sm:pb-0 md:p-8 lg:p-12 ${flip ? "md:order-2" : ""}`}>
            {/* index + status: its own row from tablet up; on phones the index sits by the name */}
            <div className="hidden items-center justify-between gap-4 sm:flex">
              {count}
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[0.68rem] text-muted">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  style={{ boxShadow: "0 0 10px 1px var(--accent)" }}
                />
                {resolveBilingual(p.status, locale)}
              </span>
            </div>

            <div className="flex items-center gap-3 sm:mt-7 sm:gap-4">
              <Image
                src={getIcon(p)}
                alt=""
                width={56}
                height={56}
                className="h-11 w-11 rounded-xl ring-1 ring-white/10 sm:h-14 sm:w-14 sm:rounded-2xl"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-[1.7rem] font-semibold leading-none tracking-tighter sm:text-5xl md:text-4xl lg:text-5xl">
                  {p.name}
                </h3>
                <p className="mt-1.5 truncate font-mono text-[0.62rem] uppercase tracking-wider text-accent sm:mt-1 sm:text-[0.7rem]">
                  {resolveBilingual(p.kind, locale)}
                </p>
              </div>
              <span className="self-start sm:hidden">{count}</span>
            </div>

            <p className="mt-4 max-w-xl text-pretty text-[0.95rem] leading-snug text-muted sm:mt-6 sm:text-lg sm:leading-normal md:text-base lg:text-lg">
              {resolveBilingual(p.summary, locale)}
            </p>

            {/* detail that needs room: tablet and up */}
            <ul className="mt-6 hidden space-y-2.5 sm:block">
              {p.highlights.map((h) => (
                <li key={h.es} className="flex items-start gap-3 text-sm text-text/90">
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--accent)_18%,transparent)]">
                    <Check className="h-2.5 w-2.5 text-accent" strokeWidth={3} />
                  </span>
                  {resolveBilingual(h, locale)}
                </li>
              ))}
            </ul>

            <p className="mt-6 hidden font-mono text-[0.7rem] leading-relaxed text-faint sm:block">
              {p.stack.slice(0, 5).join("  ·  ")}
            </p>

            <div className="mt-4 flex items-center gap-2 sm:mt-8 sm:flex-wrap sm:gap-3">
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-3 py-2.5 text-[0.85rem] sm:gap-2 sm:text-sm font-semibold text-[#07070b] transition-[filter] duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:flex-none sm:px-5"
              >
                {dict.cta.visitSite}
                <span className="sr-only"> {p.name}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                href={`/${locale}/work/${p.slug}`}
                className="press group/cs inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 px-3 py-2.5 text-[0.85rem] sm:gap-2 sm:text-sm font-medium text-text transition-colors duration-200 hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:flex-none sm:px-5"
              >
                {dict.cta.caseStudy}
                <span className="sr-only"> {p.name}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out-strong group-hover/cs:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* real captures of the live product */}
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${dict.cta.visitSite}: ${hostOf(p.liveUrl)}`}
            className={`group/shot relative block p-5 sm:p-10 md:py-8 lg:py-12 ${
              flip ? "md:order-1 md:pl-8 md:pr-2 lg:pl-12 lg:pr-4" : "md:pl-2 md:pr-8 lg:pl-4 lg:pr-12"
            }`}
          >
            {desktop && (
              <BrowserFrame
                src={desktop.src}
                alt={resolveBilingual(desktop.alt, locale)}
                url={p.liveUrl}
                priority={index === 0}
                className="transition-transform duration-500 ease-out-strong group-hover/shot:-translate-y-1.5"
              />
            )}
            {mobile && (
              <div
                className={`absolute bottom-2 w-[22%] min-w-[70px] max-w-[150px] transition-transform duration-500 ease-out-strong group-hover/shot:-translate-y-3 sm:bottom-5 lg:bottom-6 ${
                  flip ? "right-2 sm:right-6 md:right-0" : "right-2 sm:right-6 md:right-4 lg:right-8"
                }`}
              >
                <PhoneFrame src={mobile.src} alt={resolveBilingual(mobile.alt, locale)} />
              </div>
            )}
          </a>
        </div>

        {/* dims as the next cards cover it */}
        {animate && (
          <motion.span
            aria-hidden
            style={{ opacity: shade }}
            className="pointer-events-none absolute inset-0 bg-[#05060a]"
          />
        )}
      </motion.article>
    </li>
  );
}
