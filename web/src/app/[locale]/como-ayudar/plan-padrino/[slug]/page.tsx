import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPadrinoBySlug, getPadrinos, localize } from "@/lib/sanity/fetch";
import PadProfilePage from "@/components/PadProfilePage";
import { assetPath } from "@/lib/asset-path";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getPadrinoBySlug(slug);
  if (!profile) return { title: "Perfil no encontrado" };
  const name = localize(profile.name, "es") || "";
  const bio = localize(profile.shortBio, "es") || "";
  return {
    title: `${name} - Plan Padrino ASCEP`,
    description: bio,
    openGraph: { title: `${name} - Plan Padrino ASCEP`, description: bio },
  };
}

export default async function PadrinoProfilePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "padrinoProfile" });
  const profile = await getPadrinoBySlug(slug);

  if (!profile) {
    notFound();
  }

  const allPadrinos = await getPadrinos();
  const otherProfiles = allPadrinos.filter(
    (p) => p.slug?.current !== slug
  ).slice(0, 3);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/como-ayudar/plan-padrino`}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:text-brand-primary-dark"
        >
          <ArrowLeft size={16} />
          {t("backToList") || "Volver a perfiles"}
        </Link>
      </div>
      <PadProfilePage profile={profile} locale={locale} otherProfiles={otherProfiles} />
    </div>
  );
}
