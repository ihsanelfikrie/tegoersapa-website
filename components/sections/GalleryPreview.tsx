"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { portfolioPreview } from "@/lib/content";

/**
 * Section Preview Portfolio (Gallery Preview) di Homepage
 * Menampilkan grid portofolio dari berbagai kategori.
 * Mendukung status placeholder elegan sebelum file gambar sesungguhnya di-upload.
 * Dilengkapi dengan GSAP ScrollTrigger stagger entrance animation.
 */
export default function GalleryPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) return;

      // Animasi header
      gsap.fromTo(
        headerRef.current?.children ?? [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animasi grid items (stagger fade-up + scale)
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="portfolio-preview"
      className="py-24 bg-gray-50 text-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
              Galeri Pilihan
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black text-brand-dark tracking-tight leading-none">
              Koleksi Momen Terbaru
            </h2>
            <div aria-hidden="true" className="mt-4 w-12 h-1 rounded-full bg-brand-green" />
            <p className="mt-4 text-base text-gray-500 font-medium">
              Intip sedikit hasil karya kami. Mulai dari keceriaan photobox, hebohnya photobooth acara, hingga kemewahan foto profesional.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 text-sm font-bold text-brand-green hover:text-brand-dark transition-colors duration-300"
            >
              <span>Lihat Semua Portofolio</span>
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

        {/* Portfolio Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioPreview.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-brand-dark/5 ring-1 ring-black/5"
            >
              {/* Fallback Placeholder Visual sebelum file gambar diletakkan di public/ */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 to-brand-dark/85
                            flex flex-col items-center justify-center p-6 text-center select-none z-0"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-white/40 group-hover:text-brand-green/80 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.15em] mb-1">
                  {item.category} • {item.subCategory}
                </span>
                <h4 className="text-white text-base font-black tracking-wide max-w-[200px]">
                  {item.title}
                </h4>
              </div>

              {/* Real Image tag (diletakkan di z-10, akan tertutup fallback di atas jika gambar tak ada, 
                  namun di sini kita gunakan CSS check atau render normal jika file tersedia) */}
              {/* Untuk saat ini kami siapkan strukturnya. Agar aman terhadap link mati (404), image di-render jika di-uncomment/diaktifkan */}
              {/* 
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 z-10"
              />
              */}

              {/* Hover / Active overlay */}
              <div
                className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-end p-6"
                aria-hidden="true"
              >
                <div className="flex items-center gap-2 text-white font-bold text-xs bg-brand-green px-3 py-1.5 rounded-full shadow-lg">
                  <span>Lihat Detail</span>
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
  );
}
