"use client";

import React, { useState } from "react";
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

const BASE_PRESETS = [
  { hours: 2, label: "2 Jam" },
  { hours: 3, label: "3 Jam", popular: true },
  { hours: 4, label: "4 Jam" },
  { hours: 5, label: "5 Jam" },
  { hours: 6, label: "6 Jam" },
  { hours: 7, label: "7 Jam" },
  { hours: 8, label: "8 Jam" },
];

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

  // Kategori: "all" (semua), "regular" (photobooth biasa), "bajaj" (bajaj keliling)
  const [activeCategory, setActiveCategory] = useState<"all" | "regular" | "bajaj">("all");

  // Durasi acara dalam jam (default: 3 Jam, paling diminati)
  const [selectedHours, setSelectedHours] = useState<number>(3);

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

      {/* ─── Selector Durasi Acara (Tersinkronisasi & Fleksibel) ───── */}
      <div className="bg-brand-cream/50 border border-brand-green/20 p-3 sm:p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-green/10 text-brand-dark flex items-center justify-center shrink-0" aria-hidden="true">
            <svg className="w-4 h-4 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black text-brand-dark block">
                Pilih Durasi Acara
              </span>
              {selectedHours > 6 && (
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-green text-white shadow-xs">
                  +{selectedHours - 6} Jam Tambahan
                </span>
              )}
            </div>
            <span className="text-[11px] text-gray-500 font-medium">
              Harga otomatis disesuaikan (tersedia 2 s/d 12 jam operasional).
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5 md:pb-0">
          <div className="flex items-center gap-1.5 shrink-0">
            {BASE_PRESETS.map((d) => (
              <button
                key={d.hours}
                type="button"
                onClick={() => setSelectedHours(d.hours)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  selectedHours === d.hours
                    ? "bg-brand-dark text-white shadow-sm ring-2 ring-brand-green/30 scale-102"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                <span>{d.label}</span>
                {d.popular && (
                  <span
                    className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-md ${
                      selectedHours === d.hours
                        ? "bg-brand-green text-white"
                        : "bg-brand-green/15 text-brand-dark"
                    }`}
                  >
                    Favorit
                  </span>
                )}
              </button>
            ))}

            {selectedHours > 8 && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-brand-dark text-white shadow-sm ring-2 ring-brand-green/30 scale-102 whitespace-nowrap">
                <span>{selectedHours} Jam</span>
                <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-md bg-brand-green text-white">
                  Kustom
                </span>
              </span>
            )}
          </div>

          {/* Stepper Tambah/Kurangi Jam */}
          <div className="flex items-center gap-1 pl-2 border-l border-brand-green/20 shrink-0">
            <button
              type="button"
              onClick={() => setSelectedHours((prev) => Math.max(2, prev - 1))}
              disabled={selectedHours <= 2}
              className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-black text-sm cursor-pointer"
              title="Kurangi 1 jam"
              aria-label="Kurangi 1 jam"
            >
              −
            </button>
            <button
              type="button"
              onClick={() => setSelectedHours((prev) => Math.min(12, prev + 1))}
              disabled={selectedHours >= 12}
              className="inline-flex items-center gap-1 px-2.5 h-8 rounded-xl bg-brand-green hover:bg-brand-green/90 text-white font-extrabold text-xs transition-all shadow-xs cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              title="Tambah 1 jam operasional"
            >
              <span className="text-sm font-black">+</span>
              <span className="hidden sm:inline">Tambah Jam</span>
            </button>
          </div>
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
          const pricing = getPackagePricing(pkg, selectedHours);
          const isPrint = pkg.type === "print";
          const isSelected = selectedPackage?.id === pkg.id;

          // Template WhatsApp resmi
          const waMessage = encodeURIComponent(
            `Halo kak Mau booking Photobooth Tegoer Sapa\n\nNama           : \nTanggal & Waktu: \nLokasi Acara   : \nInstagram      : \nPaket          : ${pkg.nama} (${pricing.durationLabel}${pricing.extraHours > 0 ? ` [Paket 6 Jam + ${pricing.extraHours} Jam Tambahan]` : ""} - ${pricing.harga})\n\nMohon info ketersediaan slot jadwalnya. Terima kasih!`
          );
          const waLink = `https://api.whatsapp.com/send?phone=${waNumber}&text=${waMessage}`;

          return (
            <div
              key={pkg.id}
              className="flex flex-col justify-between rounded-3xl p-5 sm:p-6 transition-all duration-200 border-2 border-gray-200 hover:border-gray-300 bg-white shadow-xs"
            >
              <div>
                {/* Header Tag / Ribbon */}
                <div className="flex items-center justify-between gap-2 mb-3 min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 truncate min-w-0">
                    {pkg.category}
                  </span>
                  {isPrint ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-dark text-white border border-brand-green/30 whitespace-nowrap shrink-0 shadow-xs">
                      <svg
                        className="w-2.5 h-2.5 text-brand-green shrink-0"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M8 0L9.79 6.21L16 8L9.79 9.79L8 16L6.21 9.79L0 8L6.21 6.21L8 0Z" />
                      </svg>
                      <span>Paling Dipilih</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 whitespace-nowrap shrink-0">
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
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight block">
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
                      : `Durasi ${pricing.hours} Jam operasional`}
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
