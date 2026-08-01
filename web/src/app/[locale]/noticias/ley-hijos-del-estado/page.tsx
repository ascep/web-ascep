import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  FileText,
  Gavel,
  Handshake,
  HeartHandshake,
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
    title: "Ley 2479 de 2025: Hijos e Hijas del Estado - ASCEP",
    description: t("leyDeEgreso.description"),
    openGraph: {
      description: t("leyDeEgreso.description"),
    },
  };
}

const toc = [
  { id: "proposito", label: "queEs" },
  { id: "que-es", label: "cambio" },
  { id: "dirigida", label: "dirigida" },
  { id: "establece", label: "establece" },
  { id: "implementacion", label: "implementacion" },
  { id: "papel-egresados-ascep", label: "papelEgresados" },
  { id: "participa", label: "participa" },
] as const;

const objetivos = ["obj1", "obj2", "obj3", "obj4", "obj5"] as const;
const dirigida = ["dir1", "dir2", "dir3"] as const;
const extraDirigida = ["dirExtra1", "dirExtra2"] as const;
const establece = ["est1", "est2", "est3", "est4", "est5"] as const;
const impl = ["impl1", "impl2", "impl3", "impl4", "impl5"] as const;
const papelEgresados = ["pe1", "pe2", "pe3", "pe4", "pe5"] as const;
const papelAscep = ["pa1", "pa2", "pa3", "pa4", "pa5", "pa6"] as const;

function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <h2 id={id} className="mb-5 mt-12 scroll-mt-28 text-2xl font-extrabold text-ley-purple first:mt-0 sm:text-[1.75rem] sm:leading-tight">
      {title}
    </h2>
  );
}

export default async function LeyPostPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "leyPost" });
  const le = await getTranslations({ locale, namespace: "leyEgreso" });
  const n = await getTranslations({ locale, namespace: "noticias" });

  const title = `${t("title")} ${t("titleHighlight")}`;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ley-purple text-white">
        <div className="absolute inset-0">
          <Image
            src={assetPath(fotos.leyEgreso.hero)}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
            style={{ opacity: 0.18 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ley-purple/70 via-ley-purple/80 to-ley-purple" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 overflow-x-auto whitespace-nowrap text-xs font-medium text-purple-200/90">
            <Link href={`/${locale}`} className="transition-colors hover:text-white">
              {t("breadcrumbInicio")}
            </Link>
            <ChevronRight size={12} className="shrink-0" />
            <Link href={`/${locale}/noticias`} className="transition-colors hover:text-white">
              {t("breadcrumbNoticias")}
            </Link>
            <ChevronRight size={12} className="shrink-0" />
            <span className="text-ley-cyan">{t("breadcrumbLey")}</span>
          </nav>

          {/* Badge */}
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-ley-orange px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md">
            <Gavel size={13} />
            {t("badge")}
          </span>

          {/* Title */}
          <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            {t("title")} <span className="text-ley-cyan">{t("titleHighlight")}</span>
          </h1>

          {/* Slogan */}
          <p className="mb-6 border-l-4 border-ley-yellow pl-4 py-1 text-lg font-light italic leading-relaxed text-purple-100 sm:text-2xl">
            &quot;{t("slogan")}&quot;
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-purple-800/60 pt-6 text-xs sm:text-sm text-purple-200">
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
              {/* Cover banner */}
              <div className="mb-8 overflow-hidden rounded-2xl bg-ley-purple text-white shadow-md">
                <div className="flex flex-col items-center gap-5 p-7 sm:flex-row sm:p-8">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-ley-yellow">
                    <BookOpen size={30} />
                  </div>
                  <div className="space-y-2 text-center sm:text-left">
                    <span className="inline-block rounded-md bg-ley-teal px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                      {t("coverLabel")}
                    </span>
                    <h3 className="text-xl font-bold leading-snug sm:text-2xl">{t("coverTitle")}</h3>
                    <p className="text-xs leading-relaxed text-purple-100 sm:text-sm">{t("coverDesc")}</p>
                  </div>
                </div>
              </div>

              {/* S1 Proposito */}
              <div id="proposito">
                <SectionHeading id="proposito" title={`1. ${le("queEs")}`} />
                <p className="mb-4 text-[1.05rem] leading-[1.8] text-text-secondary">
                  {le("queEsDesc")}
                </p>

                <div className="my-6 space-y-3 rounded-2xl border-l-4 border-l-ley-orange bg-ley-yellow/10 p-6">
                  <h4 className="flex items-center gap-2 text-base font-extrabold text-text-primary">
                    <Target size={20} className="text-ley-orange" />
                    {le("objetivos")}
                  </h4>
                  <ul className="space-y-2.5 text-sm text-text-secondary">
                    {objetivos.map((key) => (
                      <li key={key} className="flex items-start gap-2.5">
                        <Check size={16} className="mt-0.5 shrink-0 text-ley-teal" />
                        <span>{le(key)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* S2 Que cambia */}
              <div id="que-es" className="mt-12">
                <SectionHeading id="que-es" title={`2. ${le("cambio")}`} />
                <p className="mb-4 text-[1.05rem] leading-[1.8] text-text-secondary">
                  {le("subtitle")}
                </p>

                <div className="my-6 space-y-4 rounded-2xl border border-ley-purple/20 bg-ley-purple/5 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ley-purple font-bold text-white">
                      <Landmark size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-ley-purple">2479</h4>
                      <p className="text-xs text-ley-purple-dark">{le("cambio")}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-text-secondary">{le("cambioDesc")}</p>
                </div>
              </div>

              {/* S3 Dirigida */}
              <div id="dirigida" className="mt-12">
                <SectionHeading id="dirigida" title={`3. ${le("dirigida")}`} />
                <p className="mb-5 text-[1.05rem] leading-[1.8] text-text-secondary">
                  {le("dirigida")}
                </p>

                <div className="mb-4 grid gap-4 sm:grid-cols-3">
                  {dirigida.map((key, i) => (
                    <div key={key} className="rounded-2xl border border-border-subtle bg-bg-surface p-5 text-center">
                      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-ley-purple text-sm font-bold text-white">
                        {i + 1}
                      </div>
                      <p className="text-sm font-semibold text-text-primary">{le(key)}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {extraDirigida.map((key) => (
                    <div key={key} className="rounded-2xl border border-border-subtle bg-bg-surface p-5">
                      <div className="mb-1 font-bold text-ley-purple">{le(key)}</div>
                      <p className="text-sm text-text-secondary">{le(`${key}Desc`)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* S4 Establece */}
              <div id="establece" className="mt-12">
                <SectionHeading id="establece" title={`4. ${le("establece")}`} />
                <p className="mb-5 text-[1.05rem] leading-[1.8] text-text-secondary">
                  {le("establece")}
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {establece.map((key) => (
                    <div
                      key={key}
                      className="group space-y-2 rounded-2xl border border-border-subtle bg-bg-surface p-5 transition-colors hover:border-ley-purple"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ley-purple text-white">
                        <ShieldCheck size={18} />
                      </div>
                      <h4 className="font-bold text-text-primary">{le(key)}</h4>
                      <p className="text-xs leading-relaxed text-text-muted">{le(`${key}Desc`)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* S5 Implementacion */}
              <div id="implementacion" className="mt-12">
                <SectionHeading id="implementacion" title={`5. ${le("implementacion")}`} />
                <p className="mb-5 text-[1.05rem] leading-[1.8] text-text-secondary">
                  {le("implementacionDesc")}
                </p>

                <div className="my-6 space-y-4 rounded-2xl bg-ley-purple p-6 text-white sm:p-8">
                  <span className="block text-xs font-bold uppercase tracking-widest text-ley-cyan">
                    {le("implementacion")}
                  </span>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {impl.map((key, i) => (
                      <div key={key} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/10 p-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ley-teal text-sm font-bold">
                          {i + 1}
                        </span>
                        <span className="text-xs leading-relaxed text-purple-100">{le(key)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* S6 Rol */}
              <div id="papel-egresados-ascep" className="mt-12">
                <SectionHeading id="papel-egresados-ascep" title={`6. ${le("papelEgresados")}`} />
                <p className="mb-5 text-[1.05rem] leading-[1.8] text-text-secondary">
                  {le("papelEgresadosDesc")}
                </p>

                <div className="mb-8 grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3 rounded-2xl border border-ley-teal/30 bg-ley-teal/10 p-6">
                    <h4 className="flex items-center gap-2 text-lg font-extrabold text-ley-purple-dark">
                      <Users size={18} className="text-ley-teal" />
                      {le("papelEgresados")}
                    </h4>
                    <ul className="space-y-2 text-xs font-medium text-text-secondary">
                      {papelEgresados.map((key) => (
                        <li key={key} className="flex items-center gap-2">
                          <Check size={14} className="shrink-0 text-ley-teal" />
                          {le(key)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 rounded-2xl border border-ley-purple/20 bg-ley-purple/5 p-6">
                    <h4 className="flex items-center gap-2 text-lg font-extrabold text-ley-purple">
                      <HeartHandshake size={18} className="text-ley-purple" />
                      {le("papelASCEP")}
                    </h4>
                    <ul className="space-y-2 text-xs font-medium text-text-secondary">
                      {papelAscep.map((key) => (
                        <li key={key} className="flex items-center gap-2">
                          <Check size={14} className="shrink-0 text-ley-purple" />
                          {le(key)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* S7 Proceso + Participa */}
              <div id="participa" className="mt-12">
                <SectionHeading id="participa" title={`7. ${le("proceso")} y ${le("participa")}`} />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border-subtle bg-bg-surface p-6">
                    <div className="mb-2 flex items-center gap-2 font-bold text-ley-purple">
                      <Gavel size={16} />
                      {le("proceso")}
                    </div>
                    <p className="text-sm leading-relaxed text-text-secondary">{le("procesoDesc")}</p>
                  </div>
                  <div className="rounded-2xl border border-border-subtle bg-bg-surface p-6">
                    <div className="mb-2 flex items-center gap-2 font-bold text-ley-purple">
                      <Megaphone size={16} />
                      {le("participa")}
                    </div>
                    <p className="text-sm leading-relaxed text-text-secondary">{le("participaDesc")}</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-5 rounded-2xl bg-ley-purple p-8 text-center text-white shadow-sm sm:p-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-ley-yellow">
                    <Handshake size={24} />
                  </div>
                  <h3 className="text-2xl font-bold sm:text-3xl">{le("cta")}</h3>
                  <p className="max-w-xl text-base text-purple-100">{le("ctaDesc")}</p>
                  <Link
                    href={`/${locale}/como-ayudar`}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-ley-purple transition-all hover:bg-white/90 hover:shadow-lg"
                  >
                    {le("cta")}
                    <ArrowRight size={16} />
                  </Link>
                </div>
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
                  {toc.map((item, i) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block rounded-xl p-2 transition-colors hover:bg-ley-purple/10 hover:text-ley-purple"
                    >
                      {i + 1}. {le(item.label)}
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
