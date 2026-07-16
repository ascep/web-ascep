'use client';

import dynamic from "next/dynamic";

const ColombiaMap = dynamic(() => import("@/components/ColombiaMap"), { ssr: false });

export default function ImpactMap() {
  return <ColombiaMap />;
}
