import type { PortableTextBlock } from "@portabletext/types";
import { getClient } from "./client";
import { imageUrl, fileUrl } from "./image";
import { applyPadrinoPhotoOverrides } from "@/data/padrino-photos";

interface SanityImage {
  asset?: {
    _ref?: string;
    _type?: string;
  };
  alt?: { es?: string; en?: string; pt?: string };
}

type LocalizedText = { es?: string; en?: string; pt?: string };
type SanityAssetLike = { asset?: { _ref?: string; _type?: string } } | null | undefined;
type SeoMetadata = {
  title?: LocalizedText;
  description?: LocalizedText;
  ogImage?: SanityImage;
};

type PortableTextSection = PortableTextBlock[];

import {
  siteSettingsQuery,
  pageContentQuery,
  teamMembersQuery,
  milestonesQuery,
  partnersQuery,
  featuredPartnersQuery,
  documentsQuery,
  documentsByCategoryQuery,
  videosQuery,
  videosByCategoryQuery,
  impactStatsQuery,
  testimonialsQuery,
  donationTiersQuery,
  faqByPageQuery,
  galleryAlbumsQuery,
  programasQuery,
  programaBySlugQuery,
  padrinosQuery,
  padrinoBySlugQuery,
  fotoOverridesQuery,
  noticiasQuery,
} from "./queries";

export type SiteSettings = {
  siteTitle?: { es?: string; en?: string; pt?: string };
  siteDescription?: { es?: string; en?: string; pt?: string };
  logo?: SanityImage;
  logoWhite?: SanityImage;
  logoFavicon?: SanityImage;
  ogImage?: SanityImage;
  socialLinks?: Array<{ platform: string; url: string }>;
  whatsappNumber?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: { street?: string; city?: string; country?: string };
  organization?: {
    name?: string;
    alternateName?: string;
    url?: string;
    description?: string;
  };
  donatarioUrl?: string;
  themeColor?: string;
};

export type PageContent = {
  page: string;
  seo: SeoMetadata;
  hero?: {
    tag?: { es?: string; en?: string; pt?: string };
    title?: { es?: string; en?: string; pt?: string };
    highlight?: { es?: string; en?: string; pt?: string };
    subtitle?: { es?: string; en?: string; pt?: string };
    bgImage?: SanityImage;
    bgColor?: string;
  };
};

export type TeamMember = {
  _id: string;
  name?: { es?: string; en?: string; pt?: string };
  role?: { es?: string; en?: string; pt?: string };
  photo?: SanityImage;
  order?: number;
};

export type Milestone = {
  _id: string;
  year?: string;
  title?: { es?: string; en?: string; pt?: string };
  description?: { es?: string; en?: string; pt?: string };
  image?: SanityImage;
  order?: number;
};

export type Partner = {
  _id: string;
  name?: { es?: string; en?: string; pt?: string };
  logo?: SanityImage;
  website?: string;
  sector?: string;
  order?: number;
  featured?: boolean;
};

export type DocumentEntry = {
  _id: string;
  title?: LocalizedText;
  category?: string;
  description?: LocalizedText;
  file?: SanityAssetLike;
  previewImage?: SanityImage;
  externalUrl?: string;
  order?: number;
};

export type VideoEntry = {
  _id: string;
  title?: LocalizedText;
  description?: LocalizedText;
  source?: "youtube" | "file";
  youtubeUrl?: string;
  videoFile?: SanityAssetLike;
  thumbnail?: SanityImage;
  category?: string;
  order?: number;
};

export type VideoEntryView = {
  _id: string;
  title: string;
  description: string;
  source: "youtube" | "file";
  youtubeId: string | null;
  videoUrl: string | null;
  thumbnail: string | null;
  category: string;
  order: number;
};

function toVideoEntryView(v: VideoEntry, locale: string): VideoEntryView {
  return {
    _id: v._id,
    title: localize(v.title, locale) || "",
    description: localize(v.description, locale) || "",
    source: v.source || "youtube",
    youtubeId: v.source === "youtube" && v.youtubeUrl ? extractYouTubeId(v.youtubeUrl) : null,
    videoUrl: v.source === "file" && v.videoFile?.asset?._ref ? fileUrl(v.videoFile) : null,
    thumbnail: sanityImage(v.thumbnail),
    category: v.category || "eventos",
    order: v.order ?? 0,
  };
}

export function extractYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export type ImpactStat = {
  _id: string;
  label?: { es?: string; en?: string; pt?: string };
  value?: number;
  suffix?: string;
  prefix?: string;
  icon?: string;
  color?: string;
  order?: number;
};

export type Testimonial = {
  _id: string;
  quote?: { es?: string; en?: string; pt?: string };
  author?: { es?: string; en?: string; pt?: string };
  role?: { es?: string; en?: string; pt?: string };
  avatar?: SanityImage;
  order?: number;
};

export type DonationTier = {
  _id: string;
  label?: { es?: string; en?: string; pt?: string };
  description?: { es?: string; en?: string; pt?: string };
  monthlyCop?: number;
  monthlyUsd?: number;
  icon?: string;
  color?: string;
  badge?: string;
  order?: number;
};

export type FaqSection = {
  _id: string;
  page?: string;
  items?: Array<{
    question?: { es?: string; en?: string; pt?: string };
    answer?: { es?: string; en?: string; pt?: string };
  }>;
};

export type GalleryAlbum = {
  _id: string;
  title?: { es?: string; en?: string; pt?: string };
  slug?: { current: string };
  description?: { es?: string; en?: string; pt?: string };
  images?: SanityImage[];
  category?: string;
  coverImage?: SanityImage;
  order?: number;
};

type SanityFetchParams = Record<string, string | number | boolean> | undefined;

async function sanityFetch<T>(query: string, params?: SanityFetchParams): Promise<T | null> {
  const client = getClient();
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params as never);
  } catch {
    return null;
  }
}

function localize<T = string>(obj: { es?: T; en?: T; pt?: T } | null | undefined, locale: string): T | undefined {
  if (!obj) return undefined;
  return obj[locale as keyof typeof obj] ?? obj.es;
}

function sanityImage(src: SanityImage | null | undefined): string | null {
  if (!src) return null;
  return imageUrl(src);
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityFetch<SiteSettings>(siteSettingsQuery);
}

export async function getPageContent(page: string): Promise<PageContent | null> {
  return sanityFetch<PageContent>(pageContentQuery, { page });
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const data = await sanityFetch<TeamMember[]>(teamMembersQuery);
  return data ?? [];
}

export async function getMilestones(): Promise<Milestone[]> {
  const data = await sanityFetch<Milestone[]>(milestonesQuery);
  return data ?? [];
}

export async function getPartners(): Promise<Partner[]> {
  const data = await sanityFetch<Partner[]>(partnersQuery);
  return data ?? [];
}

export async function getFeaturedPartners(): Promise<Partner[]> {
  const data = await sanityFetch<Partner[]>(featuredPartnersQuery);
  return data ?? [];
}

export async function getDocuments(): Promise<DocumentEntry[]> {
  const data = await sanityFetch<DocumentEntry[]>(documentsQuery);
  return data ?? [];
}

export async function getDocumentsByCategory(category: string): Promise<DocumentEntry[]> {
  const data = await sanityFetch<DocumentEntry[]>(documentsByCategoryQuery, { category });
  return data ?? [];
}

export async function getVideos(locale: string): Promise<VideoEntryView[]> {
  const data = await sanityFetch<VideoEntry[]>(videosQuery);
  return (data ?? []).map((v) => toVideoEntryView(v, locale));
}

export async function getVideosByCategory(category: string, locale: string): Promise<VideoEntryView[]> {
  const data = await sanityFetch<VideoEntry[]>(videosByCategoryQuery, { category });
  return (data ?? []).map((v) => toVideoEntryView(v, locale));
}

export async function getImpactStats(): Promise<ImpactStat[]> {
  const data = await sanityFetch<ImpactStat[]>(impactStatsQuery);
  return data ?? [];
}

export async function getTestimonials(section: string): Promise<Testimonial[]> {
  const data = await sanityFetch<Testimonial[]>(testimonialsQuery, { section });
  return data ?? [];
}

export async function getDonationTiers(): Promise<DonationTier[]> {
  const data = await sanityFetch<DonationTier[]>(donationTiersQuery);
  return data ?? [];
}

export async function getFaqByPage(page: string): Promise<FaqSection | null> {
  return sanityFetch<FaqSection>(faqByPageQuery, { page });
}

export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  const data = await sanityFetch<GalleryAlbum[]>(galleryAlbumsQuery);
  return data ?? [];
}

export type Programa = {
  _id: string;
  title?: { es?: string; en?: string; pt?: string };
  slug?: { current: string };
  shortDescription?: { es?: string; en?: string; pt?: string };
  heroImage?: SanityImage;
  programLogo?: SanityImage;
  brandColor?: string;
  order?: number;
};

export type ProgramaDetail = Programa & {
  introText?: PortableTextSection;
  objectives?: Array<{ title?: LocalizedText; description?: LocalizedText }>;
  components?: Array<{ title?: LocalizedText; description?: LocalizedText; icon?: string }>;
  results?: Array<{ es?: string; en?: string; pt?: string }>;
  modules?: Array<{ code?: string; title?: LocalizedText; description?: LocalizedText; icon?: string }>;
  actionLines?: Array<{ title?: LocalizedText; description?: LocalizedText; icon?: string }>;
  pillars?: Array<{ title?: LocalizedText; description?: LocalizedText }>;
  crossCutting?: Array<{ title?: LocalizedText; description?: LocalizedText }>;
  incidenciaItems?: Array<{ es?: string; en?: string; pt?: string }>;
  secondaryObjectives?: Array<{ es?: string; en?: string; pt?: string }>;
  gallery?: SanityImage[];
  seo?: SeoMetadata;
};

export async function getPrograms(): Promise<Programa[]> {
  const data = await sanityFetch<Programa[]>(programasQuery);
  return data ?? [];
}

export type NoticiaEntry = {
  _id: string;
  slug?: { current?: string };
  title?: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  coverImage?: SanityImage;
};

export async function getNoticias(): Promise<NoticiaEntry[]> {
  const data = await sanityFetch<NoticiaEntry[]>(noticiasQuery);
  return data ?? [];
}

export async function getProgramBySlug(slug: string): Promise<ProgramaDetail | null> {
  return sanityFetch<ProgramaDetail>(programaBySlugQuery, { slug });
}

export type PadrinoNeed = {
  _key?: string;
  title?: { es?: string; en?: string; pt?: string };
  description?: { es?: string; en?: string; pt?: string };
  priority?: "high" | "medium" | "low" | "achieved";
  progress?: number;
  targetAmount?: string;
  currentAmount?: string;
};

export type ProgressMedia = {
  _key?: string;
  mediaType?: "image" | "video";
  image?: SanityImage;
  videoUrl?: string;
  thumbnail?: SanityImage;
};

export type ProgressPost = {
  _key?: string;
  date?: string;
  author?: LocalizedText;
  authorRole?: LocalizedText;
  title?: LocalizedText;
  description?: PortableTextSection;
  type?: "story" | "milestone" | "update";
  media?: ProgressMedia[];
  tags?: string[];
};

export type PadrinoProfile = {
  _id: string;
  name?: LocalizedText;
  slug?: { current: string };
  age?: number;
  city?: LocalizedText;
  photo?: SanityImage;
  coverPhoto?: SanityImage;
  shortBio?: LocalizedText;
  fullBio?: PortableTextSection;
  impactPercentage?: number;
  storiesCount?: number;
  yearsInProgram?: number;
  needs?: PadrinoNeed[];
  impactMessage?: LocalizedText;
  impactStatLabel?: LocalizedText;
  impactStatValue?: string;
  impactStatDescription?: LocalizedText;
  progressPosts?: ProgressPost[];
  galleryPhotos?: SanityImage[];
  order?: number;
  active?: boolean;
};

export async function getPadrinos(): Promise<PadrinoProfile[]> {
  const data = await sanityFetch<PadrinoProfile[]>(padrinosQuery);
  return (data ?? []).map(applyPadrinoPhotoOverrides);
}

export async function getPadrinoBySlug(slug: string): Promise<PadrinoProfile | null> {
  const profile = await sanityFetch<PadrinoProfile>(padrinoBySlugQuery, { slug });
  return profile ? applyPadrinoPhotoOverrides(profile) : null;
}

export { localize, sanityImage };

export type FotoOverride = {
  targetPath: string;
  newPath: string;
};

export type FotoOverridesDoc = {
  overrides?: FotoOverride[];
};

export async function getFotoOverrides(): Promise<FotoOverride[]> {
  const data = await sanityFetch<FotoOverridesDoc>(fotoOverridesQuery);
  return data?.overrides ?? [];
}
