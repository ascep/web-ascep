"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import CursorGlow from "@/components/CursorGlow";
import DecoShapes from "@/components/DecoShapes";
import AnimatedSection from "@/components/AnimatedSection";

type EnredateCTAProps = {
  tag: string;
  title: string;
  desc: string;
  list: string[];
  formName: string;
  formEmail: string;
  formMsg: string;
  formSubmit: string;
};

export default function EnredateCTA({
  tag,
  title,
  desc,
  list,
  formName,
  formEmail,
  formMsg,
  formSubmit,
}: EnredateCTAProps) {
  return (
    <section className="section-dark relative overflow-hidden bg-ley-purple py-20">
      <CursorGlow color="rgba(1, 158, 159, 0.06)" size={500} opacity={0.5} />
      <DecoShapes variant="mixed" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <AnimatedSection direction="left">
            <span className="mb-3 inline-block rounded-full border border-brand-orange/30 px-5 py-2 text-sm font-bold text-white/80">
              {tag}
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mb-8 leading-relaxed text-[var(--color-text-muted)]">
              {desc}
            </p>

            <ul className="mb-10 space-y-4">
              {list.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-purple text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="h-5 w-5 text-brand-secondary" />
                <span>+57 302 555 0107</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="h-5 w-5 text-brand-secondary" />
                <span>enredate@ascep.org</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="h-5 w-5 text-brand-secondary" />
                <span>Cali, Colombia</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.15}>
            <div className="glass-card rounded-[10px] p-8 transition-all hover:bg-white/10">
              <h3 className="mb-6 text-xl font-bold text-white">
                {tag}
              </h3>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-5"
              >
                <div>
                  <label className="mb-1 block text-sm font-medium text-white/70">
                    {formName}
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary/20"
                    placeholder={formName}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-white/70">
                    {formEmail}
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary/20"
                    placeholder={formEmail}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-white/70">
                    {formMsg}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary/20"
                    placeholder={formMsg}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-[10px] bg-brand-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-purple/90"
                >
                  {formSubmit}
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

