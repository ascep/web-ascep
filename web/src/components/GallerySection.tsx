'use client';

import { useState, useRef, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import Image from "next/image";
import { Expand } from "lucide-react";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import GalleryLightbox from "@/components/GalleryLightbox";

type GalleryImage = { src: string; alt: string };

type GallerySectionProps = {
  tag: string;
  title: string;
  images: GalleryImage[];
  bgImage?: string;
};

const BENTO = [
  { col: "md:col-span-2 md:row-span-2", h: "h-64 md:h-full" },
  { col: "", h: "h-44 md:h-[calc(50%-4px)]" },
  { col: "", h: "h-44 md:h-[calc(50%-4px)]" },
  { col: "", h: "h-52" },
  { col: "", h: "h-52" },
  { col: "", h: "h-52" },
  { col: "md:col-span-2", h: "h-44" },
  { col: "", h: "h-44" },
];

const DIRS = [
  { y: 50, x: 0, s: 0.94 },
  { y: 0, x: 40, s: 0.96 },
  { y: 0, x: -40, s: 0.96 },
  { y: 40, x: 0, s: 0.95 },
  { y: 0, x: 30, s: 0.96 },
  { y: 30, x: 0, s: 0.95 },
  { y: 0, x: -30, s: 0.96 },
  { y: 40, x: 0, s: 0.95 },
];

function Card({
  img,
  i,
  bento,
  dir,
  reduced,
  onOpen,
}: {
  img: GalleryImage;
  i: number;
  bento: (typeof BENTO)[0];
  dir: (typeof DIRS)[0];
  reduced: boolean;
  onOpen: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - r.left - r.width / 2) / r.width) * 12);
      my.set(((e.clientY - r.top - r.height / 2) / r.height) * 12);
    },
    [reduced, mx, my]
  );

  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: dir.y, x: dir.x, scale: dir.s }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: reduced ? 0 : 0.1 + i * 0.08, ease: [0.23, 1, 0.32, 1] }}
      whileHover={reduced ? {} : { y: -6, scale: 1.015, rotateX: -3, rotateY: 3 }}
      className={`group relative cursor-pointer overflow-hidden perspective-[1200px] ${bento.col}`}
      onClick={() => onOpen(i)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(i);
        }
      }}
      aria-label={`Ver imagen: ${img.alt}`}
    >
      <div className="relative h-full overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
        <motion.div
          style={reduced ? {} : { x: sx, y: sy }}
          className="h-full will-change-transform"
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={i === 0 ? 900 : 500}
            height={i === 0 ? 600 : 333}
            className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${bento.h}`}
            priority={i < 2}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

        {/* Brand border glow */}
        <div className="pointer-events-none absolute inset-0 border-2 border-transparent transition-colors duration-500 group-hover:border-brand-primary/50" />

        {/* Caption + icon */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center bg-white/15 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
            <Expand size={22} className="m-auto text-white" />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-sm font-semibold text-white drop-shadow-lg">{img.alt}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function GallerySection({ tag, title, images, bgImage }: GallerySectionProps) {
  const [lbIdx, setLbIdx] = useState(-1);
  const open = lbIdx >= 0;
  const secRef = useRef<HTMLDivElement>(null);
  const inView = useInView(secRef, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <>
      <section
        ref={secRef}
        className="section-dark relative overflow-hidden bg-purple-bg py-24 section-bg-image"
        style={bgImage ? ({ "--section-bg-image": `url(${bgImage})` } as React.CSSProperties) : undefined}
      >
        <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
        <DecoShapes variant="orange" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.span
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mb-3 block text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/80"
          >
            {tag}
          </motion.span>
          <motion.h2
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="mb-12 text-center text-3xl font-bold text-white"
          >
            {title}
          </motion.h2>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-2">
            {images.map((img, i) => (
              <Card
                key={img.src}
                img={img}
                i={i}
                bento={BENTO[i] || BENTO[BENTO.length - 1]}
                dir={DIRS[i] || DIRS[DIRS.length - 1]}
                reduced={!!reduced}
                onOpen={setLbIdx}
              />
            ))}
          </div>
        </div>
      </section>

      <GalleryLightbox
        images={images}
        index={lbIdx}
        open={open}
        onClose={() => setLbIdx(-1)}
        onPrev={() => setLbIdx((p) => (p - 1 + images.length) % images.length)}
        onNext={() => setLbIdx((p) => (p + 1) % images.length)}
      />
    </>
  );
}
