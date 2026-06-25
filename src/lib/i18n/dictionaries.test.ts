import { describe, expect, test } from "vitest";
import { getDictionary } from "./dictionaries";

function keyPaths(obj: unknown, prefix = ""): string[] {
  if (typeof obj !== "object" || obj === null) return [prefix];
  return Object.entries(obj).flatMap(([k, v]) =>
    keyPaths(v, prefix ? `${prefix}.${k}` : k),
  );
}

describe("dictionaries", () => {
  test("es and en have identical key sets", () => {
    const esKeys = keyPaths(getDictionary("es")).sort();
    const enKeys = keyPaths(getDictionary("en")).sort();
    expect(enKeys).toEqual(esKeys);
  });

  test("resolves a known string", () => {
    expect(getDictionary("en").nav.about).toBe("About");
    expect(getDictionary("es").nav.about).toBe("Sobre mí");
  });
});
