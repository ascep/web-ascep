"use client";

import { motion, useReducedMotion } from "motion/react";
import { Phone, Mail, MapPin } from "lucide-react";

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
  const prefersReduced = useReducedMotion();
  const dur = prefersReduced ? 0 : 0.6;

  return (
    <section className="relative bg-bg-base py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={dur ? { opacity: 0, y: 30 } : undefined}
            whileInView={dur ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={dur ? { duration: dur, ease: [0.23, 1, 0.32, 1] } : undefined}
          >
            <span className="mb-3 inline-block rounded-full bg-brand-orange/10 px-5 py-2 text-sm font-bold text-brand-orange">
              {tag}
            </span>
            <h2 className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
              {title}
            </h2>
            <p className="mb-8 leading-relaxed text-text-secondary">
              {desc}
            </p>

            <ul className="mb-10 space-y-4">
              {list.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-purple text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-text-secondary">
                <Phone className="h-5 w-5 text-brand-purple" />
                <span>+57 302 555 0107</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <Mail className="h-5 w-5 text-brand-purple" />
                <span>enredate@ascep.org</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <MapPin className="h-5 w-5 text-brand-purple" />
                <span>Cali, Colombia</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={dur ? { opacity: 0, y: 30 } : undefined}
            whileInView={dur ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={dur ? { duration: dur, delay: 0.15, ease: [0.23, 1, 0.32, 1] } : undefined}
          >
            <div className="rounded-[10px] border border-border-subtle bg-bg-card p-8">
              <h3 className="mb-6 text-xl font-bold text-text-primary">
                {tag}
              </h3>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-5"
              >
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-secondary">
                    {formName}
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-[10px] border border-border-default bg-bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                    placeholder={formName}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-secondary">
                    {formEmail}
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-[10px] border border-border-default bg-bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                    placeholder={formEmail}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-secondary">
                    {formMsg}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-[10px] border border-border-default bg-bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
