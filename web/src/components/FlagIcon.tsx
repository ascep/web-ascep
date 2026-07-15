'use client';

type FlagIconProps = {
  country: "es" | "pt";
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
