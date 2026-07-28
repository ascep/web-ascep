import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import VisitorWidget from "@/components/VisitorWidget";
import MobileTabBar from "@/components/MobileTabBar";
import ScrollProgress from "@/components/ScrollProgress";
import { getFotos } from "@/lib/get-fotos";

const locales = ["es", "pt"];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const fotos = await getFotos();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <ScrollProgress />
        <TopBar />
        <Header leyEgresoCard={fotos.header.leyEgresoCard} comoAyudarCard={fotos.header.comoAyudarCard} />
        <main className="flex-1 pb-24 md:pb-0">{children}</main>
        <MobileTabBar />
        <Footer />
        <VisitorWidget />
        <WhatsAppButton />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
