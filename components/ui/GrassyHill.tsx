import React from "react";

// ─── Sub-komponen: Rumpun rumput kartun 4 bilah (lebar) ──────────────────────
export function GrassTuft4({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 60 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M 12 25 L 2 11" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 18 21 L 24 3" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 40 20 L 39 1" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 46 25 L 56 12" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Sub-komponen: Rumpun rumput kartun 3 bilah (kompak) ────────────────────
export function GrassTuft3({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 36 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M 8 23 L 1 13" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 14 24 L 12 1" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 20 25 L 30 14" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

interface GrassyHillProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * GrassyHill — Dekorasi bukit rerumputan kartun responsif bergaya sticker kartun.
 * Didesain persis seperti referensi: lengkung bukit hijau (#1eab73),
 * outline hitam kartun tebal, dan rumpun rumput tersebar alami yang bergoyang ditiup angin.
 */
export default function GrassyHill({
  className = "h-24 sm:h-32 md:h-36 lg:h-44",
  children,
}: GrassyHillProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 right-0 w-full pointer-events-none select-none z-10 overflow-hidden leading-none translate-y-[1px]"
    >
      <div className={`relative w-full ${className}`}>
        {/* Lengkungan Bukit Hijau dengan Garis Hitam Kartun */}
        <svg
          viewBox="0 0 1440 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full block"
        >
          {/* Bidang Rumput Hijau Segar */}
          <path
            d="M -10,128 Q 720,-16 1450,96 L 1450,225 L -10,225 Z"
            fill="#1eab73"
          />
          {/* Outline Hitam Tegas Khas Kartun */}
          <path
            d="M -10,128 Q 720,-16 1450,96"
            fill="none"
            stroke="#000000"
            strokeWidth="4.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Rumpun Rumput 1: Kiri bawah (4 bilah) */}
        <GrassTuft4
          className="grass-tuft grass-sway-a absolute w-8 sm:w-10 lg:w-12 h-auto"
          style={{ left: "3.5%", bottom: "15%", animationDelay: "0s" }}
        />

        {/* Rumpun Rumput Tambahan Kiri (Layar Menengah/Besar) */}
        <GrassTuft3
          className="grass-tuft grass-sway-b hidden md:block absolute w-5 sm:w-7 lg:w-9 h-auto"
          style={{ left: "14%", bottom: "28%", animationDelay: "-1.8s" }}
        />

        {/* Rumpun Rumput 2: Lereng Kiri atas (4 bilah) */}
        <GrassTuft4
          className="grass-tuft grass-sway-c absolute w-8 sm:w-10 lg:w-12 h-auto"
          style={{ left: "24%", bottom: "44%", animationDelay: "-0.9s" }}
        />

        {/* Rumpun Rumput Tambahan Tengah-Kiri (Layar Besar) */}
        <GrassTuft3
          className="grass-tuft grass-sway-a hidden lg:block absolute w-5 sm:w-7 lg:w-9 h-auto"
          style={{ left: "38%", bottom: "32%", animationDelay: "-2.5s" }}
        />

        {/* Rumpun Rumput 3: Tengah bawah (3 bilah) */}
        <GrassTuft3
          className="grass-tuft grass-sway-b absolute w-5 sm:w-7 lg:w-9 h-auto"
          style={{ left: "56%", bottom: "16%", animationDelay: "-1.2s" }}
        />

        {/* Rumpun Rumput Tambahan Puncak Kanan (Layar Menengah/Besar) */}
        <GrassTuft3
          className="grass-tuft grass-sway-c hidden md:block absolute w-5 sm:w-7 lg:w-9 h-auto"
          style={{ left: "67%", bottom: "50%", animationDelay: "-3.1s" }}
        />

        {/* Rumpun Rumput 4: Lereng Kanan atas (4 bilah) */}
        <GrassTuft4
          className="grass-tuft grass-sway-a absolute w-8 sm:w-10 lg:w-12 h-auto"
          style={{ left: "77%", bottom: "42%", animationDelay: "-0.5s" }}
        />

        {/* Rumpun Rumput 5: Kanan bawah (3 bilah) */}
        <GrassTuft3
          className="grass-tuft grass-sway-b absolute w-5 sm:w-7 lg:w-9 h-auto"
          style={{ left: "93%", bottom: "14%", animationDelay: "-2.1s" }}
        />

        {children}
      </div>
    </div>
  );
}
