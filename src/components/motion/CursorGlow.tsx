"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion/reduced";

/**
 * A soft glow that trails the pointer with spring momentum — the "alive" feel
 * of the Living Blueprint. Desktop pointers only; inert on touch / reduced-motion.
 */
export function CursorGlow() {
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 90, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 90, damping: 20, mass: 0.6 });
  // Full transform string → stays smooth under main-thread load.
  const transform = useTransform([sx, sy], ([lx, ly]) =>
    `translate3d(${(lx as number) - 300}px, ${(ly as number) - 300}px, 0)`,
  );

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{ transform }}
      className="pointer-events-none fixed left-0 top-0 -z-[5] hidden h-[600px] w-[600px] rounded-full opacity-60 mix-blend-screen blur-2xl [@media(hover:hover)]:block"
    >
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_60%)]" />
    </motion.div>
  );
}
