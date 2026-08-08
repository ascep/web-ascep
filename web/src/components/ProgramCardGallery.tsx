import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { programasPorQue, type ProgramaPorQue } from "@/data/programasPorQue";

type Accent = "cyan" | "orange" | "yellow" | "teal" | "purple";

type ProgramCardGalleryProps = {
  locale: string;
  tag?: string;
  title?: string;
  subtitle?: string;
  items?: ProgramaPorQue[];
  accent?: Accent;
};

const accentStyles: Record<
  Accent,
  { badge: string; title: string; eyebrow: string; cta: string }
> = {
  cyan: {
    badge: "border-ley-cyan/40 text-ley-cyan",
    title: "text-ley-cyan",
    eyebrow: "text-ley-cyan",
    cta: "text-ley-cyan",
  },
  orange: {
    badge: "border-ley-orange/40 text-ley-orange",
    title: "text-ley-orange",
    eyebrow: "text-ley-orange",
    cta: "text-ley-orange",
  },
  yellow: {
    badge: "border-ley-yellow/40 text-ley-yellow",
    title: "text-ley-yellow",
    eyebrow: "text-ley-yellow",
    cta: "text-ley-yellow",
  },
  teal: {
    badge: "border-ley-teal/40 text-ley-teal",
    title: "text-ley-teal",
    eyebrow: "text-ley-teal",
    cta: "text-ley-teal",
  },
  purple: {
    badge: "border-ley-fuchsia/50 text-ley-fuchsia",
    title: "text-ley-fuchsia",
    eyebrow: "text-ley-fuchsia",
    cta: "text-ley-fuchsia",
  },
};

export default async function ProgramCardGallery({
  locale,
  tag,
  title,
  subtitle,
  items = programasPorQue,
  accent = "orange",
}: ProgramCardGalleryProps) {
  const t = await getTranslations({ locale, namespace: "programas" });
  let leerMasLabel: string;
  try {
    leerMasLabel = t("leerMas");
  } catch {
    leerMasLabel = "Leer más";
  }

  const accentCls = accentStyles[accent];
  const hasHeader = Boolean(tag || title || subtitle);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      {hasHeader && (
        <div className="mx-auto mb-12 max-w-2xl text-center">
          {tag && (
            <span
              className={`mb-3 inline-block rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${accentCls.badge}`}
            >
              {tag}
            </span>
          )}
          {title && (
            <h2 className={`text-3xl font-bold text-text-primary sm:text-4xl ${accentCls.title}`}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mx-auto mt-4 max-w-xl text-text-secondary">{subtitle}</p>
          )}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const itemAccent = accentStyles[item.accent];
          const imageSrc = /^https?:\/\//i.test(item.image)
            ? item.image
            : assetPath(item.image);
          const href = `/${locale}${item.path}`;

          return (
            <div
              key={item.id}
              className="rounded-3xl overflow-hidden bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={imageSrc}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span
                  className={`mb-2 block text-xs font-semibold uppercase tracking-[0.2em] ${itemAccent.eyebrow}`}
                >
                  {t("pillPrograma")}
                </span>
                <h3 className="text-lg font-bold text-text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
                <Link
                  href={href}
                  aria-label={`${leerMasLabel}: ${item.title}`}
                  className={`mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${itemAccent.cta}`}
                >
                  {leerMasLabel} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
