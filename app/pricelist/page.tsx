"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { pricelistPackages, type PricePackage } from "@/lib/content";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { useBooking } from "@/lib/BookingContext";

import HeroClouds from "@/components/ui/HeroClouds";
import GrassyHill from "@/components/ui/GrassyHill";
import Button from "@/components/ui/Button";
import PhotoboothPricing from "@/components/sections/PhotoboothPricing";

export default function PricelistPage() {
  const router = useRouter();
  const { selectedPackage, selectPackage } = useBooking();

  // Tab state: "photobooth" or "graduation"
  const [activeTab, setActiveTab] = useState<"photobooth" | "graduation">("photobooth");

  // Read URL query / hash on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "graduation") {
        setActiveTab("graduation");
      } else if (tabParam === "photobooth") {
        setActiveTab("photobooth");
      } else if (window.location.hash.includes("graduation")) {
        setActiveTab("graduation");
      }
    }
  }, []);

  return (
    <div className="bg-white min-h-screen text-black">
      {/* ─── Hero Header ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 sm:pb-28 lg:pb-36 bg-brand-sky text-brand-dark overflow-hidden">
        {/* Floating Clouds Background */}
        <HeroClouds />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-center lg:text-left">
              <span className="hero-word">Daftar</span>{" "}
              <span className="hero-word hero-word-green">Harga</span>
            </h1>
            <div className="w-16 h-1 rounded-full bg-brand-dark my-5 mx-auto lg:mx-0" />
            <p className="text-base sm:text-lg text-brand-dark/80 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Transparansi harga untuk layanan <strong>Photobooth Instan</strong>, armada unik <strong>Bajaj Photobooth</strong>, dan dokumentasi <strong>Outdoor Graduation</strong> di Banjarbaru, Kalimantan Selatan.
            </p>
          </div>
        </div>

        {/* Grassy Hill Bottom Decoration */}
        <GrassyHill />
      </section>

      {/* ─── Main Content Section ───────────────────────────────── */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Navigation Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 bg-gray-50/80 border border-gray-200/80 p-2 sm:p-2.5 rounded-3xl">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("photobooth")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                activeTab === "photobooth"
                  ? "bg-brand-dark text-white shadow-md scale-101"
                  : "bg-white text-gray-600 hover:text-brand-dark hover:bg-gray-100"
              }`}
            >
              <span>📸</span>
              <span>Photobooth & Bajaj</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-brand-green text-white">
                Katalog Baru
              </span>
            </button>

            <button
              onClick={() => setActiveTab("graduation")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                activeTab === "graduation"
                  ? "bg-brand-dark text-white shadow-md scale-101"
                  : "bg-white text-gray-600 hover:text-brand-dark hover:bg-gray-100"
              }`}
            >
              <span>🎓</span>
              <span>Outdoor Graduation</span>
              <span className="text-[10px] text-gray-400 font-bold hidden sm:inline-block">
                ({pricelistPackages.length} Paket)
              </span>
            </button>
          </div>

          <div className="text-xs text-gray-500 font-medium self-center sm:self-auto text-center sm:text-right px-3">
            {activeTab === "photobooth" ? (
              <span>✨ Termasuk Opsi Print & No Print (2–6 Jam)</span>
            ) : (
              <span>✨ Format Unlimited Shoot & All Soft File</span>
            )}
          </div>
        </div>

        {/* ─── TAB 1: PHOTOBOOTH & BAJAJ PRICELIST ──────────────── */}
        {activeTab === "photobooth" && (
          <div className="animate-in fade-in duration-300">
            <PhotoboothPricing sourceUrl="/pricelist?tab=photobooth" />
          </div>
        )}

        {/* ─── TAB 2: OUTDOOR GRADUATION PRICELIST ──────────────── */}
        {activeTab === "graduation" && (
          <div className="animate-in fade-in duration-300 space-y-12">
            {/* Info Note according to pricelist.md */}
            <div className="p-4 sm:p-5 rounded-2xl bg-brand-cream/60 border border-brand-green/20 max-w-3xl mx-auto flex items-start gap-3.5 text-xs sm:text-sm text-brand-dark">
              <span className="text-base flex-shrink-0">🎓</span>
              <p className="leading-relaxed font-medium">
                <strong>Catatan:</strong> Seluruh paket <strong>Outdoor Graduation</strong> di bawah ini tercantum dengan harga transparan, fasilitas <em>unlimited shoot</em>, dan seluruh soft file lengkap.
              </p>
            </div>

            {/* Section Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green block">
                  Kategori Layanan
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-brand-dark">
                  Paket Outdoor Graduation
                </h2>
              </div>
              <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3.5 py-1.5 rounded-full">
                {pricelistPackages.length} Pilihan Paket
              </span>
            </div>

            {/* Packages Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {pricelistPackages.map((pkg: PricePackage) => {
                const waLink = generateWhatsAppLink(pkg.whatsappTemplate, pkg.nama);
                const isSelected = selectedPackage?.id === pkg.id;

                return (
                  <div
                    key={pkg.id}
                    className={[
                      "group flex flex-col justify-between rounded-3xl transition-all duration-300 overflow-hidden",
                      isSelected
                        ? "border-2 border-brand-green bg-white ring-4 ring-brand-green/10 shadow-lg"
                        : "border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-brand-green/30 hover:shadow-md",
                    ].join(" ")}
                  >
                    <div>
                      {/* Cover Photo */}
                      {pkg.image && (
                        <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-brand-dark">
                          <Image
                            src={pkg.image}
                            alt={pkg.nama}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                              {pkg.kategori}
                            </span>
                            {isSelected && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-green text-white shadow-sm">
                                ✓ Terpilih
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="p-6 sm:p-7">
                        {!pkg.image && (
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-green/10 text-brand-dark border border-brand-green/20">
                              {pkg.kategori}
                            </span>
                            {isSelected && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-green text-white">
                                ✓ Terpilih
                              </span>
                            )}
                          </div>
                        )}

                        <h3 className="text-2xl font-black text-brand-dark tracking-wide">
                          {pkg.nama}
                        </h3>
                        <div className="mt-2 flex items-center gap-2">
                          <span
                            className={
                              pkg.harga === "Hubungi Admin"
                                ? "text-xl sm:text-2xl font-black text-brand-dark"
                                : "text-2xl sm:text-3xl font-black text-brand-green"
                            }
                          >
                            {pkg.harga}
                          </span>
                          {pkg.harga === "Hubungi Admin" && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20">
                              Rate by Request
                            </span>
                          )}
                        </div>

                        <div className="w-full h-px bg-gray-200 my-6" />

                        {/* Feature list */}
                        <ul className="space-y-2.5">
                          {pkg.fitur.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 font-medium"
                            >
                              <span className="text-brand-green font-bold flex-shrink-0 mt-0.5">
                                ✓
                              </span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 sm:px-7 sm:pb-7 space-y-2">
                      <Button
                        type="button"
                        variant={isSelected ? "primary" : "dark"}
                        size="md"
                        className="w-full"
                        onClick={() => {
                          selectPackage(
                            {
                              id: pkg.id,
                              nama: pkg.nama,
                              harga: pkg.harga,
                              kategori: pkg.kategori,
                              fitur: pkg.fitur,
                            },
                            "/pricelist?tab=graduation"
                          );
                          router.push("/booking");
                        }}
                      >
                        <span>
                          {isSelected ? "✓ Paket Terpilih • Lanjut Form Booking" : "Pilih Paket Ini"}
                        </span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Button>

                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold text-gray-500 hover:text-brand-green transition-colors py-1"
                      >
                        <span>
                          {pkg.harga === "Hubungi Admin"
                            ? "Tanya Rate & Jadwal via WhatsApp"
                            : "Tanya via WhatsApp Langsung"}
                        </span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* ─── Footer Note & Other Services ───────────────────────── */}
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <p className="text-sm text-gray-600 font-medium">
            💡 Butuh dokumentasi <strong>Wedding</strong> atau <strong>Traditional Photography</strong>?{" "}
            <Link
              href="/photography/wedding"
              className="text-brand-green font-bold hover:underline"
            >
              Lihat Paket Wedding & Prewedding
            </Link>{" "}
            atau{" "}
            <Link
              href="/photography/traditional"
              className="text-brand-green font-bold hover:underline"
            >
              Dokumentasi Acara Adat
            </Link>.
          </p>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Tegoer Sapa • Banjarbaru, Kalimantan Selatan.
          </p>
        </div>
      </section>
    </div>
  );
}
