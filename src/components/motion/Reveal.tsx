"use client";

import { motion } from "framer-motion";
import { EASE, DURATION } from "@/lib/motion/easings";
import { usePrefersReducedMotion } from "@/lib/motion/reduced";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

/** Fade + translate into view. No transform under reduced-motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
}: RevealProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: DURATION.base, ease: EASE.out, delay }}
    >
      {children}
    </motion.div>
  );
}
