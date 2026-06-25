import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { locales, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { CONTACT, PERSON } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { AssetImage } from "@/components/ui/AssetImage";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = { title: "About" };

const BIO: Record<Locale, string[]> = {
  es: [
    "Soy Steven, ingeniero full-stack. Construyo productos SaaS reales de extremo a extremo: defino el producto, diseño la arquitectura, escribo el frontend y el backend, modelo la base de datos y la aseguro.",
    "Trabajo bajo la marca GaloDev. En el último año envié cuatro plataformas a producción para el mercado LATAM — cada una con su propio dominio, multi-tenencia, seguridad por RLS e integraciones reales (Wallet, pagos, tipos de cambio).",
    "Me importa el detalle invisible: la latencia, el aislamiento de datos, el easing de una animación. Y documento todo lo que construyo.",
  ],
  en: [
    "I'm Steven, a full-stack engineer. I build real SaaS products end to end: I define the product, design the architecture, write the frontend and backend, model the database and secure it.",
    "I ship under the GaloDev brand. Over the past year I took four platforms to production for the LATAM market — each with its own domain, multi-tenancy, RLS-based security and real integrations (Wallet, payments, exchange rates).",
    "I care about the invisible detail: latency, data isolation, the easing of an animation. And I document everything I build.",
  ],
};

const STACK_GROUPS: { label: Record<Locale, string>; items: string[] }[] = [
  { label: { es: "Frontend", en: "Frontend" }, items: ["Next.js", "React 19", "TypeScript", "Tailwind", "Framer Motion", "GSAP"] },
  { label: { es: "Backend & Datos", en: "Backend & Data" }, items: ["Node.js", "Supabase", "PostgreSQL", "RLS", "Edge Functions", "Zod"] },
  { label: { es: "Integraciones", en: "Integrations" }, items: ["Apple Wallet", "Google Wallet", "APNs", "Stripe", "Resend", "Currency API"] },
  { label: { es: "Infra & Tooling", en: "Infra & Tooling" }, items: ["Vercel", "Git", "Vitest", "Sharp", "ESLint"] },
];

const DOING: Record<Locale, { title: string; body: string }[]> = {
  es: [
    { title: "Producto de extremo a extremo", body: "De la idea al deploy: arquitectura, UI, API, base de datos y documentación." },
    { title: "Seguridad como base", body: "Multi-tenancy con RLS, validación server-side, auditorías con severidad P0–P3." },
    { title: "Integraciones difíciles", body: "PassKit/APNs sin librerías, Google Wallet con JWT RS256, pagos locales." },
  ],
  en: [
    { title: "End-to-end product", body: "From idea to deploy: architecture, UI, API, database and documentation." },
    { title: "Security as a baseline", body: "RLS multi-tenancy, server-side validation, P0–P3 severity audits." },
    { title: "Hard integrations", body: "PassKit/APNs with no libraries, Google Wallet via RS256 JWT, local payments." },
  ],
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="px-5 pt-28 sm:px-8 sm:pt-36">
      <div className="mx-auto max-w-page">
        {/* HERO */}
        <div className="grid items-end gap-10 sm:grid-cols-[16rem_1fr] sm:gap-14">
          <Reveal>
            <div className="w-full max-w-[16rem]">
              <AssetImage src={PERSON.portrait} alt="Steven — retrato" ratio="4 / 5" rounded="rounded-2xl" />
            </div>
          </Reveal>
          <div>
            <p className="mono-label mb-4">{dict.about.title}</p>
            <h1 className="text-5xl font-semibold tracking-tighter sm:text-7xl">Steven</h1>
            <p className="mt-3 font-mono text-sm text-accent">{dict.home.role} · GaloDev</p>
          </div>
        </div>

        {/* BIO */}
        <div className="mt-16 max-w-prose space-y-5">
          {BIO[locale].map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-pretty text-lg text-muted">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.15}>
            <div className="pt-4">
              <Button href={CONTACT.cv} external variant="ghost">
                <Download className="h-4 w-4" />
                {dict.cta.downloadCv}
              </Button>
              <span className="ml-3 font-mono text-xs text-faint">ASSET: /cv.pdf</span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* WHAT I DO */}
      <section className="mx-auto mt-28 max-w-page">
        <SectionHeading eyebrow={dict.about.experienceTitle} title={dict.about.experienceTitle} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {DOING[locale].map((d, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-surface/70 p-7">
                <h3 className="text-lg font-semibold">{d.title}</h3>
                <p className="mt-2 text-pretty text-muted">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section className="mx-auto mt-28 max-w-page pb-28">
        <SectionHeading eyebrow={dict.about.stackTitle} title={dict.about.stackTitle} />
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {STACK_GROUPS.map((g) => (
            <Reveal key={g.label.en}>
              <div>
                <p className="mono-label mb-4">{g.label[locale]}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <Chip key={it}>{it}</Chip>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
