"use client";

import { useState } from "react";
import Link from "next/link";
import { pricelistPackages, type PricePackage } from "@/lib/content";
import { generateWhatsAppLink } from "@/lib/whatsapp";

const CATEGORIES = ["Semua", "Profesional Studio", "Outdoor Graduation"] as const;

export default function PricelistPage() {
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>("Semua");

  const filteredPackages = pricelistPackages.filter((pkg) => {
    if (selectedCategory === "Semua") return true;
    return pkg.kategori === selectedCategory;
  });

  return (
    <div className="bg-white min-h-screen text-black">
      {/* ─── Hero Header ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 bg-brand-dark text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green/15 border border-brand-green/30 text-brand-green text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Transparan & Terjangkau
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Daftar Harga & <span className="text-brand-green">Paket Layanan</span>
            </h1>
            <div className="w-14 h-1 rounded-full bg-brand-green my-5" />
            <p className="text-base sm:text-lg text-white/70 font-medium leading-relaxed">
              Pilihan paket dokumentasi foto profesional studio dan foto wisuda outdoor dengan kualitas visual terbaik dan harga transparan.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Filter & Packages Grid ─────────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={[
                "px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer",
                selectedCategory === cat
                  ? "bg-brand-dark text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-brand-dark",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredPackages.map((pkg: PricePackage) => {
            const waLink = generateWhatsAppLink(pkg.whatsappTemplate, pkg.nama);

            return (
              <div
                key={pkg.id}
                className="flex flex-col justify-between p-7 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-brand-green/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-green/10 text-brand-dark border border-brand-green/20">
                      {pkg.kategori}
                    </span>
                  </div>

                  <h2 className="text-2xl font-black text-brand-dark tracking-wide">
                    {pkg.nama}
                  </h2>
                  <div className="mt-2 text-2xl sm:text-3xl font-black text-brand-green">
                    {pkg.harga}
                  </div>

                  <div className="w-full h-px bg-gray-200 my-6" />

                  {/* Feature list */}
                  <ul className="space-y-2.5">
                    {pkg.fitur.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 font-medium">
                        <span className="text-brand-green font-bold flex-shrink-0 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-dark hover:bg-brand-green text-white font-bold text-xs tracking-wide px-5 py-3.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span>Book Now via WhatsApp</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Footer Note ────────────────────────────────────────── */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            💡 Butuh paket kustom untuk event corporate, photobooth instan, atau dokumentasi khusus lainnya?{" "}
            <Link href="/kontak" className="text-brand-green font-bold hover:underline">
              Hubungi tim kami untuk penawaran khusus
            </Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
