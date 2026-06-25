"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/dictionaries";
import { EASE } from "@/lib/motion/easings";
import { usePrefersReducedMotion } from "@/lib/motion/reduced";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";

const WORD = "STEVEN";

export function Hero({ locale, dict }: { locale: Locale; dict: Dict }) {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pt-16 sm:px-8">
      {/* cursor-reactive glow lives in the aurora layer; here we add a local sheen */}
      <div className="mx-auto w-full max-w-page">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE.out }}
          className="mono-label mb-6 flex items-center gap-2"
        >
          <span className="inline-block h-px w-8 bg-accent" />
          {dict.home.role} · {locale === "es" ? "LATAM · remoto" : "LATAM · remote"}
        </motion.p>

        {/* Assembling name */}
        <h1 className="select-none text-[clamp(3.2rem,16vw,12rem)] font-semibold leading-[0.86] tracking-tighter">
          <span className="sr-only">Steven</span>
          <span aria-hidden className="flex flex-wrap">
            {WORD.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={reduced ? false : { opacity: 0, y: "0.4em", filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: EASE.out, delay: 0.1 + i * 0.06 }}
                className="inline-block"
              >
                {ch}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE.out, delay: 0.55 }}
          className="mt-8 flex max-w-2xl flex-col gap-8"
        >
          <p className="text-pretty text-lg text-muted sm:text-xl">{dict.home.heroLead}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button href={`/${locale}#work`} variant="solid">
                {dict.cta.viewWork}
                <ArrowDown className="h-4 w-4" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href={`/${locale}/contact`} variant="ghost">
                {dict.cta.getInTouch}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* scroll hint */}
      {!reduced && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-faint"
          >
            scroll
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
