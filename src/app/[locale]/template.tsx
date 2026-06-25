"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion/easings";
import { usePrefersReducedMotion } from "@/lib/motion/reduced";

/**
 * Re-mounts on each navigation → gives every route a quick, subtle entrance.
 * Kept short (occasional action, so it can animate — but never sluggish).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: EASE.out }}
    >
      {children}
    </motion.div>
  );
}
