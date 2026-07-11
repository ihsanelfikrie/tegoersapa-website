"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Scroll progress bar — thin 2px line di top viewport yang tumbuh kiri→kanan
 * seiring user scroll, menggunakan GSAP set dengan scaleX.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    function update() {
      const scrollTop = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? scrollTop / total : 0;
      gsap.set(bar, { scaleX: progress, transformOrigin: "left center" });
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[100]"
    >
      <div
        ref={barRef}
        className="h-full w-full bg-brand-green origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
