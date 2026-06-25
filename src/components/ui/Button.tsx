import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type Variant = "solid" | "ghost" | "link";

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

const styles: Record<Variant, string> = {
  solid:
    "bg-text text-bg hover:bg-white px-5 py-2.5 rounded-full font-medium shadow-[0_1px_0_rgba(255,255,255,0.2)_inset]",
  ghost:
    "border border-border hover:border-faint text-text px-5 py-2.5 rounded-full font-medium hover:bg-surface",
  link: "text-muted hover:text-text underline-offset-4 hover:underline",
};

const base =
  "inline-flex items-center justify-center gap-2 text-sm transition-[background-color,color,border-color,transform] duration-200 ease-out-strong active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function Button({
  variant = "solid",
  className,
  children,
  href,
  external,
  ...props
}: BaseProps &
  ({ href: string; external?: boolean } | { href?: undefined; external?: never }) &
  React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = cn(base, styles[variant], className);

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
