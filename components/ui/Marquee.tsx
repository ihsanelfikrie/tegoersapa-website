"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

const ITEMS = [
  "Photobooth",
  "Photobox",
  "Professional Photo",
  "Wedding",
  "Birthday",
  "Graduation",
  "Corporate Event",
  "Outdoor Graduation",
  "Pre-Wedding",
];

const MARQUEE_ITEMS = [...ITEMS, ...ITEMS];

/**
 * Infinite horizontal scroll ticker (marquee) menggunakan GSAP xPercent.
 * Item diduplikasi agar loop seamless saat xPercent mencapai -50%.
 * Diletakkan antara Hero dan Services sebagai visual transition.
 */
export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const anim = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: 28,
      repeat: -1,
    });

    // Slow down on hover, resume on leave
    const wrapper = track.parentElement;
    const handleEnter = () => anim.timeScale(0.3);
    const handleLeave = () => anim.timeScale(1);

    if (wrapper) {
      wrapper.addEventListener("mouseenter", handleEnter);
      wrapper.addEventListener("mouseleave", handleLeave);
    }

    return () => {
      anim.kill();
      if (wrapper) {
        wrapper.removeEventListener("mouseenter", handleEnter);
        wrapper.removeEventListener("mouseleave", handleLeave);
      }
    };
  }, []);

  return (
    <div
      className="overflow-hidden py-4 bg-brand-dark border-y border-white/5"
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex items-center will-change-transform"
        style={{ width: "max-content" }}
      >
        {MARQUEE_ITEMS.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-0 flex-shrink-0">
            <span className="text-white/35 text-[11px] font-bold tracking-[0.25em] uppercase whitespace-nowrap px-8">
              {item}
            </span>
            <span className="text-brand-green/50 text-sm" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
