import type { Metadata } from "next";
import { contact } from "@/lib/content";
import HeroClouds from "@/components/ui/HeroClouds";
import GrassyHill from "@/components/ui/GrassyHill";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Kontak Kami",
  description:
    "Hubungi Tegoer Sapa untuk booking photobooth, foto studio, dan dokumentasi event di Banjarbaru, Kalimantan Selatan via WhatsApp atau media sosial.",
};

export default function KontakPage() {
  return (
    <div className="bg-white min-h-screen text-black">
      {/* ─── Hero Header ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 sm:pb-28 lg:pb-36 bg-brand-sky text-brand-dark overflow-hidden">
        {/* Floating Clouds Background */}
        <HeroClouds />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              <span className="hero-word">Hubungi</span>{" "}
              <span className="hero-word hero-word-green">Kami</span>
            </h1>
            <div className="w-16 h-1 rounded-full bg-brand-dark my-5" />
            <p className="text-base sm:text-lg text-brand-dark/80 font-medium leading-relaxed max-w-2xl">
              Ada pertanyaan seputar paket, ketersediaan tanggal, atau konsultasi konsep foto? Tim kami siap menyapa dan membantu Anda.
            </p>
          </div>
        </div>

        {/* Grassy Hill Bottom Decoration */}
        <GrassyHill />
      </section>

      {/* ─── Contact Cards Grid ─────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* WhatsApp Professional Photo */}
          <div className="p-5 sm:p-8 rounded-3xl border border-gray-100 bg-gray-50/50 flex flex-col justify-between hover:border-brand-green/30 transition-all duration-300">
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
              <Button
                href={`https://wa.me/${contact.whatsapp[0].raw}`}
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
          <div className="p-5 sm:p-8 rounded-3xl border border-gray-100 bg-gray-50/50 flex flex-col justify-between hover:border-brand-green/30 transition-all duration-300">
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
              <Button
                href={`https://wa.me/${contact.whatsapp[1].raw}`}
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
          <div className="p-5 sm:p-8 rounded-3xl border border-gray-100 bg-gray-50/50 flex flex-col justify-between hover:border-brand-green/30 transition-all duration-300">
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
