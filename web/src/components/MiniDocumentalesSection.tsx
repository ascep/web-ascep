"use client";

import AnimatedSection from "@/components/AnimatedSection";
import VideoFacade from "@/components/VideoFacade";

export type MiniDoc = {
  youtubeId: string;
  title: string;
  desc?: string;
};

type MiniDocumentalesSectionProps = {
  tag: string;
  title: string;
  desc?: string;
  docs: MiniDoc[];
};

export default function MiniDocumentalesSection({
  tag,
  title,
  desc,
  docs,
}: MiniDocumentalesSectionProps) {
  if (docs.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-section-light py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full border border-brand-accent/30 bg-brand-accent/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
            {tag}
          </span>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
            {title}
          </h2>
          {desc && (
            <p className="mx-auto mt-3 max-w-2xl text-[var(--color-text-secondary)]">
              {desc}
            </p>
          )}
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc, i) => (
            <AnimatedSection key={doc.youtubeId} direction="up" delay={i * 0.08}>
              <div className="h-full">
                <VideoFacade
                  youtubeId={doc.youtubeId}
                  title={doc.title}
                  showTitle
                />
                {doc.desc && (
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                    {doc.desc}
                  </p>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
