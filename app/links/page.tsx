import type { Metadata } from "next";
import Link from "next/link";
import { PhotoboothLinktreeCard } from "@/components/sections/PhotoboothLinkTree";

export const metadata: Metadata = {
  title: "Photobooth 🔗 Link-ByTS | Tegoer Sapa",
  description: "Respect the moment, every second matter. Hub tautan resmi pemesanan, request frame, kendala photobox, dan media sosial Tegoer Sapa Photobooth.",
  openGraph: {
    title: "Photobooth — Tegoer Sapa",
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
    <main className="min-h-screen bg-[#06140d] bg-[radial-gradient(ellipse_at_top,_#0f3223_0%,_#05120b_70%,_#020905_100%)] text-white flex flex-col justify-between items-center px-4 py-8 sm:py-12 relative overflow-hidden">
      {/* Decorative background glow circles */}
      <div
        aria-hidden="true"
        className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Top Bar Navigation */}
      <div className="w-full max-w-md flex justify-between items-center mb-6 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white text-white hover:text-brand-dark transition-all duration-200"
        >
          <span>←</span>
          <span>Website Utama</span>
        </Link>
        <Link
          href="/tentang"
          className="text-xs font-semibold text-emerald-400 hover:text-white transition-colors"
        >
          Tentang Kami
        </Link>
      </div>

      {/* Centered Linktree Card */}
      <div className="w-full max-w-md my-auto relative z-10">
        <PhotoboothLinktreeCard />
      </div>

      {/* Footer Branding */}
      <footer className="mt-8 relative z-10 text-center">
        <p className="text-xs text-white/40 font-medium">
          Tegoer Sapa • Banjarbaru, Kalimantan Selatan
        </p>
      </footer>
    </main>
  );
}
