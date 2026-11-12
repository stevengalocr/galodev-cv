import Image from "next/image";
import { PERSON } from "@/lib/site";
import { cn } from "@/lib/utils/cn";

/**
 * Steven's portrait. Until the real photo is added (public/steven.jpg, then
 * set PERSON.hasPortrait in src/lib/site.ts) it renders a designed monogram,
 * so the page never shows an empty slot.
 */
export function Portrait({
  ratio = "1 / 1",
  className,
  sizes = "(min-width: 640px) 16rem, 10rem",
}: {
  ratio?: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      style={{ aspectRatio: ratio }}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c14]",
        className,
      )}
    >
      {PERSON.hasPortrait ? (
        <Image src={PERSON.portrait} alt="Steven Galo" fill sizes={sizes} className="object-cover" />
      ) : (
        <div role="img" aria-label="Steven Galo" className="absolute inset-0 grid place-items-center">
          <span
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 70% at 20% 10%, rgba(79,93,255,0.35), transparent 60%), radial-gradient(70% 70% at 90% 100%, rgba(240,180,90,0.22), transparent 60%)",
            }}
          />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[62%] w-[118%] -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-[50%] border border-white/15"
          />
          <span className="relative text-6xl sm:text-7xl font-semibold tracking-tighter text-text">
            SG
          </span>
        </div>
      )}
    </div>
  );
}
