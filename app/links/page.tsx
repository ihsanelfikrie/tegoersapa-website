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
    <div className="relative min-h-screen bg-brand-sky text-brand-dark overflow-x-hidden flex flex-col justify-between items-center px-4 pt-24 sm:pt-28 md:pt-32 pb-32 sm:pb-40">
      {/* Floating Animated Clouds Background */}
      <HeroClouds />

      {/* Top Breadcrumb / Sub-bar */}
      <div className="w-full max-w-md flex justify-between items-center mb-5 relative z-20 px-1">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white text-brand-dark border-2 border-brand-dark shadow-[0_2px_0_#002716]">
          <svg className="w-3.5 h-3.5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span>Hub Tautan Resmi</span>
        </span>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/90 hover:bg-white text-brand-dark border-2 border-brand-dark shadow-[0_2px_0_#002716] hover:translate-y-0.5 active:translate-y-1 transition-all"
        >
          <span>← Beranda</span>
        </Link>
      </div>

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
