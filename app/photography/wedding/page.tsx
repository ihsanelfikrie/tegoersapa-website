import type { Metadata } from "next";
import ServiceDetailPage from "@/components/sections/ServiceDetailPage";
import { photographyDetailPages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Wedding Documentation — Tegoer Sapa",
  description:
    "Visual sinematik mengabadikan hari pernikahan sakral, momen haru, dan kebahagiaan hari H serta sesi pre-wedding oleh Tegoer Sapa.",
};

export default function WeddingPhotographyPage() {
  const data = photographyDetailPages.wedding;
  return <ServiceDetailPage data={data} />;
}
