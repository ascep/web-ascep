import type { LucideIcon } from "lucide-react";
import { DollarSign, BarChart3, FileBadge, Scale } from "lucide-react";

export const TRANSPARENCIA_CATEGORIES = ["financieros", "informes", "registros", "legales"] as const;

export const CATEGORY_META: Record<string, { icon: LucideIcon; iconBg: string; iconColor: string }> = {
  financieros: { icon: DollarSign, iconBg: "bg-brand-orange/10", iconColor: "text-brand-orange" },
  informes: { icon: BarChart3, iconBg: "bg-brand-orange/10", iconColor: "text-brand-orange" },
  registros: { icon: FileBadge, iconBg: "bg-brand-purple/10", iconColor: "text-brand-purple" },
  legales: { icon: Scale, iconBg: "bg-brand-teal/10", iconColor: "text-brand-teal" },
};

export const DEFAULT_DOC_CATEGORY = "institucionales";
