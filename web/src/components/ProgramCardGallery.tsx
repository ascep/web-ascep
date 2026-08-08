import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { programasPorQue, type ProgramaPorQue } from "@/data/programasPorQue";

type Accent = ProgramaPorQue["accent"];

const accentStyles: Record<Accent, { eyebrow: string; cta: string; badge: string }> = {
  cyan: {
    eyebrow: "text-ley-cyan",
    cta: "text-ley-cyan hover:text-ley-cyan/80",
    badge: "border-ley-cyan/40 text-ley-cyan",
  },
  orange: {
    eyebrow: "text-ley-orange",
    cta: "text-ley-orange hover:text-ley-orange/80",
    badge: "border-ley-orange/40 text-ley-orange",
  },
  yellow: {
    eyebrow: "text-ley-yellow",
    cta: "text-ley-yellow hover:text-ley-yellow/80",
    badge: "border-ley-yellow/40 text-ley-yellow",
  },
  teal: {
    eyebrow: "text-ley-teal",
    cta: "text-ley-teal hover:text-ley-teal/80",
    badge: "border-ley-teal/40 text-ley-teal",
  },
  purple: {
    eyebrow: "text-ley-fuchsia",
    cta: "text-ley-fuchsia hover:text-ley-fuchsia/80",
    badge: "border-ley-fuchsia/50 text-ley-fuchsia",
  },
};

type ProgramCardGalleryProps = {
  locale: string;
  tag?: string;
  title?: string;
  subtitle?: string;
  items?: ProgramaPorQue[];
  accent?: Accent;
};

export default async function ProgramCardGallery({
  locale,
  tag,
  title,
  subtitle,
  items = programasPorQue,
  accent = "orange",
}: ProgramCardGalleryProps) {
  let leerMas = "Leer mas";
  try {
    const t = await getTranslations({ locale, namespace: "programas" });
    leerMas = t("leerMas");
  } catch {
    leerMas = "Leer mas";
  }
  const accentCls = accentStyles[accent];

  return (
    <section className="bg-section-light py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {tag && title && (
          <div className="mb-12 text-center">
            <span
              className={`inline-block rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${accentCls.badge}`}
            >
              {tag}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)]">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const href = `/${locale}${item.path}`;
            const src = /^https?:\/\//i.test(item.image) ? item.image : assetPath(item.image);
            const itemAccent = accentStyles[item.accent];
            return (
              <Link
                key={item.id}
                href={href}
                className="group block overflow-hidden rounded-3xl bg-bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.2em] ${itemAccent.eyebrow}`}
                  >
                    Programa
                  </p>
                  <h3 className="mt-2 font-bold text-[var(--color-text-primary)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {item.description}
                  </p>
                  <span
                    className={`mt-4 inline-flex min-h-[48px] items-center gap-2 font-semibold ${itemAccent.cta}`}
                    aria-label={`${leerMas}: ${item.title}`}
                  >
                    {leerMas} <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
