import { redirect } from "next/navigation";

export default async function LegacyCategoryPage({
  params,
}: {
  params: Promise<{ kategori: string }>;
}) {
  const { kategori } = await params;
  redirect(`/gallery?kategori=${encodeURIComponent(kategori)}`);
}
