"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { assetPath } from "@/lib/asset-path";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const t = useTranslations("nav");
  const f = useTranslations("footer");
  const locale = useLocale();
  const pathname = usePathname();
  const currentPath = pathname.replace(/^\/(es|en|pt)/, "") || "/";

  return (
    <footer className="bg-brand-blue-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src={assetPath("/logos/12 logo ascep blanco sin slogan.png")}
              alt="ASCEP"
              width={160}
              height={50}
              className="mb-4 h-12 w-auto"
            />
            <p className="text-sm leading-relaxed text-white">
              {f("desc")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white">
              {f("navegacion")}
            </h3>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {([
                { key: "quienesSomos", href: "/quienes-somos" },
                { key: "programas", href: "/programas" },
                { key: "impacto", href: "/impacto" },
                { key: "comoLoHacemos", href: "/como-lo-hacemos" },
                { key: "contacto", href: "/contacto" },
              ] as const).map(({ key, href }) => (
                <Link
                  key={key}
                  href={`/${locale}${href}`}
                  className="text-sm text-white transition-colors hover:text-white/70"
                >
                  {t(key)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white">
              {f("contacto")}
            </h3>
            <ul className="space-y-2 text-sm text-white">
              <li>{f("ubicacion")}</li>
              <li>
                <a href={`mailto:${f("email")}`} className="transition-colors hover:text-white/70">
                  {f("email")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white">
              {f("newsletter")}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-white">
              {f("newsletterDesc")}
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-6 text-xs text-white/80 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <span>&copy; {new Date().getFullYear()} ASCEP. {f("copyright")}</span>
          <div className="flex gap-3">
            <Link href={`/es${currentPath}`} className={`transition-colors ${locale === "es" ? "font-bold text-white" : "hover:text-white"}`}>ES</Link>
            <span className="text-white/20">|</span>
            <Link href={`/en${currentPath}`} className={`transition-colors ${locale === "en" ? "font-bold text-white" : "hover:text-white"}`}>EN</Link>
            <span className="text-white/20">|</span>
            <Link href={`/pt${currentPath}`} className={`transition-colors ${locale === "pt" ? "font-bold text-white" : "hover:text-white"}`}>PT</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
