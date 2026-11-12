import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  BUILD_KIND_LABEL,
  BUILD_KIND_TONE,
  BUILD_LOG,
  buildLogByYear,
  type BuildEntry,
} from "@/content/buildlog";
import { getProject } from "@/content/work";
import { resolveBilingual } from "@/lib/i18n/resolve";
import type { Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/dictionaries";
import { SectionHeading } from "@/components/ui/SectionHeading";

const MONTHS: Record<Locale, string[]> = {
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

const STATS: { value: string; label: Record<Locale, string> }[] = [
  { value: String(BUILD_LOG.length), label: { es: "proyectos", en: "projects" } },
  {
    value: String(BUILD_LOG.filter((e) => e.product).length),
    label: { es: "productos en producción", en: "products in production" },
  },
  {
    value: BUILD_LOG[BUILD_LOG.length - 1].date.slice(0, 4),
    label: { es: "primer repositorio", en: "first repository" },
  },
];

/**
 * "Bitácora": every build since the first repository, as a commit-log style
 * timeline grouped by year. Server-rendered and static — the only motion is the
 * hover state, so it reads instantly and costs nothing.
 */
export function BuildLog({ locale, dict }: { locale: Locale; dict: Dict }) {
  const years = buildLogByYear();

  return (
    <section id="log" className="relative scroll-mt-24 px-5 pb-8 pt-24 sm:px-8 sm:pb-12 sm:pt-32">
      <div className="mx-auto max-w-page">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={dict.home.logEyebrow}
            title={dict.home.logTitle}
            lead={dict.home.logLead}
          />
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] lg:w-[26rem] lg:shrink-0">
            {STATS.map((s) => (
              <div key={s.label.en} className="flex flex-col-reverse bg-[#0b0c14] p-4 sm:p-5">
                <dt className="mt-1 text-xs leading-snug text-muted">{s.label[locale]}</dt>
                <dd className="font-mono text-2xl font-semibold text-text sm:text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-14 space-y-12 sm:mt-20">
          {years.map(({ year, entries }) => (
            <div key={year} className="grid gap-5 lg:grid-cols-[9rem_1fr] lg:gap-10">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p
                  className="font-mono text-5xl font-semibold leading-none tracking-tighter text-transparent sm:text-6xl"
                  style={{ WebkitTextStroke: "1px rgba(236,237,242,0.35)" }}
                >
                  {year}
                </p>
                <p className="mt-2 font-mono text-xs text-faint">
                  {entries.length}{" "}
                  {locale === "es"
                    ? entries.length === 1 ? "proyecto" : "proyectos"
                    : entries.length === 1 ? "project" : "projects"}
                </p>
              </div>

              <ol className="grid gap-x-8 border-l border-white/[0.08] md:grid-cols-2">
                {entries.map((e) => (
                  <LogRow key={e.date + e.name} entry={e} locale={locale} />
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LogRow({ entry: e, locale }: { entry: BuildEntry; locale: Locale }) {
  const project = e.product ? getProject(e.product) : undefined;
  const tone = project?.accent ?? BUILD_KIND_TONE[e.kind];
  const month = MONTHS[locale][Number(e.date.slice(5, 7)) - 1];

  const body = (
    <>
      {/* commit dot sitting on the year's rail */}
      <span
        aria-hidden
        className="absolute -left-[4.5px] top-[1.15rem] h-2 w-2 rounded-full bg-accent ring-4 ring-[#08090f]"
        style={project ? { boxShadow: "0 0 12px 1px var(--accent)" } : undefined}
      />
      <span className="w-9 shrink-0 pt-0.5 font-mono text-[0.7rem] uppercase text-faint">{month}</span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-medium text-text">{e.name}</span>
          <span className="rounded-full border border-accent/30 px-2 py-px font-mono text-[0.62rem] uppercase tracking-wide text-accent">
            {resolveBilingual(BUILD_KIND_LABEL[e.kind], locale)}
          </span>
          {project && (
            <ArrowUpRight className="h-3.5 w-3.5 text-faint transition-all duration-200 ease-out-strong group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          )}
        </span>
        <span className="mt-0.5 block text-pretty text-sm text-muted">
          {resolveBilingual(e.what, locale)}
        </span>
      </span>
      <span className="shrink-0 pt-0.5 font-mono text-[0.68rem] text-faint">{e.tech}</span>
    </>
  );

  const cls = "group relative flex items-start gap-3 py-3 pl-6 pr-2";

  return (
    <li style={{ ["--accent" as string]: tone }}>
      {project ? (
        <Link
          href={`/${locale}/work/${project.slug}`}
          className={`${cls} rounded-r-xl transition-colors duration-200 hover:bg-white/[0.03]`}
        >
          {body}
        </Link>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </li>
  );
}
