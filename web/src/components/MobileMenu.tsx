'use client';

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  X,
  ChevronDown,
  Users,
  BookOpen,
  FileText,
  Heart,
  Shield,
  Mail,
  Home,
  Building2,
  MessageCircle,
  Play,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { assetPath } from "@/lib/asset-path";
import FlagIcon from "./FlagIcon";
import ThemeToggle from "./ThemeToggle";

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

type Section = "quienes" | "programas" | "ley" | "comoAyudar" | null;

function AccordionItem({
  icon: Icon,
  label,
  isOpen,
  onToggle,
  children,
}: {
  icon: React.ElementType;
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-border-subtle bg-bg-card">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 min-h-[48px]"
      >
        <Icon size={20} className="shrink-0 text-brand-blue" />
        <span className="flex-1 text-left text-sm font-bold text-text-primary">
          {label}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-text-muted transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border-subtle bg-bg-elevated/50 px-4 py-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MobileMenu() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const currentPath = pathname.replace(/^\/(es|pt)/, "") || "/";
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Section>(null);
  const [casasOpen, setCasasOpen] = useState(false);
  const [showNuevo, setShowNuevo] = useState(false);

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
    const handler = () => setOpen(true);
    window.addEventListener("open-mobile-menu", handler);
    return () => window.removeEventListener("open-mobile-menu", handler);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => {
    setOpen(false);
    setExpanded(null);
    setCasasOpen(false);
  };

  const toggle = (section: Section) => {
    setExpanded((prev) => (prev === section ? null : section));
    setCasasOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-bg-base md:hidden"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
                <Link href={`/${locale}`} onClick={close}>
                  <Image
                    src={assetPath("/logos/10 logo ascep horizontal azul.png")}
                    alt="ASCEP"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                    priority
                  />
                </Link>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={close}
                    className="flex items-center justify-center rounded-[10px] p-2 min-h-[44px] min-w-[44px]"
                    aria-label="Cerrar menu"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Quick actions */}
              <div className="flex gap-3 px-4 py-4">
                <Link
                  href={`/${locale}/donar`}
                  onClick={close}
                  className="flex-1 rounded-[10px] bg-brand-orange px-4 py-3 text-center text-sm font-bold text-white"
                >
                  {t("donarBtn")}
                </Link>
                <Link
                  href={`/${locale}/contacto`}
                  onClick={close}
                  className="flex-1 rounded-[10px] border border-brand-blue px-4 py-3 text-center text-sm font-bold text-brand-blue"
                >
                  {t("contacto")}
                </Link>
              </div>

              {/* Accordion sections */}
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                <div className="space-y-2">
                  {/* Inicio */}
                  <Link
                    href={`/${locale}`}
                    onClick={close}
                    className="flex items-center gap-3 rounded-[10px] border border-border-subtle bg-bg-card px-4 py-3 min-h-[48px]"
                  >
                    <Home size={20} className="shrink-0 text-brand-blue" />
                    <span className="text-sm font-bold text-text-primary">
                      {t("inicio")}
                    </span>
                  </Link>

                  {/* Quienes Somos */}
                  <AccordionItem
                    icon={Users}
                    label={t("quienesSomos")}
                    isOpen={expanded === "quienes"}
                    onToggle={() => toggle("quienes")}
                  >
                    <Link
                      href={`/${locale}/quienes-somos`}
                      onClick={close}
                      className="block rounded-[10px] px-3 py-2.5 text-sm font-semibold text-text-primary hover:bg-bg-elevated min-h-[44px]"
                    >
                      {t("quienesSomos")}
                    </Link>
                    <Link
                      href={`/${locale}/como-lo-hacemos`}
                      onClick={close}
                      className="block rounded-[10px] px-3 py-2.5 text-sm font-semibold text-text-primary hover:bg-bg-elevated min-h-[44px]"
                    >
                      {t("comoLoHacemos")}
                    </Link>
                    <Link
                      href={`/${locale}/impacto`}
                      onClick={close}
                      className="block rounded-[10px] px-3 py-2.5 text-sm font-semibold text-text-primary hover:bg-bg-elevated min-h-[44px]"
                    >
                      {t("impacto")}
                    </Link>
                    <Link
                      href={`/${locale}/aliados`}
                      onClick={close}
                      className="block rounded-[10px] px-3 py-2.5 text-sm font-semibold text-text-primary hover:bg-bg-elevated min-h-[44px]"
                    >
                      {t("aliados")}
                    </Link>
                  </AccordionItem>

                  {/* Programas */}
                  <AccordionItem
                    icon={BookOpen}
                    label={t("programas")}
                    isOpen={expanded === "programas"}
                    onToggle={() => toggle("programas")}
                  >
                    {programsSubmenu.map((item) => (
                      <Link
                        key={item.key}
                        href={`/${locale}${item.href}`}
                        onClick={close}
                        className="block rounded-[10px] px-3 py-2.5 text-sm font-semibold text-text-primary hover:bg-bg-elevated min-h-[44px]"
                      >
                        {t(item.key)}
                      </Link>
                    ))}
                    <div className="my-1 h-px bg-border-subtle" />
                    <div>
                      <button
                        onClick={() => setCasasOpen(!casasOpen)}
                        className="flex w-full items-center justify-between rounded-[10px] px-3 py-2.5 text-sm font-semibold text-text-primary hover:bg-bg-elevated min-h-[44px]"
                      >
                        {t("casasDelSaber")}
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${
                            casasOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {casasOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="ml-3 space-y-0.5 pb-1">
                              {casasSubmenu.map((item) => (
                                <Link
                                  key={item.key}
                                  href={`/${locale}${item.href}`}
                                  onClick={close}
                                  className="block rounded-[10px] px-3 py-2 text-sm font-semibold text-text-secondary hover:bg-bg-elevated min-h-[44px]"
                                >
                                  {t(item.key)}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </AccordionItem>

                  {/* Ley de Egreso */}
                  <AccordionItem
                    icon={FileText}
                    label={t("leyEgreso")}
                    isOpen={expanded === "ley"}
                    onToggle={() => toggle("ley")}
                  >
                    <Link
                      href={`/${locale}/ley-de-egreso`}
                      onClick={close}
                      className="block rounded-[10px] px-3 py-2.5 text-sm font-bold text-text-primary hover:bg-bg-elevated min-h-[44px]"
                    >
                      {t("leyEgreso")}
                    </Link>
                    {leySections.map((section) => (
                      <Link
                        key={section.key}
                        href={`/${locale}${section.href}`}
                        onClick={close}
                        className="block rounded-[10px] px-3 py-2.5 text-sm font-semibold text-text-primary hover:bg-bg-elevated min-h-[44px]"
                      >
                        {t(section.key)}
                      </Link>
                    ))}
                  </AccordionItem>

                  {/* Enrédate con ASCEP */}
                  <Link
                    href={`/${locale}/como-ayudar/enredate-con-ascep`}
                    onClick={close}
                    className={`flex items-center gap-3 rounded-[10px] px-4 py-3 min-h-[48px] transition-colors ${
                      showNuevo
                        ? "border border-brand-orange/20 bg-brand-orange/5"
                        : "border border-bg-elevated/20 hover:bg-bg-elevated"
                    }`}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-[8px] text-white transition-colors ${
                      showNuevo ? "bg-brand-orange" : "bg-text-tertiary"
                    }`}>
                      <Play size={16} />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-bold text-text-primary">
                        {t("enredateConAscep")}
                      </span>
                    </div>
                    {showNuevo && (
                      <span className="rounded-full bg-brand-orange/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                        Nuevo
                      </span>
                    )}
                  </Link>

                  {/* Cómo Ayudar */}
                  <AccordionItem
                    icon={Heart}
                    label={t("comoAyudar")}
                    isOpen={expanded === "comoAyudar"}
                    onToggle={() => toggle("comoAyudar")}
                  >
                    <Link
                      href={`/${locale}/donar`}
                      onClick={close}
                      className="block rounded-[10px] px-3 py-2.5 text-sm font-semibold text-text-primary hover:bg-bg-elevated min-h-[44px]"
                    >
                      {t("donacionMonetaria")}
                    </Link>
                    <Link
                      href={`/${locale}/como-ayudar/plan-padrino`}
                      onClick={close}
                      className="block rounded-[10px] px-3 py-2.5 text-sm font-semibold text-text-primary hover:bg-bg-elevated min-h-[44px]"
                    >
                      {t("planPadrino")}
                    </Link>
                    <Link
                      href={`/${locale}/como-ayudar/voluntariado`}
                      onClick={close}
                      className="block rounded-[10px] px-3 py-2.5 text-sm font-semibold text-text-primary hover:bg-bg-elevated min-h-[44px]"
                    >
                      {t("voluntariado")}
                    </Link>
                    <Link
                      href={`/${locale}/participa`}
                      onClick={close}
                      className="block rounded-[10px] px-3 py-2.5 text-sm font-semibold text-text-primary hover:bg-bg-elevated min-h-[44px]"
                    >
                      {t("participa")}
                    </Link>
                  </AccordionItem>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/573025550107"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className="flex items-center gap-3 rounded-[10px] border border-border-subtle bg-bg-card px-4 py-3 min-h-[48px]"
                  >
                    <MessageCircle size={20} className="shrink-0 text-[#25D366]" />
                    <span className="text-sm font-bold text-text-primary">
                      WhatsApp
                    </span>
                  </a>
                </div>
              </div>

              {/* Footer: language + theme */}
              <div className="border-t border-border-subtle px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {languages.map((lang) => (
                      <Link
                        key={lang.code}
                        href={`/${lang.code}${currentPath}`}
                        onClick={close}
                        className={`flex items-center gap-1 rounded-[10px] border px-3 py-2 text-xs font-semibold uppercase transition-colors min-h-[44px] ${
                          lang.code === locale
                            ? "border-brand-blue bg-brand-blue/10 text-text-primary"
                            : "border-border-default text-text-muted"
                        }`}
                      >
                        <FlagIcon
                          country={lang.code as "es" | "pt"}
                          className="h-3 w-5"
                        />
                        <span>{lang.label}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <Building2 size={16} className="mr-1.5 text-text-muted" />
                    <span className="text-xs text-text-muted">Cali, CO</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
