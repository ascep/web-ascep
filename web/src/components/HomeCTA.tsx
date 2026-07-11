'use client';

import { Phone, Mail, MapPin } from "lucide-react";

type HomeCTAProps = {
  tag: string;
  title: string;
  description: string;
  phone: string;
  email: string;
  location: string;
  formTitle: string;
  formNamePlaceholder: string;
  formEmailPlaceholder: string;
  formMessagePlaceholder: string;
  formSubmit: string;
};

export default function HomeCTA({
  tag,
  title,
  description,
  phone,
  email,
  location,
  formTitle,
  formNamePlaceholder,
  formEmailPlaceholder,
  formMessagePlaceholder,
  formSubmit,
}: HomeCTAProps) {
  return (
    <section className="relative overflow-hidden bg-brand-orange py-20">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <span className="mb-3 inline-block rounded-[10px] bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {tag}
            </span>
            <h2 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              {(() => {
                const words = title.split(" ");
                const last = words.pop();
                return <>{words.join(" ")} <span className="text-brand-orange">{last}</span></>;
              })()}
            </h2>
            <p className="mb-8 text-base leading-relaxed text-white/80">
              {description}
            </p>

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-white/15">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    Llamanos
                  </p>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-sm font-semibold text-white hover:underline">
                    {phone}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-white/15">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    Email
                  </p>
                  <a href={`mailto:${email}`} className="text-sm font-semibold text-white hover:underline">
                    {email}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-white/15">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    Ubicacion
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {location}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <div className="rounded-[10px] bg-white p-8 shadow-xl">
              <h3 className="mb-6 text-xl font-bold text-[var(--color-text-primary)]">
                {formTitle}
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    {formNamePlaceholder}
                  </label>
                  <input
                    type="text"
                    placeholder={formNamePlaceholder}
                    className="w-full rounded-[10px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition-all focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    {formEmailPlaceholder}
                  </label>
                  <input
                    type="email"
                    placeholder={formEmailPlaceholder}
                    className="w-full rounded-[10px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition-all focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    {formMessagePlaceholder}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={formMessagePlaceholder}
                    className="w-full resize-none rounded-[10px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition-all focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-[10px] bg-brand-purple px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-purple-dark hover:shadow-lg"
                >
                  {formSubmit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
