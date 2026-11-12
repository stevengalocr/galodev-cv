import type { Bilingual } from "@/lib/i18n/config";
import type { ProjectSlug } from "./work/types";

export type BuildKind = "product" | "store" | "client" | "app" | "portfolio" | "learning";

export interface BuildEntry {
  /** YYYY-MM the repository was created on GitHub. */
  date: string;
  name: string;
  what: Bilingual;
  tech: string;
  kind: BuildKind;
  /** Set when the entry is one of the six products: links to its case study. */
  product?: ProjectSlug;
}

export const BUILD_KIND_LABEL: Record<BuildKind, Bilingual> = {
  product: { es: "Producto", en: "Product" },
  store: { es: "Tienda", en: "Store" },
  client: { es: "Cliente", en: "Client" },
  app: { es: "App", en: "App" },
  portfolio: { es: "Portafolio", en: "Portfolio" },
  learning: { es: "Aprendizaje", en: "Learning" },
};

/** Dot colour per kind; products use their own brand accent instead. */
export const BUILD_KIND_TONE: Record<BuildKind, string> = {
  product: "#f0b45a",
  store: "#5ed3a6",
  client: "#45c4d6",
  app: "#5fa8ff",
  portfolio: "#b18cff",
  learning: "#7d86a8",
};

/**
 * What I have built, newest first. Source: my GitHub repositories (creation
 * date of each one). Betting side projects and empty repos are left out.
 */
export const BUILD_LOG: BuildEntry[] = [
  { date: "2026-11", name: "GaloDev 4.0", what: { es: "Este portafolio.", en: "This portfolio." }, tech: "Next.js", kind: "portfolio" },
  { date: "2026-08", name: "Fyther Store", what: { es: "Tienda en producción sobre BilBildin.", en: "Store in production on BilBildin." }, tech: "Next.js", kind: "store" },
  { date: "2026-07", name: "VYVO", what: { es: "Tienda en producción sobre BilBildin.", en: "Store in production on BilBildin." }, tech: "Next.js", kind: "store" },
  { date: "2026-07", name: "Tuanis3D", what: { es: "Mi taller de impresión 3D: sitio, panel y biblioteca.", en: "My 3D-printing workshop: site, panel and library." }, tech: "Next.js", kind: "product", product: "tuanis3d" },
  { date: "2026-06", name: "El Closet de Wendy", what: { es: "Nueva versión de la tienda.", en: "New version of the store." }, tech: "JavaScript", kind: "client" },
  { date: "2026-06", name: "DataFud", what: { es: "Menú digital con QR y NFC para restaurantes.", en: "QR and NFC digital menu for restaurants." }, tech: "Next.js", kind: "product", product: "datfud" },
  { date: "2026-05", name: "Lotus Beauty CR", what: { es: "Tienda en línea para una clienta.", en: "Online store for a client." }, tech: "JavaScript", kind: "client" },
  { date: "2026-05", name: "AprenDev", what: { es: "App para aprender a programar.", en: "An app to learn programming." }, tech: "JavaScript", kind: "app" },
  { date: "2026-05", name: "DevLoaders", what: { es: "Descargador de Reels y TikToks.", en: "Reels and TikTok downloader." }, tech: "Next.js", kind: "product", product: "devloaders" },
  { date: "2026-05", name: "CoinDev", what: { es: "Finanzas personales multimoneda.", en: "Multi-currency personal finance." }, tech: "Next.js", kind: "product", product: "coindev" },
  { date: "2026-05", name: "GaloDev 3.0", what: { es: "Portafolio con blog.", en: "Portfolio with a blog." }, tech: "Next.js", kind: "portfolio" },
  { date: "2026-05", name: "BilBildin", what: { es: "Tiendas en línea con panel de ganancia real.", en: "Online stores with a real-profit panel." }, tech: "Next.js", kind: "product", product: "bilbildin" },
  { date: "2026-04", name: "Seltter", what: { es: "Tarjetas de fidelización en Wallet.", en: "Loyalty cards in Wallet." }, tech: "Next.js", kind: "product", product: "seltter" },
  { date: "2026-02", name: "Sitio de una propiedad", what: { es: "Página para vender una finca, para un cliente.", en: "A site to sell a farm, for a client." }, tech: "TypeScript", kind: "client" },
  { date: "2026-02", name: "HabiDev", what: { es: "App nativa de hábitos para iOS.", en: "Native habits app for iOS." }, tech: "Swift", kind: "app" },
  { date: "2026-01", name: "GaloDev 2.0", what: { es: "Segunda versión del portafolio.", en: "Second version of the portfolio." }, tech: "TypeScript", kind: "portfolio" },
  { date: "2026-01", name: "CoreStore", what: { es: "SaaS de tiendas virtuales para emprendedores.", en: "Online-store SaaS for small businesses." }, tech: "TypeScript", kind: "product" },
  { date: "2025-07", name: "Moody App", what: { es: "Seguimiento del estado emocional, mobile-first.", en: "Mood tracking, mobile-first." }, tech: "Angular", kind: "app" },
  { date: "2025-01", name: "WeGotAll Store", what: { es: "Tienda de sneakers con componentes standalone.", en: "Sneaker store with standalone components." }, tech: "Angular", kind: "store" },
  { date: "2023-05", name: "GaloDev CR", what: { es: "Primer sitio de la marca GaloDev.", en: "First site of the GaloDev brand." }, tech: "HTML", kind: "portfolio" },
  { date: "2022-11", name: "El Closet de Wendy", what: { es: "Mi primera página para una clienta.", en: "My first site for a client." }, tech: "CSS", kind: "client" },
  { date: "2022-11", name: "E-commerce en Node.js", what: { es: "Tienda con servidor y plantillas EJS.", en: "Store with a server and EJS templates." }, tech: "Node.js", kind: "learning" },
  { date: "2022-11", name: "Proyectos HTML y CSS", what: { es: "Los primeros proyectos, con JavaScript puro.", en: "The first projects, in plain JavaScript." }, tech: "HTML", kind: "learning" },
];

/** Entries grouped by year, newest year first, keeping the list order inside. */
export function buildLogByYear(): { year: string; entries: BuildEntry[] }[] {
  const groups = new Map<string, BuildEntry[]>();
  for (const e of BUILD_LOG) {
    const year = e.date.slice(0, 4);
    groups.set(year, [...(groups.get(year) ?? []), e]);
  }
  return [...groups.entries()].map(([year, entries]) => ({ year, entries }));
}
