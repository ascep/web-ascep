"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import {
  Heart,
  Play,
  CheckCircle,
  GraduationCap,
  TrendingUp,
  Target,
} from "lucide-react";
import { imageUrl } from "@/lib/sanity/image";
import type { PadrinoProfile, ProgressPost, PadrinoNeed } from "@/lib/sanity/fetch";

type LocalizedText = { es?: string; en?: string; pt?: string } | null | undefined;

type SanityAssetLike = {
  asset?: {
    _ref?: string;
    _type?: string;
  };
  alt?: string | { es?: string; en?: string; pt?: string };
};

function localize(obj: LocalizedText, locale: string): string | undefined {
  if (!obj) return undefined;
  return obj[locale as keyof typeof obj] ?? obj.es;
}

function formatDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr);
  const rtf = new Intl.RelativeTimeFormat(locale === "en" ? "en-US" : locale === "pt" ? "pt-BR" : "es", { numeric: "auto" });
  const diff = Math.floor((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (Math.abs(diff) < 7) return rtf.format(diff, "day");
  return d.toLocaleDateString(locale === "en" ? "en-US" : locale === "pt" ? "pt-BR" : "es", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getYouTubeEmbed(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function yearLabel(n: number, locale: string): string {
  if (locale === "en") return n === 1 ? "Year" : "Years";
  if (locale === "pt") return n === 1 ? "Ano" : "Anos";
  return n === 1 ? "Ano" : "Anos";
}

const priorityConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  high: { label: "Prioridad Alta", color: "text-brand-orange", bg: "bg-brand-orange/10", border: "border-brand-orange" },
  medium: { label: "Prioridad Media", color: "text-brand-yellow", bg: "bg-brand-yellow/10", border: "border-brand-yellow" },
  low: { label: "Prioridad Baja", color: "text-brand-teal", bg: "bg-brand-teal/10", border: "border-brand-teal" },
  achieved: { label: "Logrado", color: "text-brand-primary", bg: "bg-brand-primary/10", border: "border-brand-primary" },
};

function NeedCard({ need, locale }: { need: PadrinoNeed; locale: string }) {
  const priority = priorityConfig[need.priority || "medium"];
  const isAchieved = need.priority === "achieved";
  const progress = need.progress ?? (isAchieved ? 100 : 0);

  return (
    <div className={`rounded-[10px] border-2 ${isAchieved ? "border-brand-primary bg-white" : `${priority.border} bg-white`} p-4`}>
      <div className="mb-2 flex items-start justify-between gap-2">
        <span className="font-bold text-[var(--color-text-primary)]">
          {localize(need.title, locale)}
        </span>
        <span className={`shrink-0 whitespace-nowrap rounded px-2 py-0.5 text-xs font-bold ${priority.bg} ${priority.color}`}>
          {isAchieved ? (
            <span className="flex items-center gap-1"><CheckCircle size={12} /> Logrado</span>
          ) : priority.label}
        </span>
      </div>
      {need.description && (
        <p className="mb-3 text-sm text-[var(--color-text-muted)]">
          {localize(need.description, locale)}
        </p>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-brand-soft">
        <div
          className={`h-full rounded-full transition-all duration-500 ${isAchieved ? "bg-brand-primary" : "bg-brand-orange"}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
        {isAchieved ? (
          <span className="font-bold text-brand-primary">
            {locale === "en" ? "Goal reached!" : locale === "pt" ? "Objetivo alcancado!" : "Objetivo alcanzado!"}
          </span>
        ) : (
          <span>{progress}% completado</span>
        )}
        {need.targetAmount && (
          <span>{need.currentAmount} de {need.targetAmount}</span>
        )}
      </div>
    </div>
  );
}

function ProgressPostCard({ post, locale }: { post: ProgressPost; locale: string }) {
  const [showVideo, setShowVideo] = useState(false);
  const title = localize(post.title, locale);
  const author = localize(post.author, locale);
  const authorRole = localize(post.authorRole, locale);
  const tags = post.tags || [];
  const media = post.media || [];
  const descriptionBlocks = Array.isArray(post.description)
    ? (post.description as PortableTextBlock[])
    : [];
  const isMilestone = post.type === "milestone";

  return (
    <div className="overflow-hidden rounded-[10px] border border-[var(--color-border-subtle)] bg-white shadow-sm transition-all hover:border-brand-teal/40 hover:shadow-md">
      {author && (
        <div className="flex items-center gap-3 border-b border-[var(--color-border-subtle)] p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white">
            {author.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-bold text-[var(--color-text-primary)]">
              {author}
              {authorRole && <span className="font-normal text-[var(--color-text-muted)]"> - {authorRole}</span>}
            </p>
            {post.date && (
              <p className="text-xs text-[var(--color-text-muted)]">
                {formatDate(post.date, locale)}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="p-4">
        {isMilestone ? (
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-[10px] bg-brand-teal/10 p-3 text-brand-primary">
              <GraduationCap size={28} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                {locale === "en" ? "Academic Milestone" : locale === "pt" ? "Marco Academico" : "Hito Academico"}
              </span>
              <h3 className="mt-1 text-lg font-bold text-[var(--color-text-primary)]">{title}</h3>
              {descriptionBlocks.length > 0 && (
                <div className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  <PortableText value={descriptionBlocks} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {title && (
              <h3 className="mb-2 text-base font-bold text-[var(--color-text-primary)]">{title}</h3>
            )}
            {descriptionBlocks.length > 0 && (
              <div className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                <PortableText value={descriptionBlocks} />
              </div>
            )}
          </>
        )}

        {media.length > 0 && (
          <div className={`mt-4 ${media.length === 1 ? "" : "grid grid-cols-2 gap-2"}`}>
            {media.map((m) => {
              if (m.mediaType === "video" && m.videoUrl) {
                const embedUrl = getYouTubeEmbed(m.videoUrl);
                return (
                  <div key={m._key} className="relative aspect-video overflow-hidden rounded-[10px] bg-[var(--color-bg-elevated)]">
                    {showVideo && embedUrl ? (
                      <iframe
                        src={embedUrl}
                        className="absolute inset-0 h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        {m.thumbnail ? (
                          <Image
                            src={imageUrl(m.thumbnail, 800, 450) || ""}
                            alt=""
                            width={800}
                            height={450}
                            className="h-full w-full object-cover opacity-70"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[var(--color-bg-elevated)]">
                            <Play size={48} className="text-[var(--color-text-muted)]" />
                          </div>
                        )}
                        <button
                          onClick={() => setShowVideo(true)}
                          className="absolute inset-0 z-10 flex items-center justify-center"
                        >
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/90 text-white shadow-lg transition-transform hover:scale-110">
                            <Play size={32} className="ml-1" />
                          </div>
                        </button>
                      </>
                    )}
                  </div>
                );
              }
              if (m.image) {
                return (
                  <div key={m._key} className="overflow-hidden rounded-[10px]">
                    <Image
                      src={imageUrl(m.image, 800, 600) || ""}
                      alt={typeof m.image?.alt === "string" ? m.image.alt : ""}
                      width={800}
                      height={600}
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span key={i} className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand-primary">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BentoGallery({ photos }: { photos: Array<SanityAssetLike> }) {
  if (!photos || photos.length === 0) return null;

  if (photos.length === 1) {
    return (
      <div className="overflow-hidden rounded-[10px] border border-[var(--color-border-subtle)] shadow-sm">
        <Image
          src={imageUrl(photos[0], 1200, 800) || ""}
          alt={typeof photos[0]?.alt === "string" ? photos[0].alt : ""}
          width={1200}
          height={800}
          className="h-64 w-full object-cover md:h-96"
        />
      </div>
    );
  }

  if (photos.length === 2) {
    return (
      <div className="grid gap-2 md:grid-cols-2 md:h-80">
        {photos.map((photo, i) => (
          <div key={i} className="overflow-hidden rounded-[10px] border border-[var(--color-border-subtle)] shadow-sm">
            <Image
              src={imageUrl(photo, 800, 600) || ""}
              alt={typeof photo?.alt === "string" ? photo.alt : ""}
              width={800}
              height={600}
              className="h-48 w-full object-cover md:h-full"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid h-64 grid-cols-4 gap-2 md:h-96">
      <div className="col-span-2 row-span-2 overflow-hidden rounded-[10px] border border-[var(--color-border-subtle)] shadow-sm">
        <Image
          src={imageUrl(photos[0], 800, 800) || ""}
          alt={typeof photos[0]?.alt === "string" ? photos[0].alt : ""}
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      {photos.slice(1, 3).map((photo, i) => (
        <div key={i} className="col-span-2 overflow-hidden rounded-[10px] border border-[var(--color-border-subtle)] shadow-sm">
          <Image
            src={imageUrl(photo, 600, 400) || ""}
            alt={typeof photo?.alt === "string" ? photo.alt : ""}
            width={600}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      ))}
      {photos.slice(3, 5).map((photo, i) => (
        <div key={i} className="col-span-1 overflow-hidden rounded-[10px] border border-[var(--color-border-subtle)] shadow-sm">
          <Image
            src={imageUrl(photo, 400, 400) || ""}
            alt={typeof photo?.alt === "string" ? photo.alt : ""}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}

export default function PadProfilePage({
  profile,
  locale,
  otherProfiles,
}: {
  profile: PadrinoProfile;
  locale: string;
  otherProfiles?: PadrinoProfile[];
}) {
  const t = useTranslations("padrinoProfile");
  const pathname = usePathname();
  const profileUrl = typeof window !== "undefined" ? window.location.href : `https://ascep.org${pathname}`;
  const name = localize(profile.name, locale) || "";
  const shortBio = localize(profile.shortBio, locale) || "";
  const impactMessage = localize(profile.impactMessage, locale) || "";
  const impactStatDescription = localize(profile.impactStatDescription, locale) || "";
  const posts = profile.progressPosts || [];
  const needs = profile.needs || [];
  const gallery = profile.galleryPhotos || [];
  const contactSubject = `Quiero apadrinar a ${name}`;
  const contactMessage = `Hola, estoy interesado en apadrinar a ${name}. Me gustaría saber más sobre cómo puedo apoyar su proceso.`;

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)]">
      <section className="relative">
        {/* Cover Photo */}
        <div className="relative h-56 w-full overflow-hidden md:h-72">
          {profile.coverPhoto ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl(profile.coverPhoto, 1920, 960) || ""})` }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-primary-dark" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>

        {/* Profile Header - below cover */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-12 flex flex-col items-center gap-4 md:-mt-16 md:flex-row md:items-end">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl md:h-36 md:w-36">
                {profile.photo ? (
                  <Image
                    src={imageUrl(profile.photo, 400, 400) || ""}
                    alt={name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-brand-soft text-5xl font-bold text-brand-primary">
                    {name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="absolute bottom-1 right-1 rounded-full border-2 border-white bg-brand-primary p-1 text-white">
                <CheckCircle size={16} />
              </div>
            </div>

            {/* Name + Bio */}
            <div className="flex-1 pb-2 text-center md:text-left">
              <h1 className="text-3xl font-extrabold text-brand-primary md:text-4xl">{name}</h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--color-text-secondary)] md:text-base">
                {shortBio}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pb-4">
              <Link
                href={`/${locale}/contacto?nombre=${encodeURIComponent(name)}&asunto=${encodeURIComponent(contactSubject)}&mensaje=${encodeURIComponent(contactMessage)}`}
                className="rounded-[10px] bg-brand-orange px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-brand-orange-dark active:scale-95"
              >
                {t("donateNow") || "Donar Ahora"}
              </Link>
              <Link
                href={`/${locale}/contacto?nombre=${encodeURIComponent(name)}&asunto=${encodeURIComponent(contactSubject)}&mensaje=${encodeURIComponent(contactMessage)}`}
                className="rounded-[10px] border-2 border-brand-primary/20 bg-white px-5 py-2.5 text-sm font-bold text-brand-primary transition-all hover:bg-brand-primary/5"
              >
                {t("sendMessage") || "Enviar Mensaje"}
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-4 mb-8 flex gap-6 overflow-hidden rounded-[10px] border border-[var(--color-border-subtle)] bg-white shadow-sm">
            {profile.impactPercentage != null && (
              <div className="flex-1 border-r border-[var(--color-border-subtle)] py-4 text-center">
                <span className="block text-xl font-extrabold text-brand-primary">{profile.impactPercentage}%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                  {t("currentImpact") || "Impacto"}
                </span>
              </div>
            )}
            {profile.storiesCount != null && (
              <div className="flex-1 border-r border-[var(--color-border-subtle)] py-4 text-center">
                <span className="block text-xl font-extrabold text-brand-orange">{profile.storiesCount}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                  {t("storiesShared") || "Historias"}
                </span>
              </div>
            )}
            {profile.yearsInProgram != null && (
              <div className="flex-1 py-4 text-center">
                <span className="block text-xl font-extrabold text-brand-primary">{profile.yearsInProgram}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                  {yearLabel(profile.yearsInProgram, locale)}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Needs + Impact + Share */}
          <div className="space-y-6 lg:col-span-4">
            {/* Needs Card */}
            <div className="rounded-[10px] border-2 border-brand-primary/20 bg-brand-soft p-5">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-brand-primary">
                <Target size={20} />
                {t("currentNeeds") || "Necesidades Actuales"}
              </h3>
              <div className="space-y-3">
                {needs.length > 0 ? (
                  needs.map((need) => (
                    <NeedCard key={need._key} need={need} locale={locale} />
                  ))
                ) : (
                  <p className="text-sm text-[var(--color-text-muted)]">Sin necesidades registradas.</p>
                )}
              </div>
              <Link
                href={`/${locale}/contacto?nombre=${encodeURIComponent(name)}&asunto=${encodeURIComponent(contactSubject)}&mensaje=${encodeURIComponent(contactMessage)}`}
                className="mt-4 block w-full rounded-[10px] bg-brand-primary py-3 text-center text-sm font-bold text-white transition-colors hover:bg-brand-primary-dark"
              >
                {t("supportGoal") || "Apoyar Meta General"}
              </Link>
            </div>

            {/* Monthly Impact Card */}
            {impactMessage && (
              <div className="rounded-[10px] bg-brand-primary p-5 text-white">
                <h4 className="mb-1 font-bold">{t("yourMonthlyImpact") || "Tu impacto mensual"}</h4>
                <p className="mb-4 text-sm leading-relaxed text-white/80">{impactMessage}</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <TrendingUp size={24} className="text-white" />
                  </div>
                  <div>
                    {profile.impactStatValue && <p className="font-bold">{profile.impactStatValue}</p>}
                    {impactStatDescription && (
                      <p className="text-xs text-white/70">{impactStatDescription}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Share Card */}
            <div className="rounded-[10px] border border-[var(--color-border-subtle)] bg-white p-5 shadow-sm">
              <h4 className="mb-3 text-sm font-bold text-[var(--color-text-primary)]">
                {locale === "en" ? "Share this profile" : locale === "pt" ? "Compartilhe este perfil" : "Compartir este perfil"}
              </h4>
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Conoce a ${name} en ASCEP: ${profileUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-[10px] bg-green-500/10 py-2.5 text-xs font-bold text-green-600 transition-colors hover:bg-green-500/20"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-[10px] bg-blue-500/10 py-2.5 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-500/20"
                >
                  Facebook
                </a>
                <button
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText(profileUrl);
                    }
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-[10px] bg-[var(--color-bg-elevated)] py-2.5 text-xs font-bold text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-border-subtle)]"
                >
                  {locale === "en" ? "Copy" : locale === "pt" ? "Copiar" : "Copiar"}
                </button>
              </div>
            </div>

            {/* About ASCEP Card */}
            <div className="rounded-[10px] border border-[var(--color-border-subtle)] bg-white p-5 shadow-sm">
              <h4 className="mb-2 text-sm font-bold text-[var(--color-text-primary)]">
                {locale === "en" ? "About ASCEP" : locale === "pt" ? "Sobre a ASCEP" : "Sobre ASCEP"}
              </h4>
              <p className="mb-3 text-xs leading-relaxed text-[var(--color-text-muted)]">
                {locale === "en"
                  ? "ASCEP accompanies young people leaving the child protection system in their transition to independent life."
                  : locale === "pt"
                    ? "A ASCEP acompanha jovens que saem do sistema de protecao infantil em sua transicao para a vida independente."
                    : "ASCEP acompania a jovenes en proceso de egreso del sistema de proteccion en su transicion a la vida independiente."}
              </p>
              <Link
                href={`/${locale}/quienes-somos`}
                className="text-xs font-bold text-brand-primary hover:text-brand-primary-dark"
              >
                {locale === "en" ? "Learn more" : locale === "pt" ? "Saiba mais" : "Conocer mas"} &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column: Progress Feed */}
          <div className="space-y-6 lg:col-span-8">
            <h2 className="flex items-center gap-3 text-xl font-bold text-brand-primary">
              <GraduationCap size={28} />
              {t("progressStories") || "Historias de Progreso"}
            </h2>

            {posts.length > 0 ? (
              posts.map((post) => (
                <ProgressPostCard key={post._key} post={post} locale={locale} />
              ))
            ) : (
              <div className="rounded-[10px] border-2 border-dashed border-[var(--color-border-subtle)] p-8 text-center text-[var(--color-text-muted)]">
                {t("noPostsYet") || "Proximamente compartiremos historias de progreso."}
              </div>
            )}

            {/* Bento Photo Gallery */}
            {gallery.length > 0 && <BentoGallery photos={gallery} />}
          </div>
        </div>
      </section>

      {/* Other Profiles */}
      {otherProfiles && otherProfiles.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-brand-primary">
            <Heart size={28} />
            {t("otherYouth") || "Otros Jovenes que Necesitan tu Apoyo"}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {otherProfiles.map((op) => (
              <OtherProfileCard key={op._id} profile={op} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function OtherProfileCard({ profile, locale }: { profile: PadrinoProfile; locale: string }) {
  const name = localize(profile.name, locale) || "";
  const shortBio = localize(profile.shortBio, locale) || "";
  const age = profile.age;

  return (
    <Link
      href={`/${locale}/como-ayudar/plan-padrino/${profile.slug?.current}`}
      className="flex flex-col rounded-[10px] border border-[var(--color-border-subtle)] bg-white p-5 shadow-sm transition-all hover:border-brand-teal/40 hover:shadow-md"
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-brand-primary bg-white">
          {profile.photo ? (
            <Image
              src={imageUrl(profile.photo, 200, 200) || ""}
              alt={name}
              width={200}
              height={200}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-bold text-brand-primary">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-bold text-brand-primary">{name}</h4>
          {age && <span className="text-xs text-[var(--color-text-muted)]">{age} {yearLabel(age, locale)}</span>}
        </div>
      </div>
      <p className="mb-4 flex-grow text-sm leading-relaxed text-[var(--color-text-secondary)]">
        &ldquo;{shortBio}&rdquo;
      </p>
      <span className="mt-auto block w-full rounded-[10px] bg-brand-primary py-2 text-center text-sm font-bold text-white transition-colors hover:bg-brand-primary-dark">
        {locale === "en" ? "Learn Their Story" : locale === "pt" ? "Conhecer Historia" : "Conocer Historia"}
      </span>
    </Link>
  );
}
