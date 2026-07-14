import { HeroSkeleton, SectionSkeleton, StatsSkeleton } from "@/components/Skeleton";

export default function LocaleLoading() {
  return (
    <div className="animate-[fadeIn_0.3s_ease-in]">
      <HeroSkeleton />
      <SectionSkeleton rows={2} />
      <StatsSkeleton />
    </div>
  );
}
