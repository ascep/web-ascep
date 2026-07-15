// Document types
import noticia from "./noticia";
import programa from "./programa";
import siteSettings from "./documents/siteSettings";
import pageContent from "./documents/pageContent";
import teamMember from "./documents/teamMember";
import milestone from "./documents/milestone";
import documentEntry from "./documents/documentEntry";
import partner from "./documents/partner";
import videoEntry from "./documents/videoEntry";
import galleryAlbum from "./documents/galleryAlbum";
import impactStat from "./documents/impactStat";
import testimonial from "./documents/testimonial";
import donationTier from "./documents/donationTier";
import faqSection from "./documents/faqSection";

// Object types
import blockContent from "./blockContent";
import localizedString from "./objects/localizedString";
import localizedText from "./objects/localizedText";
import localizedBlockContent from "./objects/localizedBlockContent";
import imageWithAlt from "./objects/imageWithAlt";
import seo from "./objects/seo";
import socialLink from "./objects/socialLink";
import faqItem from "./objects/faqItem";

export const schemaTypes = [
  // Documents
  noticia,
  programa,
  siteSettings,
  pageContent,
  teamMember,
  milestone,
  documentEntry,
  partner,
  videoEntry,
  galleryAlbum,
  impactStat,
  testimonial,
  donationTier,
  faqSection,

  // Objects
  blockContent,
  localizedString,
  localizedText,
  localizedBlockContent,
  imageWithAlt,
  seo,
  socialLink,
  faqItem,
];
