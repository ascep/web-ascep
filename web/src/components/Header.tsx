'use client';

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Search } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import FlagIcon from "./FlagIcon";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";
import MobileMenu from "./MobileMenu";
import SearchDialog from "./SearchDialog";

const languages = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
] as const;

type NavItem = {
  key: string;
  href: string;
  children?: NavItem[];
};

type NavGroup = {
  type: "link";
  key: string;
  href: string;
  badge?: string;
} | {
  type: "dropdown";
  key: string;
  items: NavItem[];
} | {
  type: "megamenu";
  key: string;
  image: string;
  cols: number;
  items: NavItem[];
};

type HeaderProps = {
  comoAyudarCard: string;
};

const getNavStructure = (comoAyudarImage: string): NavGroup[] => [
  { type: "link", key: "inicio", href: "/" },
  {
    type: "dropdown",
    key: "quienesSomos",
    items: [
      { key: "quienesSomos", href: "/quienes-somos" },
      { key: "comoLoHacemos", href: "/como-lo-hacemos" },
      { key: "impacto", href: "/impacto" },
      { key: "aliados", href: "/aliados" },
    ],
  },
  {
    type: "dropdown",
    key: "programas",
    items: [
      { key: "incidencia", href: "/programas/incidencia", children: [
        { key: "marcoPolitico", href: "/programas/marco-politico" },
      ]},
      { key: "avanzaJoven", href: "/programas/avanza-joven" },
      { key: "empleo", href: "/programas/empleo" },
      { key: "miCuerpo", href: "/programas/mi-cuerpo" },
      { key: "casasDelSaber", href: "/casas-del-saber", children: [
        { key: "areas", href: "/casas-del-saber/areas" },
        { key: "lineas", href: "/casas-del-saber/lineas" },
        { key: "modalidades", href: "/casas-del-saber/modalidades" },
        { key: "rutaEgreso", href: "/casas-del-saber/ruta-egreso" },
      ]},
    ],
  },
  { type: "link", key: "noticias", href: "/noticias" },
  {
    type: "megamenu",
    key: "comoAyudar",
    image: comoAyudarImage,
    cols: 1,
    items: [
      { key: "donacionMonetaria", href: "/donar" },
      { key: "planPadrino", href: "/como-ayudar/plan-padrino" },
      { key: "voluntariado", href: "/como-ayudar/voluntariado" },
      { key: "participa", href: "/participa" },
    ],
  },
  { type: "link", key: "enredateConAscep", href: "/como-ayudar/enredate-con-ascep", badge: "Nuevo" },
  { type: "link", key: "contacto", href: "/contacto" },
];

type DropdownState = string | null;

export default function Header({ comoAyudarCard }: HeaderProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const { theme } = useTheme();
  const pathname = usePathname();
  const currentPath = pathname.replace(/^\/(es|en|pt)/, "") || "/";
  const [openDropdown, setOpenDropdown] = useState<DropdownState>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [showNuevo] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const val = localStorage.getItem("ascep_nuevo");
    if (!val) {
      localStorage.setItem("ascep_nuevo", "1");
      return true;
    }
    const count = parseInt(val, 10);
    if (count < 2) {
      localStorage.setItem("ascep_nuevo", String(count + 1));
      return true;
    }
    return false;
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const handleMouseEnter = (dropdown: DropdownState) => {
    clearTimer();
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
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setLangOpen(false);
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

  const navStructure = getNavStructure(comoAyudarCard);
  const currentLang = languages.find((l) => l.code === locale) || languages[0];
  const otherLangs = languages.filter((l) => l.code !== locale);

  const renderSubmenu = (items: NavItem[]) => (
    <div className="absolute left-0 top-full z-40 w-64 rounded-[10px] border border-border-subtle bg-bg-card p-2 shadow-lg">
      {items.map((item) => (
        item.children ? (
          <div key={item.key}>
            <div className="my-1 h-px bg-[var(--color-border-subtle)]" />
            <div
              className="relative"
              onMouseEnter={() => setOpenSubmenu(item.key)}
              onMouseLeave={() => setOpenSubmenu(null)}
            >
              <Link
                href={`/${locale}${item.href}`}
                className="flex items-center justify-between rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
              >
                {t(item.key)} <ChevronDown size={14} className="-rotate-90" />
              </Link>
              {openSubmenu === item.key && (
                <div className="absolute left-full top-0 z-40 w-56 rounded-[10px] border border-border-subtle bg-bg-card p-2 shadow-lg">
                  {item.children.map((child) => (
                    <Link
                      key={child.key}
                      href={`/${locale}${child.href}`}
                      className="block rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
                    >
                      {t(child.key)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link
            key={item.key}
            href={`/${locale}${item.href}`}
            className="block rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
          >
            {t(item.key)}
          </Link>
        )
      ))}
    </div>
  );

  const renderMegamenu = (group: NavGroup & { type: "megamenu" }) => (
    <div className="absolute right-0 top-full z-40 w-[580px] rounded-[10px] border border-border-subtle bg-bg-card p-4 shadow-lg">
      <div className="flex gap-6">
        <div className="w-2/5 shrink-0">
          <Image
            src={assetPath(group.image)}
            alt=""
            width={280}
            height={200}
            sizes="280px"
            className="mb-3 w-full rounded-[10px] object-cover"
            style={{ aspectRatio: "7/5" }}
          />
          <Link href={`/${locale}/${group.key}`}
            className="block text-sm font-bold text-text-primary"
          >
            {t(group.key)}
          </Link>
          <p className="mt-1 text-xs text-text-muted">
            {t("apoyoTransforma")}
          </p>
        </div>
        <div className="flex-1">
          <div className={`grid ${group.cols === 2 ? "grid-cols-2" : "grid-cols-1"} gap-1`}>
            {group.items.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className="rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
    <header className="sticky top-0 z-50 bg-bg-base shadow-sm" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image
            src={assetPath(theme === "dark" ? "/logos/12 logo ascep blanco sin slogan.png" : "/logos/10 logo ascep horizontal azul.png")}
            alt="ASCEP"
            width={144}
            height={48}
            className="h-12 w-auto"
            priority
          />
        </Link>

        <nav ref={dropdownRef} className="hidden items-center gap-1 md:flex" aria-label="Navegacion principal">
          {navStructure.map((group) => {
            if (group.type === "link") {
              if (group.badge === "Nuevo" && !showNuevo) {
                return (
                  <Link
                    key={group.key}
                    href={`/${locale}${group.href}`}
                    className="whitespace-nowrap rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
                  >
                    {t(group.key)}
                  </Link>
                );
              }
              if (group.badge) {
                return (
                  <Link
                    key={group.key}
                    href={`/${locale}${group.href}`}
                    className="relative flex flex-col items-center whitespace-nowrap rounded-[10px] px-3 pb-2 pt-4 text-sm font-semibold text-brand-accent transition-colors hover:bg-brand-accent/10"
                  >
                    <span className="absolute -top-0.5 left-6 rounded-full bg-brand-accent/10 px-1 py-0.5 text-[8px] font-bold uppercase tracking-wider text-brand-accent">
                      {group.badge}
                    </span>
                    {t(group.key)}
                  </Link>
                );
              }
              return (
                <Link
                  key={group.key}
                  href={`/${locale}${group.href}`}
                  className="whitespace-nowrap rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
                >
                  {t(group.key)}
                </Link>
              );
            }

            if (group.type === "dropdown") {
              return (
                <div
                  key={group.key}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(group.key)}
                  onMouseLeave={handleMouseLeave}
                >
                  {group.key === "programas" ? (
                    <Link
                      href={`/${locale}/programas`}
                      className="flex items-center gap-1 whitespace-nowrap rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
                      aria-haspopup="true"
                      aria-expanded={openDropdown === group.key}
                    >
                      {t(group.key)} <ChevronDown size={14} />
                    </Link>
                  ) : (
                    <button
                      className="flex items-center gap-1 whitespace-nowrap rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
                      aria-expanded={openDropdown === group.key}
                      aria-haspopup="true"
                    >
                      {t(group.key)} <ChevronDown size={14} />
                    </button>
                  )}
                  {openDropdown === group.key && renderSubmenu(group.items)}
                </div>
              );
            }

            if (group.type === "megamenu") {
              return (
                <div
                  key={group.key}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(group.key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className="flex items-center gap-1 rounded-[10px] px-3 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-elevated"
                    aria-expanded={openDropdown === group.key}
                    aria-haspopup="true"
                  >
                    {t(group.key)} <ChevronDown size={14} />
                  </button>
                  {openDropdown === group.key && renderMegamenu(group)}
                </div>
              );
            }

            return null;
          })}
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
          <div
            className="relative"
            onMouseEnter={handleLangEnter}
            onMouseLeave={handleLangLeave}
          >
            <button
              className="flex items-center gap-1.5 rounded-[10px] border border-border-default px-2.5 py-1.5 text-xs font-semibold uppercase text-text-primary transition-colors hover:border-brand-primary"
              aria-expanded={langOpen}
              aria-haspopup="true"
              aria-label="Idioma"
            >
              <FlagIcon country={currentLang.code as "es" | "en" | "pt"} className="h-3.5 w-5" />
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
                    <FlagIcon country={lang.code as "es" | "en" | "pt"} className="h-3.5 w-5" />
                    <span>{lang.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href={`/${locale}/donar`}
            className="inline-flex items-center rounded-[10px] bg-brand-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
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
