"use client";

import Script from "next/script";

export default function Analytics() {
  const domain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;

  if (!domain) return null;

  return (
    <Script
      defer
      src="https://plausible.io/js/script.js"
      data-domain={domain}
    />
  );
}
