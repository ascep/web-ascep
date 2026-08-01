'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

interface VideoData {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
}

export default function PodcastSection() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState<VideoData | null>(null);
  const [page, setPage] = useState(0);
  const perPage = 6;

  useEffect(() => {
    fetch("/api/youtube/videos?playlistId=" + encodeURIComponent(process.env.NEXT_PUBLIC_YOUTUBE_PODCAST_PLAYLIST_ID || "PLK_J5-xSTOJ0"))
      .then((r) => r.json()).then((data) => {
        if (data?.videos?.length) setVideos(data.videos);
        setLoading(false);
      }).catch(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(videos.length / perPage);
  const paginated = videos.slice(page * perPage, (page + 1) * perPage);

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center">
        <p className="text-white/50">No hay podcasts disponibles</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginated.map((video) => (
          <div key={video.videoId}
            className="glass-card overflow-hidden rounded-[10px] transition-all hover:bg-white/15"
          >
            <button onClick={() => setCurrentVideo(video)}
              className="group relative block aspect-video w-full text-left"
            >
              <Image src={video.thumbnail} alt={video.title} width={320} height={180} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-transform group-hover:scale-110">
                  <Play className="ml-0.5 h-6 w-6 text-white" fill="white" />
                </div>
              </div>
            </button>
            <div className="p-4">
              <h3 className="text-sm font-bold text-white line-clamp-2">{video.title}</h3>
              {video.description && (
                <p className="mt-1 text-xs text-[var(--color-text-muted)] line-clamp-2">{video.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:bg-white/10 disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm text-white/60">{page + 1} / {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:bg-white/10 disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {currentVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setCurrentVideo(null)}>
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setCurrentVideo(null)}
              className="absolute -right-3 -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-lg">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1&rel=0&modestbranding=1`}
                allow="autoplay; encrypted-media; picture-in-picture"
                className="h-full w-full rounded-[10px]"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
