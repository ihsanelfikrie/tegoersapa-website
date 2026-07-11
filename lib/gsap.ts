/**
 * lib/gsap.ts
 * Satu-satunya tempat registrasi GSAP plugin — sesuai Bagian 6 AGENT.md.
 * Import modul ini di setiap komponen yang butuh GSAP/plugin, BUKAN register ulang.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";

// Guard: hanya register di client-side (window tersedia)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip, SplitText);
}

export { gsap, ScrollTrigger, Flip, SplitText };
