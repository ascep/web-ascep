"use client";

import { Users, GraduationCap, Layers, Calendar, Heart, MapPin } from "lucide-react";
import CountUp from "./CountUp";

const iconMap: Record<string, React.ElementType> = {
  Users,
  GraduationCap,
  Layers,
  Calendar,
  Heart,
  MapPin,
};

type KpiItem = {
  value: string;
  label: string;
  icon: string;
  description?: string;
};

type HomeKpiStripProps = {
  stats: KpiItem[];
};

export default function HomeKpiStrip({ stats }: HomeKpiStripProps) {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6 sm:px-6 lg:px-8">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon] || Users;
        return (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ley-cyan/40 bg-ley-cyan/10">
              <Icon size={22} className="text-ley-cyan" />
            </div>
            <p className="text-2xl font-extrabold text-white sm:text-3xl">
              <CountUp
                end={parseInt(stat.value.replace(/[^0-9]/g, ""))}
                suffix={stat.value.includes("+") ? "+" : stat.value.includes("%") ? "%" : ""}
              />
            </p>
            <p className="mt-1 text-xs font-semibold leading-snug text-white/90">
              {stat.label}
            </p>
            {stat.description && (
              <p className="mt-0.5 max-w-[11rem] text-[0.65rem] leading-snug text-white/55">
                {stat.description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
