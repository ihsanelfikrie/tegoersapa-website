"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { portfolioPreview, brand } from "@/lib/content";
import HeroClouds from "@/components/ui/HeroClouds";
import GrassyHill from "@/components/ui/GrassyHill";
import Button from "@/components/ui/Button";
import PhotoboothPricing from "@/components/sections/PhotoboothPricing";

// ─── Layanan Photobooth & Interactive Experience ───────────────────────────
const photoboothServices = [
  {
    id: "photobooth",
    tag: "Event & Party",
    title: "Photobooth Reguler",
    description:
      "Layanan photo booth interaktif di lokasi acara dengan cetak instan berkecepatan tinggi, properti seru, dan desain template kustom.",
    exploreHref: "/gallery?kategori=photobooth",
    categoryLabel: "Photobooth",
    image: "/images/pricelist/photobooth-open-space.webp",
  },
  {
    id: "bajaj-photobooth",
    tag: "Mobile Iconic",
    title: "Bajaj Photobooth",
    description:
      "Sensasi berfoto di dalam kabin armada Bajaj ikonik 'Tegoer Keliling'. Menghadirkan daya tarik visual yang sangat viral dan memorable.",
    exploreHref: "/gallery?kategori=photobooth",
    categoryLabel: "Bajaj",
    image: "/images/photobooth/bajaj-photobooth.webp",
  },
  {
    id: "photobox",
    tag: "Self-Studio Box",
    title: "Photobox",
    description:
      "Mesin foto mandiri modern dengan monitor preview real-time, remote shutter nirkabel, dan ragam pilihan template strip frame kekinian.",
    exploreHref: "/gallery?kategori=photobox",
    categoryLabel: "Photobox",
    image: "/images/pricelist/photobox-3d-circle.webp",
  },
  {
    id: "mingle-photobooth",
    tag: "Roaming Photo",
    title: "Mingle Photobooth",
    description:
      "Fotografer keliling yang menyapa para tamu di seluruh area acara dengan cetak foto cepat atau live sharing langsung di tempat tanpa perlu mengantre.",
    exploreHref: "/gallery?kategori=photobooth&sub=event",
    categoryLabel: "Mingle",
    image: "/images/pricelist/photobox-red-curtain.webp",
    isUpcoming: true,
  },
  {
    id: "photo-barcode",
    tag: "Digital Live Sharing",
    title: "Photo Barcode",
    description:
      "Solusi akses dan unduh soft file foto acara beresolusi tinggi secara instan, cepat, dan praktis via scan QR barcode personal dari smartphone.",
    exploreHref: "/gallery?kategori=photobooth",
    categoryLabel: "Barcode",
    image: "/images/pricelist/photobox-reguler.webp",
    isUpcoming: true,
  },
] as const;

// ─── Featured Portfolio Items Khusus Photobooth & Photobox dari Project ────
const featuredPhotoboothWork = portfolioPreview.filter((item) =>
  ["Photobooth", "Photobox"].includes(item.category)
);

export default function PhotoboothPage() {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // 1. Hero entrance
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll(".hero-anim"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      }

      // 2. Services cards stagger
      if (servicesRef.current) {
        const cards = servicesRef.current.querySelectorAll(".service-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Featured Work stagger
      if (featuredRef.current) {
        const items = featuredRef.current.querySelectorAll(".featured-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: featuredRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: heroRef }
  );

  return (
    <div className="bg-white min-h-screen text-black">
      {/* ═══════════════════════════════════════════════════════════════
          1. BAGIAN PEMBUKA (HERO)
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-24 sm:pb-28 lg:pt-36 lg:pb-36 bg-brand-sky text-brand-dark overflow-hidden"
        aria-label="Hero Photobooth"
      >
        {/* Floating Clouds Background */}
        <HeroClouds />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Teks Pembuka (Kiri) */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">


              <h1 className="hero-anim text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-center lg:text-left">
                <span className="hero-word">Photo</span>
                <span className="hero-word hero-word-green ml-1.5 sm:ml-2">booth</span>
              </h1>

              <div className="hero-anim w-16 h-1 rounded-full bg-brand-dark my-6 mx-auto lg:mx-0" />

              <p className="hero-anim text-base sm:text-lg text-brand-dark/80 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                Hadirkan keseruan di setiap acara dengan cetak foto instan berkualitas tinggi, photobox kekinian, fotografer mingle, dan live sharing foto acara via scan barcode bersama {brand.name}.
              </p>

              <div className="hero-anim mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Button
                  href="#pricing"
                  variant="primary"
                  size="md"
                >
                  <span>Lihat Paket & Harga</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>

                <Button
                  href="#services"
                  variant="stroke"
                  size="md"
                >
                  <span>Explore Services ↓</span>
                </Button>
              </div>
            </div>

            {/* Visual Mosaic Preview (Kanan — Desktop Only) */}
            <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-3.5">
              {photoboothServices.map((svc, idx) => {
                const isUpcoming = Boolean("isUpcoming" in svc && svc.isUpcoming);
                return (
                  <div
                    key={svc.id}
                    className={`hero-anim relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/90 backdrop-blur-xs ring-1 ring-brand-dark/10 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col justify-between group ${
                      idx === 0 ? "sm:col-span-2 sm:aspect-[2.2/1]" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full border border-brand-green/20">
                        {svc.categoryLabel}
                      </span>
                      {isUpcoming ? (
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                          Coming Soon
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-brand-dark/40">
                          0{idx + 1}
                        </span>
                      )}
                    </div>

                    <div>
                      <h2 className="text-brand-dark text-sm font-bold tracking-wide leading-tight">
                        {svc.title}
                      </h2>
                      {isUpcoming && (
                        <span className="text-[10px] text-amber-700 font-bold block mt-0.5">
                          Segera Hadir
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Grassy Hill Bottom Decoration */}
        <GrassyHill />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. OUR SERVICES (4 Layanan Utama)
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={servicesRef}
        id="services"
        className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white text-black scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16">
            <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
              Layanan Photobooth
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black text-brand-dark tracking-tight">
              Our Services
            </h2>
            <div aria-hidden="true" className="mx-auto mt-4 w-12 h-1 rounded-full bg-brand-green" />
            <p className="mt-4 text-base text-gray-500 font-medium">
              Pilihan pengalaman foto interaktif modern untuk memeriahkan pernikahan, perayaan ulang tahun, konser, dan gathering perusahaan.
            </p>
          </div>

          {/* 5 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {photoboothServices.map((service, index) => {
              const isFeaturedWide = index === 4;
              const isUpcoming = Boolean("isUpcoming" in service && service.isUpcoming);

              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`service-card group flex flex-col justify-between p-5 sm:p-8 rounded-3xl border scroll-mt-28 transition-all duration-300 ${
                    isUpcoming
                      ? "border-amber-200 bg-amber-50/30 hover:bg-white hover:border-amber-300 shadow-2xs"
                      : "border-gray-100 bg-gray-50/50 hover:bg-white hover:border-brand-green/30"
                  } ${isFeaturedWide ? "md:col-span-2" : ""}`}
                >
                <div>
                  {/* Photo Visual Slot (Konsisten dengan style existing) */}
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-brand-dark ring-1 ring-black/5 mb-6">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-brand-green/90 text-white text-[10px] font-bold tracking-wider uppercase z-10">
                      {service.categoryLabel}
                    </span>

                    {/* Coming Soon Top Badge on Photo */}
                    {isUpcoming && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-3 py-1 rounded-full bg-brand-dark/90 backdrop-blur-md text-amber-300 border border-amber-400/30 text-[10px] font-black tracking-wider uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
                          <svg className="w-2.5 h-2.5 text-amber-400 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                            <path d="M8 0L9.79 6.21L16 8L9.79 9.79L8 16L6.21 9.79L0 8L6.21 6.21L8 0Z" />
                          </svg>
                          <span>Coming Soon</span>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-black text-2xl text-brand-green/30">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
                      {service.tag}
                    </span>
                    {isUpcoming && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                        Segera Hadir
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-brand-dark tracking-tight">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-500 leading-relaxed font-medium">
                    {service.description}
                  </p>

                  {isUpcoming && (
                    <div className="mt-4 p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 font-medium flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-800 flex items-center justify-center text-[10px] font-black flex-shrink-0">
                        ✦
                      </span>
                      <span>
                        Layanan ini sedang dipersiapkan dan akan segera diluncurkan sebagai inovasi baru Tegoer Sapa!
                      </span>
                    </div>
                  )}
                </div>

                {/* Tombol Action / Explore */}
                {isUpcoming ? (
                  <div className="mt-8 pt-5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <Button
                      href={`https://api.whatsapp.com/send?phone=6281350655747&text=${encodeURIComponent(
                        `Halo kak Mau tanya info peluncuran & pre-order layanan ${service.title} (Coming Soon) Tegoer Sapa`
                      )}`}
                      variant="stroke"
                      size="sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Tanya Info Rilis via WA</span>
                      <span>↗</span>
                    </Button>

                    <div className="flex items-center gap-3">
                      <Link
                        href={service.exploreHref}
                        className="text-xs font-semibold text-gray-500 hover:text-brand-dark transition-colors"
                      >
                        Lihat Contoh Foto →
                      </Link>
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                        Upcoming
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between">
                    <Button
                      href={service.exploreHref}
                      variant="primary"
                      size="sm"
                    >
                      <span>Explore Work</span>
                      <svg
                        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Button>

                    <Link
                      href={service.id === "photobox" ? "#photobox" : "#pricing"}
                      className="text-xs font-semibold text-gray-400 hover:text-brand-dark transition-colors"
                    >
                      {service.id === "photobox" ? "Lihat Detail Photobox ↓" : "Lihat Paket & Harga →"}
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2.5. DETAIL PHOTOBOX TEGOER SAPA (Bilik Foto Mandiri & 5 Titik Spot)
      ═══════════════════════════════════════════════════════════════ */}
      <section
        id="photobox"
        className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50/70 text-black border-t border-gray-100 scroll-mt-20"
        aria-label="Detail Layanan Photobox Tegoer Sapa"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
              Bilik Foto Privat Mandiri
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black text-brand-dark tracking-tight">
              Photobox Tegoer Sapa
            </h2>
            <div aria-hidden="true" className="mx-auto mt-4 w-12 h-1 rounded-full bg-brand-green" />
            <p className="mt-4 text-sm sm:text-base text-gray-500 font-medium leading-relaxed">
              Bebas berekspresi tanpa rasa canggung di bilik foto privat modern kami. Dilengkapi wireless remote shutter, monitor preview real-time, cetak instan anti luntur dalam hitungan detik, dan akses soft file digital via scan QR code.
            </p>
          </div>

          {/* 4 Fitur Unggulan Bilik Photobox */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-14">
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:border-brand-green/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-dark flex items-center justify-center font-black text-lg mb-3.5">
                📸
              </div>
              <h3 className="text-base font-black text-brand-dark tracking-tight mb-1.5">
                Wireless Remote Shutter
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Kendali pemotretan mandiri di tangan Anda. Atur momen dan pose terbaik bersama teman atau pasangan tanpa fotografer yang melihat.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:border-brand-green/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-dark flex items-center justify-center font-black text-lg mb-3.5">
                🖥️
              </div>
              <h3 className="text-base font-black text-brand-dark tracking-tight mb-1.5">
                Monitor Live Preview
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Layar preview jernih di dalam bilik untuk cek pose secara real-time sebelum dan sesudah jepretan, lengkap dengan timer hitung mundur.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:border-brand-green/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-dark flex items-center justify-center font-black text-lg mb-3.5">
                🖨️
              </div>
              <h3 className="text-base font-black text-brand-dark tracking-tight mb-1.5">
                Cetak Dye-Sub Anti Air
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Kertas foto premium lab studio beresolusi tinggi. Hasil cetak strip fisik keluar kering, anti air, dan anti pudar dalam hitungan detik.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:border-brand-green/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-dark flex items-center justify-center font-black text-lg mb-3.5">
                📲
              </div>
              <h3 className="text-base font-black text-brand-dark tracking-tight mb-1.5">
                Soft File QR Code Instan
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Langsung scan barcode QR di layar bilik untuk mengunduh seluruh file asli resolusi tinggi dan animasi GIF bergerak ke smartphone Anda.
              </p>
            </div>
          </div>

          {/* 2 Opsi Pengalaman Photobox (Grid 2 Kolom) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Opsi 1: Datang ke 5 Spot Kafe */}
            <div className="lg:col-span-7 rounded-3xl bg-white border-2 border-gray-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-brand-green/10 text-brand-dark">
                    Self-Service • Buka Setiap Hari
                  </span>
                  <span className="text-xs font-bold text-gray-400">
                    Tanpa Perlu Booking
                  </span>
                </div>

                <h3 className="text-2xl font-black text-brand-dark tracking-tight mb-2">
                  1. Nongkrong &amp; Foto di 5 Coffee Shop
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed mb-5">
                  Kunjungi bilik photobox kami yang tersedia secara permanen di titik hangout favorit Banjarbaru (Banjarmasin segera hadir). Cukup bayar per sesi (Rp 25.000 – Rp 35.000) langsung di mesin via QRIS atau Cash.
                </p>

                {/* List 5 Spot Kafe */}
                <div className="space-y-2.5 mb-6">
                  <span className="text-xs font-black uppercase tracking-wider text-brand-dark block">
                    5 Titik Lokasi Bilik Photobox (Banjarbaru):
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-brand-dark block">Warkop Sirkem</span>
                        <span className="text-[11px] text-gray-500 font-medium">Loktabat Utara, Banjarbaru</span>
                      </div>
                      <a
                        href="https://maps.app.goo.gl/GPzjBY3dBXuUr5ESA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-black text-brand-green hover:underline shrink-0 ml-2"
                      >
                        Maps ↗
                      </a>
                    </div>

                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-brand-dark block">Kéan Coffee</span>
                        <span className="text-[11px] text-gray-500 font-medium">Pusat Kota, Banjarbaru</span>
                      </div>
                      <a
                        href="https://share.google/ypoJPLN7wFOWoAoF0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-black text-brand-green hover:underline shrink-0 ml-2"
                      >
                        Maps ↗
                      </a>
                    </div>

                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-brand-dark block">Hatara Coffee</span>
                        <span className="text-[11px] text-gray-500 font-medium">Guntung Paikat, Banjarbaru</span>
                      </div>
                      <a
                        href="https://maps.app.goo.gl/vi8YYLQFtV66T2Ft9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-black text-brand-green hover:underline shrink-0 ml-2"
                      >
                        Maps ↗
                      </a>
                    </div>

                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-brand-dark block">Aime Coffee</span>
                        <span className="text-[11px] text-gray-500 font-medium">Banjarbaru Kota</span>
                      </div>
                      <a
                        href="https://share.google/5MfvXeEBPDw0aRFjW"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-black text-brand-green hover:underline shrink-0 ml-2"
                      >
                        Maps ↗
                      </a>
                    </div>

                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between sm:col-span-2">
                      <div>
                        <span className="font-bold text-brand-dark block">NoLima Coffee</span>
                        <span className="text-[11px] text-gray-500 font-medium">Banjarbaru (Twin Photobox)</span>
                      </div>
                      <a
                        href="https://share.google/qLC2FpGFKW0oyvTpm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-black text-brand-green hover:underline shrink-0 ml-2"
                      >
                        Maps ↗
                      </a>
                    </div>
                  </div>

                  {/* Upcoming Banjarmasin Notice */}
                  <div className="mt-3 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">📍</span>
                      <span className="text-[11px] font-medium text-amber-900">
                        <strong>Banjarmasin:</strong> Spot bilik foto sedang disiapkan (Upcoming)!
                      </span>
                    </div>
                    <a
                      href="https://wa.me/6285187834710?text=Halo%20Tegoer%20Sapa,%20saya%20mau%20rekomendasi%20spot%20photobox%20di%20Banjarmasin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-black text-amber-900 hover:text-brand-dark underline shrink-0 ml-2"
                    >
                      Rekomendasikan Kafe ↗
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-3">
                <Link
                  href="/gallery?kategori=photobox"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-dark hover:bg-brand-green text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>Lihat Galeri Foto Cetak</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/#photobox-spots"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-brand-dark text-xs font-bold transition-all"
                >
                  <span>Buka Peta Interaktif di Beranda</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>

            {/* Opsi 2: Sewa Bilik Photobox untuk Event */}
            <div className="lg:col-span-5 rounded-3xl bg-[#0f432a] text-white p-6 sm:p-8 flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#1eab73]/20 text-[#1eab73] border border-[#1eab73]/30">
                    Private Event &amp; Party
                  </span>
                  <span className="text-xs font-bold text-white/70">
                    Unlimited Print
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                  2. Sewa Bilik Photobox ke Lokasi Acara
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed mb-5">
                  Hadirkan keseruan bilik foto privat mandiri langsung ke pesta pernikahan, ulang tahun, gathering perusahaan, atau festival Anda.
                </p>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 space-y-2.5 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#1eab73] font-black">✓</span>
                    <span className="text-white/90">Unlimited cetak foto strip fisik untuk seluruh tamu acara</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#1eab73] font-black">✓</span>
                    <span className="text-white/90">Free custom template frame eksklusif bertuliskan nama &amp; tema acara</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#1eab73] font-black">✓</span>
                    <span className="text-white/90">Bilik fisik privat dengan touch monitor preview &amp; remote clicker</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#1eab73] font-black">✓</span>
                    <span className="text-white/90">Instant soft file QR code download langsung di layar</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#1eab73] font-black">✓</span>
                    <span className="text-white/90">1–2 Kru operator standby memastikan operasional lancar</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <Button
                  href={`https://api.whatsapp.com/send?phone=6281350655747&text=${encodeURIComponent(
                    "Halo kak Mau tanya info sewa bilik Photobox Tegoer Sapa untuk event\n\nNama           : \nTanggal & Waktu: \nLokasi Acara   : \nEstimasi Tamu  : \n\nMohon info ketersediaan slot & pricelistnya. Terima kasih!"
                  )}`}
                  variant="primary"
                  size="md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center justify-center"
                >
                  <span>Chat WhatsApp Sewa Event ↗</span>
                </Button>
                <Button
                  href="#pricing"
                  variant="stroke"
                  size="md"
                  className="w-full text-center justify-center text-white border-white/20 hover:bg-white/10"
                >
                  <span>Cek Paket di Daftar Harga ↓</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Banner Bantuan Kendala Soft File */}
          <div className="mt-8 rounded-2xl bg-amber-50/80 border border-amber-200/80 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center font-black text-sm shrink-0">
                ⚡
              </span>
              <div>
                <span className="font-bold text-amber-900 block text-xs sm:text-sm">
                  Butuh Bantuan Unduh Soft File Photobox?
                </span>
                <span className="text-amber-800/80 font-medium">
                  Jika barcode QR saat berfoto di kafe mengalami kendala jaringan, tim CS kami siap mengirimkan ulang soft file foto Anda.
                </span>
              </div>
            </div>
            <a
              href="https://api.whatsapp.com/send?phone=62881080518887&text=Halo%20kak%20boleh%20minta%20soft%20file%20photobox%0ATanggal%20%3A%0AJam%20%3A%0AContoh%C2%A0Photonya%C2%A0%3A"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold whitespace-nowrap transition-colors shadow-2xs shrink-0"
            >
              Hubungi CS Photobox ↗
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2.6. DAFTAR HARGA & OPSI PAKET PHOTOBOOTH & PHOTOBOX
      ═══════════════════════════════════════════════════════════════ */}
      <section
        id="pricing"
        className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white border-t border-gray-100 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PhotoboothPricing sourceUrl="/photobooth#pricing" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. FEATURED WORK (Portfolio Photobooth dari Project)
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={featuredRef}
        className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50 text-black border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 lg:mb-16">
            <div className="max-w-2xl text-center md:text-left">
              <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
                Portofolio Pilihan
              </span>
              <h2 className="mt-3 text-3xl sm:text-5xl font-black text-brand-dark tracking-tight">
                Featured Work
              </h2>
              <div aria-hidden="true" className="mt-4 w-12 h-1 rounded-full bg-brand-green mx-auto md:mx-0" />
              <p className="mt-4 text-base text-gray-500 font-medium">
                Koleksi keseruan photobooth dan photobox instan di berbagai acara pernikahan, ulang tahun, dan event kolaborasi.
              </p>
            </div>
            <div className="mt-6 md:mt-0 text-center md:text-left">
              <Button
                href="/gallery?kategori=photobooth"
                variant="primary"
                size="sm"
              >
                <span>Lihat Semua di Gallery</span>
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
            </div>
          </div>

          {/* Grid Layout Konsisten dengan Gallery Existing */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {featuredPhotoboothWork.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="featured-item group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-brand-dark ring-1 ring-black/5 hover:ring-brand-green/50 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
              >
                {item.image ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-5 flex flex-col justify-end">
                      <span className="text-[10px] text-brand-green font-bold uppercase tracking-wider mb-1">
                        {item.category} • {item.subCategory}
                      </span>
                      <h4 className="text-white text-base font-bold tracking-wide">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-brand-dark flex flex-col items-center justify-center p-6 text-center select-none">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-white/40 group-hover:text-brand-green/80 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.15em] mb-1">
                      {item.category} • {item.subCategory}
                    </span>
                    <h4 className="text-white text-base font-bold tracking-wide max-w-[220px]">
                      {item.title}
                    </h4>
                  </div>
                )}

                {/* Hover / Active overlay */}
                <div
                  className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
                  aria-hidden="true"
                >
                  <div className="flex items-center gap-2 text-white font-bold text-xs bg-brand-green px-3.5 py-1.5 rounded-full shadow-md">
                    <span>Explore Work</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. CTA SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={ctaRef}
        className="py-12 sm:py-16 md:py-20 lg:py-24 bg-brand-dark text-white border-t border-white/10"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
            Let&apos;s Celebrate
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black text-white tracking-tight">
            Interested in our service?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl mx-auto font-medium">
            Jadikan event pernikahan, ulang tahun, atau gathering kantor Anda lebih berkesan dengan photobooth instan berkualitas dari {brand.name}.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="#pricing"
              variant="primary"
              size="lg"
            >
              <span>View Pricelist</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>

            <Button
              href="https://api.whatsapp.com/send?phone=6281350655747&text=Halo%20kak%20Mau%20konsultasi%20layanan%20Photobooth%20Tegoer%20Sapa"
              variant="stroke"
              size="lg"
            >
              <span>Chat WhatsApp Photobooth</span>
              <span aria-hidden="true">↗</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
