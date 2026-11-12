"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { Locale, Bilingual } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/dictionaries";
import { resolveBilingual } from "@/lib/i18n/resolve";
import { EASE } from "@/lib/motion/easings";
import { usePrefersReducedMotion } from "@/lib/motion/reduced";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** A floating background skill word: position (%), visual weight, tint. */
interface FloatingSkill {
  label: string;
  x: number; // left %
  y: number; // top % within the milestone block
  size: "sm" | "md" | "lg";
  accent?: boolean;
}

interface Milestone {
  year: string;
  org: string;
  note: Bilingual;
  /** Hue of this stage: the path warms up from cool blue to gold as it reaches today. */
  tone: string;
  skills: FloatingSkill[];
}

/** Real trajectory (CV-aligned). Skills drift in softly as each stage scrolls by. */
const MILESTONES: Milestone[] = [
  {
    year: "—",
    org: "Crestón School",
    note: { es: "Colegio. Donde se tomó la decisión de ser ingeniero.", en: "High school. Where the decision to become an engineer was made." },
    tone: "#7c8cff",
    skills: [],
  },
  {
    year: "2020",
    org: "Universidad Fidélitas",
    note: {
      es: "Ingeniería en Sistemas de Computación (2020–2023).",
      en: "Computer Systems Engineering (2020–2023).",
    },
    tone: "#5fa8ff",
    skills: [
      { label: "HTML/CSS", x: 8, y: 18, size: "md" },
      { label: "JavaScript", x: 72, y: 10, size: "lg" },
      { label: "SQL", x: 84, y: 62, size: "sm" },
      { label: "Git", x: 16, y: 70, size: "sm", accent: true },
    ],
  },
  {
    year: "2020",
    org: "Freelance",
    note: {
      es: "Páginas web, tiendas e-commerce y documentación — los clientes llegaron por el contenido.",
      en: "Websites, e-commerce stores and documentation — clients arrived through content.",
    },
    tone: "#45c4d6",
    skills: [
      { label: "React", x: 78, y: 16, size: "lg", accent: true },
      { label: "E-commerce", x: 6, y: 26, size: "md" },
      { label: "JavaScript", x: 64, y: 68, size: "sm" },
      { label: "TikTok +36k", x: 14, y: 74, size: "md" },
    ],
  },
  {
    year: "2022",
    org: "4Geeks",
    note: {
      es: "Pasantía: app web en React y app móvil en Flutter con enlaces de pago.",
      en: "Internship: React web app and a Flutter mobile app with payment links.",
    },
    tone: "#5ed3a6",
    skills: [
      { label: "React", x: 10, y: 16, size: "md" },
      { label: "Flutter", x: 76, y: 24, size: "lg" },
      { label: "Payment links", x: 68, y: 70, size: "sm", accent: true },
    ],
  },
  {
    year: "2023",
    org: "ePRAC",
    note: {
      es: "Full-stack enterprise: del frontend al despliegue, en producción real.",
      en: "Enterprise full-stack: from frontend to deployment, in real production.",
    },
    tone: "#d6c25f",
    skills: [
      { label: "Angular", x: 6, y: 12, size: "lg" },
      { label: "Go", x: 80, y: 10, size: "lg", accent: true },
      { label: "C#", x: 88, y: 44, size: "md" },
      { label: ".NET", x: 12, y: 52, size: "md" },
      { label: "SQL Server", x: 70, y: 74, size: "sm" },
      { label: "Azure", x: 26, y: 80, size: "md" },
      { label: "Docker", x: 52, y: 88, size: "sm" },
      { label: "Scrum", x: 90, y: 82, size: "sm" },
    ],
  },
  {
    year: "Hoy",
    org: "GaloDev",
    note: {
      es: "Seis productos propios en producción.",
      en: "Six products of my own, in production.",
    },
    tone: "#f0b45a",
    skills: [
      { label: "Next.js", x: 74, y: 12, size: "lg", accent: true },
      { label: "TypeScript", x: 6, y: 20, size: "lg" },
      { label: "Supabase", x: 82, y: 52, size: "md" },
      { label: "PostgreSQL", x: 10, y: 62, size: "md" },
      { label: "RLS", x: 64, y: 80, size: "sm", accent: true },
      { label: "Vercel", x: 24, y: 86, size: "sm" },
    ],
  },
];

const SIZE_CLASS: Record<FloatingSkill["size"], string> = {
  sm: "text-xs",
  md: "text-base sm:text-lg",
  lg: "text-xl sm:text-3xl",
};

/**
 * "El camino": the experience timeline walks down the page while the skills
 * acquired at each stage drift softly in the background — the feeling that the
 * knowledge accumulated along the way. A golden path line draws itself with
 * scroll progress.
 */
export function SkillsJourney({ locale, dict }: { locale: Locale; dict: Dict }) {
  const reduced = usePrefersReducedMotion();
  const pathRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pathRef,
    offset: ["start 0.85", "end 0.7"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <section className="relative border-t border-border px-5 py-16 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-page">
        <SectionHeading
          eyebrow={dict.home.skillsEyebrow}
          title={dict.home.skillsTitle}
          lead={dict.home.skillsLead}
        />

        <div ref={pathRef} className="relative mt-10 sm:mt-20">
          {/* the path: faint rail + golden progress that draws with scroll */}
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-border sm:left-1/2 sm:-translate-x-1/2">
            {!reduced && (
              <motion.div
                style={{ scaleY: lineScale, originY: 0 }}
                className="absolute inset-0 w-full bg-gradient-to-b from-[#7c8cff] via-[#45c4d6] to-[#f0b45a]"
              />
            )}
          </div>

          <ol>
            {MILESTONES.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={m.org}
                  className="relative py-8 sm:py-20"
                  style={{ ["--accent" as string]: m.tone }}
                >
                  {/* floating skills — the knowledge gathered on the way */}
                  <div aria-hidden className="pointer-events-none absolute inset-0">
                    {m.skills.map((s, si) => (
                      <motion.span
                        key={s.label + si}
                        initial={reduced ? false : { opacity: 0, y: 26 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-18% 0px -18% 0px" }}
                        transition={{ duration: 1, ease: EASE.out, delay: 0.15 + si * 0.12 }}
                        style={{
                          left: `${s.x}%`,
                          top: `${s.y}%`,
                          ...(s.accent
                            ? { color: "color-mix(in srgb, var(--accent) 60%, transparent)" }
                            : null),
                        }}
                        className={`absolute font-mono ${SIZE_CLASS[s.size]} ${
                          s.accent ? "" : "text-[#8a93b8]/35"
                        } ${si % 2 === 1 ? "hidden sm:block" : ""} select-none whitespace-nowrap motion-safe:[animation:skill-drift_9s_ease-in-out_infinite]`}
                      >
                        <span style={{ animationDelay: `${si * -1.7}s` }} className="inline-block">
                          {s.label}
                        </span>
                      </motion.span>
                    ))}
                  </div>

                  {/* node on the path */}
                  <span
                    aria-hidden
                    className="absolute left-[7px] top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-bg bg-accent sm:left-1/2"
                    style={{ boxShadow: "0 0 16px 1px var(--accent)" }}
                  />

                  {/* milestone (foreground, airy — no card) */}
                  <div className="relative grid sm:grid-cols-2 sm:gap-16">
                    {!left && <div className="hidden sm:block" />}
                    <Reveal
                      className={`pl-10 sm:pl-0 ${left ? "sm:pr-16 sm:text-right" : "sm:pl-16"}`}
                    >
                      <p className="font-mono text-xs tracking-[0.25em] text-accent">{m.year}</p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                        {m.org}
                      </h3>
                      <p className={`mt-2 max-w-sm text-pretty text-muted ${left ? "sm:ml-auto" : ""}`}>
                        {resolveBilingual(m.note, locale)}
                      </p>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
