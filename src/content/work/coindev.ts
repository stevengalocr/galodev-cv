import type { Project } from "./types";

// NOTE: liveUrl and screenshot files are ASSETS — see ASSETS-TODO.md
export const coindev: Project = {
  slug: "coindev",
  name: "CoinDev",
  accent: "#7C5CFF",
  year: "2026",
  status: { es: "v0.1 · Pre-lanzamiento", en: "v0.1 · Pre-launch" },
  liveUrl: "https://coindev.app",
  kind: {
    es: "Web app · Finanzas personales",
    en: "Web app · Personal finance",
  },
  tagline: {
    es: "Tus finanzas personales, claras y en tu moneda.",
    en: "Your personal finances, clear and in your currency.",
  },
  problem: {
    es: "Las apps de finanzas personales suelen ser genéricas, en dólares y pensadas para otro mercado. Hacía falta una herramienta simple, en español y orientada al usuario costarricense, que muestre ingresos, gastos, presupuestos y metas con tipos de cambio reales.",
    en: "Personal finance apps tend to be generic, dollar-centric and built for another market. The need was a simple, Spanish-first tool for the Costa Rican user that shows income, expenses, budgets and goals with real exchange rates.",
  },
  solution: [
    {
      es: "Ocho módulos: resumen, movimientos, cuentas, presupuestos, metas de ahorro con aportes, gastos fijos, divisas en vivo y reportes.",
      en: "Eight modules: overview, transactions, accounts, budgets, savings goals with contributions, fixed expenses, live FX, and reports.",
    },
    {
      es: "Conversor USD/CRC en tiempo real vía una Edge Function que cachea la Currency API; sparkline de tendencia y pills de compra/venta.",
      en: "Real-time USD/CRC converter via an Edge Function caching the Currency API; trend sparkline and buy/sell pills.",
    },
    {
      es: "Reportes: distribución de gastos, top comercios, tasa de ahorro, ratio de gastos fijos y días de fondo de emergencia.",
      en: "Reports: spending distribution, top merchants, savings rate, fixed-expense ratio and emergency-fund days.",
    },
  ],
  architecture: {
    summary: {
      es: "App Next.js 16 client-side con dos contextos React (preferencias y datos de negocio) sobre Supabase con RLS. Una Edge Function /api/fx cachea los tipos de cambio. Soft-delete en todo y snapshot del tipo de cambio al registrar cada movimiento.",
      en: "A client-side Next.js 16 app with two React contexts (preferences and business data) over Supabase with RLS. An /api/fx Edge Function caches exchange rates. Soft-delete everywhere and an FX-rate snapshot on each transaction.",
    },
    nodes: [
      { id: "user", label: "Usuario", role: { es: "Dashboard client-side", en: "Client-side dashboard" } },
      { id: "next", label: "Next.js 16", role: { es: "useApp · useData contexts", en: "useApp · useData contexts" } },
      { id: "fx", label: "/api/fx", role: { es: "Edge Function cacheada", en: "Cached Edge Function" } },
      { id: "db", label: "Supabase + RLS", role: { es: "Cuentas, movimientos, metas", en: "Accounts, transactions, goals" } },
    ],
    edges: [
      { from: "user", to: "next" },
      { from: "next", to: "fx" },
      { from: "next", to: "db" },
    ],
  },
  challenges: [
    {
      title: { es: "Fechas sin drift de timezone", en: "Timezone-drift-free dates" },
      body: {
        es: "Las transacciones se guardan como DATE y al leer se reconstruyen a las 12:00 locales, evitando que un movimiento 'salte' de día según la zona horaria.",
        en: "Transactions are stored as DATE and reconstructed at local noon on read, so a movement never 'jumps' a day across time zones.",
      },
    },
    {
      title: { es: "Multi-moneda con snapshot", en: "Multi-currency with snapshot" },
      body: {
        es: "Todo se almacena en la moneda de la cuenta y cada movimiento guarda el tipo de cambio del momento, manteniendo la historia consistente aunque la tasa cambie.",
        en: "Everything is stored in the account's currency and each movement keeps the exchange rate at that moment, keeping history consistent even as the rate moves.",
      },
    },
    {
      title: { es: "Soft-delete en todo el modelo", en: "Soft-delete across the model" },
      body: {
        es: "Cuentas, transacciones, metas y gastos fijos nunca se borran físicamente: se marca deleted_at / is_active, preservando integridad y reportes históricos.",
        en: "Accounts, transactions, goals and fixed expenses are never physically deleted: deleted_at / is_active is set, preserving integrity and historical reports.",
      },
    },
  ],
  metrics: [
    { label: { es: "Módulos", en: "Modules" }, value: "8" },
    { label: { es: "Mercado", en: "Market" }, value: "Costa Rica" },
    { label: { es: "FX en vivo", en: "Live FX" }, value: "USD/CRC" },
  ],
  stack: [
    "Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL/RLS",
    "Edge Functions", "Recharts", "jsPDF", "CSS variables", "Vercel",
  ],
  screenshots: [
    { src: "/screenshots/coindev/overview.png", alt: { es: "Resumen financiero", en: "Financial overview" } },
    { src: "/screenshots/coindev/fx.png", alt: { es: "Divisas en tiempo real", en: "Real-time currencies" } },
    { src: "/screenshots/coindev/reports.png", alt: { es: "Reportes y análisis", en: "Reports and analysis" } },
  ],
};
