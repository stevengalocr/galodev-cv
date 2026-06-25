import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { resolveBilingual } from "@/lib/i18n/resolve";
import { PROJECTS, getProject } from "@/content/work";
import { CaseStudy } from "@/components/sections/work/CaseStudy";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    PROJECTS.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project || !isLocale(locale)) return {};
  return {
    title: `${project.name} — ${resolveBilingual(project.kind, locale)}`,
    description: resolveBilingual(project.problem, locale).slice(0, 160),
    openGraph: {
      title: `${project.name} · Steven — GaloDev`,
      description: resolveBilingual(project.tagline, locale),
      images: [`/og/${project.slug}.png`], // ASSET: see ASSETS-TODO.md
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getProject(slug);
  if (!project) notFound();
  const dict = getDictionary(locale);

  return (
    <div style={{ ["--accent" as string]: project.accent }}>
      <CaseStudy project={project} locale={locale} dict={dict} />
    </div>
  );
}
