import type { Dict } from "@/lib/i18n/dictionaries";

const STACK = [
  "Next.js", "React 19", "TypeScript", "Supabase", "PostgreSQL", "RLS",
  "GSAP", "Framer Motion", "Tailwind", "Node.js", "Stripe", "Apple Wallet",
  "Google Wallet", "Zod", "Vercel", "Edge Functions",
];

/** Infinite marquee of stack tokens. Pauses on hover; static under reduced-motion. */
export function StackStrip({ dict }: { dict: Dict }) {
  const row = [...STACK, ...STACK];
  return (
    <section aria-label={dict.home.stackEyebrow} className="relative border-y border-border py-6">
      <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex shrink-0 items-center gap-3 pr-3 motion-safe:animate-marquee group-hover:[animation-play-state:paused]">
          {row.map((s, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-border bg-surface/50 px-4 py-1.5 font-mono text-xs text-muted"
            >
              {s}
            </span>
          ))}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 items-center gap-3 pr-3 motion-safe:animate-marquee group-hover:[animation-play-state:paused]"
        >
          {row.map((s, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-border bg-surface/50 px-4 py-1.5 font-mono text-xs text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
