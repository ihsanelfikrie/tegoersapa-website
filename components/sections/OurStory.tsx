"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { brand } from "@/lib/content";

/**
 * Section Our Story di Homepage
 * Memperkenalkan Tegoer Sapa secara singkat, personal, dan storytelling.
 * Mengarahkan pengunjung ke halaman detail /tentang.
 */
export default function OurStory() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // 1. Animasi Kolom Teks (Slide-in & fade dari kiri)
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, x: -28 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Animasi Kolom Visual (Slide-in & fade dari kanan)
      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current.children,
          { opacity: 0, x: 28 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: visualRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="our-story"
      className="py-24 bg-gray-50 text-black scroll-mt-20 overflow-hidden border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ─── KOLOM KIRI: Storytelling Narrative ─────────────────── */}
          <div ref={textRef} className="lg:col-span-7 flex flex-col items-start">
            <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
              Our Story
            </span>

            <h2 className="mt-3 text-4xl sm:text-5xl font-black text-brand-dark tracking-tight leading-[1.08]">
              Lebih Dekat Dengan Cerita Kami
            </h2>

            <div aria-hidden="true" className="mt-4 w-12 h-1 rounded-full bg-brand-green mb-6" />

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-semibold mb-4">
              Tegoer Sapa adalah studio fotografi dan penyedia pengalaman photobooth modern yang lahir dari rasa cinta terhadap momen-momen tulus dalam hidup.
            </p>

            <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-medium mb-4">
              Dari sakralnya ikatan janji pernikahan, kebanggaan pencapaian wisuda, hingga kebersamaan hangat keluarga dan tawa spontan di booth acara — kami hadir bukan sekadar memotret, melainkan mendokumentasikan rasa dan emosi yang melatarbelakanginya.
            </p>

            <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-medium mb-8">
              Bagi kami, <span className="text-brand-dark font-bold">"{brand.tagline}"</span> adalah komitmen mutlak. Kami berfokus pada kualitas visual berkelas, tata cahaya yang presisi, serta suasana sesi foto yang santai dan ramah bagi setiap klien.
            </p>

            <Link
              href="/tentang"
              className="group inline-flex items-center gap-2.5 bg-brand-dark hover:bg-brand-green text-white font-bold tracking-wide text-xs sm:text-sm px-7 py-3.5 rounded-full transition-all duration-300 shadow-xl shadow-brand-dark/10 hover:shadow-brand-green/25 hover:-translate-y-0.5"
            >
              <span>Selengkapnya Tentang Kami</span>
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

          {/* ─── KOLOM KANAN: Visual & Brand Values ─────────────────── */}
          <div ref={visualRef} className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Visi Card */}
            <div className="p-8 sm:p-9 rounded-3xl bg-brand-dark text-white relative overflow-hidden shadow-2xl border border-white/10">
              {/* Subtle ambient glow */}
              <div
                aria-hidden="true"
                className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-brand-green/20 blur-2xl pointer-events-none"
              />

              <span className="text-brand-green text-[10px] font-bold tracking-[0.2em] uppercase">
                Visi & Nilai Kami
              </span>

              <h3 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                Menghargai Setiap Detik Terbaik Anda
              </h3>

              <p className="mt-4 text-white/70 text-xs sm:text-sm leading-relaxed font-medium">
                Setiap senyuman, tatapan haru, dan kehangatan kebersamaan pantas dikenang dengan visual yang abadi dan berkarakter.
              </p>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-brand-green font-bold">
                <span>{brand.name}</span>
                <span className="text-white/40 font-medium">Medan, Indonesia</span>
              </div>
            </div>

            {/* 2 Core Highlights Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="w-8 h-8 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center text-sm font-bold mb-3">
                    ✦
                  </span>
                  <h4 className="text-sm font-bold text-brand-dark tracking-wide">
                    Pengalaman Bersahabat
                  </h4>
                  <p className="mt-1.5 text-xs text-gray-500 font-medium leading-relaxed">
                    Suasana pemotretan santai, menyenangkan, dan bebas canggung.
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="w-8 h-8 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center text-sm font-bold mb-3">
                    ★
                  </span>
                  <h4 className="text-sm font-bold text-brand-dark tracking-wide">
                    Kualitas Terpilih
                  </h4>
                  <p className="mt-1.5 text-xs text-gray-500 font-medium leading-relaxed">
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
