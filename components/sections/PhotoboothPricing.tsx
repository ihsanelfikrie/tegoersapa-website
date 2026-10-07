"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  photoboothPackages,
  photoboothBackdrops,
  photoboothLayouts,
  photoboothOrderTerms,
  photoboothAdvantages,
  type PhotoboothPackage,
} from "@/lib/content";
import { useBooking } from "@/lib/BookingContext";
import Button from "@/components/ui/Button";

interface PhotoboothPricingProps {
  sourceUrl?: string;
  showCategoryHeader?: boolean;
}

export default function PhotoboothPricing({
  sourceUrl = "/pricelist",
  showCategoryHeader = true,
}: PhotoboothPricingProps) {
  const router = useRouter();
  const { selectedPackage, selectPackage } = useBooking();

  // Filter category: "all" | "regular" | "bajaj"
  const [activeCategory, setActiveCategory] = useState<"all" | "regular" | "bajaj">("all");

  // Global duration sync helper (defaults to index 1: "3 Jam" as most popular)
  const [globalDuration, setGlobalDuration] = useState<number>(1);

  // Selected duration index per package (0: 2 Jam, 1: 3 Jam, 2: 4 Jam, 3: 5 Jam, 4: 6 Jam)
  const [selectedDurations, setSelectedDurations] = useState<{ [pkgId: string]: number }>({
    "pb-reg-noprint": 1,
    "pb-reg-print": 1,
    "pb-bajaj-noprint": 1,
    "pb-bajaj-print": 1,
  });

  // Interactive Backdrop selector state (defaults to Hijau as signature)
  const [selectedBackdropId, setSelectedBackdropId] = useState<string>("hijau");

  // Interactive Layout format tab state ("strip" | "4r")
  const [activeLayoutTab, setActiveLayoutTab] = useState<"strip" | "4r">("strip");

  // Template inspection modal state
  const [previewTemplateModal, setPreviewTemplateModal] = useState<"strip" | "4r" | null>(null);

  // Additional hour interactive calculator
  const [calcPackageId, setCalcPackageId] = useState<string>("pb-reg-print");
  const [calcBaseDurationIdx, setCalcBaseDurationIdx] = useState<number>(1); // index 1: 3 Jam
  const [extraHoursCount, setExtraHoursCount] = useState<number>(1);

  // Toast feedback state for copied text
  const [copiedToast, setCopiedToast] = useState<string | null>(null);

  const handleCopyPackage = (pkg: PhotoboothPackage, tier: { duration: string; harga: string }) => {
    const text = `*Paket Tegoer Sapa*: ${pkg.nama}\n• Durasi: ${tier.duration} (${tier.harga})\n• Kategori: ${pkg.category} (${pkg.type === "print" ? "Unlimited Print" : "Digital No Print"})\n• Fitur Utama:\n${pkg.fitur.slice(0, 5).map((f) => `  - ${f}`).join("\n")}\n\nInfo selengkapnya: https://tegoersapa.com/pricelist?tab=photobooth`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedToast(`Rincian ${pkg.nama} berhasil disalin!`);
      setTimeout(() => setCopiedToast(null), 3000);
    }
  };

  const handleGlobalDurationChange = (idx: number) => {
    setGlobalDuration(idx);
    setSelectedDurations({
      "pb-reg-noprint": idx,
      "pb-reg-print": idx,
      "pb-bajaj-noprint": idx,
      "pb-bajaj-print": idx,
    });
  };

  const handleDurationChange = (pkgId: string, index: number) => {
    setSelectedDurations((prev) => ({
      ...prev,
      [pkgId]: index,
    }));
  };

  const filteredPackages = photoboothPackages.filter((pkg) => {
    if (activeCategory === "regular") return pkg.category === "Photobooth Reguler";
    if (activeCategory === "bajaj") return pkg.category === "Bajaj Photobooth";
    return true;
  });

  const photoboothWaNumber = "6281350655747";
  const selectedBackdrop = photoboothBackdrops.find((b) => b.id === selectedBackdropId) || photoboothBackdrops[1];

  // Calculator derived values
  const calcPkg =
    photoboothPackages.find((p) => p.id === calcPackageId) || photoboothPackages[1];
  const calcBaseTier =
    calcPkg.durations[calcBaseDurationIdx] || calcPkg.durations[1];
  const calcBaseNumeric = calcBaseTier.numericPrice;
  const calcExtraRate = calcPkg.additionalHourNumeric || 600000;
  const calcExtraCost = extraHoursCount * calcExtraRate;
  const calcTotalHours = calcBaseTier.hours + extraHoursCount;
  const calcTotalPrice = calcBaseNumeric + calcExtraCost;

  const customWaMessage = encodeURIComponent(
    `Halo kak Mau booking Custom Durasi Photobooth Tegoer Sapa\n\nPaket Dasar : ${calcPkg.nama} (${calcBaseTier.duration} - ${calcBaseTier.harga})\nTambahan Waktu : +${extraHoursCount} Jam (Rp ${calcExtraCost.toLocaleString("id-ID")})\nTotal Durasi : ${calcTotalHours} Jam Operasional\nEstimasi Biaya : Rp ${calcTotalPrice.toLocaleString("id-ID")}\nBackdrop Pilihan : ${selectedBackdrop.name}\n\nMohon info ketersediaan slot tanggal & jam acara kami. Terima kasih!`
  );
  const customWaLink = `https://api.whatsapp.com/send?phone=${photoboothWaNumber}&text=${customWaMessage}`;

  // Backdrop detailed recommendations
  const backdropNotes: { [id: string]: string } = {
    merah: "Velvet Red — Mewah, berani & glamor. Sangat pas untuk tema pernikahan elegan, pesta malam, dan perayaan imlek.",
    hijau: "Forest Green — Signature Tegoer Sapa. Bernuansa segar, estetik, dan selaras sempurna dengan tema dekorasi botanical & garden.",
    "biru-highschool": "High School Blue — Ceria, cerah & energik. Pilihan favorit untuk birthday party, sweet 17, prom night, dan festival.",
    "biru-navy": "Classic Navy — Formal, profesional & timeless. Sangat cocok untuk corporate gathering, konferensi, dan perayaan formal.",
    cream: "Warm Cream — Hangat, minimalis & netral. Menghasilkan kontras foto yang lembut dan cocok dengan semua warna busana tamu.",
  };

  return (
    <div id="pricing-photobooth" className="space-y-16">
      {/* ─── Header & Sub-Category Filter ───────────────────────── */}
      {showCategoryHeader && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full border border-brand-green/20">
                Katalog Resmi Photobooth
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Event & Party
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark tracking-tight">
              Pilihan Paket Photobooth & Bajaj
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-xl font-medium">
              Tersedia opsi <strong>Photobooth Reguler</strong> dan <strong>Bajaj Photobooth (Tegoer Keliling)</strong> dalam pilihan format <em>Unlimited Print</em> maupun <em>No Print</em> (soft file digital via QR Code).
            </p>
          </div>

          {/* Sub Filter Buttons */}
          <div className="w-full sm:w-auto overflow-x-auto no-scrollbar flex items-center gap-1.5 p-1.5 bg-gray-100 rounded-2xl self-start md:self-auto -mx-1 px-1 sm:mx-0 sm:px-1.5">
            <button
              onClick={() => setActiveCategory("all")}
              className={`whitespace-nowrap flex-shrink-0 px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 min-h-[38px] ${
                activeCategory === "all"
                  ? "bg-white text-brand-dark shadow-xs"
                  : "text-gray-500 hover:text-brand-dark"
              }`}
            >
              <span>Semua Paket</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  activeCategory === "all"
                    ? "bg-brand-green/15 text-brand-green"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                4
              </span>
            </button>
            <button
              onClick={() => setActiveCategory("regular")}
              className={`whitespace-nowrap flex-shrink-0 px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 min-h-[38px] ${
                activeCategory === "regular"
                  ? "bg-white text-brand-dark shadow-xs"
                  : "text-gray-500 hover:text-brand-dark"
              }`}
            >
              <span>Reguler</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  activeCategory === "regular"
                    ? "bg-brand-green/15 text-brand-green"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </span>
            </button>
            <button
              onClick={() => setActiveCategory("bajaj")}
              className={`whitespace-nowrap flex-shrink-0 px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 min-h-[38px] ${
                activeCategory === "bajaj"
                  ? "bg-white text-brand-dark shadow-xs"
                  : "text-gray-500 hover:text-brand-dark"
              }`}
            >
              <span>Bajaj Photobooth</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  activeCategory === "bajaj"
                    ? "bg-brand-green/15 text-brand-green"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ─── Global Duration Quick Sync Bar ─────────────────────── */}
      <div className="bg-gradient-to-r from-brand-sky/30 via-white to-brand-green/5 border border-brand-green/20 p-4 sm:p-5 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-green/10 flex items-center justify-center text-lg text-brand-green flex-shrink-0">
            ⏱️
          </div>
          <div>
            <span className="text-xs sm:text-sm font-black text-brand-dark block">
              Sinkronkan Durasi Sesi Acara:
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Pilih estimasi durasi acara Anda untuk membandingkan harga semua paket secara serentak.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0 -mx-2 px-2 sm:mx-0 sm:px-0">
          {[
            { label: "2 Jam", idx: 0 },
            { label: "3 Jam ★", idx: 1, note: "Paling Populer" },
            { label: "4 Jam", idx: 2 },
            { label: "5 Jam", idx: 3 },
            { label: "6 Jam", idx: 4 },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleGlobalDurationChange(item.idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex-shrink-0 min-h-[38px] transition-all ${
                globalDuration === item.idx
                  ? "bg-brand-dark text-white shadow-sm scale-102 ring-2 ring-brand-green/30"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Package Cards Grid ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPackages.map((pkg: PhotoboothPackage) => {
          const durationIdx = selectedDurations[pkg.id] ?? 1;
          const currentTier = pkg.durations[durationIdx] || pkg.durations[0];
          const isSelected = selectedPackage?.id === `${pkg.id}-${currentTier.hours}h`;
          const isBajaj = pkg.category === "Bajaj Photobooth";
          const approxPerHour = Math.round(currentTier.numericPrice / currentTier.hours);

          // WA prefilled message
          const waMessage = encodeURIComponent(
            `Halo kak Mau booking Photobooth Tegoer Sapa\n\nNama :\nTanggal & Waktu :\nLokasi Acara :\nInstagram :\nPaket : ${pkg.nama} (${currentTier.duration} - ${currentTier.harga})\nBackdrop Pilihan : ${selectedBackdrop.name}`
          );
          const waLink = `https://api.whatsapp.com/send?phone=${photoboothWaNumber}&text=${waMessage}`;

          return (
            <div
              key={pkg.id}
              className={[
                "group relative flex flex-col justify-between rounded-3xl transition-all duration-300 overflow-hidden",
                isSelected
                  ? "border-2 border-brand-green bg-white ring-4 ring-brand-green/10 shadow-xl"
                  : pkg.isBestDeal
                  ? "border-2 border-brand-green/40 bg-white hover:border-brand-green hover:shadow-xl"
                  : "border border-gray-200/80 bg-gray-50/60 hover:bg-white hover:border-brand-green/40 hover:shadow-lg",
              ].join(" ")}
            >
              <div>
                {/* Visual Header / Cover Asset */}
                <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-brand-dark">
                  <Image
                    src={
                      isBajaj
                        ? "/images/photobooth/bajaj-photobooth.webp"
                        : pkg.type === "print"
                        ? "/images/pricelist/photobooth-packages-preview.webp"
                        : "/images/photobooth/photobooth-equipment.webp"
                    }
                    alt={pkg.nama}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-black/40 to-transparent" />

                  {/* Badges on image */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {pkg.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {pkg.isBestDeal && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-green text-white shadow-md animate-pulse">
                          ★ Best Deal
                        </span>
                      )}
                      {isSelected && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-green text-white shadow-xs">
                          ✓ Terpilih
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green bg-brand-green/20 backdrop-blur-md px-2 py-0.5 rounded-md border border-brand-green/30 inline-block mb-1">
                      {pkg.type === "print" ? "Unlimited Print" : "Digital QR File"}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                      {pkg.nama}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 pb-4">
                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Duration Picker Pills */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[11px] font-black uppercase tracking-wider text-gray-500">
                        Pilih Durasi Sesi:
                      </label>
                      <span className="text-[11px] font-bold text-brand-green">
                        {currentTier.duration} terpilih
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                      {pkg.durations.map((tier, idx) => {
                        const isActive = durationIdx === idx;
                        return (
                          <button
                            key={tier.duration}
                            type="button"
                            onClick={() => handleDurationChange(pkg.id, idx)}
                            className={`py-2 px-1 text-center rounded-xl text-xs sm:text-sm font-bold transition-all ${
                              isActive
                                ? "bg-brand-dark text-white shadow-sm ring-2 ring-brand-green/30 scale-102"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200/80"
                            }`}
                          >
                            {tier.duration}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="mt-6 pt-5 border-t border-gray-100 flex items-baseline justify-between bg-gray-50/70 p-4 rounded-2xl">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Total ({currentTier.duration})
                        </span>
                        <span className="text-[10px] font-bold text-gray-500 bg-white px-2 py-0.5 rounded-md border border-gray-200">
                          ~Rp {approxPerHour.toLocaleString("id-ID")}/jam
                        </span>
                      </div>
                      <span className="text-3xl sm:text-4xl font-black text-brand-green tracking-tight mt-0.5 block">
                        {currentTier.harga}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-gray-400 block">
                        Additional Hour
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-brand-dark">
                        {pkg.additionalHourRate}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mt-6 space-y-2.5">
                    <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 block mb-2">
                      Fasilitas Termasuk:
                    </span>
                    <ul className="space-y-2">
                      {pkg.fitur.map((feature, idx) => {
                        const isHighlight =
                          feature.toLowerCase().includes("unlimited print") ||
                          feature.toLowerCase().includes("bajaj");
                        return (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 font-medium"
                          >
                            <span
                              className={`flex-shrink-0 mt-0.5 font-bold ${
                                isHighlight ? "text-brand-green text-base" : "text-brand-green"
                              }`}
                            >
                              ✓
                            </span>
                            <span className={isHighlight ? "font-bold text-brand-dark" : ""}>
                              {feature}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 sm:p-7 pt-3 bg-gray-50/90 border-t border-gray-100 space-y-2.5">
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    selectPackage(
                      {
                        id: `${pkg.id}-${currentTier.hours}h`,
                        nama: `${pkg.nama} (${currentTier.duration})`,
                        harga: currentTier.harga,
                        kategori: pkg.category,
                        fitur: [
                          `Durasi Sesi: ${currentTier.duration}`,
                          `Backdrop: ${selectedBackdrop.name}`,
                          ...pkg.fitur,
                          `Tambahan Jam: ${pkg.additionalHourRate}`,
                        ],
                      },
                      sourceUrl
                    );
                    router.push("/booking");
                  }}
                >
                  <span>
                    {isSelected
                      ? `✓ ${currentTier.duration} Terpilih • Lanjut Form Booking`
                      : `Pilih Paket ${currentTier.duration} • ${currentTier.harga}`}
                  </span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>

                <div className="flex items-center justify-between pt-1">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-brand-green transition-colors py-1"
                  >
                    <span>Booking via WA</span>
                    <span aria-hidden="true">↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopyPackage(pkg, currentTier)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-brand-dark py-1 px-2.5 rounded-xl hover:bg-white border border-transparent hover:border-gray-200 transition-all cursor-pointer"
                    title="Salin ringkasan paket ini ke clipboard"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Salin Rincian</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Complete Price Matrix Table ────────────────────────── */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green block">
              Ringkasan Perbandingan
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-brand-dark">
              Tabel Daftar Harga Lengkap (2 – 6 Jam)
            </h3>
          </div>
          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
            Harga Transparan Sesuai Katalog
          </span>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden flex items-center gap-1.5 text-[11px] font-semibold text-brand-green bg-brand-green/10 px-3 py-1.5 rounded-xl mb-3 w-fit">
          <span>Geser tabel ke samping untuk melihat semua durasi →</span>
        </div>

        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b-2 border-gray-100 text-brand-dark uppercase text-[11px] font-black tracking-wider bg-gray-50">
                <th className="py-3 px-4">Paket & Layanan</th>
                <th className="py-3 px-3 text-center">2 Jam</th>
                <th className="py-3 px-3 text-center">3 Jam</th>
                <th className="py-3 px-3 text-center">4 Jam</th>
                <th className="py-3 px-3 text-center">5 Jam</th>
                <th className="py-3 px-3 text-center">6 Jam</th>
                <th className="py-3 px-4 text-center">Add. Hour</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              <tr className="hover:bg-gray-50/70 transition-colors">
                <td className="py-3.5 px-4 font-bold text-brand-dark">
                  Photobooth Reguler (No Print)
                  <span className="block text-[10px] text-gray-400 font-normal">Soft file digital QR Code</span>
                </td>
                <td className="py-3.5 px-3 text-center text-gray-700">Rp 1.500.000</td>
                <td className="py-3.5 px-3 text-center text-gray-700">Rp 1.700.000</td>
                <td className="py-3.5 px-3 text-center text-gray-700">Rp 1.900.000</td>
                <td className="py-3.5 px-3 text-center text-gray-700">Rp 2.200.000</td>
                <td className="py-3.5 px-3 text-center text-gray-700">Rp 2.500.000</td>
                <td className="py-3.5 px-4 text-center text-brand-green font-bold">Rp 600.000/jam</td>
              </tr>
              <tr className="bg-brand-green/5 hover:bg-brand-green/10 transition-colors font-semibold">
                <td className="py-3.5 px-4 font-black text-brand-dark">
                  <span className="text-brand-green mr-1.5">★</span>
                  Photobooth Reguler (Print)
                  <span className="block text-[10px] text-brand-green font-bold">Unlimited Print (Best Deal)</span>
                </td>
                <td className="py-3.5 px-3 text-center text-brand-dark font-bold">Rp 2.300.000</td>
                <td className="py-3.5 px-3 text-center text-brand-dark font-bold">Rp 2.800.000</td>
                <td className="py-3.5 px-3 text-center text-brand-dark font-bold">Rp 3.500.000</td>
                <td className="py-3.5 px-3 text-center text-brand-dark font-bold">Rp 4.200.000</td>
                <td className="py-3.5 px-3 text-center text-brand-dark font-bold">Rp 4.900.000</td>
                <td className="py-3.5 px-4 text-center text-brand-green font-black">Rp 600.000/jam</td>
              </tr>
              <tr className="hover:bg-gray-50/70 transition-colors">
                <td className="py-3.5 px-4 font-bold text-brand-dark">
                  Bajaj Photobooth (No Print)
                  <span className="block text-[10px] text-gray-400 font-normal">Armada Tegoer Keliling • Soft file</span>
                </td>
                <td className="py-3.5 px-3 text-center text-gray-700">Rp 1.800.000</td>
                <td className="py-3.5 px-3 text-center text-gray-700">Rp 2.000.000</td>
                <td className="py-3.5 px-3 text-center text-gray-700">Rp 2.200.000</td>
                <td className="py-3.5 px-3 text-center text-gray-700">Rp 2.500.000</td>
                <td className="py-3.5 px-3 text-center text-gray-700">Rp 2.800.000</td>
                <td className="py-3.5 px-4 text-center text-brand-green font-bold">Rp 600.000/jam</td>
              </tr>
              <tr className="bg-brand-green/5 hover:bg-brand-green/10 transition-colors font-semibold">
                <td className="py-3.5 px-4 font-black text-brand-dark">
                  <span className="text-brand-green mr-1.5">★</span>
                  Bajaj Photobooth (Print)
                  <span className="block text-[10px] text-brand-green font-bold">Armada Tegoer Keliling • Unlimited Print</span>
                </td>
                <td className="py-3.5 px-3 text-center text-brand-dark font-bold">Rp 2.600.000</td>
                <td className="py-3.5 px-3 text-center text-brand-dark font-bold">Rp 3.100.000</td>
                <td className="py-3.5 px-3 text-center text-brand-dark font-bold">Rp 3.800.000</td>
                <td className="py-3.5 px-3 text-center text-brand-dark font-bold">Rp 4.500.000</td>
                <td className="py-3.5 px-3 text-center text-brand-dark font-bold">Rp 5.200.000</td>
                <td className="py-3.5 px-4 text-center text-brand-green font-black">Rp 600.000/jam</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Interactive Extra Hours & Custom Duration Calculator ── */}
      <div className="rounded-3xl border border-brand-green/30 bg-gradient-to-br from-brand-sky/20 via-white to-brand-green/10 p-6 sm:p-10 shadow-xs">
        <div className="max-w-2xl mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full border border-brand-green/20">
              Interactive Estimator
            </span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Rp 600.000 / Jam Tambahan
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
            Kalkulator Tambahan Jam & Durasi Kustom
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Punya jadwal acara panjang lebih dari 6 jam atau ingin menambah durasi operasional photobooth?
            Hitung perkiraan biaya secara akurat dan transparan di bawah ini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Kiri: Input Pilihan (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-7 border border-gray-200/80 shadow-xs space-y-6">
            {/* 1. Pilih Paket Dasar */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-brand-dark mb-2.5">
                1. Pilih Paket Dasar:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {photoboothPackages.map((p) => {
                  const isCurPkg = calcPackageId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setCalcPackageId(p.id)}
                      className={`text-left p-3 rounded-xl border text-xs font-bold transition-all flex flex-col justify-between cursor-pointer ${
                        isCurPkg
                          ? "border-brand-green bg-brand-green/10 text-brand-dark ring-2 ring-brand-green/30"
                          : "border-gray-200 bg-gray-50/70 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold">{p.nama}</span>
                        {p.isBestDeal && (
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-brand-green text-white">
                            Best
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-500 font-medium">
                        {p.type === "print" ? "Unlimited Print" : "Digital QR File"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Pilih Durasi Dasar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black uppercase tracking-wider text-brand-dark">
                  2. Durasi Awal Sesi:
                </label>
                <span className="text-xs font-bold text-brand-green">
                  {calcBaseTier.duration} terpilih ({calcBaseTier.harga})
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {calcPkg.durations.map((d, idx) => (
                  <button
                    key={d.duration}
                    type="button"
                    onClick={() => setCalcBaseDurationIdx(idx)}
                    className={`py-2 px-0.5 sm:px-1 text-center rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer min-h-[38px] ${
                      calcBaseDurationIdx === idx
                        ? "bg-brand-dark text-white ring-2 ring-brand-green shadow-xs"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <span className="block">{d.duration}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Tambahan Jam (Extra Hours) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black uppercase tracking-wider text-brand-dark">
                  3. Tambahan Jam (Extra Hours):
                </label>
                <span className="text-xs font-bold text-brand-green">
                  +{extraHoursCount} Jam (Rp {(extraHoursCount * 600000).toLocaleString("id-ID")})
                </span>
              </div>

              <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                  <button
                    type="button"
                    onClick={() => setExtraHoursCount((prev) => Math.max(1, prev - 1))}
                    disabled={extraHoursCount <= 1}
                    className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-black text-brand-dark disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-16 text-center font-black text-brand-dark text-xs sm:text-sm">
                    +{extraHoursCount} Jam
                  </span>
                  <button
                    type="button"
                    onClick={() => setExtraHoursCount((prev) => Math.min(8, prev + 1))}
                    disabled={extraHoursCount >= 8}
                    className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-black text-brand-dark disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Quick Chips */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[1, 2, 3, 4].map((hrs) => (
                    <button
                      key={hrs}
                      type="button"
                      onClick={() => setExtraHoursCount(hrs)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        extraHoursCount === hrs
                          ? "bg-brand-green text-white shadow-xs"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      +{hrs} Jam
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Rincian & Total Biaya (5 cols) */}
          <div className="lg:col-span-5 bg-brand-dark text-white rounded-2xl p-6 sm:p-7 shadow-lg flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green">
                  Estimasi Biaya Transparan
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-white/10 text-white/90">
                  Resmi
                </span>
              </div>

              <div className="mt-5 space-y-3.5 text-xs">
                <div className="flex items-center justify-between text-white/70">
                  <span>Paket Dasar:</span>
                  <span className="font-bold text-white text-right">{calcPkg.nama}</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span>Durasi Sesi Awal:</span>
                  <span className="font-bold text-white">{calcBaseTier.duration} ({calcBaseTier.harga})</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span>Tambahan Jam (+{extraHoursCount} Jam):</span>
                  <span className="font-bold text-brand-green">
                    +Rp {(extraHoursCount * 600000).toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span>Total Durasi Operasional:</span>
                  <span className="font-black text-brand-sky text-sm">
                    {calcBaseTier.hours + extraHoursCount} Jam Sesi
                  </span>
                </div>
              </div>

              <div className="my-5 h-px bg-white/15" />

              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/60 block">
                    Total Estimasi Biaya
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-brand-green">
                    Rp {(calcBaseTier.numericPrice + extraHoursCount * 600000).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <Button
                type="button"
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  const totalHrs = calcBaseTier.hours + extraHoursCount;
                  const totalNum = calcBaseTier.numericPrice + extraHoursCount * 600000;
                  selectPackage(
                    {
                      id: `${calcPkg.id}-${totalHrs}h-custom`,
                      nama: `${calcPkg.nama} (Custom ${totalHrs} Jam)`,
                      harga: `Rp ${totalNum.toLocaleString("id-ID")}`,
                      kategori: calcPkg.category,
                      fitur: [
                        `Durasi Awal: ${calcBaseTier.duration} (${calcBaseTier.harga})`,
                        `Tambahan Waktu: +${extraHoursCount} Jam (Rp ${(extraHoursCount * 600000).toLocaleString("id-ID")})`,
                        `Total Durasi Operasional: ${totalHrs} Jam`,
                        `Backdrop Terpilih: ${selectedBackdrop.name}`,
                        ...calcPkg.fitur,
                      ],
                    },
                    sourceUrl
                  );
                  router.push("/booking");
                }}
              >
                <span>Pilih & Lanjut Form Booking</span>
                <span>→</span>
              </Button>

              <a
                href={customWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wide transition-colors"
              >
                <span>Chat Admin Durasi Custom via WA</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Interactive Backdrop & Layout Overlay Showcase ──────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Pilihan Backdrop Interaktif (Kiri 6 col) */}
        <div className="lg:col-span-6 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green block">
                Free Backdrop Selection
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-brand-dark mt-1">
                Pilih Warna Backdrop Acara
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 font-medium">
                Klik warna untuk melihat kecocokan dengan konsep acara Anda.
              </p>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20 flex-shrink-0">
              5 Pilihan
            </span>
          </div>

          {/* Interactive Color Swatches */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {photoboothBackdrops.map((bd) => {
              const isActive = selectedBackdropId === bd.id;
              return (
                <button
                  key={bd.id}
                  type="button"
                  onClick={() => setSelectedBackdropId(bd.id)}
                  className={`text-center group p-1.5 rounded-2xl transition-all ${
                    isActive ? "bg-gray-100 ring-2 ring-brand-green scale-102" : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-full aspect-square rounded-xl bg-gradient-to-br ${bd.previewBg} shadow-xs border border-black/10 flex items-center justify-center transition-transform group-hover:scale-105`}
                    style={{ backgroundColor: bd.colorHex }}
                  >
                    {isActive ? (
                      <span className="w-5 h-5 rounded-full bg-white text-brand-green text-[11px] font-black flex items-center justify-center shadow-xs">
                        ✓
                      </span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-white/40" />
                    )}
                  </div>
                  <span className={`mt-1.5 text-[10px] sm:text-[11px] font-bold block truncate leading-tight ${
                    isActive ? "text-brand-dark font-black" : "text-gray-600"
                  }`}>
                    {bd.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Backdrop Recommendation Card */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-brand-green/15 text-brand-green flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
              i
            </span>
            <div>
              <span className="text-xs font-black text-brand-dark block">
                {selectedBackdrop.name}
              </span>
              <p className="text-xs text-gray-600 font-medium mt-0.5 leading-relaxed">
                {backdropNotes[selectedBackdropId] || "Pilihan backdrop elegan siap pakai."}
              </p>
            </div>
          </div>

          {/* Real Preview Banner */}
          <div className="relative aspect-[16/7] rounded-2xl overflow-hidden bg-brand-dark ring-1 ring-black/5">
            <Image
              src="/images/photobooth/backdrop-options.webp"
              alt="Pilihan Backdrop Photobooth Tegoer Sapa"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Pilihan Layout Overlay (Kanan 6 col) */}
        <div className="lg:col-span-6 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green block">
                Layout Overlay Custom Design
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-brand-dark mt-1">
                Format Cetak STRIP & 4R
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 font-medium">
                Desain template overlay dicustom penuh sesuai nama, tema & logo acara.
              </p>
            </div>

            {/* Layout Tab Switcher */}
            <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl flex-shrink-0">
              <button
                type="button"
                onClick={() => setActiveLayoutTab("strip")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeLayoutTab === "strip"
                    ? "bg-white text-brand-dark shadow-xs"
                    : "text-gray-500 hover:text-brand-dark"
                }`}
              >
                STRIP (2R)
              </button>
              <button
                type="button"
                onClick={() => setActiveLayoutTab("4r")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeLayoutTab === "4r"
                    ? "bg-white text-brand-dark shadow-xs"
                    : "text-gray-500 hover:text-brand-dark"
                }`}
              >
                4R Postcard
              </button>
            </div>
          </div>

          {/* Active Layout Info Card */}
          {activeLayoutTab === "strip" ? (
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-brand-green/10 text-brand-green">
                  STRIP Photo Print (2R)
                </span>
                <span className="text-xs font-bold text-gray-500">
                  2 pcs per cetak
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Format strip vertikal & horizontal klasik yang sangat disukai tamu karena mudah diselipkan di casing ponsel, buku, atau dompet.
              </p>
              <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-xs font-bold text-brand-green">
                <span>10 Pilihan Grid Template</span>
                <span className="text-gray-400 font-normal">A1 – A10 (3–4 pose)</span>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-brand-green/10 text-brand-green">
                  4R Photo Print Postcard
                </span>
                <span className="text-xs font-bold text-gray-500">
                  1 pcs per cetak
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Ukuran cetak 4R lapang dan proporsional. Sangat cocok untuk foto bersama keluarga, rombongan, atau kolase 1 sampai 6 foto.
              </p>
              <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-xs font-bold text-brand-green">
                <span>9 Pilihan Grid Template</span>
                <span className="text-gray-400 font-normal">B1 – B9 (1–6 pose)</span>
              </div>
            </div>
          )}

          {/* Visual Comparison Slot */}
          <div className="grid grid-cols-2 gap-3.5">
            <div
              className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-brand-dark cursor-pointer ring-2 transition-all ${
                activeLayoutTab === "strip" ? "ring-brand-green scale-101 shadow-md" : "ring-black/5 opacity-80"
              }`}
              onClick={() => setActiveLayoutTab("strip")}
            >
              <Image
                src="/images/photobooth/layout-strip-sample.webp"
                alt="Sample Overlay STRIP Photobooth"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-[11px] font-bold">
                  STRIP 2R (2 pcs)
                </span>
              </div>
            </div>

            <div
              className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-brand-dark cursor-pointer ring-2 transition-all ${
                activeLayoutTab === "4r" ? "ring-brand-green scale-101 shadow-md" : "ring-black/5 opacity-80"
              }`}
              onClick={() => setActiveLayoutTab("4r")}
            >
              <Image
                src="/images/photobooth/layout-4r-sample.webp"
                alt="Sample Overlay 4R Photobooth"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-[11px] font-bold">
                  4R Postcard (1 pcs)
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPreviewTemplateModal(activeLayoutTab)}
            className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-xs font-bold text-brand-dark flex items-center justify-center gap-2 transition-colors"
          >
            <span>Lihat Seluruh Template ({activeLayoutTab === "strip" ? "A1–A10" : "B1–B9"})</span>
          </button>
        </div>
      </div>

      {/* ─── Template Preview Modal ─────────────────────────────── */}
      {previewTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-4 shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green">
                  Katalog Template Overlay
                </span>
                <h4 className="text-xl font-black text-brand-dark">
                  {previewTemplateModal === "strip"
                    ? "Template STRIP Photo Print (A1 – A10)"
                    : "Template 4R Photo Print (B1 – B9)"}
                </h4>
              </div>

              {/* In-Modal Template Switcher Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-2xl self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setPreviewTemplateModal("strip")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    previewTemplateModal === "strip"
                      ? "bg-white text-brand-dark shadow-xs"
                      : "text-gray-500 hover:text-brand-dark"
                  }`}
                >
                  Strip (A1–A10)
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTemplateModal("4r")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    previewTemplateModal === "4r"
                      ? "bg-white text-brand-dark shadow-xs"
                      : "text-gray-500 hover:text-brand-dark"
                  }`}
                >
                  4R (B1–B9)
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTemplateModal(null)}
                  className="w-8 h-8 rounded-full bg-white hover:bg-gray-200 text-gray-500 hover:text-black flex items-center justify-center font-bold text-sm ml-1 cursor-pointer"
                  aria-label="Tutup preview modal"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-brand-dark border border-gray-200 my-auto">
              <Image
                src={
                  previewTemplateModal === "strip"
                    ? "/images/photobooth/layout-strip-templates.webp"
                    : "/images/photobooth/layout-4r-templates.webp"
                }
                alt="Template Grid Preview"
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 font-medium">
                Semua template dapat dipersonalisasi dengan nama acara, logo, warna, dan tanggal.
              </p>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => setPreviewTemplateModal(null)}
              >
                <span>Tutup Preview</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── 6 Keunggulan Photobooth Tegoer Sapa ─────────────────── */}
      <div className="rounded-3xl border border-gray-200 bg-gray-50/70 p-6 sm:p-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-brand-green text-xs font-bold tracking-[0.2em] uppercase">
            Mengapa Memilih Kami
          </span>
          <h3 className="mt-2 text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
            Kenapa Photobooth Tegoer Sapa?
          </h3>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Kualitas visual prima dan pengalaman interaktif yang meninggalkan kesan mendalam untuk para tamu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photoboothAdvantages.map((adv, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs hover:border-brand-green/30 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4">
                <span className="text-sm font-black text-brand-green tracking-wider">
                  0{idx + 1}
                </span>
              </div>
              <h4 className="text-base font-bold text-brand-dark mb-2">
                {adv.title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                {adv.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Catatan Order & Ketentuan Payment ──────────────────── */}
      <div className="rounded-3xl border border-brand-green/30 bg-white p-6 sm:p-10 shadow-sm">
        <div className="max-w-2xl mb-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green block">
            Informasi Reservasi
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-brand-dark mt-1">
            Catatan untuk Form Order & Payment
          </h3>
          <p className="mt-2 text-sm text-gray-600 font-medium">
            Panduan alur pemesanan dan ketentuan pembayaran jasa Photobooth Tegoer Sapa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {photoboothOrderTerms.map((term) => (
            <div
              key={term.no}
              className="p-6 rounded-2xl bg-gray-50/80 border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-black text-brand-green/40 block mb-2 font-mono">
                  {term.no}
                </span>
                <h4 className="text-base font-bold text-brand-dark mb-2">
                  {term.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {term.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Consultation Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-brand-dark">
                Punya pertanyaan teknis seputar venue, armada Bajaj, atau custom overlay?
              </p>
              <p className="text-xs text-gray-500">
                Hubungi WhatsApp Photobooth di <strong>+62 813-5065-5747</strong> atau Instagram <strong>@tegoersapa.photobooth</strong>
              </p>
            </div>
          </div>

          <Button
            href={`https://api.whatsapp.com/send?phone=${photoboothWaNumber}&text=Halo%20kak%20Mau%20konsultasi%20layanan%20Photobooth%20Tegoer%20Sapa`}
            variant="stroke"
            size="sm"
            className="flex-shrink-0"
          >
            <span>Chat Admin Photobooth</span>
            <span aria-hidden="true">↗</span>
          </Button>
        </div>
      </div>

      {/* Floating Toast Feedback */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-dark text-white text-xs font-bold px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 border border-brand-green/40 ring-4 ring-black/10 animate-in slide-in-from-bottom-3 duration-200">
          <span className="w-5 h-5 rounded-full bg-brand-green text-white flex items-center justify-center text-[11px] font-black">
            ✓
          </span>
          <span>{copiedToast}</span>
        </div>
      )}
    </div>
  );
}
