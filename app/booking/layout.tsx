import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formulir Booking & Reservasi Jadwal",
  description:
    "Konfirmasikan paket photobooth dan layanan dokumentasi pilihan Anda dengan mudah. Terhubung langsung dengan WhatsApp tim Tegoer Sapa.",
  openGraph: {
    title: "Booking & Reservasi Jadwal | Tegoer Sapa",
    description:
      "Formulir reservasi paket photobooth dan fotografi terintegrasi WhatsApp Tegoer Sapa.",
    url: "https://tegoersapa.com/booking",
  },
  alternates: {
    canonical: "https://tegoersapa.com/booking",
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
