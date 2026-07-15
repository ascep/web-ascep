'use client';

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Image from "next/image";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
  image?: string;
};

type TimelineProps = {
  items: TimelineItem[];
};

export default function Timeline({ items }: TimelineProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [0, 1]);

  return (
    <section ref={containerRef} className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute left-4 top-0 h-full w-px bg-[var(--color-border-subtle)] sm:left-1/2 sm:-translate-x-1/2" />
      <motion.div
        className="absolute left-4 top-0 w-px origin-top bg-brand-purple sm:left-1/2 sm:-translate-x-1/2"
        style={{ scaleY: lineScaleY }}
      />
      <div className="relative space-y-16">
        {items.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={item.year}
              initial={prefersReducedMotion ? {} : { opacity: 0, x: isLeft ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className={`relative flex items-start pl-10 sm:pl-0 ${
                isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
            >
              <div className="hidden sm:block sm:w-1/2" />
              <div className="absolute left-0 top-1 flex items-center justify-center sm:left-1/2 sm:-translate-x-1/2">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.12 + 0.2,
                    type: "spring",
                    stiffness: 250,
                    damping: 18,
                  }}
                  className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-brand-purple bg-[var(--color-bg-base)] sm:h-5 sm:w-5"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-purple sm:h-2 sm:w-2" />
                </motion.div>
              </div>
              <div className={`sm:w-1/2 ${isLeft ? "sm:pr-10 sm:text-right" : "sm:pl-10"}`}>
                <div className={`flex flex-col gap-4 ${isLeft ? "sm:flex-row-reverse" : "sm:flex-row"}`}>
                  {item.image && (
                    <div className={`shrink-0 ${isLeft ? "sm:ml-auto" : ""}`}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={160}
                        height={120}
                        className="rounded-[10px] object-cover shadow-sm"
                        style={{ aspectRatio: "4/3" }}
                      />
                    </div>
                  )}
                  <div>
                    <span className="mb-1 block text-xs font-semibold tracking-widest text-text-primary uppercase sm:text-sm">
                      {item.year}
                    </span>
                    <h3 className="text-base font-bold text-[var(--color-text-primary)] sm:text-lg">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">{item.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
