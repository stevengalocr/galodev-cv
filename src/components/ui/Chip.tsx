import { cn } from "@/lib/utils/cn";

/** Mono pill used for stack tokens and small labels. */
export function Chip({
  children,
  className,
  accent = false,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs tracking-tight",
        accent
          ? "border-accent/40 text-accent bg-[color-mix(in_srgb,var(--accent)_8%,transparent)]"
          : "border-border text-muted bg-surface/60",
        className,
      )}
    >
      {children}
    </span>
  );
}
