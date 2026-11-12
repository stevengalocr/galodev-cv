import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import { PROJECTS, PROJECT_SLUGS, getProject, getNextProject } from "./index";

const KNOWN = ["datfud", "seltter", "bilbildin", "tuanis3d", "coindev", "devloaders"];

describe("project content", () => {
  test("exposes the six known projects", () => {
    expect([...PROJECT_SLUGS].sort()).toEqual([...KNOWN].sort());
  });

  test("each project is well-formed", () => {
    for (const p of PROJECTS) {
      expect(p.liveUrl).toMatch(/^https?:\/\//);
      expect(p.accent).toMatch(/^#[0-9a-f]{6}$/i);
      expect(p.challenges.length).toBeGreaterThan(0);
      expect(p.screenshots.length).toBeGreaterThan(0);
      expect(p.stack.length).toBeGreaterThan(0);
      expect(p.tagline.es).toBeTruthy();
      expect(p.tagline.en).toBeTruthy();
      expect(p.summary.es).toBeTruthy();
      expect(p.summary.en).toBeTruthy();
      expect(p.highlights).toHaveLength(3);
      expect(p.screenshots.some((s) => s.device === "desktop")).toBe(true);
      expect(p.screenshots.some((s) => s.device === "mobile")).toBe(true);
    }
  });

  test("every capture and icon exists on disk", () => {
    for (const p of PROJECTS) {
      for (const s of p.screenshots) {
        expect(existsSync(join(process.cwd(), "public", s.src)), s.src).toBe(true);
      }
      expect(existsSync(join(process.cwd(), "public", "work", p.slug, "icon.png")), p.slug).toBe(true);
    }
  });

  test("getProject resolves known and rejects unknown", () => {
    expect(getProject("seltter")?.name).toBe("Seltter");
    expect(getProject("nope")).toBeUndefined();
  });

  test("getNextProject wraps around", () => {
    expect(getNextProject("devloaders").slug).toBe(PROJECTS[0].slug);
  });
});
