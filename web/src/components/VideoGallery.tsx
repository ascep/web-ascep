"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { X, Play, Video } from "lucide-react";
import type { VideoEntryView } from "@/lib/sanity/fetch";

type VideoGalleryProps = {
  videos: VideoEntryView[];
  tabs: Array<{ id: string; label: string }>;
  fallbackCount?: number;
};

export default function VideoGallery({ videos, tabs, fallbackCount = 0 }: VideoGalleryProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");
  const [playing, setPlaying] = useState<VideoEntryView | null>(null);

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPlaying(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [playing]);

  const activeVideos = videos.filter((v) => v.category === activeTab);
  const empty = activeVideos.length === 0 && fallbackCount === 0;

  return (
    <div>
      <div role="tablist" aria-label="Videos" className="mb-10 flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => {
          const count = tab.id === "all"
            ? videos.length
            : videos.filter((v) => v.category === tab.id).length;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-label={tab.label}
              onClick={() => setActiveTab(tab.id)}
              className={`flex min-h-[44px] items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? "border-brand-purple bg-brand-purple text-white shadow-md"
                  : "border-brand-purple/30 bg-transparent text-[var(--color-text-primary)] hover:border-brand-purple/60"
              }`}
            >
              {tab.label}
              <span className={`text-xs ${isActive ? "text-white/80" : "text-brand-purple"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {empty ? (
        <p className="text-center text-sm text-[var(--color-text-muted)]">Proximamente</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeVideos.map((video, i) => (
            <motion.button
              key={video._id}
              type="button"
              onClick={() => setPlaying(video)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
              className="group relative block min-h-[44px] w-full overflow-hidden rounded-[10px] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-200">
                {video.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-brand-purple/10">
                    <Video size={40} className="text-brand-purple" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play size={24} className="ml-0.5 text-brand-purple" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h4 className="line-clamp-2 font-bold text-[var(--color-text-primary)]">
                  {video.title}
                </h4>
                {video.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-[var(--color-text-secondary)]">
                    {video.description}
                  </p>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {playing && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={playing.title}
          onClick={() => setPlaying(null)}
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setPlaying(null)}
            className="absolute right-4 top-4 flex h-11 w-11 min-h-[44px] items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            <X size={22} />
          </button>
          <div
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video w-full overflow-hidden rounded-[10px] bg-black">
              {playing.youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${playing.youtubeId}?autoplay=1`}
                  title={playing.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : playing.videoUrl ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video src={playing.videoUrl} controls autoPlay className="h-full w-full" />
              ) : null}
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">{playing.title}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
