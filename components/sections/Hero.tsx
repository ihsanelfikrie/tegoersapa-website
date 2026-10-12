"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { heroHome, heroPhotos, type HeroPhoto } from "@/lib/content";
import Button from "@/components/ui/Button";
import GrassyHill from "@/components/ui/GrassyHill";


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

  // Cloud Parallax refs (GSAP ScrollTrigger Multi-Layer)
  const cloud1Ref = useRef<HTMLDivElement>(null);
  const cloud2Ref = useRef<HTMLDivElement>(null);
  const cloud3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ── Initial states ──────────────────────────────────────────────────
      gsap.set(decorRef.current, { opacity: 0 });
      gsap.set(dividerRef.current, { scaleX: 0, opacity: 0, transformOrigin: "center" });
      gsap.set(taglineRef.current, { opacity: 0, y: 24 });
      gsap.set(ctaRef.current?.children ?? [], { opacity: 0, y: 20 });

      const photoSlots = mosaicRef.current?.querySelectorAll(".photo-slot");
      if (photoSlots) gsap.set(photoSlots, { opacity: 0, x: 48, scale: 0.95 });

      // ── Cascade Reveal Karakter Judul Utama "Tegoer Sapa" ───────────────
      const heroChars = containerRef.current?.querySelectorAll(".hero-char");
      const heroShims = containerRef.current?.querySelectorAll(".hero-shimmer-char");
      if (heroChars && heroChars.length > 0) {
        gsap.from(heroChars, {
          y: -80,
          rotation: -15,
          opacity: 0,
          stagger: { each: 0.04, from: "start" },
          duration: 0.55,
          ease: "back.out(1.4)",
          delay: 0.1,
        });
      }
      if (heroShims && heroShims.length > 0) {
        gsap.from(heroShims, {
          y: -80,
          rotation: -15,
          opacity: 0,
          stagger: { each: 0.04, from: "start" },
          duration: 0.55,
          ease: "back.out(1.4)",
          delay: 0.1,
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
      });

      // ── 2. Animasi Loop Lompat Per-Huruf Bergantian Setiap 5 Detik ────────
      const charKeys = [
        "t-0", "t-1", "t-2", "t-3", "t-4", "t-5",
        "s-0", "s-1", "s-2", "s-3"
      ];

      const jumpTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 5,
        delay: 2.2,
      });

      const cleanups: Array<() => void> = [];

      charKeys.forEach((key, index) => {
        const base = containerRef.current?.querySelector<HTMLElement>(`[data-char="${key}"]`);
        const shim = containerRef.current?.querySelector<HTMLElement>(`[data-char-shim="${key}"]`);
        if (!base) return;
        const targets = shim ? [base, shim] : [base];
        const tilt = index % 2 === 0 ? 7 : -7;
        const wordOffset = index >= 6 ? 0.08 : 0;
        const startTime = index * 0.11 + wordOffset;

        jumpTl
          .to(
            targets,
            {
              y: -42,
              scaleY: 1.25,
              scaleX: 0.86,
              rotation: tilt,
              duration: 0.24,
              ease: "power2.out",
            },
            startTime
          )
          .to(
            targets,
            {
              y: 0,
              scaleY: 0.86,
              scaleX: 1.14,
              rotation: 0,
              duration: 0.20,
              ease: "power2.in",
            },
            startTime + 0.24
          )
          .to(
            targets,
            {
              scaleY: 1,
              scaleX: 1,
              duration: 0.28,
              ease: "elastic.out(1.5, 0.4)",
            },
            startTime + 0.44
          );

        // ── 3. Efek Interaktif Hover & Touch pada Setiap Huruf ─────────────
        const onEnter = () => {
          gsap.killTweensOf(targets);
          gsap.to(targets, {
            y: -42,
            scale: 1.25,
            rotation: tilt * 1.5,
            duration: 0.2,
            ease: "back.out(3)",
            overwrite: "auto",
          });
        };

        const onLeave = () => {
          gsap.to(targets, {
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.55,
            ease: "elastic.out(1.2, 0.35)",
            overwrite: "auto",
          });
        };

        base.addEventListener("mouseenter", onEnter);
        base.addEventListener("mouseleave", onLeave);
        base.addEventListener("touchstart", onEnter, { passive: true });
        base.addEventListener("touchend", onLeave, { passive: true });

        cleanups.push(() => {
          base.removeEventListener("mouseenter", onEnter);
          base.removeEventListener("mouseleave", onLeave);
          base.removeEventListener("touchstart", onEnter);
          base.removeEventListener("touchend", onLeave);
        });
      });

      // ── 4. Multi-Layer Cloud Parallax (GSAP ScrollTrigger) ────────────
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (cloud1Ref.current) {
          gsap.to(cloud1Ref.current, {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
            y: -190,
            x: -60,
            scale: 1.08,
            ease: "none",
          });
        }

        if (cloud2Ref.current) {
          gsap.to(cloud2Ref.current, {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
            y: -120,
            x: 70,
            opacity: 0.65,
            ease: "none",
          });
        }

        if (cloud3Ref.current) {
          gsap.to(cloud3Ref.current, {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
            y: -65,
            x: 35,
            opacity: 0.4,
            ease: "none",
          });
        }
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] sm:min-h-screen flex items-center overflow-hidden bg-brand-sky"
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
        {/* Layer 3: Awan Jauh / Background — melayang tenang di ketinggian langit */}
        <div
          ref={cloud3Ref}
          className="absolute top-12 sm:top-16 lg:top-20 left-0 w-full pointer-events-none will-change-transform"
        >
          <Image
            src="/brand/awan.svg"
            alt=""
            width={677}
            height={408}
            unoptimized
            className="cloud-flow cloud-flow-c w-[14rem] sm:w-[20rem] lg:w-[26rem] max-w-none pointer-events-none opacity-60"
          />
        </div>

        {/* Layer 1: Awan Atas / Foreground — proporsional & anggun, tidak menutupi area teks */}
        <div
          ref={cloud1Ref}
          className="absolute top-2 sm:top-4 lg:top-6 left-0 w-full pointer-events-none will-change-transform"
        >
          <Image
            src="/brand/awan.svg"
            alt=""
            width={677}
            height={408}
            unoptimized
            className="cloud-flow cloud-flow-a w-[22rem] sm:w-[30rem] lg:w-[40rem] max-w-none pointer-events-none opacity-95"
          />
        </div>

        {/* Layer 2: Awan Bawah / Midground — melayang anggun di atas lengkungan bukit rumput */}
        <div
          ref={cloud2Ref}
          className="absolute bottom-14 sm:bottom-20 lg:bottom-24 left-0 w-full pointer-events-none will-change-transform"
        >
          <Image
            src="/brand/awan.svg"
            alt=""
            width={677}
            height={408}
            unoptimized
            className="cloud-flow cloud-flow-b w-[16rem] sm:w-[22rem] lg:w-[28rem] max-w-none pointer-events-none opacity-90"
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          LAYOUT UTAMA: TEKS KIRI + MOSAIC KANAN
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-24 lg:pt-28 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">

          {/* ─── KOLOM KIRI: Teks ─────────────────────────────────────── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">

            {/* Judul utama (Diberi ukuran lebih besar dan gagah di mobile) */}
            <h1
              id="hero-title"
              className="font-black leading-[0.98] sm:leading-[1.02] tracking-tight sm:tracking-normal text-[clamp(4.25rem,18.5vw,7.5rem)] sm:text-[clamp(5.25rem,15vw,7.5rem)] lg:text-[7.5rem] mb-3 sm:mb-5 select-none text-center lg:text-left w-full"
            >
              {/* Baris 1: Tegoer */}
              <span className="hero-line-wrap block text-center lg:text-left mx-auto lg:mx-0" style={{ padding: "0.1em 0.12em 0.15em", margin: "-0.1em -0.12em 0" }}>
                <span className="relative inline-flex">
                  <span ref={word1Ref} className="hero-word">
                    {"Tegoer".split("").map((c, i) => (
                      <span
                        key={i}
                        className="hero-char cursor-pointer hover:brightness-110 select-none"
                        data-char={`t-${i}`}
                      >
                        {c}
                      </span>
                    ))}
                  </span>

                  {/* Masked Cel-Shaded Light Sheen Overlay */}
                  <span
                    aria-hidden="true"
                    className="hero-shimmer-overlay hero-shimmer-overlay-t"
                  >
                    {"Tegoer".split("").map((c, i) => (
                      <span
                        key={i}
                        className="hero-shimmer-char select-none"
                        data-char-shim={`t-${i}`}
                        style={{ "--char-offset": `${i * 20}%` } as React.CSSProperties}
                      >
                        {c}
                      </span>
                    ))}
                  </span>
                </span>
              </span>

              {/* Baris 2: Sapa */}
              <span className="hero-line-wrap block text-center lg:text-left mx-auto lg:mx-0" style={{ padding: "0.1em 0.12em 0.15em", margin: "-0.1em -0.12em 0" }}>
                <span className="relative inline-flex">
                  <span ref={word2Ref} className="hero-word hero-word-green">
                    {"Sapa".split("").map((c, i) => (
                      <span
                        key={i}
                        className="hero-char cursor-pointer hover:brightness-110 select-none"
                        data-char={`s-${i}`}
                      >
                        {c}
                      </span>
                    ))}
                  </span>

                  {/* Masked Cel-Shaded Light Sheen Overlay */}
                  <span
                    aria-hidden="true"
                    className="hero-shimmer-overlay hero-shimmer-overlay-s"
                  >
                    {"Sapa".split("").map((c, i) => (
                      <span
                        key={i}
                        className="hero-shimmer-char hero-shimmer-char-green select-none"
                        data-char-shim={`s-${i}`}
                        style={{ "--char-offset": `${i * 33.33}%` } as React.CSSProperties}
                      >
                        {c}
                      </span>
                    ))}
                  </span>
                </span>
              </span>
            </h1>

            {/* Garis divider */}
            <div
              ref={dividerRef}
              aria-hidden="true"
              className="w-16 h-1 rounded-full bg-brand-dark mb-4 sm:mb-5 mx-auto lg:mx-0"
            />

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="text-brand-dark/70 font-medium tracking-[0.1em] uppercase
                         text-[clamp(0.75rem,2.2vw,0.875rem)] leading-relaxed mb-6 sm:mb-10 max-w-sm text-center lg:text-left mx-auto lg:mx-0"
            >
              {heroHome.tagline}
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center lg:items-start justify-center lg:justify-start gap-2.5 sm:gap-3 w-full sm:w-auto mx-auto lg:mx-0">
              <Button
                href={heroHome.cta.primary.href}
                id="hero-cta-gallery"
                variant="primary"
                size="md"
              >
                <span>{heroHome.cta.primary.label}</span>
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
              </Button>

              <Button
                href={heroHome.cta.secondary.href}
                id="hero-cta-pricelist"
                variant="stroke"
                size="md"
              >
                {heroHome.cta.secondary.label}
              </Button>
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


          </div>
        </div>
      </div>

      {/* ─── 4. BOTTOM HILL DECORATION (Lengkung Bukit Kartun Hijau) ─── */}
      <GrassyHill
        className="h-28 sm:h-36 md:h-44 lg:h-48 xl:h-52"
        containerClassName="z-0"
      />
    </section>
  );
}
