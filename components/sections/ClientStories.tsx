"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

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
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth : 300;
    const gap = 16;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    if (newIndex !== activeIndex) {
      setActiveIndex(Math.min(Math.max(newIndex, 0), clientStories.length - 1));
    }
  };

  const scrollToIndex = (index: number) => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveIndex(index);
    }
  };

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
      className="pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16 bg-white text-black scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Section Header ────────────────────────────────────────── */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16">
          <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
            Testimonials
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight leading-none">
            Client Stories
          </h2>
          <div aria-hidden="true" className="mx-auto mt-3.5 w-12 h-1 rounded-full bg-brand-green" />
          <p className="mt-3 text-sm sm:text-base text-gray-500 font-medium leading-relaxed">
            The moments we capture become stories worth remembering.
          </p>
        </div>

        {/* ─── 3 Clean & Elegant Testimonial Cards (Swipe di Mobile, Grid di Desktop) ──── */}
        <div
          ref={cardsRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 pb-3 md:pb-0 items-stretch"
        >
          {clientStories.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between w-[85vw] max-w-[340px] md:max-w-none md:w-auto flex-shrink-0 snap-center p-5 sm:p-7 md:p-8 lg:p-9 rounded-2xl sm:rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-brand-green/30 transition-all duration-300"
            >
              <div>
                {/* Service Tag + Rating Stars */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-brand-green/10 text-brand-dark border border-brand-green/20">
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
                  className="text-3xl sm:text-5xl font-serif text-brand-green/20 leading-none block select-none -mb-2 sm:-mb-3 group-hover:text-brand-green/40 transition-colors"
                  aria-hidden="true"
                >
                  “
                </span>

                {/* Quote Text */}
                <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed font-medium italic">
                  {item.quote}
                </p>
              </div>

              {/* Client Profile Footer */}
              <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200/70 flex items-center gap-3">
                {/* Avatar Initial Slot */}
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-xs flex-shrink-0 ring-2 ring-brand-green/20 group-hover:bg-brand-green transition-colors">
                  {item.initials}
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-brand-dark tracking-wide">
                    {item.clientName}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-400 font-medium">
                    {item.roleOrEvent}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Indicators & Hints */}
        <div className="flex md:hidden flex-col items-center gap-2 mt-4">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Navigasi testimoni">
            {clientStories.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? "w-6 bg-brand-green"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Lihat cerita klien ${i + 1}`}
                aria-current={activeIndex === i ? "true" : undefined}
              />
            ))}
          </div>
          <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
            <span>Geser untuk melihat testimoni lainnya</span>
            <span aria-hidden="true">→</span>
          </span>
        </div>

      </div>
    </section>
  );
}
