import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricelist & Paket Harga Photobooth Banjarbaru",
  description:
    "Daftar harga transparan paket sewa photobooth unlimited print, bajaj keliling, bilik photobox, dan dokumentasi foto profesional Tegoer Sapa.",
  openGraph: {
    title: "Pricelist Photobooth & Foto | Tegoer Sapa",
    description:
      "Daftar harga paket sewa photobooth unlimited print, bajaj keliling, dan bilik photobox di Banjarbaru.",
    url: "https://tegoersapa.com/pricelist",
  },
  alternates: {
    canonical: "https://tegoersapa.com/pricelist",
  },
};

export default function PricelistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
