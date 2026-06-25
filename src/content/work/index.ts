import type { Project, ProjectSlug } from "./types";
import { seltter } from "./seltter";
import { datfud } from "./datfud";
import { bilbildin } from "./bilbildin";
import { coindev } from "./coindev";

/** Ordered strongest-first — drives home map order and case-study next links. */
export const PROJECTS: Project[] = [seltter, datfud, bilbildin, coindev];

export const PROJECT_SLUGS: ProjectSlug[] = PROJECTS.map((p) => p.slug);

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** The project after `slug` (wraps around) — for case-study footer nav. */
export function getNextProject(slug: string): Project {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}

export type { Project, ProjectSlug };
