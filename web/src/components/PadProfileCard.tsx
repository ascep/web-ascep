"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "motion/react";
import { imageUrl } from "@/lib/sanity/image";
import type { PadrinoProfile } from "@/lib/sanity/fetch";

function localize(obj: any, locale: string): string | undefined {
  if (!obj) return undefined;
  return obj[locale] ?? obj.es;
}

const borderColors = [
  "border-brand-primary",
  "border-brand-orange",
  "border-brand-teal",
];

const accentColors = [
  "text-brand-primary",
  "text-brand-orange",
  "text-brand-teal",
];

const hoverAccents = [
  "hover:bg-brand-primary",
  "hover:bg-brand-orange",
  "hover:bg-brand-teal",
];

export default function PadProfileCard({
  profile,
  index,
}: {
  profile: PadrinoProfile;
  index: number;
}) {
  const locale = useLocale();
  const name = localize(profile.name, locale) || "";
  const shortBio = localize(profile.shortBio, locale) || "";
  const age = profile.age;
  const city = localize(profile.city, locale) || "";
  const slug = profile.slug?.current || "";
  const borderColor = borderColors[index % borderColors.length];
  const accentColor = accentColors[index % accentColors.length];
  const hoverAccent = hoverAccents[index % hoverAccents.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={`/${locale}/como-ayudar/plan-padrino/${slug}`}
        className={`flex h-full flex-col rounded-[10px] border-2 ${borderColor}/10 bg-white p-5 shadow-sm transition-all hover:shadow-md`}
      >
        <div className="mb-3 flex items-center gap-3">
          <div className={`h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 ${borderColor} bg-white`}>
            {profile.photo ? (
              <img
                src={imageUrl(profile.photo, 200, 200) || ""}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className={`flex h-full w-full items-center justify-center text-lg font-bold ${accentColor}`}>
                {name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h4 className={`font-bold ${accentColor}`}>{name}</h4>
            {age && (
              <span className="text-xs text-[var(--color-text-muted)]">
                {age} {locale === "en" ? (age === 1 ? "year" : "years") : locale === "pt" ? (age === 1 ? "ano" : "anos") : (age === 1 ? "ano" : "anos")}
                {city && ` - ${city}`}
              </span>
            )}
          </div>
        </div>
        <p className="mb-4 flex-grow text-sm leading-relaxed text-[var(--color-text-secondary)]">
          &ldquo;{shortBio}&rdquo;
        </p>
        <span className={`mt-auto block w-full rounded-[10px] ${accentColor.replace("text-", "bg-")} py-2 text-center text-sm font-bold text-white transition-colors ${hoverAccent.replace("hover:", "hover:bg-")}-dark`}>
          {locale === "en" ? "Learn Their Story" : locale === "pt" ? "Conhecer Historia" : "Conocer Historia"}
        </span>
      </Link>
    </motion.div>
  );
}
