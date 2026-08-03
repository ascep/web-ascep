"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import type { TransparenciaDoc } from "@/types/transparencia";
import { CATEGORY_META, TRANSPARENCIA_CATEGORIES } from "@/lib/transparencia-meta";

type TransparenciaGridProps = {
  docs: TransparenciaDoc[];
  categories: Record<string, string>;
  todosLabel: string;
  openDoc: string;
  emptyLabel: string;
};

export default function TransparenciaGrid({
  docs,
  categories,
  todosLabel,
  openDoc,
  emptyLabel,
}: TransparenciaGridProps) {
  const [filter, setFilter] = useState<string>("todos");

  const visible = filter === "todos" ? docs : docs.filter((d) => d.category === filter);
  const tabs = ["todos", ...TRANSPARENCIA_CATEGORIES];

  return (
    <div>
      <div
        className="mb-10 flex flex-wrap items-center justify-center gap-2"
        role="tablist"
        aria-label={todosLabel}
      >
        {tabs.map((tab) => {
          const active = tab === filter;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(tab)}
              className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                active
                  ? "bg-brand-purple text-white shadow"
                  : "border border-border-default bg-white text-text-secondary hover:border-brand-purple hover:text-brand-purple"
              }`}
            >
              {tab === "todos" ? todosLabel : categories[tab] ?? tab}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="py-10 text-center text-sm text-text-muted">{emptyLabel}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((doc) => {
            const meta = CATEGORY_META[doc.category] ?? CATEGORY_META.legales;
            const Icon = meta.icon;
            return (
              <article
                key={doc.id}
                className="flex flex-col overflow-hidden rounded-[10px] border border-border-default bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <Link
                  href={doc.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block h-56 overflow-hidden bg-zinc-100"
                >
                  {doc.preview ? (
                    <Image
                      src={doc.preview}
                      alt={doc.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <iframe
                      src={doc.path}
                      title={doc.title}
                      loading="lazy"
                      className="h-full w-full transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/25">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                      <Download size={20} className="text-brand-purple" />
                    </span>
                  </div>
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <span
                    className={`mb-3 inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-1 text-xs font-semibold ${meta.iconBg} ${meta.iconColor}`}
                  >
                    <Icon size={12} />
                    {categories[doc.category] ?? doc.category}
                  </span>
                  <h3 className="mb-4 flex-1 text-sm font-bold leading-snug text-text-primary">
                    {doc.title}
                  </h3>
                  <Link
                    href={doc.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand-purple px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-purple-dark"
                  >
                    {openDoc}
                    <Download size={16} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
