import { cn } from "@/lib/utils/cn";
import { Reveal } from "@/components/motion/Reveal";

/** Eyebrow (mono) + large title, used to open sections. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <Reveal>
          <p className="mono-label mb-4 flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-accent" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-4 max-w-prose text-pretty text-base text-muted sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
