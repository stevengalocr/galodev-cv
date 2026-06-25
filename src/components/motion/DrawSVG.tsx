"use client";

import { motion } from "framer-motion";
import { EASE, DURATION } from "@/lib/motion/easings";
import { usePrefersReducedMotion } from "@/lib/motion/reduced";

interface DrawPathProps extends React.SVGProps<SVGPathElement> {
  delay?: number;
  duration?: number;
}

/** An SVG <path> that draws itself when scrolled into view. */
export function DrawPath({ delay = 0, duration = DURATION.slow, ...props }: DrawPathProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <path {...props} />;
  }

  return (
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ pathLength: { duration, ease: EASE.inOut, delay }, opacity: { duration: 0.2, delay } }}
      {...(props as React.ComponentProps<typeof motion.path>)}
    />
  );
}
