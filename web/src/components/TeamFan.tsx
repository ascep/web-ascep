"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type TeamMember = {
  name: string;
  role: string;
  src: string;
};

type TeamFanProps = {
  members: TeamMember[];
};

export default function TeamFan({ members }: TeamFanProps) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const count = members.length;

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % count);
  }, [count]);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [next, isPaused, prefersReducedMotion]);

  return (
    <div
      ref={sectionRef}
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex h-[440px] items-center justify-center overflow-hidden" style={{ perspective: 1200 }}>
        {members.map((member, i) => {
          const offset = ((i - active + count) % count);
          const isVisible = offset === 0 || offset === 1 || offset === count - 1;
          if (!isVisible) return null;

          let x = 0;
          let rotateZ = 0;
          let z = 0;
          let opacity = 0;
          let scale = 0.85;

          if (offset === 0) {
            x = 0;
            rotateZ = 0;
            z = 10;
            opacity = 1;
            scale = 1;
          } else if (offset === 1) {
            x = 220;
            rotateZ = 8;
            z = 5;
            opacity = 0.7;
            scale = 0.88;
          } else if (offset === count - 1) {
            x = -220;
            rotateZ = -8;
            z = 5;
            opacity = 0.7;
            scale = 0.88;
          }

          return (
            <motion.div
              key={member.name}
              animate={{
                x,
                rotateZ,
                scale,
                opacity,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="absolute w-[260px] cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md sm:w-[280px]"
              style={{ zIndex: z }}
              onClick={() => setActive(i)}
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

      <div className="mt-6 flex items-center justify-center">
        {members.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIsPaused(true); setActive(i); }}
            aria-label={`Ver miembro ${i + 1}`}
            className="flex min-h-11 min-w-11 items-center justify-center"
          >
            <span
              className={`block h-2 rounded-full transition-all ${
                i === active ? "w-8 bg-brand-secondary" : "w-2 bg-white/30"
              }`}
            />
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-[var(--color-text-muted)]">
        Haz clic o espera para conocer al equipo
      </p>
    </div>
  );
}
