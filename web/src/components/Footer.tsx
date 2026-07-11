"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const currentPath = pathname.replace(/^\/(es|en|de)/, "") || "/";

  return (
    <footer className="border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] m-4 rounded-[10px]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/logos/06 logo ascep azul.png"
              alt="ASCEP"
              width={160}
              height={50}
              className="mb-3 h-12 w-auto"
            />
            <p className="text-sm text-[var(--color-text-secondary)]">
              Asociacion de Egresados del Sistema de Proteccion Estatal de
              Colombia.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Navegacion
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
              "transparencia",
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
                    className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-brand-purple"
                  >
                    {t(key)}
                  </Link>
                </li>
              );
            })}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Contacto
            </h3>
            <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
              <li>Cali, Colombia</li>
              <li>contacto@ascep.org</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Idioma
            </h3>
            <div className="flex gap-2">
              <Link
                href={`/es${currentPath}`}
                className={`text-sm ${locale === "es" ? "font-bold text-text-primary" : "text-[var(--color-text-secondary)] hover:text-brand-purple"}`}
              >
                ES
              </Link>
              <span className="text-[var(--color-text-muted)]">|</span>
              <Link
                href={`/en${currentPath}`}
                className={`text-sm ${locale === "en" ? "font-bold text-text-primary" : "text-[var(--color-text-secondary)] hover:text-brand-purple"}`}
              >
                EN
              </Link>
              <span className="text-[var(--color-text-muted)]">|</span>
              <Link
                href={`/de${currentPath}`}
                className={`text-sm ${locale === "de" ? "font-bold text-text-primary" : "text-[var(--color-text-secondary)] hover:text-brand-purple"}`}
              >
                DE
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 h-px bg-[var(--color-border-subtle)]" />
        <div className="mt-6 text-center text-xs text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} ASCEP. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
