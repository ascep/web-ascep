'use client';

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import FlagIcon from "./FlagIcon";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import SearchDialog from "./SearchDialog";

const languages = [
  { code: "es", label: "ES" },
  { code: "pt", label: "PT" },
] as const;

const programsSubmenu = [
  { key: "incidencia", href: "/programas/incidencia" },
  { key: "avanzaJoven", href: "/programas/avanza-joven" },
  { key: "empleo", href: "/programas/empleo" },
  { key: "miCuerpo", href: "/programas/mi-cuerpo" },
  { key: "marcoPolitico", href: "/programas/marco-politico" },
];

const casasSubmenu = [
  { key: "areas", href: "/casas-del-saber/areas" },
  { key: "lineas", href: "/casas-del-saber/lineas" },
  { key: "modalidades", href: "/casas-del-saber/modalidades" },
  { key: "rutaEgreso", href: "/casas-del-saber/ruta-egreso" },
];

const leySections = [
  { key: "leyQueEs", href: "/ley-de-egreso#que-es" },
  { key: "leyObjetivos", href: "/ley-de-egreso#objetivos" },
  { key: "leyDirigida", href: "/ley-de-egreso#dirigida" },
  { key: "leyCambio", href: "/ley-de-egreso#cambio" },
  { key: "leyProceso", href: "/ley-de-egreso#proceso" },
  { key: "leyParticipa", href: "/ley-de-egreso#participa" },
];

type DropdownState = "quienes" | "programas" | "ley" | "comoAyudar" | null;

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const currentPath = pathname.replace(/^\/(es|pt)/, "") || "/";
  const [openDropdown, setOpenDropdown] = useState<DropdownState>(null);
  const [openCasas, setOpenCasas] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [showNuevo, setShowNuevo] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (dropdown: DropdownState) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  const handleLangEnter = () => {
    if (langTimeoutRef.current) clearTimeout(langTimeoutRef.current);
    setLangOpen(true);
  };

  const handleLangLeave = () => {
    langTimeoutRef.current = setTimeout(() => setLangOpen(false), 200);
  };

  useEffect(() => {
    const val = localStorage.getItem("ascep_nuevo");
    if (!val) {
      localStorage.setItem("ascep_nuevo", "1");
      setShowNuevo(true);
    } else {
      const count = parseInt(val, 10);
      if (count < 2) {
        localStorage.setItem("ascep_nuevo", String(count + 1));
        setShowNuevo(true);
      }
    }
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (langTimeoutRef.current) clearTimeout(langTimeoutRef.current);
    };
  }, []);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];
  const otherLangs = languages.filter((l) => l.code !== locale);

  return (
    <>
    <header className="sticky top-0 z-50 bg-bg-base shadow-sm" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image
            src={assetPath("/logos/10 logo ascep horizontal azul.png")}
            alt="ASCEP"
            width={144}
            height={48}
            className="h-12 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href={`/${locale}`}
            className="whitespace-nowrap rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
          >
            {t("inicio")}
          </Link>
          {/* Quienes Somos dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("quienes")}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-1 whitespace-nowrap rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated">
              {t("quienesSomos")} <ChevronDown size={14} />
            </button>
            {openDropdown === "quienes" && (
              <div className="absolute left-0 top-full z-40 w-56 rounded-[10px] border border-border-subtle bg-bg-card p-2 shadow-lg">
                <Link
                  href={`/${locale}/quienes-somos`}
                  className="block rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
                >
                  {t("quienesSomos")}
                </Link>
                <Link
                  href={`/${locale}/como-lo-hacemos`}
                  className="block rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
                >
                  {t("comoLoHacemos")}
                </Link>
                <Link
                  href={`/${locale}/impacto`}
                  className="block rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
                >
                  {t("impacto")}
                </Link>
                <Link
                  href={`/${locale}/aliados`}
                  className="block rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
                >
                  {t("aliados")}
                </Link>
              </div>
            )}
          </div>

          {/* Programas dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("programas")}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-1 whitespace-nowrap rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated">
              {t("programas")} <ChevronDown size={14} />
            </button>
            {openDropdown === "programas" && (
              <div className="absolute left-0 top-full z-40 w-64 rounded-[10px] border border-border-subtle bg-bg-card p-2 shadow-lg">
                {programsSubmenu.map((item) => (
                  <Link
                    key={item.key}
                    href={`/${locale}${item.href}`}
                    className="block rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
                  >
                    {t(item.key)}
                  </Link>
                ))}
                <div className="my-1 h-px bg-[var(--color-border-subtle)]" />
                <div
                  className="relative"
                  onMouseEnter={() => setOpenCasas(true)}
                  onMouseLeave={() => setOpenCasas(false)}
                >
                  <Link
                    href={`/${locale}/casas-del-saber`}
                    className="flex items-center justify-between rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
                  >
                    {t("casasDelSaber")} <ChevronDown size={14} className="-rotate-90" />
                  </Link>
                  {openCasas && (
                    <div className="absolute left-full top-0 z-40 w-56 rounded-[10px] border border-border-subtle bg-bg-card p-2 shadow-lg">
                      {casasSubmenu.map((item) => (
                        <Link
                          key={item.key}
                          href={`/${locale}${item.href}`}
                          className="block rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
                        >
                          {t(item.key)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Ley de Egreso mega menu */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("ley")}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-1 rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated">
              {t("leyEgreso")} <ChevronDown size={14} />
            </button>
            {openDropdown === "ley" && (
              <div className="absolute right-0 top-full z-40 w-[580px] rounded-[10px] border border-border-subtle bg-bg-card p-4 shadow-lg">
                <div className="flex gap-6">
                  <div className="w-2/5 shrink-0">
                    <Image
                      src={assetPath("/images/encuentro-2025/GIS06446.webp")}
                      alt="Ley de Egreso"
                      width={280}
                      height={200}
                      className="mb-3 w-full rounded-[10px] object-cover"
                      style={{ aspectRatio: "7/5" }}
                    />
                    <Link
                      href={`/${locale}/ley-de-egreso`}
                      className="block text-sm font-bold text-text-primary"
                    >
                      {t("leyEgreso")}
                    </Link>
                    <p className="mt-1 text-xs text-text-muted">
                      {t("leyNumero")}
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-1">
                      {leySections.map((section) => (
                        <Link
                          key={section.key}
                          href={`/${locale}${section.href}`}
                          className="rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
                        >
                          {t(section.key)}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Como Ayudar mega menu */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("comoAyudar")}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-1 rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated">
              {t("comoAyudar")} <ChevronDown size={14} />
            </button>
            {openDropdown === "comoAyudar" && (
              <div className="absolute right-0 top-full z-40 w-[580px] rounded-[10px] border border-border-subtle bg-bg-card p-4 shadow-lg">
                <div className="flex gap-6">
                  <div className="w-2/5 shrink-0">
                    <Image
                      src={assetPath("/images/encuentro-2025/GIS06447.webp")}
                      alt={t("comoAyudar")}
                      width={280}
                      height={200}
                      className="mb-3 w-full rounded-[10px] object-cover"
                      style={{ aspectRatio: "7/5" }}
                    />
                    <p className="text-sm font-bold text-text-primary">
                      {t("comoAyudar")}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      {t("apoyoTransforma")}
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-1 gap-1">
                      <Link
                        href={`/${locale}/donar`}
                        className="rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
                      >
                        {t("donacionMonetaria")}
                      </Link>
                      <Link
                        href={`/${locale}/como-ayudar/plan-padrino`}
                        className="rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
                      >
                        {t("planPadrino")}
                      </Link>
                      <Link
                        href={`/${locale}/como-ayudar/voluntariado`}
                        className="rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
                      >
                        {t("voluntariado")}
                      </Link>
                      <Link
                        href={`/${locale}/participa`}
                        className="rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
                      >
                        {t("participa")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {showNuevo ? (
            <Link
              href={`/${locale}/como-ayudar/enredate-con-ascep`}
              className="relative flex flex-col items-center whitespace-nowrap rounded-[10px] px-3 pb-2 pt-4 text-sm font-semibold text-brand-orange transition-colors hover:bg-brand-orange/10"
            >
              <span className="absolute -top-0.5 left-6 rounded-full bg-brand-orange/10 px-1 py-0.5 text-[8px] font-bold uppercase tracking-wider text-brand-orange">
                Nuevo
              </span>
              {t("enredateConAscep")}
            </Link>
          ) : (
            <Link
              href={`/${locale}/como-ayudar/enredate-con-ascep`}
              className="whitespace-nowrap rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
            >
              {t("enredateConAscep")}
            </Link>
          )}
          <Link
            href={`/${locale}/contacto`}
            className="whitespace-nowrap rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
          >
            {t("contacto")}
          </Link>
        </nav>

        <div className="hidden items-center gap-1 md:flex">
          <button
            onClick={() => setSearchOpen(true)}
            className="rounded-[10px] p-2 text-[var(--color-text-tertiary)] transition-colors hover:bg-bg-elevated hover:text-text-primary"
            aria-label="Buscar"
          >
            <Search size={18} />
          </button>
          <ThemeToggle />
          {/* Language dropdown */}
          <div
            className="relative"
            onMouseEnter={handleLangEnter}
            onMouseLeave={handleLangLeave}
          >
            <button className="flex items-center gap-1.5 rounded-[10px] border border-border-default px-2.5 py-1.5 text-xs font-semibold uppercase text-text-primary transition-colors hover:border-brand-purple">
              <FlagIcon country={currentLang.code as "es" | "pt"} className="h-3.5 w-5" />
              <span>{currentLang.label}</span>
              <ChevronDown size={12} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full z-40 mt-1 w-28 rounded-[10px] border border-border-subtle bg-bg-card py-1 shadow-lg">
                {otherLangs.map((lang) => (
                  <Link
                    key={lang.code}
                    href={`/${lang.code}${currentPath}`}
                    className="flex items-center gap-2 rounded-[10px] px-3 py-1.5 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
                  >
                    <FlagIcon country={lang.code as "es" | "pt"} className="h-3.5 w-5" />
                    <span>{lang.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href={`/${locale}/donar`}
            className="inline-flex items-center rounded-[10px] bg-brand-orange px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark"
          >
            {t("donarBtn")}
          </Link>
        </div>

        <div className="flex items-center md:hidden">
          <ThemeToggle />
        </div>
      </div>

    </header>
    <MobileMenu />
    <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
  </>
  );
}
