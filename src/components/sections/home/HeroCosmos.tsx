"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/dictionaries";
import { EASE } from "@/lib/motion/easings";
import { usePrefersReducedMotion } from "@/lib/motion/reduced";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { Globe } from "@/components/motion/Globe";

const FIRST = "STEVEN";
const LAST = "GALO";

/** Languages/stack orbiting the Earth as satellites. belt 0 = outer, 1 = inner. */
const SATELLITES: { label: string; belt: 0 | 1 }[] = [
  { label: "TypeScript", belt: 0 },
  { label: "Next.js", belt: 0 },
  { label: "Angular", belt: 0 },
  { label: "Go", belt: 0 },
  { label: "C#", belt: 0 },
  { label: ".NET", belt: 0 },
  { label: "React", belt: 0 },
  { label: "Supabase", belt: 1 },
  { label: "PostgreSQL", belt: 1 },
  { label: "Azure", belt: 1 },
  { label: "Docker", belt: 1 },
  { label: "Node.js", belt: 1 },
];

const BELT = {
  0: { rx: 0.62, ry: 0.2, speed: 0.00016, tilt: -0.16 }, // outer, slow
  1: { rx: 0.5, ry: 0.3, speed: -0.00023, tilt: 0.35 }, // inner, counter-spin
} as const;

/**
 * "Cosmos" hero: interactive 3D Earth (marker on Costa Rica) with the stack
 * orbiting it as satellites on two fake-3D elliptical belts — chips scale,
 * dim and slip *behind* the globe on the far side of the orbit. One rAF loop
 * drives all transforms (GPU-only). Mobile shows fewer satellites; under
 * reduced-motion the belts are static.
 */
export function HeroCosmos({ locale, dict }: { locale: Locale; dict: Dict }) {
  const reduced = usePrefersReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const isMobile = window.innerWidth < 768;
    const visible = isMobile ? SATELLITES.slice(0, 6) : SATELLITES;

    const place = (t: number) => {
      const w = stage.offsetWidth;
      const cx = w / 2;
      const cy = w / 2;
      visible.forEach((sat, i) => {
        const el = chipRefs.current[i];
        if (!el) return;
        const cfg = BELT[sat.belt];
        const beltMates = visible.filter((s) => s.belt === sat.belt);
        const idxInBelt = beltMates.indexOf(sat);
        const base = (idxInBelt / beltMates.length) * Math.PI * 2;
        const angle = base + t * cfg.speed;
        // ellipse point, then tilt the ellipse axes
        const ex = Math.cos(angle) * cfg.rx * w;
        const ey = Math.sin(angle) * cfg.ry * w;
        const x = ex * Math.cos(cfg.tilt) - ey * Math.sin(cfg.tilt);
        const y = ex * Math.sin(cfg.tilt) + ey * Math.cos(cfg.tilt);
        const depth = Math.sin(angle); // >0 front, <0 behind the globe
        const scale = 0.82 + 0.18 * depth;
        el.style.transform = `translate(-50%,-50%) translate(${cx + x}px, ${cy + y}px) scale(${scale})`;
        el.style.zIndex = depth > 0 ? "3" : "1";
        el.style.opacity = String(0.35 + 0.65 * ((depth + 1) / 2));
      });
    };

    if (reduced) {
      place(0); // static belts
      const onResize = () => place(0);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    let raf = 0;
    const loop = (t: number) => {
      if (!document.hidden) place(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pt-16 sm:px-8">
      <div className="mx-auto grid w-full max-w-page items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* ── copy ─────────────────────────────────────────────── */}
        <div className="relative z-10 order-2 lg:order-1">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE.out }}
            className="mono-label mb-6 flex items-center gap-2"
          >
            <span className="inline-block h-px w-8 bg-accent" />
            {dict.home.role} · Costa Rica
          </motion.p>

          <h1 className="select-none font-semibold leading-none">
            <span className="sr-only">Steven Galo</span>
            {/* STEVEN — discreto, arriba */}
            <span
              aria-hidden
              className="flex flex-wrap font-mono text-[clamp(1rem,2.8vw,1.7rem)] font-medium uppercase tracking-[0.42em] text-muted"
            >
              {FIRST.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={reduced ? false : { opacity: 0, y: "0.4em", filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.55, ease: EASE.out, delay: 0.08 + i * 0.04 }}
                  className="inline-block"
                >
                  {ch}
                </motion.span>
              ))}
            </span>
            {/* GALO — el que sobresale */}
            <span
              aria-hidden
              className="mt-1 flex flex-wrap text-[clamp(4rem,14vw,11rem)] tracking-tighter"
            >
              {LAST.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={reduced ? false : { opacity: 0, y: "0.4em", filter: "blur(14px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: EASE.out, delay: 0.38 + i * 0.09 }}
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
            className="mt-7 flex max-w-xl flex-col gap-8"
          >
            <p className="text-balance text-2xl font-medium text-text sm:text-3xl">
              {dict.home.heroOrigin}
            </p>
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

        {/* ── the Earth + orbiting stack ───────────────────────── */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE.out, delay: 0.25 }}
          className="order-1 lg:order-2"
        >
          <div
            ref={stageRef}
            className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[520px]"
          >
            {/* decorative orbit lines */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[46%] w-[124%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-border/70"
              style={{ transform: "translate(-50%,-50%) rotate(-9deg)" }}
            />
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[62%] w-[102%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-border/50"
              style={{ transform: "translate(-50%,-50%) rotate(20deg)" }}
            />

            {/* globe (z-2), satellites swap z 1↔3 around it */}
            <div className="absolute inset-[7%] z-[2]">
              <Globe />
            </div>

            {SATELLITES.map((sat, i) => (
              <span
                key={sat.label}
                ref={(el) => {
                  chipRefs.current[i] = el;
                }}
                className={`absolute left-0 top-0 whitespace-nowrap rounded-full border border-border bg-surface/85 px-3 py-1 font-mono text-[0.65rem] text-muted backdrop-blur-sm will-change-transform sm:text-xs ${i >= 6 ? "hidden md:inline-flex" : "inline-flex"}`}
              >
                <span className="mr-1.5 inline-block h-1 w-1 self-center rounded-full bg-accent" />
                {sat.label}
              </span>
            ))}

          </div>
        </motion.div>
      </div>

      {/* scroll hint */}
      {!reduced && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
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
