"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import { brand } from "@/lib/content";

/**
 * Section Our Story di Homepage
 * Sederhana, elegan, dan berkarakter — dengan efek parallax scroll GSAP yang halus.
 */
export default function OurStory() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const dividerLineRef = useRef<HTMLDivElement>(null);
  const darkCardRef = useRef<HTMLDivElement>(null);
  const subCardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // 1. Entrance animation kolom teks kiri (stagger halus)
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Garis aksen hijau mekar secara horizontal
      if (dividerLineRef.current) {
        gsap.fromTo(
          dividerLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Entrance animation kartu visual kanan
      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.14,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: visualRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 4. Parallax Scroll Depth (Kolom kanan bergerak dengan kedalaman halus saat scroll)
      if (darkCardRef.current && subCardsRef.current) {
        gsap.to(darkCardRef.current, {
          y: -16,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.to(subCardsRef.current, {
          y: -32,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
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
      className="py-16 sm:py-20 md:py-24 bg-[#fbfcfb] text-black scroll-mt-20 overflow-hidden border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ─── KOLOM KIRI: Storytelling Narrative ─────────────────── */}
          <div ref={textRef} className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
              Our Story
            </span>

            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight leading-[1.1]">
              Lebih Dekat Dengan Cerita Kami
            </h2>

            <div
              ref={dividerLineRef}
              aria-hidden="true"
              className="mt-3.5 w-12 h-1 rounded-full bg-brand-green mb-5 sm:mb-6 mx-auto lg:mx-0 origin-left"
            />

            <p className="text-gray-800 text-base sm:text-lg leading-relaxed font-semibold mb-3 sm:mb-4">
              Tegoer Sapa adalah studio fotografi dan penyedia pengalaman photobooth modern yang lahir dari rasa cinta terhadap momen-momen tulus dalam hidup.
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium mb-3 sm:mb-4">
              Dari sakralnya ikatan janji pernikahan, kebanggaan pencapaian wisuda, hingga kebersamaan hangat keluarga dan tawa spontan di booth acara — kami hadir bukan sekadar memotret, melainkan mendokumentasikan rasa dan emosi yang melatarbelakanginya.
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium mb-7 sm:mb-9">
              Bagi kami, <span className="text-brand-dark font-extrabold">&ldquo;{brand.tagline}&rdquo;</span> adalah komitmen mutlak. Kami berfokus pada kualitas visual berkelas, tata cahaya yang presisi, serta suasana sesi foto yang santai dan ramah bagi setiap klien.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mx-auto lg:mx-0 w-full sm:w-auto">
              <Button
                href="/tentang"
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
              >
                <span>Selengkapnya Tentang Kami</span>
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
              <Button
                href="/links"
                variant="stroke"
                size="md"
                className="w-full sm:w-auto text-xs"
              >
                <span>🔗 Hub Tautan Photobooth</span>
              </Button>
            </div>
          </div>

          {/* ─── KOLOM KANAN: Visual & Brand Values ─────────────────── */}
          <div ref={visualRef} className="lg:col-span-5 flex flex-col gap-4 sm:gap-5">
            
            {/* Visi Card */}
            <div
              ref={darkCardRef}
              className="p-6 sm:p-8 md:p-9 rounded-3xl bg-brand-dark text-white relative overflow-hidden border border-white/10 shadow-lg will-change-transform"
            >
              <span className="text-brand-green text-[10px] font-bold tracking-[0.2em] uppercase">
                Visi & Nilai Kami
              </span>

              <h3 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug">
                Menghargai Setiap Detik Terbaik Anda
              </h3>

              <p className="mt-3 text-white/75 text-xs sm:text-sm leading-relaxed font-medium">
                Setiap senyuman, tatapan haru, dan kehangatan kebersamaan pantas dikenang dengan visual yang abadi dan berkarakter.
              </p>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-brand-green font-bold">
                <span>{brand.name}</span>
                <span className="text-white/40 font-medium">Banjarbaru, Indonesia</span>
              </div>
            </div>

            {/* 2 Core Highlights Cards */}
            <div ref={subCardsRef} className="grid grid-cols-2 gap-3 sm:gap-4 will-change-transform">
              
              <div className="p-4 sm:p-6 rounded-2xl bg-white border border-gray-200/80 shadow-2xs hover:shadow-md hover:border-brand-green/40 transition-all duration-200 flex flex-col justify-between">
                <div>
                  <span className="w-8 h-8 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center text-sm font-bold mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-brand-dark tracking-wide">
                    Pengalaman Bersahabat
                  </h4>
                  <p className="mt-1 text-[11px] sm:text-xs text-gray-500 font-medium leading-relaxed">
                    Suasana pemotretan santai, menyenangkan, dan bebas canggung.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl bg-white border border-gray-200/80 shadow-2xs hover:shadow-md hover:border-brand-green/40 transition-all duration-200 flex flex-col justify-between">
                <div>
                  <span className="w-8 h-8 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center text-sm font-bold mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-brand-dark tracking-wide">
                    Kualitas Terpilih
                  </h4>
                  <p className="mt-1 text-[11px] sm:text-xs text-gray-500 font-medium leading-relaxed">
                    Standar visual industri, tata cahaya presisi, dan grading sinematik.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
