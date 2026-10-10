import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri Portofolio Foto & Hasil Cetak Photobooth",
  description:
    "Lihat galeri hasil cetak photobooth, foto strip photobox cafe, dokumentasi wedding, wisuda, dan photoshoot profesional Tegoer Sapa.",
  openGraph: {
    title: "Galeri Foto Tegoer Sapa | Photobooth & Professional Photo",
    description:
      "Koleksi hasil cetak photobooth instan, bilik photobox, dan portofolio fotografi profesional.",
    url: "https://tegoersapa.com/gallery",
  },
  alternates: {
    canonical: "https://tegoersapa.com/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
