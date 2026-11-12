"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePrefersReducedMotion } from "@/lib/motion/reduced";

interface Star {
  x: number;
  y: number;
  r: number;
  layer: number; // 0 = far (slow), 1 = near (faster)
  phase: number; // twinkle offset
  speed: number; // twinkle speed
  tint: string;
}

/** Mostly white, with a few cool and warm stars so the sky is not flat grey. */
const TINTS = ["#ecedf2", "#ecedf2", "#ecedf2", "#ecedf2", "#a9c1ff", "#9fe3ee", "#ffd9a0"];

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
  const nebulaRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  // Rendered straight into <body>: the page template animates with a transform,
  // and a transformed ancestor would turn `position: fixed` into page-tall absolute.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
        tint: TINTS[Math.floor(Math.random() * TINTS.length)],
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
      // the lights span taller than the screen and slide with page progress,
      // so the colour of the sky changes as you travel down the page
      if (nebulaRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        nebulaRef.current.style.transform = `translate3d(0, ${-progress * 44}%, 0)`;
      }

      for (const s of stars) {
        const parallax = s.layer === 1 ? scrollDrift * 1.6 : scrollDrift * 0.6;
        const y = (s.y * h - parallax * dpr + h) % h;
        const twinkle = reduced ? 0.75 : 0.55 + 0.45 * Math.sin(s.phase + (t / 1000) * s.speed);
        ctx.globalAlpha = twinkle * (s.layer === 1 ? 0.9 : 0.55);
        ctx.fillStyle = s.tint;
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
  }, [reduced, mounted]);

  if (!mounted) return null;

  return createPortal(
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      {/* deep-space base: a cool gradient instead of a flat grey */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0c1a_0%,#08090f_45%,#0a0a14_100%)]" />

      {/* nebula lights: soft gradients (no blur filter), drifting on transform only */}
      <div ref={nebulaRef} className="absolute inset-x-0 top-0 h-[180%] will-change-transform">
        <div className="absolute left-[-18%] top-[-8%] h-[75vmax] w-[75vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(79,93,255,0.30),rgba(79,93,255,0.09)_42%,transparent_68%)] motion-safe:[animation:nebula-a_34s_ease-in-out_infinite]" />
        <div className="absolute right-[-6%] top-[-12%] h-[38vmax] w-[38vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(232,180,90,0.13),transparent_66%)] motion-safe:[animation:nebula-b_29s_ease-in-out_infinite]" />
        <div className="absolute right-[-16%] top-[24%] h-[66vmax] w-[66vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,184,207,0.20),rgba(34,184,207,0.06)_44%,transparent_68%)] motion-safe:[animation:nebula-b_41s_ease-in-out_infinite]" />
        <div className="absolute left-[-12%] top-[48%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.24),rgba(139,92,246,0.07)_44%,transparent_68%)] motion-safe:[animation:nebula-a_47s_ease-in-out_infinite_reverse]" />
        <div className="absolute right-[-10%] top-[70%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(240,180,90,0.14),rgba(240,180,90,0.04)_44%,transparent_68%)] motion-safe:[animation:nebula-b_37s_ease-in-out_infinite_reverse]" />
        <div className="absolute left-[18%] top-[84%] h-[52vmax] w-[52vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(79,93,255,0.22),transparent_66%)] motion-safe:[animation:nebula-a_31s_ease-in-out_infinite]" />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* fine grain keeps the gradients from banding */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.5))]" />
    </div>,
    document.body,
  );
}
