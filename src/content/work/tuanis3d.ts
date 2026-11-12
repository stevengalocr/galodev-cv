import type { Project } from "./types";

export const tuanis3d: Project = {
  slug: "tuanis3d",
  name: "Tuanis3D",
  accent: "#FF6A3D",
  year: "2026",
  status: { es: "Producción", en: "Production" },
  liveUrl: "https://tuanis3d.com",
  kind: {
    es: "Negocio propio · Impresión 3D",
    en: "Own business · 3D printing",
  },
  tagline: {
    es: "Pura idea. Realidad.",
    en: "Pure idea. Made real.",
  },
  summary: {
    es: "Mi taller de impresión 3D en Costa Rica: catálogo, cotización sin cuenta y un panel que calcula el costo real de cada pieza. Suma Mundo 3D, una biblioteca de guías y herramientas.",
    en: "My 3D-printing workshop in Costa Rica: catalog, no-account quotes and a panel that computes the real cost of every piece. Plus Mundo 3D, a library of guides and tools.",
  },
  highlights: [
    { es: "Calculadora de costo real por pieza", en: "Real per-piece cost calculator" },
    { es: "Seguridad en RLS, sin backend propio", en: "Security in RLS, no custom backend" },
    { es: "Generador de QR 3D (SVG, PNG, STL)", en: "3D QR generator (SVG, PNG, STL)" },
  ],
  problem: {
    es: "Un taller de impresión 3D vende por Instagram y WhatsApp, cotiza a ojo y pierde plata sin notarlo: la purga de filamento al cambiar de color, la luz y el desgaste de la máquina no aparecen en ningún lado. Hacía falta una cara pública que genere confianza y una operación que cobre lo que de verdad cuesta cada pieza.",
    en: "A 3D-printing workshop sells through Instagram and WhatsApp, quotes by eye and loses money without noticing: filament purge on colour changes, electricity and machine wear show up nowhere. It needed a public face that builds trust and an operation that charges what each piece really costs.",
  },
  solution: [
    {
      es: "Sitio público: catálogo, regalos por temporada, ideas y una solicitud de cotización en pasos, sin crear cuenta, que devuelve un código de seguimiento.",
      en: "Public site: catalog, seasonal gifts, ideas and a step-by-step quote request with no account, returning a tracking code.",
    },
    {
      es: "Panel privado: solicitudes, calculadora de precios, catálogo, ventas, gastos, inventario de filamento y métricas del embudo.",
      en: "Private panel: requests, pricing calculator, catalog, sales, expenses, filament inventory and funnel metrics.",
    },
    {
      es: "Mundo 3D: guías con fuentes, casos documentados del taller y herramientas, como un generador de QR 3D que exporta SVG, PNG y STL.",
      en: "Mundo 3D: sourced guides, documented workshop cases and tools, such as a 3D QR generator that exports SVG, PNG and STL.",
    },
  ],
  architecture: {
    summary: {
      es: "Una sola app Next.js con tres superficies sobre la misma base: pública con ISR, editorial estática y panel privado. No hay backend propio: el visitante solo puede leer lo publicado e insertar una solicitud, y esa regla vive en las políticas RLS de Postgres, no en el código del cliente.",
      en: "A single Next.js app with three surfaces over one database: public with ISR, static editorial and a private panel. There is no custom backend: a visitor can only read what is published and insert a request, and that rule lives in Postgres RLS policies, not in client code.",
    },
    nodes: [
      { id: "visitor", label: "Visitante", role: { es: "Catálogo y solicitud sin cuenta", en: "Catalog and no-account request" } },
      { id: "next", label: "Next.js 16", role: { es: "Pública (ISR) · Mundo 3D (SSG) · Panel", en: "Public (ISR) · Mundo 3D (SSG) · Panel" } },
      { id: "rls", label: "Políticas RLS", role: { es: "Leer lo publicado, insertar solicitudes", en: "Read published, insert requests" } },
      { id: "db", label: "Supabase", role: { es: "Catálogo, ventas, gastos, inventario", en: "Catalog, sales, expenses, inventory" } },
    ],
    edges: [
      { from: "visitor", to: "next" },
      { from: "next", to: "rls" },
      { from: "rls", to: "db" },
    ],
  },
  challenges: [
    {
      title: { es: "El costo oculto de imprimir a color", en: "The hidden cost of colour printing" },
      body: {
        es: "El motor de precios suma material, purga por cambio de color, luz, máquina, trabajo, empaque y envío, y devuelve tres precios redondeados. Es lógica pura, sin interfaz, y cada cambio pasa por sus pruebas.",
        en: "The pricing engine adds material, colour-change purge, electricity, machine, labour, packaging and shipping, and returns three rounded prices. It is pure logic with no UI, and every change goes through its tests.",
      },
    },
    {
      title: { es: "Un STL que de verdad se imprime", en: "An STL that actually prints" },
      body: {
        es: "El generador de QR 3D produce un único sólido conectado: se reimportó y laminó en Bambu Studio antes de publicarlo. Codificador, dimensiones y geometría están separados de la interfaz.",
        en: "The 3D QR generator outputs a single connected solid: it was re-imported and sliced in Bambu Studio before release. Encoder, dimensions and geometry are separate from the UI.",
      },
    },
    {
      title: { es: "Venta y contenido, separados", en: "Sales and content, kept apart" },
      body: {
        es: "El catálogo y el formulario no cargan publicidad ni su código. Los anuncios solo existen en artículos elegibles de Mundo 3D, y una prueba automática lo vigila en cada cambio.",
        en: "The catalog and the form load no ads and none of their code. Ads only exist on eligible Mundo 3D articles, and an automated test guards that on every change.",
      },
    },
  ],
  security: [
    {
      es: "Sin registro público: el panel está detrás de un único acceso de administrador, y los encabezados de seguridad se verifican con una prueba dedicada.",
      en: "No public sign-up: the panel sits behind a single admin login, and security headers are checked by a dedicated test.",
    },
  ],
  metrics: [
    { label: { es: "Superficies en una app", en: "Surfaces in one app" }, value: "3" },
    { label: { es: "Suites de prueba", en: "Test suites" }, value: "17" },
    { label: { es: "Revalidación del catálogo", en: "Catalog revalidation" }, value: "60 s" },
  ],
  stack: [
    "Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL/RLS",
    "three.js", "Recharts", "Tailwind 4", "Motion", "Playwright", "Vercel",
  ],
  screenshots: [
    { src: "/work/tuanis3d/desktop.webp", device: "desktop", alt: { es: "Portada de Tuanis3D", en: "Tuanis3D landing page" } },
    { src: "/work/tuanis3d/detail.webp", device: "desktop", alt: { es: "Ideas que se pueden imprimir", en: "Ideas that can be printed" } },
    { src: "/work/tuanis3d/mobile.webp", device: "mobile", alt: { es: "Tuanis3D en el teléfono", en: "Tuanis3D on a phone" } },
  ],
};
