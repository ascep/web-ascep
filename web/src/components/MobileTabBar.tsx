'use client';

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Home, BookOpen, BarChart3, Heart, Menu } from "lucide-react";
import DonationSheet from "./DonationSheet";

const tabs: {
  key: string;
  icon: React.ElementType;
  href: string | null;
  highlight?: boolean;
}[] = [
  { key: "inicio", icon: Home, href: "" },
  { key: "programas", icon: BookOpen, href: "/programas" },
  { key: "impacto", icon: BarChart3, href: "/impacto" },
  { key: "donarBtn", icon: Heart, href: "/donar", highlight: true },
  { key: "mas", icon: Menu, href: null },
];

export default function MobileTabBar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const currentPath = pathname.replace(/^\/(es|en|pt)/, "") || "/";
  const [showSheet, setShowSheet] = useState(false);

  return (
    <>
    <DonationSheet open={showSheet} onClose={() => setShowSheet(false)} />
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border-subtle bg-bg-card md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <div className="flex items-center justify-around py-1">
        {tabs.map((tab) => {
          const isActive = tab.href !== null
            ? currentPath === tab.href || (tab.href !== "" && currentPath.startsWith(tab.href))
            : false;
          const Icon = tab.icon;

          if (tab.href === null || tab.key === "donarBtn") {
            return (
              <button
                key={tab.key}
                onClick={() => {
                  if (tab.key === "donarBtn") setShowSheet(true);
                  else window.dispatchEvent(new CustomEvent("open-mobile-menu"));
                }}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 min-h-[48px] min-w-[48px]"
                aria-label={t(tab.key)}
              >
                <Icon size={22} className={tab.highlight ? "text-brand-orange" : "text-text-muted"} />
                <span className={tab.highlight ? "text-[10px] font-bold text-brand-orange" : "text-[10px] font-semibold text-text-muted"}>
                  {t(tab.key)}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={tab.key}
              href={`/${locale}${tab.href}`}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 min-h-[48px] min-w-[48px] relative ${
                isActive ? "" : ""
              }`}
            >
              {isActive && (
                <span className="absolute -top-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-brand-blue" />
              )}
              <Icon
                size={22}
                className={
                  tab.highlight
                    ? "text-brand-orange"
                    : isActive
                      ? "text-brand-blue"
                      : "text-text-muted"
                }
              />
              <span
                className={
                  tab.highlight
                    ? "text-[10px] font-bold text-brand-orange"
                    : isActive
                      ? "text-[10px] font-semibold text-brand-blue"
                      : "text-[10px] font-semibold text-text-muted"
                }
              >
                {t(tab.key)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
    </>
  );
}
