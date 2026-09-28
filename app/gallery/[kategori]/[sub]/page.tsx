import { redirect } from "next/navigation";

export default async function LegacySubCategoryPage({
  params,
}: {
  params: Promise<{ kategori: string; sub: string }>;
}) {
  const { kategori, sub } = await params;
  redirect(`/gallery?kategori=${encodeURIComponent(kategori)}&sub=${encodeURIComponent(sub)}`);
}
