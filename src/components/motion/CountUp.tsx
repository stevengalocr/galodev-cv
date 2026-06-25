"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion/reduced";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  /** Text appended after the number, e.g. "h" or "%". */
  suffix?: string;
  className?: string;
}

/** Animates a number from `from`→`to` when in view. Instant under reduced-motion. */
export function CountUp({ to, from = 0, duration = 1.4, suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to, from, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
