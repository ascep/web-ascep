import { redirect } from "next/navigation";

export default async function LeyDeEgresoRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/noticias/ley-hijos-del-estado`);
}
