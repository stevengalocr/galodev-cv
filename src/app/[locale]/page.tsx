import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Starfield } from "@/components/motion/Starfield";
import { HeroCosmos } from "@/components/sections/home/HeroCosmos";
import { SkillsConstellation } from "@/components/sections/home/SkillsConstellation";
import { ProductBands } from "@/components/sections/home/ProductBands";
import { AboutTeaser } from "@/components/sections/home/AboutTeaser";
import { ContactCTA } from "@/components/sections/home/ContactCTA";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      {/* Deep-space backdrop: paints over the layout aurora on the home only
          (same stacking layer, later in DOM, opaque base). */}
      <Starfield />
      <HeroCosmos locale={locale} dict={dict} />
      <SkillsConstellation locale={locale} dict={dict} />
      <ProductBands locale={locale} dict={dict} />
      <AboutTeaser locale={locale} dict={dict} />
      <ContactCTA locale={locale} dict={dict} />
    </>
  );
}
