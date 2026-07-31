import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import AnimatedSection from "@/components/AnimatedSection";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import VideoGallery from "@/components/VideoGallery";
import type { VideoEntryView } from "@/lib/sanity/fetch";

type ProgramVideosSectionProps = {
  videos: VideoEntryView[];
  tabs: Array<{ id: string; label: string }>;
  bgImage: string;
  locale: string;
};

export default async function ProgramVideosSection({
  videos,
  tabs,
  bgImage,
  locale,
}: ProgramVideosSectionProps) {
  const t = await getTranslations({ locale, namespace: "programas" });

  return (
    <section
      className="section-bg-image section-dark relative overflow-hidden bg-purple-bg py-20"
      style={{ "--section-bg-image": `url(${bgImage})` } as CSSProperties}
    >
      <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
      <DecoShapes variant="mixed" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            {t("videosTag")}
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t.rich("videosTitle", { span: (c) => <span className="text-white/80">{c}</span> })}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            {t("videosDesc")}
          </p>
        </AnimatedSection>
        <VideoGallery videos={videos} tabs={tabs} />
      </div>
    </section>
  );
}
