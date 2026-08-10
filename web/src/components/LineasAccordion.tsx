"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, CheckCircle2 } from "lucide-react";

type Linea = {
  title: string;
  items: string[];
};

export default function LineasAccordion({ items }: { items: Linea[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`glass-card overflow-hidden rounded-3xl transition-all duration-300 ${
              isOpen ? "bg-white/10" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
            >
              <span className="text-base font-bold text-white sm:text-lg">{item.title}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  isOpen
                    ? "rotate-180 border-ley-cyan/60 bg-ley-cyan/15"
                    : "border-white/20 bg-white/5"
                }`}
              >
                <ChevronDown size={16} className={isOpen ? "text-ley-cyan" : "text-white/70"} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/10 px-6 pb-6 pt-5 sm:px-8">
                    <ul className="space-y-3">
                      {item.items.map((it, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
                          <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-ley-cyan" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
