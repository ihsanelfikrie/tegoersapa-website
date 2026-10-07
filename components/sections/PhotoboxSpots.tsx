"use client";

import Image from "next/image";
import Link from "next/link";

// ─── Data 5 Spot Venue Photobox Tegoer Sapa ──────────────────────────────────
const photoboxVenues = [
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
    city: "Banjarmasin",
    mapsUrl: "https://share.google/qLC2FpGFKW0oyvTpm",
  },
] as const;

export default function PhotoboxSpots() {
  return (
    <section
      id="photobox-spots"
      className="relative bg-white pt-24 sm:pt-20 lg:pt-24 pb-28 sm:pb-20 lg:pb-24 border-b border-gray-100 overflow-hidden scroll-mt-24"
      aria-label="Lokasi Photobox Tegoer Sapa"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Headline: Aman dari Overlap Navbar Floating di Layar HP ─── */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-3xl lg:text-[40px] font-black tracking-tight text-[#0f432a] leading-snug px-2">
            Temukan Spot Photobox di{" "}
            <span className="text-[#1eab73] block sm:inline mt-0.5 sm:mt-0">
              Coffee Shop Favoritmu
            </span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 font-medium max-w-md mx-auto px-4">
            Hadir di 5 titik hangout pilihan di Banjarbaru &amp; Banjarmasin
          </p>
        </div>

        {/* ─── 5 3D Model Box & Logo Grid: Grounded & Proporsional di Mobile & Desktop ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-9 sm:gap-6 lg:gap-8 items-end justify-center">
          {photoboxVenues.map((venue, idx) => (
            <div
              key={venue.id}
              className={[
                "group relative flex flex-col items-center justify-end text-center transition-all duration-300",
                idx === 4
                  ? "col-span-2 sm:col-span-1 max-w-[145px] sm:max-w-none mx-auto w-full"
                  : "",
              ].join(" ")}
            >
              {/* 3D Booth & Logo (Klik untuk ke Galeri) */}
              <Link
                href={venue.href}
                className="w-full flex flex-col items-center justify-end cursor-pointer focus:outline-none"
                aria-label={`Buka galeri photobox ${venue.name}`}
              >
                {/* 3D Isometric Booth Model (Statis & Bersih Tanpa Shadow) */}
                <div className="relative w-full aspect-square max-w-[140px] xs:max-w-[145px] sm:max-w-[190px] lg:max-w-[220px] flex items-center justify-center mb-2.5 sm:mb-4">
                  {/* Booth 3D Statis (Tanpa Animasi Floating Melayang Naik-Turun & Tanpa Shadow) */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={venue.model}
                      alt={`Model 3D Photobox ${venue.name}`}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                      className="object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
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
              </Link>

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
          ))}
        </div>

        {/* ─── Paragraf Teks & CTA (Aman dari Tutupan Floating Booking Bar) ─── */}
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
