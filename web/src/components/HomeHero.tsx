'use client';

import Hero from "./Hero";
import { assetPath } from "@/lib/asset-path";
import { useTranslations } from "next-intl";

type HomeHeroProps = {
  title: string;
  subtitle: string;
  tag?: string;
  cta: React.ReactNode;
  secondary?: React.ReactNode;
  heroImage: string;
};

export default function HomeHero({
  title,
  subtitle,
  tag = "ASCEP",
  cta,
  secondary,
  heroImage,
}: HomeHeroProps) {
  const t = useTranslations("home");

  return (
    <Hero
      variant="home"
      bgColor="bg-atmospheric-teal"
      tag={tag}
      title={title}
      subtitle={subtitle}
      heroImage={assetPath(heroImage)}
      heroImageAlt="ASCEP team"
      badge={{ text: "2019", label: t("heroBadge") }}
      showScrollIndicator
    >
      {cta}
      {secondary}
    </Hero>
  );
}
