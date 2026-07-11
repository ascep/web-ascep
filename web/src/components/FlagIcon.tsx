'use client';

type FlagIconProps = {
  country: "es" | "en" | "de";
  className?: string;
};

export default function FlagIcon({ country, className }: FlagIconProps) {
  if (country === "es") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 20"
        className={className}
        aria-label="Espanol"
        role="img"
      >
        <rect width="30" height="20" fill="#FCD116" />
        <rect y="5" width="30" height="10" fill="#003893" />
        <rect y="10" width="30" height="10" fill="#CE1126" />
      </svg>
    );
  }

  if (country === "de") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 20"
        className={className}
        aria-label="Deutsch"
        role="img"
      >
        <rect width="30" height="20" fill="#000000" />
        <rect y="7" width="30" height="7" fill="#DD0000" />
        <rect y="14" width="30" height="6" fill="#FFCE00" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 20"
      className={className}
      aria-label="English"
      role="img"
    >
      <rect width="30" height="20" fill="#FFFFFF" />
      <rect y="2" width="30" height="2" fill="#B22234" />
      <rect y="6" width="30" height="2" fill="#B22234" />
      <rect y="10" width="30" height="2" fill="#B22234" />
      <rect y="14" width="30" height="2" fill="#B22234" />
      <rect y="18" width="30" height="2" fill="#B22234" />
      <rect width="12" height="10" fill="#3C3B6E" />
    </svg>
  );
}
