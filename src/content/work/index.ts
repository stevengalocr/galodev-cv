import type { Project, ProjectSlug } from "./types";
import { seltter } from "./seltter";
import { datfud } from "./datfud";
import { bilbildin } from "./bilbildin";
import { coindev } from "./coindev";
import { tuanis3d } from "./tuanis3d";
import { devloaders } from "./devloaders";

/** Ordered strongest-first — drives home map order and case-study next links. */
export const PROJECTS: Project[] = [seltter, datfud, bilbildin, tuanis3d, coindev, devloaders];

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

/** First capture for a device, if the project has one. */
export function getShot(project: Project, device: "desktop" | "mobile") {
  return project.screenshots.find((s) => s.device === device);
}

/** Small brand icon of the product (taken from its live site). */
export function getIcon(project: Project): string {
  return `/work/${project.slug}/icon.png`;
}
