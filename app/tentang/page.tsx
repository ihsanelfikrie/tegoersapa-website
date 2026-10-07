import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/content";
import HeroClouds from "@/components/ui/HeroClouds";
import GrassyHill from "@/components/ui/GrassyHill";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Cerita, visi, dan dedikasi Tegoer Sapa dalam menghadirkan layanan photobooth dan fotografi modern di Banjarbaru, Kalimantan Selatan.",
};

export default function TentangPage() {
  return (
    <div className="bg-white min-h-screen text-black">
      {/* ─── Hero Header ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 sm:pb-28 lg:pb-36 bg-brand-sky text-brand-dark overflow-hidden">
        {/* Floating Clouds Background */}
        <HeroClouds />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-center lg:text-left">
              <span className="hero-word">Tentang</span>{" "}
              <span className="hero-word hero-word-green">Kami</span>
            </h1>
            <div className="w-16 h-1 rounded-full bg-brand-dark my-5 mx-auto lg:mx-0" />
            <p className="text-base sm:text-lg text-brand-dark/80 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              &ldquo;{brand.tagline}&rdquo; — Menghargai setiap detik, mengabadikan setiap momen kebersamaan dengan hangat dan penuh cerita.
            </p>
          </div>
        </div>

        {/* Grassy Hill Bottom Decoration */}
        <GrassyHill />
      </section>

      {/* ─── Story & Vision ─────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-gray-600 font-medium leading-relaxed text-base">
            <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
              Cerita Kami
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
              Dari Passion Menjadi Studio Pilihan
            </h2>
            <p>
              {brand.about}
            </p>
            <p>
              Berawal dari kecintaan terhadap fotografi dan keinginan untuk membuat setiap perayaan lebih meriah, Tegoer Sapa berkembang menjadi penyedia layanan dokumentasi visual yang lengkap: mulai dari sesi studio profesional, prosesi adat dan pernikahan sakral, hingga photobooth dan photobox instan dengan teknologi terkini.
            </p>
            <p>
              Bagi kami, kamera bukan hanya alat perekam gambar, melainkan jembatan untuk mengabadikan senyuman tulus, tatapan haru, dan kehangatan kebersamaan yang tak ternilai harganya.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-brand-dark text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green">
                Nilai Utama Kami
              </span>
              <h3 className="text-2xl font-black tracking-wide mt-2 mb-4">
                Kualitas, Kehangatan, & Inovasi
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-medium">
                Kami menggabungkan keramahan pelayanan khas nusantara dengan peralatan visual berstandar industri demi memberikan kepuasan maksimal bagi Anda.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                <span className="text-3xl font-black text-brand-dark">100%</span>
                <p className="text-xs text-gray-500 font-bold uppercase mt-1">Dedikasi Penuh</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                <span className="text-xl sm:text-2xl font-black text-brand-dark">Banjarbaru</span>
                <p className="text-xs text-gray-500 font-bold uppercase mt-1">Kalimantan Selatan</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Bottom CTA ─────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-black text-brand-dark">
            Ingin Berkolaborasi Bersama Kami?
          </h2>
          <p className="mt-3 text-sm text-gray-500 font-medium">
            Jadikan perayaan Anda berikutnya lebih berkesan bersama Tegoer Sapa.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Button
              href="/kontak"
              variant="dark"
              size="md"
            >
              Hubungi Kami
            </Button>
            <Button
              href="/gallery"
              variant="stroke"
              size="md"
            >
              Lihat Portofolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
