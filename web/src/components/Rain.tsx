'use client';

import { useEffect, useRef } from "react";

type RainProps = {
  opacity?: number;
  count?: number;
  speed?: number;
  color?: string;
};

export default function Rain({
  opacity = 0.12,
  count = 120,
  speed = 1,
  color = "#FFFFFF",
}: RainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let drops: { x: number; y: number; len: number; vy: number; wind: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      drops = [];
      for (let i = 0; i < count; i++) {
        drops.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          len: 8 + Math.random() * 12,
          vy: (4 + Math.random() * 6) * speed,
          wind: -1 + Math.random() * 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = opacity;

      for (const drop of drops) {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + drop.wind * 3, drop.y + drop.len);
        ctx.stroke();

        drop.x += drop.wind * speed;
        drop.y += drop.vy;

        if (drop.y > canvas.height) {
          drop.y = -drop.len;
          drop.x = Math.random() * canvas.width;
        }
        if (drop.x > canvas.width + 10) drop.x = -10;
        if (drop.x < -10) drop.x = canvas.width + 10;
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [opacity, count, speed, color]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10"
      aria-hidden="true"
    />
  );
}
