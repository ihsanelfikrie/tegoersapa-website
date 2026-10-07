"use client";

import React, { useState } from "react";
import { contact } from "@/lib/content";
import Button from "@/components/ui/Button";

export default function KontakContent() {
  const [copiedToast, setCopiedToast] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedToast(`${label} berhasil disalin ke clipboard!`);
      setTimeout(() => setCopiedToast(null), 3000);
    }
  };

  const quickInquiries = [
    {
      label: "💍 Tanya Jadwal Wedding",
      wa: contact.whatsapp[0].raw,
      msg: "Halo kak Mau tanya ketersediaan jadwal foto wedding dokumentasi Tegoer Sapa",
    },
    {
      label: "🎓 Tanya Jadwal Wisuda",
      wa: contact.whatsapp[0].raw,
      msg: "Halo kak Mau tanya slot jadwal foto wisuda outdoor di Banjarbaru",
    },
    {
      label: "📸 Sewa Photobooth Event",
      wa: contact.whatsapp[1].raw,
      msg: "Halo kak Mau konsultasi sewa photobooth instan untuk acara kami",
    },
    {
      label: "🛺 Booking Bajaj Keliling",
      wa: contact.whatsapp[1].raw,
      msg: "Halo kak Mau booking Bajaj Photobooth Tegoer Keliling untuk event",
    },
    {
      label: "🎨 Custom Frame Overlay",
      wa: contact.whatsapp[1].raw,
      msg: "Halo kak Mau tanya kustomisasi layout dan frame overlay photobooth",
    },
    {
      label: "🚀 Info Mingle & Barcode (Upcoming)",
      wa: contact.whatsapp[1].raw,
      msg: "Halo kak Mau tanya info rilis & pre-order layanan Mingle Photobooth & Photo Barcode Tegoer Sapa",
    },
  ];

  return (
    <div className="space-y-16">
      {/* ─── Contact Cards Grid ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* WhatsApp Professional Photo */}
        <div className="p-6 sm:p-8 rounded-3xl border border-gray-200/80 bg-white shadow-xs flex flex-col justify-between hover:border-brand-green/40 hover:shadow-md transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-green/15 text-brand-green flex items-center justify-center text-xl font-bold">
                💬
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20">
                Layanan Foto
              </span>
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green">
              WhatsApp Admin 1
            </span>
            <h2 className="text-2xl font-black text-brand-dark tracking-wide mt-1">
              Professional Photo
            </h2>
            <p className="text-xs text-gray-500 mt-2 font-medium leading-relaxed">
              Untuk pertanyaan paket dokumentasi wedding, wisuda outdoor kampus, prosesi adat, dan pre-wedding.
            </p>

            <div className="mt-4 p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                  Nomor WhatsApp
                </span>
                <span className="text-sm font-black text-brand-dark">
                  {contact.whatsapp[0].number}
                </span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(contact.whatsapp[0].number, "Nomor Admin 1")}
                className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:border-brand-green text-[11px] font-bold text-gray-600 hover:text-brand-green transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                title="Salin nomor WhatsApp"
              >
                <span>📋</span>
                <span>Salin</span>
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
            <Button
              href={`https://wa.me/${contact.whatsapp[0].raw}?text=${encodeURIComponent(
                "Halo kak Mau tanya layanan Professional Photo Tegoer Sapa"
              )}`}
              variant="primary"
              size="md"
              className="w-full"
            >
              <span>Chat {contact.whatsapp[0].number}</span>
              <span>↗</span>
            </Button>
          </div>
        </div>

        {/* WhatsApp Photobooth */}
        <div className="p-6 sm:p-8 rounded-3xl border border-gray-200/80 bg-white shadow-xs flex flex-col justify-between hover:border-brand-green/40 hover:shadow-md transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-green/15 text-brand-green flex items-center justify-center text-xl font-bold">
                📸
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20">
                Photobooth
              </span>
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green">
              WhatsApp Admin 2
            </span>
            <h2 className="text-2xl font-black text-brand-dark tracking-wide mt-1">
              Photobooth & Bajaj
            </h2>
            <p className="text-xs text-gray-500 mt-2 font-medium leading-relaxed">
              Pemesanan cetak instan wedding & birthday, armada Bajaj Tegoer Keliling, self-photo photobox, serta info layanan upcoming (Mingle & Barcode).
            </p>

            <div className="mt-4 p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                  Nomor WhatsApp
                </span>
                <span className="text-sm font-black text-brand-dark">
                  {contact.whatsapp[1].number}
                </span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(contact.whatsapp[1].number, "Nomor Admin 2")}
                className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:border-brand-green text-[11px] font-bold text-gray-600 hover:text-brand-green transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                title="Salin nomor WhatsApp"
              >
                <span>📋</span>
                <span>Salin</span>
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
            <Button
              href={`https://wa.me/${contact.whatsapp[1].raw}?text=${encodeURIComponent(
                "Halo kak Mau tanya layanan Photobooth Tegoer Sapa"
              )}`}
              variant="primary"
              size="md"
              className="w-full"
            >
              <span>Chat {contact.whatsapp[1].number}</span>
              <span>↗</span>
            </Button>
          </div>
        </div>

        {/* Email & Media Sosial */}
        <div className="p-6 sm:p-8 rounded-3xl border border-gray-200/80 bg-white shadow-xs flex flex-col justify-between hover:border-brand-green/40 hover:shadow-md transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-green/15 text-brand-green flex items-center justify-center text-xl font-bold">
                ✉️
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20">
                Official Channels
              </span>
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green">
              Email & Medsos
            </span>
            <h2 className="text-2xl font-black text-brand-dark tracking-wide mt-1">
              Kanal Resmi
            </h2>

            <div className="mt-4 p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                  Email Resmi
                </span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-xs font-black text-brand-dark hover:text-brand-green transition-colors truncate block max-w-[170px]"
                >
                  {contact.email}
                </a>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(contact.email, "Alamat Email")}
                className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 hover:border-brand-green text-[11px] font-bold text-gray-600 hover:text-brand-green transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                title="Salin email resmi"
              >
                <span>📋</span>
                <span>Salin</span>
              </button>
            </div>

            <div className="mt-3 space-y-1.5">
              {contact.social.map((soc) => (
                <a
                  key={soc.handle}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/70 border border-gray-100 hover:border-brand-green/40 hover:bg-white text-gray-700 font-bold text-xs transition-all"
                >
                  <span>
                    {soc.platform}: <span className="font-semibold">{soc.handle}</span>
                  </span>
                  <span className="text-brand-green text-xs">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] text-gray-400 text-center font-medium">
            Tersambung langsung dengan official creative team
          </div>
        </div>
      </div>

      {/* ─── Konsultasi Cepat Sekali Klik (Quick Chips) ───────────── */}
      <div className="rounded-3xl border border-gray-200 bg-gray-50/70 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green block">
              Fast Track Inquiry
            </span>
            <h3 className="text-lg sm:text-xl font-black text-brand-dark">
              Konsultasi Cepat Berdasarkan Topik
            </h3>
          </div>
          <span className="text-xs text-gray-500 font-medium">
            Klik topik untuk memulai chat WhatsApp dengan draf pesan otomatis:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {quickInquiries.map((inq) => (
            <a
              key={inq.label}
              href={`https://api.whatsapp.com/send?phone=${inq.wa}&text=${encodeURIComponent(
                inq.msg
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-2xl bg-white border border-gray-200/90 hover:border-brand-green text-xs font-bold text-gray-700 hover:text-brand-dark transition-all shadow-2xs hover:shadow-xs flex items-center gap-2"
            >
              <span>{inq.label}</span>
              <span className="text-brand-green text-xs">↗</span>
            </a>
          ))}
        </div>
      </div>

      {/* ─── Floating Toast Notification ─────────────────────────── */}
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
