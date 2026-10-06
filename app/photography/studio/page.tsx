import type { Metadata } from "next";
import ServiceDetailPage from "@/components/sections/ServiceDetailPage";
import { photographyDetailPages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Studio Professional — Tegoer Sapa",
  description:
    "Sesi foto studio berkualitas tinggi dengan tata cahaya presisi, backdrop elegan, dan pengarahan gaya profesional oleh Tegoer Sapa.",
};

export default function StudioPhotographyPage() {
  const data = photographyDetailPages.studio;
  return <ServiceDetailPage data={data} />;
}
