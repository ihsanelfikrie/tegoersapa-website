/**
 * lib/content.ts
 * Semua copy/teks website disimpan di sini — sesuai Bagian 4 AGENT.md.
 * JSX components TIDAK boleh hardcode teks; cukup import dari sini.
 */

// ─── Brand ──────────────────────────────────────────────────────────────────
export const brand = {
  name: "Tegoer Sapa",
  tagline: "Respect The Moment Every Second Matters",
  about:
    "Kami adalah penyedia layanan fotografi modern seperti photobooth, photobox, hingga foto profesional untuk berbagai kebutuhan Anda.",
  email: "tegoersapaa@gmail.com",
} as const;

// ─── Navbar ──────────────────────────────────────────────────────────────────
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Pricelist", href: "/pricelist" },
  { label: "Gallery", href: "/gallery" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
] as const;

export const navCta = {
  label: "Booking Sekarang",
  // WhatsApp Professional Photo — sesuai Bagian 2.3 AGENT.md
  href: "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Profesional%20Photo",
} as const;

// ─── Hero (Home) ─────────────────────────────────────────────────────────────
export const heroHome = {
  title: "TEGOER SAPA",
  tagline: brand.tagline,
  cta: {
    primary: { label: "Lihat Gallery", href: "/gallery" },
    secondary: { label: "Cek Pricelist", href: "/pricelist" },
  },
} as const;

/**
 * Slot foto untuk Hero mosaic (kolom kanan di desktop).
 * ⬇️ CARA GANTI FOTO:
 *   1. Taruh file foto ke folder public/images/hero/
 *   2. Ubah field `src` di masing-masing slot sesuai nama file
 *   3. Update `alt` dengan deskripsi foto yang sebenarnya
 *
 * Layout mosaic:
 *   Slot 0 → besar kiri atas   (portrait, 2 baris tinggi)
 *   Slot 1 → kecil kanan atas
 *   Slot 2 → kecil kanan bawah
 *   Slot 3 → lebar bawah       (landscape, full width)
 */
export type HeroPhoto = {
  id: string;
  src: string;           // path dari /public (misal "/images/hero/foto-1.webp")
  alt: string;
  category: string;      // label badge di pojok foto
  placeholder: boolean;  // true = belum ada foto, tampilkan placeholder styled
};

export const heroPhotos: HeroPhoto[] = [
  {
    id: "hero-photo-1",
    src: "/images/hero/hero-1.webp",
    alt: "Momen pernikahan yang diabadikan oleh Tegoer Sapa",
    category: "Wedding",
    placeholder: true,
  },
  {
    id: "hero-photo-2",
    src: "/images/hero/hero-2.webp",
    alt: "Sesi foto wisuda oleh Tegoer Sapa",
    category: "Graduation",
    placeholder: true,
  },
  {
    id: "hero-photo-3",
    src: "/images/hero/hero-3.webp",
    alt: "Photobooth event corporate Tegoer Sapa",
    category: "Corporate",
    placeholder: true,
  },
  {
    id: "hero-photo-4",
    src: "/images/hero/hero-4.webp",
    alt: "Sesi foto profesional Tegoer Sapa",
    category: "Professional",
    placeholder: true,
  },
];

// ─── Layanan ─────────────────────────────────────────────────────────────────
export const services = [
  {
    id: "photobooth",
    title: "Photobooth",
    description:
      "Foto instan di acara dengan properti lucu dan kamera otomatis.",
    href: "/gallery/photobooth",
  },
  {
    id: "photobox",
    title: "Photobox",
    description:
      "Mesin foto di tempat umum yang mencetak foto secara instan dengan berbagai pilihan frame.",
    href: "/gallery/photobox",
  },
  {
    id: "professional",
    title: "Professional Photo",
    description:
      "Profesional photographer dengan hasil premium yang ditata dengan gaya.",
    href: "/gallery/professional",
  },
] as const;

// ─── Kontak ──────────────────────────────────────────────────────────────────
export const contact = {
  email: brand.email,
  whatsapp: [
    {
      label: "Professional Photo",
      number: "+62 822-5409-2927",
      raw: "6282254092927",
    },
    {
      label: "Photobooth",
      number: "+62 881-0805-18887",
      raw: "628810805188087",
    },
  ],
  social: [
    {
      platform: "Instagram",
      handle: "@tegoersapa.photobooth",
      url: "https://instagram.com/tegoersapa.photobooth",
    },
    {
      platform: "Instagram",
      handle: "@bertegoersapa_",
      url: "https://instagram.com/bertegoersapa_",
    },
    {
      platform: "TikTok",
      handle: "@tegoersapaa",
      url: "https://tiktok.com/@tegoersapaa",
    },
  ],
} as const;

// ─── Pricelist ───────────────────────────────────────────────────────────────
// Tipe data paket
export type PricePackage = {
  id: string;
  nama: string;
  kategori: "Profesional Studio" | "Outdoor Graduation";
  fitur: string[];
  harga: string;
  /** key untuk generateWhatsAppLink() */
  whatsappTemplate: "personal" | "family" | "group" | "indoor-graduation" | "prewed" | "outdoor-basic" | "outdoor-premium" | "outdoor-homie" | "outdoor-bestie" | "outdoor-unity" | "outdoor-framely";
};

export const pricelistPackages: PricePackage[] = [
  // ── Profesional Studio ──────────────────────────────────────────────────
  {
    id: "personal",
    nama: "Personal",
    kategori: "Profesional Studio",
    fitur: [
      "1 kostum",
      "1 background",
      "20 menit sesi",
      "15 foto edit",
      "5 lembar 5R",
      "Semua soft file",
    ],
    harga: "Rp 300.000",
    whatsappTemplate: "personal",
  },
  {
    id: "family",
    nama: "Family",
    kategori: "Profesional Studio",
    fitur: [
      "3–5 orang",
      "20 menit sesi",
      "15 foto edit",
      "5 lembar 5R",
      "Semua soft file",
      "+Rp35.000/orang tambahan",
    ],
    harga: "Rp 400.000",
    whatsappTemplate: "family",
  },
  {
    id: "group",
    nama: "Group",
    kategori: "Profesional Studio",
    fitur: [
      "3 orang",
      "1 background",
      "20 menit sesi",
      "15 foto edit",
      "Foto 5R per orang",
      "Semua soft file",
      "+Rp35.000/orang tambahan",
    ],
    harga: "Rp 350.000",
    whatsappTemplate: "group",
  },
  {
    id: "indoor-graduation",
    nama: "Indoor Graduation",
    kategori: "Profesional Studio",
    fitur: [
      "3 orang",
      "1 background",
      "20 menit sesi",
      "15 foto edit",
      "Foto 5R per orang",
      "Semua soft file",
      "+Rp35.000/orang tambahan",
    ],
    harga: "Rp 350.000",
    whatsappTemplate: "indoor-graduation",
  },
  {
    id: "prewed",
    nama: "Prewed/Poswed",
    kategori: "Profesional Studio",
    fitur: [
      "1 kostum",
      "1 background",
      "30 menit sesi",
      "15 foto edit",
      "5 lembar 5R",
      "Semua soft file",
    ],
    harga: "Rp 750.000",
    whatsappTemplate: "prewed",
  },
  // ── Outdoor Graduation ──────────────────────────────────────────────────
  {
    id: "outdoor-basic",
    nama: "Basic",
    kategori: "Outdoor Graduation",
    fitur: [
      "1 graduate",
      "Family & friend",
      "Unlimited shoot",
      "20 menit sesi",
      "20 foto edit",
      "Semua soft file",
    ],
    harga: "Rp 350.000",
    whatsappTemplate: "outdoor-basic",
  },
  {
    id: "outdoor-premium",
    nama: "Premium",
    kategori: "Outdoor Graduation",
    fitur: [
      "1 graduate",
      "Family & friend",
      "Unlimited shoot",
      "50 menit sesi",
      "50 foto edit",
      "Semua soft file",
    ],
    harga: "Rp 450.000",
    whatsappTemplate: "outdoor-premium",
  },
  {
    id: "outdoor-homie",
    nama: "Homie",
    kategori: "Outdoor Graduation",
    fitur: [
      "2 graduate",
      "Family & friend",
      "Unlimited shoot",
      "50 menit sesi",
      "20 foto edit",
      "Semua soft file",
    ],
    harga: "Rp 600.000",
    whatsappTemplate: "outdoor-homie",
  },
  {
    id: "outdoor-bestie",
    nama: "Bestie",
    kategori: "Outdoor Graduation",
    fitur: [
      "2 graduate",
      "Family & friend",
      "Unlimited shoot",
      "80 menit sesi",
      "50 foto edit",
      "Semua soft file",
    ],
    harga: "Rp 725.000",
    whatsappTemplate: "outdoor-bestie",
  },
  {
    id: "outdoor-unity",
    nama: "Unity",
    kategori: "Outdoor Graduation",
    fitur: [
      "3–5 graduate",
      "Personal & group shoot",
      "Family & friend",
      "Unlimited shoot",
      "50 menit sesi",
      "20 foto edit",
      "Semua soft file",
    ],
    harga: "Rp 750.000",
    whatsappTemplate: "outdoor-unity",
  },
  {
    id: "outdoor-framely",
    nama: "Framely",
    kategori: "Outdoor Graduation",
    fitur: [
      "3–5 graduate",
      "Personal & group shoot",
      "Family & friend",
      "Unlimited shoot",
      "80 menit sesi",
      "50 foto edit",
      "Semua soft file",
    ],
    harga: "Rp 1.000.000",
    whatsappTemplate: "outdoor-framely",
  },
];

// ─── Gallery Taksonomi ────────────────────────────────────────────────────────
export const galleryCategories = [
  {
    id: "professional",
    label: "Professional Photo",
    subs: [
      { id: "indoor-graduation", label: "Indoor Graduation" },
      { id: "outdoor-graduation", label: "Outdoor Graduation" },
      { id: "prewedding", label: "Pre-Wedding" },
    ],
  },
  {
    id: "photobooth",
    label: "Photobooth",
    subs: [
      { id: "event", label: "Event" },
      { id: "birthday", label: "Birthday" },
      { id: "wedding", label: "Wedding" },
      { id: "corporate", label: "Corporate" },
    ],
  },
  {
    id: "photobox",
    label: "Photobox",
    subs: [],
  },
] as const;

// ─── Portfolio Preview (Homepage) ────────────────────────────────────────────
export type PortfolioPreviewItem = {
  id: string;
  category: string;
  subCategory: string;
  title: string;
  image: string; // path relatif dari public
  href: string; // link internal ke gallery dengan filter query param
};

export const portfolioPreview: PortfolioPreviewItem[] = [
  {
    id: "pv-pb-wedding",
    category: "Photobooth",
    subCategory: "Wedding",
    title: "Wedding Photobooth Classic",
    image: "/images/portfolio/pb-wedding-preview.jpg",
    href: "/gallery?kategori=photobooth&sub=wedding",
  },
  {
    id: "pv-pb-birthday",
    category: "Photobooth",
    subCategory: "Birthday",
    title: "Birthday Photobooth Fun",
    image: "/images/portfolio/pb-birthday-preview.jpg",
    href: "/gallery?kategori=photobooth&sub=birthday",
  },
  {
    id: "pv-pb-event",
    category: "Photobooth",
    subCategory: "Event",
    title: "Corporate Launch Event",
    image: "/images/portfolio/pb-event-preview.jpg",
    href: "/gallery?kategori=photobooth&sub=event",
  },
  {
    id: "pv-px-kean",
    category: "Photobox",
    subCategory: "TS x Kean",
    title: "Tegoer Sapa x Kean",
    image: "/images/portfolio/px-kean-preview.jpg",
    href: "/gallery?kategori=photobox",
  },
  {
    id: "pv-px-sirkem",
    category: "Photobox",
    subCategory: "TS x Sirkem",
    title: "Tegoer Sapa x Sirkem",
    image: "/images/portfolio/px-sirkem-preview.jpg",
    href: "/gallery?kategori=photobox",
  },
  {
    id: "pv-px-aime",
    category: "Photobox",
    subCategory: "TS x Aime",
    title: "Tegoer Sapa x Aime",
    image: "/images/portfolio/px-aime-preview.jpg",
    href: "/gallery?kategori=photobox",
  },
  {
    id: "pv-pf-indoor-grad",
    category: "Professional",
    subCategory: "Indoor Graduation",
    title: "Indoor Graduation Studio",
    image: "/images/portfolio/pf-indoor-grad-preview.jpg",
    href: "/gallery?kategori=professional&sub=indoor-graduation",
  },
  {
    id: "pv-pf-outdoor-grad",
    category: "Professional",
    subCategory: "Outdoor Graduation",
    title: "Outdoor Graduation Moment",
    image: "/images/portfolio/pf-outdoor-grad-preview.jpg",
    href: "/gallery?kategori=professional&sub=outdoor-graduation",
  },
  {
    id: "pv-pf-prewed",
    category: "Professional",
    subCategory: "Pre-Wedding",
    title: "Pre-Wedding Outdoor Love",
    image: "/images/portfolio/pf-prewed-preview.jpg",
    href: "/gallery?kategori=professional&sub=prewedding",
  },
];

