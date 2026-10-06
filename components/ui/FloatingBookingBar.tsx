"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBooking } from "@/lib/BookingContext";
import Button from "@/components/ui/Button";

export default function FloatingBookingBar() {
  const pathname = usePathname();
  const { selectedPackage, selectedAddOns, totalCalculation, isHydrated, clearAll } =
    useBooking();

  // Don't render on /booking page or if no package is selected, or before hydration
  if (!isHydrated || !selectedPackage || pathname === "/booking") {
    return null;
  }

  const addOnCount = selectedAddOns.length;

  return (
    <aside
      aria-label="Ringkasan Pilihan Booking Sementara"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto"
    >
      <div className="bg-brand-dark/95 backdrop-blur-md border border-brand-green/40 shadow-2xl shadow-black/40 rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 text-white flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 ring-1 ring-white/10">
        
        {/* Detail Paket & Add-on terpilih */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="w-9 h-9 rounded-full bg-brand-green/20 border border-brand-green/40 flex items-center justify-center text-brand-green font-bold text-sm flex-shrink-0">
            ✓
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                {selectedPackage.nama}
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/15">
                {selectedPackage.kategori || "Paket"}
              </span>
            </div>
            <p className="text-[11px] text-white/60 font-medium">
              {addOnCount > 0 ? (
                <span className="text-brand-green font-semibold">
                  + {addOnCount} Add-on dipilih
                </span>
              ) : (
                "Tanpa Add-on"
              )}
            </p>
          </div>
        </div>

        {/* Total & Tombol Lanjut ke Booking */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t sm:border-t-0 border-white/10 pt-2 sm:pt-0">
          <div className="text-left sm:text-right">
            <span className="text-[10px] text-white/50 uppercase tracking-wider block font-bold">
              Estimasi Total
            </span>
            <span className="text-sm sm:text-base font-black text-brand-green">
              {totalCalculation.totalText}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              href="/booking"
              variant="primary"
              size="sm"
            >
              <span>Booking</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>

            <button
              onClick={clearAll}
              title="Batalkan pilihan"
              aria-label="Batalkan pilihan paket"
              className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </aside>
  );
}
