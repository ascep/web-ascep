'use client';

import { useReducedMotion } from "motion/react";

type Shape = {
  type: "circle" | "blob" | "ring";
  size: number;
  x: string;
  y: string;
  color: string;
  opacity?: number;
  blur?: number;
  float?: boolean;
};

type DecoShapesProps = {
  variant?: "teal" | "orange" | "mixed" | "subtle";
  className?: string;
};

const variants: Record<string, Shape[]> = {
  teal: [
    { type: "circle", size: 400, x: "-10%", y: "-10%", color: "var(--color-brand-primary)", opacity: 0.05, blur: 80 },
    { type: "circle", size: 250, x: "70%", y: "60%", color: "var(--color-brand-secondary)", opacity: 0.04, blur: 60 },
    { type: "ring", size: 500, x: "50%", y: "20%", color: "var(--color-brand-primary)", opacity: 0.03, blur: 100 },
  ],
  orange: [
    { type: "circle", size: 350, x: "80%", y: "-5%", color: "var(--color-brand-accent)", opacity: 0.05, blur: 70 },
    { type: "circle", size: 200, x: "-5%", y: "70%", color: "var(--color-brand-accent)", opacity: 0.04, blur: 50 },
    { type: "blob", size: 450, x: "30%", y: "40%", color: "var(--color-brand-yellow)", opacity: 0.03, blur: 90 },
  ],
  mixed: [
    { type: "circle", size: 350, x: "-8%", y: "-8%", color: "var(--color-brand-primary)", opacity: 0.06, blur: 70 },
    { type: "circle", size: 280, x: "75%", y: "10%", color: "var(--color-brand-accent)", opacity: 0.05, blur: 60 },
    { type: "blob", size: 400, x: "40%", y: "60%", color: "var(--color-brand-secondary)", opacity: 0.04, blur: 80 },
    { type: "ring", size: 350, x: "10%", y: "50%", color: "var(--color-brand-yellow)", opacity: 0.03, blur: 70 },
  ],
  subtle: [
    { type: "circle", size: 300, x: "0%", y: "0%", color: "var(--color-brand-primary)", opacity: 0.03, blur: 100 },
    { type: "circle", size: 200, x: "100%", y: "100%", color: "var(--color-brand-secondary)", opacity: 0.02, blur: 80 },
  ],
};

export default function DecoShapes({ variant = "mixed", className = "" }: DecoShapesProps) {
  const prefersReducedMotion = useReducedMotion();
  const shapes = variants[variant] || variants.mixed;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {shapes.map((shape, i) => {
        const key = `${shape.type}-${i}`;
        return (
          <div
            key={key}
            className="absolute"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
              opacity: shape.opacity ?? 0.05,
              ...(shape.type === "circle" && {
                borderRadius: "50%",
                background: `radial-gradient(circle, ${shape.color} 0%, transparent 70%)`,
                filter: `blur(${shape.blur ?? 80}px)`,
              }),
              ...(shape.type === "blob" && {
                borderRadius: "60% 40% 70% 30% / 40% 60% 30% 70%",
                background: `radial-gradient(circle, ${shape.color} 0%, transparent 70%)`,
                filter: `blur(${shape.blur ?? 80}px)`,
                transform: `rotate(${i * 45}deg)`,
              }),
              ...(shape.type === "ring" && {
                borderRadius: "50%",
                border: `1px solid ${shape.color}`,
                background: "transparent",
                opacity: (shape.opacity ?? 0.03) * 0.5,
              }),
              ...(!prefersReducedMotion && shape.float !== false
                ? {
                    animation: `float-${i % 3} ${6 + i * 2}s ease-in-out infinite`,
                    animationDelay: `${i * 1.5}s`,
                  }
                : {}),
            }}
          />
        );
      })}
    </div>
  );
}
