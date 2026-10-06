"use client";

import Link from "next/link";
import Image from "next/image";
import { brand, navLinks, contact } from "@/lib/content";

/**
 * Footer global untuk website Tegoer Sapa.
 * Menampilkan sitemap ringkas, kontak cepat, dan link social media.
 * Menggunakan background brand-dark (#014126) dengan kontras tinggi.
 */
export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-white/10">
          
          {/* Brand Info (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-start">
            <Link href="/" className="block mb-6" aria-label={`${brand.name} — kembali ke beranda`}>
              <Image src="/brand/logo-2-baris.svg" alt={brand.name} width={1258} height={1258} unoptimized className="w-32 h-32 object-contain" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 font-medium">
              {brand.tagline}
            </p>
            <p className="text-white/50 text-xs leading-relaxed font-medium">
              Penyedia jasa photobooth, photobox, dan professional photography berkualitas tinggi untuk setiap perayaan berharga Anda.
            </p>
          </div>

          {/* Sitemap Quick Links (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-green mb-6">
              Peta Situs
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-green mb-6">
              Hubungi Kami
            </h4>
            <ul className="space-y-4">
              {contact.whatsapp.map((wa) => (
                <li key={wa.label}>
                  <span className="block text-xs text-white/40 uppercase tracking-wider font-semibold">
                    WA {wa.label}
                  </span>
                  <a
                    href={`https://wa.me/${wa.raw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:text-brand-green transition-colors duration-200 font-bold tracking-wide mt-1 inline-block"
                  >
                    {wa.number}
                  </a>
                </li>
              ))}
              <li>
                <span className="block text-xs text-white/40 uppercase tracking-wider font-semibold">
                  Email
                </span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-white hover:text-brand-green transition-colors duration-200 font-bold mt-1 inline-block"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links (2 cols) */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-green mb-6">
              Media Sosial
            </h4>
            <ul className="space-y-4">
              {contact.social.map((soc) => (
                <li key={soc.handle}>
                  <a
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold">
                      {soc.platform}
                    </span>
                    <span className="font-bold tracking-wide mt-0.5">{soc.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 font-medium">
          <p>© {new Date().getFullYear()} {brand.name}. Seluruh hak cipta dilindungi.</p>
          <p className="mt-2 sm:mt-0">
            Didesain & Dikembangkan dengan ❤️ di Medan
          </p>
        </div>
      </div>
    </footer>
  );
}
