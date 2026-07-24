'use client';

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, Play, X, Share2, Link as LinkIcon, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import CommentsPanel from "./Comments";

interface FeedItem {
  type: "youtube";
  src: string;
  videoId: string;
  title: string;
  desc: string;
  thumbnail: string;
}

function YouTubeSlide({ videoId, isActive }: { videoId: string; isActive: boolean }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!iframeRef.current) return;
    if (isActive) {
      iframeRef.current.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: "" }), "*");
    } else {
      iframeRef.current.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: "" }), "*");
    }
  }, [isActive]);

  return (
    <>
      <iframe ref={iframeRef}
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${videoId}`}
        allow="autoplay; encrypted-media; picture-in-picture"
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-elevated">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-blue border-t-transparent" />
        </div>
      )}
    </>
  );
}

function FeedSlide({ item, active, muted, onToggleMute }: { item: FeedItem; active: boolean; muted: boolean; onToggleMute: () => void }) {
  return (
    <>
      <YouTubeSlide videoId={item.videoId} isActive={active} />

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <button onClick={onToggleMute}
        className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur min-h-[44px] min-w-[44px]"
        aria-label={muted ? "Activar sonido" : "Silenciar"}
      >
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <div className="absolute inset-x-0 bottom-0 z-10 p-6 pb-8">
        <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
        <p className="mb-4 text-sm text-white/80">{item.desc}</p>
      </div>
    </>
  );
}

function SwipeFeed({ items, current, onGoTo, muted, onToggleMute, prefersReduced, fullscreen, onClose, onComment }: {
  items: FeedItem[]; current: number; onGoTo: (i: number) => void;
  muted: boolean; onToggleMute: () => void; prefersReduced: boolean;
  fullscreen?: boolean; onClose?: () => void; onComment?: () => void;
}) {
  const variants = {
    enter: (dir: number) => ({ y: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { y: "0%", opacity: 1 as const },
    exit: (dir: number) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const renderSlideContent = () => (
    <FeedSlide item={items[current]} active={true} muted={muted} onToggleMute={onToggleMute} />
  );

  return (
    <div className={`relative overflow-hidden bg-black ${fullscreen ? "h-full w-full" : "h-full w-full rounded-[10px]"}`}>
      {prefersReduced ? (
        <div className="absolute inset-0">{renderSlideContent()}</div>
      ) : (
        <AnimatePresence initial={false} custom={0} mode="popLayout">
          <motion.div
            key={current}
            custom={0}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ y: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
            className="absolute inset-0"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.3}
            onDragEnd={(_, info) => {
              const threshold = 80;
              if (info.offset.y < -threshold) onGoTo(current + 1);
              else if (info.offset.y > threshold) onGoTo(current - 1);
              else if (info.velocity.y < -500) onGoTo(current + 1);
              else if (info.velocity.y > 500) onGoTo(current - 1);
            }}
          >
            {renderSlideContent()}

            <div className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-1.5">
              {items.map((_, i) => (
                <button key={i} onClick={() => onGoTo(i)}
                  className={`h-2 rounded-full transition-all min-w-[6px] ${i === current ? "w-4 bg-white" : "w-2 bg-white/40 hover:bg-white/60"}`}
                  aria-label={`Ir al item ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {current === 0 && !prefersReduced && !fullscreen && (
        <div className="pointer-events-none absolute inset-x-0 bottom-20 z-20 flex animate-bounce justify-center">
          <div className="flex flex-col items-center gap-1 opacity-60">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">Desliza</span>
          </div>
        </div>
      )}

      {fullscreen && onClose && (
        <div className="absolute left-4 top-4 z-20 flex gap-2">
          <button onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur min-h-[44px] min-w-[44px]"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {fullscreen && (
        <div className="absolute bottom-24 right-4 z-20 flex flex-col gap-2">
          <button onClick={() => { navigator.share?.({ title: items[current].title, text: items[current].desc, url: window.location.href }); }}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg min-h-[44px] min-w-[44px]"
            aria-label="Compartir"
          >
            <Share2 size={20} />
          </button>
          <button onClick={() => { navigator.clipboard?.writeText(window.location.href); }}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg min-h-[44px] min-w-[44px]"
            aria-label="Copiar enlace"
          >
            <LinkIcon size={20} />
          </button>
          <button onClick={onComment}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg min-h-[44px] min-w-[44px]"
            aria-label="Comentar"
          >
            <MessageCircle size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function VerticalFeed({ playlistId }: { playlistId?: string }) {
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const prefersReduced = useReducedMotion() ?? false;

  useEffect(() => {
    const params = playlistId ? `?playlistId=${playlistId}` : "";
    fetch(`/api/youtube/videos${params}`).then((r) => r.json()).then((data) => {
      if (data?.videos?.length) {
        setItems(data.videos.map((v: { videoId: string; title: string; description: string; thumbnail: string }) => ({
          type: "youtube" as const, src: "", videoId: v.videoId, title: v.title,
          desc: v.description?.slice(0, 120) || "", thumbnail: v.thumbnail,
        })));
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [playlistId]);

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, items.length - 1));
    setCurrent(clamped);
  }, [items.length]);

  const containerHeight = typeof window !== "undefined" ? "calc(100dvh - 112px)" : "80vh";

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-blue border-t-transparent" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-text-muted">No hay videos disponibles</p>
      </div>
    );
  }

  return (
    <>
      <div className="md:hidden" style={{ height: containerHeight }}>
        <SwipeFeed items={items} current={current} onGoTo={goTo}
          muted={muted} onToggleMute={() => setMuted((m) => !m)} prefersReduced={prefersReduced} />
      </div>

      <div className="hidden md:block">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={item.videoId}
              className="overflow-hidden rounded-[10px] border border-border-subtle bg-bg-card transition-shadow hover:shadow-lg"
            >
              <button onClick={() => setFullscreenIndex(i)}
                className="group relative block aspect-video w-full text-left"
              >
                <Image src={item.thumbnail} alt={item.title} width={320} height={180} className="h-full w-full object-cover"
                  />
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-transform group-hover:scale-110">
                    <Play className="ml-0.5 h-6 w-6 text-white" fill="white" />
                  </div>
                </div>
              </button>
              <div className="p-4">
                <h3 className="text-sm font-bold text-brand-blue">{item.title}</h3>
                <p className="mt-1 text-xs text-text-secondary line-clamp-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CommentsPanel open={showComments} onClose={() => setShowComments(false)} />

      <AnimatePresence>
        {fullscreenIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] hidden md:flex flex-col bg-black"
          >
            <div className="absolute left-4 top-4 z-20">
              <button onClick={() => setFullscreenIndex(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 min-h-[44px] min-w-[44px]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center gap-4 px-4">
              <button onClick={() => setFullscreenIndex(Math.max(0, fullscreenIndex - 1))}
                disabled={fullscreenIndex === 0}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 disabled:opacity-20 min-h-[44px] min-w-[44px]"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <div className="relative w-full max-w-4xl">
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${items[fullscreenIndex].videoId}?autoplay=1&rel=0&modestbranding=1`}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    className="h-full w-full"
                    allowFullScreen
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-white">{items[fullscreenIndex].title}</h3>
                  <p className="mt-1 text-sm text-white/70">{items[fullscreenIndex].desc}</p>
                </div>
              </div>

              <button onClick={() => setFullscreenIndex(Math.min(items.length - 1, fullscreenIndex + 1))}
                disabled={fullscreenIndex >= items.length - 1}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 disabled:opacity-20 min-h-[44px] min-w-[44px]"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
