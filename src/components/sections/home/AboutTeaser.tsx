import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/dictionaries";
import { PERSON } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { AssetImage } from "@/components/ui/AssetImage";

const BIO = {
  es: "Soy Steven, ingeniero en sistemas con ~6 años construyendo software: freelance, enterprise (.NET, Go, Angular) y producto propio (Next.js, Supabase). GaloDev es la marca bajo la que diseño y envío.",
  en: "I'm Steven, a systems engineer with ~6 years building software: freelance, enterprise (.NET, Go, Angular) and my own products (Next.js, Supabase). GaloDev is the brand I design and ship under.",
};

export function AboutTeaser({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-page items-center gap-10 sm:grid-cols-[auto_1fr] sm:gap-14">
        <Reveal>
          <div className="h-40 w-40 sm:h-52 sm:w-52">
            <AssetImage
              src={PERSON.portrait}
              alt="Steven — retrato"
              ratio="1 / 1"
              rounded="rounded-2xl"
              className="h-full"
            />
          </div>
        </Reveal>

        <div>
          <p className="mono-label mb-4">{dict.home.aboutEyebrow}</p>
          <Reveal>
            <p className="max-w-prose text-balance text-2xl font-medium leading-snug sm:text-3xl">
              {BIO[locale]}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-7">
              <Button href={`/${locale}/about`} variant="ghost">
                {dict.nav.about}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
