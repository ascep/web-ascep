'use client';

import { motion } from "motion/react";
import Image from "next/image";

type LogoLoopProps = {
  logos: { src: string; alt: string }[];
};

export default function LogoLoop({ logos }: LogoLoopProps) {
  const doubled = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex items-center gap-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {doubled.map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="flex shrink-0 items-center justify-center"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={140}
              height={60}
              className="h-14 w-auto object-contain opacity-50 transition-opacity hover:opacity-100"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
