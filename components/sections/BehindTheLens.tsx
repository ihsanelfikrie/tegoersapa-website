"use client";

import { useRef } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
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

      // 2. Animasi Visual Utama (Curtain Mask Reveal)
      if (mainVisualRef.current) {
        gsap.fromTo(
          mainVisualRef.current,
          { clipPath: "inset(0 0 100% 0 round 1.5rem)", opacity: 0.2 },
          {
            clipPath: "inset(0 0 0% 0 round 1.5rem)",
            opacity: 1,
            duration: 1.1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: mainVisualRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Animasi Visual Pendukung (Stagger Curtain Mask Reveal)
      if (subVisualsRef.current) {
        gsap.fromTo(
          subVisualsRef.current.children,
          { clipPath: "inset(0 0 100% 0 round 1.25rem)", opacity: 0.2 },
          {
            clipPath: "inset(0 0 0% 0 round 1.25rem)",
            opacity: 1,
            stagger: 0.15,
            duration: 1.0,
            ease: "power3.inOut",
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
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white text-black scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Section Header ────────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 lg:mb-16 gap-4 sm:gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
              Behind The Scenes
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight leading-none">
              Behind The Lens
            </h2>
            <div aria-hidden="true" className="mt-3.5 w-12 h-1 rounded-full bg-brand-green" />
            <h3 className="mt-3 text-base sm:text-xl font-bold text-brand-green">
              Setiap foto punya cerita di balik prosesnya.
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-500 font-medium leading-relaxed">
              Mulai dari penataan pencahayaan presisi, pengarahan pose yang santai dan natural, hingga kurasi serta color grading akhir — kami mendedikasikan setiap langkah untuk menghidupkan cerita Anda.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Button
              href="/tentang"
              variant="primary"
              size="sm"
            >
              <span>See More</span>
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Button>
          </div>
        </div>

        {/* ─── Visual Grid: 1 Visual Utama Kuat + 2 Visual Pendukung ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-stretch">
          
          {/* 1. VISUAL UTAMA BESAR (7 Kolom di Desktop) */}
          <div ref={mainVisualRef} className="lg:col-span-7 flex flex-col">
            <div className="group relative h-full flex flex-col justify-between p-5 sm:p-7 md:p-9 rounded-3xl overflow-hidden bg-brand-dark text-white border border-white/10 transition-all duration-300 hover:border-brand-green/40">
              
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
              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-black/40 ring-1 ring-white/10 mb-5 sm:mb-7">
                <div className="absolute inset-0 bg-brand-dark flex flex-col items-center justify-center p-6 sm:p-8 text-center select-none">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/5 border border-white/15 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:border-brand-green/50 transition-all duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white/50 group-hover:text-brand-green transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] mb-1">
                    On-Site & Studio Session
                  </span>
                  <h4 className="text-white text-base sm:text-xl font-black tracking-wide">
                    Directing & Creating The Moment
                  </h4>
                </div>

                {/* Badge Top Left */}
                <span className="absolute top-3 sm:top-3.5 left-3 sm:left-3.5 px-2.5 sm:px-3 py-1 rounded-full bg-brand-green text-white text-[9px] sm:text-[10px] font-bold tracking-wider uppercase">
                  Main Focus
                </span>
              </div>

              {/* Text Information */}
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-green">
                  Pendekatan Personal
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight mt-1 text-white">
                  Menciptakan Suasana yang Nyaman & Alami
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm lg:text-base text-white/70 leading-relaxed font-medium">
                  Kenyamanan Anda di depan kamera adalah prioritas utama. Melalui komunikasi yang hangat dan arahan gaya yang santai, kami membantu setiap ekspresi mengalir secara tulus dan tanpa rasa canggung.
                </p>
              </div>

              {/* Bottom Action */}
              <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <Button
                  href="/tentang"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  <span>See More</span>
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Button>

                <span className="text-xs font-medium text-white/40 text-center sm:text-right">
                  {brand.name} Studio
                </span>
              </div>

            </div>
          </div>

          {/* 2. VISUAL PENDUKUNG (5 Kolom di Desktop — 2 Kartu) */}
          <div ref={subVisualsRef} className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-6 justify-between">
            
            {/* Visual Pendukung 1: Lighting & Setup */}
            <div className="group flex-1 p-4 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-brand-green/30 transition-all duration-300 flex flex-col justify-between">
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-brand-dark ring-1 ring-black/5 mb-3 sm:mb-5">
                  <div className="absolute inset-0 bg-brand-dark flex flex-col items-center justify-center p-3 sm:p-4 text-center select-none">
                    <span className="text-brand-green font-bold text-base sm:text-lg leading-none">
                      01
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-white/50 font-bold uppercase tracking-wider mt-1">
                      Setup & Precision
                    </span>
                  </div>
                </div>

                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-brand-green">
                  Tahap 01
                </span>
                <h4 className="text-base sm:text-lg font-bold text-brand-dark tracking-tight mt-0.5 sm:mt-1">
                  Lighting & Atmosphere Setup
                </h4>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                  Pengaturan tata cahaya presisi sesuai mood sesi — mulai dari kehangatan cahaya natural hingga studio soft lighting berkualitas tinggi.
                </p>
              </div>

              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-brand-dark group-hover:text-brand-green transition-colors">
                <span>Pelajari Proses</span>
                <span aria-hidden="true">→</span>
              </div>
            </div>

            {/* Visual Pendukung 2: Post-Processing & Grading */}
            <div className="group flex-1 p-4 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-brand-green/30 transition-all duration-300 flex flex-col justify-between">
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-brand-dark ring-1 ring-black/5 mb-3 sm:mb-5">
                  <div className="absolute inset-0 bg-brand-dark flex flex-col items-center justify-center p-3 sm:p-4 text-center select-none">
                    <span className="text-brand-green font-bold text-base sm:text-lg leading-none">
                      02
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-white/50 font-bold uppercase tracking-wider mt-1">
                      Curation & Grading
                    </span>
                  </div>
                </div>

                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-brand-green">
                  Tahap 02
                </span>
                <h4 className="text-base sm:text-lg font-bold text-brand-dark tracking-tight mt-0.5 sm:mt-1">
                  Post-Processing & Color Grading
                </h4>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                  Sentuhan akhir kurasi teliti dan color grading sinematik untuk mempertahankan warna kulit natural serta keindahan setiap detail busana.
                </p>
              </div>

              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-brand-dark group-hover:text-brand-green transition-colors">
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
