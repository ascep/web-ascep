'use client';

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

type MediaItem = {
  src: string;
  alt: string;
  type?: "image" | "video";
};

type ScrollRevealMediaProps = {
  items: MediaItem[];
  className?: string;
  containerHeight?: string;
};

export default function ScrollRevealMedia({
  items,
  className = "",
  containerHeight = "200vh",
}: ScrollRevealMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: containerHeight }}
    >
      <div className="sticky top-[15vh] flex h-[70vh] items-center justify-center">
        <div className="relative flex h-full w-full max-w-lg items-center justify-center">
          {items.map((item, i) => {
            const start = i / items.length;
            const end = (i + 1) / items.length;
            const range = [start, start + (end - start) * 0.8];

            const opacity = reducedMotion
              ? 1
              : useTransform(scrollYProgress, range, [0, 1]);
            const scale = reducedMotion
              ? 1
              : useTransform(scrollYProgress, range, [0.85, 1]);
            const y = reducedMotion
              ? 0
              : useTransform(scrollYProgress, range, [60, 0]);

            return (
              <motion.div
                key={i}
                style={{ opacity, scale, y }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="max-h-full max-w-full rounded-[10px] object-contain shadow-xl"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={500}
                    height={375}
                    className="max-h-full w-full rounded-[10px] object-cover shadow-xl"
                    style={{ aspectRatio: "4/3" }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
