import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layanan Photobooth, Photobox & Bajaj Keliling Banjarbaru",
  description:
    "Sewa photobooth cetak instan unlimited, bilik photobox mandiri di coffee shop, dan Bajaj keliling unik untuk event, wedding, dan pesta di Banjarbaru & sekitarnya.",
  openGraph: {
    title: "Photobooth & Photobox Banjarbaru | Tegoer Sapa",
    description:
      "Sewa photobooth cetak instan unlimited, bilik photobox mandiri di coffee shop, dan Bajaj keliling unik untuk event & wedding.",
    url: "https://tegoersapa.com/photobooth",
  },
  alternates: {
    canonical: "https://tegoersapa.com/photobooth",
  },
};

export default function PhotoboothLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
