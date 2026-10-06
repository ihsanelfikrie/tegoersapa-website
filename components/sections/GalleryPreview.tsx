"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// ─── Data Portfolio Terpilih Mencakup Semua Kategori yang Diminta ───────────
const ourWorkItems = [
  {
    id: "work-wedding",
    category: "Wedding",
    subCategory: "Documentation",
    title: "Wedding Celebration & Moments",
    href: "/gallery?kategori=photobooth&sub=wedding",
  },
  {
    id: "work-graduation",
    category: "Graduation",
    subCategory: "Outdoor & Studio",
    title: "Graduation Milestone Session",
    href: "/gallery?kategori=professional&sub=outdoor-graduation",
  },
  {
    id: "work-traditional",
    category: "Traditional Photography",
    subCategory: "Adat & Budaya",
    title: "Traditional Heritage Ceremony",
    href: "/gallery?kategori=professional",
  },
  {
    id: "work-studio",
    category: "Studio",
    subCategory: "Professional Portrait",
    title: "Studio Portrait & Personal Branding",
    href: "/gallery?kategori=professional&sub=indoor-graduation",
  },
  {
    id: "work-photobooth",
    category: "Photobooth",
    subCategory: "Event & Party",
    title: "Interactive Photobooth Experience",
    href: "/gallery?kategori=photobooth",
  },
  {
    id: "work-photobox",
    category: "Photobox",
    subCategory: "Self-Studio Box",
    title: "Self-Studio Box & Frame Series",
    href: "/gallery?kategori=photobox",
  },
] as const;

/**
 * Section Our Work / Portfolio Preview di Homepage
 * Layout gallery clean, visual-focused, menampilkan kategori:
 * Wedding, Graduation, Traditional Photography, Studio, Photobooth.
 */
export default function GalleryPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerCtaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // 1. Animasi Header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Animasi Grid Items (stagger fade-up + scale)
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
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

      // 3. Animasi Footer CTA
      if (footerCtaRef.current) {
        gsap.fromTo(
          footerCtaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerCtaRef.current,
              start: "top 90%",
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
      id="our-work"
      className="py-24 bg-gray-50 text-black scroll-mt-20 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Section Header ────────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
              Our Work
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black text-brand-dark tracking-tight leading-none">
              Portofolio & Karya Pilihan
            </h2>
            <div aria-hidden="true" className="mt-4 w-12 h-1 rounded-full bg-brand-green" />
            <p className="mt-4 text-base text-gray-500 font-medium leading-relaxed">
              Jelajahi ragam dokumentasi visual Tegoer Sapa — mulai dari momen sakral pernikahan, kebanggaan wisuda, prosesi adat, sesi studio eksklusif, hingga keceriaan photobooth interaktif.
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

        {/* ─── Clean Visual-Focused Gallery Grid ────────────────────── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
        >
          {ourWorkItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-brand-dark ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Visual Frame Slot dengan Gradient Elegan */}
              <div
                className="absolute inset-0 bg-brand-dark
                            flex flex-col items-center justify-center p-6 sm:p-7 text-center select-none"
              >
                <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-brand-green/40 transition-all duration-300">
                  <svg
                    className="w-5 h-5 text-white/40 group-hover:text-brand-green transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                    />
                  </svg>
                </div>

                <span className="text-[10px] text-brand-green font-bold uppercase tracking-[0.2em] mb-1.5">
                  {item.category}
                </span>

                <h3 className="text-white text-base sm:text-lg font-bold tracking-wide leading-snug max-w-[240px] group-hover:text-white transition-colors">
                  {item.title}
                </h3>

                <span className="text-white/40 text-xs font-medium mt-1">
                  {item.subCategory}
                </span>
              </div>

              {/* Tag Badge Top Left */}
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/90 text-[10px] font-bold tracking-wider uppercase z-10">
                {item.category}
              </span>

              {/* Hover / Active Overlay dengan Tombol "View Work →" */}
              <div
                className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-end justify-between p-6"
                aria-hidden="true"
              >
                <div className="flex items-center gap-2 text-white font-bold text-xs bg-brand-green px-4 py-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span>View Work</span>
                  <span aria-hidden="true">→</span>
                </div>

                <span className="text-[11px] font-semibold text-white/70">
                  Galeri Portfolio
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* ─── Bottom Centered CTA: View All Work ───────────────────── */}
        <div ref={footerCtaRef} className="mt-14 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-green text-white font-bold text-sm tracking-wide px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5"
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
    </section>
  );
}
