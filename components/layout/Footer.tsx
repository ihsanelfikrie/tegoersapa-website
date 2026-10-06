"use client";

import Link from "next/link";
import Image from "next/image";
import { brand, contact } from "@/lib/content";

/**
 * Footer global untuk website Tegoer Sapa.
 * Didesain mengikuti bentuk/arsitektur lengkung referensi:
 * 1. Banner tagline atas dengan transisi gradasi lembut dan grafis pita melingkar.
 * 2. Transisi kurva melandai (dipping arc) yang tegas memisahkan banner atas dan footer bawah.
 * 3. Tata letak 4 kolom (Brand Info + Alamat & Kontak + Layanan + Tautan Cepat).
 * 4. Siluet bukit gelombang (wave dunes) di bagian dasar dan teks hak cipta terpusat di tengah.
 */
export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#002716]">
      {/* ─── 1. TOP BRAND TAGLINE BANNER (Transisi Halus: Putih -> Hijau Muda -> Emerald Green) ─── */}
      <section
        className="relative text-white pt-10 sm:pt-16 lg:pt-24 pb-8 sm:pb-14 lg:pb-16 overflow-hidden text-center"
        style={{
          background:
            "linear-gradient(to bottom, #ffffff 0%, #edf9f3 5%, #a8eed0 12%, #38ca86 20%, #039255 28%, #027443 38%, #015e36 52%, #015330 75%, #015330 100%)",
        }}
      >
        {/* Ambient Decorative Looping Ribbon / Torus Graphic ("Melingkar" sesuai referensi) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <svg
            className="w-full h-full min-w-[900px] object-cover -translate-x-1/2 sm:translate-x-0 left-1/2 sm:left-0 absolute top-0"
            viewBox="0 0 1440 380"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="melingkarGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.20" />
                <stop offset="50%" stopColor="#c3f4f7" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#3aaa35" stopOpacity="0.08" />
              </linearGradient>
              <linearGradient id="melingkarGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#3aaa35" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Pita tabung melengkung dari kiri */}
            <path
              d="M-80,-20 C180,120 340,240 680,280"
              stroke="url(#melingkarGrad1)"
              strokeWidth="110"
              strokeLinecap="round"
            />
            {/* Busur penyambung di belakang */}
            <path
              d="M480,260 C700,330 900,280 1060,200"
              stroke="url(#melingkarGrad1)"
              strokeWidth="95"
              strokeLinecap="round"
            />
            {/* Lingkaran cincin melingkar besar di sisi kanan */}
            <ellipse
              cx="1080"
              cy="130"
              rx="220"
              ry="165"
              transform="rotate(-18 1080 130)"
              stroke="url(#melingkarGrad2)"
              strokeWidth="110"
            />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 z-10 py-2 sm:py-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-tight sm:leading-snug max-w-2xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.18)]">
            &ldquo;{brand.tagline}&rdquo;
          </h2>
        </div>
      </section>

      {/* ─── 2. DRAMATIC DIPPING CURVE TRANSITION ───────────────────────── */}
      <div className="relative w-full overflow-hidden leading-none -mt-px bg-[#015330]">
        <svg
          viewBox="0 0 1440 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-7 sm:h-12 md:h-18 lg:h-28 text-[#002716] fill-current block"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C380,140 1060,140 1440,0 L1440,140 L0,140 Z" />
        </svg>
      </div>

      {/* ─── 3. MAIN DARK FOOTER BODY ──────────────────────────────────── */}
      <div className="relative bg-[#002716] text-white pt-2 sm:pt-6 pb-6 sm:pb-12">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-8 pb-6 sm:pb-10">
            
            {/* Kolom 1: Brand Info (Left Side - 4 Cols) */}
            <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
              <Link
                href="/"
                className="inline-block mb-3 sm:mb-5 group"
                aria-label={`${brand.name} — Kembali ke beranda`}
              >
                <Image
                  src="/brand/logo-2-baris.svg"
                  alt={brand.name}
                  width={1258}
                  height={1258}
                  unoptimized
                  className="w-28 sm:w-36 h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <p className="text-white text-xs sm:text-sm leading-snug mb-1.5 sm:mb-3 font-semibold tracking-wide">
                {brand.tagline}
              </p>
              <p className="text-white/80 text-[11px] sm:text-xs leading-relaxed font-medium max-w-sm">
                Penyedia layanan photobooth, photobox, dan professional photography berkualitas tinggi untuk setiap perayaan berharga Anda di Banjarbaru, Kalimantan Selatan dan sekitarnya.
              </p>
            </div>

            {/* 3 Kolom Kanan (Matching Address, Programs, Quick Links - 8 Cols) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
              
              {/* Kolom: ALAMAT & KONTAK (2 Kolom kompak di Mobile) */}
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-3.5 sm:gap-0">
                <div>
                  <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-brand-sky mb-1.5 sm:mb-2">
                    Alamat
                  </h4>
                  <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed mb-3 sm:mb-5">
                    Kota Banjarbaru, Kalsel<br />
                    Indonesia
                  </p>

                  <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-brand-sky mb-1">
                    Email
                  </h4>
                  <a
                    href={`mailto:${brand.email}`}
                    className="text-xs sm:text-sm text-white hover:text-brand-green font-medium transition-colors inline-block break-all"
                  >
                    {brand.email}
                  </a>
                </div>

                <div>
                  <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-brand-sky mb-1.5 sm:mb-2">
                    Telepon / WA
                  </h4>
                  <div className="space-y-2 sm:space-y-2.5">
                    {contact.whatsapp.map((wa) => (
                      <div key={wa.raw}>
                        <span className="block text-[9px] sm:text-[10px] text-brand-cream/90 uppercase font-bold tracking-wider">
                          {wa.label}
                        </span>
                        <a
                          href={`https://wa.me/${wa.raw}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs sm:text-sm text-white hover:text-brand-green font-bold transition-colors inline-block mt-0.5"
                        >
                          {wa.number}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Wrapper Kolom LAYANAN & TAUTAN CEPAT (2 Kolom Berdampingan di Mobile) */}
              <div className="grid grid-cols-2 gap-3.5 sm:contents">
                {/* Kolom: LAYANAN (Programs) */}
                <div>
                  <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-brand-sky mb-2 sm:mb-3">
                    Layanan
                  </h4>
                  <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <li>
                      <Link
                        href="/photobooth#photobooth"
                        className="text-white/85 hover:text-brand-green transition-colors font-medium block py-0.5"
                      >
                        Photobooth Instant
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/photobooth#photobox"
                        className="text-white/85 hover:text-brand-green transition-colors font-medium block py-0.5"
                      >
                        Photobox Self Studio
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/photography/traditional"
                        className="text-white/85 hover:text-brand-green transition-colors font-medium block py-0.5"
                      >
                        Traditional Photography
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/photography/wedding"
                        className="text-white/85 hover:text-brand-green transition-colors font-medium block py-0.5"
                      >
                        Wedding Documentation
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/photography/graduation"
                        className="text-white/85 hover:text-brand-green transition-colors font-medium block py-0.5"
                      >
                        Graduation Photography
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/photography/studio"
                        className="text-white/85 hover:text-brand-green transition-colors font-medium block py-0.5"
                      >
                        Studio Professional
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Kolom: TAUTAN CEPAT (Quick Links) */}
                <div>
                  <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-brand-sky mb-2 sm:mb-3">
                    Tautan Cepat
                  </h4>
                  <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <li>
                      <Link
                        href="/"
                        className="text-white/85 hover:text-brand-green transition-colors font-medium block py-0.5"
                      >
                        Beranda
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/pricelist"
                        className="text-white/85 hover:text-brand-green transition-colors font-medium block py-0.5"
                      >
                        Pricelist Paket
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/gallery"
                        className="text-white/85 hover:text-brand-green transition-colors font-medium block py-0.5"
                      >
                        Galeri Foto
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/tentang"
                        className="text-white/85 hover:text-brand-green transition-colors font-medium block py-0.5"
                      >
                        Tentang Kami
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/kontak"
                        className="text-white/85 hover:text-brand-green transition-colors font-medium block py-0.5"
                      >
                        Hubungi Kami
                      </Link>
                    </li>
                    <li>
                      <a
                        href="https://instagram.com/tegoersapa.photobooth"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/85 hover:text-brand-green transition-colors font-medium block py-0.5"
                      >
                        Instagram ↗
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://tiktok.com/@tegoersapaa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/85 hover:text-brand-green transition-colors font-medium block py-0.5"
                      >
                        TikTok ↗
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

          </div>

          {/* ─── 4. BOTTOM CREDITS (Centered single line matching reference) ─── */}
          <div className="pt-4 sm:pt-6 border-t border-white/10 text-center">
            <p className="text-[11px] sm:text-xs text-white/70 font-medium">
              © {new Date().getFullYear()} {brand.name}. Seluruh hak cipta dilindungi.
            </p>
          </div>
        </div>

        {/* Decorative Wave Dunes at bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden opacity-30">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-10 sm:h-20 text-[#00140a] fill-current"
            preserveAspectRatio="none"
          >
            <path d="M0,60 C320,15 500,100 820,50 C1140,5 1300,90 1440,50 L1440,120 L0,120 Z" />
            <path d="M0,90 C400,60 700,110 1100,75 C1280,60 1380,95 1440,85 L1440,120 L0,120 Z" opacity="0.6" />
          </svg>
        </div>
      </div>
    </footer>
  );
}
