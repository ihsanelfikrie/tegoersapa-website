"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { brand, contact } from "@/lib/content";

/**
 * Footer global untuk website Tegoer Sapa.
 * Didesain mengikuti bentuk/arsitektur lengkung referensi:
 * 1. Banner newsletter atas dengan grafis pita melingkar (3D tubular looping torus) yang jelas & terlihat.
 * 2. Transisi kurva melandai (dipping arc) yang tegas & kontras tinggi memisahkan banner atas dan footer bawah.
 * 3. Tata letak 4 kolom (Brand Info + Alamat & Kontak + Layanan + Tautan Cepat).
 * 4. Siluet bukit gelombang (wave dunes) di bagian dasar dan teks hak cipta terpusat di tengah.
 */
export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#002716]">
      {/* ─── 1. TOP NEWSLETTER / CTA BANNER ────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[#027845] via-[#02683c] to-[#015330] text-white pt-20 pb-16 sm:pt-24 sm:pb-20 overflow-hidden">
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
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
                <stop offset="50%" stopColor="#c3f4f7" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#3aaa35" stopOpacity="0.12" />
              </linearGradient>
              <linearGradient id="melingkarGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#3aaa35" stopOpacity="0.08" />
              </linearGradient>
            </defs>

            {/* Pita tabung melengkung dari kiri */}
            <path
              d="M-80,-20 C180,120 340,240 680,280"
              stroke="url(#melingkarGrad1)"
              strokeWidth="110"
              strokeLinecap="round"
            />
            {/* Busur penyambung di belakang form input */}
            <path
              d="M480,260 C700,330 900,280 1060,200"
              stroke="url(#melingkarGrad1)"
              strokeWidth="95"
              strokeLinecap="round"
            />
            {/* Lingkaran cincin melingkar besar (Giant Oval Torus Loop) di sisi kanan */}
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

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          {/* Badge / Category Header */}
          <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-brand-sky mb-3 sm:mb-4 drop-shadow-sm">
            Newsletter & Update
          </span>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-tight sm:leading-snug max-w-2xl mx-auto mb-8 sm:mb-10 drop-shadow">
            Dapatkan info promo & inspirasi momen spesial Anda
          </h2>

          {/* Newsletter Form: Pill Input & Pill Submit Button */}
          {isSubscribed ? (
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 text-white px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
              <span className="w-2 h-2 rounded-full bg-brand-sky animate-pulse" />
              <span>Terima kasih! Kami akan mengirimkan update penawaran terbaru untuk Anda.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto w-full px-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Alamat Email Anda"
                className="w-full bg-white text-gray-900 placeholder-gray-400 text-sm font-medium px-6 py-3.5 rounded-full shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-green/60 transition-all"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#002716] hover:bg-brand-green text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-all duration-300 shadow-xl flex-shrink-0 cursor-pointer active:scale-95"
              >
                Kirim
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ─── 2. DRAMATIC DIPPING CURVE TRANSITION ───────────────────────── */}
      {/* Kurva melandai melengkung ke bawah dengan kontras tegas antara hijau terang (#015330) dan hijau dasar gelap (#002716) */}
      <div className="relative w-full overflow-hidden leading-none -mt-px bg-[#015330]">
        <svg
          viewBox="0 0 1440 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 sm:h-24 md:h-36 lg:h-44 text-[#002716] fill-current block"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C380,140 1060,140 1440,0 L1440,140 L0,140 Z" />
        </svg>
      </div>

      {/* ─── 3. MAIN DARK FOOTER BODY ──────────────────────────────────── */}
      <div className="relative bg-[#002716] text-white pt-6 sm:pt-10 pb-16 sm:pb-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
            
            {/* Kolom 1: Brand Info (Left Side - 4 Cols) */}
            <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
              <Link
                href="/"
                className="inline-block mb-6 group"
                aria-label={`${brand.name} — Kembali ke beranda`}
              >
                <Image
                  src="/brand/logo-2-baris.svg"
                  alt={brand.name}
                  width={1258}
                  height={1258}
                  unoptimized
                  className="w-32 sm:w-36 h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <p className="text-white/80 text-sm leading-relaxed mb-4 font-semibold tracking-wide">
                {brand.tagline}
              </p>
              <p className="text-white/50 text-xs leading-relaxed font-medium max-w-sm">
                Penyedia layanan photobooth, photobox, dan professional photography berkualitas tinggi untuk setiap perayaan berharga Anda di Medan dan sekitarnya.
              </p>
            </div>

            {/* 3 Kolom Kanan (Matching Address, Programs, Quick Links - 8 Cols) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
              
              {/* Kolom: ALAMAT & KONTAK */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-sky/80 mb-3">
                  Alamat
                </h4>
                <p className="text-sm text-white/80 font-medium leading-relaxed mb-6">
                  Kota Medan, Sumatera Utara<br />
                  Indonesia
                </p>

                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-sky/80 mb-3">
                  Telepon / WA
                </h4>
                <div className="space-y-2 mb-6">
                  {contact.whatsapp.map((wa) => (
                    <div key={wa.raw}>
                      <span className="block text-[10px] text-white/40 uppercase font-semibold tracking-wider">
                        {wa.label}
                      </span>
                      <a
                        href={`https://wa.me/${wa.raw}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/90 hover:text-brand-green font-bold transition-colors inline-block mt-0.5"
                      >
                        {wa.number}
                      </a>
                    </div>
                  ))}
                </div>

                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-sky/80 mb-2">
                  Email
                </h4>
                <a
                  href={`mailto:${brand.email}`}
                  className="text-sm text-white/90 hover:text-brand-green font-medium transition-colors inline-block break-all"
                >
                  {brand.email}
                </a>
              </div>

              {/* Kolom: LAYANAN (Programs) */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-sky/80 mb-4">
                  Layanan
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/photobooth#photobooth"
                      className="text-sm text-white/70 hover:text-white transition-colors font-medium block"
                    >
                      Photobooth Instant
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/photobooth#photobox"
                      className="text-sm text-white/70 hover:text-white transition-colors font-medium block"
                    >
                      Photobox Self Studio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/photography/traditional"
                      className="text-sm text-white/70 hover:text-white transition-colors font-medium block"
                    >
                      Traditional Photography
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/photography/wedding"
                      className="text-sm text-white/70 hover:text-white transition-colors font-medium block"
                    >
                      Wedding Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/photography/graduation"
                      className="text-sm text-white/70 hover:text-white transition-colors font-medium block"
                    >
                      Graduation Photography
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/photography/studio"
                      className="text-sm text-white/70 hover:text-white transition-colors font-medium block"
                    >
                      Studio Professional
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Kolom: TAUTAN CEPAT (Quick Links) */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-sky/80 mb-4">
                  Tautan Cepat
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-white/70 hover:text-white transition-colors font-medium block"
                    >
                      Beranda
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricelist"
                      className="text-sm text-white/70 hover:text-white transition-colors font-medium block"
                    >
                      Pricelist Paket
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/gallery"
                      className="text-sm text-white/70 hover:text-white transition-colors font-medium block"
                    >
                      Galeri Foto
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tentang"
                      className="text-sm text-white/70 hover:text-white transition-colors font-medium block"
                    >
                      Tentang Kami
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/kontak"
                      className="text-sm text-white/70 hover:text-white transition-colors font-medium block"
                    >
                      Hubungi Kami
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com/tegoersapa.photobooth"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/70 hover:text-white transition-colors font-medium block"
                    >
                      Instagram Photobooth ↗
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tiktok.com/@tegoersapaa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/70 hover:text-white transition-colors font-medium block"
                    >
                      TikTok ↗
                    </a>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* ─── 4. BOTTOM CREDITS (Centered single line matching reference) ─── */}
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-xs text-white/40 font-medium">
              © {new Date().getFullYear()} {brand.name}. Seluruh hak cipta dilindungi.
            </p>
          </div>
        </div>

        {/* Decorative Wave Dunes at bottom (matching reference bottom ambient hill layers) */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden opacity-30">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-16 sm:h-24 text-[#00140a] fill-current"
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
