"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { navLinks, navCta, brand } from "@/lib/content";
import Image from "next/image";
import Button from "@/components/ui/Button";

/**
 * Navbar global — sesuai Bagian 5 AGENT.md.
 * - Responsive: hamburger menu di mobile (animasi CSS GPU snappier & smooth)
 * - Accordion ringkas di mobile tanpa teks deskripsi panjang
 * - Easter egg: 3x klik logo untuk akses tersembunyi ke /links
 * - Active state via usePathname()
 * - next/link untuk semua navigasi internal
 * - Link eksternal (WhatsApp CTA) pakai rel="noopener noreferrer"
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const navbarRef = useRef<HTMLElement>(null);

  // Easter egg: hitung klik logo (klik 3 kali dalam interval 400ms untuk membuka /links)
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    clickCountRef.current += 1;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        try {
          navigator.vibrate(50);
        } catch {
          // ignore
        }
      }
      router.push("/links");
      return;
    }

    // Jika belum 3 klik berturut-turut, tunggu jeda (400ms); bila tidak ada klik susulan, navigasi ke beranda "/"
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
      router.push("/");
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
    };
  }, []);

  // Accordion sub-menu aktif di mobile (auto-expand jika sedang di rute terkait)
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>(() => {
    if (pathname.startsWith("/photography")) return "Photography";
    if (pathname.startsWith("/photobooth")) return "Photobooth";
    return null;
  });

  // Reset menu & update default accordion saat navigasi berpindah
  useEffect(() => {
    setIsOpen(false);
    if (pathname.startsWith("/photography")) {
      setExpandedSubMenu("Photography");
    } else if (pathname.startsWith("/photobooth")) {
      setExpandedSubMenu("Photobooth");
    } else {
      setExpandedSubMenu(null);
    }
  }, [pathname]);

  // Keyboard accessibility (Escape) dan Outside Click untuk menutup mobile menu
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Cek apakah link aktif (exact untuk Home, prefix untuk yang lain)
  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  // Navbar berupa pill melayang di atas konten: pill terang untuk menu, pill gelap untuk logo.
  const isDarkNav = false;

  return (
    <header
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      suppressHydrationWarning
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-5"
        aria-label="Navigasi utama"
        suppressHydrationWarning
      >
        <div className="relative flex items-center justify-between" suppressHydrationWarning>
          {/* Logo — pill gelap dengan efek cel-shaded shimmer tajam (3x klik untuk masuk ke /links) */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="pointer-events-auto group relative flex items-center h-11 px-5 rounded-full bg-brand-dark border-b-[3px] border-black/40 hover:border-b-brand-green/80 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.03] active:translate-y-0.5 active:scale-[0.97] overflow-hidden select-none"
            aria-label={`${brand.name} — kembali ke beranda`}
          >
            {/* Cel-Shaded Crisp Light Sheen (Kasar & Tajam ala Hero Section Tanpa Blur) */}
            <span className="logo-sheen-cel" aria-hidden="true" />

            {/* Logo Image */}
            <div
              className="relative z-10 flex items-center transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-95"
              suppressHydrationWarning
            >
              <Image
                src="/brand/logo-1-baris.svg"
                alt={brand.name}
                width={707}
                height={116}
                unoptimized
                priority
                className="h-5 w-auto"
              />
            </div>
          </Link>

          {/* Desktop navigation links */}
          <ul
            className="pointer-events-auto hidden md:flex items-center gap-0.5 lg:gap-1 absolute left-1/2 -translate-x-1/2 p-1.5 rounded-full bg-white border border-gray-200 border-b-[3px] border-b-gray-300"
            suppressHydrationWarning
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const hasSub = Boolean(link.subItems && link.subItems.length > 0);

              return (
                <li key={link.href} className={hasSub ? "relative group" : ""} suppressHydrationWarning>
                  <Link
                    href={link.href}
                    className={[
                      "px-2.5 lg:px-3.5 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-semibold tracking-wide transition-colors duration-200 flex items-center gap-1 lg:gap-1.5",
                      active
                        ? "bg-brand-dark text-white"
                        : "text-brand-dark hover:bg-brand-green/15",
                    ].join(" ")}
                    aria-current={active ? "page" : undefined}
                  >
                    <span>{link.label}</span>
                    {hasSub && (
                      <svg
                        className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-70 group-hover:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown Menu for Sub-items */}
                  {hasSub && (
                    <div
                      className="absolute top-full left-0 pt-2 w-80 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-200 ease-out z-50 transform origin-top -translate-y-1 group-hover:translate-y-0"
                      suppressHydrationWarning
                    >
                      <div
                        className={[
                          "p-2.5 rounded-2xl border transition-colors duration-200",
                          isDarkNav
                            ? "bg-brand-dark/95 border-white/10 text-white"
                            : "bg-white/95 border-gray-100 text-gray-900",
                        ].join(" ")}
                        suppressHydrationWarning
                      >
                        <div
                          className="px-3 py-2 border-b border-white/10 mb-1.5 flex items-center justify-between"
                          suppressHydrationWarning
                        >
                          <div className="flex flex-col" suppressHydrationWarning>
                            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-green">
                              Layanan
                            </span>
                            <span
                              className={[
                                "text-xs font-black tracking-wide mt-0.5",
                                isDarkNav ? "text-white" : "text-brand-dark",
                              ].join(" ")}
                            >
                              {link.label}
                            </span>
                          </div>
                          <Link
                            href={link.href}
                            className={[
                              "text-[11px] font-bold transition-all duration-150 flex items-center gap-1 px-2.5 py-1 rounded-full",
                              isDarkNav
                                ? "bg-white/10 hover:bg-brand-green text-white/80 hover:text-white"
                                : "bg-gray-100 hover:bg-brand-green text-gray-600 hover:text-white",
                            ].join(" ")}
                          >
                            <span>Lihat Semua</span>
                            <span aria-hidden="true">→</span>
                          </Link>
                        </div>

                        <div className="space-y-0.5" suppressHydrationWarning>
                          {link.subItems?.map((sub) => {
                            const isSubActive = pathname === sub.href;

                            return (
                              <Link
                                key={`${sub.label}-${sub.href}`}
                                href={sub.href}
                                className={[
                                  "block px-3 py-2.5 rounded-xl transition-all duration-150 group/item",
                                  isSubActive
                                    ? isDarkNav
                                      ? "bg-white/15 text-white"
                                      : "bg-brand-green/15 text-brand-dark"
                                    : isDarkNav
                                    ? "hover:bg-white/10 text-white/90 hover:text-white"
                                    : "hover:bg-brand-green/10 text-gray-800 hover:text-brand-dark",
                                ].join(" ")}
                              >
                                <div
                                  className="text-xs font-bold tracking-wide flex items-center justify-between"
                                  suppressHydrationWarning
                                >
                                  <span
                                    className={
                                      isSubActive
                                        ? "text-brand-green"
                                        : "group-hover/item:text-brand-green transition-colors duration-150"
                                    }
                                  >
                                    {sub.label}
                                  </span>
                                  <span
                                    className={[
                                      "text-[10px] transition-all duration-150 text-brand-green",
                                      isSubActive
                                        ? "opacity-100 translate-x-0"
                                        : "opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0",
                                    ].join(" ")}
                                  >
                                    ↗
                                  </span>
                                </div>
                                <p
                                  className={[
                                    "text-[11px] font-medium leading-snug mt-0.5",
                                    isDarkNav ? "text-white/50" : "text-gray-500",
                                  ].join(" ")}
                                >
                                  {sub.description}
                                </p>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA button + Mobile hamburger */}
          <div className="pointer-events-auto flex items-center gap-3">
            {/* CTA — desktop only (disembunyikan di mobile agar navbar bersih) */}
            <div className="hidden md:block">
              <Button
                href="/booking"
                id="navbar-cta-booking"
                variant="primary"
                size="md"
                className="button-beg-click text-sm font-bold tracking-wide px-5 h-11"
              >
                <span>{navCta.label}</span>
              </Button>
            </div>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              id="navbar-hamburger"
              className="md:hidden flex flex-col justify-center items-center w-11 h-11 rounded-full border border-gray-200 border-b-[3px] border-b-gray-300 bg-white text-brand-dark transition-all duration-200 active:scale-95 shadow-sm"
            >
              <span
                className={[
                  "block w-5 h-0.5 rounded-full bg-brand-dark transition-all duration-200 ease-out origin-center",
                  isOpen ? "translate-y-[6px] rotate-45" : "mb-1",
                ].join(" ")}
              />
              <span
                className={[
                  "block w-5 h-0.5 rounded-full bg-brand-dark transition-all duration-150 ease-out",
                  isOpen ? "opacity-0 scale-x-0" : "mb-1 opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "block w-5 h-0.5 rounded-full bg-brand-dark transition-all duration-200 ease-out origin-center",
                  isOpen ? "-translate-y-[6px] -rotate-45" : "",
                ].join(" ")}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu — ringkas, cepat, dan smooth */}
        <div
          id="mobile-menu"
          aria-hidden={!isOpen}
          suppressHydrationWarning
          className={[
            "pointer-events-auto md:hidden overflow-hidden mt-2 rounded-3xl max-h-[82vh] overflow-y-auto no-scrollbar shadow-2xl transition-all duration-200 ease-out origin-top",
            "bg-white/95 backdrop-blur-xl border border-gray-200/90 text-gray-800",
            isOpen
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-2 scale-[0.98] pointer-events-none invisible",
          ].join(" ")}
        >
          <div className="px-3.5 pt-3 pb-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const hasSub = Boolean(link.subItems && link.subItems.length > 0);
              const isExpanded = expandedSubMenu === link.label;

              return (
                <div key={link.href} className="flex flex-col" suppressHydrationWarning>
                  {hasSub ? (
                    <div
                      className="flex items-center justify-between rounded-xl hover:bg-gray-100/70 transition-colors"
                      suppressHydrationWarning
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={[
                          "flex-1 px-3.5 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-colors duration-150 flex items-center min-h-[42px]",
                          active
                            ? "bg-brand-green/20 text-brand-green font-bold"
                            : "text-gray-700 hover:text-brand-dark",
                        ].join(" ")}
                        aria-current={active ? "page" : undefined}
                      >
                        {link.label}
                      </Link>

                      {/* Accordion toggle button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setExpandedSubMenu(isExpanded ? null : link.label);
                        }}
                        aria-label={`${isExpanded ? "Tutup" : "Buka"} sub-layanan ${link.label}`}
                        aria-expanded={isExpanded}
                        className={[
                          "mr-1 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 flex items-center gap-1.5",
                          isExpanded
                            ? "bg-brand-green/15 text-brand-green"
                            : "bg-gray-100 text-gray-600 hover:text-brand-dark hover:bg-gray-200/70",
                        ].join(" ")}
                      >
                        <span className="text-[10px] font-bold text-brand-green">
                          {link.subItems?.length}
                        </span>
                        <svg
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-brand-green" : "text-gray-400"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={[
                        "w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-colors duration-150 flex items-center justify-between min-h-[42px]",
                        active
                          ? "bg-brand-green/20 text-brand-green font-bold"
                          : "text-gray-700 hover:text-brand-dark hover:bg-gray-100/70",
                      ].join(" ")}
                      aria-current={active ? "page" : undefined}
                    >
                      <span>{link.label}</span>
                    </Link>
                  )}

                  {/* Sub-items accordion with smooth CSS grid transition */}
                  {hasSub && (
                    <div
                      suppressHydrationWarning
                      className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                        isExpanded
                          ? "grid-rows-[1fr] opacity-100 my-1"
                          : "grid-rows-[0fr] opacity-0 my-0 pointer-events-none"
                      }`}
                    >
                      <div className="overflow-hidden" suppressHydrationWarning>
                        <div
                          className="pl-3.5 pr-1 py-1 space-y-1 border-l-2 border-brand-green/30 ml-4 my-0.5"
                          suppressHydrationWarning
                        >
                          <Link
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-bold text-brand-green bg-brand-green/10 hover:bg-brand-green/20 transition-colors"
                          >
                            <span>Semua Layanan {link.label}</span>
                            <span aria-hidden="true">→</span>
                          </Link>
                          {link.subItems?.map((sub) => {
                            const isSubActive = pathname === sub.href;

                            return (
                              <Link
                                key={`${sub.label}-${sub.href}`}
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className={[
                                  "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-150",
                                  isSubActive
                                    ? "bg-brand-green/20 text-brand-green font-bold"
                                    : "text-gray-600 hover:text-brand-dark hover:bg-gray-100/60",
                                ].join(" ")}
                              >
                                <span className="truncate">{sub.label}</span>
                                <span className="text-[10px] opacity-40 ml-2" aria-hidden="true">
                                  ↗
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* CTA — mobile */}
            <div className="mt-2 pt-2 border-t border-gray-100">
              <Button
                href="/booking"
                variant="primary"
                size="md"
                className="w-full button-beg-click justify-center text-sm font-bold"
                id="mobile-cta-booking"
                onClick={() => setIsOpen(false)}
              >
                <span>{navCta.label}</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
