import type { Metadata } from "next";
import ServiceDetailPage from "@/components/sections/ServiceDetailPage";
import { photographyDetailPages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Graduation Photography — Tegoer Sapa",
  description:
    "Sesi foto wisuda outdoor kampus dan indoor studio ber-AC di Banjarbaru dengan berbagai paket personal, bestie, hingga keluarga oleh Tegoer Sapa.",
};

export default function GraduationPhotographyPage() {
  const data = photographyDetailPages.graduation;
  return <ServiceDetailPage data={data} />;
}
