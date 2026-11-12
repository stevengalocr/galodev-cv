import Image from "next/image";
import { cn } from "@/lib/utils/cn";

/**
 * Frames for real captures of the live products. The captures are 16:10
 * (desktop, 1440×900) and 390×844 (mobile), so both frames reserve their box
 * and never shift layout while the image loads.
 */

/** "seltter.com" from "https://seltter.com/". */
export function hostOf(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function BrowserFrame({
  src,
  alt,
  url,
  className,
  sizes = "(min-width: 1024px) 55vw, 92vw",
  priority = false,
}: {
  src: string;
  alt: string;
  url: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-[#0c0d14] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] sm:rounded-2xl",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-3 py-2 sm:px-4 sm:py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <i className="h-2 w-2 rounded-full bg-white/15 sm:h-2.5 sm:w-2.5" />
          <i className="h-2 w-2 rounded-full bg-white/15 sm:h-2.5 sm:w-2.5" />
          <i className="h-2 w-2 rounded-full bg-white/15 sm:h-2.5 sm:w-2.5" />
        </span>
        <span className="flex min-w-0 flex-1 items-center justify-center">
          <span className="flex max-w-full items-center gap-1.5 truncate rounded-full bg-white/[0.05] px-3 py-0.5 font-mono text-[0.6rem] text-muted sm:text-[0.68rem]">
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span className="truncate">{hostOf(url)}</span>
          </span>
        </span>
        <span aria-hidden className="w-8 sm:w-10" />
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    </div>
  );
}

export function PhoneFrame({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 12vw, 28vw",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.4rem] border-[5px] border-[#15161f] bg-[#15161f] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.95)] ring-1 ring-white/10 sm:rounded-[1.9rem] sm:border-[6px]",
        className,
      )}
    >
      <div className="relative aspect-[390/844] overflow-hidden rounded-[1rem] sm:rounded-[1.45rem]">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
      </div>
    </div>
  );
}
