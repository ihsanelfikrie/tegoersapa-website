"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Data 5 Spot Venue Photobox Tegoer Sapa ──────────────────────────────────
interface VenueSpot {
  id: string;
  name: string;
  subSlug: string;
  logo: string;
  model: string;
  href: string;
  tag: string;
  city: "Banjarbaru" | "Banjarmasin";
  mapsUrl: string;
}

const photoboxVenues: VenueSpot[] = [
  {
    id: "sirkem",
    name: "Warkop Sirkem",
    subSlug: "sirkem",
    logo: "/images/venues/sirkem-logo.png",
    model: "/images/venues/sirkem-box.webp",
    href: "/gallery?kategori=photobox&sub=sirkem",
    tag: "Warkop Sirkem",
    city: "Banjarbaru",
    mapsUrl: "https://maps.app.goo.gl/GPzjBY3dBXuUr5ESA",
  },
  {
    id: "kean",
    name: "Kéan Coffee",
    subSlug: "kean",
    logo: "/images/venues/kean-logo.png",
    model: "/images/venues/kean-box.webp",
    href: "/gallery?kategori=photobox&sub=kean",
    tag: "Kéan Coffee",
    city: "Banjarbaru",
    mapsUrl: "https://share.google/ypoJPLN7wFOWoAoF0",
  },
  {
    id: "hatara",
    name: "Hatara Coffee",
    subSlug: "hatara",
    logo: "/images/venues/hatara-logo.png",
    model: "/images/venues/hatara-box.webp",
    href: "/gallery?kategori=photobox&sub=hatara",
    tag: "Hatara Coffee",
    city: "Banjarbaru",
    mapsUrl: "https://maps.app.goo.gl/vi8YYLQFtV66T2Ft9",
  },
  {
    id: "aimee",
    name: "Aime Coffee",
    subSlug: "aimee",
    logo: "/images/venues/aime-logo.png",
    model: "/images/venues/aime-box.webp",
    href: "/gallery?kategori=photobox&sub=aimee",
    tag: "Aime Coffee",
    city: "Banjarbaru",
    mapsUrl: "https://share.google/5MfvXeEBPDw0aRFjW",
  },
  {
    id: "nolima",
    name: "NoLima",
    subSlug: "nolima",
    logo: "/images/venues/nolima-logo.png",
    model: "/images/venues/nolima-box.webp",
    href: "/gallery?kategori=photobox&sub=nolima",
    tag: "NoLima",
    city: "Banjarbaru",
    mapsUrl: "https://share.google/qLC2FpGFKW0oyvTpm",
  },
];

export default function PhotoboxSpots() {
  const [selectedCity, setSelectedCity] = useState<"all" | "Banjarbaru" | "Banjarmasin">("all");

  const filteredVenues = photoboxVenues.filter((venue) => {
    if (selectedCity === "all") return true;
    return venue.city === selectedCity;
  });

  return (
    <section
      id="photobox-spots"
      className="relative bg-white pt-24 sm:pt-20 lg:pt-24 pb-24 sm:pb-20 lg:pb-24 border-b border-gray-100 overflow-hidden scroll-mt-24"
      aria-label="Lokasi Photobox Tegoer Sapa"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Headline ───────────────────────────────────────────── */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-3xl lg:text-[40px] font-black tracking-tight text-[#0f432a] leading-snug px-2">
            Temukan Spot Photobox di{" "}
            <span className="text-[#1eab73] block sm:inline mt-0.5 sm:mt-0">
              Coffee Shop Favoritmu
            </span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 font-medium max-w-md mx-auto px-4">
            Bilik photobox privat mandiri di 5 titik hangout pilihan Banjarbaru (Banjarmasin segera hadir)
          </p>

          {/* Filter Tab Kota */}
          <div className="mt-5 inline-flex items-center p-1 bg-gray-100 rounded-2xl border border-gray-200/80 max-w-full overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedCity("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCity === "all"
                  ? "bg-brand-dark text-white shadow-xs"
                  : "text-gray-600 hover:text-brand-dark"
              }`}
            >
              Semua Spot (5)
            </button>
            <button
              type="button"
              onClick={() => setSelectedCity("Banjarbaru")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCity === "Banjarbaru"
                  ? "bg-brand-dark text-white shadow-xs"
                  : "text-gray-600 hover:text-brand-dark"
              }`}
            >
              Banjarbaru (5)
            </button>
            <button
              type="button"
              onClick={() => setSelectedCity("Banjarmasin")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                selectedCity === "Banjarmasin"
                  ? "bg-brand-dark text-white shadow-xs"
                  : "text-gray-600 hover:text-brand-dark"
              }`}
            >
              <span>Banjarmasin</span>
              <span
                className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full tracking-wide transition-colors ${
                  selectedCity === "Banjarmasin"
                    ? "bg-amber-300 text-brand-dark"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                Upcoming
              </span>
            </button>
          </div>
        </div>

        {/* ─── Konten: Upcoming Banjarmasin ATAU Grid 5 3D Model Box ── */}
        {selectedCity === "Banjarmasin" ? (
          <div className="relative max-w-xl mx-auto my-6 sm:my-10 p-6 sm:p-10 rounded-[2rem] bg-[#fafcfa] border-[3px] border-[#0f432a] text-center shadow-[6px_6px_0_0_#0f432a] transition-all hover:shadow-[8px_8px_0_0_#0f432a] hover:-translate-y-1 hover:-rotate-1 z-10 group">
            {/* Dekorasi playful */}
            <div className="absolute -top-4 -right-4 text-4xl transform rotate-12 group-hover:rotate-45 transition-transform duration-300">
              ✨
            </div>
            <div className="absolute -bottom-3 -left-3 text-3xl transform -rotate-12 group-hover:-rotate-45 transition-transform duration-300 opacity-60">
              📸
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1eab73]/15 text-[#0f432a] border border-[#1eab73]/30 text-xs font-black tracking-wider uppercase mb-5">
              <span>⏳</span>
              <span>Segera Hadir di Banjarmasin</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black text-brand-dark mb-3 tracking-tight leading-tight">
              Spot Photobox Banjarmasin Sedang Disiapkan!
            </h3>
            
            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed max-w-md mx-auto mb-8">
              Saat ini seluruh 5 bilik photobox mandiri Tegoer Sapa aktif beroperasi di Kota Banjarbaru. Kami sedang menyiapkan spot bilik foto aesthetic berikutnya di coffee shop pilihan Kota Banjarmasin.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://wa.me/6285187834710?text=Halo%20Tegoer%20Sapa,%20saya%20mau%20rekomendasi%20spot%20photobox%20di%20Banjarmasin"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0f432a] hover:bg-[#1eab73] text-white text-xs font-black transition-all shadow-[2px_2px_0_0_#1eab73] hover:shadow-[4px_4px_0_0_#0f432a] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_0_0_0_transparent]"
              >
                <span>Rekomendasikan Kafe 💬</span>
              </a>
              <button
                type="button"
                onClick={() => setSelectedCity("Banjarbaru")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-white hover:bg-gray-50 text-[#0f432a] border-2 border-[#0f432a] text-xs font-black transition-all cursor-pointer shadow-[2px_2px_0_0_#0f432a] hover:shadow-[4px_4px_0_0_#0f432a] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_0_0_0_transparent]"
              >
                <span>Lihat 5 Spot Banjarbaru</span>
                <span>→</span>
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`grid gap-x-4 gap-y-9 sm:gap-6 lg:gap-8 items-end justify-center transition-all duration-300 ${
              filteredVenues.length === 1
                ? "grid-cols-1 max-w-[220px] mx-auto"
                : filteredVenues.length === 4
                ? "grid-cols-2 sm:grid-cols-4 max-w-5xl mx-auto"
                : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
            }`}
          >
          {filteredVenues.map((venue, idx) => {
            const isLastSingle = filteredVenues.length === 5 && idx === 4;

            return (
              <div
                key={venue.id}
                className={[
                  "group relative flex flex-col items-center justify-end text-center transition-all duration-300",
                  isLastSingle
                    ? "col-span-2 sm:col-span-1 max-w-[145px] sm:max-w-none mx-auto w-full"
                    : "",
                ].join(" ")}
              >
                {/* 3D Booth & Logo */}
                <div className="w-full flex flex-col items-center justify-end focus:outline-none">
                  {/* 3D Isometric Booth Model */}
                  <div className="relative w-full aspect-square max-w-[140px] xs:max-w-[145px] sm:max-w-[190px] lg:max-w-[220px] flex items-center justify-center mb-2.5 sm:mb-4 rounded-2xl transition-all duration-300 hover:scale-102">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={venue.model}
                        alt={`Model 3D Photobox ${venue.name}`}
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                        className="object-contain transition-transform duration-300 ease-out"
                        priority={idx < 2}
                      />
                    </div>
                  </div>

                  {/* Venue Logo Container */}
                  <div className="relative w-full h-8 sm:h-11 flex items-center justify-center px-1 my-0.5">
                    <Image
                      src={venue.logo}
                      alt={`Logo ${venue.name}`}
                      fill
                      sizes="180px"
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Teks Link Google Maps di Bawah Logo */}
                <a
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-[11px] sm:text-xs font-bold text-[#1eab73] hover:text-[#0f432a] hover:underline transition-colors inline-flex items-center gap-1 py-0.5"
                  title={`Buka rute ${venue.name} di Google Maps`}
                >
                  <span>Buka di Google Maps</span>
                  <span className="text-[10px] sm:text-[11px]">↗</span>
                </a>
              </div>
            );
          })}
        </div>
      )}

        {/* ─── Paragraf Teks & CTA ─────────────────────────────────── */}
        <div className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto px-4">
          <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-relaxed">
            Abadikan momen seru bareng teman, pasangan, atau keluarga di bilik photobox privat kami. Cetak foto instan dalam hitungan detik dengan berbagai pilihan desain strip frame eksklusif.
          </p>
          <div className="mt-5 sm:mt-6 flex items-center justify-center">
            <Link
              href="/gallery?kategori=photobox"
              className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-[#0f432a] hover:bg-[#1eab73] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all duration-300"
            >
              <span>Lihat Semua Foto Photobox</span>
              <span>→</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
