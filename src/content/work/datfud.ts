import type { Project } from "./types";

// NOTE: liveUrl and screenshot files are ASSETS — see ASSETS-TODO.md
export const datfud: Project = {
  slug: "datfud",
  name: "DataFud",
  accent: "#FF5C38",
  year: "2026",
  status: { es: "v1.0.1 · Producción", en: "v1.0.1 · Production" },
  liveUrl: "https://datafud.com",
  kind: {
    es: "SaaS multi-tenant · Menú digital QR",
    en: "Multi-tenant SaaS · QR digital menu",
  },
  tagline: {
    es: "El comensal pide desde su mesa por QR; el restaurante opera en tiempo real.",
    en: "Diners order from their table by QR; the restaurant runs in real time.",
  },
  problem: {
    es: "Los restaurantes y sodas pierden tiempo y ventas con menús de papel desactualizados y comandas a mano. Necesitan que el cliente pida solo, que la cocina lo vea al instante y que el dueño controle el negocio sin contratar software a la medida.",
    en: "Restaurants lose time and sales to outdated paper menus and handwritten orders. They need diners to self-order, the kitchen to see it instantly, and the owner to run the business without bespoke software.",
  },
  solution: [
    {
      es: "Menú virtual por QR/NFC: /m/[tenant]/[mesa]. El comensal navega, arma su pedido y lo envía sin instalar nada ni iniciar sesión.",
      en: "Virtual QR/NFC menu at /m/[tenant]/[table]. The diner browses, builds an order and submits it — no install, no login.",
    },
    {
      es: "Panel del restaurante: gestión de menú, mesas/QR, comandas en vivo (tablero kanban), reportes y configuración de marca, idioma y moneda.",
      en: "Restaurant panel: menu management, tables/QR, live order board (kanban), reports, and brand/language/currency settings.",
    },
    {
      es: "Panel super-admin: tenants, planes, pagos y cargos (implementación / NFC), con métricas de toda la plataforma.",
      en: "Super-admin panel: tenants, plans, payments and charges (setup / NFC), with platform-wide metrics.",
    },
    {
      es: "Multi-idioma, multi-moneda y temas por local — un solo deployment sirve a muchos restaurantes.",
      en: "Multi-language, multi-currency and per-venue themes — one deployment serves many restaurants.",
    },
  ],
  architecture: {
    summary: {
      es: "El cliente anónimo nunca toca las tablas. Todo el menú y los pedidos pasan por funciones SECURITY DEFINER en Postgres que validan slug + qr_token y calculan precios en el servidor. El resto del negocio queda aislado por RLS por tenant_id.",
      en: "The anonymous client never touches tables. The menu and orders go through SECURITY DEFINER Postgres functions that validate slug + qr_token and compute prices server-side. Everything else is isolated by per-tenant RLS.",
    },
    nodes: [
      { id: "diner", label: "Comensal (anon)", role: { es: "Escanea el QR de la mesa", en: "Scans the table QR" } },
      { id: "next", label: "Next.js 15", role: { es: "Menú, panel, super-admin", en: "Menu, panel, super-admin" } },
      { id: "rpc", label: "RPCs SECURITY DEFINER", role: { es: "get_menu() · place_order()", en: "get_menu() · place_order()" } },
      { id: "db", label: "Supabase + RLS", role: { es: "Tenants aislados por tenant_id", en: "Tenants isolated by tenant_id" } },
    ],
    edges: [
      { from: "diner", to: "next", label: "QR" },
      { from: "next", to: "rpc" },
      { from: "rpc", to: "db" },
    ],
  },
  challenges: [
    {
      title: { es: "Precios recalculados en el servidor", en: "Prices recomputed server-side" },
      body: {
        es: "place_order() ignora cualquier precio que mande el cliente: relee los productos del tenant, recalcula totales y guarda snapshots. Anti-manipulación real, no validación cosmética.",
        en: "place_order() ignores any price the client sends: it re-reads the tenant's products, recomputes totals and stores snapshots. Real anti-tampering, not cosmetic validation.",
      },
    },
    {
      title: { es: "Cliente anónimo sin acceso a tablas", en: "Anonymous client, zero table access" },
      body: {
        es: "El rol anon no tiene SELECT sobre el negocio. get_menu(slug, qr_token) expone solo lo seguro de un tenant activo. Un bug de aplicación no puede filtrar datos de otro restaurante.",
        en: "The anon role has no SELECT on business tables. get_menu(slug, qr_token) exposes only the safe data of an active tenant. An app bug can't leak another restaurant's data.",
      },
    },
    {
      title: { es: "Límites de plan en la base de datos", en: "Plan limits in the database" },
      body: {
        es: "Triggers enforce_plan_limit('max_products' | 'max_categories' | 'max_tables') hacen cumplir los planes en Postgres — imposible saltarlos desde el frontend.",
        en: "enforce_plan_limit('max_products' | 'max_categories' | 'max_tables') triggers enforce plans in Postgres — impossible to bypass from the frontend.",
      },
    },
  ],
  security: [
    {
      es: "Multi-tenant por RLS: cada tabla filtra por tenant_id con current_tenant_id(); los roles viven en profiles, no en claims manipulables por el usuario.",
      en: "Multi-tenant via RLS: every table filters by tenant_id through current_tenant_id(); roles live in profiles, not in user-manipulable claims.",
    },
  ],
  metrics: [
    { label: { es: "Vistas por rol", en: "Role views" }, value: "4" },
    { label: { es: "RPCs de seguridad", en: "Security RPCs" }, value: "2" },
    { label: { es: "Idiomas / monedas", en: "Languages / currencies" }, value: "3 / LATAM" },
  ],
  stack: [
    "Next.js 15", "React 19", "TypeScript", "Supabase", "PostgreSQL/RLS",
    "SECURITY DEFINER RPCs", "Tailwind", "qrcode", "Zod", "Vercel",
  ],
  screenshots: [
    { src: "/screenshots/datfud/menu-client.png", alt: { es: "Menú del comensal por QR", en: "Diner QR menu" } },
    { src: "/screenshots/datfud/order-board.png", alt: { es: "Tablero de comandas en vivo", en: "Live order board" } },
    { src: "/screenshots/datfud/dashboard.png", alt: { es: "Panel del restaurante", en: "Restaurant dashboard" } },
  ],
};
