"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { heroHome, heroPhotos, type HeroPhoto } from "@/lib/content";


// ─── Sub-komponen: satu slot foto dalam mosaic ───────────────────────────────
function PhotoSlot({
  photo,
  className = "",
}: {
  photo: HeroPhoto;
  className?: string;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl group",
        "ring-1 ring-white/10",
        className,
      ].join(" ")}
      aria-label={photo.alt}
    >
      {photo.placeholder ? (
        <div
          className="absolute inset-0 bg-brand-dark
                      flex flex-col items-center justify-center gap-3 select-none"
          aria-hidden="true"
        >
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              />
            </svg>
          </div>
          <span className="text-white/20 text-[10px] font-semibold tracking-[0.15em] uppercase text-center px-3">
            Foto Segera Hadir
          </span>
        </div>
      ) : (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 35vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority={photo.id === "hero-photo-1"}
        />
      )}

      <div
        className="absolute inset-0 bg-black/30 pointer-events-none"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg
                   bg-brand-green/90
                   text-white text-[10px] font-bold tracking-[0.1em] uppercase"
      >
        {photo.category}
      </span>
    </div>
  );
}

// ─── Komponen utama: Hero ────────────────────────────────────────────────────
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  // Teks refs
  const word1Ref    = useRef<HTMLSpanElement>(null);   // "TEGOER" inner span
  const word2Ref    = useRef<HTMLSpanElement>(null);   // "SAPA" inner span
  const dividerRef  = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  // Mosaic & decor refs
  const mosaicRef = useRef<HTMLDivElement>(null);
  const decorRef  = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        // Langsung tampilkan semua tanpa animasi
        gsap.set([dividerRef.current, taglineRef.current, decorRef.current], { opacity: 1, y: 0, scaleX: 1 });
        gsap.set([word1Ref.current, word2Ref.current], { y: 0, opacity: 1 });
        gsap.set(containerRef.current?.querySelectorAll(".hero-char") ?? [], { opacity: 1, y: 0, rotation: 0 });
        gsap.set(containerRef.current?.querySelectorAll(".text") ?? [], { opacity: 1, y: 0 });
        gsap.set(ctaRef.current?.children ?? [], { opacity: 1, y: 0 });
        const slots = mosaicRef.current?.querySelectorAll(".photo-slot");
        if (slots) gsap.set(Array.from(slots), { opacity: 1, x: 0, scale: 1 });
        return;
      }

      // ── Initial states ──────────────────────────────────────────────────
      gsap.set(decorRef.current, { opacity: 0 });
      gsap.set(dividerRef.current, { scaleX: 0, opacity: 0, transformOrigin: "left" });
      gsap.set(taglineRef.current, { opacity: 0, y: 24 });
      gsap.set(ctaRef.current?.children ?? [], { opacity: 0, y: 20 });

      const photoSlots = mosaicRef.current?.querySelectorAll(".photo-slot");
      if (photoSlots) gsap.set(photoSlots, { opacity: 0, x: 48, scale: 0.95 });

      // ── Cascade Reveal Text (SplitText) sesuai instruksi ────────────────
      gsap.registerPlugin(SplitText);
      const split = SplitText.create(".text", { type: "chars" });

      gsap.from(split.chars, {
        y: -80,
        rotation: -15,
        opacity: 0,
        stagger: { each: 0.04, from: "start" },
        duration: 0.5,
        ease: "back.out(1.4)",
      });

      // Cascade reveal juga untuk karakter judul utama "Tegoer Sapa"
      const heroChars = containerRef.current?.querySelectorAll(".hero-char");
      if (heroChars && heroChars.length > 0) {
        gsap.from(heroChars, {
          y: -80,
          rotation: -15,
          opacity: 0,
          stagger: { each: 0.04, from: "start" },
          duration: 0.5,
          ease: "back.out(1.4)",
          delay: 0.15,
        });
      }

      // ── Main timeline ───────────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });

      tl
        // Background gradient fade in
        .to(decorRef.current,  { opacity: 1, duration: 1.2, ease: "power1.out" }, 0)

        // Garis divider scale dari kiri
        .to(dividerRef.current, { scaleX: 1, opacity: 1, duration: 0.55 }, 0.6)

        // Tagline fade up
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.75)

        // CTA buttons stagger
        .to(ctaRef.current?.children ?? [], { opacity: 1, y: 0, stagger: 0.12, duration: 0.55 }, 0.95)

        // Foto mosaic — slide dari kanan dengan stagger
        .to(photoSlots ?? [], { opacity: 1, x: 0, scale: 1, stagger: 0.13, duration: 0.8, ease: "expo.out" }, 0.35);

      // ── Floating loop foto setelah entrance selesai ─────────────────────
      tl.call(() => {
        const slots = mosaicRef.current?.querySelectorAll(".photo-slot");
        if (!slots || slots.length === 0) return;
        gsap.to(Array.from(slots), {
          y: -12,
          stagger: { each: 0.5, from: "start" },
          duration: 2.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Buka overflow wrapper judul agar lompatan backflip tidak terpotong
        gsap.set(".hero-line-wrap", { overflow: "visible" });
      });

      // ── Animasi Backflip Teks Berulang Setiap 5 Detik ─────────────────
      const chars = containerRef.current?.querySelectorAll(".hero-char");
      if (chars && chars.length > 0) {
        const backflipTl = gsap.timeline({
          repeat: -1,
          repeatDelay: 5,
          delay: 2.2, // Mulai setelah animasi entrance selesai
        });

        // Efek backflip akrobatik berurutan satu per satu (wave)
        backflipTl
          .to(chars, {
            y: -24,
            rotateX: -360,
            scale: 1.14,
            stagger: 0.08,
            duration: 0.65,
            ease: "back.out(2)",
          })
          .to(
            chars,
            {
              y: 0,
              scale: 1,
              stagger: 0.08,
              duration: 0.35,
              ease: "power2.out",
            },
            "<0.22",
          )
          .set(chars, { rotateX: 0 }); // Reset sudut 360° ke 0° untuk siklus berikutnya
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-sky"
      aria-labelledby="hero-title"
    >
      {/* ═══════════════════════════════════════════════════════════════════
          DEKORASI BACKGROUND
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        ref={decorRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      >
        {/* Awan utama — berukuran besar di bagian atas */}
        <Image
          src="/brand/awan.svg"
          alt=""
          width={677}
          height={408}
          unoptimized
          className="cloud-flow cloud-flow-a absolute top-10 lg:top-14 left-0 w-[32rem] sm:w-[42rem] lg:w-[54rem] max-w-none"
        />
        {/* Awan kedua — berukuran besar di bagian bawah dengan offset waktu */}
        <Image
          src="/brand/awan.svg"
          alt=""
          width={677}
          height={408}
          unoptimized
          className="cloud-flow cloud-flow-b absolute bottom-6 lg:bottom-12 left-0 w-[26rem] sm:w-[34rem] lg:w-[44rem] max-w-none"
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          LAYOUT UTAMA: TEKS KIRI + MOSAIC KANAN
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ─── KOLOM KIRI: Teks ─────────────────────────────────────── */}
          <div className="flex flex-col items-start">

            {/* Cascade Reveal tag */}
            <h3 className="text font-black uppercase tracking-[0.25em] text-xs sm:text-sm text-brand-dark/75 mb-3 select-none">
              Cascade Reveal
            </h3>

            {/* Judul utama */}
            <h1
              id="hero-title"
              className="font-black leading-[1.05] tracking-normal text-[clamp(3.5rem,9vw,7rem)] mb-5 select-none"
            >
              {/* Baris 1: Tegoer */}
              <span className="hero-line-wrap block" style={{ padding: "0.15em 0.25em 0.2em", margin: "-0.15em -0.25em 0" }}>
                <span ref={word1Ref} className="hero-word">
                  {"Tegoer".split("").map((c, i) => (
                    <span key={i} className="hero-char">
                      {c}
                    </span>
                  ))}
                </span>
              </span>
              {/* Baris 2: Sapa */}
              <span className="hero-line-wrap block" style={{ padding: "0.15em 0.25em 0.2em", margin: "-0.15em -0.25em 0" }}>
                <span ref={word2Ref} className="hero-word hero-word-green">
                  {"Sapa".split("").map((c, i) => (
                    <span key={i} className="hero-char">
                      {c}
                    </span>
                  ))}
                </span>
              </span>
            </h1>

            {/* Garis divider */}
            <div
              ref={dividerRef}
              aria-hidden="true"
              className="w-16 h-1 rounded-full bg-brand-dark mb-5"
            />

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="text-brand-dark/70 font-medium tracking-[0.1em] uppercase
                         text-[clamp(0.7rem,1.5vw,0.875rem)] leading-relaxed mb-10 max-w-sm"
            >
              {heroHome.tagline}
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-3">
              <Link
                href={heroHome.cta.primary.href}
                id="hero-cta-gallery"
                className={[
                  "group inline-flex items-center gap-2.5",
                  "bg-brand-green hover:bg-brand-green/90 text-white",
                  "font-bold tracking-wide text-sm",
                  "px-7 py-3.5 rounded-full",
                  "transition-all duration-200",
                  "hover:-translate-y-0.5 active:translate-y-0",
                ].join(" ")}
              >
                {heroHome.cta.primary.label}
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href={heroHome.cta.secondary.href}
                id="hero-cta-pricelist"
                className={[
                  "inline-flex items-center gap-2",
                  "border border-brand-dark/25 hover:border-brand-dark",
                  "text-brand-dark",
                  "font-bold tracking-wide text-sm",
                  "px-7 py-3.5 rounded-full",
                  "transition-all duration-200 hover:bg-brand-dark/5",
                  "hover:-translate-y-0.5 active:translate-y-0",
                ].join(" ")}
              >
                {heroHome.cta.secondary.label}
              </Link>
            </div>
          </div>

          {/* ─── KOLOM KANAN: Mosaic foto ─────────────────────────────── */}
          <div
            ref={mosaicRef}
            className="hidden lg:grid relative"
            aria-label="Preview hasil foto Tegoer Sapa"
            style={{
              gridTemplateColumns: "3fr 2fr",
              gridTemplateRows: "240px 200px",
              gap: "12px",
            }}
          >
            {/* SLOT 0 — besar kiri, span 2 baris */}
            <div className="photo-slot row-span-2" style={{ gridColumn: "1", gridRow: "1 / 3" }}>
              <PhotoSlot photo={heroPhotos[0]} className="h-full w-full" />
            </div>

            {/* SLOT 1 — kecil kanan atas */}
            <div className="photo-slot" style={{ gridColumn: "2", gridRow: "1" }}>
              <PhotoSlot photo={heroPhotos[1]} className="h-full w-full" />
            </div>

            {/* SLOT 2 — kecil kanan bawah */}
            <div className="photo-slot" style={{ gridColumn: "2", gridRow: "2" }}>
              <PhotoSlot photo={heroPhotos[2]} className="h-full w-full" />
            </div>

            {/* Floating badge — rating */}
            <div
              aria-hidden="true"
              className="absolute -bottom-5 left-4 z-20
                         bg-brand-dark/90
                         border border-white/10 rounded-2xl px-4 py-3
                         flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-green/20 border border-brand-green/30
                              flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-brand-green" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </div>
              <div>
                <div className="text-white font-black text-sm leading-none">4.9 / 5</div>
                <div className="text-white/40 text-[10px] font-medium tracking-wide mt-0.5">Rating pelanggan</div>
              </div>
            </div>

            {/* Floating pill — open for booking */}
            <div
              aria-hidden="true"
              className="absolute -top-3 right-2 z-20
                         bg-brand-green rounded-full px-3 py-1.5
                         flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-white text-[10px] font-bold tracking-wide uppercase">
                Open for Booking
              </span>
            </div>
          </div>

          {/* ─── Mobile: 2 slot foto horizontal ──────────────────────── */}
          <div
            className="grid lg:hidden grid-cols-2 gap-3 mt-2"
            aria-label="Preview hasil foto Tegoer Sapa"
          >
            {heroPhotos.slice(0, 2).map((photo) => (
              <div key={photo.id} className="photo-slot h-44 rounded-2xl">
                <PhotoSlot photo={photo} className="h-full w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SCROLL INDICATOR
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-1.5 animate-bounce"
      >
        <span className="text-brand-dark/50 text-[10px] tracking-[0.25em] uppercase font-bold">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-brand-dark/30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-brand-dark/50 animate-[slideDown_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          0%  { transform: translateY(0);    opacity: 1; }
          80% { transform: translateY(10px); opacity: 0; }
          100%{ transform: translateY(0);    opacity: 0; }
        }
        @keyframes cloudFlow {
          from { transform: translate3d(-100%, 0, 0); }
          to   { transform: translate3d(100vw, 0, 0); }
        }
        .cloud-flow {
          animation: cloudFlow 75s linear infinite;
          will-change: transform;
        }
        .cloud-flow-a { animation-duration: 65s; animation-delay: -25s; }
        .cloud-flow-b { animation-duration: 85s; animation-delay: -65s; }
        @media (prefers-reduced-motion: reduce) {
          .cloud-flow { animation: none; transform: translateX(25vw); }
          .cloud-flow-b { transform: translateX(60vw); }
        }
      `}</style>
    </section>
  );
}
