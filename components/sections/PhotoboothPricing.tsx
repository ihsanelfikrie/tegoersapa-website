"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

const DURATIONS = [
  { label: "2 Jam", idx: 0 },
  { label: "3 Jam ★", idx: 1, popular: true },
  { label: "4 Jam", idx: 2 },
  { label: "5 Jam", idx: 3 },
  { label: "6 Jam", idx: 4 },
];

export default function PhotoboothPricing({
  sourceUrl = "/pricelist",
  showCategoryHeader = true,
}: PhotoboothPricingProps) {
  const router = useRouter();
  const { selectedPackage, selectPackage } = useBooking();

  // Kategori: "all" (semua), "regular" (photobooth biasa), "bajaj" (bajaj keliling)
  const [activeCategory, setActiveCategory] = useState<"all" | "regular" | "bajaj">("all");

  // Durasi serentak (default: index 1 -> 3 Jam, paling diminati)
  const [durationIdx, setDurationIdx] = useState<number>(1);

  // Filter paket berdasarkan kategori yang dipilih
  const filteredPackages = photoboothPackages.filter((pkg) => {
    if (activeCategory === "regular") return pkg.category === "Photobooth Reguler";
    if (activeCategory === "bajaj") return pkg.category === "Bajaj Photobooth";
    return true;
  });

  // Nomor resmi WhatsApp Photobooth
  const waNumber = "6281350655747";

  return (
    <div id="pricing-photobooth" className="space-y-6 sm:space-y-8">
      {/* ─── Header & Kategori Filter ───────────────────────────── */}
      {showCategoryHeader && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-gray-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full border border-brand-green/20">
              Katalog Resmi
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-brand-dark tracking-tight mt-1.5">
              Paket Photobooth & Bajaj
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
              Pilih tipe booth dan durasi acara Anda di bawah ini:
            </p>
          </div>

          {/* Filter Tab Kategori */}
          <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-2xl self-start sm:self-auto">
            {[
              { id: "all", label: "Semua (4)" },
              { id: "regular", label: "Reguler (2)" },
              { id: "bajaj", label: "Bajaj (2)" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? "bg-brand-dark text-white shadow-xs"
                    : "text-gray-500 hover:text-brand-dark"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── Selector Durasi Acara (Tersinkronisasi & Simpel) ──────── */}
      <div className="bg-brand-cream/50 border border-brand-green/20 p-3 sm:p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-base">⏱️</span>
          <div>
            <span className="text-xs sm:text-sm font-black text-brand-dark block">
              Pilih Durasi Acara:
            </span>
            <span className="text-[11px] text-gray-500 font-medium">
              Harga di bawah otomatis menyesuaikan durasi yang Anda pilih.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 sm:pb-0">
          {DURATIONS.map((d) => (
            <button
              key={d.label}
              type="button"
              onClick={() => setDurationIdx(d.idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                durationIdx === d.idx
                  ? "bg-brand-dark text-white shadow-sm ring-2 ring-brand-green/30 scale-102"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Kartu Paket Harga (Jelas, Terbaca, Tanpa Kerumitan) ───── */}
      <div
        className={`grid gap-4 sm:gap-6 ${
          filteredPackages.length === 2
            ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {filteredPackages.map((pkg: PhotoboothPackage) => {
          const currentTier = pkg.durations[durationIdx] || pkg.durations[1];
          const isPrint = pkg.type === "print";
          const isSelected = selectedPackage?.id === pkg.id;

          // Template WhatsApp resmi
          const waMessage = encodeURIComponent(
            `Halo kak Mau booking Photobooth Tegoer Sapa\n\nNama           : \nTanggal & Waktu: \nLokasi Acara   : \nInstagram      : \nPaket          : ${pkg.nama} (${currentTier.duration} - ${currentTier.harga})\n\nMohon info ketersediaan slot jadwalnya. Terima kasih!`
          );
          const waLink = `https://api.whatsapp.com/send?phone=${waNumber}&text=${waMessage}`;

          return (
            <div
              key={pkg.id}
              className={`flex flex-col justify-between rounded-3xl p-5 sm:p-6 transition-all duration-200 border-2 ${
                isPrint
                  ? "bg-white border-brand-green shadow-md ring-4 ring-brand-green/10"
                  : "bg-white border-gray-200 hover:border-gray-300 shadow-xs"
              }`}
            >
              <div>
                {/* Header Tag / Ribbon */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                    {pkg.category}
                  </span>
                  {isPrint ? (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-green text-white shadow-xs">
                      ⭐ Paling Populer
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                      Hemat Digital
                    </span>
                  )}
                </div>

                {/* Nama Paket */}
                <h3 className="text-lg sm:text-xl font-black text-brand-dark tracking-tight leading-snug">
                  {pkg.nama}
                </h3>
                <p className="text-[11px] text-gray-500 font-medium mt-1 line-clamp-2">
                  {isPrint
                    ? "Tamu bawa pulang foto fisik cetak instan sepuasnya + soft file QR."
                    : "Tanpa cetak kertas, semua tamu langsung unduh soft file via scan QR."}
                </p>

                {/* Harga Utama */}
                <div className="my-4 pt-3 border-t border-gray-100">
                  <span className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight block">
                    {currentTier.harga}
                  </span>
                  <span className="text-[11px] font-bold text-brand-green">
                    Durasi {currentTier.duration} operasional
                  </span>
                </div>

                {/* Fasilitas Utama (Ringkas & Mudah Dibaca) */}
                <ul className="space-y-2 mb-6">
                  {isPrint ? (
                    <li className="flex items-start gap-2 text-xs font-bold text-brand-dark">
                      <span className="text-brand-green">✓</span>
                      <span>Unlimited Print (Strip 2R / 4R)</span>
                    </li>
                  ) : (
                    <li className="flex items-start gap-2 text-xs font-bold text-brand-dark">
                      <span className="text-brand-green">✓</span>
                      <span>Digital File QR Code (Tanpa Cetak)</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2 text-xs text-gray-600 font-medium">
                    <span className="text-brand-green font-bold">✓</span>
                    <span>Kamera DSLR & Studio Lighting Pro</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-gray-600 font-medium">
                    <span className="text-brand-green font-bold">✓</span>
                    <span>Free Custom Desain Frame / Overlay</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-gray-600 font-medium">
                    <span className="text-brand-green font-bold">✓</span>
                    <span>Free GIF Animation & Properti Seru</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-gray-600 font-medium">
                    <span className="text-brand-green font-bold">✓</span>
                    <span>5 Pilihan Warna Backdrop & 2 Kru Standby</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-brand-green hover:bg-brand-green/90 text-white font-extrabold text-xs transition-colors shadow-xs"
                >
                  <span>Chat WhatsApp</span>
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
                        id: pkg.id,
                        nama: `${pkg.nama} (${currentTier.duration})`,
                        harga: currentTier.harga,
                        kategori: pkg.category,
                        fitur: pkg.fitur,
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

      {/* ─── Catatan Tambahan Waktu (Jelas & Ringkas) ─────────────── */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-gray-50 border border-gray-200/80 text-center text-xs text-gray-600 font-medium">
        <span>⏱️ Butuh waktu lebih dari 6 jam? </span>
        <strong className="text-brand-dark">Biaya tambahan waktu: Rp 600.000 / jam</strong>
        <span> untuk semua jenis paket.</span>
      </div>

      {/* ─── Informasi Pendukung: Backdrop, Format Cetak, & Alur ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* 1. Backdrop */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green block mb-1">
            Fasilitas Gratis
          </span>
          <h4 className="text-sm font-black text-brand-dark mb-2">
            5 Pilihan Warna Backdrop
          </h4>
          <div className="flex items-center gap-2 mt-2">
            {photoboothBackdrops.map((b) => (
              <span
                key={b.id}
                title={b.name}
                className="w-6 h-6 rounded-full border border-black/20 shadow-2xs"
                style={{ backgroundColor: b.colorHex }}
              />
            ))}
          </div>
          <p className="text-[11px] text-gray-500 font-medium mt-2">
            Merah, Forest Green, High School Blue, Classic Navy, & Warm Cream.
          </p>
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
