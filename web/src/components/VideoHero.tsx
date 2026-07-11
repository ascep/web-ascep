'use client';

import { motion } from "motion/react";
import Rain from "./Rain";

type VideoHeroProps = {
  title: string;
  subtitle: string;
  cta?: React.ReactNode;
  videoSrc: string;
};

export default function VideoHero({ title, subtitle, cta, videoSrc }: VideoHeroProps) {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        poster="/logos/03 logo ascep principal horizontal.png"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <Rain opacity={0.08} count={60} speed={0.6} />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/70 to-black/70" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-brand-orange"
          >
            ASCEP
          </motion.p>
          <h1 className="mb-6 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="mb-8 text-lg text-white/80 sm:text-xl"
          >
            {subtitle}
          </motion.p>
          {cta && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {cta}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
