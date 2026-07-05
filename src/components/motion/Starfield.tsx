"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion/reduced";

interface Star {
  x: number;
  y: number;
  r: number;
  layer: number; // 0 = far (slow), 1 = near (faster)
  phase: number; // twinkle offset
  speed: number; // twinkle speed
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 1 → 0
}

/**
 * Deep-space backdrop for the home: two parallax layers of twinkling stars on a
 * 2D canvas plus an occasional shooting star. Cheap by construction — capped
 * star count (fewer on mobile), rAF paused when the tab is hidden, and a single
 * static frame under reduced-motion.
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let stars: Star[] = [];
    let meteor: Meteor | null = null;
    let nextMeteorAt = performance.now() + 4000 + Math.random() * 6000;
    let scrollDrift = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seed = () => {
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 70 : 140;
      stars = Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: 0.4 + Math.random() * 1.1,
        layer: Math.random() < 0.35 ? 1 : 0,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.9,
      }));
    };

    const resize = () => {
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      seed();
    };

    const paint = (t: number) => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      scrollDrift = window.scrollY * 0.02;

      for (const s of stars) {
        const parallax = s.layer === 1 ? scrollDrift * 1.6 : scrollDrift * 0.6;
        const y = (s.y * h - parallax * dpr + h) % h;
        const twinkle = reduced ? 0.75 : 0.55 + 0.45 * Math.sin(s.phase + (t / 1000) * s.speed);
        ctx.globalAlpha = twinkle * (s.layer === 1 ? 0.9 : 0.55);
        ctx.fillStyle = "#ecedf2";
        ctx.beginPath();
        ctx.arc(s.x * w, y, s.r * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      // shooting star
      if (!reduced) {
        if (!meteor && t > nextMeteorAt) {
          meteor = {
            x: Math.random() * 0.7 * w,
            y: Math.random() * 0.35 * h,
            vx: (6 + Math.random() * 5) * dpr,
            vy: (2.5 + Math.random() * 2) * dpr,
            life: 1,
          };
          nextMeteorAt = t + 7000 + Math.random() * 9000;
        }
        if (meteor) {
          meteor.x += meteor.vx;
          meteor.y += meteor.vy;
          meteor.life -= 0.02;
          if (meteor.life <= 0 || meteor.x > w || meteor.y > h) {
            meteor = null;
          } else {
            const grad = ctx.createLinearGradient(
              meteor.x - meteor.vx * 9,
              meteor.y - meteor.vy * 9,
              meteor.x,
              meteor.y,
            );
            grad.addColorStop(0, "rgba(236,237,242,0)");
            grad.addColorStop(1, `rgba(236,237,242,${0.7 * meteor.life})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.2 * dpr;
            ctx.beginPath();
            ctx.moveTo(meteor.x - meteor.vx * 9, meteor.y - meteor.vy * 9);
            ctx.lineTo(meteor.x, meteor.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      if (!document.hidden) paint(t);
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      paint(0); // single static frame
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-bg">
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* soft nebula tint + vignette to keep depth */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_10%,color-mix(in_srgb,var(--accent)_5%,transparent),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.6))]" />
    </div>
  );
}
