"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { assetPath } from "@/lib/asset-path";

export default function Footer() {
  const t = useTranslations("nav");
  const f = useTranslations("footer");
  const locale = useLocale();
  const pathname = usePathname();
  const currentPath = pathname.replace(/^\/(es|en|pt)/, "") || "/";

  return (
    <footer className="m-4 rounded-[10px] bg-brand-blue-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src={assetPath("/logos/12 logo ascep blanco sin slogan.png")}
              alt="ASCEP"
              width={160}
              height={50}
              className="mb-3 h-12 w-auto"
            />
            <p className="text-sm text-white/70">
              {f("desc")}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/90">
              {f("navegacion")}
            </h3>
            <ul className="space-y-2">
            {([
              "quienesSomos",
              "comoLoHacemos",
              "programas",
              "casasDelSaber",
              "leyEgreso",
              "comoAyudar",
              "impacto",
              "aliados",
              "contacto",
            ] as const).map((key) => {
              const hrefMap: Record<string, string> = {
                comoLoHacemos: "/como-lo-hacemos",
                casasDelSaber: "/casas-del-saber",
                leyEgreso: "/ley-de-egreso",
                comoAyudar: "/como-ayudar",
              };
              const href = hrefMap[key] ?? `/${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
              return (
                <li key={key}>
                  <Link
                    href={`/${locale}${href}`}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {t(key)}
                  </Link>
                </li>
              );
            })}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/90">
              {f("contacto")}
            </h3>
            <ul className="space-y-1 text-sm text-white/70">
              <li>{f("ubicacion")}</li>
              <li>{f("email")}</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/90">
              {f("idioma")}
            </h3>
            <div className="flex gap-2">
              <Link
                href={`/es${currentPath}`}
                className={`text-sm ${locale === "es" ? "font-bold text-white" : "text-white/70 hover:text-white"}`}
              >
                ES
              </Link>
              <span className="text-white/40">|</span>
              <Link
                href={`/en${currentPath}`}
                className={`text-sm ${locale === "en" ? "font-bold text-white" : "text-white/70 hover:text-white"}`}
              >
                EN
              </Link>
              <span className="text-white/40">|</span>
              <Link
                href={`/pt${currentPath}`}
                className={`text-sm ${locale === "pt" ? "font-bold text-white" : "text-white/70 hover:text-white"}`}
              >
                PT
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 h-px bg-white/20" />
        <div className="mt-6 text-center text-xs text-white/50">
          &copy; {new Date().getFullYear()} ASCEP. {f("copyright")}
        </div>
      </div>
    </footer>
  );
}
