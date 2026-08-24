import { redirect } from "next/navigation";

export default async function PlanPadrinoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/como-ayudar/enredate-con-ascep#plan-padrino`);
}
