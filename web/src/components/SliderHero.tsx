'use client';

import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export type SliderSlide = {
  image: string;
  alt?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  cta?: { label: string; href: string };
};

type SliderHeroProps = {
  slides: SliderSlide[];
  className?: string;
  shadeColor?: string;
  auto?: number;
  ariaLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
};

export default function SliderHero({
  slides,
  className = "",
  shadeColor = "#1A1A2E",
  auto = 0,
  ariaLabel = "Carrusel de imágenes",
  prevLabel = "Anterior",
  nextLabel = "Siguiente",
}: SliderHeroProps) {
  const [order, setOrder] = useState<number[]>(() =>
    slides.length <= 1
      ? [0]
      : [slides.length - 1, ...Array.from({ length: slides.length - 1 }, (_, i) => i)]
  );
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const count = slides.length;

  const next = useCallback(() => {
    setOrder((o) => [...o.slice(1), o[0]]);
  }, []);

  const prev = useCallback(() => {
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  }, []);

  useEffect(() => {
    if (!auto || prefersReducedMotion || paused || count <= 1) return;
    const timer = window.setInterval(next, auto);
    return () => window.clearInterval(timer);
  }, [auto, prefersReducedMotion, paused, count, next]);

  if (count === 0) return null;

  const renderContent = (slide: SliderSlide) => (
    <div className="slider-hero-content">
      {slide.eyebrow && <span className="slider-hero-eyebrow">{slide.eyebrow}</span>}
      {slide.title && <h2 className="slider-hero-title">{slide.title}</h2>}
      {slide.description && <p className="slider-hero-desc">{slide.description}</p>}
      {slide.cta && (
        <a href={slide.cta.href} className="slider-hero-cta">
          <span>{slide.cta.label}</span>
          <ArrowRight size={18} strokeWidth={2.5} />
        </a>
      )}
    </div>
  );

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={`slider-hero ${className}`}
      style={{ "--slider-shade": shadeColor } as CSSProperties}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <ul className="slider-hero-list">
        {order.map((i, pos) => {
          const slide = slides[i];
          const full = pos === 0 || pos === 1;
          return (
            <li
              key={i}
              className="slider-hero-item"
              style={full ? undefined : { backgroundImage: `url("${slide.image}")` }}
            >
              <div
                className="slider-hero-bg"
                style={{
                  backgroundImage: `url("${slide.image}")`,
                  opacity: full ? 0.85 : 0,
                }}
              />
              <div
                className="slider-hero-shade"
                style={{ opacity: full ? 1 : 0 }}
              />
              {renderContent(slide)}
            </li>
          );
        })}
      </ul>

      {count > 1 && (
        <nav className="slider-hero-nav" aria-label={ariaLabel}>
          <button type="button" onClick={prev} aria-label={prevLabel} className="slider-hero-btn prev">
            <ChevronLeft size={22} />
          </button>
          <button type="button" onClick={next} aria-label={nextLabel} className="slider-hero-btn next">
            <ChevronRight size={22} />
          </button>
        </nav>
      )}

      <style>{`
        .slider-hero {
          position: relative;
          width: 100%;
          overflow: hidden;
          background-color: var(--slider-shade);
          font-family: var(--font-sans);
        }
        .slider-hero-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .slider-hero-item {
          width: 200px;
          height: 300px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          background-position: center;
          background-size: cover;
          border-radius: 20px;
          box-shadow: 0 20px 30px rgba(255, 255, 255, 0.3) inset;
          transition: transform 0.1s, left 0.75s, top 0.75s, width 0.75s, height 0.75s;
        }
        .slider-hero-item:nth-child(1),
        .slider-hero-item:nth-child(2) {
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          transform: none;
          border-radius: 0;
          box-shadow: none;
          opacity: 1;
        }
        .slider-hero-shade,
        .slider-hero-bg {
          position: absolute;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .slider-hero-shade {
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            120deg,
            rgba(0, 92, 93, 0.45) 0%,
            rgba(1, 158, 159, 0.32) 100%
          );
        }
        .slider-hero-bg {
          inset: -10%;
          z-index: 0;
          background-size: cover;
          background-position: center;
          filter: blur(16px) saturate(1.15);
        }
        .slider-hero-item:nth-child(3) { left: 50%; }
        .slider-hero-item:nth-child(4) { left: calc(50% + 220px); }
        .slider-hero-item:nth-child(5) { left: calc(50% + 440px); }
        .slider-hero-item:nth-child(6) { left: calc(50% + 660px); opacity: 0; }
        .slider-hero-item:only-child {
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          transform: none;
          border-radius: 0;
          box-shadow: none;
        }
        .slider-hero-item:only-child .slider-hero-content {
          display: block;
          opacity: 1;
          animation: none;
        }
        .slider-hero-content {
          width: min(32vw, 440px);
          position: absolute;
          top: 42%;
          left: 3rem;
          transform: translateY(-50%);
          z-index: 2;
          color: #ffffff;
          text-shadow: 0 3px 8px rgba(0, 0, 0, 0.5);
          opacity: 0;
          display: none;
        }
        .slider-hero-item:nth-of-type(2) .slider-hero-content {
          display: block;
          animation: slider-hero-show 0.75s ease-in-out 0.3s forwards;
        }
        .slider-hero-eyebrow {
          display: inline-block;
          margin-bottom: 1.25rem;
          border: 1px solid rgba(196, 81, 24, 0.4);
          border-radius: 9999px;
          padding: 0.45rem 1.25rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.85);
        }
        .slider-hero-title {
          font-size: clamp(1.75rem, 4.5vw, 3.25rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .slider-hero-desc {
          margin: 1.25rem 0 1.75rem;
          max-width: 32rem;
          font-size: clamp(0.9rem, 1.5vw, 1.1rem);
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.85);
        }
        .slider-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          width: fit-content;
          background-color: var(--color-brand-orange);
          color: #ffffff;
          border-radius: 0.625rem;
          padding: 0.75rem 1.75rem;
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s ease, box-shadow 0.2s ease;
        }
        .slider-hero-cta:hover {
          background-color: var(--color-brand-orange-dark);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
        }
        .slider-hero-cta:focus-visible {
          outline: 3px solid rgba(255, 255, 255, 0.8);
          outline-offset: 2px;
        }
        .slider-hero-nav {
          position: absolute;
          top: 50%;
          left: 1rem;
          right: 1rem;
          transform: translateY(-50%);
          z-index: 5;
          display: flex;
          justify-content: space-between;
          pointer-events: none;
          user-select: none;
        }
        .slider-hero-btn {
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.75rem;
          height: 2.75rem;
          background-color: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          border: 2px solid rgba(255, 255, 255, 0.35);
          border-radius: 50%;
          cursor: pointer;
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }
        .slider-hero-btn:hover {
          background-color: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.6);
        }
        .slider-hero-btn:focus-visible {
          outline: 3px solid rgba(255, 255, 255, 0.8);
          outline-offset: 2px;
        }
        @keyframes slider-hero-show {
          0% { filter: blur(5px); transform: translateY(calc(-50% + 75px)); }
          100% { opacity: 1; filter: blur(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .slider-hero-item { transition: none; }
          .slider-hero-shade,
          .slider-hero-bg { transition: none; }
          .slider-hero-item:nth-of-type(2) .slider-hero-content {
            animation: none;
            opacity: 1;
          }
        }
        @media (min-width: 650px) and (max-width: 900px) {
          .slider-hero-content { width: min(38vw, 380px); }
          .slider-hero-title { font-size: 1.6rem; }
          .slider-hero-desc { font-size: 0.85rem; }
          .slider-hero-item { width: 160px; height: 270px; }
          .slider-hero-item:nth-child(3) { left: 50%; }
          .slider-hero-item:nth-child(4) { left: calc(50% + 170px); }
          .slider-hero-item:nth-child(5) { left: calc(50% + 340px); }
          .slider-hero-item:nth-child(6) { left: calc(50% + 510px); opacity: 0; }
        }
        @media (max-width: 649px) {
          .slider-hero-content { left: 1.25rem; width: min(65vw, 340px); }
          .slider-hero-title { font-size: 1.5rem; }
          .slider-hero-desc { margin: 0.75rem 0 1rem; font-size: 0.8rem; }
          .slider-hero-cta { padding: 0.6rem 1rem; font-size: 0.8rem; }
          .slider-hero-item { width: 120px; height: 200px; }
          .slider-hero-item:nth-child(3) { left: 68%; }
          .slider-hero-item:nth-child(4) { left: calc(68% + 130px); }
          .slider-hero-item:nth-child(5) { left: calc(68% + 260px); opacity: 0; }
          .slider-hero-item:nth-child(6) { left: calc(68% + 390px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
