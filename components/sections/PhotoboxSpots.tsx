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
    delay: "0s",
  },
  {
    id: "kean",
    name: "Kéan Coffee",
    subSlug: "kean",
    logo: "/images/venues/kean-logo.png",
    model: "/images/venues/kean-box.webp",
    href: "/gallery?kategori=photobox&sub=kean",
    tag: "Kéan Coffee",
    delay: "0.5s",
  },
  {
    id: "hatara",
    name: "Hatara Coffee",
    subSlug: "hatara",
    logo: "/images/venues/hatara-logo.png",
    model: "/images/venues/hatara-box.webp",
    href: "/gallery?kategori=photobox&sub=hatara",
    tag: "Hatara Coffee",
    delay: "1.0s",
  },
  {
    id: "aimee",
    name: "Aime Coffee",
    subSlug: "aimee",
    logo: "/images/venues/aime-logo.png",
    model: "/images/venues/aime-box.webp",
    href: "/gallery?kategori=photobox&sub=aimee",
    tag: "Aime Coffee",
    delay: "1.5s",
  },
  {
    id: "nolima",
    name: "NoLima",
    subSlug: "nolima",
    logo: "/images/venues/nolima-logo.png",
    model: "/images/venues/nolima-box.webp",
    href: "/gallery?kategori=photobox&sub=nolima",
    tag: "NoLima",
    delay: "2.0s",
  },
] as const;

export default function PhotoboxSpots() {
  return (
    <section
      className="relative bg-white py-12 sm:py-18 lg:py-24 border-b border-gray-100 overflow-hidden"
      aria-label="Lokasi Photobox Tegoer Sapa"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Headline persis seperti referensi ───────────────────── */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#0f432a]">
            Photobox Kami Tersedia di
          </h2>
        </div>

        {/* ─── 5 3D Model Box & Venue Logo Grid ───────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-8 items-end justify-center">
          {photoboxVenues.map((venue, idx) => (
            <Link
              key={venue.id}
              href={venue.href}
              className={[
                "group relative flex flex-col items-center justify-end text-center cursor-pointer transition-all duration-300",
                idx === 4 ? "col-span-2 sm:col-span-1 max-w-[240px] sm:max-w-none mx-auto w-full" : "",
              ].join(" ")}
            >
              {/* 3D Isometric Booth Model */}
              <div className="relative w-full aspect-square max-w-[190px] sm:max-w-[220px] lg:max-w-[240px] flex items-center justify-center mb-3 sm:mb-5">
                <div
                  className="booth-float-anim relative w-full h-full flex items-center justify-center"
                  style={{ animationDelay: venue.delay }}
                >
                  <Image
                    src={venue.model}
                    alt={`Model 3D Photobox ${venue.name}`}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                    className="object-contain group-hover:scale-108 group-hover:-translate-y-2 transition-transform duration-500 ease-out"
                    priority={idx < 3}
                  />
                </div>
              </div>

              {/* Venue Logo Container */}
              <div className="relative w-full h-11 sm:h-14 flex items-center justify-center px-2">
                <Image
                  src={venue.logo}
                  alt={`Logo ${venue.name}`}
                  fill
                  sizes="180px"
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Micro Hover Cue */}
              <span className="mt-2 text-[11px] font-bold text-[#1eab73] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 inline-flex items-center gap-1">
                <span>Buka Galeri</span>
                <span>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes boothFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .booth-float-anim {
          animation: boothFloat 4.2s ease-in-out infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .booth-float-anim {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
