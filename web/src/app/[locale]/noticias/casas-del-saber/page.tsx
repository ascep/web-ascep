import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  CalendarDays,
  ChevronRight,
  Clock,
  Compass,
  FileText,
  Handshake,
  Heart,
  Home,
  Layers,
  Newspaper,
  Quote,
  Star,
  Target,
  UserRound,
  Users,
} from "lucide-react";
import PostShare from "@/components/PostShare";
import { assetPath } from "@/lib/asset-path";
import { getFotos } from "@/lib/get-fotos";
import { casasDelSaberGallery } from "@/data/casas-del-saber-photos";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "casasPost" });
  return {
    title: `${t("title")} ${t("titleHighlight")} - ASCEP`,
    description: t("queEsDesc"),
    openGraph: {
      description: t("queEsDesc"),
    },
  };
}

const toc = [
  { id: "que-es", label: "queEs" },
  { id: "modalidades", label: "modalidades" },
  { id: "areas", label: "areas" },
  { id: "lineas", label: "lineas" },
  { id: "ruta", label: "ruta" },
  { id: "estructura", label: "estructura" },
  { id: "galeria", label: "galeriaTag" },
] as const;

function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <h2 id={id} className="mb-5 mt-12 scroll-mt-28 text-2xl font-extrabold text-ley-purple first:mt-0 sm:text-[1.75rem] sm:leading-tight">
      {title}
    </h2>
  );
}

export default async function CasasPostPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const fotos = await getFotos();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "casasPost" });

  const title = `${t("title")} ${t("titleHighlight")}`;

  const modalidades = [
    { title: t("modalidad1Title"), desc: t("modalidad1Desc"), icon: Home },
    { title: t("modalidad2Title"), desc: t("modalidad2Desc"), icon: Compass },
  ];

  const areas = [
    { num: 1, title: t("area1"), desc: t("area1Desc"), icon: Heart },
    { num: 2, title: t("area2"), desc: t("area2Desc"), icon: Users },
    { num: 3, title: t("area3"), desc: t("area3Desc"), icon: BookOpen },
    { num: 4, title: t("area4"), desc: t("area4Desc"), icon: Briefcase },
    { num: 5, title: t("area5"), desc: t("area5Desc"), icon: Layers },
  ];

  const lineas = [
    { title: t("linea1"), desc: t("linea1Desc"), icon: BookOpen },
    { title: t("linea2"), desc: t("linea2Desc"), icon: Target },
    { title: t("linea3"), desc: t("linea3Desc"), icon: Star },
    { title: t("linea4"), desc: t("linea4Desc"), icon: Heart },
  ];

  const fases = [
    { title: t("fase1"), periodo: t("fase1Periodo"), desc: t("fase1Desc") },
    { title: t("fase2"), periodo: t("fase2Periodo"), desc: t("fase2Desc") },
    { title: t("fase3"), periodo: t("fase3Periodo"), desc: t("fase3Desc") },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ley-purple text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <Image
            src={assetPath(fotos.casasDelSaber.hero)}
            alt=""
            fill
            className="object-cover opacity-15"
            sizes="100vw"
            priority
          />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 hidden lg:block">
          <Quote size={340} strokeWidth={1} className="text-white opacity-10" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-ley-teal/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-ley-orange/10" />

        <div className="relative mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 overflow-x-auto whitespace-nowrap text-xs font-medium text-purple-200/90">
            <Link href={`/${locale}`} className="transition-colors hover:text-white">
              {t("breadcrumbInicio")}
            </Link>
            <ChevronRight size={12} className="shrink-0" />
            <Link href={`/${locale}/noticias`} className="transition-colors hover:text-white">
              {t("breadcrumbNoticias")}
            </Link>
            <ChevronRight size={12} className="shrink-0" />
            <span className="text-ley-cyan">{t("breadcrumbPost")}</span>
          </nav>

          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-ley-orange px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md">
            <Home size={13} />
            {t("badge")}
          </span>

          <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            {t("title")} <span className="text-ley-cyan">{t("titleHighlight")}</span>
          </h1>

          <p className="mb-6 max-w-2xl text-base leading-relaxed text-purple-100 sm:text-lg">
            {t("subtitle")}
          </p>

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
                <span>2026</span>
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
                <SectionHeading id="que-es" title={`1. ${t("queEs")}`} />
                <p className="mb-4 text-[1.05rem] leading-[1.8] text-text-secondary">
                  {t("queEsDesc")}
                </p>

                <blockquote className="my-6 rounded-2xl bg-ley-purple/5 p-6 text-base font-medium italic leading-relaxed text-ley-purple-dark">
                  &quot;{t("proposito")}&quot;
                </blockquote>
              </div>

              {/* S2 Modalidades */}
              <div id="modalidades" className="mt-12">
                <SectionHeading id="modalidades" title={`2. ${t("modalidades")}`} />
                <p className="mb-5 text-[1.05rem] leading-[1.8] text-text-secondary">
                  {t("modalidadesDesc")}
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  {modalidades.map((m) => {
                    const Icon = m.icon;
                    return (
                      <div key={m.title} className="rounded-2xl border border-border-subtle bg-bg-surface p-6">
                        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-ley-teal text-white">
                          <Icon size={20} />
                        </div>
                        <h3 className="mb-2 font-extrabold text-text-primary">{m.title}</h3>
                        <p className="text-sm leading-relaxed text-text-secondary">{m.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* S3 Areas */}
              <div id="areas" className="mt-12">
                <SectionHeading id="areas" title={`3. ${t("areas")}`} />
                <p className="mb-5 text-[1.05rem] leading-[1.8] text-text-secondary">
                  {t("areasDesc")}
                </p>

                <div className="space-y-3">
                  {areas.map((a) => {
                    const Icon = a.icon;
                    return (
                      <div key={a.num} className="flex items-start gap-4 rounded-2xl border border-border-subtle bg-bg-surface p-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ley-purple text-sm font-bold text-white">
                          {a.num}
                        </div>
                        <div className="min-w-0">
                          <h3 className="flex items-center gap-2 font-bold text-text-primary">
                            <Icon size={16} className="shrink-0 text-ley-teal" />
                            {a.title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-text-secondary">{a.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* S4 Lineas */}
              <div id="lineas" className="mt-12">
                <SectionHeading id="lineas" title={`4. ${t("lineas")}`} />
                <p className="mb-5 text-[1.05rem] leading-[1.8] text-text-secondary">
                  {t("lineasDesc")}
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {lineas.map((l) => {
                    const Icon = l.icon;
                    return (
                      <div key={l.title} className="rounded-2xl border border-ley-orange/30 bg-ley-orange/5 p-5">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-ley-orange text-white">
                          <Icon size={18} />
                        </div>
                        <h3 className="mb-1 font-extrabold text-text-primary">{l.title}</h3>
                        <p className="text-xs leading-relaxed text-text-secondary">{l.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* S5 Ruta */}
              <div id="ruta" className="mt-12">
                <SectionHeading id="ruta" title={`5. ${t("ruta")}`} />
                <p className="mb-5 text-[1.05rem] leading-[1.8] text-text-secondary">
                  {t("rutaDesc")}
                </p>

                <div className="space-y-4">
                  {fases.map((f, i) => (
                    <div key={f.title} className="rounded-2xl bg-ley-purple p-6 text-white sm:p-7">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-2 rounded-lg bg-ley-teal px-3 py-1 text-xs font-bold uppercase tracking-wider">
                          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/20 text-[11px]">
                            {i + 1}
                          </span>
                          {f.title}
                        </span>
                        <span className="text-xs font-semibold text-ley-yellow">{f.periodo}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-purple-100">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* S6 Estructura */}
              <div id="estructura" className="mt-12">
                <SectionHeading id="estructura" title={`6. ${t("estructura")}`} />
                <p className="mb-5 text-[1.05rem] leading-[1.8] text-text-secondary">
                  {t("estructuraDesc")}
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {["8", "12", "4"].map((valor, i) => (
                    <div key={valor} className="rounded-2xl border border-border-subtle bg-bg-surface p-5 text-center">
                      <span className="block text-2xl font-black text-ley-purple sm:text-3xl">{valor}</span>
                      <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                        {i === 0 ? t("estructura") : i === 1 ? t("lineas") : t("linea1")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* S7 Galeria */}
              <div id="galeria" className="mt-12 scroll-mt-28">
                <SectionHeading id="galeria" title={`7. ${t("galeriaTag")}`} />
                <p className="mb-6 text-[1.05rem] leading-[1.8] text-text-secondary">
                  {t("galeriaDesc")}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                  {casasDelSaberGallery.slice(0, 6).map((src, i) => (
                    <a
                      key={src}
                      href={assetPath(src)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block overflow-hidden rounded-xl"
                      aria-label={`${t("galeriaTag")} ${i + 1}`}
                    >
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={assetPath(src)}
                          alt={`${t("galeriaTag")} ${i + 1}`}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 flex flex-col items-center gap-5 rounded-2xl bg-ley-purple p-8 text-center text-white shadow-sm sm:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-ley-yellow">
                  <Handshake size={24} />
                </div>
                <h3 className="text-2xl font-bold sm:text-3xl">{t("ctaTitle")}</h3>
                <p className="max-w-xl text-base text-purple-100">{t("ctaDesc")}</p>
                <Link
                  href={`/${locale}/casas-del-saber`}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-ley-purple transition-all hover:bg-ley-yellow hover:shadow-lg"
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
                  {t("backToNoticias")}
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
                  <span className="rounded-full bg-ley-orange/10 px-2 py-0.5 text-[10px] font-bold text-ley-orange">
                    {t("badge")}
                  </span>
                </div>

                <nav className="space-y-1 text-xs font-medium text-text-secondary sm:text-sm">
                  {toc.map((item, i) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block rounded-xl p-2 transition-colors hover:bg-ley-orange/10 hover:text-ley-orange"
                    >
                      {i + 1}. {t(item.label)}
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
                  href={`/${locale}/casas-del-saber`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-ley-purple px-4 py-3 text-xs font-bold text-white shadow transition-colors hover:bg-ley-purple-dark"
                >
                  {t("ctaBtn")}
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
