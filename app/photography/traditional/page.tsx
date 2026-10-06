import type { Metadata } from "next";
import ServiceDetailPage from "@/components/sections/ServiceDetailPage";
import { photographyDetailPages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Traditional Photography — Tegoer Sapa",
  description:
    "Dokumentasi prosesi adat nusantara yang autentik, khidmat, dan penuh makna di Medan dan sekitarnya oleh fotografer profesional Tegoer Sapa.",
};

export default function TraditionalPhotographyPage() {
  const data = photographyDetailPages.traditional;
  return <ServiceDetailPage data={data} />;
}
