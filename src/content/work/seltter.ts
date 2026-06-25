import type { Project } from "./types";

// NOTE: liveUrl and screenshot files are ASSETS — see ASSETS-TODO.md
export const seltter: Project = {
  slug: "seltter",
  name: "Seltter",
  accent: "#C9A84C",
  year: "2026",
  status: { es: "v1.0.1 · Producción", en: "v1.0.1 · Production" },
  liveUrl: "https://seltter.com",
  kind: {
    es: "SaaS B2B · Fidelización en Wallet",
    en: "B2B SaaS · Wallet loyalty",
  },
  tagline: {
    es: "La lealtad no se descarga. Se lleva en el bolsillo.",
    en: "Loyalty you don't download. You carry it in your pocket.",
  },
  problem: {
    es: "El cartón de sellos de papel se pierde, no da datos y no recuerda al cliente que vuelva. Las apps de fidelización exigen descargar una app — fricción que mata la adopción — y los negocios locales no quieren invertir en hardware ni software complejo.",
    en: "Paper stamp cards get lost, give no data, and never remind the customer to come back. Traditional loyalty apps force a download — friction that kills adoption — and local businesses won't invest in hardware or complex software.",
  },
  solution: [
    {
      es: "Tarjeta de fidelización premium con la marca del negocio que vive en Apple Wallet y Google Wallet, sin que el cliente descargue ninguna app.",
      en: "A premium, branded loyalty card that lives in Apple Wallet and Google Wallet — no app download for the customer.",
    },
    {
      es: "Editor de tarjeta en vivo: colores, logo, fondo, premio y reverso, persistido a la base de datos y propagado a los passes.",
      en: "Live card editor: colors, logo, background, reward and back fields, persisted to the database and pushed to the passes.",
    },
    {
      es: "Auto-registro del cliente en /unirse/[negocio] → tarjeta en el Wallet en segundos. Estación web que escanea el QR del cliente y registra el sello.",
      en: "Customer self-enrollment at /unirse/[business] → card in the Wallet in seconds. A web station scans the customer's QR and records the stamp.",
    },
    {
      es: "Panel completo: clientes, sellos, reportes de retención (7/30/90 días), campañas de email y planes de suscripción con límites.",
      en: "Full dashboard: customers, stamps, retention reports (7/30/90 days), email campaigns, and subscription plans with limits.",
    },
  ],
  architecture: {
    summary: {
      es: "Next.js 16 sirve el panel y los endpoints. Supabase (RLS) guarda negocios, clientes y sellos. Librerías propias de Wallet generan y firman los passes; un Web Service de PassKit y APNs propio (sobre node:http2, sin librerías externas) mantienen la tarjeta actualizada en tiempo real.",
      en: "Next.js 16 serves the panel and endpoints. Supabase (RLS) stores businesses, customers and stamps. In-house Wallet libraries generate and sign passes; a PassKit Web Service and a custom APNs client (over node:http2, no external libs) keep the card live in real time.",
    },
    nodes: [
      { id: "client", label: "Cliente / Wallet", role: { es: "Apple/Google Wallet del cliente", en: "Customer's Apple/Google Wallet" } },
      { id: "next", label: "Next.js 16", role: { es: "Panel, estación de sellos, API", en: "Panel, stamp station, API" } },
      { id: "wallet", label: "Wallet libs", role: { es: "passData · passAuth · applePass · apns · googlePass", en: "passData · passAuth · applePass · apns · googlePass" } },
      { id: "supabase", label: "Supabase + RLS", role: { es: "Negocios, clientes, sellos", en: "Businesses, customers, stamps" } },
      { id: "apns", label: "APNs / Google API", role: { es: "Push de actualización del pass", en: "Pass update push" } },
    ],
    edges: [
      { from: "client", to: "next", label: "QR" },
      { from: "next", to: "supabase" },
      { from: "next", to: "wallet" },
      { from: "wallet", to: "apns" },
      { from: "apns", to: "client", label: "push" },
    ],
  },
  challenges: [
    {
      title: { es: "PassKit Web Service desde cero", en: "PassKit Web Service from scratch" },
      body: {
        es: "Implementé el protocolo completo de Apple: registro/baja de dispositivos, listado de passes actualizables y entrega del pass, con autenticación por token HMAC. Sin SDK de pago: solo el spec de Apple.",
        en: "I implemented Apple's full protocol: device register/unregister, listing updatable passes, and pass delivery, authenticated with an HMAC token. No paid SDK — just Apple's spec.",
      },
    },
    {
      title: { es: "APNs sobre node:http2 sin librerías", en: "APNs over node:http2, no libraries" },
      body: {
        es: "El push de actualización del pass va por APNs autenticado con certificado, implementado directamente sobre node:http2. Cero dependencias externas para el canal más crítico.",
        en: "The pass-update push goes through certificate-authenticated APNs, built directly on node:http2. Zero external dependencies for the most critical channel.",
      },
    },
    {
      title: { es: "Google Wallet con JWT RS256", en: "Google Wallet with RS256 JWT" },
      body: {
        es: "Para 'Guardar en Wallet' firmo un JWT RS256, y actualizo los objetos vía la REST API de Google (patch). Mismo modelo de datos, dos billeteras.",
        en: "For 'Save to Wallet' I sign an RS256 JWT, and update objects via Google's REST API (object patch). One data model, two wallets.",
      },
    },
    {
      title: { es: "Geo-notificaciones", en: "Geo-notifications" },
      body: {
        es: "La tarjeta aparece en la pantalla de bloqueo del cliente cuando pasa cerca del local, configurable por ubicación según el plan.",
        en: "The card surfaces on the customer's lock screen when they're near the venue, configurable per location based on the plan.",
      },
    },
  ],
  security: [
    {
      es: "Auditoría profesional con severidades P0–P3: se detectaron y corrigieron un endpoint admin sin auth, una fuga de datos y una política RLS que rompía el registro público.",
      en: "Professional audit with P0–P3 severities: an unauthenticated admin endpoint, a data leak, and an RLS policy that broke public enrollment were found and fixed.",
    },
    {
      es: "Control de acceso de superadmin centralizado y 'fail-closed'; endpoints públicos endurecidos (escape de HTML, sanitización de color anti-inyección CSS, límites de tamaño) y cabeceras de seguridad.",
      en: "Centralized, fail-closed superadmin access control; hardened public endpoints (HTML escaping, anti-CSS-injection color sanitization, size limits) and security headers.",
    },
  ],
  metrics: [
    { label: { es: "Billeteras soportadas", en: "Wallets supported" }, value: "2" },
    { label: { es: "Dependencias en el push", en: "Push dependencies" }, value: "0" },
    { label: { es: "Severidades auditadas", en: "Audit severities" }, value: "P0–P3" },
  ],
  stack: [
    "Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL/RLS",
    "passkit-generator", "node:http2 (APNs)", "google-auth-library", "Stripe",
    "Tailwind 4", "Framer Motion", "@zxing", "Nodemailer", "Sharp", "Zod",
  ],
  screenshots: [
    { src: "/screenshots/seltter/dashboard.png", alt: { es: "Panel de Seltter con clientes y reportes", en: "Seltter dashboard with customers and reports" } },
    { src: "/screenshots/seltter/card-editor.png", alt: { es: "Editor de tarjeta en vivo", en: "Live card editor" } },
    { src: "/screenshots/seltter/wallet-pass.png", alt: { es: "Tarjeta en Apple Wallet", en: "Card in Apple Wallet" } },
  ],
};
