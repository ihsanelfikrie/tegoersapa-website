"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

// ─── 4 Featured Stories dari Portfolio Project ──────────────────────────────
const featuredStories = [
  {
    id: "story-prewed",
    category: "Professional Photo",
    subCategory: "Pre-Wedding",
    title: "Pre-Wedding Outdoor Love",
    description:
      "Momen sakral dan romantisme penuh kehangatan yang diabadikan dengan tata pencahayaan alami serta komposisi visual sinematik.",
    href: "/gallery?kategori=professional&sub=prewedding",
    tag: "Romantic",
    image: "/images/pricelist/prewed-poswed.webp",
  },
  {
    id: "story-grad",
    category: "Professional Photo",
    subCategory: "Outdoor Graduation",
    title: "Outdoor Graduation Moment",
    description:
      "Euforia kelulusan dan tawa kebersamaan bersama sahabat dalam balutan toga di spot terbaik kampus.",
    href: "/gallery?kategori=professional&sub=outdoor-graduation",
    tag: "Graduation",
    image: "/images/gallery/outGraduation/OUTGRAD-1.webp",
  },
  {
    id: "story-photobox",
    category: "Photobox",
    subCategory: "TS x Kean",
    title: "Tegoer Sapa x Kean",
    description:
      "Bebas berekspresi di dalam box foto mandiri modern dengan frame kolaborasi eksklusif dan cetak instan.",
    href: "/gallery?kategori=photobox",
    tag: "Self-Studio",
    image: "/images/pricelist/photobox-3d-circle.webp",
  },
  {
    id: "story-event",
    category: "Photobooth",
    subCategory: "Corporate Event",
    title: "Corporate Launch Event",
    description:
      "Menghidupkan atmosfer perayaan acara gathering dengan antusiasme photobooth dan cetak foto instan.",
    href: "/gallery?kategori=photobooth&sub=corporate",
    tag: "Event & Party",
    image: "/images/gallery/corporate/COR-2.webp",
  },
] as const;

export default function FeaturedStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const subCardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // 1. Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Main card entrance
      if (mainCardRef.current) {
        gsap.fromTo(
          mainCardRef.current,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mainCardRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Sub cards entrance stagger
      if (subCardsRef.current) {
        gsap.fromTo(
          subCardsRef.current.children,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.12,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subCardsRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const mainStory = featuredStories[0];
  const supportingStories = featuredStories.slice(1);

  return (
    <section
      ref={sectionRef}
      id="featured-stories"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white text-black scroll-mt-20 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Section Header ────────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 lg:mb-16 gap-4 sm:gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
              Featured Stories
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight leading-none">
              Cerita yang Kami Abadikan
            </h2>
            <div aria-hidden="true" className="mt-3.5 w-12 h-1 rounded-full bg-brand-green" />
            <p className="mt-3 text-sm sm:text-base text-gray-500 font-medium leading-relaxed">
              Setiap momen punya cerita. Kami hadir untuk menangkapnya dengan cara yang natural, personal, dan berkesan.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-green hover:text-brand-dark transition-colors duration-300"
            >
              <span>View All Work</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
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

        {/* ─── Stories Layout: 1 Besar (Kiri) + 3 Pendukung (Kanan) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-stretch">
          
          {/* 1. FOTO UTAMA BESAR (7 Kolom di Desktop) */}
          <div ref={mainCardRef} className="lg:col-span-7 flex flex-col">
            <div className="group h-full flex flex-col justify-between p-5 sm:p-7 lg:p-9 rounded-3xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:border-brand-green/30 transition-all duration-300">
              
              <div>
                {/* Visual Frame Slot Besar */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-brand-dark ring-1 ring-black/5 mb-5 sm:mb-7 group/img">
                  <Image
                    src={mainStory.image}
                    alt={mainStory.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-105 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Badge Top Left */}
                  <span className="absolute top-3.5 left-3.5 z-10 px-3 py-1 rounded-full bg-brand-green text-white text-[10px] font-bold tracking-wider uppercase shadow-md backdrop-blur-sm">
                    Featured Story
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-green/10 text-brand-dark border border-brand-green/20">
                    {mainStory.category}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">
                    • {mainStory.subCategory}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-brand-dark tracking-tight">
                  {mainStory.title}
                </h3>

                <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base text-gray-500 leading-relaxed font-medium">
                  {mainStory.description}
                </p>
              </div>

              {/* View Story Button */}
              <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200/80 flex items-center justify-between">
                <Link
                  href={mainStory.href}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wide bg-brand-dark group-hover:bg-brand-green text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span>View Story</span>
                  <span aria-hidden="true">→</span>
                </Link>

                <span className="text-[11px] sm:text-xs font-semibold text-gray-400">
                  Lihat detail di Galeri
                </span>
              </div>

            </div>
          </div>

          {/* 2. FOTO PENDUKUNG (5 Kolom di Desktop — 3 Kartu Kompak) */}
          <div ref={subCardsRef} className="lg:col-span-5 flex flex-col gap-3 sm:gap-4 justify-between">
            {supportingStories.map((story, index) => (
              <div
                key={story.id}
                className="group flex flex-row items-center gap-3.5 p-3.5 sm:p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-brand-green/30 transition-all duration-300"
              >
                {/* Visual Thumbnail Frame — kompak di mobile */}
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 aspect-square flex-shrink-0 rounded-2xl overflow-hidden bg-brand-dark ring-1 ring-black/5">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(max-width: 640px) 80px, 128px"
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Badge Angka & Tag */}
                  <div className="absolute bottom-1.5 left-1.5 z-10 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white">
                    <span className="text-[10px] font-bold leading-none text-emerald-400">
                      0{index + 2}
                    </span>
                    <span className="text-[8px] font-semibold tracking-wider uppercase text-white/80 line-clamp-1">
                      {story.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-brand-green">
                        {story.category}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-brand-dark tracking-tight leading-snug group-hover:text-brand-green transition-colors duration-200 line-clamp-1 sm:line-clamp-2">
                      {story.title}
                    </h4>

                    <p className="mt-0.5 text-xs text-gray-500 leading-relaxed font-medium line-clamp-1 sm:line-clamp-2 hidden sm:block">
                      {story.description}
                    </p>
                  </div>

                  <div className="mt-1.5 sm:mt-2.5">
                    <Link
                      href={story.href}
                      className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-brand-dark group-hover:text-brand-green transition-colors duration-200"
                    >
                      <span>View Story</span>
                      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
