'use client';

import Hero from "./Hero";
import { assetPath } from "@/lib/asset-path";
import { fotos } from "@/data/fotos";
import { useTranslations } from "next-intl";

type HomeHeroProps = {
  title: string;
  subtitle: string;
  tag?: string;
  cta: React.ReactNode;
  secondary?: React.ReactNode;
};

export default function HomeHero({
  title,
  subtitle,
  tag = "ASCEP",
  cta,
  secondary,
}: HomeHeroProps) {
  const t = useTranslations("home");

  return (
    <Hero
      variant="home"
      bgColor="bg-brand-purple"
      tag={tag}
      title={title}
      subtitle={subtitle}
      heroImage={assetPath(fotos.home.heroImage)}
      heroImageAlt="ASCEP team"
      badge={{ text: "2019", label: t("heroBadge") }}
      videoSrc={assetPath("/videos/FONDO-WEB-16-9.mp4")}
      videoPoster={assetPath(fotos.home.heroPoster)}
      showScrollIndicator
    >
      {cta}
      {secondary}
    </Hero>
  );
}
