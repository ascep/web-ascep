import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ASCEP - Asociacion de Egresados del Sistema de Proteccion Estatal",
  description:
    "Somos un grupo de personas egresadas del Sistema de Proteccion Estatal de Colombia que, a partir de nuestra propia experiencia, nos hemos unido para contribuir a la transformacion y mejora de la forma en que el Estado aborda el cuidado, la proteccion y restablecimiento de derechos de ninos, ninas, adolescentes y jovenes en el pais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased overflow-x-hidden`} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#019E9F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ASCEP" />
        <link rel="apple-touch-icon" href="/logos/10%20logo%20ascep%20horizontal%20azul.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ASCEP",
              alternateName: "Asociación de Egresados del Sistema de Protección Estatal",
              url: "https://ascep.org",
              logo: "https://ascep.org/logos/10%20logo%20ascep%20horizontal%20azul.png",
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
      </head>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
