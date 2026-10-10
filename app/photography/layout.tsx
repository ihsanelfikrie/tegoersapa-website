import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layanan Fotografi Profesional & Dokumentasi Acara Banjarbaru",
  description:
    "Layanan fotografi profesional Tegoer Sapa untuk dokumentasi wedding sinematik, prosesi adat tradisional, foto wisuda outdoor, dan studio portrait di Banjarbaru.",
  openGraph: {
    title: "Fotografi Profesional | Tegoer Sapa",
    description:
      "Dokumentasi foto wedding, wisuda, prosesi adat, dan studio portrait profesional di Banjarbaru.",
    url: "https://tegoersapa.com/photography",
  },
  alternates: {
    canonical: "https://tegoersapa.com/photography",
  },
};

export default function PhotographyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
