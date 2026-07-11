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
    <html lang="es" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
