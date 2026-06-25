"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/motion/reduced";

interface ScrollSceneProps {
  children: React.ReactNode;
  className?: string;
  /** Pin the scene while scrubbing through it. */
  pin?: boolean;
  /** Scroll distance (e.g. "+=120%") the scene spans while pinned. */
  end?: string;
  /** Called with progress 0→1 as the scene scrubs. */
  onProgress?: (progress: number) => void;
  /** Disable the pinned/scrub behavior below this width (mobile-first). */
  pinMinWidth?: number;
}

/**
 * A GSAP ScrollTrigger wrapper. On desktop it can pin + scrub; on mobile (or
 * reduced-motion) it renders statically and still reports progress via a plain
 * in-view trigger so child reveals work without jank.
 */
export function ScrollScene({
  children,
  className,
  pin = false,
  end = "+=120%",
  onProgress,
  pinMinWidth = 768,
}: ScrollSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      onProgress?.(1);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const canPin = pin && window.innerWidth >= pinMinWidth;

    const st = ScrollTrigger.create({
      trigger: el,
      start: canPin ? "top top" : "top 80%",
      end: canPin ? end : "bottom 20%",
      pin: canPin,
      scrub: canPin ? 1 : false,
      onUpdate: (self) => onProgress?.(self.progress),
      onEnter: () => !canPin && onProgress?.(1),
    });

    return () => st.kill();
  }, [reduced, pin, end, onProgress, pinMinWidth]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
