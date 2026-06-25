import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, ShieldCheck } from "lucide-react";
import type { Project } from "@/content/work/types";
import { getNextProject } from "@/content/work";
import { resolveBilingual } from "@/lib/i18n/resolve";
import type { Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/dictionaries";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AssetImage } from "@/components/ui/AssetImage";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

/** Splits a metric value into a leading number (for CountUp) and the rest. */
function splitMetric(value: string): { num: number | null; suffix: string } {
  const m = value.match(/^(\d+)(.*)$/);
  if (!m) return { num: null, suffix: value };
  return { num: Number(m[1]), suffix: m[2] };
}

export function CaseStudy({
  project,
  locale,
  dict,
}: {
  project: Project;
  locale: Locale;
  dict: Dict;
}) {
  const next = getNextProject(project.slug);

  return (
    <article className="relative">
      {/* HERO */}
      <header className="relative px-5 pt-28 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-page">
          <Reveal>
            <Link
              href={`/${locale}#work`}
              className="mono-label inline-flex items-center gap-2 hover:text-muted"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {dict.cta.backHome}
            </Link>
          </Reveal>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span
              className="h-2.5 w-2.5 rounded-full bg-accent"
              style={{ boxShadow: `0 0 18px 2px ${project.accent}` }}
            />
            <span className="font-mono text-xs text-accent">{resolveBilingual(project.status, locale)}</span>
            <span className="font-mono text-xs text-faint">· {resolveBilingual(project.kind, locale)} · {project.year}</span>
          </div>

          <Reveal delay={0.05}>
            <h1 className="mt-4 text-6xl font-semibold tracking-tighter sm:text-8xl">{project.name}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-pretty text-xl text-muted sm:text-2xl">
              {resolveBilingual(project.tagline, locale)}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={project.liveUrl} external variant="solid">
                {dict.cta.viewLiveDemo}
                <ExternalLink className="h-4 w-4" />
              </Button>
              <div className="flex flex-wrap gap-2">
                {project.stack.slice(0, 4).map((s) => (
                  <Chip key={s} accent>
                    {s}
                  </Chip>
                ))}
              </div>
            </div>
          </Reveal>

          {/* metrics */}
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {project.metrics.map((m) => {
              const { num, suffix } = splitMetric(m.value);
              return (
                <div key={resolveBilingual(m.label, locale)} className="bg-surface/80 p-6">
                  <p className="font-mono text-3xl font-semibold text-accent sm:text-4xl">
                    {num !== null ? <CountUp to={num} suffix={suffix} /> : m.value}
                  </p>
                  <p className="mt-1 text-sm text-muted">{resolveBilingual(m.label, locale)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* PROBLEM */}
      <section className="px-5 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-page">
          <SectionHeading eyebrow={dict.work.problem} title={resolveBilingual(project.tagline, locale)} />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-prose text-pretty text-lg text-muted">
              {resolveBilingual(project.problem, locale)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* SOLUTION + screenshots */}
      <section className="border-t border-border px-5 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-page">
          <SectionHeading eyebrow={dict.work.solution} title={dict.work.solution} />
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <ul className="space-y-5">
              {project.solution.map((s, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <li className="flex gap-4">
                    <span className="mt-1 font-mono text-xs text-accent">0{i + 1}</span>
                    <p className="text-pretty text-muted">{resolveBilingual(s, locale)}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
            <div className="space-y-4">
              {project.screenshots.slice(0, 2).map((shot, i) => (
                <Reveal key={shot.src} delay={i * 0.08}>
                  <AssetImage src={shot.src} alt={resolveBilingual(shot.alt, locale)} />
                </Reveal>
              ))}
            </div>
          </div>
          {project.screenshots[2] && (
            <Reveal>
              <div className="mt-4">
                <AssetImage
                  src={project.screenshots[2].src}
                  alt={resolveBilingual(project.screenshots[2].alt, locale)}
                  ratio="21 / 9"
                />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="border-t border-border px-5 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-page">
          <SectionHeading eyebrow={dict.work.architecture} title={dict.work.architecture} />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-prose text-pretty text-lg text-muted">
              {resolveBilingual(project.architecture.summary, locale)}
            </p>
          </Reveal>
          <div className="mt-12">
            <ArchitectureDiagram project={project} locale={locale} />
          </div>
        </div>
      </section>

      {/* ENGINEERING CHALLENGES — the star section */}
      <section className="border-t border-border px-5 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-page">
          <SectionHeading
            eyebrow={dict.work.challenges}
            title={dict.work.challenges}
            lead={dict.work.challengesLead}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {project.challenges.map((c, i) => (
              <Reveal key={i} delay={(i % 2) * 0.06}>
                <div className="group h-full rounded-2xl border border-border bg-surface/70 p-7 backdrop-blur-sm transition-colors duration-300 ease-out-strong hover:border-accent/50">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-px flex-1 bg-border transition-colors group-hover:bg-accent/40" />
                  </div>
                  <h3 className="text-pretty text-xl font-semibold text-accent">
                    {resolveBilingual(c.title, locale)}
                  </h3>
                  <p className="mt-3 text-pretty text-muted">{resolveBilingual(c.body, locale)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY (optional) */}
      {project.security && project.security.length > 0 && (
        <section className="border-t border-border px-5 py-24 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-page">
            <SectionHeading eyebrow={dict.work.security} title={dict.work.security} />
            <div className="mt-10 space-y-4">
              {project.security.map((s, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="flex gap-4 rounded-xl border border-border bg-surface/60 p-5">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <p className="text-pretty text-muted">{resolveBilingual(s, locale)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STACK + RESULT */}
      <section className="border-t border-border px-5 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-page">
          <p className="mono-label mb-5">{dict.work.stack}</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
          <div className="mt-10">
            <Button href={project.liveUrl} external variant="ghost">
              {dict.cta.viewLiveDemo}
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* NEXT PROJECT */}
      <section className="border-t border-border px-5 py-16 sm:px-8" style={{ ["--accent" as string]: next.accent }}>
        <Link
          href={`/${locale}/work/${next.slug}`}
          className="press group mx-auto flex max-w-page items-center justify-between gap-6"
        >
          <div>
            <p className="mono-label mb-2">{dict.cta.nextProject}</p>
            <p className="text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-5xl">
              {next.name}
            </p>
          </div>
          <ArrowUpRight className="h-8 w-8 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent sm:h-12 sm:w-12" />
        </Link>
      </section>
    </article>
  );
}
