import HeroSlideshow, { type HeroCta } from "./HeroSlideshow";

export type { HeroCta };

export type DossierAccent = "cyan" | "orange" | "yellow" | "teal" | "purple";

type DossierHeroProps = {
  images: string[];
  tag: string;
  title: string;
  highlight?: string;
  subtitle: string;
  accent?: DossierAccent;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  children?: React.ReactNode;
};

export default function DossierHero({
  images,
  tag,
  title,
  highlight,
  subtitle,
  accent = "cyan",
  primaryCta,
  secondaryCta,
  children,
}: DossierHeroProps) {
  return (
    <HeroSlideshow
      images={images}
      tag={tag}
      title={title}
      highlight={highlight}
      subtitle={subtitle}
      accent={accent}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
    >
      {children}
    </HeroSlideshow>
  );
}
