import type { Locale, Bilingual } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/dictionaries";
import { resolveBilingual } from "@/lib/i18n/resolve";
import { Reveal } from "@/components/motion/Reveal";
import { DrawPath } from "@/components/motion/DrawSVG";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Star {
  x: number;
  y: number;
  label: string | Bilingual;
  /** label offset: below (default) or above the star */
  above?: boolean;
}

interface Constellation {
  title: Bilingual;
  stars: Star[];
  /** star-index pairs connected by drawn lines, in draw order */
  edges: [number, number][];
}

/** Real skills (same source of truth as About), laid out as constellations. */
const CONSTELLATIONS: Constellation[] = [
  {
    title: { es: "Frontend", en: "Frontend" },
    stars: [
      { x: 28, y: 96, label: "Angular" },
      { x: 58, y: 58, label: "TypeScript", above: true },
      { x: 94, y: 78, label: "React" },
      { x: 130, y: 44, label: "Next.js", above: true },
      { x: 163, y: 68, label: "Tailwind" },
      { x: 180, y: 100, label: "HTML/CSS", above: true },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ],
  },
  {
    title: { es: "Backend & Datos", en: "Backend & Data" },
    stars: [
      { x: 20, y: 52, label: "Go" },
      { x: 52, y: 32, label: "C#", above: true },
      { x: 84, y: 50, label: ".NET" },
      { x: 64, y: 88, label: "Node.js" },
      { x: 108, y: 96, label: "SQL Server", above: true },
      { x: 138, y: 68, label: "PostgreSQL" },
      { x: 168, y: 42, label: "Supabase", above: true },
      { x: 146, y: 20, label: "REST APIs", above: true },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
    ],
  },
  {
    title: { es: "DevOps & Herramientas", en: "DevOps & Tooling" },
    stars: [
      { x: 26, y: 44, label: "Azure" },
      { x: 60, y: 74, label: "Docker" },
      { x: 96, y: 42, label: "Git", above: true },
      { x: 126, y: 82, label: "Postman" },
      { x: 158, y: 48, label: "Vercel", above: true },
      { x: 182, y: 92, label: "ClickUp", above: true },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ],
  },
  {
    title: { es: "Método & Calidad", en: "Method & Quality" },
    stars: [
      { x: 32, y: 76, label: "Scrum" },
      { x: 82, y: 42, label: "Agile", above: true },
      {
        x: 128,
        y: 78,
        label: { es: "Calidad del Software", en: "Software Quality" },
      },
      {
        x: 172,
        y: 40,
        label: { es: "RLS / Seguridad", en: "RLS / Security" },
        above: true,
      },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  },
];

/**
 * Skills as star maps: each domain is a constellation whose connecting lines
 * draw themselves into view (DrawPath). Hovering a star lights it up gold.
 */
export function SkillsConstellation({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
  return (
    <section className="relative border-t border-border px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-page">
        <SectionHeading
          eyebrow={dict.home.skillsEyebrow}
          title={dict.home.skillsTitle}
          lead={dict.home.skillsLead}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {CONSTELLATIONS.map((c, ci) => (
            <Reveal key={c.title.en} delay={(ci % 2) * 0.07}>
              <div className="group/card rounded-2xl border border-border bg-surface/50 p-6 backdrop-blur-sm transition-colors duration-300 ease-out-strong hover:border-accent/40 sm:p-8">
                <p className="mono-label mb-2 flex items-center gap-2">
                  <span className="inline-block h-1 w-1 rounded-full bg-accent" />
                  {resolveBilingual(c.title, locale)}
                </p>
                <svg
                  viewBox="0 0 200 130"
                  role="img"
                  aria-label={resolveBilingual(c.title, locale)}
                  className="mt-2 w-full"
                >
                  {/* constellation lines, drawn in sequence */}
                  {c.edges.map(([a, b], ei) => (
                    <DrawPath
                      key={ei}
                      d={`M ${c.stars[a].x} ${c.stars[a].y} L ${c.stars[b].x} ${c.stars[b].y}`}
                      stroke="var(--accent)"
                      strokeWidth="0.6"
                      strokeOpacity="0.45"
                      strokeDasharray="1.5 2.5"
                      fill="none"
                      delay={0.25 + ei * 0.18}
                      duration={0.5}
                    />
                  ))}
                  {/* stars + labels */}
                  {c.stars.map((s, si) => {
                    const label = resolveBilingual(s.label, locale);
                    return (
                      <g key={si} className="group/star cursor-default">
                        {/* halo */}
                        <circle
                          cx={s.x}
                          cy={s.y}
                          r="6"
                          className="fill-accent opacity-0 blur-[2px] transition-opacity duration-300 group-hover/star:opacity-30"
                        />
                        <circle
                          cx={s.x}
                          cy={s.y}
                          r="2"
                          className="fill-text transition-[fill] duration-300 group-hover/star:fill-accent"
                        />
                        <text
                          x={s.x}
                          y={s.above ? s.y - 7 : s.y + 12}
                          textAnchor="middle"
                          className="fill-muted font-mono text-[6.5px] transition-[fill] duration-300 group-hover/star:fill-text"
                        >
                          {label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
