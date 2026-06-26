import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Hero } from "@/components/sections/home/Hero";
import { StackStrip } from "@/components/sections/home/StackStrip";
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
      <Hero locale={locale} dict={dict} />
      <StackStrip dict={dict} />
      <ProductBands locale={locale} dict={dict} />
      <AboutTeaser locale={locale} dict={dict} />
      <ContactCTA locale={locale} dict={dict} />
    </>
  );
}
