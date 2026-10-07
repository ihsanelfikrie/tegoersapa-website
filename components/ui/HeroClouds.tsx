import React from "react";
import Image from "next/image";

/**
 * HeroClouds — Dekorasi awan putih melayang untuk Hero section semua halaman.
 * Bergerak halus melintasi langit biru (bg-brand-sky).
 */
export default function HeroClouds() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
    >
      {/* Awan atas */}
      <Image
        src="/brand/awan.svg"
        alt=""
        width={677}
        height={408}
        unoptimized
        priority
        className="cloud-flow cloud-flow-a absolute top-2 sm:top-4 lg:top-6 left-0 w-[20rem] sm:w-[28rem] lg:w-[36rem] max-w-none pointer-events-none opacity-90"
      />
      {/* Awan bawah */}
      <Image
        src="/brand/awan.svg"
        alt=""
        width={677}
        height={408}
        unoptimized
        priority
        className="cloud-flow cloud-flow-b absolute bottom-14 sm:bottom-20 lg:bottom-24 left-0 w-[14rem] sm:w-[20rem] lg:w-[26rem] max-w-none pointer-events-none opacity-85"
      />
    </div>
  );
}
