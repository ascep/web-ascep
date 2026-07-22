"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

type TeamMember = {
  name: string;
  role: string;
  src: string;
};

type TeamFanProps = {
  members: TeamMember[];
};

export default function TeamFan({ members }: TeamFanProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const count = members.length;
  const perCard = 1 / count;

  return (
    <div ref={sectionRef} className="relative" style={{ height: `${count * 80}vh` }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="relative flex h-[420px] w-full max-w-md items-center justify-center" style={{ perspective: 1200 }}>
          {members.map((member, i) => {
            const start = i * perCard;
            const end = start + perCard;
            const mid = start + perCard / 2;

            const opacity = useTransform(
              scrollYProgress,
              [start - 0.05, start, mid, end, end + 0.05],
              prefersReducedMotion ? [1, 1, 1, 1, 1] : [0, 1, 1, 1, 0]
            );
            const scale = useTransform(
              scrollYProgress,
              [start - 0.05, start, mid, end, end + 0.05],
              prefersReducedMotion ? [1, 1, 1, 1, 1] : [0.8, 0.9, 1, 0.9, 0.8]
            );
            const x = useTransform(
              scrollYProgress,
              [start - 0.05, start, mid, end, end + 0.05],
              prefersReducedMotion
                ? [0, 0, 0, 0, 0]
                : [((count - i) / count) * 120, 0, 0, 0, -((count - i) / count) * 120]
            );
            const rotateZ = useTransform(
              scrollYProgress,
              [start - 0.05, start, mid, end, end + 0.05],
              prefersReducedMotion
                ? [0, 0, 0, 0, 0]
                : [((count - i) * 6), 0, 0, 0, -((count - i) * 6)]
            );
            const zIndex = useTransform(
              scrollYProgress,
              [start, mid, end],
              [0, count + 10, 0]
            );

            return (
              <motion.div
                key={member.name}
                className="absolute w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md"
                style={{
                  opacity,
                  scale,
                  x,
                  rotateZ,
                  zIndex,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="relative h-[340px] w-full">
                  <Image
                    src={member.src}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h4 className="text-lg font-bold text-white">
                    {member.name}
                  </h4>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-brand-secondary">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <p className="text-xs text-[var(--color-text-muted)]">
            Scroll para conocer al equipo
          </p>
        </div>
      </div>
    </div>
  );
}
