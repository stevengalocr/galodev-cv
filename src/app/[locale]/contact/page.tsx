import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, Linkedin, Instagram } from "lucide-react";
import { locales, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { CONTACT } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/contact/ContactForm";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="px-5 pt-28 sm:px-8 sm:pt-36">
      <div className="mx-auto max-w-page pb-28">
        <p className="mono-label mb-4">{dict.contact.title}</p>
        <Reveal>
          <h1 className="text-balance text-5xl font-semibold tracking-tighter sm:text-7xl">
            {dict.home.contactTitle}
          </h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-5 max-w-prose text-pretty text-lg text-muted">{dict.contact.lead}</p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal delay={0.1}>
            <ContactForm dict={dict} />
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-4">
              <p className="mono-label">{dict.contact.or}</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex items-center gap-4 rounded-xl border border-border bg-surface/60 p-5 transition-colors hover:border-accent/50"
              >
                <Mail className="h-5 w-5 text-accent" />
                <span className="font-mono text-sm text-muted group-hover:text-text">{CONTACT.email}</span>
              </a>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-border bg-surface/60 p-5 transition-colors hover:border-accent/50"
              >
                <Linkedin className="h-5 w-5 text-accent" />
                <span className="font-mono text-sm text-muted group-hover:text-text">LinkedIn</span>
              </a>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-border bg-surface/60 p-5 transition-colors hover:border-accent/50"
              >
                <Instagram className="h-5 w-5 text-accent" />
                <span className="font-mono text-sm text-muted group-hover:text-text">@galodevcr</span>
              </a>
              <p className="font-mono text-xs text-faint">
                ASSET: configura RESEND_API_KEY para que el formulario envíe.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
