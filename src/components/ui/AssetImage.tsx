import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * Image slot that renders a designed placeholder until the real asset exists.
 *
 * Assets are pending (see ASSETS-TODO.md). To go live: drop the real file at
 * `src` under /public and flip PLACEHOLDER_MODE to false (or replace this
 * component's body with a `next/image`). Keeping a single switch avoids broken
 * builds while the design is reviewed.
 */
const PLACEHOLDER_MODE = true;

export function AssetImage({
  src,
  alt,
  ratio = "16 / 10",
  className,
  rounded = "rounded-xl",
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  rounded?: string;
}) {
  if (PLACEHOLDER_MODE) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{ aspectRatio: ratio }}
        className={cn(
          "relative grid w-full place-items-center overflow-hidden border border-dashed border-border bg-surface/60",
          rounded,
          className,
        )}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--text) 1px, transparent 1px), linear-gradient(to bottom, var(--text) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative flex flex-col items-center gap-2 px-4 text-center">
          <ImageIcon className="h-6 w-6 text-faint" />
          <p className="text-sm text-muted">{alt}</p>
          <code className="font-mono text-[0.65rem] text-faint">{src}</code>
        </div>
      </div>
    );
  }

  // Real-asset path (enabled once files exist).
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      style={{ aspectRatio: ratio }}
      className={cn("w-full object-cover", rounded, className)}
    />
  );
}
