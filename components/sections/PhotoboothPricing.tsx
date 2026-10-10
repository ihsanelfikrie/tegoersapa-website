"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import {
  photoboothPackages,
  photoboothBackdrops,
  type PhotoboothPackage,
} from "@/lib/content";
import { useBooking } from "@/lib/BookingContext";
import Button from "@/components/ui/Button";

interface PhotoboothPricingProps {
  sourceUrl?: string;
  showCategoryHeader?: boolean;
}

const DURATION_PRESETS = [2, 3, 4, 5, 6] as const;

function getPackagePricing(pkg: PhotoboothPackage, hours: number) {
  const exactTier = pkg.durations.find((d) => d.hours === hours);
  if (exactTier) {
    return {
      hours,
      durationLabel: `${hours} Jam`,
      harga: exactTier.harga,
      numericPrice: exactTier.numericPrice,
      extraHours: 0,
      extraCost: 0,
    };
  }

  // Jika durasi melebihi tier dasar (6 jam), hitung jam tambahan
  const base6 =
    pkg.durations.find((d) => d.hours === 6) ||
    pkg.durations[pkg.durations.length - 1];
  const extraHours = Math.max(0, hours - 6);
  const extraCost = extraHours * (pkg.additionalHourNumeric || 600000);
  const totalNumeric = (base6?.numericPrice || 0) + extraCost;
  const formattedHarga = `Rp ${totalNumeric.toLocaleString("id-ID")}`;

  return {
    hours,
    durationLabel: `${hours} Jam`,
    harga: formattedHarga,
    numericPrice: totalNumeric,
    extraHours,
    extraCost,
  };
}

export default function PhotoboothPricing({
  sourceUrl = "/pricelist",
  showCategoryHeader = true,
}: PhotoboothPricingProps) {
  const router = useRouter();
  const { selectedPackage, selectPackage } = useBooking();

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  // Kategori: "all" (semua), "regular" (photobooth biasa), "bajaj" (bajaj keliling), "photobox" (bilik mandiri & sewa event)
  const [activeCategory, setActiveCategory] = useState<"all" | "regular" | "bajaj" | "photobox">("all");

  // Durasi acara dalam jam (default: 3 Jam, paling umum dipilih)
  const [selectedHours, setSelectedHours] = useState<number>(3);

  // Filter paket berdasarkan kategori yang dipilih
  const filteredPackages = photoboothPackages.filter((pkg) => {
    if (activeCategory === "regular") return pkg.category === "Photobooth Reguler";
    if (activeCategory === "bajaj") return pkg.category === "Bajaj Photobooth";
    if (activeCategory === "photobox") return false;
    return true;
  });

  // Nomor resmi WhatsApp Photobooth
  const waNumber = "6281350655747";

  // GSAP: Numeric Punch saat ganti jam durasi
  useEffect(() => {
    if (!cardsGridRef.current) return;
    const prices = cardsGridRef.current.querySelectorAll(".price-numeric");
    if (prices.length > 0) {
      gsap.fromTo(
        prices,
        { scale: 0.94, opacity: 0.65 },
        { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)", stagger: 0.03 }
      );
    }
  }, [selectedHours]);

  // GSAP: Stagger Entrance Reveal & Smooth Hover Lift
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      if (cardsGridRef.current) {
        const cards = cardsGridRef.current.querySelectorAll<HTMLDivElement>(".pricing-card");
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.6,
              ease: "power2.out",
            }
          );

          cards.forEach((card) => {
            const yTo = gsap.quickTo(card, "y", { duration: 0.3, ease: "power2.out" });
            card.addEventListener("mouseenter", () => yTo(-6));
            card.addEventListener("mouseleave", () => yTo(0));
          });
        }
      }
    },
    { scope: containerRef, dependencies: [activeCategory] }
  );

  return (
    <div ref={containerRef} id="pricing-photobooth" className="space-y-6 sm:space-y-8">
      {/* ─── Header & Filter Controls ───────────────────────────── */}
      {showCategoryHeader && (
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
              Paket Photobooth, Bajaj &amp; Photobox
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              Pilihan cetak fisik instan unlimited, armada Bajaj, dan bilik privat mandiri untuk acaramu.
            </p>
          </div>

          {/* Controls: Tipe Booth & Durasi (Clean, Modern & Flat) */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Filter Tab Kategori */}
            <div className="inline-flex p-1 bg-gray-100 rounded-xl max-w-full overflow-x-auto no-scrollbar">
              {[
                { id: "all", label: "Semua" },
                { id: "regular", label: "Reguler" },
                { id: "bajaj", label: "Bajaj" },
                { id: "photobox", label: "Photobox" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? "bg-brand-dark text-white shadow-xs"
                      : "text-gray-500 hover:text-brand-dark"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Segmented Selector Durasi (Hanya untuk Paket Event Jam) */}
            {activeCategory !== "photobox" && (
              <div className="inline-flex items-center p-1 bg-gray-100 rounded-xl">
                <span className="text-[11px] font-bold text-gray-400 pl-2.5 pr-1.5 hidden sm:inline">
                  Durasi:
                </span>
                {DURATION_PRESETS.map((hrs) => (
                  <button
                    key={hrs}
                    type="button"
                    onClick={() => setSelectedHours(hrs)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedHours === hrs
                        ? "bg-brand-dark text-white shadow-xs"
                        : "text-gray-600 hover:text-brand-dark"
                    }`}
                  >
                    {hrs} Jam
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Kartu Paket Harga Photobooth & Bajaj ─────────────────── */}
      {activeCategory !== "photobox" && (
        <>
          <div
            ref={cardsGridRef}
            className={`grid gap-4 sm:gap-6 ${
              filteredPackages.length === 2
                ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {filteredPackages.map((pkg: PhotoboothPackage) => {
              const pricing = getPackagePricing(pkg, selectedHours);
              const isPrint = pkg.type === "print";
              const isSelected = selectedPackage?.id === pkg.id;
              const isBajaj = pkg.category === "Bajaj Photobooth";

              // Template WhatsApp resmi
              const waMessage = encodeURIComponent(
                `Halo kak Mau booking Photobooth Tegoer Sapa\n\nNama           : \nTanggal & Waktu: \nLokasi Acara   : \nInstagram      : \nPaket          : ${pkg.nama} (${pricing.durationLabel}${pricing.extraHours > 0 ? ` [Paket 6 Jam + ${pricing.extraHours} Jam Tambahan]` : ""} - ${pricing.harga})\n\nMohon info ketersediaan slot jadwalnya. Terima kasih!`
              );
              const waLink = `https://api.whatsapp.com/send?phone=${waNumber}&text=${waMessage}`;

              return (
                <div
                  key={pkg.id}
                  className={[
                    "pricing-card group relative flex flex-col justify-between rounded-3xl p-5 sm:p-6 transition-all duration-300",
                    isPrint
                      ? "bg-gradient-to-b from-[#fbfdfb] via-white to-[#f7faf8] border-2 border-[#1eab73]/40 shadow-xs hover:shadow-md hover:border-[#1eab73]"
                      : "bg-white border-2 border-gray-200/90 hover:border-gray-300 shadow-2xs hover:shadow-xs",
                    isSelected ? "ring-2 ring-[#1eab73] ring-offset-2" : "",
                  ].join(" ")}
                >
                  <div>
                    {/* Header Tag Bar */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                          isPrint
                            ? "bg-[#0f432a]/10 text-[#0f432a]"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {isBajaj ? "Bajaj Keliling" : "Photobooth"}
                      </span>

                      {isPrint ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#1eab73] text-white shadow-2xs">
                          <span className="text-[11px]">✦</span>
                          <span>Unlimited Print</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg bg-gray-100 text-gray-500">
                          Soft File QR
                        </span>
                      )}
                    </div>

                    {/* Badge Rekomendasi Khusus Paket Cetak */}
                    {isPrint && (
                      <div className="mb-2">
                        <span className="inline-flex items-center gap-1 text-[9.5px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#1eab73]/15 text-[#0f432a] border border-[#1eab73]/30">
                          ★ Best Value • Rekomendasi
                        </span>
                      </div>
                    )}

                    {/* Nama Paket */}
                    <h3 className="text-lg sm:text-xl font-black text-brand-dark tracking-tight leading-snug group-hover:text-[#0f432a] transition-colors">
                      {pkg.nama}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-medium mt-1 line-clamp-2 leading-relaxed">
                      {isPrint
                        ? "Tamu bawa pulang foto fisik cetak instan sepuasnya + soft file QR."
                        : "Tanpa cetak kertas, semua tamu langsung unduh soft file via scan QR."}
                    </p>

                    {/* Harga Utama dengan Efek Punch GSAP */}
                    <div className="my-4 pt-3.5 border-t border-gray-100">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="price-numeric text-2xl sm:text-3xl font-black text-brand-dark tracking-tight block">
                          {pricing.harga}
                        </span>
                        {pricing.extraHours > 0 && (
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-green/15 text-brand-dark border border-brand-green/20 shrink-0">
                            +{pricing.extraHours} Jam Extra
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-bold text-brand-green block mt-0.5">
                        {pricing.extraHours > 0
                          ? `Durasi ${pricing.hours} Jam (Paket 6 Jam + ${pricing.extraHours} Jam Tambahan)`
                          : `Durasi ${pricing.hours} Jam operasional acara`}
                      </span>
                    </div>

                    {/* Fasilitas Utama dengan Circular Icon Elegan */}
                    <ul className="space-y-2.5 mb-6 text-xs">
                      {isPrint ? (
                        <li className="flex items-start gap-2.5 font-bold text-brand-dark">
                          <span className="w-4 h-4 rounded-full bg-[#1eab73]/20 text-[#0f432a] flex items-center justify-center shrink-0 text-[10px] font-black mt-0.5">
                            ✓
                          </span>
                          <span>Unlimited Print (Strip 2R / 4R)</span>
                        </li>
                      ) : (
                        <li className="flex items-start gap-2.5 font-bold text-brand-dark">
                          <span className="w-4 h-4 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0 text-[10px] font-black mt-0.5">
                            ✓
                          </span>
                          <span>Digital File QR Code (Tanpa Cetak)</span>
                        </li>
                      )}
                      <li className="flex items-start gap-2.5 text-gray-600 font-medium">
                        <span className="w-4 h-4 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                          ✓
                        </span>
                        <span>Kamera DSLR &amp; Studio Lighting Pro</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-gray-600 font-medium">
                        <span className="w-4 h-4 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                          ✓
                        </span>
                        <span>Free Custom Desain Frame / Overlay</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-gray-600 font-medium">
                        <span className="w-4 h-4 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                          ✓
                        </span>
                        <span>Free GIF Animation &amp; Properti Seru</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-gray-600 font-medium">
                        <span className="w-4 h-4 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                          ✓
                        </span>
                        <span>5 Pilihan Warna Backdrop &amp; 2 Kru Standby</span>
                      </li>
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-3 border-t border-gray-100">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-extrabold text-xs transition-all shadow-xs group/btn cursor-pointer ${
                        isPrint
                          ? "bg-[#0f432a] hover:bg-[#1eab73] text-white"
                          : "bg-brand-green hover:bg-[#0f432a] text-white"
                      }`}
                    >
                      <span>Chat WhatsApp</span>
                      <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">↗</span>
                    </a>

                    <Button
                      type="button"
                      variant="stroke"
                      size="sm"
                      className={`w-full text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-[#0f432a] text-white border-[#0f432a]"
                          : isPrint
                          ? "hover:border-[#0f432a] hover:text-[#0f432a] border-gray-300"
                          : ""
                      }`}
                      onClick={() => {
                        selectPackage(
                          {
                            id: pkg.id,
                            nama: `${pkg.nama} (${pricing.durationLabel}${pricing.extraHours > 0 ? ` + ${pricing.extraHours} Jam Extra` : ""})`,
                            harga: pricing.harga,
                            kategori: pkg.category,
                            fitur: [
                              ...pkg.fitur,
                              pricing.extraHours > 0
                                ? `Durasi Operasional ${pricing.hours} Jam (Termasuk ${pricing.extraHours} Jam Tambahan)`
                                : `Durasi Operasional ${pricing.hours} Jam`,
                            ],
                          },
                          sourceUrl
                        );
                        router.push("/booking");
                      }}
                    >
                      <span>{isSelected ? "✓ Paket Dipilih" : "Pilih Paket Ini"}</span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ─── Kontrol & Catatan Tambahan Waktu ─────────────── */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand-cream/60 via-white to-brand-cream/60 border border-brand-green/25 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-brand-green/15 text-brand-dark flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
                </svg>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs sm:text-sm font-black text-brand-dark">
                    Butuh Waktu Lebih Panjang?
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-green/15 text-brand-dark border border-brand-green/20">
                    +Rp 600.000 / Jam
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-gray-600 mt-0.5">
                  {selectedHours > 6 ? (
                    <span>
                      Durasi saat ini: <strong className="text-brand-dark">{selectedHours} Jam</strong> (Paket 6 Jam + <strong>{selectedHours - 6} Jam tambahan</strong> senilai <strong>Rp {((selectedHours - 6) * 600000).toLocaleString("id-ID")}</strong>).
                    </span>
                  ) : (
                    <span>
                      Perpanjangan waktu tersedia langsung untuk semua paket. Klik tombol tambah jam untuk menyesuaikan durasi acara Anda.
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Stepper Tambahan Jam */}
            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end shrink-0">
              {selectedHours > 6 && (
                <button
                  type="button"
                  onClick={() => setSelectedHours(3)}
                  className="text-[11px] font-bold text-gray-500 hover:text-brand-dark px-2.5 py-1.5 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Reset ke 3 Jam
                </button>
              )}
              <div className="inline-flex items-center gap-1.5 p-1 bg-white rounded-xl border border-gray-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setSelectedHours((prev) => Math.max(2, prev - 1))}
                  disabled={selectedHours <= 2}
                  className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 flex items-center justify-center font-black text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                  aria-label="Kurangi durasi 1 jam"
                >
                  −
                </button>
                <span className="px-3 text-xs font-black text-brand-dark min-w-[70px] text-center">
                  {selectedHours} Jam
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedHours((prev) => Math.min(12, prev + 1))}
                  disabled={selectedHours >= 12}
                  className="w-8 h-8 rounded-lg bg-brand-green hover:bg-brand-green/90 text-white flex items-center justify-center font-black text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                  aria-label="Tambah durasi 1 jam"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Banner Teaser Photobox saat tab Semua aktif */}
          {activeCategory === "all" && (
            <div className="rounded-3xl bg-[#f8faf8] border-2 border-gray-200/90 p-5 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#0f432a] text-white flex items-center justify-center shrink-0 text-xl font-black">
                  📸
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-green/10 text-brand-green">
                      Bilik Mandiri &amp; Sewa Event
                    </span>
                    <span className="text-xs font-bold text-gray-400">
                      5 Titik Coffee Shop
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-brand-dark tracking-tight leading-snug">
                    Tersedia Opsi Photobox Mandiri &amp; Sewa Bilik Acara
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5 max-w-xl">
                    Nikmati bilik privat per sesi (Rp 25.000 – Rp 35.000) di 5 spot kafe Banjarbaru (Banjarmasin segera hadir), atau sewa bilik mandiri eksklusif untuk acara spesial Anda.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveCategory("photobox")}
                  className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-[#0f432a] hover:bg-brand-green text-white text-xs font-bold transition-all shadow-xs cursor-pointer text-center"
                >
                  Buka Pilihan Photobox →
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ─── Kartu Paket Harga Khusus Photobox ────────────────────── */}
      {activeCategory === "photobox" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {/* Card 1: Photobox Self-Service di Coffee Shop */}
            <div className="flex flex-col justify-between rounded-3xl p-5 sm:p-7 transition-all duration-200 border-2 border-gray-200 hover:border-gray-300 bg-white shadow-xs">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                    Bilik Mandiri Kafe
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-green/10 text-brand-green">
                    Buka Setiap Hari
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-brand-dark tracking-tight leading-snug">
                  Photobox Self-Service
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  Datang langsung ke 5 titik hangout coffee shop pilihan tanpa perlu reservasi jadwal.
                </p>

                <div className="my-5 pt-3 border-t border-gray-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
                      Rp 25.000 – Rp 35.000
                    </span>
                    <span className="text-xs text-gray-500 font-bold">/ sesi</span>
                  </div>
                  <span className="text-[11px] font-bold text-brand-green block mt-0.5">
                    Termasuk 2 lembar cetak fisik strip + soft file QR Code
                  </span>
                </div>

                <ul className="space-y-2.5 mb-6 text-xs">
                  <li className="flex items-start gap-2 font-bold text-brand-dark">
                    <span className="text-brand-green font-black">✓</span>
                    <span>Tersedia di 5 Spot Banjarbaru: Sirkem, Kéan, Hatara, Aime &amp; NoLima (Banjarmasin segera hadir)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600 font-medium">
                    <span className="text-brand-green font-bold">✓</span>
                    <span>Bilik foto privat tertutup tirai, bebas foto tanpa canggung</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600 font-medium">
                    <span className="text-brand-green font-bold">✓</span>
                    <span>Wireless shutter remote clicker &amp; monitor preview real-time</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600 font-medium">
                    <span className="text-brand-green font-bold">✓</span>
                    <span>Cetak instan cepat anti luntur dalam hitungan detik</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600 font-medium">
                    <span className="text-brand-green font-bold">✓</span>
                    <span>Bayar mandiri di mesin bilik foto (QRIS / Cash)</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2 pt-3 border-t border-gray-100">
                <a
                  href="#photobox"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-brand-dark hover:bg-brand-green text-white font-extrabold text-xs transition-colors shadow-xs"
                >
                  <span>Lihat Detail &amp; Lokasi 5 Spot Kafe</span>
                  <span>↓</span>
                </a>
                <Link
                  href="/gallery?kategori=photobox"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 text-brand-dark font-bold text-xs border border-gray-200 transition-colors"
                >
                  <span>Lihat Galeri Foto Photobox</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Card 2: Sewa Bilik Photobox untuk Event */}
            <div className="flex flex-col justify-between rounded-3xl p-5 sm:p-7 transition-all duration-200 border-2 border-brand-green/30 bg-brand-green/5 shadow-xs">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-green/15 text-brand-dark">
                    Sewa Bilik Acara
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-green text-white">
                    Unlimited Print
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-brand-dark tracking-tight leading-snug">
                  Sewa Photobox Event
                </h3>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  Bawa bilik photobox privat mandiri langsung ke venue pesta pernikahan, ulang tahun, atau gathering kantor.
                </p>

                <div className="my-5 pt-3 border-t border-brand-green/20">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
                      Mulai Rp 1.800.000
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-brand-green block mt-0.5">
                    Durasi operasional 2 – 6 Jam (Bisa custom kebutuhan acara)
                  </span>
                </div>

                <ul className="space-y-2.5 mb-6 text-xs">
                  <li className="flex items-start gap-2 font-bold text-brand-dark">
                    <span className="text-brand-green font-black">✓</span>
                    <span>Unlimited Cetak Foto Fisik Strip untuk seluruh tamu</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 font-medium">
                    <span className="text-brand-green font-bold">✓</span>
                    <span>Free Custom Desain Template Frame sesuai nama &amp; tema acara</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 font-medium">
                    <span className="text-brand-green font-bold">✓</span>
                    <span>Bilik photobox fisik premium, touchscreen &amp; remote shutter</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 font-medium">
                    <span className="text-brand-green font-bold">✓</span>
                    <span>Digital sharing instan via Scan QR Code di tempat</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 font-medium">
                    <span className="text-brand-green font-bold">✓</span>
                    <span>1-2 Kru operator standby memastikan operasional lancar</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2 pt-3 border-t border-brand-green/20">
                <a
                  href={`https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(
                    "Halo kak Mau tanya info & konsultasi paket Sewa Bilik Photobox Event Tegoer Sapa\n\nNama           : \nTanggal & Waktu: \nLokasi Acara   : \nEstimasi Tamu  : \n\nMohon info penawarannya yaa. Terima kasih!"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-brand-green hover:bg-brand-green/90 text-white font-extrabold text-xs transition-colors shadow-xs"
                >
                  <span>Chat WhatsApp Sewa Event</span>
                  <span aria-hidden="true">↗</span>
                </a>

                <Button
                  type="button"
                  variant="stroke"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => {
                    selectPackage(
                      {
                        id: "photobox-event",
                        nama: "Sewa Bilik Photobox Event",
                        harga: "Mulai Rp 1.800.000",
                        kategori: "Photobox Event",
                        fitur: [
                          "Bilik Photobox privat mandiri di lokasi acara",
                          "Unlimited print foto fisik strip untuk tamu",
                          "Free Custom template frame sesuai tema acara",
                          "Live QR Code sharing file digital di tempat",
                          "Kru teknisi operator standby di lokasi",
                        ],
                      },
                      sourceUrl
                    );
                    router.push("/booking");
                  }}
                >
                  <span>Pilih Paket Sewa Photobox</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Info Card CS Kendala Soft File Photobox */}
          <div className="max-w-5xl mx-auto p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-amber-200/70 text-amber-900 flex items-center justify-center font-black text-sm shrink-0">
                ⚡
              </span>
              <div>
                <span className="font-bold text-amber-900 block">
                  Pusat Bantuan Soft File Photobox
                </span>
                <span className="text-amber-800/80 font-medium">
                  Mengalami kendala saat scan QR barcode di mesin kafe? Hubungi WhatsApp tim teknis kami untuk pengiriman ulang file.
                </span>
              </div>
            </div>
            <a
              href="https://api.whatsapp.com/send?phone=62881080518887&text=Halo%20kak%20boleh%20minta%20soft%20file%20photobox%0ATanggal%20%3A%0AJam%20%3A%0AContoh%C2%A0Photonya%C2%A0%3A"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold whitespace-nowrap transition-colors shrink-0"
            >
              Hubungi CS Photobox ↗
            </a>
          </div>
        </div>
      )}

      {/* ─── Informasi Pendukung: Backdrop, Format Cetak, & Alur ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* 1. Backdrop */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green block mb-1">
              Fasilitas Gratis
            </span>
            <h4 className="text-sm font-black text-brand-dark mb-1">
              5 Pilihan Backdrop
            </h4>
            <p className="text-[11px] text-gray-500 font-medium mb-3">
              Kain satin premium elegan untuk melengkapi tema acaramu:
            </p>

            {/* 5 Real Visual Backdrop Swatches */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {photoboothBackdrops.map((b) => (
                <div
                  key={b.id}
                  className="group/backdrop flex flex-col items-center text-center"
                >
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50 transition-transform duration-200 group-hover/backdrop:scale-105 shadow-2xs">
                    <Image
                      src={b.image}
                      alt={`Pilihan Backdrop ${b.name}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-gray-700 mt-1 leading-tight truncate w-full">
                    {b.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Format Cetak */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green block mb-1">
            Pilihan Cetak
          </span>
          <h4 className="text-sm font-black text-brand-dark mb-2">
            Strip (2R) atau Tunggal (4R)
          </h4>
          <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
            Untuk paket cetak, bebas pilih format <strong>Strip (2R - 2 lembar)</strong> atau <strong>4R (1 lembar)</strong> dengan desain frame custom sesuai tema acara.
          </p>
        </div>

        {/* 3. Ketentuan DP */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green block mb-1">
            Ketentuan Pembayaran
          </span>
          <h4 className="text-sm font-black text-brand-dark mb-2">
            DP 30% Kunci Tanggal
          </h4>
          <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
            Booking diamankan dengan DP 30%. Pengumpulan materi desain H-7 dan pelunasan dilakukan H-1 acara.
          </p>
        </div>
      </div>
    </div>
  );
}
