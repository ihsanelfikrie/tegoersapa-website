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
  mapsUrl?: string;
  address?: string;
}

export const PHOTOBOX_VENUES: readonly PhotoboxVenueMeta[] = [
  {
    id: "sirkem",
    label: "Sirkem",
    mapsUrl: "https://maps.app.goo.gl/GPzjBY3dBXuUr5ESA",
    address: "Loktabat Utara, Banjarbaru",
  },
  {
    id: "kean",
    label: "Kean",
    mapsUrl: "https://share.google/ypoJPLN7wFOWoAoF0",
    address: "Banjarbaru, Kalimantan Selatan",
  },
  {
    id: "hatara",
    label: "Hatara",
    mapsUrl: "https://maps.app.goo.gl/vi8YYLQFtV66T2Ft9",
    address: "Guntung Paikat, Banjarbaru",
  },
  {
    id: "nolima",
    label: "Nolima",
    mapsUrl: "https://share.google/qLC2FpGFKW0oyvTpm",
    address: "Banjarbaru, Kalimantan Selatan",
  },
  {
    id: "aimee",
    label: "Aimee",
    mapsUrl: "https://share.google/5MfvXeEBPDw0aRFjW",
    address: "Banjarbaru, Kalimantan Selatan",
  },
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

function createVenuePhotos(
  venueId: PhotoboxVenueSlug,
  venueLabel: string,
  count: number,
  landscapeIndices: number[] = []
): PhotoboxCustomPhoto[] {
  return Array.from({ length: count }, (_, i) => {
    const num = i + 1;
    const isLandscape = landscapeIndices.includes(num);
    return {
      key: `${venueId}-${num}`,
      filename: `${venueId}-${num}.webp`,
      image: `/images/gallery/Photobox/${venueId}/${venueId}-${num}.webp`,
      title: `Photobox ${venueLabel}`,
      width: isLandscape ? 1800 : 1200,
      height: isLandscape ? 1200 : 1800,
      aspectRatio: isLandscape ? "landscape" : "portrait",
      alt: `Photobox ${venueLabel} - Tegoer Sapa Photobox`,
    };
  });
}

export const photoboxManualAssignments: Record<PhotoboxVenueSlug, PhotoboxEntry[]> = {
  sirkem: createVenuePhotos("sirkem", "Sirkem", 9),
  kean: createVenuePhotos("kean", "Kean", 21, [8, 21]),
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
