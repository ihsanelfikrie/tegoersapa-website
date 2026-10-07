"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { photoboothLinktree, type LinktreeItem } from "@/lib/content";

/**
 * Komponen Icon SVG vektor dengan badge warna autentik untuk tiap tipe tautan
 */
function LinkIconBadge({ type }: { type: LinktreeItem["iconType"] }) {
  switch (type) {
    case "whatsapp":
      return (
        <span className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-sm border border-brand-dark/10 group-hover:scale-105 transition-transform duration-200">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413Z" />
          </svg>
        </span>
      );
    case "instagram":
      return (
        <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center flex-shrink-0 shadow-sm border border-brand-dark/10 group-hover:scale-105 transition-transform duration-200">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </span>
      );
    case "tiktok":
      return (
        <span className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0 shadow-sm border border-brand-dark/10 group-hover:scale-105 transition-transform duration-200">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          </svg>
        </span>
      );
    case "website":
      return (
        <span className="w-10 h-10 rounded-xl bg-brand-sky text-brand-dark flex items-center justify-center flex-shrink-0 shadow-sm border border-brand-dark/15 group-hover:scale-105 transition-transform duration-200">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </span>
      );
    case "external-link":
    default:
      return (
        <span className="w-10 h-10 rounded-xl bg-amber-400 text-brand-dark flex items-center justify-center flex-shrink-0 shadow-sm border border-brand-dark/15 group-hover:scale-105 transition-transform duration-200">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </span>
      );
  }
}

/**
 * Kartu Linktree Photobooth dengan visual khas Tegoer Sapa
 * (Tactile sticker cartoon style, awan & langit, maskot resmi, tombol nyata berkarakter)
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
      title: "Tegoer Sapa Photobooth",
      text: "Respect the moment, every second matter. — Tegoer Sapa Photobooth",
      url,
    };

    if (typeof navigator !== "undefined" && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to copy
      }
    }

    // Fallback: Copy to clipboard
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setToastMessage("Tautan bio berhasil disalin!");
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
      className={`relative w-full max-w-md mx-auto rounded-[32px] p-5 sm:p-7 bg-white text-brand-dark border-[3px] border-brand-dark shadow-[0_8px_0_#002716] transition-all duration-300 ${className}`}
    >
      {/* Toast Notification */}
      {showShareToast && toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="absolute -top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-brand-green text-white text-xs sm:text-sm font-black rounded-full shadow-[0_4px_0_#002716] border-2 border-brand-dark flex items-center gap-2 animate-bounce"
        >
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Action Bar: Share Button */}
      <div className="flex justify-between items-center mb-5">
        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-sky text-brand-dark border-2 border-brand-dark shadow-[0_2px_0_#002716]">
          Hub Tautan Resmi
        </span>

        <button
          type="button"
          onClick={handleShare}
          aria-label="Bagikan tautan Photobooth Tegoer Sapa"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-gray-50 hover:bg-brand-dark text-brand-dark hover:text-white border-2 border-brand-dark shadow-[0_2px_0_#002716] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <span className="text-brand-green">✓</span>
              <span>Disalin!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share</span>
            </>
          )}
        </button>
      </div>

      {/* Header Profile Info */}
      <div className="flex flex-col items-center text-center mb-6">
        {/* Avatar Logo Resmi Tegoer Sapa */}
        <div className="relative group">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-brand-dark bg-brand-green shadow-[0_6px_0_#002716] group-hover:scale-105 transition-transform duration-200">
            <Image
              src={photoboothLinktree.avatar}
              alt="Logo Resmi Tegoer Sapa Photobooth"
              width={128}
              height={128}
              priority
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-3.5 text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
          Tegoer Sapa Photobooth
        </h1>

        {/* Handle badge */}
        <span className="text-xs font-bold text-brand-dark/70 mt-0.5">
          @photobooth
        </span>

        {/* Tagline */}
        <p className="mt-1 text-xs sm:text-sm text-brand-dark/85 font-bold max-w-xs leading-relaxed italic">
          &ldquo;{photoboothLinktree.tagline}&rdquo;
        </p>

        {/* Location Badge */}
        <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green/15 border-2 border-brand-dark text-[11px] font-black text-brand-dark shadow-[0_2px_0_#002716]">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
          <span>Banjarbaru, Kalimantan Selatan</span>
        </div>
      </div>

      {/* 6 Buttons Sesuai https://link.tegoersapa.com/@photobooth */}
      <nav aria-label="Daftar tautan resmi Photobooth" className="space-y-3">
        {photoboothLinktree.links.map((link) => {
          const isInternal = !link.isExternal && link.url.startsWith("/");

          const buttonContent = (
            <div className="group relative flex items-center justify-between w-full px-4 py-3.5 rounded-2xl bg-white hover:bg-brand-cream/60 border-2 border-brand-dark text-brand-dark shadow-[0_4px_0_#002716] hover:shadow-[0_2px_0_#002716] hover:translate-y-0.5 active:translate-y-1 active:shadow-none transition-all duration-150">
              {/* Left icon badge & text */}
              <div className="flex items-center gap-3.5 min-w-0 pr-2">
                <LinkIconBadge type={link.iconType} />
                <div className="text-left min-w-0">
                  <span className="block text-sm sm:text-base font-black tracking-tight text-brand-dark group-hover:text-brand-green transition-colors truncate">
                    {link.title}
                  </span>
                  {link.subtitle && (
                    <span className="block text-[11px] text-gray-500 font-semibold truncate">
                      {link.subtitle}
                    </span>
                  )}
                </div>
              </div>

              {/* Right Arrow indicator */}
              <span
                aria-hidden="true"
                className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-brand-dark group-hover:text-white flex items-center justify-center font-black text-xs text-brand-dark flex-shrink-0 transition-colors"
              >
                →
              </span>
            </div>
          );

          if (isInternal) {
            return (
              <Link key={link.id} href={link.url} className="block focus:outline-none focus:ring-2 focus:ring-brand-dark rounded-2xl">
                {buttonContent}
              </Link>
            );
          }

          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block focus:outline-none focus:ring-2 focus:ring-brand-dark rounded-2xl"
            >
              {buttonContent}
            </a>
          );
        })}
      </nav>

      {/* Footer Branding */}
      <div className="mt-6 pt-4 border-t-2 border-brand-dark/10 text-center">
        <p className="text-[11px] text-brand-dark/60 font-black">
          Tegoer Sapa Photobooth © {new Date().getFullYear()} • Link-ByTS
        </p>
      </div>
    </div>
  );
}

/**
 * Default export
 */
export default PhotoboothLinktreeCard;
