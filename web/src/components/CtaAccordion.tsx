"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, MessageCircle, Heart } from "lucide-react";

type CtaAccordionProps = {
  contactTitle: string;
  contactDescription: string;
  contactButtonLabel: string;
  contactButtonHref: string;
  donateTitle: string;
  children: React.ReactNode;
};

export default function CtaAccordion({
  contactTitle,
  contactDescription,
  contactButtonLabel,
  contactButtonHref,
  donateTitle,
  children,
}: CtaAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  const items = [
    {
      icon: MessageCircle,
      title: contactTitle,
      content: (
        <div>
          <p className="mb-4 text-sm text-white/70">{contactDescription}</p>
          <a
            href={contactButtonHref}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-ley-purple transition-all hover:bg-white/90 hover:shadow-lg"
          >
            {contactButtonLabel}
          </a>
        </div>
      ),
    },
    {
      icon: Heart,
      title: donateTitle,
      content: children,
    },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
              isOpen
                ? "border-white/20 bg-white/10"
                : "border-white/10 bg-white/[0.06]"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 px-6 py-5 text-left sm:px-8"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  isOpen ? "bg-ley-cyan/20" : "bg-white/10"
                }`}
              >
                <item.icon
                  size={20}
                  className={isOpen ? "text-ley-cyan" : "text-white/70"}
                />
              </div>
              <span className="flex-1 text-base font-bold text-white sm:text-lg">
                {item.title}
              </span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  isOpen
                    ? "rotate-180 border-ley-cyan/60 bg-ley-cyan/15"
                    : "border-white/20 bg-white/5"
                }`}
              >
                <ChevronDown
                  size={16}
                  className={isOpen ? "text-ley-cyan" : "text-white/70"}
                />
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
                    {item.content}
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
