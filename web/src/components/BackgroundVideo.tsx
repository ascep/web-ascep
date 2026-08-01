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

function subscribeDesktop(onStoreChange: () => void) {
  const mq = window.matchMedia("(min-width: 768px)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getDesktopSnapshot() {
  return window.matchMedia("(min-width: 768px)").matches;
}

function getDesktopServerSnapshot() {
  return true;
}

type BackgroundVideoProps = {
  src: string;
  poster: string;
  className?: string;
  disableOnMobile?: boolean;
};

export default function BackgroundVideo({
  src,
  poster,
  className = "",
  disableOnMobile = false,
}: BackgroundVideoProps) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getDesktopServerSnapshot
  );

  if (reducedMotion || (disableOnMobile && !isDesktop)) {
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
