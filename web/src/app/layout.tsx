import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";
import Analytics from "@/components/Analytics";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ascep.org"),
  title: "ASCEP - Asociacion de Egresados del Sistema de Proteccion Estatal",
  description:
    "Somos un grupo de personas egresadas del Sistema de Proteccion Estatal de Colombia que, a partir de nuestra propia experiencia, nos hemos unido para contribuir a la transformacion y mejora de la forma en que el Estado aborda el cuidado, la proteccion y restablecimiento de derechos de ninos, ninas, adolescentes y jovenes en el pais.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "ASCEP",
    title: "ASCEP - Asociacion de Egresados del Sistema de Proteccion Estatal",
    description:
      "Somos un grupo de personas egresadas del Sistema de Proteccion Estatal de Colombia que trabajamos para transformar la vida de jovenes en el sistema de proteccion.",
    images: [
      {
        url: "/logos/03%20logo%20ascep%20principal%20horizontal.png",
        width: 1200,
        height: 630,
        alt: "ASCEP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASCEP - Asociacion de Egresados del Sistema de Proteccion Estatal",
    description:
      "Somos un grupo de personas egresadas del Sistema de Proteccion Estatal de Colombia que trabajamos para transformar la vida de jovenes en el sistema de proteccion.",
    images: ["/logos/03%20logo%20ascep%20principal%20horizontal.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${inter.variable} h-full antialiased overflow-x-hidden`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#019E9F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ASCEP" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ASCEP",
              alternateName: "Asociación de Egresados del Sistema de Protección Estatal",
              url: "https://ascep.org",
              logo: "https://ascep.org/logos/03%20logo%20ascep%20principal%20horizontal.png",
              description: "Somos un grupo de personas egresadas del Sistema de Protección Estatal de Colombia que trabajamos para transformar la vida de jóvenes en el sistema de protección.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Cali",
                addressCountry: "CO",
              },
              sameAs: [
                "https://www.instagram.com/ascepasociacion/",
                "https://www.facebook.com/ASCEPAsociacion/",
                "https://wa.me/573025550107",
              ],
            }),
          }}
        />
        <Analytics />
      </head>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
