import { describe, expect, test } from "vitest";
import { resolveBilingual } from "./resolve";

describe("resolveBilingual", () => {
  test("picks the locale field of a bilingual value", () => {
    expect(resolveBilingual({ es: "Hola", en: "Hi" }, "en")).toBe("Hi");
    expect(resolveBilingual({ es: "Hola", en: "Hi" }, "es")).toBe("Hola");
  });

  test("passes through a plain (non-bilingual) value", () => {
    expect(resolveBilingual("x", "es")).toBe("x");
    expect(resolveBilingual(42 as unknown as string, "en")).toBe(42);
  });

  test("works with array payloads", () => {
    const v = { es: ["a"], en: ["b"] };
    expect(resolveBilingual(v, "en")).toEqual(["b"]);
  });
});
