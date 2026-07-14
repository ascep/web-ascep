import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Heart, Users, Briefcase } from "lucide-react";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Como Ayudar - ASCEP",
  description:
    "Descubre las formas de apoyar a ASCEP: donacion monetaria, plan padrino y voluntariado. Tu apoyo transforma la vida de jovenes egresados.",
  openGraph: {
    description:
      "Descubre las formas de apoyar a ASCEP: donacion monetaria, plan padrino y voluntariado. Tu apoyo transforma la vida de jovenes egresados.",
  },
};

export default async function ComoAyudarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "comoAyudar" });

  const ways = [
    {
      title: t("donacionMonetaria"),
      desc: t("donacionMonetariaDesc"),
      href: `/${locale}/donar`,
      color: "border-brand-orange/20",
    },
    {
      title: t("planPadrino"),
      desc: t("planPadrinoDesc"),
      href: `/${locale}/como-ayudar/plan-padrino`,
      color: "border-brand-teal/20",
    },
    {
      title: t("voluntariado"),
      desc: t("voluntariadoDesc"),
      href: `/${locale}/como-ayudar/voluntariado`,
      color: "border-brand-purple/20",
    },
  ];

  return (
    <div>
      <PageHero
        bgImage={assetPath("/images/eventos/20241112_102357.webp")}
        tag={t("heroTag")}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
      />

      <section className="bg-brand-teal/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-12 text-center text-lg leading-relaxed text-[var(--color-text-secondary)]">
            {t("intro")}
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {ways.map((way) => (
              <Link key={way.title} href={way.href}>
                <div className={`h-full rounded-[10px] border ${way.color} bg-bg-card p-6 transition-all hover:shadow-md`}>
                  <h3 className="mb-2 font-bold text-[var(--color-text-primary)]">{way.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{way.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Donor tiers */}
          <div className="mt-20">
            <span className="mb-3 block text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              NIVELES DE APOYO
            </span>
            <h3 className="mb-4 text-center text-2xl font-bold text-text-primary">
              Elige tu nivel de compromiso
            </h3>
            <p className="mx-auto mb-10 max-w-xl text-center text-sm text-text-secondary">
              Cada nivel de apoyo tiene un impacto directo en la vida de los jovenes que acompanamos.
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-[10px] border border-brand-purple/10 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[10px] bg-brand-purple/10">
                  <Heart size={24} className="text-brand-purple" />
                </div>
                <h4 className="mb-1 text-lg font-bold text-text-primary">Amigo ASCEP</h4>
                <p className="mb-2 text-sm text-text-muted">Donacion mensual</p>
                <p className="mb-4 text-3xl font-bold text-brand-purple">$30.000</p>
                <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                  Ayudas a cubrir materiales educativos y transporte para talleres de formacion de un joven.
                </p>
                <Link
                  href={`/${locale}/donar`}
                  className="inline-block w-full rounded-[10px] border border-brand-purple/30 px-4 py-2 text-sm font-semibold text-brand-purple transition-all hover:bg-brand-purple hover:text-white"
                >
                  Quiero ser Amigo
                </Link>
              </div>
              <div className="rounded-[10px] border-2 border-brand-orange/30 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[10px] bg-brand-orange/10">
                  <Users size={24} className="text-brand-orange" />
                </div>
                <span className="mb-2 inline-block rounded-full bg-brand-orange/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                  Recomendado
                </span>
                <h4 className="mb-1 text-lg font-bold text-text-primary">Padrino ASCEP</h4>
                <p className="mb-2 text-sm text-text-muted">Donacion mensual</p>
                <p className="mb-4 text-3xl font-bold text-brand-orange">$70.000</p>
                <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                  Financias el acompanamiento psicosocial mensual de un joven en transicion a la vida independiente.
                </p>
                <Link
                  href={`/${locale}/como-ayudar/plan-padrino`}
                  className="inline-block w-full rounded-[10px] bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-orange-dark"
                >
                  Quiero ser Padrino
                </Link>
              </div>
              <div className="rounded-[10px] border border-brand-teal/10 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[10px] bg-brand-teal/10">
                  <Briefcase size={24} className="text-brand-teal" />
                </div>
                <h4 className="mb-1 text-lg font-bold text-text-primary">Empresa Aliada</h4>
                <p className="mb-2 text-sm text-text-muted">Alianza corporativa</p>
                <p className="mb-4 text-xl font-bold text-brand-teal">Desde $500.000</p>
                <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                  Tu empresa puede apadrinar programas completos, ofrecer practicas laborales o realizar donaciones corporativas.
                </p>
                <Link
                  href={`/${locale}/contacto`}
                  className="inline-block w-full rounded-[10px] border border-brand-teal/30 px-4 py-2 text-sm font-semibold text-brand-teal transition-all hover:bg-brand-teal hover:text-white"
                >
                  Quiero ser Aliado
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-20 rounded-[10px] bg-brand-purple p-8 text-center text-white">
            <h2 className="mb-4 text-2xl font-bold">{t("ctaTitle")}</h2>
            <p className="mb-6 text-white/80">{t("ctaDesc")}</p>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center rounded-[10px] bg-bg-card px-6 py-3 text-sm font-semibold text-brand-purple transition-all hover:bg-bg-elevated"
            >
              {t("ctaBtn")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
