"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Custom cursor dengan efek trailing ring + instant dot.
 * Menggunakan GSAP quickTo untuk smooth lag follow.
 * Hanya aktif di device yang punya pointer fine (mouse/trackpad).
 * `mix-blend-difference` membuat cursor universal di semua background.
 */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hanya aktif di non-touch device
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    gsap.set([ring, dot], { opacity: 0 });

    // QuickTo — ring lag 0.5s, dot instant
    const xRing = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
    const xDot  = gsap.quickTo(dot,  "x", { duration: 0.08 });
    const yDot  = gsap.quickTo(dot,  "y", { duration: 0.08 });

    let visible = false;

    function onMove(e: MouseEvent) {
      xRing(e.clientX);
      yRing(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
      if (!visible) {
        gsap.to([ring, dot], { opacity: 1, duration: 0.4 });
        visible = true;
      }
    }

    // Membesar saat hover link / button
    function onOver(e: MouseEvent) {
      if ((e.target as HTMLElement).closest("a, button")) {
        gsap.to(ring, { scale: 2.5, duration: 0.3, ease: "power2.out" });
        gsap.to(dot,  { scale: 0,   duration: 0.2 });
      }
    }
    function onOut(e: MouseEvent) {
      if ((e.target as HTMLElement).closest("a, button")) {
        gsap.to(ring, { scale: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(dot,  { scale: 1, duration: 0.2 });
      }
    }
    function onLeave() {
      visible = false;
      gsap.to([ring, dot], { opacity: 0, duration: 0.3 });
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      {/* Ring — lag 0.5s di belakang kursor */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{ top: -16, left: -16, width: 32, height: 32 }}
      >
        <div className="w-full h-full rounded-full border border-white" />
      </div>
      {/* Dot — instant */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{ top: -3, left: -3, width: 6, height: 6 }}
      >
        <div className="w-full h-full rounded-full bg-white" />
      </div>
    </>
  );
}
