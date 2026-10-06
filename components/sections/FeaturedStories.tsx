"use client";

import { useRef } from "react";
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
  },
  {
    id: "story-event",
    category: "Photobooth",
    subCategory: "Corporate Event",
    title: "Corporate Launch Event",
    description:
      "Menghidupkan atmosfer perayaan acara gathering dengan antusiasme photobooth dan cetak foto instan.",
    href: "/gallery?kategori=photobooth&sub=event",
    tag: "Event & Party",
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
      className="py-24 bg-white text-black scroll-mt-20 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Section Header ────────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
              Featured Stories
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black text-brand-dark tracking-tight leading-none">
              Cerita yang Kami Abadikan
            </h2>
            <div aria-hidden="true" className="mt-4 w-12 h-1 rounded-full bg-brand-green" />
            <p className="mt-4 text-base text-gray-500 font-medium leading-relaxed">
              Setiap momen punya cerita. Kami hadir untuk menangkapnya dengan cara yang natural, personal, dan berkesan.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 text-sm font-bold text-brand-green hover:text-brand-dark transition-colors duration-300"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* 1. FOTO UTAMA BESAR (7 Kolom di Desktop) */}
          <div ref={mainCardRef} className="lg:col-span-7 flex flex-col">
            <div className="group h-full flex flex-col justify-between p-7 sm:p-9 rounded-3xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:border-brand-green/30 transition-all duration-300">
              
              <div>
                {/* Visual Frame Slot Besar */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-brand-dark ring-1 ring-black/5 mb-7">
                  <div className="absolute inset-0 bg-brand-dark flex flex-col items-center justify-center p-8 text-center select-none">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-white/40 group-hover:text-brand-green transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                      </svg>
                    </div>
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] mb-1">
                      {mainStory.category} • {mainStory.subCategory}
                    </span>
                    <h4 className="text-white text-lg sm:text-xl font-black tracking-wide">
                      {mainStory.title}
                    </h4>
                  </div>

                  {/* Badge Top Left */}
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-brand-green text-white text-[10px] font-bold tracking-wider uppercase">
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

                <h3 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
                  {mainStory.title}
                </h3>

                <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed font-medium">
                  {mainStory.description}
                </p>
              </div>

              {/* View Story Button */}
              <div className="mt-8 pt-6 border-t border-gray-200/80 flex items-center justify-between">
                <Link
                  href={mainStory.href}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wide bg-brand-dark group-hover:bg-brand-green text-white px-6 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span>View Story</span>
                  <span aria-hidden="true">→</span>
                </Link>

                <span className="text-xs font-semibold text-gray-400">
                  Lihat detail di Galeri
                </span>
              </div>

            </div>
          </div>

          {/* 2. FOTO PENDUKUNG (5 Kolom di Desktop — 3 Kartu) */}
          <div ref={subCardsRef} className="lg:col-span-5 flex flex-col gap-4 sm:gap-5 justify-between">
            {supportingStories.map((story, index) => (
              <div
                key={story.id}
                className="group flex flex-col sm:flex-row lg:flex-row items-stretch sm:items-center lg:items-center gap-4 p-5 sm:p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-brand-green/30 transition-all duration-300"
              >
                {/* Visual Thumbnail Frame */}
                <div className="relative w-full sm:w-36 lg:w-36 aspect-[16/10] sm:aspect-square lg:aspect-square flex-shrink-0 rounded-xl overflow-hidden bg-brand-dark ring-1 ring-black/5">
                  <div className="absolute inset-0 bg-brand-dark flex flex-col items-center justify-center p-3 text-center select-none">
                    <span className="text-brand-green font-bold text-base leading-none">
                      0{index + 2}
                    </span>
                    <span className="text-[9px] text-white/50 font-bold uppercase tracking-wider mt-1">
                      {story.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green">
                        {story.category}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-brand-dark tracking-tight leading-snug group-hover:text-brand-green transition-colors duration-200">
                      {story.title}
                    </h4>

                    <p className="mt-1 text-xs text-gray-500 leading-relaxed font-medium line-clamp-2">
                      {story.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2">
                    <Link
                      href={story.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark group-hover:text-brand-green transition-colors duration-200"
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
