"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useReducedMotion } from "motion/react";

export type VideoFacadeProps = {
  youtubeId: string;
  title: string;
  thumbnail?: string;
  className?: string;
  sizes?: string;
  showTitle?: boolean;
};

function extractYouTubeId(input: string): string {
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
  try {
    const url = new URL(input.includes("://") ? input : `https://${input}`);
    if (url.hostname.includes("youtu.be")) return url.pathname.slice(1).split("?")[0];
    return url.searchParams.get("v") || "";
  } catch {
    return input;
  }
}

export default function VideoFacade({
  youtubeId,
  title,
  thumbnail,
  className = "",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  showTitle = false,
}: VideoFacadeProps) {
  const [playing, setPlaying] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const id = extractYouTubeId(youtubeId);
  const thumbSrc =
    thumbnail || `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  if (playing) {
    return (
      <div className={`relative aspect-video w-full overflow-hidden rounded-[10px] bg-black ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className={`group relative block w-full overflow-hidden rounded-[10px] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${className}`}
      aria-label={`Reproducir: ${title}`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-200">
        <Image
          src={thumbSrc}
          alt={title}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/35" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 ${
              prefersReducedMotion ? "" : "group-hover:scale-110"
            }`}
          >
            <Play size={24} className="ml-0.5 text-brand-primary" />
          </div>
        </div>
      </div>
      {showTitle && (
        <p className="mt-2 line-clamp-2 text-sm font-semibold text-[var(--color-text-primary)]">
          {title}
        </p>
      )}
    </button>
  );
}
