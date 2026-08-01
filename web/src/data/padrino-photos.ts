import type { PadrinoProfile } from "@/lib/sanity/fetch";

type PadrinoPhotoOverride = {
  photo?: string;
  coverPhoto?: string;
  galleryPhotos?: string[];
};

const padrinoPhotoOverrides: Record<string, PadrinoPhotoOverride> = {
  "yaritza-valegas": {
    photo: "/images/plan-padrino/yaritza-sinisterra/1.webp",
    coverPhoto: "/images/plan-padrino/yaritza-sinisterra/2.webp",
    galleryPhotos: [
      "/images/plan-padrino/yaritza-sinisterra/1.webp",
      "/images/plan-padrino/yaritza-sinisterra/2.webp",
      "/images/plan-padrino/yaritza-sinisterra/3.webp",
      "/images/plan-padrino/yaritza-sinisterra/4.webp",
      "/images/plan-padrino/yaritza-sinisterra/5.webp",
    ],
  },
};

export function applyPadrinoPhotoOverrides(profile: PadrinoProfile): PadrinoProfile {
  const o = padrinoPhotoOverrides[profile.slug?.current ?? ""];
  if (!o) return profile;
  return {
    ...profile,
    ...(o.photo ? { photo: o.photo as PadrinoProfile["photo"] } : {}),
    ...(o.coverPhoto ? { coverPhoto: o.coverPhoto as PadrinoProfile["coverPhoto"] } : {}),
    ...(o.galleryPhotos ? { galleryPhotos: o.galleryPhotos as PadrinoProfile["galleryPhotos"] } : {}),
  };
}
