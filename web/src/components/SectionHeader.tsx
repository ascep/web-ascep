import AnimatedSection from "./AnimatedSection";

type SectionAccent = "cyan" | "orange" | "yellow" | "teal" | "purple" | "white";

type SectionHeaderProps = {
  tag?: string;
  title: string;
  highlight?: string;
  desc?: string;
  align?: "left" | "center";
  accent?: SectionAccent;
  dark?: boolean;
};

const accentStyles: Record<SectionAccent, { pill: string; highlight: string }> = {
  cyan: { pill: "border-ley-cyan/40 text-ley-cyan", highlight: "text-ley-cyan" },
  orange: { pill: "border-ley-orange/40 text-ley-orange", highlight: "text-ley-orange" },
  yellow: { pill: "border-ley-yellow/40 text-ley-yellow", highlight: "text-ley-yellow" },
  teal: { pill: "border-ley-teal/40 text-ley-teal", highlight: "text-ley-teal" },
  purple: { pill: "border-ley-purple/30 text-ley-purple", highlight: "text-ley-purple" },
  white: { pill: "border-white/30 text-white/80", highlight: "text-white/80" },
};

export default function SectionHeader({
  tag,
  title,
  highlight,
  desc,
  align = "center",
  accent = "teal",
  dark = false,
}: SectionHeaderProps) {
  const alignCls = align === "center" ? "mx-auto text-center" : "text-left";
  const titleCls = dark ? "text-white" : "text-text-primary";
  const accentCls = accentStyles[accent];

  return (
    <AnimatedSection className={`mb-12 max-w-2xl ${alignCls}`}>
      {tag && (
        <span
          className={`mb-3 inline-block rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${accentCls.pill}`}
        >
          {tag}
        </span>
      )}
      <h2 className={`text-3xl font-bold sm:text-4xl ${titleCls}`}>
        {title}
        {highlight && <span className={accentCls.highlight}> {highlight}</span>}
      </h2>
      {desc && (
        <p className={`mt-4 text-base leading-relaxed ${dark ? "text-purple-100" : "text-text-secondary"}`}>
          {desc}
        </p>
      )}
    </AnimatedSection>
  );
}
