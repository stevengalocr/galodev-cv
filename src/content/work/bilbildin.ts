import type { Project } from "./types";

export const bilbildin: Project = {
  slug: "bilbildin",
  name: "BilBildin",
  accent: "#C9F24E",
  year: "2026",
  status: { es: "v1.0.1 · Producción", en: "v1.0.1 · Production" },
  liveUrl: "https://bilbildin.com",
  kind: {
    es: "SaaS multi-tenant · E-commerce + ganancia",
    en: "Multi-tenant SaaS · E-commerce + profit",
  },
  tagline: {
    es: "Sabe cuánto ganas. Hoy. No al final del mes.",
    en: "It knows what you earn. Today. Not at month's end.",
  },
  summary: {
    es: "Tienda en línea con la marca de cada negocio y un panel simple para productos, pedidos e inventario. El dueño ve su ganancia real, no solo las ventas.",
    en: "An online store under each business's own brand, with a simple panel for products, orders and inventory. Owners see real profit, not just sales.",
  },
  highlights: [
    { es: "Tiendas con dominio propio", en: "Stores on their own domain" },
    { es: "Inventario que se descuenta solo", en: "Inventory that updates itself" },
    { es: "Español, inglés y portugués", en: "Spanish, English and Portuguese" },
  ],
  problem: {
    es: "Los micro y pequeños negocios de LATAM venden mucho por WhatsApp e Instagram pero rara vez saben cuánto ganan: pedidos dispersos, inventario en la cabeza, costos y precios sin control y cero datos para decidir.",
    en: "LATAM micro-businesses sell a lot over WhatsApp and Instagram but rarely know what they earn: scattered orders, inventory in their head, uncontrolled costs and prices, and no data to decide.",
  },
  solution: [
    {
      es: "Tienda en línea profesional con la marca del negocio: catálogo con búsqueda/filtros, página de producto con variantes, carrito, checkout, confirmación y tracking público.",
      en: "A professional, branded online store: searchable/filterable catalog, product page with variants, cart, checkout, confirmation and public tracking.",
    },
    {
      es: "Panel de administración con ganancia real (ingresos − costos) por venta, CRUD de productos con costo/margen, máquina de estados de pedidos, inventario con historial, clientes y reportes.",
      en: "Admin panel showing real profit (revenue − cost) per sale, product CRUD with cost/margin, an order state machine, inventory with history, customers and reports.",
    },
    {
      es: "Plataforma super-admin: alta, activación y bloqueo de negocios, cobros y gestión de leads.",
      en: "Super-admin platform: onboarding, activation and blocking of businesses, billing and lead management.",
    },
    {
      es: "Multi-idioma (ES/EN/PT), multi-moneda y pagos locales (SINPE, transferencia/link, efectivo).",
      en: "Multi-language (ES/EN/PT), multi-currency and local payments (SINPE, transfer/link, cash).",
    },
  ],
  architecture: {
    summary: {
      es: "Un solo deployment de Next.js 15 sirve el motor de muchas tiendas. El tenant se resuelve por sesión del dueño o por el dominio entrante. Supabase con RLS aísla cada negocio por business_id; el costo nunca llega al navegador y el stock se decrementa de forma atómica.",
      en: "One Next.js 15 deployment powers many stores. The tenant is resolved by the owner's session or the incoming domain. Supabase with RLS isolates each business by business_id; cost never reaches the browser and stock decrements atomically.",
    },
    nodes: [
      { id: "domain", label: "Dominio del cliente", role: { es: "Tienda pública con marca propia", en: "Branded public store" } },
      { id: "next", label: "Next.js 15", role: { es: "Tienda, admin, plataforma", en: "Store, admin, platform" } },
      { id: "resolve", label: "Tenant resolver", role: { es: "Por sesión o por host", en: "By session or host" } },
      { id: "db", label: "Supabase + RLS", role: { es: "Aislado por business_id", en: "Isolated by business_id" } },
    ],
    edges: [
      { from: "domain", to: "next", label: "host" },
      { from: "next", to: "resolve" },
      { from: "resolve", to: "db" },
    ],
  },
  challenges: [
    {
      title: { es: "Sistema circular de integración", en: "Circular integration system" },
      body: {
        es: "Una landing externa, en el dominio propio del cliente, se conecta al mismo backend y opera como espejo del admin: lee el catálogo en vivo y registra sus pedidos en BilBildin, manteniendo el aislamiento por negocio.",
        en: "An external landing, on the client's own domain, connects to the same backend and mirrors the admin: it reads the live catalog and registers its orders in BilBildin, keeping per-business isolation.",
      },
    },
    {
      title: { es: "Inventario sin sobreventa", en: "No-oversell inventory" },
      body: {
        es: "El stock se decrementa de forma atómica al confirmar el pedido (migración harden_decrement_stock), evitando carreras y ventas de producto inexistente.",
        en: "Stock decrements atomically on order confirmation (harden_decrement_stock migration), preventing races and selling phantom inventory.",
      },
    },
    {
      title: { es: "El costo nunca toca el navegador", en: "Cost never touches the browser" },
      body: {
        es: "cost_price y los márgenes viven solo del lado servidor; el rol anónimo es de solo lectura y el precio de venta se valida en el servidor contra manipulación.",
        en: "cost_price and margins live server-side only; the anon role is read-only and the sale price is validated server-side against tampering.",
      },
    },
  ],
  security: [
    {
      es: "Aislamiento estricto por business_id derivado del usuario o del dominio (nunca del navegador), con normalización del host para evitar inyección en el filtro.",
      en: "Strict isolation by business_id derived from user or domain (never the browser), with host normalization to prevent filter injection.",
    },
    {
      es: "RLS deny-all en tablas sensibles, escrituras solo por servicio en el servidor, y cabeceras de seguridad HTTP (CSP, HSTS, X-Frame-Options).",
      en: "Deny-all RLS on sensitive tables, writes only via server service role, and HTTP security headers (CSP, HSTS, X-Frame-Options).",
    },
  ],
  metrics: [
    { label: { es: "Idiomas", en: "Languages" }, value: "ES · EN · PT" },
    { label: { es: "Listo en", en: "Live in" }, value: "48h" },
    { label: { es: "Ganancia", en: "Profit" }, value: "= ingresos − costos" },
  ],
  stack: [
    "Next.js 15", "React 19", "TypeScript", "Supabase", "PostgreSQL/RLS",
    "i18n ES/EN/PT", "Tailwind", "lucide-react", "Vercel",
  ],
  screenshots: [
    { src: "/work/bilbildin/desktop.webp", device: "desktop", alt: { es: "Portada de BilBildin con la tienda demo", en: "BilBildin landing with the demo store" } },
    { src: "/work/bilbildin/detail.webp", device: "desktop", alt: { es: "Lo que incluye cada tienda", en: "What every store includes" } },
    { src: "/work/bilbildin/mobile.webp", device: "mobile", alt: { es: "BilBildin en el teléfono", en: "BilBildin on a phone" } },
  ],
};
