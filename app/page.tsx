import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import PhotoboxSpots from "@/components/sections/PhotoboxSpots";
import FeaturedStories from "@/components/sections/FeaturedStories";
import TrustOrbit from "@/components/sections/TrustOrbit";
import GalleryPreview from "@/components/sections/GalleryPreview";
import OurStory from "@/components/sections/OurStory";
import ClientStories from "@/components/sections/ClientStories";

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
      <PhotoboxSpots />
      <FeaturedStories />
      <GalleryPreview />
      <OurStory />
      <ClientStories />
      <TrustOrbit />
    </>
  );
}
