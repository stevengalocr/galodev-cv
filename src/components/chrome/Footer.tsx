import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/dictionaries";
import { CONTACT } from "@/lib/site";

export function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto flex max-w-page flex-col gap-8 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-mono text-sm">
            <span className="font-semibold">galodev</span>
            <span className="text-faint">/steven</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-faint">{dict.footer.built}</p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${CONTACT.email}`}
              aria-label="Email"
              className="rounded-full border border-border p-2.5 text-muted transition-colors hover:border-accent/50 hover:text-text"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-full border border-border p-2.5 text-muted transition-colors hover:border-accent/50 hover:text-text"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-border p-2.5 text-muted transition-colors hover:border-accent/50 hover:text-text active:scale-95"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
          <p className="font-mono text-xs text-faint">
            © {new Date().getFullYear()} Steven · GaloDev.{" "}
            <Link href={`/${locale}/contact`} className="hover:text-muted">
              {dict.nav.contact}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
