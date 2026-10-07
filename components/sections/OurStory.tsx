"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import { brand } from "@/lib/content";

/**
 * Section Our Story di Homepage
 * Memperkenalkan Tegoer Sapa secara singkat, personal, dan storytelling.
 * Dilengkapi efek scroll GSAP dinamis: rotating circular stamp, parallax scroll scrub,
 * line reveals, dan camera HUD aesthetic.
 */
export default function OurStory() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const dividerLineRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLSpanElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // 1. Entrance animation kolom teks kiri (stagger fade & slide up)
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Expand green divider bar (mekar ke kanan)
      if (dividerLineRef.current) {
        gsap.fromTo(
          dividerLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Highlight line under "Cerita Kami"
      if (accentLineRef.current) {
        gsap.fromTo(
          accentLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.7,
            delay: 0.25,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 4. Parallax scroll scrub pada kolom visual kartu kanan
      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current.children,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: visualRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );

        // Smooth vertical parallax scrub saat user scroll
        gsap.to(visualRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // 5. Stempel Lingkaran Berputar Dinamis (Rotating Stamp Badge on Scroll)
      if (badgeRef.current) {
        gsap.to(badgeRef.current, {
          rotation: 360,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="our-story"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-[#fbfcfb] text-black scroll-mt-20 overflow-hidden border-b border-gray-100"
    >
      {/* Background Ambient Contours (Halus & Elegan Khas Brand) */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[35rem] h-[35rem] rounded-full bg-brand-green/[0.03] blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[30rem] h-[30rem] rounded-full bg-brand-dark/[0.025] blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          
          {/* ─── KOLOM KIRI: Storytelling Narrative ─────────────────── */}
          <div ref={textRef} className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 mb-3.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
              <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
                Our Story
              </span>
            </div>

            {/* Headline dengan Hand-drawn Marker Accent */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight leading-[1.08]">
              Lebih Dekat Dengan <br className="hidden sm:inline" />
              <span className="relative inline-block text-brand-dark">
                Cerita Kami
                <span
                  ref={accentLineRef}
                  aria-hidden="true"
                  className="absolute left-0 bottom-1 w-full h-3 bg-brand-green/20 -z-10 rounded-sm origin-left"
                />
              </span>
            </h2>

            {/* Divider line mekar */}
            <div
              ref={dividerLineRef}
              aria-hidden="true"
              className="mt-4 w-16 h-1 rounded-full bg-brand-green mb-5 sm:mb-6 mx-auto lg:mx-0 origin-left"
            />

            {/* Lead paragraph */}
            <p className="text-gray-800 text-base sm:text-lg lg:text-xl leading-relaxed font-bold mb-3 sm:mb-4">
              Tegoer Sapa adalah studio fotografi dan penyedia pengalaman photobooth modern yang lahir dari rasa cinta terhadap momen-momen tulus dalam hidup.
            </p>

            {/* Body paragraph */}
            <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed font-medium mb-4 sm:mb-5">
              Dari sakralnya ikatan janji pernikahan, kebanggaan pencapaian wisuda, hingga kebersamaan hangat keluarga dan tawa spontan di booth acara — kami hadir bukan sekadar memotret, melainkan mendokumentasikan rasa dan emosi yang melatarbelakanginya.
            </p>

            {/* Pull Quote Box dengan Green Left Accent */}
            <div
              ref={quoteRef}
              className="w-full my-1.5 p-4 sm:p-5 rounded-2xl bg-white border-l-4 border-brand-green shadow-xs border border-gray-100/90 mb-6 text-left"
            >
              <div className="flex items-start gap-3">
                <span className="text-brand-green text-2xl font-black leading-none select-none">“</span>
                <p className="text-xs sm:text-sm text-gray-700 font-semibold leading-relaxed">
                  Bagi kami, <span className="text-brand-dark font-extrabold">&ldquo;{brand.tagline}&rdquo;</span> adalah komitmen mutlak. Kami berfokus pada kualitas visual berkelas, tata cahaya yang presisi, serta suasana sesi foto yang santai dan ramah bagi setiap klien.
                </p>
              </div>
            </div>

            {/* 3 Metric Milestones */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full mb-7 text-center sm:text-left">
              <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-gray-200/70 shadow-2xs">
                <span className="block text-lg sm:text-2xl font-black text-brand-dark tracking-tight">1.500+</span>
                <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider">Momen Diabadikan</span>
              </div>
              <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-gray-200/70 shadow-2xs">
                <span className="block text-lg sm:text-2xl font-black text-brand-dark tracking-tight">100%</span>
                <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider">Kepuasan Klien</span>
              </div>
              <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-gray-200/70 shadow-2xs">
                <span className="block text-lg sm:text-2xl font-black text-brand-dark tracking-tight">Banjarbaru</span>
                <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider">Studio & Armada</span>
              </div>
            </div>

            <Button
              href="/tentang"
              variant="primary"
              size="md"
              className="mx-auto lg:mx-0 shadow-md"
            >
              <span>Selengkapnya Tentang Kami</span>
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Button>
          </div>

          {/* ─── KOLOM KANAN: Visual Cards & Camera HUD ──────────────── */}
          <div className="relative lg:col-span-5">
            
            {/* Rotating Circular Artisan Stamp Badge on Scroll (Khas Studio Kreatif) */}
            <div
              ref={badgeRef}
              aria-hidden="true"
              className="hidden sm:flex absolute -top-8 -right-4 md:-top-10 md:-right-6 pointer-events-none select-none z-20 items-center justify-center w-28 h-28 lg:w-32 lg:h-32"
            >
              <svg
                viewBox="0 0 120 120"
                className="w-full h-full"
              >
                <defs>
                  <path
                    id="ourStoryStampCircle"
                    d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                  />
                </defs>
                <text className="text-[9.5px] font-black uppercase tracking-[0.23em] fill-brand-green">
                  <textPath href="#ourStoryStampCircle" startOffset="0%">
                    TEGOER SAPA • RESPECT THE MOMENT •
                  </textPath>
                </text>
              </svg>
              {/* Center Emblem Pill */}
              <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-brand-dark border-2 border-brand-green text-white flex flex-col items-center justify-center shadow-lg">
                <span className="text-[10px] font-black tracking-widest text-brand-green">TS</span>
                <span className="text-[7px] font-bold text-white/70 tracking-tighter">EST.23</span>
              </div>
            </div>

            <div ref={visualRef} className="flex flex-col gap-4 sm:gap-5 will-change-transform">
              
              {/* Visi Card dengan Camera HUD Viewfinder Corner Brackets */}
              <div className="group relative p-6 sm:p-8 md:p-9 rounded-3xl bg-brand-dark text-white overflow-hidden border border-white/10 shadow-xl transition-all duration-300 hover:border-brand-green/40">
                {/* Giant Typography Watermark in Background */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-6 -right-8 text-[5rem] sm:text-[6.5rem] font-black tracking-tighter text-white/[0.04] leading-none pointer-events-none select-none whitespace-nowrap"
                >
                  EVERY SECOND
                </div>

                {/* Viewfinder corner brackets (Camera HUD aesthetic) */}
                <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-brand-green/70 rounded-tl-sm pointer-events-none" />
                <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-brand-green/70 rounded-tr-sm pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-brand-green/70 rounded-bl-sm pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-brand-green/70 rounded-br-sm pointer-events-none" />

                {/* Subtle ambient light */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-brand-green/20 blur-2xl pointer-events-none"
                />

                {/* Header Row */}
                <div className="relative z-10 flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                    <span className="text-brand-green text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                      Visi & Nilai Kami
                    </span>
                  </div>
                  <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/15">
                    PHILOSOPHY
                  </span>
                </div>

                {/* Headline */}
                <h3 className="relative z-10 text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug">
                  Menghargai Setiap Detik Terbaik Anda
                </h3>

                {/* Body */}
                <p className="relative z-10 mt-3 text-white/75 text-xs sm:text-sm leading-relaxed font-medium">
                  Setiap senyuman, tatapan haru, dan kehangatan kebersamaan pantas dikenang dengan visual yang abadi dan berkarakter. Kami hadir untuk memastikan tidak ada emosi tulus yang berlalu tanpa jejak.
                </p>

                {/* Technical Camera Location Bar */}
                <div className="relative z-10 mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5 text-brand-green font-bold">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{brand.name} • Banjarbaru, Kalsel</span>
                  </div>
                  <span className="text-white/40 font-mono text-[10px]">
                    EXP: 1/250s • 35MM
                  </span>
                </div>
              </div>

              {/* 2 Core Highlights Cards (2 Kolom di Tablet & Desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                
                {/* Card 1 */}
                <div className="group relative p-5 rounded-2xl bg-white border border-gray-200/90 hover:border-brand-green/60 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center font-bold transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-gray-400 group-hover:text-brand-green transition-colors">
                        01 / EXP
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-brand-dark tracking-tight">
                      Pengalaman Bersahabat
                    </h4>
                    <p className="mt-1.5 text-xs text-gray-500 font-medium leading-relaxed">
                      Suasana pemotretan santai, menyenangkan, dan bebas canggung agar senyum Anda tampil natural.
                    </p>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-brand-green">
                    <span>Nyaman & Akrab</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group relative p-5 rounded-2xl bg-white border border-gray-200/90 hover:border-brand-green/60 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center font-bold transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-gray-400 group-hover:text-brand-green transition-colors">
                        02 / PRO
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-brand-dark tracking-tight">
                      Kualitas Terpilih
                    </h4>
                    <p className="mt-1.5 text-xs text-gray-500 font-medium leading-relaxed">
                      Standar visual industri, tata cahaya presisi, dan color grading sinematik yang abadi.
                    </p>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-brand-green">
                    <span>Standar Studio Pro</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
