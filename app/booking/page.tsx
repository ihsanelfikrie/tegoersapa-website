"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBooking } from "@/lib/BookingContext";
import { contact } from "@/lib/content";
import HeroClouds from "@/components/ui/HeroClouds";
import GrassyHill from "@/components/ui/GrassyHill";
import Button from "@/components/ui/Button";

export default function BookingPage() {
  const {
    selectedPackage,
    selectedAddOns,
    customerInfo,
    isHydrated,
    removeAddOn,
    saveCustomerInfo,
    totalCalculation,
  } = useBooking();

  // Form State initialized from customerInfo if available
  const [formData, setFormData] = useState({
    nama: "",
    whatsapp: "",
    tanggal: "",
    waktu: "",
    lokasi: "",
    instagram: "",
    catatan: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync saved customerInfo to formData on hydration
  const [prevCustomerInfo, setPrevCustomerInfo] = useState(customerInfo);
  if (customerInfo && customerInfo !== prevCustomerInfo) {
    setPrevCustomerInfo(customerInfo);
    setFormData((prev) => ({
      ...prev,
      ...customerInfo,
    }));
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      saveCustomerInfo(updated);
      return updated;
    });

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.nama.trim()) newErrors.nama = "Nama lengkap wajib diisi";
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "Nomor WhatsApp aktif wajib diisi";
    } else if (!/^[0-9+-\s]{8,16}$/.test(formData.whatsapp.trim())) {
      newErrors.whatsapp = "Format nomor WhatsApp tidak valid";
    }
    if (!formData.tanggal) newErrors.tanggal = "Tanggal acara wajib dipilih";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!selectedPackage) return;

    if (isStudioPackage) {
      alert(
        "Mohon maaf, layanan Studio Professional saat ini sedang tidak tersedia untuk booking. Silakan pilih paket wisuda atau wedding yang tersedia."
      );
      return;
    }

    // Build structured WhatsApp message
    const addOnLines =
      selectedAddOns.length > 0
        ? selectedAddOns.map((item) => `  • ${item.nama} (${item.harga})`).join("\n")
        : "  • Tidak ada add-on yang dipilih";

    // Sanitize user inputs
    const cleanNama = formData.nama.replace(/[<>]/g, "").trim();
    const cleanWhatsapp = formData.whatsapp.replace(/[^\d+-\s]/g, "").trim();
    const cleanWaktu = formData.waktu.replace(/[<>]/g, "").trim();
    const cleanLokasi = formData.lokasi.replace(/[<>]/g, "").trim();
    const cleanInstagram = formData.instagram.replace(/[^\w._]/g, "").trim();
    const cleanCatatan = formData.catatan.replace(/[<>]/g, "").trim();

    const message = `Halo Tegoer Sapa, saya ingin melakukan reservasi / booking:

📋 DETAIL PEMESAN
• Nama: ${cleanNama}
• No. WhatsApp: ${cleanWhatsapp}
• Tanggal Acara: ${formData.tanggal}
• Waktu: ${cleanWaktu || "Fleksibel / Sesuai Jadwal"}
• Lokasi / Venue: ${cleanLokasi || "Studio / Belum Ditentukan"}
• Instagram: ${cleanInstagram ? `@${cleanInstagram}` : "-"}

📦 PAKET YANG DIPILIH
• Paket: ${selectedPackage.nama} (${selectedPackage.kategori || "Dokumentasi"})
• Harga Paket: ${selectedPackage.harga}

➕ ADD-ON OPSIONAL
${addOnLines}

💰 ESTIMASI TOTAL BIAYA:
${totalCalculation.totalText}

📝 Catatan Tambahan:
${cleanCatatan || "-"}

Mohon konfirmasi ketersediaan slot tanggal & instruksi pembayaran DP. Terima kasih!`;

    const adminPhone = contact.whatsapp[0].raw || "6282254092927";
    const waUrl = `https://api.whatsapp.com/send?phone=${adminPhone}&text=${encodeURIComponent(
      message
    )}`;

    setIsSubmitted(true);
    // Open WhatsApp in new tab
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  // Determine if chosen package is Studio
  const isStudioPackage = Boolean(
    selectedPackage &&
      (selectedPackage.kategori?.toLowerCase().includes("studio") ||
        selectedPackage.id?.toLowerCase().includes("studio") ||
        selectedPackage.id === "indoor-grad" ||
        ["personal", "family", "group", "indoor-graduation", "prewed"].includes(
          selectedPackage.id
        ))
  );

  // Determine back URL for "Ubah Pilihan" (hardened against open-redirect)
  const isSafeInternalUrl = (url?: string) =>
    Boolean(url && url.startsWith("/") && !url.startsWith("//") && !url.includes("javascript:"));

  const safeSourceUrl = isSafeInternalUrl(selectedPackage?.sourceUrl)
    ? selectedPackage!.sourceUrl
    : "/photography/wedding#packages";

  const changeSelectionUrl = safeSourceUrl;

  const addMoreAddOnsUrl = safeSourceUrl.includes("#")
    ? safeSourceUrl.split("#")[0] + "#addons"
    : safeSourceUrl + "#addons";

  return (
    <div className="bg-white min-h-screen text-black">
      {/* ─── Hero Header ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 sm:pb-28 lg:pb-36 bg-brand-sky text-brand-dark overflow-hidden">
        {/* Floating Clouds Background */}
        <HeroClouds />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              <span className="hero-word">Formulir</span>{" "}
              <span className="hero-word hero-word-green">Reservasi</span>
            </h1>
            <div className="w-16 h-1 rounded-full bg-brand-dark my-5" />
            <p className="text-base sm:text-lg text-brand-dark/80 font-medium leading-relaxed max-w-2xl">
              Konfirmasikan paket dan add-on pilihan Anda. Data pilihan langsung tersimpan dan diteruskan ke tim Tegoer Sapa untuk penjadwalan.
            </p>

            {/* Steps indicator */}
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold text-brand-dark">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-brand-dark border border-brand-dark/15 shadow-2xs">
                <span className="text-brand-green font-black">✓</span> 1. Pilih Paket
              </span>
              <span className="text-brand-dark/40">→</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-brand-dark border border-brand-dark/15 shadow-2xs">
                <span className="text-brand-green font-black">✓</span> 2. Add-on (Opsional)
              </span>
              <span className="text-brand-dark/40">→</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green text-white shadow-xs">
                3. Formulir Booking
              </span>
            </div>
          </div>
        </div>

        {/* Grassy Hill Bottom Decoration */}
        <GrassyHill />
      </section>

      {/* ─── Main Content ───────────────────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isHydrated ? (
          <div className="py-20 flex items-center justify-center">
            <div className="animate-pulse text-sm text-gray-500 font-medium">
              Memuat formulir booking...
            </div>
          </div>
        ) : !selectedPackage ? (
          /* Empty state: belum memilih paket */
          <div className="max-w-2xl mx-auto text-center p-8 sm:p-12 rounded-3xl border border-gray-200 bg-gray-50/50 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center text-2xl mx-auto mb-4">
              📦
            </div>
            <h2 className="text-2xl font-black text-brand-dark">
              Anda Belum Memilih Paket Layanan
            </h2>
            <p className="mt-2.5 text-sm text-gray-500 font-medium leading-relaxed max-w-md mx-auto">
              Silakan pilih paket dokumentasi terlebih dahulu agar rincian layanan dan estimasi total dapat dihitung secara otomatis.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/photography/wedding#packages"
                className="px-5 py-3 rounded-2xl bg-brand-dark hover:bg-brand-green text-white font-bold text-xs tracking-wide transition-all"
              >
                Pilih Paket Wedding
              </Link>
              <Link
                href="/photography/graduation#packages"
                className="px-5 py-3 rounded-2xl bg-brand-dark hover:bg-brand-green text-white font-bold text-xs tracking-wide transition-all"
              >
                Pilih Paket Wisuda
              </Link>
              <button
                type="button"
                onClick={() => {
                  alert(
                    "Mohon maaf, layanan Studio Professional saat ini sedang tidak tersedia untuk booking."
                  );
                }}
                className="px-5 py-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 font-bold text-xs tracking-wide transition-all hover:bg-amber-100 cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Paket Studio (Tidak Tersedia)</span>
                <span aria-hidden="true">⚠️</span>
              </button>
              <Link
                href="/pricelist"
                className="px-5 py-3 rounded-2xl border border-gray-300 hover:border-brand-green text-gray-700 hover:text-brand-green font-bold text-xs tracking-wide transition-all"
              >
                Lihat Semua Pricelist
              </Link>
            </div>
          </div>
        ) : (
          /* Layout 2 Kolom: Ringkasan (Kiri) & Form (Kanan) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ═══════════════════════════════════════════════════════
                KOLOM KIRI: RINGKASAN PILIHAN USER
            ═══════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              <div className="p-5 sm:p-8 rounded-3xl border border-gray-200 bg-gray-50/80 shadow-sm">
                
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green block">
                      Ringkasan Booking
                    </span>
                    <h2 className="text-xl font-black text-brand-dark">
                      Pilihan Anda
                    </h2>
                  </div>

                  <Link
                    href={changeSelectionUrl}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:underline cursor-pointer"
                  >
                    <span>Ubah Pilihan</span>
                    <span>↺</span>
                  </Link>
                </div>

                {/* Studio Unavailable Warning Banner */}
                {isStudioPackage && (
                  <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900">
                    <div className="flex items-start gap-2.5">
                      <span className="text-xl flex-shrink-0" aria-hidden="true">⚠️</span>
                      <div>
                        <h4 className="font-extrabold text-xs sm:text-sm text-amber-950">
                          Studio Sedang Tidak Tersedia
                        </h4>
                        <p className="mt-0.5 text-xs text-amber-800 leading-relaxed font-medium">
                          Paket Studio yang Anda pilih saat ini sedang tidak menerima pemesanan. Silakan pilih paket wisuda atau wedding yang tersedia.
                        </p>
                        <Link
                          href="/pricelist"
                          className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-amber-950 bg-amber-200/80 hover:bg-amber-300 px-3 py-1 rounded-full transition-colors"
                        >
                          <span>Pilih Paket Lain</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Paket Terpilih */}
                <div className="mt-5 p-4 rounded-2xl bg-white border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-green/10 text-brand-dark border border-brand-green/20">
                      {selectedPackage.kategori || "Paket Utama"}
                    </span>
                    {selectedPackage.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-dark text-white">
                        {selectedPackage.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 text-xl font-black text-brand-dark">
                    {selectedPackage.nama}
                  </h3>
                  <div className="text-lg font-black text-brand-green mt-0.5">
                    {selectedPackage.harga}
                  </div>

                  {selectedPackage.fitur && selectedPackage.fitur.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                        Fitur Termasuk:
                      </span>
                      <ul className="space-y-1.5">
                        {selectedPackage.fitur.slice(0, 4).map((f, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 font-medium">
                            <span className="text-brand-green font-bold">✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                        {selectedPackage.fitur.length > 4 && (
                          <li className="text-[11px] text-gray-400 italic">
                            +{selectedPackage.fitur.length - 4} fitur lainnya
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Add-on Terpilih */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold text-brand-dark uppercase tracking-wide">
                      Add-on Opsional
                    </span>
                    <Link
                      href={addMoreAddOnsUrl}
                      className="text-[11px] font-semibold text-brand-green hover:underline"
                    >
                      + Atur Add-on
                    </Link>
                  </div>

                  {selectedAddOns.length > 0 ? (
                    <div className="space-y-2">
                      {selectedAddOns.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200 text-xs"
                        >
                          <div>
                            <span className="font-bold text-brand-dark block">
                              {item.nama}
                            </span>
                            <span className="font-black text-brand-green">
                              {item.harga}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeAddOn(item.id)}
                            className="p-1 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Hapus Add-on"
                            aria-label={`Hapus ${item.nama}`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Sesuai ketentuan: Jika tidak ada Add-on, tampilkan "Tidak ada add-on yang dipilih" */
                    <div className="p-3.5 rounded-xl bg-white border border-dashed border-gray-200 text-center">
                      <p className="text-xs font-semibold text-gray-500">
                        Tidak ada add-on yang dipilih
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Add-on bersifat opsional.
                      </p>
                    </div>
                  )}
                </div>

                {/* Rincian & Estimasi Total */}
                <div className="mt-6 pt-5 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between text-xs text-gray-600 font-medium">
                    <span>Harga Paket</span>
                    <span>{selectedPackage.harga}</span>
                  </div>

                  {selectedAddOns.length > 0 && (
                    <div className="flex justify-between text-xs text-gray-600 font-medium">
                      <span>Total {selectedAddOns.length} Add-on</span>
                      <span>+ {totalCalculation.totalText !== "Konsultasi / Custom" ? `Rp ${totalCalculation.addOnsTotal.toLocaleString("id-ID")}` : "Sesuai rincian"}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-gray-200 flex items-baseline justify-between">
                    <div>
                      <span className="text-xs font-extrabold text-brand-dark uppercase tracking-wider block">
                        Estimasi Total
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        (Package + Add-on)
                      </span>
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-brand-green">
                      {totalCalculation.totalText}
                    </span>
                  </div>
                </div>

                {/* Opsi Ubah Pilihan Button di Bawah Ringkasan */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={changeSelectionUrl}
                    className="w-full text-center py-2.5 px-4 rounded-xl border border-gray-200 hover:border-brand-green text-xs font-bold text-gray-600 hover:text-brand-green transition-all bg-white"
                  >
                    ← Ubah Pilihan Paket / Add-on
                  </Link>
                </div>

              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                KOLOM KANAN: FORMULIR PEMESANAN
            ═══════════════════════════════════════════════════════ */}
            <div className="lg:col-span-7">
              <div className="p-5 sm:p-8 md:p-10 rounded-3xl border border-gray-200 bg-white shadow-sm">
                
                <div className="mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green">
                    Langkah Terakhir
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-brand-dark mt-1">
                    Lengkapi Data Booking
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-gray-500 font-medium">
                    Isi informasi Anda di bawah ini. Tombol kirim akan langsung mengarahkan Anda ke WhatsApp resmi Tegoer Sapa dengan pesan yang sudah terisi otomatis rapi.
                  </p>
                </div>

                {isSubmitted && (
                  <div className="mb-6 p-4 rounded-2xl bg-brand-green/10 border border-brand-green/30 text-brand-dark text-xs sm:text-sm">
                    <p className="font-bold flex items-center gap-1.5 text-brand-green">
                      <span>✓</span> Formulir telah disiapkan!
                    </p>
                    <p className="mt-1 text-gray-600 font-medium">
                      Pesan WhatsApp sedang dibuka di tab baru. Jika tidak terbuka otomatis, silakan klik tombol kirim di bawah sekali lagi.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Nama Lengkap */}
                  <div>
                    <label
                      htmlFor="nama"
                      className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1.5"
                    >
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nama"
                      name="nama"
                      maxLength={80}
                      autoComplete="name"
                      value={formData.nama}
                      onChange={handleChange}
                      placeholder="Contoh: Rian Pratama & Sarah"
                      className={[
                        "w-full px-4 py-3 rounded-2xl border text-sm text-black placeholder:text-gray-400 font-medium transition-all focus:outline-none focus:ring-2",
                        errors.nama
                          ? "border-red-400 focus:ring-red-300 bg-red-50/30"
                          : "border-gray-200 focus:border-brand-green focus:ring-brand-green/20 bg-gray-50/50 focus:bg-white",
                      ].join(" ")}
                    />
                    {errors.nama && (
                      <p className="mt-1 text-xs text-red-500 font-semibold">{errors.nama}</p>
                    )}
                  </div>

                  {/* Nomor WhatsApp */}
                  <div>
                    <label
                      htmlFor="whatsapp"
                      className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1.5"
                    >
                      Nomor WhatsApp Aktif <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      maxLength={20}
                      autoComplete="tel"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="Contoh: 081234567890"
                      className={[
                        "w-full px-4 py-3 rounded-2xl border text-sm text-black placeholder:text-gray-400 font-medium transition-all focus:outline-none focus:ring-2",
                        errors.whatsapp
                          ? "border-red-400 focus:ring-red-300 bg-red-50/30"
                          : "border-gray-200 focus:border-brand-green focus:ring-brand-green/20 bg-gray-50/50 focus:bg-white",
                      ].join(" ")}
                    />
                    {errors.whatsapp && (
                      <p className="mt-1 text-xs text-red-500 font-semibold">{errors.whatsapp}</p>
                    )}
                  </div>

                  {/* Tanggal & Waktu Acara */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="tanggal"
                        className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1.5"
                      >
                        Tanggal Acara / Sesi <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="tanggal"
                        name="tanggal"
                        value={formData.tanggal}
                        onChange={handleChange}
                        className={[
                          "w-full px-4 py-3 rounded-2xl border text-sm text-black font-medium transition-all focus:outline-none focus:ring-2",
                          errors.tanggal
                            ? "border-red-400 focus:ring-red-300 bg-red-50/30"
                            : "border-gray-200 focus:border-brand-green focus:ring-brand-green/20 bg-gray-50/50 focus:bg-white",
                        ].join(" ")}
                      />
                      {errors.tanggal && (
                        <p className="mt-1 text-xs text-red-500 font-semibold">{errors.tanggal}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="waktu"
                        className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1.5"
                      >
                        Waktu / Jam Sesi (Opsional)
                      </label>
                      <input
                        type="text"
                        id="waktu"
                        name="waktu"
                        maxLength={60}
                        value={formData.waktu}
                        onChange={handleChange}
                        placeholder="Contoh: 09.00 WIB / Siang"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm text-black placeholder:text-gray-400 font-medium bg-gray-50/50 focus:bg-white focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Lokasi Acara / Venue */}
                  <div>
                    <label
                      htmlFor="lokasi"
                      className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1.5"
                    >
                      Lokasi Acara / Venue / Studio
                    </label>
                    <input
                      type="text"
                      id="lokasi"
                      name="lokasi"
                      maxLength={150}
                      value={formData.lokasi}
                      onChange={handleChange}
                      placeholder="Contoh: Gedung Bina Satria Banjarbaru / Studio Tegoer Sapa"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm text-black placeholder:text-gray-400 font-medium bg-gray-50/50 focus:bg-white focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
                    />
                  </div>

                  {/* Akun Instagram */}
                  <div>
                    <label
                      htmlFor="instagram"
                      className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1.5"
                    >
                      Akun Instagram (Opsional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">
                        @
                      </span>
                      <input
                        type="text"
                        id="instagram"
                        name="instagram"
                        maxLength={40}
                        value={formData.instagram}
                        onChange={handleChange}
                        placeholder="username_instagram"
                        className="w-full pl-9 pr-4 py-3 rounded-2xl border border-gray-200 text-sm text-black placeholder:text-gray-400 font-medium bg-gray-50/50 focus:bg-white focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Catatan Tambahan */}
                  <div>
                    <label
                      htmlFor="catatan"
                      className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1.5"
                    >
                      Catatan / Permintaan Khusus (Opsional)
                    </label>
                    <textarea
                      id="catatan"
                      name="catatan"
                      rows={3}
                      maxLength={500}
                      value={formData.catatan}
                      onChange={handleChange}
                      placeholder="Ceritakan gambaran konsep acara, adat yang dipakai, atau request tambahan lainnya..."
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm text-black placeholder:text-gray-400 font-medium bg-gray-50/50 focus:bg-white focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all resize-none"
                    />
                  </div>

                  {/* Tombol Submit Booking */}
                  <div className="pt-4">
                    {isStudioPackage ? (
                      <div className="space-y-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            alert(
                              "Mohon maaf, layanan Studio Professional saat ini sedang tidak tersedia untuk booking. Silakan pilih paket wisuda atau wedding."
                            );
                          }}
                          className="w-full py-4 rounded-full bg-amber-100 text-amber-950 font-bold text-sm tracking-wide border border-amber-300 hover:bg-amber-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span>Studio Sedang Tidak Tersedia</span>
                          <span aria-hidden="true">⚠️</span>
                        </button>
                        <Link
                          href="/pricelist"
                          className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-full bg-brand-green text-white font-bold text-xs tracking-wide hover:bg-brand-green/90 transition-colors shadow-sm"
                        >
                          <span>Pilih Paket Lain yang Tersedia →</span>
                        </Link>
                      </div>
                    ) : (
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full"
                      >
                        <span>Kirim Booking via WhatsApp</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Button>
                    )}

                    <p className="mt-3 text-center text-[11px] text-gray-400 font-medium">
                      🔒 Data Anda aman dan diteruskan secara privat ke Admin WhatsApp resmi Tegoer Sapa.
                    </p>
                  </div>

                </form>

              </div>
            </div>

          </div>
        )}
      </section>
    </div>
  );
}
