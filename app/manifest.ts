import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tegoer Sapa — Photobooth, Photobox & Professional Photo",
    short_name: "Tegoer Sapa",
    description:
      "Layanan photobooth, photobox, dan professional photography untuk wedding, birthday, graduation, dan corporate event di Banjarbaru & Kalimantan Selatan.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#8cd2f5",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
