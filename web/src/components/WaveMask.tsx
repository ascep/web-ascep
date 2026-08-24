type WaveMaskProps = {
  fill: string;
  opacity?: number;
  flip?: boolean;
  className?: string;
};

export default function WaveMask({
  fill,
  opacity = 0.2,
  flip = false,
  className = "",
}: WaveMaskProps) {
  return (
    <div
      aria-hidden="true"
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
          fill={fill}
          opacity={opacity}
        />
        <path
          d="M0,35 C200,95 450,15 700,75 C950,135 1100,25 1200,50 L1200,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
