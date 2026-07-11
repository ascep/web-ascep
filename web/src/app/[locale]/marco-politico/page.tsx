import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MarcoPoliticoRedirect({ params }: Props) {
  const { locale } = await params;
  redirect(`/${locale}/programas/marco-politico`);
}
