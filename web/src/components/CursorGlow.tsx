'use client';

import { useEffect, useState, useCallback } from "react";

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
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

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
