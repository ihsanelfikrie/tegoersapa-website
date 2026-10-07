import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tegoersapa.com";
  const currentDate = new Date().toISOString();

  const routes = [
    "",
    "/photography",
    "/photography/traditional",
    "/photography/wedding",
    "/photography/graduation",
    "/photography/studio",
    "/photobooth",
    "/pricelist",
    "/gallery",
    "/tentang",
    "/kontak",
    "/booking",
    "/links",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
    priority:
      route === ""
        ? 1.0
        : route.startsWith("/photography") ||
          route === "/photobooth" ||
          route === "/pricelist"
        ? 0.9
        : 0.7,
  }));
}
