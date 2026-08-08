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
};

type HomeKpiStripProps = {
  stats: KpiItem[];
};

export default function HomeKpiStrip({ stats }: HomeKpiStripProps) {
  return (
    <div className="border-y border-white/15 bg-ley-purple/95 py-10 sm:py-12">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-4 sm:grid-cols-4 sm:gap-6 sm:px-6 lg:px-8">
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
              <p className="mt-1 line-clamp-2 max-w-[9rem] text-xs leading-snug text-white/75">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
