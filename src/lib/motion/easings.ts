/** Shared easing + duration tokens. Tuned for a calm, expensive feel. */
export const EASE = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
  spring: { type: "spring", stiffness: 120, damping: 18, mass: 0.9 } as const,
  softSpring: { type: "spring", stiffness: 60, damping: 16 } as const,
};

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  ambient: 22,
};
