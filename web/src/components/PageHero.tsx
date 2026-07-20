'use client';

import Hero from "./Hero";

type PageHeroProps = {
  bgImage: string;
  bgColor?: string;
  tag?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export default function PageHero({
  bgImage,
  bgColor = "bg-brand-purple",
  tag,
  title,
  highlight,
  subtitle,
  children,
}: PageHeroProps) {
  return (
    <Hero
      variant="page"
      bgImage={bgImage}
      bgColor={bgColor}
      tag={tag}
      title={title}
      highlight={highlight}
      subtitle={subtitle}
    >
      {children}
    </Hero>
  );
}
