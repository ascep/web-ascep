"use client";

import { motion, useReducedMotion } from "motion/react";

const videos = [
  {
    title: "Transformando vidas",
    desc: "Conoce la historia de jovenes egresados del sistema de proteccion.",
    duration: "3:24",
  },
  {
    title: "Nuestro impacto",
    desc: "Resultados y logros de nuestros programas de acompanamiento.",
    duration: "2:15",
  },
  {
    title: "Ley Hijos del Estado",
    desc: "El proceso legislativo que cambio la vida de miles de jovenes.",
    duration: "4:30",
  },
  {
    title: "Testimonios",
    desc: "Egresados comparten su experiencia con ASCEP.",
    duration: "5:10",
  },
  {
    title: "Casas del Saber",
    desc: "Conoce nuestros espacios de formacion y encuentro.",
    duration: "2:45",
  },
  {
    title: "Unete a la causa",
    desc: "Como puedes sumarte y contribuir a nuestra mision.",
    duration: "1:50",
  },
];

export default function VideoGrid() {
  const prefersReduced = useReducedMotion();

  const animProps = (delay = 0) =>
    prefersReduced
      ? {}
      : ({
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] as const },
        } as const);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video, i) => (
        <motion.div
          key={video.title}
          {...animProps(0.1 * i)}
          className="group cursor-pointer overflow-hidden rounded-[10px] border border-border-subtle bg-bg-card transition-shadow hover:shadow-lg"
        >
          <div className="relative aspect-video bg-gradient-to-br from-brand-purple/30 to-brand-teal/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-transform group-hover:scale-110">
                <svg
                  className="ml-0.5 h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
              {video.duration}
            </div>
          </div>
          <div className="p-4">
            <h3 className="mb-1 text-sm font-bold text-text-primary">
              {video.title}
            </h3>
            <p className="text-xs text-text-muted">{video.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
