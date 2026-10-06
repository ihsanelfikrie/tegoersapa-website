"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import type { ServiceDetailPageData, ServicePageGalleryItem } from "@/lib/content";
import { useBooking } from "@/lib/BookingContext";

interface ServiceDetailPageProps {
  data: ServiceDetailPageData;
}

export default function ServiceDetailPage({ data }: ServiceDetailPageProps) {
  const router = useRouter();
  const {
    selectedPackage,
    selectPackage,
    selectedAddOns,
    toggleAddOn,
    isAddOnSelected,
    totalCalculation,
  } = useBooking();

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const packagesRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const [activeImage, setActiveImage] = useState<ServicePageGalleryItem | null>(null);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // Hero animations
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll(".hero-fade"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
          }
        );
      }

      // Gallery cards stagger
      if (galleryRef.current) {
        gsap.fromTo(
          galleryRef.current.querySelectorAll(".gallery-card"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Package cards stagger
      if (packagesRef.current) {
        gsap.fromTo(
          packagesRef.current.querySelectorAll(".package-card"),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: packagesRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  const filteredPackages = data.packages.filter((pkg) => {
    if (selectedCategory === "Semua") return true;
    return pkg.kategori === selectedCategory;
  });

  return (
    <div ref={containerRef} className="bg-white min-h-screen text-black">
      {/* ═══════════════════════════════════════════════════════════════
          1. BAGIAN PEMBUKA (HERO / INTRO)
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 lg:pt-36 lg:pb-24 bg-brand-dark text-white overflow-hidden"
        aria-label={`Pembuka Layanan ${data.title}`}
      >
        {/* Subtle Ambient Glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-10 left-10 w-72 h-72 bg-brand-green/5 rounded-full blur-2xl pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Nav */}
          <nav aria-label="Breadcrumb" className="hero-fade mb-6 flex items-center gap-2 text-xs font-semibold text-white/50">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/photography" className="hover:text-white transition-colors">
              Photography
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-brand-green font-bold">{data.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Teks Pembuka (Kiri) */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {data.tag && (
                <span className="hero-fade inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green/15 border border-brand-green/30 text-brand-green text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                  {data.tag}
                </span>
              )}

              <h1 className="hero-fade text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1]">
                {data.title}
              </h1>

              <p className="hero-fade text-base sm:text-lg font-bold text-white/90 mt-3 leading-snug whitespace-pre-line">
                {data.subtitle}
              </p>

              <div className="hero-fade w-16 h-1 rounded-full bg-brand-green my-4" />

              <p className="hero-fade text-xs sm:text-sm text-brand-green font-bold uppercase tracking-wider max-w-xl">
                {data.description}
              </p>

              {/* Highlight Bullets */}
              <div className="hero-fade mt-5 space-y-2.5 max-w-xl">
                {data.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90 font-medium">
                    <span className="text-brand-green font-bold flex-shrink-0 mt-0.5">✓</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Tagline / Slogan */}
              {data.tagline && (
                <p className="hero-fade mt-4 text-xs sm:text-sm font-semibold text-white/80 tracking-wide italic">
                  &ldquo;{data.tagline}&rdquo;
                </p>
              )}

              {/* Lokasi studio jika ada */}
              {data.studioAddress && (
                <div className="hero-fade mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold border border-white/15">
                  <span>📍</span>
                  <span>{data.studioAddress}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="hero-fade mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#packages"
                  className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green/90 text-white font-bold text-xs tracking-wide px-6 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 border-b-[3px] border-black/20"
                >
                  <span>Lihat Pilihan Paket</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </a>

                <a
                  href={data.cta.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-brand-green text-white font-bold text-xs tracking-wide px-6 py-3.5 rounded-full transition-colors duration-200 hover:bg-white/5"
                >
                  <span>Book Now</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            {/* Foto Utama Relevan (Kanan) */}
            <div className="lg:col-span-5">
              <div className="hero-fade relative aspect-[4/3] rounded-3xl overflow-hidden bg-brand-dark ring-1 ring-white/15 p-6 flex flex-col justify-between group shadow-2xl">
                {/* Background Pattern / Texture */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-tr from-brand-dark via-brand-dark/95 to-brand-green/10"
                />

                {/* Decorative Camera Frame */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green bg-brand-green/15 px-3 py-1 rounded-full border border-brand-green/30">
                    {data.heroBadge}
                  </span>
                  <span className="text-[11px] font-bold text-white/50 font-mono tracking-wider">
                    TEGOER SAPA / 01
                  </span>
                </div>

                <div className="relative z-10 my-auto text-center py-6">
                  <div className="mx-auto w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-8 h-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                  </div>
                  <h2 className="text-white text-xl sm:text-2xl font-black tracking-wide">
                    {data.title}
                  </h2>
                  <p className="text-white/60 text-xs font-medium mt-1">
                    Dokumentasi Profesional & Berkarakter
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-green" />
                    High Resolution Result
                  </span>
                  <span className="font-semibold text-white/70">Medan, ID</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. GALLERY PORTFOLIO KHUSUS LAYANAN
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={galleryRef}
        id="gallery"
        className="py-20 lg:py-24 bg-gray-50 text-black border-b border-gray-100 scroll-mt-20"
        aria-label={`Galeri Portofolio ${data.title}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
                Portofolio Khusus
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
                Galeri {data.title}
              </h2>
              <div aria-hidden="true" className="mt-3 w-12 h-1 rounded-full bg-brand-green" />
              <p className="mt-3 text-sm sm:text-base text-gray-500 font-medium max-w-xl">
                Koleksi cuplikan visual terbaik dari sesi fotografi dan dokumentasi yang telah kami abadikan.
              </p>
            </div>

            <div className="mt-6 md:mt-0">
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-green hover:text-brand-dark transition-colors duration-300"
              >
                <span>Lihat Semua Koleksi di Galeri Utama</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.galleryItems.map((item) => {
              const hasImage = Boolean(item.image && !imgError[item.id]);

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveImage(item)}
                  className="gallery-card group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-brand-dark cursor-pointer ring-1 ring-black/5 hover:ring-brand-green/50 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
                >
                  {hasImage ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={item.image!}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={() => setImgError((prev) => ({ ...prev, [item.id]: true }))}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end">
                        <span className="text-[10px] text-brand-green font-bold uppercase tracking-wider mb-1">
                          {item.subCategory}
                        </span>
                        <h3 className="text-white text-sm font-bold leading-snug">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-brand-dark flex flex-col items-center justify-center p-6 text-center select-none">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-white/40 group-hover:text-brand-green transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                      <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.15em] mb-1">
                        {item.category} • {item.subCategory}
                      </span>
                      <h3 className="text-white text-sm font-bold tracking-wide">
                        {item.title}
                      </h3>
                    </div>
                  )}

                  {/* Hover overlay with zoom hint */}
                  <div className="absolute inset-0 bg-brand-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex items-center gap-1.5 text-white font-bold text-[11px] bg-brand-green px-3 py-1 rounded-full">
                      <span>Preview</span>
                      <span aria-hidden="true">🔍</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Lightbox Modal ─────────────────────────────────────── */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-brand-dark border border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white relative shadow-2xl"
          >
            <button
              onClick={() => setActiveImage(null)}
              aria-label="Tutup preview"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green">
              {activeImage.category} • {activeImage.subCategory}
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-wide mt-1 mb-4">
              {activeImage.title}
            </h3>

            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/40 border border-white/10 mb-6 flex items-center justify-center">
              {activeImage.image && !imgError[activeImage.id] ? (
                <Image
                  src={activeImage.image}
                  alt={activeImage.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="text-center p-6 text-white/60">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold">Tegoer Sapa Photography</p>
                  <p className="text-[11px] text-white/40 mt-0.5">Kualitas gambar beresolusi tinggi</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3">
              <Link
                href="/gallery"
                onClick={() => setActiveImage(null)}
                className="text-xs text-white/70 hover:text-brand-green transition-colors font-medium"
              >
                Lihat di Galeri Lengkap →
              </Link>
              <button
                onClick={() => setActiveImage(null)}
                className="px-5 py-2 rounded-full bg-brand-green hover:bg-brand-green/90 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Tutup Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          3. PACKAGE / PRICELIST KHUSUS LAYANAN
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={packagesRef}
        id="packages"
        className="py-20 lg:py-24 bg-white text-black scroll-mt-20"
        aria-label={`Pilihan Paket ${data.title}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
              Katalog & Daftar Harga
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight">
              Paket {data.title}
            </h2>
            <div aria-hidden="true" className="mx-auto mt-3 w-12 h-1 rounded-full bg-brand-green" />
            <p className="mt-3 text-sm sm:text-base text-gray-500 font-medium">
              Transparan dan sesuai kebutuhan dokumentasi hari istimewa Anda.
            </p>
          </div>

          {/* Category Filter Tabs jika tersedia */}
          {data.packageCategories && data.packageCategories.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10">
              {data.packageCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={[
                    "px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer",
                    selectedCategory === cat
                      ? "bg-brand-dark text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-brand-dark",
                  ].join(" ")}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPackages.map((pkg) => {
              const isSelected = selectedPackage?.id === pkg.id;

              return (
                <div
                  key={pkg.id}
                  className={[
                    "package-card group flex flex-col justify-between rounded-3xl transition-all duration-300 overflow-hidden",
                    isSelected
                      ? "border-2 border-brand-green bg-white ring-4 ring-brand-green/10 shadow-lg"
                      : "border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-brand-green/30 hover:shadow-md",
                  ].join(" ")}
                >
                  <div>
                    {/* Cover Photo */}
                    {pkg.image && (
                      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-brand-dark">
                        <Image
                          src={pkg.image}
                          alt={pkg.nama}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                            {pkg.kategori || data.tag || data.title}
                          </span>
                          {isSelected ? (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-green text-white shadow-sm">
                              ✓ Terpilih
                            </span>
                          ) : pkg.badge ? (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-dark text-white shadow-sm">
                              {pkg.badge}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    )}

                    <div className="p-7">
                      {!pkg.image && (
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-green/10 text-brand-dark border border-brand-green/20">
                            {pkg.kategori || data.tag || data.title}
                          </span>
                          {isSelected ? (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-green text-white">
                              ✓ Terpilih
                            </span>
                          ) : pkg.badge ? (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-dark text-white">
                              {pkg.badge}
                            </span>
                          ) : null}
                        </div>
                      )}

                      <h3 className="text-2xl font-black text-brand-dark tracking-wide">
                        {pkg.nama}
                      </h3>

                      <div className="mt-2 text-2xl sm:text-3xl font-black text-brand-green">
                        {pkg.harga}
                      </div>

                      {pkg.placeholderNote && (
                        <p className="mt-1.5 text-[11px] text-gray-400 italic">
                          *{pkg.placeholderNote}
                        </p>
                      )}

                      <div className="w-full h-px bg-gray-200 my-6" />

                      {/* Feature list */}
                      <ul className="space-y-2.5">
                        {pkg.fitur.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 font-medium">
                            <span className="text-brand-green font-bold flex-shrink-0 mt-0.5">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-7 pb-7 pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        selectPackage(
                          {
                            id: pkg.id,
                            nama: pkg.nama,
                            harga: pkg.harga,
                            kategori: pkg.kategori || data.tag || data.title,
                            badge: pkg.badge,
                            fitur: pkg.fitur,
                            placeholderNote: pkg.placeholderNote,
                          },
                          typeof window !== "undefined"
                            ? window.location.pathname + "#packages"
                            : "/photography/wedding#packages"
                        );

                        // Flow: Package -> Add-on (opsional) -> Booking
                        if (data.addOns && data.addOns.length > 0) {
                          const addonsEl = document.getElementById("addons");
                          if (addonsEl) {
                            addonsEl.scrollIntoView({ behavior: "smooth" });
                          } else {
                            router.push("/booking");
                          }
                        } else {
                          router.push("/booking");
                        }
                      }}
                      className={[
                        "w-full inline-flex items-center justify-center gap-2 text-xs font-bold tracking-wide px-5 py-3.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-sm",
                        isSelected
                          ? "bg-brand-green text-white hover:bg-brand-green/90"
                          : "bg-brand-dark hover:bg-brand-green text-white",
                      ].join(" ")}
                    >
                      <span>
                        {isSelected
                          ? "✓ Paket Terpilih • Lanjut Add-on / Booking"
                          : "Pilih Paket Ini"}
                      </span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>

                    {isSelected && (
                      <Link
                        href="/booking"
                        className="w-full inline-flex items-center justify-center gap-1.5 text-[11px] font-bold text-brand-green hover:underline py-1"
                      >
                        <span>Langsung ke Form Booking tanpa Add-on →</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ─── ADDS ON SECTION ───────────────────────────────────── */}
          {data.addOns && data.addOns.length > 0 && (
            <div id="addons" className="mt-20 pt-16 border-t border-gray-100 scroll-mt-24">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
                  Opsi Ekstra
                </span>
                <h3 className="mt-2 text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
                  Adds On Layanan
                </h3>
                <div aria-hidden="true" className="mx-auto mt-2 w-10 h-1 rounded-full bg-brand-green" />
                <p className="mt-2.5 text-xs sm:text-sm text-gray-500 font-medium">
                  Tambahan waktu pemotretan, album cetak ekstra, print frame minimalis, hingga foto barcode untuk menyempurnakan dokumentasi acara Anda (Opsional).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {data.addOns.map((addon) => {
                  const isSelected = isAddOnSelected(addon.id);

                  return (
                    <div
                      key={addon.id}
                      onClick={() =>
                        toggleAddOn({
                          id: addon.id,
                          nama: addon.nama,
                          harga: addon.harga,
                          keterangan: addon.keterangan,
                        })
                      }
                      className={[
                        "flex flex-col justify-between p-5 sm:p-6 rounded-2xl border transition-all duration-300 group cursor-pointer",
                        isSelected
                          ? "border-brand-green bg-brand-green/[0.04] ring-2 ring-brand-green/20 shadow-md"
                          : "border-gray-100 bg-gray-50/50 hover:bg-white hover:border-brand-green/30 hover:shadow-sm",
                      ].join(" ")}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <h4
                            className={[
                              "font-bold text-sm sm:text-base leading-snug transition-colors",
                              isSelected ? "text-brand-green" : "text-brand-dark group-hover:text-brand-green",
                            ].join(" ")}
                          >
                            {addon.nama}
                          </h4>
                          <span className="text-sm font-black text-brand-green flex-shrink-0">
                            {addon.harga}
                          </span>
                        </div>
                        {addon.keterangan && (
                          <p className="mt-2 text-xs text-gray-500 font-medium leading-relaxed">
                            {addon.keterangan}
                          </p>
                        )}
                      </div>

                      <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAddOn({
                              id: addon.id,
                              nama: addon.nama,
                              harga: addon.harga,
                              keterangan: addon.keterangan,
                            });
                          }}
                          className={[
                            "px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer",
                            isSelected
                              ? "bg-brand-green text-white shadow-sm"
                              : "bg-gray-200/70 text-gray-700 hover:bg-brand-dark hover:text-white",
                          ].join(" ")}
                        >
                          {isSelected ? "✓ Terpilih" : "+ Pilih Add-on"}
                        </button>

                        <a
                          href={
                            addon.whatsappUrl ||
                            `https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20tanya%20Add-On%20Wedding%3A%20${encodeURIComponent(addon.nama)}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 hover:text-brand-green transition-colors"
                        >
                          <span>Tanya Add-On</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom booking CTA bar within Add-ons section */}
              <div className="mt-12 p-6 rounded-3xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                    {selectedPackage ? `Paket: ${selectedPackage.nama}` : "Belum Ada Paket Terpilih"}
                  </span>
                  <div className="text-sm sm:text-base font-extrabold text-brand-dark flex items-center gap-2 mt-0.5">
                    <span>Estimasi Total:</span>
                    <span className="text-lg font-black text-brand-green">
                      {selectedPackage ? totalCalculation.totalText : "Pilih paket di atas"}
                    </span>
                    {selectedAddOns.length > 0 && (
                      <span className="text-xs font-semibold text-gray-500">
                        ({selectedAddOns.length} Add-on dipilih)
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {selectedPackage ? (
                    <Link
                      href="/booking"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green/90 text-white font-bold text-xs tracking-wide px-7 py-3.5 rounded-2xl transition-all shadow-md hover:-translate-y-0.5"
                    >
                      <span>Lanjut ke Form Booking</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  ) : (
                    <a
                      href="#packages"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-dark hover:bg-brand-green text-white font-bold text-xs tracking-wide px-6 py-3.5 rounded-2xl transition-all"
                    >
                      <span>↑ Pilih Paket di Atas</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-14 text-center">
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Butuh penyesuaian khusus atau ingin melihat pricelist layanan studio & wisuda?{" "}
              <Link href="/pricelist" className="text-brand-green font-bold hover:underline">
                Buka Halaman Pricelist Lengkap →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. CTA SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={ctaRef}
        className="py-20 lg:py-24 bg-brand-dark text-white border-t border-white/10"
        aria-label="Call to Action Booking"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green/15 border border-brand-green/30 text-brand-green text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {data.cta.badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {data.cta.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl mx-auto font-medium leading-relaxed">
            {data.cta.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={data.cta.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green/90 text-white font-bold text-sm tracking-wide px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5 border-b-[3px] border-black/20"
            >
              <span>{data.cta.buttonLabel}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-brand-green text-white font-bold text-sm tracking-wide px-8 py-4 rounded-full transition-colors duration-200 hover:bg-white/5"
            >
              <span>Hubungi Kontak Kami</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
