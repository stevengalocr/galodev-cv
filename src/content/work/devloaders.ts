import type { Project } from "./types";

export const devloaders: Project = {
  slug: "devloaders",
  name: "DevLoaders",
  accent: "#A855F7",
  year: "2026",
  status: { es: "Producción", en: "Production" },
  liveUrl: "https://devloaders.app",
  kind: {
    es: "Herramienta web · PWA",
    en: "Web tool · PWA",
  },
  tagline: {
    es: "Descarga lo que más te gusta.",
    en: "Download what you love.",
  },
  summary: {
    es: "Descargador de Reels y TikToks sin marca de agua, gratis y sin registro. Una herramienta de una sola pantalla, instalable como app en el teléfono.",
    en: "A free, no-sign-up downloader for Reels and TikToks without watermark. A single-screen tool, installable as an app on your phone.",
  },
  highlights: [
    { es: "Proxy propio para servir el video", en: "Own proxy to deliver the video" },
    { es: "Validación y límite de peticiones", en: "Validation and rate limiting" },
    { es: "Escena 3D con carga diferida", en: "Lazy-loaded 3D scene" },
  ],
  problem: {
    es: "Quien crea contenido necesita recuperar sus propios videos sin marca de agua, y las opciones que hay están llenas de anuncios, registros y pasos de más. La idea: pegar el enlace, tocar un botón y listo.",
    en: "Content creators need their own videos back without a watermark, and the existing options are full of ads, sign-ups and extra steps. The idea: paste the link, tap one button, done.",
  },
  solution: [
    {
      es: "Una sola pantalla: selector de plataforma, campo para el enlace y botón de pegar desde el portapapeles.",
      en: "A single screen: platform switcher, link field and a paste-from-clipboard button.",
    },
    {
      es: "Sin cuentas ni registro, en español e inglés, e instalable como PWA en iOS y Android.",
      en: "No accounts or sign-up, in Spanish and English, and installable as a PWA on iOS and Android.",
    },
    {
      es: "Un robot 3D interactivo le da carácter a la página sin frenar la carga: la escena entra después del contenido.",
      en: "An interactive 3D robot gives the page character without slowing the load: the scene comes in after the content.",
    },
  ],
  architecture: {
    summary: {
      es: "El navegador nunca habla con el proveedor de video. Una ruta del servidor valida el enlace, aplica el límite de peticiones y consulta la API con la clave guardada en el servidor; una segunda ruta transmite el archivo para que la descarga no choque con las restricciones del CDN.",
      en: "The browser never talks to the video provider. A server route validates the link, applies rate limiting and queries the API with a server-side key; a second route streams the file so the download does not hit the CDN's restrictions.",
    },
    nodes: [
      { id: "user", label: "Usuario", role: { es: "Pega el enlace", en: "Pastes the link" } },
      { id: "api", label: "/api/download", role: { es: "Valida y limita peticiones", en: "Validates and rate-limits" } },
      { id: "provider", label: "API externa", role: { es: "Resuelve el video", en: "Resolves the video" } },
      { id: "proxy", label: "/api/download/proxy", role: { es: "Transmite el archivo", en: "Streams the file" } },
    ],
    edges: [
      { from: "user", to: "api" },
      { from: "api", to: "provider" },
      { from: "provider", to: "proxy" },
    ],
  },
  challenges: [
    {
      title: { es: "Descargar sin chocar con el CDN", en: "Downloading without fighting the CDN" },
      body: {
        es: "Los videos viven en servidores que no permiten descargarlos desde otra página. La solución fue un proxy que transmite el archivo, sin guardarlo en el servidor.",
        en: "The videos live on servers that do not allow downloads from another page. The fix was a proxy that streams the file, without storing it on the server.",
      },
    },
    {
      title: { es: "Una API pública difícil de abusar", en: "A public API that is hard to abuse" },
      body: {
        es: "Cada petición valida que el enlace sea de una plataforma soportada y pasa por un límite de uso antes de gastar una sola llamada al proveedor.",
        en: "Every request checks the link belongs to a supported platform and passes a usage limit before spending a single call to the provider.",
      },
    },
    {
      title: { es: "3D sin castigar la carga", en: "3D without punishing load time" },
      body: {
        es: "La escena de Spline se carga de forma diferida, así el formulario ya funciona mientras el robot todavía viene en camino.",
        en: "The Spline scene is lazy-loaded, so the form already works while the robot is still on its way.",
      },
    },
  ],
  security: [
    {
      es: "La clave de la API nunca llega al navegador, las rutas /api quedan fuera de los buscadores y la app envía encabezados de seguridad en cada respuesta.",
      en: "The API key never reaches the browser, /api routes are kept out of search engines and the app sends security headers on every response.",
    },
  ],
  metrics: [
    { label: { es: "Plataformas", en: "Platforms" }, value: "2" },
    { label: { es: "Registros necesarios", en: "Sign-ups required" }, value: "0" },
    { label: { es: "Instalable", en: "Installable" }, value: "PWA" },
  ],
  stack: [
    "Next.js 16", "TypeScript", "Tailwind", "Framer Motion", "Spline 3D",
    "RapidAPI", "PWA", "Vercel",
  ],
  screenshots: [
    { src: "/work/devloaders/desktop.webp", device: "desktop", alt: { es: "Portada de DevLoaders", en: "DevLoaders landing page" } },
    { src: "/work/devloaders/mobile.webp", device: "mobile", alt: { es: "DevLoaders en el teléfono", en: "DevLoaders on a phone" } },
  ],
};
