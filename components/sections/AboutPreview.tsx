"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { brand } from "@/lib/content";

/**
 * Section Tentang Kami singkat di Homepage
 * Berfungsi sebagai hub untuk mengarahkan pengguna ke halaman detail /tentang.
 * Menggunakan GSAP ScrollTrigger untuk entrance animation.
 */
export default function AboutPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) return;

      // Slide-in text dari kiri
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.15,
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

      // Slide-in visual / statistics card dari kanan
      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
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
      id="tentang-preview"
      className="py-24 bg-white text-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Kolom Teks (Kiri) */}
          <div ref={textRef} className="lg:col-span-7 flex flex-col items-start">
            <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
              Tentang Tegoer Sapa
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black text-brand-dark tracking-tight leading-[1.1]">
              Lebih Dekat Dengan Cerita Kami
            </h2>
            <div aria-hidden="true" className="mt-4 w-12 h-1 rounded-full bg-brand-green mb-6" />
            <p className="text-gray-600 text-base leading-relaxed font-medium mb-6">
              {brand.about} {/* copy diperluas dari versi asli */}
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Kami percaya setiap detik sangat berharga. Melalui lensa kamera, properti unik, dan tim yang berdedikasi, kami berkomitmen untuk mendokumentasikan setiap senyuman, tawa, dan kebersamaan di setiap perayaan Anda secara profesional dan otentik.
            </p>
            <Link
              href="/tentang"
              className="group inline-flex items-center gap-2.5 bg-brand-dark text-white hover:bg-brand-green font-bold tracking-wide text-sm px-6 py-3.5 rounded-full transition-all duration-300"
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

          {/* Kolom Visual / Ringkasan Visi (Kanan) */}
          <div ref={visualRef} className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-8 rounded-2xl bg-brand-dark text-white relative overflow-hidden">
              <span className="text-brand-green text-[10px] font-bold tracking-[0.2em] uppercase">
                Visi Kami
              </span>
              <h3 className="mt-3 text-2xl font-black tracking-wide leading-tight">
                Menghargai Setiap Momen Terbaik
              </h3>
              <p className="mt-4 text-white/70 text-sm leading-relaxed font-medium">
                "Respect The Moment Every Second Matters" bukan sekadar tagline. Ini adalah komitmen kami untuk memastikan tidak ada detik berharga yang terlewatkan tanpa diabadikan secara indah.
              </p>
              
              {/* Subtle background decoration */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-brand-green/10" />
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50">
                <span className="text-brand-dark text-3xl font-black leading-none">100%</span>
                <p className="mt-2 text-xs text-gray-500 font-bold tracking-wide uppercase">
                  Kepuasan Klien
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50">
                <span className="text-brand-dark text-3xl font-black leading-none">Modern</span>
                <p className="mt-2 text-xs text-gray-500 font-bold tracking-wide uppercase">
                  Teknologi & Studio
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
