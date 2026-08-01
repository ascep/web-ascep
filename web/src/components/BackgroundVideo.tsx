"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";

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

type BackgroundVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

export default function BackgroundVideo({ src, poster, className = "" }: BackgroundVideoProps) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  if (reducedMotion) {
    return <Image src={poster} alt="" fill sizes="100vw" priority className={`object-cover ${className}`} />;
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
