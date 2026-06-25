import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download, Instagram } from "lucide-react";
import { locales, isLocale, type Locale, type Bilingual } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { resolveBilingual } from "@/lib/i18n/resolve";
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
    "Soy Steven, ingeniero en sistemas con más de 3 años construyendo software web que llega a producción. Trabajo full-stack de punta a punta: levanto requerimientos con el cliente, diseño la arquitectura, escribo el frontend y el backend, y coordino el despliegue.",
    "En el día a día me muevo en stack enterprise — Angular, Go, C# y .NET sobre SQL Server, con Azure, Docker y Scrum — creando e integrando APIs REST y sistemas que operan en ambientes reales. En paralelo, bajo mi marca GaloDev, diseño y envío SaaS completos con Next.js y Supabase: cuatro productos en producción para el mercado LATAM.",
    "Me muevo cómodo entre el negocio y el código: valido requerimientos, gestiono riesgos y me aseguro de que lo que se entrega funcione. Actualmente curso la Licenciatura en Ingeniería en Sistemas con énfasis en Calidad del Software.",
    "También comparto lo que aprendo: bajo GaloDev he construido una comunidad técnica de más de 6 mil personas (@galodevcr), donde divulgo desarrollo y herramientas.",
  ],
  en: [
    "I'm Steven, a systems engineer with 3+ years building web software that ships to production. I work full-stack end to end: I gather requirements with the client, design the architecture, write the frontend and backend, and coordinate the deployment.",
    "Day to day I work in an enterprise stack — Angular, Go, C# and .NET over SQL Server, with Azure, Docker and Scrum — building and integrating REST APIs and systems that run in real production environments. In parallel, under my GaloDev brand, I design and ship complete SaaS products with Next.js and Supabase: four products in production for the LATAM market.",
    "I'm comfortable between the business and the code: I validate requirements, manage risk and make sure what ships actually works. I'm currently pursuing a Licentiate in Computer Systems Engineering with a focus on Software Quality.",
    "I also share what I learn: under GaloDev I've built a technical community of 6,000+ people (@galodevcr) where I post about development and tools.",
  ],
};

const DOING: Record<Locale, { title: string; body: string }[]> = {
  es: [
    { title: "Producto de extremo a extremo", body: "De la idea al deploy: arquitectura, UI, API, base de datos y documentación." },
    { title: "Del requerimiento a producción", body: "Valido requerimientos con el cliente, gestiono riesgos y coordino despliegues que operan en ambientes reales." },
    { title: "Seguridad e integraciones difíciles", body: "Multi-tenancy con RLS, validación server-side, e integraciones como Wallet, pagos y APIs externas." },
  ],
  en: [
    { title: "End-to-end product", body: "From idea to deploy: architecture, UI, API, database and documentation." },
    { title: "From requirement to production", body: "I validate requirements with the client, manage risk and coordinate deployments that run in real environments." },
    { title: "Security & hard integrations", body: "RLS multi-tenancy, server-side validation, and integrations like Wallet, payments and external APIs." },
  ],
};

interface Job {
  org: string;
  role: Bilingual;
  period: Bilingual;
  points: Bilingual[];
}

const EXPERIENCE: Job[] = [
  {
    org: "GaloDev",
    role: { es: "Fundador · Ingeniero full-stack", en: "Founder · Full-stack engineer" },
    period: { es: "Presente", en: "Present" },
    points: [
      {
        es: "Diseño y envío de SaaS completos de punta a punta: producto, arquitectura, frontend, backend, base de datos y seguridad.",
        en: "I design and ship complete SaaS products end to end: product, architecture, frontend, backend, database and security.",
      },
      {
        es: "Cuatro productos en producción para LATAM (Seltter, DataFud, BilBildin, CoinDev) con Next.js y Supabase (RLS).",
        en: "Four products in production for LATAM (Seltter, DataFud, BilBildin, CoinDev) with Next.js and Supabase (RLS).",
      },
    ],
  },
  {
    org: "ePRAC",
    role: { es: "Desarrollador Full Stack", en: "Full-stack Developer" },
    period: { es: "Jun 2023 – Actualidad", en: "Jun 2023 – Present" },
    points: [
      {
        es: "Desarrollo full stack en todo el ciclo: frontend, backend, APIs y despliegue, con los distintos lenguajes y herramientas del stack.",
        en: "Full-stack development across the whole cycle: frontend, backend, APIs and deployment, with the stack's different languages and tools.",
      },
      { es: "Desarrollo de aplicaciones con Angular, Go y C#.", en: "Application development with Angular, Go and C#." },
      { es: "Creación e integración de APIs RESTful.", en: "Building and integrating RESTful APIs." },
      { es: "Despliegue y operación con Azure, Docker y Postman.", en: "Deployment and operations with Azure, Docker and Postman." },
      { es: "Ceremonias ágiles (Scrum) y procesos de mejora continua.", en: "Agile (Scrum) ceremonies and continuous-improvement processes." },
    ],
  },
  {
    org: "4Geeks",
    role: { es: "Programador (Pasantía)", en: "Developer (Internship)" },
    period: { es: "Jul 2022 – Mar 2023", en: "Jul 2022 – Mar 2023" },
    points: [
      { es: "Desarrollo de una aplicación web con React.", en: "Built a web application with React." },
      {
        es: "Integración a un equipo para una app móvil en Flutter, centrada en enlaces de pago (payment links).",
        en: "Joined a team for a Flutter mobile app focused on payment links.",
      },
    ],
  },
  {
    org: "Core-Code",
    role: { es: "Creador de contenido educativo", en: "Educational content creator" },
    period: { es: "2020 – 2022", en: "2020 – 2022" },
    points: [
      { es: "Producción semanal de contenido sobre desarrollo web.", en: "Weekly production of web-development content." },
      { es: "Materiales técnicos prácticos para redes y difusión de herramientas de aprendizaje.", en: "Practical technical materials for social media and sharing of learning tools." },
    ],
  },
];

interface Study {
  org: string;
  title: Bilingual;
  period: Bilingual;
}

const EDUCATION: Study[] = [
  {
    org: "Universidad Fidélitas",
    title: {
      es: "Licenciatura en Ing. en Sistemas — énfasis en Calidad del Software",
      en: "Licentiate in Computer Systems Eng. — Software Quality focus",
    },
    period: { es: "En curso", en: "In progress" },
  },
  {
    org: "Universidad Fidélitas",
    title: { es: "Ingeniería en Sistemas de Computación", en: "Computer Systems Engineering" },
    period: { es: "2020 – 2023", en: "2020 – 2023" },
  },
];

const STACK_GROUPS: { label: Record<Locale, string>; items: string[] }[] = [
  { label: { es: "Frontend", en: "Frontend" }, items: ["Angular", "Next.js", "React", "TypeScript", "Tailwind", "HTML/CSS"] },
  { label: { es: "Backend & Datos", en: "Backend & Data" }, items: ["Go", "C#", ".NET", "Node.js", "SQL Server", "PostgreSQL", "Supabase", "REST APIs"] },
  { label: { es: "DevOps & Herramientas", en: "DevOps & Tooling" }, items: ["Azure", "Docker", "Git", "Postman", "Vercel", "ClickUp"] },
  { label: { es: "Método & Calidad", en: "Method & Quality" }, items: ["Scrum", "Agile", "Calidad del Software", "RLS / Seguridad"] },
];

const LANGUAGES: { label: Bilingual; level: Bilingual }[] = [
  { label: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" } },
  { label: { es: "Inglés", en: "English" }, level: { es: "Intermedio", en: "Intermediate" } },
];

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
            <h1 className="text-5xl font-semibold tracking-tighter sm:text-7xl">Steven Tercero Galo</h1>
            <p className="mt-3 font-mono text-sm text-accent">
              {dict.home.role} · GaloDev · Costa Rica
            </p>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 font-mono text-xs text-muted transition-colors duration-200 hover:border-accent/50 hover:text-text active:scale-95"
            >
              <Instagram className="h-3.5 w-3.5 text-accent" />
              {CONTACT.instagramHandle}
              <span className="text-faint">·</span>
              <span className="text-accent">{CONTACT.instagramFollowers}</span>
              <span>{locale === "es" ? "en comunidad" : "community"}</span>
            </a>
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
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Button href={CONTACT.cv} external variant="ghost">
                <Download className="h-4 w-4" />
                {dict.cta.downloadCv}
              </Button>
              <span className="font-mono text-xs text-faint">ASSET: /cv.pdf</span>
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

      {/* EXPERIENCE TIMELINE */}
      <section className="mx-auto mt-28 max-w-page">
        <SectionHeading eyebrow={locale === "es" ? "Trayectoria" : "Track record"} title={locale === "es" ? "Experiencia" : "Experience"} />
        <ol className="relative mt-12 border-l border-border pl-8 sm:pl-10">
          {EXPERIENCE.map((job, i) => (
            <li key={job.org} className="relative pb-12 last:pb-0">
              <span
                aria-hidden
                className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-bg bg-accent sm:-left-[45px]"
                style={{ boxShadow: "0 0 14px 1px var(--accent)" }}
              />
              <Reveal delay={i * 0.04}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-semibold">
                    {job.org}
                    <span className="text-muted"> · {resolveBilingual(job.role, locale)}</span>
                  </h3>
                  <span className="font-mono text-xs text-faint">{resolveBilingual(job.period, locale)}</span>
                </div>
                <ul className="mt-3 space-y-2">
                  {job.points.map((pt, j) => (
                    <li key={j} className="flex gap-3 text-pretty text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-faint" />
                      {resolveBilingual(pt, locale)}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* EDUCATION */}
      <section className="mx-auto mt-28 max-w-page">
        <SectionHeading eyebrow={locale === "es" ? "Formación" : "Education"} title={locale === "es" ? "Educación" : "Education"} />
        <div className="mt-10 space-y-4">
          {EDUCATION.map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-2xl border border-border bg-surface/60 p-6">
                <div>
                  <h3 className="text-lg font-semibold">{resolveBilingual(s.title, locale)}</h3>
                  <p className="text-sm text-muted">{s.org}</p>
                </div>
                <span className="font-mono text-xs text-faint">{resolveBilingual(s.period, locale)}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section className="mx-auto mt-28 max-w-page">
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

      {/* LANGUAGES */}
      <section className="mx-auto mt-28 max-w-page pb-28">
        <SectionHeading eyebrow={locale === "es" ? "Idiomas" : "Languages"} title={locale === "es" ? "Idiomas" : "Languages"} />
        <div className="mt-10 flex flex-wrap gap-4">
          {LANGUAGES.map((l) => (
            <Reveal key={l.label.en}>
              <div className="rounded-2xl border border-border bg-surface/60 px-6 py-4">
                <p className="text-lg font-semibold">{resolveBilingual(l.label, locale)}</p>
                <p className="font-mono text-xs text-accent">{resolveBilingual(l.level, locale)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
