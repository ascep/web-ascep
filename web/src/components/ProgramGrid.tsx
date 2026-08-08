import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import AnimatedSection from "./AnimatedSection";

export type ProgramCard = {
  title: string;
  slug: string;
  desc: string;
  logo: string;
  image: string;
  color: string;
  href?: string;
};

type ProgramGridProps = {
  programs: ProgramCard[];
  locale: string;
};

export default async function ProgramGrid({ programs, locale }: ProgramGridProps) {
  const t = await getTranslations({ locale, namespace: "programas" });

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {programs.map((program, i) => (
        <AnimatedSection key={program.slug} direction="up" delay={i * 0.06}>
          <Link
            href={program.href ?? `/${locale}/programas/${program.slug}`}
            className="group block overflow-hidden rounded-[10px] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="aspect-[16/9] overflow-hidden">
              <div className="relative h-full w-full">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="p-5">
              <span
                className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: program.color }}
              >
                {t("pillPrograma")}
              </span>
              <h3 className="mb-2 text-base font-bold text-[var(--color-text-primary)] line-clamp-2">
                {program.title}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {program.desc}
              </p>
              <span
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: program.color }}
              >
                {t("leerMas")}
                <ArrowRight size={15} />
              </span>
            </div>
          </Link>
        </AnimatedSection>
      ))}
    </div>
  );
}
