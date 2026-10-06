"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { portfolioPreview, galleryCategories } from "@/lib/content";

function GalleryContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("kategori") || "all";
  const initialSub = searchParams.get("sub") || "all";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSub, setActiveSub] = useState(initialSub);
  const [activeImage, setActiveImage] = useState<typeof portfolioPreview[0] | null>(null);

  useEffect(() => {
    const kat = searchParams.get("kategori");
    const sub = searchParams.get("sub");
    if (kat) setActiveCategory(kat);
    if (sub) setActiveSub(sub);
  }, [searchParams]);

  const currentCategoryData = galleryCategories.find((c) => c.id === activeCategory);

  const filteredItems = portfolioPreview.filter((item) => {
    if (activeCategory === "all") return true;

    // Filter by category
    const catMatch =
      item.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      (activeCategory === "professional" && item.category === "Professional") ||
      (activeCategory === "photobooth" && item.category === "Photobooth") ||
      (activeCategory === "photobox" && item.category === "Photobox");

    if (!catMatch) return false;

    // Filter by sub if selected
    if (activeSub !== "all") {
      const subMatch = item.subCategory.toLowerCase().replace(/\s+/g, "-").includes(activeSub.toLowerCase());
      return subMatch;
    }

    return true;
  });

  return (
    <div className="bg-white min-h-screen text-black">
      {/* ─── Hero Header ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 bg-brand-dark text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green/15 border border-brand-green/30 text-brand-green text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Koleksi Karya
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Galeri <span className="text-brand-green">Portofolio</span>
            </h1>
            <div className="w-14 h-1 rounded-full bg-brand-green my-5" />
            <p className="text-base sm:text-lg text-white/70 font-medium leading-relaxed">
              Jelajahi berbagai momen yang telah kami abadikan — mulai dari photobooth acara seru, photobox kekinian, hingga sesi fotografi profesional.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Filter Categories & Subcategories ──────────────────── */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          <button
            onClick={() => {
              setActiveCategory("all");
              setActiveSub("all");
            }}
            className={[
              "px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer",
              activeCategory === "all"
                ? "bg-brand-dark text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-brand-dark",
            ].join(" ")}
          >
            Semua Foto
          </button>

          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveSub("all");
              }}
              className={[
                "px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer",
                activeCategory === cat.id
                  ? "bg-brand-dark text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-brand-dark",
              ].join(" ")}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sub-Category Pills (if active category has subcategories) */}
        {currentCategoryData && currentCategoryData.subs.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-4 border-b border-gray-100">
            <button
              onClick={() => setActiveSub("all")}
              className={[
                "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer",
                activeSub === "all"
                  ? "bg-brand-green text-white"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100",
              ].join(" ")}
            >
              Semua {currentCategoryData.label}
            </button>
            {currentCategoryData.subs.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSub(sub.id)}
                className={[
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer",
                  activeSub === sub.id
                    ? "bg-brand-green text-white"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100",
                ].join(" ")}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}

        {/* ─── Gallery Grid ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-brand-dark cursor-pointer ring-1 ring-black/5"
            >
              <div
                className="absolute inset-0 bg-brand-dark
                            flex flex-col items-center justify-center p-6 text-center select-none"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-white/40 group-hover:text-brand-green transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.15em] mb-1">
                  {item.category} • {item.subCategory}
                </span>
                <h4 className="text-white text-base font-black tracking-wide max-w-[220px]">
                  {item.title}
                </h4>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="flex items-center gap-2 text-white font-bold text-xs bg-brand-green px-3.5 py-1.5 rounded-full">
                  <span>Lihat Preview</span>
                  <span>🔍</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-sm font-semibold text-gray-500">
              Tidak ada foto yang cocok dengan filter yang dipilih.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setActiveSub("all");
              }}
              className="mt-4 px-4 py-2 bg-brand-dark text-white rounded-full text-xs font-bold"
            >
              Reset Filter
            </button>
          </div>
        )}
      </section>

      {/* ─── Lightbox Modal ─────────────────────────────────────── */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-brand-dark border border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white relative"
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              ✕
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green">
              {activeImage.category} • {activeImage.subCategory}
            </span>
            <h3 className="text-2xl font-black tracking-wide mt-1 mb-4">
              {activeImage.title}
            </h3>

            <div className="aspect-[4/3] rounded-2xl bg-black/40 border border-white/10 flex flex-col items-center justify-center p-6 text-center mb-6">
              <span className="text-xs text-white/50 font-medium">
                Preview Portfolio Tegoer Sapa
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <Link
                href="/pricelist"
                className="flex-1 text-center py-2.5 rounded-full bg-brand-green text-white font-bold text-xs"
              >
                Cek Paket Terkait
              </Link>
              <button
                onClick={() => setActiveImage(null)}
                className="px-5 py-2.5 rounded-full bg-white/10 text-white font-bold text-xs hover:bg-white/20"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-dark flex items-center justify-center text-white text-sm font-bold">
          Memuat Galeri...
        </div>
      }
    >
      <GalleryContent />
    </Suspense>
  );
}
