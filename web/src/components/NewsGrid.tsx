import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import AnimatedSection from "./AnimatedSection";

export type NewsGridItem = {
  id: string;
  href: string;
  image: string;
  tag: string;
  title: string;
  excerpt: string;
  color: string;
};

type NewsGridProps = {
  items: NewsGridItem[];
  locale: string;
};

export default async function NewsGrid({ items, locale }: NewsGridProps) {
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <AnimatedSection key={item.id} direction="up" delay={i * 0.06}>
          <Link
            href={item.href}
            className="group block overflow-hidden rounded-[10px] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="aspect-[16/9] overflow-hidden">
              <div className="relative h-full w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="p-5">
              <span
                className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: item.color }}
              >
                {item.tag}
              </span>
              <h3 className="mb-2 text-base font-bold text-[var(--color-text-primary)] line-clamp-2">
                {item.title}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {item.excerpt}
              </p>
              <span
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: item.color }}
              >
                {t("noticiasLeerMas")}
                <ArrowRight size={15} />
              </span>
            </div>
          </Link>
        </AnimatedSection>
      ))}
    </div>
  );
}
