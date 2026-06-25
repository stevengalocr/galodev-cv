import type { Bilingual } from "@/lib/i18n/config";

export type ProjectSlug = "datfud" | "seltter" | "bilbildin" | "coindev";

export interface EngineeringChallenge {
  /** Short label, often technical. */
  title: Bilingual;
  /** 1–3 sentences explaining the problem and how it was solved. */
  body: Bilingual;
}

export interface Metric {
  label: Bilingual;
  value: string;
}

export interface Screenshot {
  /** Path under /public, e.g. /screenshots/seltter/dashboard.png — see ASSETS-TODO.md */
  src: string;
  alt: Bilingual;
  /** Optional caption shown under the image. */
  caption?: Bilingual;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  /** Short role description. */
  role: Bilingual;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
}

export interface Project {
  slug: ProjectSlug;
  name: string;
  /** One-line pitch. */
  tagline: Bilingual;
  /** Accent hex color used to tint the case study, e.g. "#C9A84C". */
  accent: string;
  /** e.g. "v1.0.1 · Producción" */
  status: Bilingual;
  /** Live demo URL — ASSET, fill from deployed product. */
  liveUrl: string;
  /** Short category line for cards, e.g. "SaaS multi-tenant · Menú digital". */
  kind: Bilingual;
  /** Year or range. */
  year: string;

  problem: Bilingual;
  solution: Bilingual[];
  architecture: {
    summary: Bilingual;
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
  };
  challenges: EngineeringChallenge[];
  security?: Bilingual[];
  metrics: Metric[];
  stack: string[];
  screenshots: Screenshot[];
}
