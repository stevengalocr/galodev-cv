"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { usePrefersReducedMotion } from "@/lib/motion/reduced";

const COSTA_RICA: [number, number] = [9.93, -84.08];

/** "From Costa Rica to the world": arcs shipping software outward. */
const GOLD: [number, number, number] = [1, 0.76, 0.32];
const CYAN: [number, number, number] = [0.35, 0.85, 1];

/** "From Costa Rica to the world": arcs shipping software outward. */
const ARCS: { to: [number, number]; color: [number, number, number] }[] = [
  { to: [40.71, -74.0], color: GOLD }, // New York
  { to: [19.43, -99.13], color: CYAN }, // Mexico City
  { to: [4.71, -74.07], color: CYAN }, // Bogotá
  { to: [-23.55, -46.63], color: GOLD }, // São Paulo
  { to: [40.42, -3.7], color: CYAN }, // Madrid
  { to: [51.51, -0.13], color: GOLD }, // London
  { to: [35.68, 139.69], color: CYAN }, // Tokyo
];

/**
 * Interactive dotted 3D Earth (cobe v2, ~5 kB WebGL). Auto-rotates, can be
 * dragged ("walk the world") with inertia, pulses a marker on Costa Rica and
 * ships golden arcs from it to the world. Under reduced-motion it doesn't
 * spin on its own but stays draggable.
 */
export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  const pointerStart = useRef<number | null>(null);
  const dragOffset = useRef(0);
  const dragVelocity = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 0.9; // Americas facing front
    let width = canvas.offsetWidth;
    let raf = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi,
      theta: 0.22,
      dark: 1,
      diffuse: 1.5,
      mapSamples: 18000,
      mapBrightness: 7,
      // brand sky: indigo oceans, lit continents, a blue atmosphere
      baseColor: [0.36, 0.5, 1],
      markerColor: GOLD,
      glowColor: [0.16, 0.24, 0.72],
      markers: [{ location: COSTA_RICA, size: 0.1 }],
      arcs: ARCS.map((a) => ({ from: COSTA_RICA, to: a.to, color: a.color })),
      arcWidth: 0.5,
      arcHeight: 0.42,
    });

    const onResize = () => {
      width = canvas.offsetWidth;
      globe.update({ width: width * 2, height: width * 2 });
    };
    window.addEventListener("resize", onResize);

    const loop = () => {
      if (!document.hidden) {
        if (pointerStart.current === null && Math.abs(dragVelocity.current) > 0.0001) {
          dragOffset.current += dragVelocity.current;
          dragVelocity.current *= 0.94; // inertia decay
        }
        if (!reduced && pointerStart.current === null) {
          phi += 0.0032; // calm self-rotation
        }
        globe.update({ phi: phi + dragOffset.current });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const fade = setTimeout(() => {
      canvas.style.opacity = "1";
    }, 60);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fade);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  // pointer drag → rotate ("walk the earth")
  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerStart.current = e.clientX - dragOffset.current * 200;
    dragVelocity.current = 0;
    canvasRef.current?.setPointerCapture(e.pointerId);
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
  };
  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (pointerStart.current === null) return;
    const next = (e.clientX - pointerStart.current) / 200;
    dragVelocity.current = next - dragOffset.current;
    dragOffset.current = next;
  };
  const endDrag = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerStart.current = null;
    canvasRef.current?.releasePointerCapture(e.pointerId);
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      aria-label="Planeta Tierra 3D interactivo con marcador en Costa Rica"
      className={className}
      style={{
        width: "100%",
        height: "100%",
        cursor: "grab",
        contain: "layout paint size",
        opacity: 0,
        transition: "opacity 1s ease",
        touchAction: "pan-y",
      }}
    />
  );
}
