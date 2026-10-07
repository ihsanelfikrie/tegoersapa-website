/**
 * lib/photoboxConfig.ts
 *
 * Single Source of Truth untuk penentuan manual frame/foto Photobox Tegoer Sapa.
 *
 * ATURAN SISTEM:
 * 1. Setiap foto HANYA masuk ke sub-kategori venue yang secara eksplisit ditentukan di sini.
 * 2. Kategori "Semua Photobox" otomatis menggabungkan seluruh foto dari venue yang terdaftar.
 * 3. Bentuk dan proporsi frame (landscape/portrait/square) disesuaikan secara otomatis dengan dimensi asli foto.
 * 4. Label "Frame X" dihilangkan sesuai permintaan user.
 */

export type PhotoboxVenueSlug = "sirkem" | "kean" | "hatara" | "nolima" | "aimee";

export interface PhotoboxVenueMeta {
  id: PhotoboxVenueSlug;
  label: string;
}

export const PHOTOBOX_VENUES: readonly PhotoboxVenueMeta[] = [
  { id: "sirkem", label: "Sirkem" },
  { id: "kean", label: "Kean" },
  { id: "hatara", label: "Hatara" },
  { id: "nolima", label: "Nolima" },
  { id: "aimee", label: "Aimee" },
] as const;

export interface PhotoboxCustomPhoto {
  key: string;
  filename: string;
  image: string;
  title?: string;
  width?: number;
  height?: number;
  aspectRatio?: "portrait" | "landscape" | "square";
  alt?: string;
}

export type PhotoboxEntry = string | number | PhotoboxCustomPhoto;

export const photoboxManualAssignments: Record<PhotoboxVenueSlug, PhotoboxEntry[]> = {
  sirkem: [
    {
      key: "sirkem-1",
      filename: "sirkem-1.webp",
      image: "/images/gallery/Photobox/sirkem/sirkem-1.webp",
      title: "Photobox Sirkem",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Sirkem - Tegoer Sapa Photobox",
    },
    {
      key: "sirkem-2",
      filename: "sirkem-2.webp",
      image: "/images/gallery/Photobox/sirkem/sirkem-2.webp",
      title: "Photobox Sirkem",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Sirkem - Tegoer Sapa Photobox",
    },
    {
      key: "sirkem-3",
      filename: "sirkem-3.webp",
      image: "/images/gallery/Photobox/sirkem/sirkem-3.webp",
      title: "Photobox Sirkem",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Sirkem - Tegoer Sapa Photobox",
    },
    {
      key: "sirkem-4",
      filename: "sirkem-4.webp",
      image: "/images/gallery/Photobox/sirkem/sirkem-4.webp",
      title: "Photobox Sirkem",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Sirkem - Tegoer Sapa Photobox",
    },
    {
      key: "sirkem-5",
      filename: "sirkem-5.webp",
      image: "/images/gallery/Photobox/sirkem/sirkem-5.webp",
      title: "Photobox Sirkem",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Sirkem - Tegoer Sapa Photobox",
    },
    {
      key: "sirkem-6",
      filename: "sirkem-6.webp",
      image: "/images/gallery/Photobox/sirkem/sirkem-6.webp",
      title: "Photobox Sirkem",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Sirkem - Tegoer Sapa Photobox",
    },
    {
      key: "sirkem-7",
      filename: "sirkem-7.webp",
      image: "/images/gallery/Photobox/sirkem/sirkem-7.webp",
      title: "Photobox Sirkem",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Sirkem - Tegoer Sapa Photobox",
    },
    {
      key: "sirkem-8",
      filename: "sirkem-8.webp",
      image: "/images/gallery/Photobox/sirkem/sirkem-8.webp",
      title: "Photobox Sirkem",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Sirkem - Tegoer Sapa Photobox",
    },
    {
      key: "sirkem-9",
      filename: "sirkem-9.webp",
      image: "/images/gallery/Photobox/sirkem/sirkem-9.webp",
      title: "Photobox Sirkem",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Sirkem - Tegoer Sapa Photobox",
    },
  ],
  kean: [
    {
      key: "kean-1",
      filename: "kean-1.webp",
      image: "/images/gallery/Photobox/kean/kean-1.webp",
      title: "Photobox Kean",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-2",
      filename: "kean-2.webp",
      image: "/images/gallery/Photobox/kean/kean-2.webp",
      title: "Photobox Kean",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-3",
      filename: "kean-3.webp",
      image: "/images/gallery/Photobox/kean/kean-3.webp",
      title: "Photobox Kean",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-4",
      filename: "kean-4.webp",
      image: "/images/gallery/Photobox/kean/kean-4.webp",
      title: "Photobox Kean",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-5",
      filename: "kean-5.webp",
      image: "/images/gallery/Photobox/kean/kean-5.webp",
      title: "Photobox Kean",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-6",
      filename: "kean-6.webp",
      image: "/images/gallery/Photobox/kean/kean-6.webp",
      title: "Photobox Kean",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-7",
      filename: "kean-7.webp",
      image: "/images/gallery/Photobox/kean/kean-7.webp",
      title: "Photobox Kean",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-8",
      filename: "kean-8.webp",
      image: "/images/gallery/Photobox/kean/kean-8.webp",
      title: "Photobox Kean",
      width: 1800,
      height: 1200,
      aspectRatio: "landscape",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-9",
      filename: "kean-9.webp",
      image: "/images/gallery/Photobox/kean/kean-9.webp",
      title: "Photobox Kean",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-10",
      filename: "kean-10.webp",
      image: "/images/gallery/Photobox/kean/kean-10.webp",
      title: "Photobox Kean",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-11",
      filename: "kean-11.webp",
      image: "/images/gallery/Photobox/kean/kean-11.webp",
      title: "Photobox Kean",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-12",
      filename: "kean-12.webp",
      image: "/images/gallery/Photobox/kean/kean-12.webp",
      title: "Photobox Kean",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-13",
      filename: "kean-13.webp",
      image: "/images/gallery/Photobox/kean/kean-13.webp",
      title: "Photobox Kean",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-14",
      filename: "kean-14.webp",
      image: "/images/gallery/Photobox/kean/kean-14.webp",
      title: "Photobox Kean",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-15",
      filename: "kean-15.webp",
      image: "/images/gallery/Photobox/kean/kean-15.webp",
      title: "Photobox Kean",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-16",
      filename: "kean-16.webp",
      image: "/images/gallery/Photobox/kean/kean-16.webp",
      title: "Photobox Kean",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-17",
      filename: "kean-17.webp",
      image: "/images/gallery/Photobox/kean/kean-17.webp",
      title: "Photobox Kean",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-18",
      filename: "kean-18.webp",
      image: "/images/gallery/Photobox/kean/kean-18.webp",
      title: "Photobox Kean",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-19",
      filename: "kean-19.webp",
      image: "/images/gallery/Photobox/kean/kean-19.webp",
      title: "Photobox Kean",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-20",
      filename: "kean-20.webp",
      image: "/images/gallery/Photobox/kean/kean-20.webp",
      title: "Photobox Kean",
      width: 1200,
      height: 1800,
      aspectRatio: "portrait",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
    {
      key: "kean-21",
      filename: "kean-21.webp",
      image: "/images/gallery/Photobox/kean/kean-21.webp",
      title: "Photobox Kean",
      width: 1800,
      height: 1200,
      aspectRatio: "landscape",
      alt: "Photobox Kean - Tegoer Sapa Photobox",
    },
  ],
  hatara: [],
  nolima: [],
  aimee: [],
};

/**
 * Resolusi item foto Photobox siap pakai untuk Gallery.
 * HANYA menampilkan foto yang didaftarkan secara eksplisit di photoboxManualAssignments.
 * Otomatis mendeteksi rasio aspek proporsional (landscape / portrait / square).
 */
export function getResolvedPhotoboxPhotos(): Array<{
  id: string;
  category: "Photobox";
  subCategory: string;
  categorySlug: "photobox";
  subCategorySlug: PhotoboxVenueSlug;
  title: string;
  image: string;
  width: number;
  height: number;
  aspectRatio: "portrait" | "landscape" | "square";
  alt: string;
}> {
  const result: Array<{
    id: string;
    category: "Photobox";
    subCategory: string;
    categorySlug: "photobox";
    subCategorySlug: PhotoboxVenueSlug;
    title: string;
    image: string;
    width: number;
    height: number;
    aspectRatio: "portrait" | "landscape" | "square";
    alt: string;
  }> = [];

  const seenPerVenue = new Set<string>();

  PHOTOBOX_VENUES.forEach((venue) => {
    const assignedList = photoboxManualAssignments[venue.id] || [];

    assignedList.forEach((input, index) => {
      let key = "";
      let filename = "";
      let imagePath = "";
      let title = "";
      let width = 1200;
      let height = 1800;
      let alt = "";

      if (typeof input === "object" && input !== null) {
        key = input.key || `${venue.id}-${index + 1}`;
        filename = input.filename || `${key}.webp`;
        imagePath = input.image;
        title = input.title || `Photobox ${venue.label}`;
        width = input.width || 1200;
        height = input.height || 1800;
        alt = input.alt || `${title} - Tegoer Sapa Photobox`;
      } else {
        const strVal = String(input).trim();
        const numMatch = strVal.match(/\d+/);
        const num = numMatch ? numMatch[0] : String(index + 1);

        key = `${venue.id}-${num}`;
        filename = `Photobox-${num}.webp`;
        imagePath = `/images/gallery/Photobox/${filename}`;
        title = `Photobox ${venue.label}`;
        alt = `${title} - Tegoer Sapa Photobox`;
      }

      const aspectRatio: "portrait" | "landscape" | "square" =
        width > height ? "landscape" : width < height ? "portrait" : "square";

      const dedupKey = `${venue.id}::${imagePath}`;
      if (seenPerVenue.has(dedupKey)) {
        return;
      }
      seenPerVenue.add(dedupKey);

      result.push({
        id: `ts-gal-photobox-${venue.id}-${key}`,
        category: "Photobox",
        subCategory: venue.label,
        categorySlug: "photobox",
        subCategorySlug: venue.id,
        title,
        image: imagePath,
        width,
        height,
        aspectRatio,
        alt,
      });
    });
  });

  return result;
}
