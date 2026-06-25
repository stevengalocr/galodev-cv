import { notFound } from "next/navigation";
import { locales, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { AuroraBackground } from "@/components/motion/AuroraBackground";
import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <SmoothScroll>
      <AuroraBackground />
      <Nav locale={locale} dict={dict} />
      <main id="content" className="relative">
        {children}
      </main>
      <Footer locale={locale} dict={dict} />
    </SmoothScroll>
  );
}
