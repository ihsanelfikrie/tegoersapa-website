import type { Metadata } from "next";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Kontak Kami",
  description:
    "Hubungi Tegoer Sapa untuk booking photobooth, foto studio, dan dokumentasi event di Medan via WhatsApp atau media sosial.",
};

export default function KontakPage() {
  return (
    <div className="bg-white min-h-screen text-black">
      {/* ─── Hero Header ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 bg-brand-dark text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green/15 border border-brand-green/30 text-brand-green text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Hubungi <span className="text-brand-green">Tegoer Sapa</span>
            </h1>
            <div className="w-14 h-1 rounded-full bg-brand-green my-5" />
            <p className="text-base sm:text-lg text-white/70 font-medium leading-relaxed">
              Ada pertanyaan seputar paket, ketersediaan tanggal, atau konsultasi konsep foto? Tim kami siap menyapa dan membantu Anda.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Contact Cards Grid ─────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* WhatsApp Professional Photo */}
          <div className="p-8 rounded-3xl border border-gray-100 bg-gray-50/50 flex flex-col justify-between hover:border-brand-green/30 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-green/15 text-brand-green flex items-center justify-center text-xl font-bold mb-6">
                💬
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green">
                WhatsApp Admin 1
              </span>
              <h2 className="text-2xl font-black text-brand-dark tracking-wide mt-1">
                Professional Photo
              </h2>
              <p className="text-xs text-gray-500 mt-2 font-medium">
                Untuk pertanyaan paket studio, wisuda outdoor & indoor, traditional adat, serta pre-wedding.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <a
                href={`https://wa.me/${contact.whatsapp[0].raw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-dark hover:bg-brand-green text-white font-bold text-xs tracking-wide px-5 py-3.5 rounded-2xl transition-all duration-200"
              >
                <span>Chat {contact.whatsapp[0].number}</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* WhatsApp Photobooth */}
          <div className="p-8 rounded-3xl border border-gray-100 bg-gray-50/50 flex flex-col justify-between hover:border-brand-green/30 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-green/15 text-brand-green flex items-center justify-center text-xl font-bold mb-6">
                📸
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green">
                WhatsApp Admin 2
              </span>
              <h2 className="text-2xl font-black text-brand-dark tracking-wide mt-1">
                Photobooth & Photobox
              </h2>
              <p className="text-xs text-gray-500 mt-2 font-medium">
                Untuk pemesanan booth instan pesta pernikahan, ulang tahun, corporate event, photobox, dan photo barcode.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <a
                href={`https://wa.me/${contact.whatsapp[1].raw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-dark hover:bg-brand-green text-white font-bold text-xs tracking-wide px-5 py-3.5 rounded-2xl transition-all duration-200"
              >
                <span>Chat {contact.whatsapp[1].number}</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Email & Media Sosial */}
          <div className="p-8 rounded-3xl border border-gray-100 bg-gray-50/50 flex flex-col justify-between hover:border-brand-green/30 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-green/15 text-brand-green flex items-center justify-center text-xl font-bold mb-6">
                ✉️
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green">
                Email & Medsos
              </span>
              <h2 className="text-2xl font-black text-brand-dark tracking-wide mt-1">
                Kanal Resmi
              </h2>
              
              <div className="mt-4 space-y-2 text-xs">
                <p className="text-gray-500 font-medium">
                  <span className="font-bold text-brand-dark">Email: </span>
                  <a href={`mailto:${contact.email}`} className="text-brand-green hover:underline">
                    {contact.email}
                  </a>
                </p>
                <div className="pt-2 space-y-1.5">
                  {contact.social.map((soc) => (
                    <a
                      key={soc.handle}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-xl bg-white border border-gray-100 hover:border-brand-green text-gray-700 font-semibold"
                    >
                      <span>{soc.platform}: {soc.handle}</span>
                      <span className="text-brand-green">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 text-[11px] text-gray-400 text-center font-medium">
              Operasional: Setiap Hari (09.00 - 21.00 WIB)
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
