import { cn } from "@/lib/utils/cn";

/** Surface panel with optional accent glow on hover. */
export function Card({
  children,
  className,
  glow = false,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  as?: React.ElementType;
}) {
  return (
    <Tag
      className={cn(
        "relative rounded-2xl border border-border bg-surface/70 backdrop-blur-sm transition-all duration-500",
        glow && "hover:border-accent/50 hover:glow",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
