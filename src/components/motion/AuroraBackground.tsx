"use client";

/**
 * Fixed, behind-everything atmosphere: slow-drifting blurred gradient blobs,
 * a faint technical grid and a grain overlay. Perpetual but calm.
 * The drift is pure CSS animation (cheap, GPU-friendly) and is paused by the
 * global `prefers-reduced-motion` rule in globals.css.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      {/* drifting aurora blobs */}
      <div className="absolute -left-[15%] -top-[20%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.22),transparent_62%)] blur-3xl animate-aurora-drift" />
      <div
        className="absolute right-[-20%] top-[10%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.16),transparent_62%)] blur-3xl animate-aurora-drift"
        style={{ animationDelay: "-7s", animationDuration: "28s" }}
      />
      <div
        className="absolute bottom-[-25%] left-[20%] h-[48vmax] w-[48vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(201,242,78,0.10),transparent_62%)] blur-3xl animate-aurora-drift"
        style={{ animationDelay: "-14s", animationDuration: "32s" }}
      />

      {/* technical grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--text) 1px, transparent 1px), linear-gradient(to bottom, var(--text) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55))]" />
    </div>
  );
}
