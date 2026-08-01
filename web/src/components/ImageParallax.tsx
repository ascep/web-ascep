'use client';

import { useRef, useEffect, useSyncExternalStore } from "react";
import { motion, useSpring } from "motion/react";
import Image from "next/image";

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function subscribeTouch() {
  return () => {};
}

function getTouchSnapshot() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

function getTouchServerSnapshot() {
  return false;
}

type ImageParallaxProps = {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  intensity?: number;
  sizes?: string;
  style?: React.CSSProperties;
};

export default function ImageParallax({
  src,
  alt,
  className = "",
  containerClassName = "",
  width,
  height,
  fill = false,
  priority = false,
  intensity = 0.3,
  sizes,
  style,
}: ImageParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const isTouch = useSyncExternalStore(
    subscribeTouch,
    getTouchSnapshot,
    getTouchServerSnapshot
  );

  const x = useSpring(0, { stiffness: 120, damping: 20 });
  const y = useSpring(0, { stiffness: 120, damping: 20 });

  useEffect(() => {
    if (reducedMotion || isTouch) return;

    const el = ref.current;
    if (!el) return;

    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      x.set(dx * intensity * 40);
      y.set(dy * intensity * 40);
    };

    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [reducedMotion, isTouch, intensity, x, y]);

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${containerClassName}`}
      style={style}
    >
      <motion.div
        style={reducedMotion || isTouch ? {} : { x, y }}
        className="h-full w-full will-change-transform"
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover ${className}`}
            priority={priority}
            sizes={sizes}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width || 600}
            height={height || 450}
            className={className}
            priority={priority}
            sizes={sizes}
          />
        )}
      </motion.div>
    </div>
  );
}
