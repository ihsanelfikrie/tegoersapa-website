"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { navLinks, navCta, brand } from "@/lib/content";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Refs untuk elemen animasi
  const navbarRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerTopRef = useRef<HTMLSpanElement>(null);
  const hamburgerMidRef = useRef<HTMLSpanElement>(null);
  const hamburgerBotRef = useRef<HTMLSpanElement>(null);
  const menuTlRef = useRef<gsap.core.Timeline | null>(null);

  // Tutup mobile menu saat route berubah
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Navbar glass/solid effect saat scroll
  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <header
      ref={navbarRef}
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-brand-dark/95 backdrop-blur-md shadow-lg"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Navigasi utama"
      >
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo / Brand name */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label={`${brand.name} — kembali ke beranda`}
          >
            <span
              className="font-black text-xl lg:text-2xl tracking-widest text-white
                         transition-colors duration-200 group-hover:text-brand-green"
            >
              TEGOER
            </span>
            <span
              className="font-black text-xl lg:text-2xl tracking-widest text-brand-green"
            >
              SAPA
            </span>
          </Link>

          {/* Desktop navigation links */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={[
                    "relative px-3 py-2 text-sm font-semibold tracking-wide transition-colors duration-200",
                    "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full",
                    "after:transition-transform after:duration-200 after:origin-left",
                    isActive(link.href)
                      ? "text-brand-green after:bg-brand-green after:scale-x-100"
                      : "text-white/80 hover:text-white after:bg-brand-green after:scale-x-0 hover:after:scale-x-100",
                  ].join(" ")}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA button + Mobile hamburger */}
          <div className="flex items-center gap-3">
            {/* CTA — desktop */}
            <a
              href={navCta.href}
              target="_blank"
              rel="noopener noreferrer"
              id="navbar-cta-booking"
              className={[
                "hidden md:inline-flex items-center gap-2",
                "bg-brand-green hover:bg-brand-green/90 text-white",
                "text-sm font-bold tracking-wide px-5 py-2.5 rounded-full",
                "transition-all duration-200 hover:shadow-lg hover:shadow-brand-green/30",
                "hover:-translate-y-0.5 active:translate-y-0",
              ].join(" ")}
            >
              {navCta.label}
            </a>

            {/* Hamburger — mobile */}
            <button
              onClick={toggleMenu}
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              id="navbar-hamburger"
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-0 p-2"
            >
              <span
                ref={hamburgerTopRef}
                className="block w-6 h-0.5 bg-white rounded-full mb-1.5"
              />
              <span
                ref={hamburgerMidRef}
                className="block w-6 h-0.5 bg-white rounded-full mb-1.5"
              />
              <span
                ref={hamburgerBotRef}
                className="block w-6 h-0.5 bg-white rounded-full"
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="md:hidden overflow-hidden bg-brand-dark/98 backdrop-blur-md rounded-b-2xl"
          aria-hidden={!isOpen}
        >
          <div className="px-4 pt-3 pb-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-colors duration-150",
                  isActive(link.href)
                    ? "bg-brand-green/15 text-brand-green"
                    : "text-white/80 hover:text-white hover:bg-white/5",
                ].join(" ")}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}

            {/* CTA — mobile */}
            <a
              href={navCta.href}
              target="_blank"
              rel="noopener noreferrer"
              id="mobile-cta-booking"
              className={[
                "mt-2 flex items-center justify-center gap-2",
                "bg-brand-green text-white text-sm font-bold tracking-wide",
                "px-5 py-3 rounded-xl transition-colors duration-150 hover:bg-brand-green/90",
              ].join(" ")}
            >
              {navCta.label}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
