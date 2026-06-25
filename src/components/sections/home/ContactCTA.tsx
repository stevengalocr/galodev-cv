import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/dictionaries";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function ContactCTA({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section className="relative px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-page">
        <Reveal>
          <p className="mono-label mb-6">{dict.home.contactLead}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-balance text-5xl font-semibold tracking-tighter sm:text-7xl md:text-8xl">
            {dict.home.contactTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={`/${locale}/contact`} variant="solid">
              {dict.cta.getInTouch}
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button href={`/${locale}/about`} variant="link">
              {dict.cta.downloadCv}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
