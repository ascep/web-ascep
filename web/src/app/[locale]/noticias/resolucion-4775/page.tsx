import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  FileText,
  HandHeart,
  Landmark,
  Megaphone,
  Newspaper,
  ShieldCheck,
  Target,
  UserRound,
  Users,
} from "lucide-react";
import PostShare from "@/components/PostShare";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: "Resolución 4775 de 2026: Guía de Desinstitucionalización del ICBF - ASCEP",
    description: t("noticias.description"),
    openGraph: {
      description: t("noticias.description"),
    },
  };
}

const toc = [
  { id: "que-es", label: "queEs" },
  { id: "definiciones", label: "definiciones" },
  { id: "lineas", label: "lineas" },
  { id: "establece", label: "establece" },
  { id: "participacion", label: "participacion" },
  { id: "ascep", label: "ascep" },
] as const;

const objetivos = ["obj1", "obj2", "obj3", "obj4"] as const;
const definiciones = [
  { title: "def1Title", desc: "def1Desc", icon: Target },
  { title: "def2Title", desc: "def2Desc", icon: Landmark },
  { title: "def3Title", desc: "def3Desc", icon: ShieldCheck },
] as const;
const lineas = ["linea1", "linea2", "linea3", "linea4"] as const;
const establece = [
  { title: "est1Title", desc: "est1Desc", icon: Users },
  { title: "est2Title", desc: "est2Desc", icon: FileText },
  { title: "est3Title", desc: "est3Desc", icon: CalendarDays },
] as const;

function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <h2
      id={id}
      className="mb-5 mt-12 scroll-mt-28 text-2xl font-extrabold text-ley-purple first:mt-0 sm:text-[1.75rem] sm:leading-tight"
    >
      {title}
    </h2>
  );
}

export default async function Resolucion4775Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resolucion4775" });
  const n = await getTranslations({ locale, namespace: "noticias" });

  const title = `${t("title")}${t("titleHighlight")}`;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ley-purple py-20 text-white sm:py-24">
        <div className="absolute inset-0">
          <Image
            src={assetPath(fotos.impacto.hero)}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-15"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.08), transparent 60%)" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-white/70">
            <Link href={`/${locale}`} className="transition-colors hover:text-white">
              {t("breadcrumbInicio")}
            </Link>
            <ChevronRight size={14} className="text-white/40" />
            <Link href={`/${locale}/noticias`} className="transition-colors hover:text-white">
              {t("breadcrumbNoticias")}
            </Link>
            <ChevronRight size={14} className="text-white/40" />
            <span className="text-white/50">{t("breadcrumbResolucion")}</span>
          </nav>

          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-ley-orange px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md">
            <Landmark size={13} />
            {t("badge")}
          </span>

          <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            {t("title")} <span className="text-ley-cyan">{t("titleHighlight")}</span>
          </h1>

          <p className="mb-6 text-lg font-light italic leading-relaxed text-purple-100 sm:text-2xl">
            &quot;{t("slogan")}&quot;
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-purple-800/60 pt-6 text-xs text-purple-200 sm:text-sm">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ley-teal font-bold text-white">
                  <UserRound size={16} />
                </div>
                <div>
                  <span className="block font-semibold text-white">{t("publishedBy")}</span>
                  <span className="text-xs text-purple-300">{t("orgName")}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <CalendarDays size={14} className="text-ley-teal" />
                <span>{t("vigencia")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-ley-orange" />
                <span>{t("readTime")}</span>
              </div>
            </div>

            <PostShare title={title} />
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* ARTICLE */}
          <article className="lg:col-span-8">
            <div className="rounded-2xl border border-border-subtle bg-bg-card p-6 shadow-sm sm:p-10">
              {/* S1 Que es */}
              <div id="que-es">
                <SectionHeading id="que-es" title={t("queEs")} />
                <p className="mb-4 text-[1.05rem] leading-[1.8] text-text-secondary">
                  {t("queEsDesc")}
                </p>

                <div className="my-6 space-y-3 rounded-2xl bg-ley-yellow/10 p-6">
                  <h4 className="flex items-center gap-2 text-base font-extrabold text-text-primary">
                    <Target size={20} className="text-ley-orange" />
                    {t("objetivos")}
                  </h4>
                  <ul className="space-y-2.5 text-sm text-text-secondary">
                    {objetivos.map((key) => (
                      <li key={key} className="flex items-start gap-2.5">
                        <Check size={16} className="mt-0.5 shrink-0 text-ley-teal" />
                        <span>{t(key)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* S2 Definiciones */}
              <div id="definiciones" className="mt-12">
                <SectionHeading id="definiciones" title={t("definiciones")} />
                <p className="mb-5 text-[1.05rem] leading-[1.8] text-text-secondary">
                  {t("definicionesDesc")}
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {definiciones.map((d) => {
                    const Icon = d.icon;
                    return (
                      <div key={d.title} className="rounded-2xl border border-border-subtle bg-bg-surface p-5">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-ley-purple text-white">
                          <Icon size={18} />
                        </div>
                        <h4 className="font-bold text-text-primary">{t(d.title)}</h4>
                        <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">{t(d.desc)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* S3 Lineas */}
              <div id="lineas" className="mt-12">
                <SectionHeading id="lineas" title={t("lineas")} />
                <div className="grid gap-4 sm:grid-cols-2">
                  {lineas.map((key, i) => (
                    <div
                      key={key}
                      className="group flex items-start gap-3 rounded-2xl border border-border-subtle bg-bg-surface p-5 transition-colors hover:border-ley-purple"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ley-purple text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <p className="text-sm font-semibold leading-relaxed text-text-primary">{t(key)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* S4 Establece */}
              <div id="establece" className="mt-12">
                <SectionHeading id="establece" title={t("establece")} />
                <p className="mb-5 text-[1.05rem] leading-[1.8] text-text-secondary">
                  {t("estableceDesc")}
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {establece.map((e) => {
                    const Icon = e.icon;
                    return (
                      <div key={e.title} className="space-y-2 rounded-2xl border border-border-subtle bg-bg-surface p-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ley-orange text-white">
                          <Icon size={18} />
                        </div>
                        <h4 className="font-bold text-text-primary">{t(e.title)}</h4>
                        <p className="text-xs leading-relaxed text-text-muted">{t(e.desc)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* S5 Participacion */}
              <div id="participacion" className="mt-12">
                <SectionHeading id="participacion" title={t("participacion")} />
                <div className="rounded-2xl bg-ley-purple p-6 text-white sm:p-8">
                  <span className="mb-3 flex items-center gap-2 text-sm font-bold">
                    <Megaphone size={18} className="text-ley-yellow" />
                    {t("participacion")}
                  </span>
                  <p className="text-sm leading-relaxed text-purple-100 sm:text-base">
                    {t("participacionDesc")}
                  </p>
                </div>
              </div>

              {/* S6 ASCEP */}
              <div id="ascep" className="mt-12">
                <SectionHeading id="ascep" title={t("ascep")} />
                <div className="my-6 space-y-4 rounded-2xl border border-ley-purple/20 bg-ley-purple/5 p-6">
                  <p className="text-[1.05rem] leading-[1.8] text-text-secondary">
                    {t("ascepDesc")}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col items-center gap-5 rounded-2xl bg-ley-purple p-8 text-center text-white shadow-sm sm:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-ley-yellow">
                  <HandHeart size={24} />
                </div>
                <h3 className="text-2xl font-bold sm:text-3xl">{t("cta")}</h3>
                <p className="max-w-xl text-base text-purple-100">{t("ctaDesc")}</p>
                <Link
                  href={`/${locale}/como-ayudar`}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-ley-purple transition-all hover:bg-white/90 hover:shadow-lg"
                >
                  {t("ctaBtn")}
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Article footer */}
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-6">
                <Link
                  href={`/${locale}/noticias`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-ley-purple transition-colors hover:text-ley-teal"
                >
                  <ArrowLeft size={16} />
                  {n("backToNoticias")}
                </Link>
              </div>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-5">
              <div className="rounded-2xl border border-border-subtle bg-bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between border-b border-border-subtle pb-3">
                  <h3 className="flex items-center gap-2 font-extrabold text-text-primary">
                    <FileText size={16} className="text-ley-purple" />
                    {t("enEsteArticulo")}
                  </h3>
                  <span className="rounded-full bg-ley-purple/10 px-2 py-0.5 text-[10px] font-bold text-ley-purple">
                    {t("badge")}
                  </span>
                </div>

                <nav className="space-y-1 text-xs font-medium text-text-secondary sm:text-sm">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block rounded-xl p-2 transition-colors hover:bg-ley-purple/10 hover:text-ley-purple"
                    >
                      {t(item.label)}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="space-y-2 rounded-2xl border border-border-subtle bg-bg-surface p-4 text-xs">
                <span className="flex items-center gap-1.5 font-bold uppercase tracking-wide text-text-primary">
                  <Newspaper size={14} className="text-ley-cyan" />
                  {t("datoClaveLabel")}
                </span>
                <p className="leading-relaxed text-text-secondary">{t("datoClave")}</p>
              </div>

              <div className="pt-2">
                <Link
                  href={`/${locale}/contacto`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-ley-purple px-4 py-3 text-xs font-bold text-white shadow transition-colors hover:bg-ley-purple-dark"
                >
                  {t("contactarEquipo")}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
