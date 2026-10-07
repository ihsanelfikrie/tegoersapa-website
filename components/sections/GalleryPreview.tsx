"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Button from "@/components/ui/Button";

// ─── Data Portfolio Terpilih (Sesuai 100% dengan Visual Foto Asli) ─────────
const ourWorkItems = [
  {
    id: "work-prewedding",
    category: "Professional",
    subCategory: "Pre-Wedding",
    title: "Pre-Wedding Romantic Sunset Walk",
    image: "/images/gallery/PreWedding/PREWED-1.webp",
    href: "/gallery?kategori=professional&sub=prewedding",
  },
  {
    id: "work-outdoor-grad",
    category: "Graduation",
    subCategory: "Outdoor Kampus",
    title: "Golden Hour Graduation Walk",
    image: "/images/gallery/outGraduation/OUTGRAD-2.webp",
    href: "/gallery?kategori=professional&sub=outdoor-graduation",
  },
  {
    id: "work-indoor-grad",
    category: "Graduation",
    subCategory: "Studio Portrait",
    title: "Indoor Graduation Studio Portrait",
    image: "/images/gallery/inGraduation/INGRAD-1.webp",
    href: "/gallery?kategori=professional&sub=indoor-graduation",
  },
  {
    id: "work-wedding-pb",
    category: "Photobooth",
    subCategory: "Wedding Reception",
    title: "Grand Ballroom Wedding Photobooth",
    image: "/images/gallery/Wedding/PB-WED-1.webp",
    href: "/gallery?kategori=photobooth&sub=wedding",
  },
  {
    id: "work-event-pb",
    category: "Photobooth",
    subCategory: "Event & Festival",
    title: "Music Festival Live Photobooth",
    image: "/images/gallery/event/EVENT-1.webp",
    href: "/gallery?kategori=photobooth&sub=event",
  },
  {
    id: "work-photobox",
    category: "Photobox",
    subCategory: "Creative Self-Studio",
    title: "Photobox Quad Frame Experience",
    image: "/images/gallery/Photobox/Photobox-4.webp",
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

      // 2. Animasi Grid Items: Curtain Mask Reveal + Inner Image Zoom-Out (Efek No. 3)
      if (gridRef.current) {
        const cards = gsap.utils.toArray<HTMLElement>(".gallery-preview-card", gridRef.current);
        cards.forEach((card, i) => {
          const img = card.querySelector(".gallery-preview-img");
          const info = card.querySelector(".gallery-preview-info");
          const badge = card.querySelector(".gallery-preview-badge");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });

          // Efek Curtain Reveal: unmasking dari bawah ke atas
          tl.fromTo(
            card,
            { clipPath: "inset(0 0 100% 0)", opacity: 0.25 },
            {
              clipPath: "inset(0 0 0% 0)",
              opacity: 1,
              duration: 1.0,
              ease: "power3.inOut",
              delay: (i % 2) * 0.08,
            }
          );

          // Inner image zoom out simultan: scale dari 1.22 ke 1.0
          if (img) {
            tl.fromTo(
              img,
              { scale: 1.22 },
              { scale: 1, duration: 1.3, ease: "power2.out" },
              "<"
            );
          }

          // Text content reveal halus
          if (info) {
            tl.fromTo(
              info,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
              "-=0.45"
            );
          }

          if (badge) {
            tl.fromTo(
              badge,
              { opacity: 0, scale: 0.85 },
              { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" },
              "-=0.4"
            );
          }
        });
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
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50 text-black scroll-mt-20 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Section Header ────────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 lg:mb-16 gap-4 sm:gap-6"
        >
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
              Our Work
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight leading-none">
              Portofolio & Karya Pilihan
            </h2>
            <div aria-hidden="true" className="mt-3.5 w-12 h-1 rounded-full bg-brand-green mx-auto md:mx-0" />
            <p className="mt-3 text-sm sm:text-base text-gray-500 font-medium leading-relaxed">
              Jelajahi ragam dokumentasi visual Tegoer Sapa — mulai dari sesi pre-wedding romantis, kebanggaan wisuda kampus & studio, momen hangat keluarga, hingga keceriaan photobooth dan photobox interaktif.
            </p>
          </div>

          <div className="flex-shrink-0 self-center md:self-auto">
            <Button
              href="/gallery"
              variant="dark"
              size="sm"
            >
              <span>View All Work</span>
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Button>
          </div>
        </div>

        {/* ─── Clean Visual-Focused Gallery Grid (2 Kolom Rapi di Mobile) ────────────────────── */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-7"
        >
          {ourWorkItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="gallery-preview-card group relative block aspect-square sm:aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-3xl bg-brand-dark ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
            >
              {/* Background Cover Photo */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  className="gallery-preview-img object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
              </div>

              {/* Text Info */}
              <div className="gallery-preview-info absolute inset-0 flex flex-col justify-end p-3 sm:p-6 lg:p-7 z-10 select-none">
                <span className="text-[8px] sm:text-[10px] text-brand-green font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-0.5 sm:mb-1.5 line-clamp-1">
                  {item.category}
                </span>

                <h3 className="text-white text-xs sm:text-base lg:text-lg font-bold tracking-wide leading-snug group-hover:text-brand-green transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <span className="text-white/60 text-[10px] sm:text-xs font-medium mt-0.5 sm:mt-1 line-clamp-1 hidden sm:block">
                  {item.subCategory}
                </span>
              </div>

              {/* Tag Badge Top Left */}
              <span className="gallery-preview-badge absolute top-2.5 left-2.5 sm:top-4 sm:left-4 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[8px] sm:text-[10px] font-bold tracking-wider uppercase z-20">
                {item.category}
              </span>

              {/* Hover / Active Overlay dengan Tombol "View Work →" */}
              <div
                className="absolute inset-0 bg-brand-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex items-end justify-between p-6 pointer-events-none"
                aria-hidden="true"
              >
                <div className="flex items-center gap-2 text-white font-bold text-xs bg-brand-green px-4 py-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                  <span>View Work</span>
                  <span aria-hidden="true">→</span>
                </div>

                <span className="text-[11px] font-semibold text-white/90 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  Galeri Portfolio
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* ─── Bottom Centered CTA: View All Work ───────────────────── */}
        <div ref={footerCtaRef} className="mt-14 text-center px-4 sm:px-0">
          <Button
            href="/gallery"
            variant="dark"
            size="lg"
            className="w-full sm:w-auto"
          >
            <span>View All Work</span>
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Button>
        </div>

      </div>
    </section>
  );
}
