"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";

type LogoRingProps = {
  logos: { src: string; alt: string }[];
};

export default function LogoRing({ logos }: LogoRingProps) {
  const count = logos.length;
  const angleStep = 360 / count;
  const radius = count <= 4 ? 200 : count <= 6 ? 260 : 320;

  const rawY = useMotionValue(0);
  const rotationY = useSpring(rawY, { stiffness: 80, damping: 20 });
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startRotation = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoAngle, setAutoAngle] = useState(0);

  useEffect(() => {
    if (isDragging.current) return;
    const id = setInterval(() => {
      setAutoAngle((prev) => prev - 0.15);
    }, 16);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!isDragging.current) {
      rawY.set(autoAngle);
    }
  }, [autoAngle, rawY]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startRotation.current = rawY.get();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    rawY.set(startRotation.current + dx * 0.4);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    setAutoAngle(rawY.get());
  };

  const rotateX = useTransform(rotationY, () => -8);

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        ref={containerRef}
        className="relative h-[340px] w-full cursor-grab active:cursor-grabbing"
        style={{ perspective: 1000 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <motion.div
          className="absolute left-1/2 top-1/2"
          style={{
            transformStyle: "preserve-3d",
            rotateX,
            rotateY: rotationY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          {logos.map((logo, i) => (
            <div
              key={`${logo.alt}-${i}`}
              className="absolute left-0 top-0 -ml-[70px] -mt-[30px]"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${i * angleStep}deg) translateZ(${radius}px)`,
              }}
            >
              <div className="flex h-[60px] w-[140px] items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:border-brand-primary/30 hover:bg-white/10">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={48}
                  className="h-10 w-auto object-contain opacity-60 transition-opacity hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <p className="text-center text-xs text-[var(--color-text-muted)]">
        Arrastra para explorar
      </p>
    </div>
  );
}
