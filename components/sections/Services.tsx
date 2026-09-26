"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { services } from "@/lib/content";

/**
 * Section Layanan Utama (Homepage)
 * Animasi ditingkatkan:
 *   - SplitText word-by-word reveal pada heading
 *   - Clip-path inset wipe dari bawah untuk setiap card
 *   - GSAP quickTo hover lift effect per card
 */
export default function Services() {
  const sectionRef  = useRef<HTMLElement>(null);
  const labelRef    = useRef<HTMLSpanElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // ── 1. Label + divider fade up ──────────────────────────────────────
      gsap.fromTo(
        [labelRef.current, dividerRef.current, subtitleRef.current],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── 2. SplitText word-by-word reveal pada heading ───────────────────
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0, y: 30, skewY: 3 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            stagger: 0.07,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // ── 3. Card reveal — clip-path wipe dari bawah ───────────────────────
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          {
            clipPath: "inset(100% 0 0 0 round 16px)",
            opacity: 0,
          },
          {
            clipPath: "inset(0% 0 0 0 round 16px)",
            opacity: 1,
            stagger: 0.08,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        // ── 4. GSAP hover lift per card ─────────────────────────────────
        const cards = cardsRef.current.querySelectorAll<HTMLAnchorElement>("a");
        cards.forEach((card) => {
          const yTo    = gsap.quickTo(card, "y",     { duration: 0.35, ease: "power2.out" });
          const scaleTo = gsap.quickTo(card, "scale", { duration: 0.35, ease: "power2.out" });

          card.addEventListener("mouseenter", () => {
            yTo(-8);
            scaleTo(1.01);
          });
          card.addEventListener("mouseleave", () => {
            yTo(0);
            scaleTo(1);
          });
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="layanan"
      className="py-24 bg-white text-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span ref={labelRef} className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
            Layanan Kami
          </span>
          <h2
            ref={headingRef}
            className="mt-3 text-4xl sm:text-5xl font-black text-brand-dark tracking-tight"
          >
            Abadikan Setiap Momen Berharga
          </h2>
          <div ref={dividerRef} aria-hidden="true" className="mx-auto mt-4 w-12 h-1 rounded-full bg-brand-green" />
          <p ref={subtitleRef} className="mt-4 text-base text-gray-500 font-medium">
            Tegoer Sapa menghadirkan opsi fotografi modern yang fleksibel dan berkualitas premium untuk melengkapi kebahagiaan acara Anda.
          </p>
        </div>

        {/* Services Cards Grid — 4 kolom di desktop, 2 di tablet, 1 di mobile */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.id}
              href={service.href}
              className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-brand-green/20 transition-colors duration-300 hover:shadow-xl hover:shadow-brand-green/5"
            >
              <div>
                <span className="font-black text-3xl sm:text-4xl text-brand-green/20 group-hover:text-brand-green/40 transition-colors duration-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg sm:text-xl font-bold text-brand-dark tracking-wide leading-snug">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm text-gray-500 leading-relaxed font-medium">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100/80 flex items-center justify-between text-sm font-bold text-brand-green group-hover:text-brand-dark transition-colors duration-300">
                <span>Selengkapnya</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
