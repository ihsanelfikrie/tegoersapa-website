import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import GalleryPreview from "@/components/sections/GalleryPreview";
import AboutPreview from "@/components/sections/AboutPreview";

export const metadata: Metadata = {
  title: "Tegoer Sapa — Photobooth, Photobox & Professional Photo",
  description:
    "Studio photobooth, photobox, dan professional photography Tegoer Sapa. Abadikan momen spesial Anda — wedding, graduation, birthday, & corporate event.",
};

/**
 * Halaman Home (/)
 * Berfungsi sebagai navigasi hub lengkap yang mengarahkan user ke halaman detail masing-masing.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <GalleryPreview />
      <AboutPreview />
    </>
  );
}
