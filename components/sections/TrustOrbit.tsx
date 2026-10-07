"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";

// ─── Data 24 Logo & Momen Klien Orbit ────────────────────────────────────────
interface OrbitItem {
  id: string;
  src: string;
  alt: string;
}

const allOrbitLogos: OrbitItem[] = Array.from({ length: 24 }, (_, i) => ({
  id: `orbit-logo-${i + 1}`,
  src: `/images/orbit/logo${i + 1}.png`,
  alt: `Partner & Klien Tegoer Sapa ${i + 1}`,
}));

// Distribusi 24 logo ke 4 lintasan orbit konsentris
const track1Items = allOrbitLogos.slice(0, 4); // 4 items (Inner)
const track2Items = allOrbitLogos.slice(4, 10); // 6 items (Mid-Inner)
const track3Items = allOrbitLogos.slice(10, 17); // 7 items (Mid-Outer)
const track4Items = allOrbitLogos.slice(17, 24); // 7 items (Outer)

export default function TrustOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef<boolean>(false);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 560 });

  // Refs untuk elemen DOM dari masing-masing node logo agar update transform 60fps tanpa re-render
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Deteksi ukuran kontainer secara adaptif
  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        const isMobile = w < 640;
        const isTablet = w >= 640 && w < 1024;
        const h = isMobile
          ? Math.min(420, Math.max(340, Math.round(w * 0.96)))
          : isTablet
          ? Math.min(520, Math.max(440, Math.round(w * 0.6)))
          : 580;
        setDimensions({ width: w, height: h });
      }
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Perhitungan radius semi-mayor (a) dan semi-minor (b) untuk 4 elips orbit
  const { width, height } = dimensions;
  const isMobile = width < 640;

  const radii = useMemo(() => {
    return {
      t1: {
        a: width * (isMobile ? 0.22 : 0.2),
        b: height * (isMobile ? 0.20 : 0.2),
      },
      t2: {
        a: width * (isMobile ? 0.31 : 0.3),
        b: height * (isMobile ? 0.29 : 0.3),
      },
      t3: {
        a: width * (isMobile ? 0.39 : 0.39),
        b: height * (isMobile ? 0.37 : 0.39),
      },
      t4: {
        a: width * (isMobile ? 0.46 : 0.48),
        b: height * (isMobile ? 0.44 : 0.47),
      },
    };
  }, [width, height, isMobile]);

  // Setup orbital motion engine dengan requestAnimationFrame
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Kecepatan putar (radian per detik) masing-masing lintasan
    const speeds = [
      0.11, // Track 1: searah jarum jam (~57s per putaran)
      -0.08, // Track 2: berlawanan jarum jam (~78s per putaran)
      0.06, // Track 3: searah jarum jam (~104s per putaran)
      -0.045, // Track 4: berlawanan jarum jam (~140s per putaran)
    ];

    // Sudut dasar masing-masing track
    const currentAngles = [0, 0, 0, 0];

    // Sudut offset per logo pada tiap track
    const trackAssignments = [
      { count: track1Items.length, speedIdx: 0, a: radii.t1.a, b: radii.t1.b, startIdx: 0 },
      { count: track2Items.length, speedIdx: 1, a: radii.t2.a, b: radii.t2.b, startIdx: 4 },
      { count: track3Items.length, speedIdx: 2, a: radii.t3.a, b: radii.t3.b, startIdx: 10 },
      { count: track4Items.length, speedIdx: 3, a: radii.t4.a, b: radii.t4.b, startIdx: 17 },
    ];

    let animId: number;
    let lastTime = performance.now();
    let currentSpeedMultiplier = 1.0;

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      // Perlambat secara halus saat kursor menyorot area orbit
      const targetMultiplier = isHoveredRef.current ? 0.2 : 1.0;
      currentSpeedMultiplier += (targetMultiplier - currentSpeedMultiplier) * 0.08;

      if (!prefersReducedMotion) {
        for (let t = 0; t < 4; t++) {
          currentAngles[t] += speeds[t] * dt * currentSpeedMultiplier;
        }
      }

      const centerX = width / 2;
      const centerY = height / 2;

      // Update posisi setiap logo di DOM
      trackAssignments.forEach(({ count, speedIdx, a, b, startIdx }) => {
        const baseAngle = currentAngles[speedIdx];
        const step = (Math.PI * 2) / count;

        for (let i = 0; i < count; i++) {
          const nodeIdx = startIdx + i;
          const el = nodeRefs.current[nodeIdx];
          if (!el) continue;

          const angle = baseAngle + i * step;
          const x = centerX + a * Math.cos(angle);
          const y = centerY + b * Math.sin(angle);

          el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        }
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [width, height, radii]);

  return (
    <section
      className="relative text-white pt-6 sm:pt-12 lg:pt-16 pb-10 sm:pb-16 lg:pb-20 overflow-hidden select-none touch-pan-y"
      style={{
        background:
          "linear-gradient(to bottom, #ffffff 0%, #edf9f3 6%, #a8eed0 14%, #38ca86 24%, #039255 36%, #027443 48%, #0f432a 62%, #0f432a 100%)",
      }}
      aria-label="Klien yang Mempercayai Tegoer Sapa"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* ─── Orbital System Arena (Warna Flat, Tanpa Shadow) ─────── */}
        <div
          ref={containerRef}
          className="relative w-full mx-auto flex items-center justify-center overflow-hidden touch-pan-y"
          style={{ height: `${height}px` }}
        >
          {/* SVG Concentric Orbital Ellipse Tracks (Garis Putih Flat) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Track 1 (Inner) */}
            <ellipse
              cx={width / 2}
              cy={height / 2}
              rx={radii.t1.a}
              ry={radii.t1.b}
              stroke="#ffffff"
              strokeOpacity="0.4"
              strokeWidth={isMobile ? "1" : "1.5"}
            />
            {/* Track 2 (Mid-Inner) */}
            <ellipse
              cx={width / 2}
              cy={height / 2}
              rx={radii.t2.a}
              ry={radii.t2.b}
              stroke="#ffffff"
              strokeOpacity="0.35"
              strokeWidth={isMobile ? "1" : "1.5"}
            />
            {/* Track 3 (Mid-Outer) */}
            <ellipse
              cx={width / 2}
              cy={height / 2}
              rx={radii.t3.a}
              ry={radii.t3.b}
              stroke="#ffffff"
              strokeOpacity="0.3"
              strokeWidth={isMobile ? "1" : "1.5"}
            />
            {/* Track 4 (Outer) */}
            <ellipse
              cx={width / 2}
              cy={height / 2}
              rx={radii.t4.a}
              ry={radii.t4.b}
              stroke="#ffffff"
              strokeOpacity="0.25"
              strokeWidth={isMobile ? "1" : "1.5"}
            />
          </svg>

          {/* ─── Centerpiece: Kapsul Hijau Pusat Orbit (Flat, Tanpa Shadow) ─── */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto select-none touch-pan-y">
            <div className="px-3.5 sm:px-8 py-2 sm:py-4 rounded-full bg-[#165b38] text-white border border-white/50 sm:border-2 text-center transition-transform duration-300 hover:scale-105 active:scale-95 cursor-default shadow-none">
              <p className="text-[11px] sm:text-sm md:text-base font-black tracking-tight leading-tight whitespace-nowrap text-white">
                Lebih dari 50 klien
              </p>
              <p className="text-[9px] sm:text-xs font-bold text-white/80 leading-tight mt-0.5 whitespace-nowrap">
                percaya dengan kami
              </p>
            </div>
          </div>

          {/* ─── 24 Rotating Orbit Nodes (Flat, Tanpa Shadow) ───────── */}
          {allOrbitLogos.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => {
                nodeRefs.current[idx] = el;
              }}
              className="absolute left-0 top-0 will-change-transform z-10 group/node touch-pan-y"
            >
              <div
                className={[
                  "relative flex items-center justify-center transition-transform duration-300 ease-out select-none",
                  "hover:scale-125 hover:z-30 active:scale-110",
                  idx < 4
                    ? "w-8 h-8 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
                    : idx < 10
                    ? "w-7 h-7 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
                    : "w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12",
                ].join(" ")}
                title={item.alt}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 32px, 64px"
                  className="object-contain pointer-events-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
