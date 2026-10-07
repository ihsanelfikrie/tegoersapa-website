"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { navLinks, navCta, brand } from "@/lib/content";
import Image from "next/image";
import Button from "@/components/ui/Button";

/**
 * Navbar global — sesuai Bagian 5 AGENT.md.
 * - Responsive: hamburger menu di mobile (animasi GSAP timeline)
 * - Active state via usePathname()
 * - next/link untuk semua navigasi internal
 * - Link eksternal (WhatsApp CTA) pakai rel="noopener noreferrer"
 * - Navbar shrink/glass saat scroll (ScrollTrigger toggleClass)
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Refs untuk elemen animasi
  const navbarRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerTopRef = useRef<HTMLSpanElement>(null);
  const hamburgerMidRef = useRef<HTMLSpanElement>(null);
  const hamburgerBotRef = useRef<HTMLSpanElement>(null);
  const menuTlRef = useRef<gsap.core.Timeline | null>(null);

  // Tutup mobile menu saat route berubah
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // GSAP: hamburger ↔ X animation + slide-down menu
  useGSAP(
    () => {
      const menu = mobileMenuRef.current;
      if (!menu) return;

      // Set awal: menu tersembunyi
      gsap.set(menu, { height: 0, opacity: 0, overflow: "hidden" });

      const tl = gsap.timeline({ paused: true });

      // Animasi hamburger → X
      tl.to(hamburgerTopRef.current, { y: 8, rotate: 45, duration: 0.25, ease: "power2.inOut" }, 0)
        .to(hamburgerMidRef.current, { opacity: 0, duration: 0.15 }, 0)
        .to(hamburgerBotRef.current, { y: -8, rotate: -45, duration: 0.25, ease: "power2.inOut" }, 0);

      // Slide-down menu dengan stagger pada link
      tl.to(
        menu,
        { height: "auto", opacity: 1, duration: 0.35, ease: "power3.out" },
        0.1,
      );

      tl.fromTo(
        menu.querySelectorAll("a, button"),
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.3, ease: "power2.out" },
        0.2,
      );

      menuTlRef.current = tl;
    },
    { scope: navbarRef },
  );


  // Toggle menu open/close
  function toggleMenu() {
    const tl = menuTlRef.current;
    if (!tl) return;
    if (isOpen) {
      tl.reverse();
    } else {
      tl.play();
    }
    setIsOpen((prev) => !prev);
  }

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
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-5"
        aria-label="Navigasi utama"
      >
        <div className="relative flex items-center justify-between">
          {/* Logo — pill gelap dengan efek cel-shaded shimmer tajam (tanpa blur, konsisten dengan hero section) */}
          <Link
            href="/"
            className="pointer-events-auto group relative flex items-center h-11 px-5 rounded-full bg-brand-dark border-b-[3px] border-black/40 hover:border-b-brand-green/80 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.03] active:translate-y-0.5 active:scale-[0.97] overflow-hidden select-none"
            aria-label={`${brand.name} — kembali ke beranda`}
          >
            {/* Cel-Shaded Crisp Light Sheen (Kasar & Tajam ala Hero Section Tanpa Blur) */}
            <span className="logo-sheen-cel" aria-hidden="true" />

            {/* Logo Image */}
            <div className="relative z-10 flex items-center transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-95">
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
          <ul className="pointer-events-auto hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 p-1.5 rounded-full bg-white border border-gray-200 border-b-[3px] border-b-gray-300">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const hasSub = Boolean(link.subItems && link.subItems.length > 0);

              return (
                <li key={link.href} className={hasSub ? "relative group" : ""}>
                  <Link
                    href={link.href}
                    className={[
                      "px-3.5 py-2 rounded-full text-sm font-semibold tracking-wide transition-colors duration-200 flex items-center gap-1.5",
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
                    >
                      <div
                        className={[
                          "p-2.5 rounded-2xl border transition-colors duration-200",
                          isDarkNav
                            ? "bg-brand-dark/95 border-white/10 text-white"
                            : "bg-white/95 border-gray-100 text-gray-900",
                        ].join(" ")}
                      >
                        <div className="px-3 py-2 border-b border-white/10 mb-1.5 flex items-center justify-between">
                          <div className="flex flex-col">
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

                        <div className="space-y-0.5">
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
                                <div className="text-xs font-bold tracking-wide flex items-center justify-between">
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
              onClick={toggleMenu}
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              id="navbar-hamburger"
              className={[
                "md:hidden flex flex-col justify-center items-center w-11 h-11 gap-0 p-2 rounded-full border border-b-[3px] transition-colors duration-200",
                isDarkNav
                  ? "bg-white/10 border-white/20 border-b-white/30 text-white"
                  : "bg-white border-gray-200 border-b-gray-300 text-brand-dark",
              ].join(" ")}
            >
              <span
                ref={hamburgerTopRef}
                className={[
                  "block w-6 h-0.5 rounded-full mb-1.5 transition-colors duration-200",
                  isDarkNav ? "bg-white" : "bg-brand-dark",
                ].join(" ")}
              />
              <span
                ref={hamburgerMidRef}
                className={[
                  "block w-6 h-0.5 rounded-full mb-1.5 transition-colors duration-200",
                  isDarkNav ? "bg-white" : "bg-brand-dark",
                ].join(" ")}
              />
              <span
                ref={hamburgerBotRef}
                className={[
                  "block w-6 h-0.5 rounded-full transition-colors duration-200",
                  isDarkNav ? "bg-white" : "bg-brand-dark",
                ].join(" ")}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          style={{ display: isOpen ? "block" : "none" }}
          className={[
            "pointer-events-auto md:hidden overflow-hidden mt-2 rounded-3xl max-h-[80vh] overflow-y-auto no-scrollbar shadow-2xl transition-colors duration-200",
            isDarkNav
              ? "bg-[#002716]/95 backdrop-blur-xl border border-white/15 text-white"
              : "bg-white/95 backdrop-blur-xl border border-gray-200 text-gray-800",
          ].join(" ")}
          aria-hidden={!isOpen}
        >
          <div className="px-4 pt-3 pb-5 flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const hasSub = Boolean(link.subItems && link.subItems.length > 0);

              return (
                <div key={link.href} className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={[
                        "flex-1 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-colors duration-150 min-h-[44px] flex items-center",
                        active
                          ? "bg-brand-green/20 text-brand-green font-bold"
                          : isDarkNav
                          ? "text-white/90 hover:text-white hover:bg-white/10"
                          : "text-gray-700 hover:text-brand-dark hover:bg-gray-100/70",
                      ].join(" ")}
                      aria-current={active ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </div>

                  {/* Sub-items in mobile menu */}
                  {hasSub && (
                    <div className="pl-4 pr-1 py-1 space-y-1 mb-1 border-l-2 border-brand-green/30 ml-4 my-1">
                      {link.subItems?.map((sub) => {
                        const isSubActive = pathname === sub.href;

                        return (
                          <Link
                            key={`${sub.label}-${sub.href}`}
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className={[
                              "block px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-150",
                              isSubActive
                                ? "bg-brand-green/15 text-brand-green font-bold"
                                : isDarkNav
                                ? "text-white/70 hover:text-brand-green hover:bg-white/5"
                                : "text-gray-600 hover:text-brand-green hover:bg-gray-50",
                            ].join(" ")}
                          >
                            <span className="font-semibold block">{sub.label}</span>
                            <span className="text-[10px] opacity-70 block">{sub.description}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* CTA — mobile */}
            <div className="mt-3">
              <Button
                href="/booking"
                variant="primary"
                size="md"
                className="w-full button-beg-click"
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
