import { describe, expect, test } from "vitest";
import { EASE, DURATION } from "./easings";

describe("motion tokens", () => {
  test("EASE.out is a 4-number cubic bezier", () => {
    expect(EASE.out).toHaveLength(4);
    EASE.out.forEach((n) => expect(typeof n).toBe("number"));
  });

  test("DURATION.base is a positive number", () => {
    expect(DURATION.base).toBeGreaterThan(0);
  });
});
