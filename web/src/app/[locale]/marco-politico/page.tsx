import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("marcoPolitico.title"),
    description: t("marcoPolitico.description"),
    openGraph: {
      description: t("marcoPolitico.description"),
    },
  };
}

export default async function MarcoPoliticoRedirect({ params }: Props) {
  const { locale } = await params;
  redirect(`/${locale}/programas/marco-politico`);
}
