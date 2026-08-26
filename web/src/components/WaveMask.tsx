/**
 * Separador de onda entre secciones.
 *
 * REGLA DEL SISTEMA VISUAL:
 * La mascara pertenece a la seccion que ESTA INTRODUCIENDO. Se coloca al final
 * de la seccion A pintada con el color de la seccion B, de modo que la onda
 * "trae" el color siguiente:
 *
 *   [SECCION A]  →  <WaveMask tone="<color de B>" />  →  [SECCION B]
 *
 * Nunca uses el color de la propia seccion: la onda quedaria invisible pero
 * seguiria tapando el contenido (es un elemento posicionado y se pinta por
 * encima del contenido no posicionado). Por eso los contenedores de contenido
 * deben llevar `relative z-10`.
 */

export type SectionTone = "teal" | "purple" | "cream" | "white" | "orange";

/** Colores oficiales del sistema. No agregar hex sueltos aqui. */
const TONE_FILL: Record<SectionTone, string> = {
  teal: "var(--color-brand-primary)",
  purple: "var(--color-ley-purple)",
  cream: "var(--color-bg-cream)",
  white: "var(--color-bg-base)",
  orange: "var(--color-brand-accent)",
};

type WaveMaskProps = {
  /** Color por token del sistema. Preferir esto sobre `fill`. */
  tone?: SectionTone;
  /** Hex directo. Se mantiene por retrocompatibilidad con paginas antiguas. */
  fill?: string;
  opacity?: number;
  /** true = la onda va arriba de la seccion (uso heredado). */
  flip?: boolean;
  className?: string;
};

export default function WaveMask({
  tone,
  fill,
  opacity = 0.2,
  flip = false,
  className = "",
}: WaveMaskProps) {
  const color = tone ? TONE_FILL[tone] : fill;
  if (!color) return null;

  return (
    <div
      aria-hidden="true"
      // Sin z-index propio: si una seccion tiene overlays con z-index (p. ej.
      // el degradado del hero), pasa `className="z-[5]"` para que la onda quede
      // por encima del overlay y por debajo del contenido (que va en z-10).
      className={`pointer-events-none absolute left-0 w-full leading-none ${
        flip ? "top-0" : "bottom-0"
      } ${className}`}
      style={flip ? { transform: "rotate(180deg)" } : undefined}
    >
      <svg
        className="block h-[40px] w-full sm:h-[60px]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"
          fill={color}
          opacity={opacity}
        />
        <path
          d="M0,35 C200,95 450,15 700,75 C950,135 1100,25 1200,50 L1200,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
