"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll progress bar — thin 2px line di top viewport yang tumbuh kiri→kanan
 * seiring user scroll, menggunakan hardware-accelerated transform scaleX.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;

    function update() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (bar) {
            const scrollTop = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const progress = total > 0 ? Math.min(Math.max(scrollTop / total, 0), 1) : 0;
            bar.style.transform = `scaleX(${progress})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none"
    >
      <div
        ref={barRef}
        className="h-full w-full bg-brand-green origin-left will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
