'use client';

type FlagIconProps = {
  country: "es" | "en" | "pt";
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

  if (country === "en") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 20"
        className={className}
        aria-label="English"
        role="img"
      >
        <rect width="30" height="20" fill="#012169" />
        <rect x="12" width="6" height="20" fill="#FFFFFF" />
        <rect y="7" width="30" height="6" fill="#FFFFFF" />
        <rect x="13" width="4" height="20" fill="#C8102E" />
        <rect y="8" width="30" height="4" fill="#C8102E" />
      </svg>
    );
  }

  if (country === "pt") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 20"
        className={className}
        aria-label="Portugues"
        role="img"
      >
        <rect width="30" height="20" fill="#009739" />
        <rect y="4" width="30" height="12" fill="#FEDD00" />
        <circle cx="15" cy="10" r="4" fill="#002776" />
        <rect y="9" width="30" height="2" fill="#FFFFFF" />
      </svg>
    );
  }

  return null;
}
