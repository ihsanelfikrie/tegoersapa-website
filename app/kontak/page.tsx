import type { Metadata } from "next";
import HeroClouds from "@/components/ui/HeroClouds";
import GrassyHill from "@/components/ui/GrassyHill";
import KontakContent from "@/components/sections/KontakContent";

export const metadata: Metadata = {
  title: "Kontak Kami",
  description:
    "Hubungi Tegoer Sapa untuk booking photobooth, foto studio, dan dokumentasi event di Banjarbaru, Kalimantan Selatan via WhatsApp atau media sosial.",
};

export default function KontakPage() {
  return (
    <div className="bg-white min-h-screen text-black">
      {/* ─── Hero Header ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 sm:pb-28 lg:pb-36 bg-brand-sky text-brand-dark overflow-hidden">
        {/* Floating Clouds Background */}
        <HeroClouds />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-center lg:text-left">
              <span className="hero-word">Hubungi</span>{" "}
              <span className="hero-word hero-word-green">Kami</span>
            </h1>
            <div className="w-16 h-1 rounded-full bg-brand-dark my-5 mx-auto lg:mx-0" />
            <p className="text-base sm:text-lg text-brand-dark/80 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Ada pertanyaan seputar paket, ketersediaan tanggal, atau konsultasi konsep foto? Tim kami siap menyapa dan membantu Anda.
            </p>
          </div>
        </div>

        {/* Grassy Hill Bottom Decoration */}
        <GrassyHill />
      </section>

      {/* ─── Interactive Contact Hub ─────────────────────────────── */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <KontakContent />
      </section>
    </div>
  );
}

