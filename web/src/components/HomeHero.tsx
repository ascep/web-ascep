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
  heroPoster: string;
  heroImage: string;
};

export default function HomeHero({
  title,
  subtitle,
  tag = "ASCEP",
  cta,
  secondary,
  heroPoster,
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
      videoSrc={assetPath("/videos/FONDO-WEB-16-9.mp4")}
      videoPoster={assetPath(heroPoster)}
      showScrollIndicator
    >
      {cta}
      {secondary}
    </Hero>
  );
}
