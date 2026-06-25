import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[70svh] place-items-center px-5 text-center">
      <div>
        <p className="font-mono text-7xl font-semibold text-accent">404</p>
        <p className="mt-4 text-muted">Esta página no existe. / This page doesn&apos;t exist.</p>
        <Link
          href="/es"
          className="mt-8 inline-flex rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-faint"
        >
          ← Inicio / Home
        </Link>
      </div>
    </div>
  );
}
