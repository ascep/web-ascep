import { groq } from "next-sanity";

// ============================================================
// NOTICIAS (enhanced with localized fields)
// ============================================================

export const noticiasQuery = groq`*[_type == "noticia"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  category,
  author,
  publishedAt
}`;

export const noticiaBySlugQuery = groq`*[_type == "noticia" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  category,
  author,
  publishedAt,
  body,
  seo
}`;

// ============================================================
// PROGRAMAS (enhanced with full content)
// ============================================================

export const programasQuery = groq`*[_type == "programa"] | order(order asc) {
  _id,
  title,
  slug,
  shortDescription,
  heroImage,
  programLogo,
  brandColor,
  order
}`;

export const programaBySlugQuery = groq`*[_type == "programa" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  shortDescription,
  heroImage,
  programLogo,
  brandColor,
  introText,
  objectives,
  components,
  results,
  modules,
  actionLines,
  pillars,
  crossCutting,
  incidenciaItems,
  secondaryObjectives,
  gallery,
  order,
  seo
}`;

// ============================================================
// SITE SETTINGS (singleton)
// ============================================================

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  siteTitle,
  siteDescription,
  logo,
  logoWhite,
  logoFavicon,
  ogImage,
  socialLinks,
  whatsappNumber,
  contactEmail,
  contactPhone,
  address,
  organization,
  donatarioUrl,
  themeColor
}`;

// ============================================================
// PAGE CONTENT (per-page SEO + hero)
// ============================================================

export const pageContentQuery = groq`*[_type == "pageContent" && page == $page][0] {
  page,
  seo,
  hero
}`;

export const allPageContentsQuery = groq`*[_type == "pageContent"] {
  page,
  seo,
  hero
}`;

// ============================================================
// TEAM MEMBERS
// ============================================================

export const teamMembersQuery = groq`*[_type == "teamMember" && active == true] | order(order asc) {
  _id,
  name,
  role,
  photo,
  order
}`;

// ============================================================
// MILESTONES
// ============================================================

export const milestonesQuery = groq`*[_type == "milestone"] | order(order asc) {
  _id,
  year,
  title,
  description,
  image,
  order
}`;

// ============================================================
// DOCUMENTS (transparencia)
// ============================================================

export const documentsQuery = groq`*[_type == "documentEntry"] | order(category asc, order asc) {
  _id,
  title,
  category,
  description,
  file,
  previewImage,
  externalUrl,
  order
}`;

export const documentsByCategoryQuery = groq`*[_type == "documentEntry" && category == $category] | order(order asc) {
  _id,
  title,
  category,
  description,
  file,
  previewImage,
  externalUrl,
  order
}`;

// ============================================================
// PARTNERS
// ============================================================

export const partnersQuery = groq`*[_type == "partner"] | order(order asc) {
  _id,
  name,
  logo,
  website,
  sector,
  order,
  featured
}`;

export const featuredPartnersQuery = groq`*[_type == "partner" && featured == true] | order(order asc) {
  _id,
  name,
  logo,
  website,
  sector
}`;

// ============================================================
// VIDEOS
// ============================================================

export const videosQuery = groq`*[_type == "videoEntry"] | order(category asc, order asc) {
  _id,
  title,
  description,
  source,
  youtubeUrl,
  videoFile,
  thumbnail,
  category,
  order
}`;

export const videosByCategoryQuery = groq`*[_type == "videoEntry" && category == $category] | order(order asc) {
  _id,
  title,
  description,
  source,
  youtubeUrl,
  videoFile,
  thumbnail,
  category,
  order
}`;

// ============================================================
// GALLERY ALBUMS
// ============================================================

export const galleryAlbumsQuery = groq`*[_type == "galleryAlbum"] | order(order asc) {
  _id,
  title,
  slug,
  description,
  images,
  category,
  coverImage,
  order
}`;

export const galleryAlbumBySlugQuery = groq`*[_type == "galleryAlbum" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  images,
  category,
  coverImage
}`;

export const heroImagesQuery = groq`*[_type == "galleryAlbum" && category == "hero"] | order(order asc) {
  _id,
  title,
  slug,
  images
}`;

// ============================================================
// IMPACT STATS
// ============================================================

export const impactStatsQuery = groq`*[_type == "impactStat"] | order(order asc) {
  _id,
  label,
  value,
  suffix,
  prefix,
  icon,
  color,
  order
}`;

// ============================================================
// TESTIMONIALS
// ============================================================

export const testimonialsQuery = groq`*[_type == "testimonial" && section == $section] | order(order asc) {
  _id,
  quote,
  author,
  role,
  avatar,
  order
}`;

// ============================================================
// DONATION TIERS
// ============================================================

export const donationTiersQuery = groq`*[_type == "donationTier"] | order(order asc) {
  _id,
  label,
  description,
  monthlyCop,
  monthlyUsd,
  icon,
  color,
  badge,
  order
}`;

// ============================================================
// FAQ
// ============================================================

export const faqByPageQuery = groq`*[_type == "faqSection" && page == $page][0] {
  _id,
  page,
  items[] {
    question,
    answer
  }
}`;

// ============================================================
// PADRINO PROFILES
// ============================================================

export const padrinosQuery = groq`*[_type == "padrinoProfile" && active == true] | order(order asc) {
  _id,
  name,
  slug,
  age,
  city,
  photo,
  shortBio,
  order
}`;

export const padrinoBySlugQuery = groq`*[_type == "padrinoProfile" && slug.current == $slug && active == true][0] {
  _id,
  name,
  slug,
  age,
  city,
  photo,
  coverPhoto,
  shortBio,
  fullBio,
  impactPercentage,
  storiesCount,
  yearsInProgram,
  needs,
  impactMessage,
  impactStatLabel,
  impactStatValue,
  impactStatDescription,
  progressPosts[] | order(date desc) {
    _key,
    date,
    author,
    authorRole,
    title,
    description,
    type,
    media[] {
      _key,
      mediaType,
      image,
      videoUrl,
      thumbnail
    },
    tags
  },
  galleryPhotos,
  order
}`;

// ============================================================
// FOTO OVERRIDES
// ============================================================

export const fotoOverridesQuery = groq`*[_type == "fotoOverrides"][0] {
  overrides
}`;
