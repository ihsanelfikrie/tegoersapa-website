"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { portfolioPreview, brand } from "@/lib/content";

// ─── 4 Layanan Photography & Documentation ──────────────────────────────────
const photographyServices = [
  {
    id: "traditional-photography",
    tag: "Busana & Kebaya",
    title: "Traditional Photography",
    description:
      "Dokumentasi busana kebaya dan tradisi budaya nusantara dengan pendekatan visual yang autentik, khidmat, dan penuh makna.",
    exploreHref: "/photography/traditional",
    categoryLabel: "Traditional",
    image: "/images/pricelist/outdoor-unity.webp",
  },
  {
    id: "wedding-documentation",
    tag: "Pernikahan & Prewed",
    title: "Wedding Documentation",
    description:
      "Abadikan setiap detik sakral, haru, dan romantis hari bahagia Anda dengan visual sinematik dan tata warna berkelas.",
    exploreHref: "/photography/wedding",
    categoryLabel: "Wedding",
    image: "/images/pricelist/prewed-poswed.webp",
  },
  {
    id: "graduation",
    tag: "Wisuda & Kelulusan",
    title: "Graduation",
    description:
      "Rayakan kelulusan dan kebanggaan bersama keluarga serta sahabat melalui sesi foto wisuda outdoor kampus maupun indoor studio.",
    exploreHref: "/photography/graduation",
    categoryLabel: "Graduation",
    image: "/images/pricelist/outdoor-framely.webp",
  },
  {
    id: "studio-professional",
    tag: "Studio Portrait",
    title: "Studio Professional",
    description:
      "Sesi foto studio eksklusif dengan tata pencahayaan presisi, pilihan backdrop elegan, dan pengarahan gaya profesional.",
    exploreHref: "/photography/studio",
    categoryLabel: "Studio",
    image: "/images/pricelist/personal.webp",
  },
] as const;

// ─── Featured Portfolio Items yang relevan dari project ─────────────────────
const featuredPhotographyWork = portfolioPreview.filter((item) =>
  ["Professional", "Photobooth"].includes(item.category)
).slice(0, 6);

export default function PhotographyPage() {
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
          1. HERO SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 lg:pt-36 lg:pb-24 bg-brand-dark text-white overflow-hidden"
        aria-label="Hero Photography"
      >
        {/* Subtle Ambient Glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 right-0 w-96 h-96 bg-brand-green/10 rounded-full pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-10 left-10 w-72 h-72 bg-brand-green/5 rounded-full pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Teks Hero (Kiri) */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="hero-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green/15 border border-brand-green/30 text-brand-green text-xs font-bold uppercase tracking-[0.2em] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                Layanan Fotografi
              </span>

              <h1 className="hero-anim text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05]">
                Photography / <span className="text-brand-green">Documentation</span>
              </h1>

              <div className="hero-anim w-16 h-1 rounded-full bg-brand-green my-6" />

              <p className="hero-anim text-base sm:text-lg text-white/70 font-medium leading-relaxed max-w-xl">
                Mengabadikan setiap cerita, emosi, dan tradisi berharga dengan keahlian fotografi profesional dan estetika visual sinematik khas {brand.name}.
              </p>

              <div className="hero-anim mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/pricelist"
                  className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green/90 text-white font-bold text-xs tracking-wide px-6 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>Lihat Pricelist</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>

                <a
                  href="#services"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-brand-green text-white/80 hover:text-white font-bold text-xs tracking-wide px-6 py-3.5 rounded-full transition-colors duration-200 hover:bg-white/5"
                >
                  <span>Explore Services ↓</span>
                </a>
              </div>
            </div>

            {/* Visual Mosaic Preview (Kanan) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              {photographyServices.map((svc, idx) => (
                <div
                  key={svc.id}
                  className={`hero-anim relative aspect-[4/3] rounded-2xl overflow-hidden bg-brand-dark/80 ring-1 ring-white/10 p-4 flex flex-col justify-between group ${
                    idx === 0 ? "sm:col-span-2 sm:aspect-[2.2/1]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full border border-brand-green/20">
                      {svc.categoryLabel}
                    </span>
                    <span className="text-[10px] font-bold text-white/40">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-white text-sm font-bold tracking-wide leading-tight">
                      {svc.title}
                    </h2>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. OUR SERVICES (4 Layanan Utama)
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={servicesRef}
        id="services"
        className="py-24 bg-white text-black scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
              Layanan Kami
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black text-brand-dark tracking-tight">
              Our Services
            </h2>
            <div aria-hidden="true" className="mx-auto mt-4 w-12 h-1 rounded-full bg-brand-green" />
            <p className="mt-4 text-base text-gray-500 font-medium">
              Pilihan layanan fotografi terbaik yang dirancang untuk mengabadikan momen berharga Anda secara profesional.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {photographyServices.map((service, index) => (
              <div
                key={service.id}
                className="service-card group flex flex-col justify-between p-5 sm:p-8 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-brand-green/30 transition-all duration-300"
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
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-black text-2xl text-brand-green/30">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-brand-dark tracking-tight">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-500 leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>

                {/* Tombol Explore Work */}
                <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={service.exploreHref}
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-wide bg-brand-dark group-hover:bg-brand-green text-white px-5 py-2.5 rounded-full transition-all duration-300"
                  >
                    <span>Detail Layanan</span>
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>

                  <Link
                    href="/pricelist"
                    className="text-xs font-semibold text-gray-400 hover:text-brand-dark transition-colors"
                  >
                    Lihat Paket →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. FEATURED WORK (Portfolio Terbaik yang Tersedia di Project)
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={featuredRef}
        className="py-24 bg-gray-50 text-black border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl">
              <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
                Portofolio Pilihan
              </span>
              <h2 className="mt-3 text-3xl sm:text-5xl font-black text-brand-dark tracking-tight">
                Featured Work
              </h2>
              <div aria-hidden="true" className="mt-4 w-12 h-1 rounded-full bg-brand-green" />
              <p className="mt-4 text-base text-gray-500 font-medium">
                Cuplikan hasil karya dokumentasi dan sesi fotografi terbaik yang telah kami kerjakan.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link
                href="/gallery?kategori=professional"
                className="group inline-flex items-center gap-2 text-sm font-bold text-brand-green hover:text-brand-dark transition-colors duration-300"
              >
                <span>Lihat Semua di Gallery</span>
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

          {/* Grid Layout Konsisten dengan Gallery Existing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPhotographyWork.map((item) => (
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
        className="py-20 lg:py-24 bg-brand-dark text-white border-t border-white/10"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
            Let&apos;s Collaborate
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black text-white tracking-tight">
            Interested in our work?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl mx-auto font-medium">
            Temukan paket dokumentasi dan sesi fotografi yang paling pas untuk perayaan berharga Anda.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/pricelist"
              className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green/90 text-white font-bold text-sm tracking-wide px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>View Pricelist</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <a
              href="https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20konsultasi%20layanan%20Photography%20Tegoer%20Sapa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-brand-green text-white font-bold text-sm tracking-wide px-8 py-4 rounded-full transition-colors duration-200 hover:bg-white/5"
            >
              <span>Chat WhatsApp</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
