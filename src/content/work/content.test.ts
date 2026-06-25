import { describe, expect, test } from "vitest";
import { PROJECTS, PROJECT_SLUGS, getProject, getNextProject } from "./index";

const KNOWN = ["datfud", "seltter", "bilbildin", "coindev"];

describe("project content", () => {
  test("exposes the four known projects", () => {
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
    }
  });

  test("getProject resolves known and rejects unknown", () => {
    expect(getProject("seltter")?.name).toBe("Seltter");
    expect(getProject("nope")).toBeUndefined();
  });

  test("getNextProject wraps around", () => {
    expect(getNextProject("coindev").slug).toBe(PROJECTS[0].slug);
  });
});
