"use client";

import { useState } from "react";

/**
 * Ruta hacia la autonomía — Programa Casas del Saber (ASCEP)
 *
 * Uso:
 *   import RutaCasasDelSaber from "@/components/RutaCasasDelSaber";
 *   <RutaCasasDelSaber />
 *
 * Igual que el mapa: cada fase es un objeto de datos, no JSX repetido 3
 * veces. Si mañana hay una Fase 4, solo agregas un objeto al arreglo
 * PHASES y el .map() de abajo dibuja todo automáticamente.
 *
 * Colores de la marca ASCEP y tipografía del sitio (Inter).
 */

const SVG_W = 1080;
const SVG_H = 950;

const ROAD_D =
  "M 90 480 C 260 480, 300 310, 470 320 C 640 330, 660 580, 830 560 C 920 550, 960 480, 990 420";

const CHIPS = [
  { num: "8", l1: "jóvenes máx.", l2: "por casa" },
  { num: "4", l1: "líneas", l2: "temáticas" },
  { num: "12", l1: "participantes", l2: "por línea" },
  { num: "24", l1: "meses de", l2: "acompañamiento" },
];

const PHASES = [
  {
    id: 1,
    cx: 140, cy: 465,
    color: "#EC6620", colorDark: "#8F3E0C", bg: "#FDEDE2",
    tag: "FASE 1 · MESES 1–6", title: "Acogida y diagnóstico",
    body: ["Evaluación psicosocial, itinerario", "individual, metas de corto plazo"],
    card: { x: 30, y: 260, w: 270, h: 120 },
    connectorY2: 385, labelY: 512,
  },
  {
    id: 2,
    cx: 475, cy: 318,
    color: "#019E9F", colorDark: "#005C5D", bg: "#E4F5F5",
    tag: "FASE 2 · MESES 7–18", title: "Formación y consolidación",
    body: ["Escuela de vida independiente,", "prácticas laborales, seguimiento", "psicoemocional trimestral"],
    card: { x: 345, y: 420, w: 280, h: 130 },
    connectorY2: 420, labelY: 365,
  },
  {
    id: 3,
    cx: 835, cy: 557,
    color: "#005C5D", colorDark: "#003F40", bg: "#E1EFEF",
    tag: "FASE 3 · MESES 19–24", title: "Egreso y seguimiento",
    body: ["Plan de egreso, integración a", "redes, seguimiento a 3, 6 y 12 meses"],
    card: { x: 700, y: 680, w: 280, h: 130 },
    connectorY2: 680, labelY: 604,
  }
];

export default function RutaCasasDelSaber() {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  const togglePhase = (id: number) =>
    setActivePhase((prev) => (prev === id ? null : id));

  return (
    <div style={{ maxWidth: SVG_W, margin: "0 auto", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="ruta-title ruta-desc"
        style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
      >
        <title id="ruta-title">Ruta de egreso del programa Casas del Saber</title>
        <desc id="ruta-desc">
          Camino ilustrado con tres fases: acogida y diagnóstico, formación y
          consolidación, y egreso y seguimiento, a lo largo de 24 meses.
        </desc>

        <text x="60" y="55" fontWeight="700" fontSize="16" letterSpacing="0.5" fill="#005C5D">
          ASCEP · PROGRAMA CASAS DEL SABER
        </text>
        <text x="60" y="100" fontWeight="800" fontSize="38" fill="#003F40">
          La ruta hacia la autonomía
        </text>
        <text x="60" y="130" fontSize="16" fill="#5F6B6B">
          El egreso no es un evento, es un proceso · 24 meses en tres fases
        </text>

        {CHIPS.map((chip, i) => {
          const x = 60 + i * 235;
          return (
            <g key={chip.num + i}>
              <rect x={x} y={155} width={215} height={56} rx={10} fill="#E8F4F4" />
              <text x={x + 18} y={191} fontWeight="800" fontSize="26" fill="#005C5D">
                {chip.num}
              </text>
              <text x={x + 70} y={187} fontSize="13" fill="#5F6B6B">{chip.l1}</text>
              <text x={x + 70} y={203} fontSize="13" fill="#5F6B6B">{chip.l2}</text>
            </g>
          );
        })}

        <path d={ROAD_D} fill="none" stroke="#D3D1C7" strokeWidth="26" strokeLinecap="round" />
        <path d={ROAD_D} fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="12 12" />

        {PHASES.map((phase) => {
          const isActive = activePhase === phase.id;
          return (
            <g
              key={phase.id}
              className="ruta-stop"
              style={{ cursor: "pointer" }}
              tabIndex={0}
              role="button"
              aria-expanded={isActive}
              aria-label={`${phase.tag}: ${phase.title}`}
              onMouseEnter={() => setActivePhase(phase.id)}
              onMouseLeave={() => setActivePhase(null)}
              onClick={() => togglePhase(phase.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  togglePhase(phase.id);
                }
              }}
            >
              <line
                x1={phase.cx} y1={phase.cy - 26} x2={phase.cx} y2={phase.connectorY2}
                stroke={phase.color} strokeWidth="2" strokeDasharray="4 4"
                style={{ opacity: isActive ? 1 : 0, transition: "opacity .2s ease" }}
              />

              <g
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  transform: isActive ? "scale(1.18)" : "scale(1)",
                  filter: isActive ? "drop-shadow(0 4px 10px rgba(0,0,0,0.18))" : "none",
                  transition: "transform .2s ease, filter .2s ease",
                }}
              >
                <circle cx={phase.cx} cy={phase.cy} r="26" fill={phase.color} stroke="#FFFFFF" strokeWidth="4" />
                <text x={phase.cx} y={phase.cy + 8} textAnchor="middle" fontWeight="800" fontSize="22" fill="#FFFFFF">
                  {phase.id}
                </text>
              </g>

              <text
                x={phase.cx} y={phase.labelY} textAnchor="middle"
                fontWeight="700" fontSize="13" fill={phase.colorDark}
                style={{ opacity: isActive ? 0 : 1, transition: "opacity .2s ease" }}
              >
                Fase {phase.id}
              </text>

              <g
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity .25s ease, transform .25s ease",
                  pointerEvents: "none",
                }}
              >
                <rect x={phase.card.x} y={phase.card.y} width={phase.card.w} height={phase.card.h} rx="16" fill={phase.bg} />
                <text x={phase.card.x + 22} y={phase.card.y + 30} fontWeight="700" fontSize="14" fill={phase.colorDark}>
                  {phase.tag}
                </text>
                <text x={phase.card.x + 22} y={phase.card.y + 58} fontWeight="700" fontSize="20" fill={phase.colorDark}>
                  {phase.title}
                </text>
                {phase.body.map((line, i) => (
                  <text key={i} x={phase.card.x + 22} y={phase.card.y + 84 + i * 20} fontSize="14" fill="#4A5858">
                    {line}
                  </text>
                ))}
              </g>
            </g>
          );
        })}

        <g transform="translate(990,420)">
          <line x1="0" y1="0" x2="0" y2="-55" stroke="#003F40" strokeWidth="3" strokeLinecap="round" />
          <path d="M 0 -55 L 40 -42 L 0 -30 Z" fill="#EC6620" />
        </g>
        <text x="1010" y="395" fontWeight="700" fontSize="14" fill="#003F40">Vida</text>
        <text x="1010" y="412" fontWeight="700" fontSize="14" fill="#003F40">autónoma</text>

        <text x="60" y="920" fontSize="13" fill="#96948C">
          El egreso no es un evento, es un proceso · Documento base ASCEP, 2025
        </text>
      </svg>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .ruta-stop * { transition: none !important; }
        }
        .ruta-stop:focus-visible { outline: 2px solid #005C5D; outline-offset: 2px; }
      `}</style>
    </div>
  );
}
