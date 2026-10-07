import type { Metadata } from "next";
import Link from "next/link";
import HeroClouds from "@/components/ui/HeroClouds";
import GrassyHill from "@/components/ui/GrassyHill";
import PhotoboothLinktreeCard from "@/components/sections/PhotoboothLinkTree";

export const metadata: Metadata = {
  title: "Hub Tautan Resmi Photobooth | Tegoer Sapa",
  description:
    "Hub tautan resmi Tegoer Sapa Photobooth Banjarbaru: Booking Photobooth, Request Frame, Kendala Photobox, Instagram, TikTok & Website.",
  openGraph: {
    title: "Hub Tautan Resmi — Tegoer Sapa Photobooth",
    description: "Respect the moment, every second matter.",
    url: "https://tegoersapa.com/links",
    images: [
      {
        url: "/brand/photobooth-avatar.png",
        width: 512,
        height: 512,
        alt: "Photobooth Tegoer Sapa",
      },
    ],
  },
};

export default function LinksPage() {
  return (
    <div className="relative min-h-screen bg-brand-sky text-brand-dark overflow-x-hidden flex flex-col justify-between items-center px-4 pt-6 pb-32 sm:pb-40">
      {/* Floating Animated Clouds Background */}
      <HeroClouds />

      {/* Top Header Bar Navigation */}
      <header className="w-full max-w-md flex justify-between items-center mb-6 relative z-20 px-1">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-black text-xs sm:text-sm bg-white text-brand-dark border-2 border-brand-dark shadow-[0_3px_0_#002716] hover:translate-y-0.5 hover:shadow-[0_1px_0_#002716] active:translate-y-1 active:shadow-none transition-all duration-150"
          aria-label="Kembali ke website utama Tegoer Sapa"
        >
          <span>←</span>
          <span>Website Utama</span>
        </Link>
        <Link
          href="/tentang"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-black bg-white/90 hover:bg-white text-brand-dark border-2 border-brand-dark shadow-[0_3px_0_#002716] hover:translate-y-0.5 hover:shadow-[0_1px_0_#002716] active:translate-y-1 active:shadow-none transition-all duration-150"
        >
          <span>Tentang Kami</span>
        </Link>
      </header>

      {/* Centered Tactile Linktree Card */}
      <main className="w-full max-w-md my-auto relative z-20">
        <PhotoboothLinktreeCard />
      </main>

      {/* Footer Branding text above Grassy Hill */}
      <footer className="mt-8 relative z-20 text-center">
        <p className="text-xs font-black text-brand-dark/80 tracking-wide drop-shadow-xs">
          Tegoer Sapa Photobooth • Banjarbaru, Kalimantan Selatan
        </p>
      </footer>

      {/* Signature Animated Cartoon Grassy Hill at bottom */}
      <GrassyHill className="h-28 sm:h-36 md:h-44" />
    </div>
  );
}
