import { getClient } from "./client";
import { imageUrl } from "./image";

interface SanityImage {
  asset?: {
    _ref?: string;
    _type?: string;
  };
  alt?: { es?: string; en?: string; pt?: string };
}
import {
  siteSettingsQuery,
  pageContentQuery,
  teamMembersQuery,
  milestonesQuery,
  partnersQuery,
  featuredPartnersQuery,
  documentsQuery,
  documentsByCategoryQuery,
  impactStatsQuery,
  testimonialsQuery,
  donationTiersQuery,
  faqByPageQuery,
  galleryAlbumsQuery,
  programasQuery,
  programaBySlugQuery,
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
  seo: {
    title?: { es?: string; en?: string; pt?: string };
    description?: { es?: string; en?: string; pt?: string };
    ogImage?: SanityImage;
  };
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
  title?: { es?: string; en?: string; pt?: string };
  category?: string;
  description?: { es?: string; en?: string; pt?: string };
  file?: any;
  externalUrl?: string;
  order?: number;
};

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

async function sanityFetch<T>(query: string, params?: Record<string, string | number | boolean>): Promise<T | null> {
  const client = getClient();
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params as any);
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
  introText?: any;
  objectives?: Array<{ title?: any; description?: any }>;
  components?: Array<{ title?: any; description?: any; icon?: string }>;
  results?: Array<{ es?: string; en?: string; pt?: string }>;
  modules?: Array<{ code?: string; title?: any; description?: any; icon?: string }>;
  actionLines?: Array<{ title?: any; description?: any; icon?: string }>;
  pillars?: Array<{ title?: any; description?: any }>;
  crossCutting?: Array<{ title?: any; description?: any }>;
  incidenciaItems?: Array<{ es?: string; en?: string; pt?: string }>;
  secondaryObjectives?: Array<{ es?: string; en?: string; pt?: string }>;
  gallery?: SanityImage[];
  seo?: any;
};

export async function getPrograms(): Promise<Programa[]> {
  const data = await sanityFetch<Programa[]>(programasQuery);
  return data ?? [];
}

export async function getProgramBySlug(slug: string): Promise<ProgramaDetail | null> {
  return sanityFetch<ProgramaDetail>(programaBySlugQuery, { slug });
}

export { localize, sanityImage };
