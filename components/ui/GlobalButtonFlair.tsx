"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initAllButtonFlairs } from "@/lib/buttonFlair";

/**
 * GlobalButtonFlair — Memastikan SEMUA tombol di seluruh halaman otomatis memiliki
 * efek timbul dan efek hover GSAP flair cursor tracking yang interaktif.
 */
export default function GlobalButtonFlair() {
  const pathname = usePathname();

  useEffect(() => {
    // Inisialisasi awal dan amati perubahan DOM
    const cleanup = initAllButtonFlairs();
    return () => {
      cleanup();
    };
  }, [pathname]);

  return null;
}
