'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

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

type CursorGlowProps = {
  className?: string;
  color?: string;
  size?: number;
  opacity?: number;
};

export default function CursorGlow({
  className = "",
  color = "rgba(1, 158, 159, 0.08)",
  size = 500,
  opacity = 0.6,
}: CursorGlowProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
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

  const handle = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (reducedMotion || isTouch) return;
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [reducedMotion, isTouch, handle]);

  if (reducedMotion || isTouch) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
      style={{
        background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent ${size * 0.6}px)`,
        opacity,
        transition: "background 0.08s ease-out",
      }}
    />
  );
}
