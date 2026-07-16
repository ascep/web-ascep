"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

type ParallaxSectionProps = {
  children: React.ReactNode;
  bgImage: string;
  className?: string;
  overlay?: string;
};

export default function ParallaxSection({
  children,
  bgImage,
  className = "py-20",
  overlay = "bg-black/60",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      {prefersReducedMotion ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      ) : (
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})`, y }}
        />
      )}
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
