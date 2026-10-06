"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { brand } from "@/lib/content";

/**
 * Section Behind The Lens di Homepage
 * Menampilkan sisi proses dan suasana kerja Tegoer Sapa dengan 1 visual utama yang kuat
 * dan visual pendukung, berfokus pada visual dengan teks ringkas personal & profesional.
 */
export default function BehindTheLens() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mainVisualRef = useRef<HTMLDivElement>(null);
  const subVisualsRef = useRef<HTMLDivElement>(null);

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
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Animasi Visual Utama
      if (mainVisualRef.current) {
        gsap.fromTo(
          mainVisualRef.current,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mainVisualRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Animasi Visual Pendukung
      if (subVisualsRef.current) {
        gsap.fromTo(
          subVisualsRef.current.children,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.12,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subVisualsRef.current,
              start: "top 82%",
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
      id="behind-the-lens"
      className="py-24 bg-white text-black scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Section Header ────────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
              Behind The Scenes
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black text-brand-dark tracking-tight leading-none">
              Behind The Lens
            </h2>
            <div aria-hidden="true" className="mt-4 w-12 h-1 rounded-full bg-brand-green" />
            <h3 className="mt-4 text-lg sm:text-xl font-bold text-brand-green">
              Setiap foto punya cerita di balik prosesnya.
            </h3>
            <p className="mt-2 text-base text-gray-500 font-medium leading-relaxed">
              Mulai dari penataan pencahayaan presisi, pengarahan pose yang santai dan natural, hingga kurasi serta color grading akhir — kami mendedikasikan setiap langkah untuk menghidupkan cerita Anda.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/tentang"
              className="group inline-flex items-center gap-2 text-sm font-bold text-brand-green hover:text-brand-dark transition-colors duration-300"
            >
              <span>See More</span>
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

        {/* ─── Visual Grid: 1 Visual Utama Kuat + 2 Visual Pendukung ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* 1. VISUAL UTAMA BESAR (7 Kolom di Desktop) */}
          <div ref={mainVisualRef} className="lg:col-span-7 flex flex-col">
            <div className="group relative h-full flex flex-col justify-between p-7 sm:p-9 rounded-3xl overflow-hidden bg-brand-dark text-white border border-white/10 transition-all duration-300 hover:border-brand-green/40">
              
              {/* Background Glow & Subtle Texture */}
              <div
                aria-hidden="true"
                className="absolute -top-20 -right-20 w-80 h-80 bg-brand-green/15 rounded-full pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-20 -left-20 w-72 h-72 bg-brand-dark rounded-full pointer-events-none"
              />

              {/* Visual Frame Slot Utama */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-black/40 ring-1 ring-white/10 mb-7">
                <div className="absolute inset-0 bg-brand-dark flex flex-col items-center justify-center p-8 text-center select-none">
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/15 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-brand-green/50 transition-all duration-300">
                    <svg className="w-7 h-7 text-white/50 group-hover:text-brand-green transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] mb-1">
                    On-Site & Studio Session
                  </span>
                  <h4 className="text-white text-lg sm:text-xl font-black tracking-wide">
                    Directing & Creating The Moment
                  </h4>
                </div>

                {/* Badge Top Left */}
                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-brand-green text-white text-[10px] font-bold tracking-wider uppercase">
                  Main Focus
                </span>
              </div>

              {/* Text Information */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
                  Pendekatan Personal
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight mt-1 text-white">
                  Menciptakan Suasana yang Nyaman & Alami
                </h3>
                <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed font-medium">
                  Kenyamanan Anda di depan kamera adalah prioritas utama. Melalui komunikasi yang hangat dan arahan gaya yang santai, kami membantu setiap ekspresi mengalir secara tulus dan tanpa rasa canggung.
                </p>
              </div>

              {/* Bottom Action */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <Link
                  href="/tentang"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wide bg-brand-green hover:bg-brand-green/90 text-white px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>See More</span>
                  <span aria-hidden="true">→</span>
                </Link>

                <span className="text-xs font-medium text-white/40">
                  {brand.name} Studio
                </span>
              </div>

            </div>
          </div>

          {/* 2. VISUAL PENDUKUNG (5 Kolom di Desktop — 2 Kartu) */}
          <div ref={subVisualsRef} className="lg:col-span-5 flex flex-col gap-6 justify-between">
            
            {/* Visual Pendukung 1: Lighting & Setup */}
            <div className="group flex-1 p-6 sm:p-7 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-brand-green/30 transition-all duration-300 flex flex-col justify-between">
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-brand-dark ring-1 ring-black/5 mb-5">
                  <div className="absolute inset-0 bg-brand-dark flex flex-col items-center justify-center p-4 text-center select-none">
                    <span className="text-brand-green font-bold text-lg leading-none">
                      01
                    </span>
                    <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider mt-1">
                      Setup & Precision
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green">
                  Tahap 01
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-brand-dark tracking-tight mt-1">
                  Lighting & Atmosphere Setup
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                  Pengaturan tata cahaya presisi sesuai mood sesi — mulai dari kehangatan cahaya natural hingga studio soft lighting berkualitas tinggi.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-brand-dark group-hover:text-brand-green transition-colors">
                <span>Pelajari Proses</span>
                <span aria-hidden="true">→</span>
              </div>
            </div>

            {/* Visual Pendukung 2: Post-Processing & Grading */}
            <div className="group flex-1 p-6 sm:p-7 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-brand-green/30 transition-all duration-300 flex flex-col justify-between">
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-brand-dark ring-1 ring-black/5 mb-5">
                  <div className="absolute inset-0 bg-brand-dark flex flex-col items-center justify-center p-4 text-center select-none">
                    <span className="text-brand-green font-bold text-lg leading-none">
                      02
                    </span>
                    <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider mt-1">
                      Curation & Grading
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green">
                  Tahap 02
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-brand-dark tracking-tight mt-1">
                  Post-Processing & Color Grading
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                  Sentuhan akhir kurasi teliti dan color grading sinematik untuk mempertahankan warna kulit natural serta keindahan setiap detail busana.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-brand-dark group-hover:text-brand-green transition-colors">
                <span>Lihat Hasil Akhir</span>
                <span aria-hidden="true">→</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
