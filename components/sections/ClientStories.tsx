"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Data Struktur Testimonial Placeholder
 * Sesuai instruksi: Struktur disiapkan agar mudah diganti dengan ulasan asli klien nanti.
 */
export type ClientStoryItem = {
  id: string;
  service: string;
  quote: string;
  clientName: string;
  roleOrEvent: string;
  initials: string;
};

const clientStories: ClientStoryItem[] = [
  {
    id: "story-1",
    service: "Wedding Documentation",
    quote:
      "Sesi foto pernikahan terasa sangat santai dan menyenangkan. Arahan fotografer sangat natural, sehingga setiap momen sakral dan ekspresi tulus tertangkap dengan sangat indah.",
    clientName: "Client Story",
    roleOrEvent: "Wedding Session",
    initials: "WS",
  },
  {
    id: "story-2",
    service: "Outdoor Graduation",
    quote:
      "Hasil foto wisuda bersama sahabat dan keluarga luar biasa tajam dan estetik. Tim sangat responsif dan mengarahkan gaya dengan ramah di berbagai spot kampus.",
    clientName: "Client Story",
    roleOrEvent: "Graduation Day",
    initials: "GD",
  },
  {
    id: "story-3",
    service: "Photobooth Event",
    quote:
      "Para tamu undangan sangat antusias dengan photobooth Tegoer Sapa. Cetakan fotonya super cepat, warnanya jernih, dan propertinya bikin suasana pesta semakin hidup.",
    clientName: "Client Story",
    roleOrEvent: "Corporate & Birthday Event",
    initials: "PB",
  },
];

export default function ClientStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // 2. Animasi Cards (stagger fade up)
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="client-stories"
      className="py-24 bg-white text-black scroll-mt-20 overflow-hidden border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Section Header ────────────────────────────────────────── */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
            Testimonials
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black text-brand-dark tracking-tight leading-none">
            Client Stories
          </h2>
          <div aria-hidden="true" className="mx-auto mt-4 w-12 h-1 rounded-full bg-brand-green" />
          <p className="mt-4 text-base sm:text-lg text-gray-500 font-medium leading-relaxed">
            The moments we capture become stories worth remembering.
          </p>
        </div>

        {/* ─── 3 Clean & Elegant Testimonial Cards ──────────────────── */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {clientStories.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between p-8 sm:p-9 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-brand-green/30 transition-all duration-300"
            >
              <div>
                {/* Service Tag + Rating Stars */}
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-green/10 text-brand-dark border border-brand-green/20">
                    {item.service}
                  </span>

                  <div className="flex items-center gap-1 text-brand-green text-xs" aria-label="5 dari 5 bintang">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>

                {/* Decorative Quotation Mark */}
                <span
                  className="text-4xl sm:text-5xl font-serif text-brand-green/20 leading-none block select-none -mb-3 group-hover:text-brand-green/40 transition-colors"
                  aria-hidden="true"
                >
                  “
                </span>

                {/* Quote Text */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium italic">
                  {item.quote}
                </p>
              </div>

              {/* Client Profile Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200/70 flex items-center gap-3.5">
                {/* Avatar Initial Slot */}
                <div className="w-11 h-11 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-xs flex-shrink-0 ring-2 ring-brand-green/20 group-hover:bg-brand-green transition-colors">
                  {item.initials}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-brand-dark tracking-wide">
                    {item.clientName}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium">
                    {item.roleOrEvent}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
