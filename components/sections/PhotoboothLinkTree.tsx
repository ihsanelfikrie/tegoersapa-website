"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { photoboothLinktree, type LinktreeItem } from "@/lib/content";

/**
 * Komponen Icon SVG vektor autentik untuk tiap tipe link
 */
function LinkIcon({ type, className = "w-5 h-5" }: { type: LinktreeItem["iconType"]; className?: string }) {
  switch (type) {
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      );
    case "website":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case "external-link":
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      );
  }
}

/**
 * Kartu Linktree Photobooth yang interaktif
 * Meniru persis profil, avatar, teks, share button, dan 6 tombol link dari:
 * https://link.tegoersapa.com/@photobooth
 */
export function PhotoboothLinktreeCard({
  className = "",
  showShareToast = true,
}: {
  className?: string;
  showShareToast?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleShare = async () => {
    const url = photoboothLinktree.shareUrl;
    const shareData = {
      title: "Photobooth Tegoer Sapa",
      text: "Respect the moment, every second matter. — Tegoer Sapa Photobooth",
      url,
    };

    if (typeof navigator !== "undefined" && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to copy
      }
    }

    // Fallback: Copy to clipboard
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setToastMessage("Tautan profil berhasil disalin!");
        setTimeout(() => {
          setCopied(false);
          setToastMessage(null);
        }, 2800);
      }
    } catch {
      setToastMessage("Salin tautan: " + url);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div
      className={`relative w-full max-w-md mx-auto rounded-[32px] p-6 sm:p-8 bg-[#0b1b14] text-white border border-emerald-500/20 shadow-[0_20px_50px_rgba(0,39,22,0.4)] backdrop-blur-xl transition-all duration-300 ${className}`}
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[32px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent pointer-events-none"
      />

      {/* Toast Notification */}
      {showShareToast && toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-emerald-500 text-brand-dark text-xs sm:text-sm font-bold rounded-full shadow-lg flex items-center gap-2 animate-bounce"
        >
          <svg className="w-4 h-4 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Action Bar (Share Button) */}
      <div className="relative z-10 flex justify-end mb-4">
        <button
          type="button"
          onClick={handleShare}
          aria-label="Bagikan profil Photobooth Tegoer Sapa"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white text-white hover:text-brand-dark border border-white/15 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Disalin!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share</span>
            </>
          )}
        </button>
      </div>

      {/* Header Profile Info */}
      <div className="relative z-10 flex flex-col items-center text-center mb-7">
        {/* Avatar Mascot */}
        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-emerald-500 to-sky-400 opacity-60 blur-sm group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-white/60 bg-[#162a21] shadow-inner">
            <Image
              src={photoboothLinktree.avatar}
              alt="Avatar Mascot Photobooth Tegoer Sapa"
              width={128}
              height={128}
              priority
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-2xl sm:text-3xl font-black text-white tracking-tight">
          {photoboothLinktree.title}
        </h3>

        {/* Tagline / Bio */}
        <p className="mt-1.5 text-xs sm:text-sm text-emerald-200/90 font-medium max-w-xs leading-relaxed italic">
          &ldquo;{photoboothLinktree.tagline}&rdquo;
        </p>

        {/* Verified Badge / Location */}
        <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-medium text-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Official Bio Hub • Banjarbaru</span>
        </div>
      </div>

      {/* Links List (6 buttons exactly matching link.tegoersapa.com/@photobooth) */}
      <nav aria-label="Daftar tautan resmi Photobooth" className="relative z-10 space-y-3">
        {photoboothLinktree.links.map((link) => {
          const isInternal = !link.isExternal && link.url.startsWith("/");

          const content = (
            <div className="group relative flex items-center justify-between w-full px-4 sm:px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white border border-white/15 hover:border-emerald-400 text-white hover:text-brand-dark transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-lg">
              {/* Left icon & text */}
              <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 pr-2">
                <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-white/10 group-hover:bg-brand-dark/5 flex items-center justify-center text-emerald-400 group-hover:text-brand-dark transition-colors duration-200">
                  <LinkIcon type={link.iconType} className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
                <div className="text-left min-w-0">
                  <span className="block text-sm sm:text-base font-bold tracking-tight truncate">
                    {link.title}
                  </span>
                  {link.subtitle && (
                    <span className="block text-[11px] sm:text-xs text-white/60 group-hover:text-brand-dark/70 font-medium truncate">
                      {link.subtitle}
                    </span>
                  )}
                </div>
              </div>

              {/* Right Arrow indicator */}
              <span
                aria-hidden="true"
                className="flex-shrink-0 text-white/40 group-hover:text-brand-dark text-base font-bold transform group-hover:translate-x-1 transition-all duration-200"
              >
                →
              </span>
            </div>
          );

          if (isInternal) {
            return (
              <Link key={link.id} href={link.url} className="block focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-2xl">
                {content}
              </Link>
            );
          }

          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="block focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-2xl"
            >
              {content}
            </a>
          );
        })}
      </nav>

      {/* Footer Branding */}
      <div className="relative z-10 mt-6 pt-5 border-t border-white/10 text-center">
        <p className="text-[11px] text-white/50 font-medium">
          Tegoer Sapa Photobooth © {new Date().getFullYear()} • Link-ByTS
        </p>
      </div>
    </div>
  );
}

/**
 * Section Lengkap untuk ditempatkan di halaman /tentang (Tentang Kami / Tentang Saya)
 */
export default function PhotoboothLinktreeSection() {
  return (
    <section
      id="linktree"
      className="py-16 sm:py-20 lg:py-24 bg-[#05140d] text-white relative overflow-hidden scroll-mt-20 border-t border-emerald-950"
    >
      {/* Decorative gradient glow backgrounds */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Kolom Kiri: Penjelasan Hub Tautan & Keaslian Bio */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Official Link in Bio
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Hub Tautan Resmi <br />
              <span className="text-emerald-400">Tegoer Sapa Photobooth</span>
            </h2>

            <div className="w-16 h-1 rounded-full bg-emerald-400 mx-auto lg:mx-0" />

            <p className="text-gray-300 text-base sm:text-lg font-medium leading-relaxed max-w-xl">
              Seluruh akses cepat layanan, pemesanan, dan pusat bantuan file photobox kini terintegrasi langsung di sini — identik dengan profil resmi link-in-bio Instagram & TikTok kami.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-left">
                <span className="text-emerald-400 text-lg font-bold block mb-1">⚡ Request Frame</span>
                <p className="text-xs text-gray-400 font-medium">Form khusus pengajuan desain template cetak untuk acara Anda.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-left">
                <span className="text-emerald-400 text-lg font-bold block mb-1">💬 Kendala Photobox</span>
                <p className="text-xs text-gray-400 font-medium">Bantuan cepat untuk pengambilan ulang soft file photobox via WhatsApp.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-left">
                <span className="text-emerald-400 text-lg font-bold block mb-1">📅 Booking Acara</span>
                <p className="text-xs text-gray-400 font-medium">Konsultasi tanggal dan paket photobooth reguler & Bajaj keliling.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-left">
                <span className="text-emerald-400 text-lg font-bold block mb-1">📱 Kanal Sosial</span>
                <p className="text-xs text-gray-400 font-medium">Update portofolio viral dan testimoni di Instagram & TikTok.</p>
              </div>
            </div>

            {/* Quick Action Links */}
            <div className="pt-3 flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href={photoboothLinktree.shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-brand-dark text-xs sm:text-sm font-bold border border-white/20 transition-all duration-200"
              >
                <span>Buka Versi Standalone</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <Link
                href="/links"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-brand-dark text-xs sm:text-sm font-bold transition-all duration-200 shadow-md hover:shadow-emerald-500/30"
              >
                <span>Lihat Laman Bio (/links)</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Kolom Kanan: The Exact Linktree Interactive Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md">
              <PhotoboothLinktreeCard />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
