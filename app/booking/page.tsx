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

  const [photoboothPrefs, setPhotoboothPrefs] = useState({
    backdrop: "Hijau",
    layout: "STRIP Photo Print (2R • 2 pcs)",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDraftPreview, setShowDraftPreview] = useState(false);
  const [copiedDraftToast, setCopiedDraftToast] = useState(false);
  const todayDate = new Date().toISOString().split("T")[0];

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

  // Determine if chosen package is Photobooth / Bajaj
  const isPhotobooth = Boolean(
    selectedPackage &&
      (selectedPackage.kategori?.toLowerCase().includes("photobooth") ||
        selectedPackage.kategori?.toLowerCase().includes("photobox") ||
        selectedPackage.kategori?.toLowerCase().includes("bajaj") ||
        selectedPackage.id?.toLowerCase().includes("photobooth") ||
        selectedPackage.id?.toLowerCase().includes("photobox") ||
        selectedPackage.id?.toLowerCase().includes("bajaj") ||
        selectedPackage.id?.toLowerCase().startsWith("pb-") ||
        selectedPackage.id?.toLowerCase().includes("mingle") ||
        selectedPackage.sourceUrl?.includes("photobooth"))
  );

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

  // Live builder for formatted WhatsApp message
  const buildWhatsAppMessage = () => {
    if (!selectedPackage) return "";

    const addOnLines =
      selectedAddOns.length > 0
        ? selectedAddOns.map((item) => `  • ${item.nama} (${item.harga})`).join("\n")
        : "  • Tidak ada add-on yang dipilih";

    const cleanNama = formData.nama.replace(/[<>]/g, "").trim() || "[Nama Belum Diisi]";
    const cleanWhatsapp = formData.whatsapp.replace(/[^\d+-\s]/g, "").trim() || "[No. WA Belum Diisi]";
    const cleanWaktu = formData.waktu.replace(/[<>]/g, "").trim();
    const cleanLokasi = formData.lokasi.replace(/[<>]/g, "").trim();
    const cleanInstagram = formData.instagram.replace(/[^\w._]/g, "").trim();
    const cleanCatatan = formData.catatan.replace(/[<>]/g, "").trim();

    const photoboothDetailsText = isPhotobooth
      ? `\n🎨 PREFERENSI PHOTOBOOTH:
• Pilihan Backdrop: ${photoboothPrefs.backdrop}
• Format Layout / Cetak: ${photoboothPrefs.layout}`
      : "";

    return `Halo Tegoer Sapa, saya ingin melakukan reservasi / booking:

📋 DETAIL PEMESAN
• Nama: ${cleanNama}
• No. WhatsApp: ${cleanWhatsapp}
• Tanggal Acara: ${formData.tanggal || "[Tanggal Belum Dipilih]"}
• Waktu: ${cleanWaktu || "Fleksibel / Sesuai Jadwal"}
• Lokasi / Venue: ${cleanLokasi || "Studio / Belum Ditentukan"}
• Instagram: ${cleanInstagram ? `@${cleanInstagram}` : "-"}

📦 PAKET YANG DIPILIH
• Paket: ${selectedPackage.nama} (${selectedPackage.kategori || "Dokumentasi"})
• Harga Paket: ${selectedPackage.harga}${photoboothDetailsText}

➕ ADD-ON OPSIONAL
${addOnLines}

💰 ESTIMASI TOTAL BIAYA:
${totalCalculation.totalText}

📝 Catatan Tambahan:
${cleanCatatan || "-"}

Mohon konfirmasi ketersediaan slot tanggal & instruksi pembayaran DP. Terima kasih!`;
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

    const message = buildWhatsAppMessage();

    const adminPhone = isPhotobooth
      ? contact.whatsapp[1]?.raw || "6281350655747"
      : contact.whatsapp[0]?.raw || "6282254092927";

    const waUrl = `https://api.whatsapp.com/send?phone=${adminPhone}&text=${encodeURIComponent(
      message
    )}`;

    setIsSubmitted(true);
    // Open WhatsApp in new tab
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

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
          <div className="max-w-3xl flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-center lg:text-left">
              <span className="hero-word">Formulir</span>{" "}
              <span className="hero-word hero-word-green">Reservasi</span>
            </h1>
            <div className="w-16 h-1 rounded-full bg-brand-dark my-5 mx-auto lg:mx-0" />
            <p className="text-base sm:text-lg text-brand-dark/80 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Konfirmasikan paket dan add-on pilihan Anda. Data pilihan langsung tersimpan dan diteruskan ke tim Tegoer Sapa untuk penjadwalan.
            </p>

            {/* Steps indicator */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-bold text-brand-dark">
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
            <div className="w-16 h-16 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-brand-dark">
              Anda Belum Memilih Paket Layanan
            </h2>
            <p className="mt-2.5 text-sm text-gray-500 font-medium leading-relaxed max-w-md mx-auto">
              Silakan pilih paket dokumentasi terlebih dahulu agar rincian layanan dan estimasi total dapat dihitung secara otomatis.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                href="/photography/wedding#packages"
                variant="dark"
                size="sm"
              >
                <span>Pilih Paket Wedding</span>
              </Button>
              <Button
                href="/photography/graduation#packages"
                variant="dark"
                size="sm"
              >
                <span>Pilih Paket Wisuda</span>
              </Button>
              <button
                type="button"
                onClick={() => {
                  alert(
                    "Mohon maaf, layanan Studio Professional saat ini sedang tidak tersedia untuk booking."
                  );
                }}
                className="px-5 py-2.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 font-bold text-xs tracking-wide transition-all hover:bg-amber-100 cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Paket Studio (Tidak Tersedia)</span>
              </button>
              <Button
                href="/pricelist"
                variant="stroke"
                size="sm"
              >
                <span>Lihat Semua Pricelist</span>
              </Button>
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
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-800 flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
                        !
                      </span>
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
                        "w-full px-4 py-3 rounded-2xl border text-base sm:text-sm text-black placeholder:text-gray-400 font-medium transition-all focus:outline-none focus:ring-2",
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
                        "w-full px-4 py-3 rounded-2xl border text-base sm:text-sm text-black placeholder:text-gray-400 font-medium transition-all focus:outline-none focus:ring-2",
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
                        min={todayDate}
                        value={formData.tanggal}
                        onChange={handleChange}
                        className={[
                          "w-full px-4 py-3 rounded-2xl border text-base sm:text-sm text-black font-medium transition-all focus:outline-none focus:ring-2",
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
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-base sm:text-sm text-black placeholder:text-gray-400 font-medium bg-gray-50/50 focus:bg-white focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
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
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-base sm:text-sm text-black placeholder:text-gray-400 font-medium bg-gray-50/50 focus:bg-white focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
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
                        className="w-full pl-9 pr-4 py-3 rounded-2xl border border-gray-200 text-base sm:text-sm text-black placeholder:text-gray-400 font-medium bg-gray-50/50 focus:bg-white focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Preferensi Khusus Photobooth (Tampil jika memilih Photobooth) */}
                  {isPhotobooth && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-brand-green/5 border border-brand-green/20 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green block">
                            Preferensi Khusus Photobooth
                          </span>
                          <h4 className="text-sm font-black text-brand-dark">
                            Pilihan Backdrop & Format Cetak (Opsional)
                          </h4>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20">
                          Katalog Resmi
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-dark mb-1.5">
                          Pilihan Warna Backdrop:
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {["Merah", "Hijau", "Biru High School", "Biru Navy", "Cream"].map((color) => (
                            <button
                              key={color}
                              type="button"
                              onClick={() => setPhotoboothPrefs((prev) => ({ ...prev, backdrop: color }))}
                              className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                                photoboothPrefs.backdrop === color
                                  ? "bg-brand-dark text-white ring-2 ring-brand-green shadow-xs"
                                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-dark mb-1.5">
                          Format Layout / Ukuran Cetak:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {[
                            { label: "STRIP Photo Print (2R • 2 pcs)", val: "STRIP (2 pcs)" },
                            { label: "4R Photo Print Postcard (1 pcs)", val: "4R Postcard (1 pcs)" },
                          ].map((item) => (
                            <button
                              key={item.val}
                              type="button"
                              onClick={() => setPhotoboothPrefs((prev) => ({ ...prev, layout: item.val }))}
                              className={`py-2.5 px-3 text-center rounded-xl text-xs font-bold transition-all ${
                                photoboothPrefs.layout === item.val
                                  ? "bg-brand-dark text-white ring-2 ring-brand-green shadow-xs"
                                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

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
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-base sm:text-sm text-black placeholder:text-gray-400 font-medium bg-gray-50/50 focus:bg-white focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all resize-none"
                    />
                  </div>

                  {/* Pratinjau Draf Pesan WhatsApp Accordion */}
                  <div className="rounded-2xl border border-brand-green/20 bg-brand-green/5 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowDraftPreview((prev) => !prev)}
                      className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-brand-dark hover:bg-brand-green/10 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>Pratinjau Draf Pesan WhatsApp</span>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-brand-green/15 text-brand-green">
                          Live Preview
                        </span>
                      </div>
                      <span className="text-brand-green font-bold">
                        {showDraftPreview ? "Sembunyikan ▲" : "Lihat Format ▼"}
                      </span>
                    </button>

                    {showDraftPreview && (
                      <div className="p-4 pt-0 space-y-3">
                        <div className="p-3.5 rounded-xl bg-white border border-gray-200 text-xs font-mono text-gray-700 whitespace-pre-wrap leading-relaxed shadow-2xs max-h-60 overflow-y-auto">
                          {buildWhatsAppMessage()}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-gray-500 font-medium">
                            Pesan ini otomatis terisi dan siap dikirim saat WhatsApp terbuka.
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (typeof navigator !== "undefined" && navigator.clipboard) {
                                navigator.clipboard.writeText(buildWhatsAppMessage());
                                setCopiedDraftToast(true);
                                setTimeout(() => setCopiedDraftToast(false), 2500);
                              }
                            }}
                            className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 hover:border-brand-green text-[11px] font-bold text-gray-700 hover:text-brand-green transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
                          >
                            <span>{copiedDraftToast ? "Tersalin!" : "Salin Teks"}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tombol Submit Booking */}
                  <div className="pt-4 space-y-3">
                    {/* Ringkasan Cepat di Mobile (sebelum tombol kirim) */}
                    {selectedPackage && (
                      <div className="lg:hidden p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                            Paket: {selectedPackage.nama}
                          </span>
                          <span className="font-extrabold text-brand-dark">
                            Total: <strong className="text-brand-green font-black">{totalCalculation.totalText}</strong>
                          </span>
                        </div>
                        {selectedAddOns.length > 0 && (
                          <span className="text-[10px] font-bold text-gray-500 bg-white px-2 py-1 rounded-lg border border-gray-200">
                            +{selectedAddOns.length} Add-on
                          </span>
                        )}
                      </div>
                    )}
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
                        </button>
                        <Button
                          href="/pricelist"
                          variant="primary"
                          size="sm"
                          className="w-full"
                        >
                          <span>Pilih Paket Lain yang Tersedia →</span>
                        </Button>
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

                    <p className="mt-3 text-center text-[11px] text-gray-400 font-medium flex items-center justify-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Data Anda aman dan diteruskan secara privat ke Admin WhatsApp resmi Tegoer Sapa.</span>
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
