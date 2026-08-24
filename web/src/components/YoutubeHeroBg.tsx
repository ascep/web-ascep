"use client";

import { extractYouTubeId } from "@/data/homeVideos";
import { useEffect, useRef, useState } from "react";

type YoutubeHeroBgProps = {
  videoUrl: string;
  fallbackImage?: string;
  gradient?: string;
  startAt?: number;
};

export default function YoutubeHeroBg({
  videoUrl,
  fallbackImage,
  gradient = "linear-gradient(to top, rgba(10,16,32,0.45) 0%, transparent 50%)",
  startAt,
}: YoutubeHeroBgProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [thumbFaded, setThumbFaded] = useState(false);
  const ytId = extractYouTubeId(videoUrl);

  const thumbUrl = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null;

  useEffect(() => {
    if (!ref.current || !ytId) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowVideo(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ytId]);

  useEffect(() => {
    if (!showVideo || !ytId) return;
    const t = setTimeout(() => setThumbFaded(true), 4000);
    return () => clearTimeout(t);
  }, [showVideo, ytId]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {ytId && showVideo && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&iv_load_policy=3&modestbranding=1&rel=0&playsinline=1&disablekb=1&vq=hd1080&enablejsapi=1${startAt ? `&start=${startAt}` : ""}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: "177.78vh", height: "100vh", minWidth: "100%", minHeight: "56.25vw", pointerEvents: "none" }}
          allow="autoplay; encrypted-media"
        />
      )}

      {(thumbUrl || fallbackImage) && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url("${thumbUrl || fallbackImage}")`,
            opacity: thumbFaded ? 0 : 1,
          }}
        />
      )}

      <div aria-hidden="true" className="absolute inset-0 z-[1]" style={{ background: gradient }} />
    </div>
  );
}
