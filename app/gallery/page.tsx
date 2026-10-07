"use client";

import { useState, useEffect, Suspense, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { galleryPhotos, galleryCategories, type GalleryPhotoItem } from "@/lib/content";
import HeroClouds from "@/components/ui/HeroClouds";
import GrassyHill from "@/components/ui/GrassyHill";
import Button from "@/components/ui/Button";

function GalleryContent() {
  const searchParams = useSearchParams();
  const paramKat = searchParams.get("kategori");
  const paramSub = searchParams.get("sub");

  const [activeCategory, setActiveCategory] = useState(paramKat || "all");
  const [activeSub, setActiveSub] = useState(paramSub || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeImage, setActiveImage] = useState<GalleryPhotoItem | null>(null);

  // Pagination mobile agar tidak perlu scroll terlalu jauh (12 foto per halaman)
  const MOBILE_PAGE_SIZE = 12;
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(MOBILE_PAGE_SIZE);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Deteksi mobile (desktop tetap tampil penuh setelah mount)
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      const mob = window.innerWidth < 768;
      setIsMobile(mob);
      if (!mob) {
        setVisibleCount(999);
      } else {
        setVisibleCount(MOBILE_PAGE_SIZE);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [prevParams, setPrevParams] = useState({ kat: paramKat, sub: paramSub });
  if (prevParams.kat !== paramKat || prevParams.sub !== paramSub) {
    setPrevParams({ kat: paramKat, sub: paramSub });
    if (paramKat) setActiveCategory(paramKat);
    if (paramSub) setActiveSub(paramSub);
  }

  // Reset pagination saat filter/search berubah pada mobile
  useEffect(() => {
    if (isMobile) {
      setVisibleCount(MOBILE_PAGE_SIZE);
    }
  }, [activeCategory, activeSub, searchQuery, isMobile]);

  const currentCategoryData = galleryCategories.find((c) => c.id === activeCategory);

  // Filter items based on Category, Subcategory, and Search query
  const filteredItems = useMemo(() => {
    return galleryPhotos.filter((item) => {
      // 1. Category Filter
      if (activeCategory !== "all") {
        if (item.categorySlug !== activeCategory) {
          return false;
        }
      }

      // 2. Subcategory Filter
      if (activeSub !== "all") {
        if (item.subCategorySlug !== activeSub) {
          return false;
        }
      }

      // 3. Search Query Filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query);
        const matchSub = item.subCategory.toLowerCase().includes(query);
        if (!matchTitle && !matchCategory && !matchSub) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, activeSub, searchQuery]);

  // Items yang ditampilkan saat ini (SSR & initial hydration render 12 foto identik, setelah mount di desktop langsung 999)
  const displayedItems = useMemo(() => {
    if (mounted && !isMobile) return filteredItems;
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount, mounted, isMobile]);

  const hasMore = mounted ? isMobile && visibleCount < filteredItems.length : false;
  const remainingCount = Math.max(0, filteredItems.length - visibleCount);

  // Counts for tabs
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: galleryPhotos.length,
      professional: 0,
      photobooth: 0,
      photobox: 0,
    };
    galleryPhotos.forEach((item) => {
      if (counts[item.categorySlug] !== undefined) {
        counts[item.categorySlug]++;
      }
    });
    return counts;
  }, []);

  // Subcategory counts within current active category
  const subCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const relevant = activeCategory === "all"
      ? galleryPhotos
      : galleryPhotos.filter((i) => i.categorySlug === activeCategory);
    relevant.forEach((item) => {
      counts[item.subCategorySlug] = (counts[item.subCategorySlug] || 0) + 1;
    });
    return counts;
  }, [activeCategory]);

  // Modal navigation (Next / Prev / Keyboard)
  const currentIndex = useMemo(() => {
    if (!activeImage) return -1;
    return filteredItems.findIndex((it) => it.id === activeImage.id);
  }, [activeImage, filteredItems]);

  // Check if current active photo is a studio shoot
  const isStudioPhoto = Boolean(
    activeImage &&
      (activeImage.subCategorySlug === "indoor-graduation" ||
        activeImage.subCategory.toLowerCase().includes("studio") ||
        activeImage.subCategory.toLowerCase().includes("indoor") ||
        activeImage.title.toLowerCase().includes("studio") ||
        (activeImage.image && activeImage.image.toLowerCase().includes("ingraduation")))
  );

  const handleNext = useCallback(() => {
    if (filteredItems.length === 0) return;
    if (currentIndex >= 0 && currentIndex < filteredItems.length - 1) {
      setActiveImage(filteredItems[currentIndex + 1]);
    } else {
      setActiveImage(filteredItems[0]); // Loop back to start
    }
  }, [currentIndex, filteredItems]);

  const handlePrev = useCallback(() => {
    if (filteredItems.length === 0) return;
    if (currentIndex > 0) {
      setActiveImage(filteredItems[currentIndex - 1]);
    } else {
      setActiveImage(filteredItems[filteredItems.length - 1]); // Loop to end
    }
  }, [currentIndex, filteredItems]);

  // Swipe navigation di modal
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStart(null);
  };

  useEffect(() => {
    if (!activeImage) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
      } else if (e.key === "ArrowRight") {
        setActiveImage((prev) => {
          if (!prev) return null;
          const idx = filteredItems.findIndex((it) => it.id === prev.id);
          if (idx >= 0 && idx < filteredItems.length - 1) {
            return filteredItems[idx + 1];
          }
          return filteredItems[0] || null;
        });
      } else if (e.key === "ArrowLeft") {
        setActiveImage((prev) => {
          if (!prev) return null;
          const idx = filteredItems.findIndex((it) => it.id === prev.id);
          if (idx > 0) {
            return filteredItems[idx - 1];
          }
          return filteredItems[filteredItems.length - 1] || null;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage, filteredItems]);

  return (
    <div className="bg-white min-h-screen text-black" suppressHydrationWarning>
      {/* ─── Hero Header ────────────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-32 pb-14 sm:pb-28 lg:pb-36 bg-brand-sky text-brand-dark overflow-hidden">
        {/* Floating Clouds Background */}
        <HeroClouds />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-center lg:text-left">
              <span className="hero-word">Galeri</span>{" "}
              <span className="hero-word hero-word-green">Portofolio</span>
            </h1>
            <div className="w-12 sm:w-16 h-1 rounded-full bg-brand-dark my-3 sm:my-5 mx-auto lg:mx-0" />
            <p className="text-xs sm:text-base lg:text-lg text-brand-dark/80 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Arsip visual lengkap {galleryPhotos.length} momen berkesan yang telah kami abadikan — mulai dari photobooth resepsi & event meriah, photobox ekspresif, hingga fotografi pre-wedding dan wisuda kampus.
            </p>
          </div>
        </div>

        {/* Grassy Hill Bottom Decoration */}
        <GrassyHill />
      </section>

      {/* ─── Filter & Search Control Bar ────────────────────────── */}
      <section className="py-3.5 sm:py-6 bg-white/95 border-b border-gray-100 sticky top-16 z-30 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4">
            
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-0.5 flex-nowrap sm:flex-wrap">
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setActiveSub("all");
                }}
                className={[
                  "whitespace-nowrap flex-shrink-0 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 sm:gap-2",
                  activeCategory === "all"
                    ? "bg-brand-dark text-white shadow-md shadow-brand-dark/20"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-brand-dark border border-gray-200/80",
                ].join(" ")}
              >
                <span>Semua Foto</span>
                <span className={[
                  "px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] font-black",
                  activeCategory === "all" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                ].join(" ")}>
                  {categoryCounts.all}
                </span>
              </button>

              {galleryCategories.map((cat) => {
                const count = categoryCounts[cat.id] || 0;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setActiveSub("all");
                    }}
                    className={[
                      "whitespace-nowrap flex-shrink-0 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 sm:gap-2",
                      isActive
                        ? "bg-brand-dark text-white shadow-md shadow-brand-dark/20"
                        : "bg-white text-gray-600 hover:bg-gray-100 hover:text-brand-dark border border-gray-200/80",
                    ].join(" ")}
                  >
                    <span>{cat.label}</span>
                    <span className={[
                      "px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] font-black",
                      isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    ].join(" ")}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-72 flex-shrink-0">
              <input
                type="text"
                placeholder="Cari foto atau momen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-full pl-8 sm:pl-10 pr-8 sm:pr-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
              />
              <svg
                className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400 absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs w-4 h-4 rounded-full flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Sub-Category Pills (if active category has subcategories) */}
          {currentCategoryData && currentCategoryData.subs.length > 0 && (
            <div className="flex items-center gap-1.5 sm:gap-2 mt-2.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-gray-200/60 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 flex-nowrap sm:flex-wrap">
              <span className="text-[11px] sm:text-xs font-semibold text-gray-400 mr-1 hidden sm:inline-block">
                Sub-kategori:
              </span>
              <button
                onClick={() => setActiveSub("all")}
                className={[
                  "whitespace-nowrap flex-shrink-0 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all cursor-pointer flex items-center gap-1",
                  activeSub === "all"
                    ? "bg-brand-green text-white shadow-xs font-bold"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                ].join(" ")}
              >
                <span>Semua {currentCategoryData.label}</span>
                <span className="text-[10px] opacity-80">({categoryCounts[activeCategory] || 0})</span>
              </button>
              {currentCategoryData.subs.map((sub) => {
                const subCount = subCategoryCounts[sub.id] || 0;
                const isSubActive = activeSub === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSub(sub.id)}
                    className={[
                      "whitespace-nowrap flex-shrink-0 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all cursor-pointer flex items-center gap-1",
                      isSubActive
                        ? "bg-brand-green text-white shadow-xs font-bold"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                    ].join(" ")}
                  >
                    <span>{sub.label}</span>
                    <span className="text-[10px] opacity-80">({subCount})</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ─── Gallery Grid / Masonry ─────────────────────────────── */}
      <section className="py-6 sm:py-12 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8" suppressHydrationWarning>
        {/* Results Counter */}
        <div className="flex items-center justify-between mb-4 sm:mb-8 pb-2.5 sm:pb-3 border-b border-gray-100">
          <p className="text-xs sm:text-sm font-semibold text-gray-500">
            Menampilkan <span className="font-bold text-brand-dark">{displayedItems.length}</span> dari <span className="font-bold text-brand-dark">{filteredItems.length}</span> karya
            {activeCategory !== "all" && (
              <> dalam <span className="text-brand-green font-bold">{currentCategoryData?.label}</span></>
            )}
            {activeSub !== "all" && (
              <> • <span className="text-brand-dark font-semibold">{currentCategoryData?.subs.find(s => s.id === activeSub)?.label}</span></>
            )}
          </p>

          {(activeCategory !== "all" || activeSub !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory("all");
                setActiveSub("all");
                setSearchQuery("");
              }}
              className="text-xs font-bold text-brand-green hover:underline cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Masonry Columns: 2 kolom di mobile agar ringkas & hemat scroll, 3-4 kolom di desktop */}
        <div
          className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-2.5 sm:gap-5 space-y-2.5 sm:space-y-5"
          suppressHydrationWarning
        >
          {displayedItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="break-inside-avoid group relative block overflow-hidden rounded-xl sm:rounded-2xl bg-brand-dark cursor-pointer ring-1 ring-black/5 hover:ring-2 hover:ring-brand-green transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-xl active:scale-[0.98]"
            >
              {/* Natural Image display with original proportions */}
              <div
                className={[
                  "relative w-full overflow-hidden",
                  item.aspectRatio === "landscape" ? "aspect-[3/2]" : "aspect-[2/3]",
                ].join(" ")}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={index < 4}
                  loading={index < 4 ? undefined : "lazy"}
                />

                {/* Subtle category badge on top */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                  <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-black/65 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold tracking-wider uppercase border border-white/10 truncate max-w-[110px] sm:max-w-none block">
                    {item.subCategory}
                  </span>
                </div>

                {/* Mobile clean caption + Desktop hover overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2 sm:p-5 flex flex-col justify-end sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
                  <span className="hidden sm:inline-block text-[10px] text-brand-green font-bold uppercase tracking-wider mb-1">
                    {item.category} • {item.subCategory}
                  </span>
                  <h4 className="text-white text-[11px] sm:text-base font-bold sm:font-black tracking-wide line-clamp-1 sm:line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="hidden sm:flex mt-3 items-center gap-1.5 text-white/90 text-[11px] font-bold">
                    <span>Lihat Fullsize</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination / Load More Controls agar tidak scroll terlalu jauh */}
        {hasMore && (
          <div className="mt-8 pt-4 flex flex-col items-center justify-center gap-3">
            <div className="text-xs font-semibold text-gray-500 flex items-center gap-2">
              <span>Menampilkan {displayedItems.length} dari {filteredItems.length} foto</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
              <span className="text-brand-green font-bold">{remainingCount} lainnya</span>
            </div>

            {/* Progress bar visual */}
            <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-green transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(100, (displayedItems.length / filteredItems.length) * 100)}%` }}
              />
            </div>

            <div className="flex items-center gap-2.5 mt-1 w-full max-w-xs">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + MOBILE_PAGE_SIZE)}
                className="flex-1 py-2.5 px-4 rounded-full bg-brand-dark hover:bg-brand-green text-white text-xs font-bold tracking-wide transition-all duration-200 shadow-md shadow-brand-dark/10 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Muat {Math.min(MOBILE_PAGE_SIZE, remainingCount)} Foto Lagi</span>
                <span>↓</span>
              </button>

              <button
                type="button"
                onClick={() => setVisibleCount(filteredItems.length)}
                className="py-2.5 px-3.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold tracking-wide transition-colors duration-150 active:scale-95 cursor-pointer"
              >
                Semua ({filteredItems.length})
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 sm:py-24 bg-gray-50 rounded-3xl border border-dashed border-gray-200 px-4">
            <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 sm:w-7 h-6 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-brand-dark mb-1">
              Tidak ada foto yang cocok
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto mb-6">
              Tidak ditemukan foto untuk filter atau pencarian &ldquo;{searchQuery}&rdquo;. Silakan ubah kata kunci atau reset filter.
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setActiveCategory("all");
                setActiveSub("all");
                setSearchQuery("");
              }}
            >
              <span>Tampilkan Semua {galleryPhotos.length} Foto</span>
            </Button>
          </div>
        )}
      </section>

      {/* ─── Lightbox Modal with Full-Screen Carousel & Mobile Swipe ── */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-all animate-fadeIn"
        >
          {/* Modal Close Button (Top-Right) */}
          <button
            onClick={() => setActiveImage(null)}
            className="fixed top-3 right-3 sm:top-5 sm:right-5 z-50 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm sm:text-lg font-bold transition-all hover:scale-105 cursor-pointer shadow-lg"
            aria-label="Tutup preview"
          >
            ✕
          </button>

          {/* Modal Navigation: Previous (Left) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-brand-green border border-white/20 text-white flex items-center justify-center text-base sm:text-xl font-bold transition-all hover:scale-110 shadow-xl cursor-pointer"
            aria-label="Foto sebelumnya"
          >
            ‹
          </button>

          {/* Modal Navigation: Next (Right) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-brand-green border border-white/20 text-white flex items-center justify-center text-base sm:text-xl font-bold transition-all hover:scale-110 shadow-xl cursor-pointer"
            aria-label="Foto selanjutnya"
          >
            ›
          </button>

          {/* Modal Content Box with touch swipe support */}
          <div
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center justify-center overflow-y-auto no-scrollbar"
          >
            {/* Image Container */}
            <div className="relative w-full max-h-[46vh] sm:max-h-[72vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/40">
              <div className={[
                "relative max-w-full max-h-[46vh] sm:max-h-[72vh] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10",
                activeImage.aspectRatio === "landscape" ? "w-[850px] aspect-[3/2]" : "w-[520px] aspect-[2/3]"
              ].join(" ")}>
                <Image
                  src={activeImage.image}
                  alt={activeImage.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Bottom Caption & Action Bar */}
            <div className="w-full max-w-xl mt-2.5 sm:mt-4 bg-brand-dark/95 border border-white/10 rounded-2xl p-3 sm:p-5 text-white shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3 mb-1.5 sm:mb-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-green bg-brand-green/15 border border-brand-green/30 px-2 py-0.5 sm:px-2.5 rounded-full truncate max-w-[200px]">
                  {activeImage.category} • {activeImage.subCategory}
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-white/50 shrink-0">
                  {currentIndex + 1} / {filteredItems.length}
                </span>
              </div>

              <h3 className="text-sm sm:text-lg font-black tracking-wide text-white mb-2 sm:mb-3 line-clamp-2">
                {activeImage.title}
              </h3>

              {/* Studio Unavailable Notice */}
              {isStudioPhoto && (
                <div className="mb-2.5 sm:mb-3 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center gap-2 text-xs text-amber-200">
                  <span className="font-medium text-[11px] sm:text-xs">
                    Layanan Studio Profesional saat ini sedang tidak tersedia untuk booking.
                  </span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-white/10">
                {isStudioPhoto ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        alert(
                          "Mohon maaf, layanan Studio Professional saat ini sedang tidak tersedia untuk booking. Anda tetap dapat menikmati portofolio kami di galeri atau memilih paket foto outdoor wisuda & event yang tersedia."
                        );
                      }}
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 font-bold text-xs tracking-wide transition-all duration-200 cursor-pointer"
                    >
                      <span>Studio Sedang Tidak Tersedia</span>
                    </button>
                    <Button
                      href="/pricelist"
                      variant="white"
                      size="sm"
                      className="w-full sm:w-auto text-xs"
                    >
                      Lihat Paket Lain
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      href={`https://api.whatsapp.com/send?phone=6282254092927&text=${encodeURIComponent(
                        `Halo kak! Saya ingin tanya paket atau booking untuk referensi foto portofolio: "${activeImage.title}" (${activeImage.subCategory})`
                      )}`}
                      variant="primary"
                      size="sm"
                      className="w-full sm:flex-1 text-xs"
                    >
                      <span>Tanya Booking via WA</span>
                      <span aria-hidden="true">↗</span>
                    </Button>
                    <Button
                      href="/pricelist"
                      variant="white"
                      size="sm"
                      className="w-full sm:w-auto text-xs"
                    >
                      Cek Pricelist
                    </Button>
                  </>
                )}
              </div>
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
          Memuat Galeri Portofolio...
        </div>
      }
    >
      <GalleryContent />
    </Suspense>
  );
}
