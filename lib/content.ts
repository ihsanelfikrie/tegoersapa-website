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
// ─── Navbar ──────────────────────────────────────────────────────────────────
export type NavSubItem = {
  label: string;
  href: string;
  description: string;
};

export type NavItem = {
  label: string;
  href: string;
  subItems?: readonly NavSubItem[];
};

export const navLinks: readonly NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Photography",
    href: "/photography",
    subItems: [
      {
        label: "Traditional Photography",
        href: "/photography#traditional",
        description: "Dokumentasi prosesi adat & tradisi budaya autentik",
      },
      {
        label: "Wedding Documentation",
        href: "/photography#wedding",
        description: "Visual sinematik & sakral untuk hari pernikahan",
      },
      {
        label: "Graduation",
        href: "/photography#graduation",
        description: "Abadikan momen kelulusan indoor & outdoor kampus",
      },
      {
        label: "Studio Professional",
        href: "/photography#studio",
        description: "Sesi foto studio eksklusif dengan tata cahaya presisi",
      },
    ],
  },
  {
    label: "Photobooth",
    href: "/photobooth",
    subItems: [
      {
        label: "Photobooth",
        href: "/photobooth#photobooth",
        description: "Cetak instan & properti seru di lokasi acara",
      },
      {
        label: "Photobox",
        href: "/photobooth#photobox",
        description: "Mesin foto mandiri modern dengan frame kekinian",
      },
      {
        label: "Mingle Photobooth",
        href: "/photobooth#mingle",
        description: "Fotografer keliling dengan cetak & sharing langsung",
      },
      {
        label: "Photo Barcode",
        href: "/photobooth#barcode",
        description: "Scan barcode instan untuk unduh foto acara",
      },
    ],
  },
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
    id: "traditional-photography",
    title: "Traditional Photography",
    description:
      "Dokumentasi prosesi adat dan tradisi budaya dengan sentuhan fotografi yang autentik dan penuh makna.",
    href: "/photography#traditional",
  },
  {
    id: "wedding-documentation",
    title: "Wedding Documentation",
    description:
      "Abadikan setiap detik sakral dan momen romantis pernikahan Anda dengan visual sinematik dan berkelas.",
    href: "/photography#wedding",
  },
  {
    id: "graduation",
    title: "Graduation",
    description:
      "Rayakan kelulusan dan kebanggaan momen wisuda bersama keluarga dan sahabat dengan hasil foto yang memukau.",
    href: "/photography#graduation",
  },
  {
    id: "studio-professional",
    title: "Studio Professional",
    description:
      "Sesi foto studio berkualitas tinggi dengan tata cahaya presisi dan pengarahan gaya profesional.",
    href: "/photography#studio",
  },
  {
    id: "photobooth",
    title: "Photobooth",
    description:
      "Layanan photo booth interaktif di lokasi acara dengan cetak instan, properti seru, dan desain frame kustom.",
    href: "/photobooth#photobooth",
  },
  {
    id: "photobox",
    title: "Photobox",
    description:
      "Mesin foto mandiri modern yang mencetak foto secara instan dengan berbagai pilihan template frame kekinian.",
    href: "/photobooth#photobox",
  },
  {
    id: "mingle-photobooth",
    title: "Mingle Photobooth",
    description:
      "Fotografer keliling interaktif di tengah tamu undangan dengan cetak instan atau digital sharing langsung di tempat.",
    href: "/photobooth#mingle",
  },
  {
    id: "photo-barcode",
    title: "Photo Barcode",
    description:
      "Solusi akses dan unduh hasil foto acara secara cepat, praktis, dan instan via scan barcode personal.",
    href: "/photobooth#barcode",
  },
] as const;

// ─── Detail Kategori Photography & Documentation ─────────────────────────────
export type PhotographyCategoryDetail = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  galleryFilter: { kategori: string; sub?: string };
  pricelistFilter?: string;
  whatsappMessage: string;
};

export const photographyDetails: PhotographyCategoryDetail[] = [
  {
    id: "traditional",
    tag: "Adat & Budaya",
    title: "Traditional Photography",
    subtitle: "Dokumentasi Prosesi Adat yang Autentik & Khidmat",
    description:
      "Setiap tradisi menyimpan nilai sakral dan cerita turun-temurun. Kami mendokumentasikan setiap prosesi adat nusantara dengan kepekaan budaya tinggi, menangkap detail busana tradisional, ekspresi penuh makna, dan kebersamaan keluarga besar.",
    highlights: [
      "Dokumentasi urutan prosesi adat secara menyeluruh tanpa terlewat",
      "Penangkapan detail ornamen, motif busana adat, dan tata rias",
      "Fotografer berpengalaman mendampingi prosesi budaya di Medan & sekitarnya",
      "Color grading elegan yang mempertahankan keaslian warna busana tradisional",
    ],
    galleryFilter: { kategori: "professional" },
    pricelistFilter: "Profesional Studio",
    whatsappMessage: "Halo kak, saya ingin konsultasi dokumentasi Traditional Photography",
  },
  {
    id: "wedding",
    tag: "Pernikahan & Prewed",
    title: "Wedding Documentation",
    subtitle: "Visual Sinematik Mengabadikan Hari Paling Bersejarah",
    description:
      "Pernikahan adalah momen sekali seumur hidup yang penuh keharuan dan kebahagiaan. Melalui pendekatan foto jurnalistik dan arahan portrait sinematik, kami mengabadikan tatapan cinta, tangisan haru orang tua, serta kemeriahan resepsi Anda.",
    highlights: [
      "Liputan lengkap mulai dari persiapan, akad nikah/pemberkatan, hingga resepsi",
      "Sentuhan foto candid emosional dan pose romantis yang natural",
      "Seluruh file foto resolusi tinggi melalui link download cepat",
      "Tersedia opsi cetak foto 5R, album kolase eksklusif, dan cetak kanvas",
    ],
    galleryFilter: { kategori: "photobooth", sub: "wedding" },
    pricelistFilter: "Profesional Studio",
    whatsappMessage: "Halo kak, saya ingin tanya paket Wedding Documentation / Prewedding",
  },
  {
    id: "graduation",
    tag: "Kelulusan & Wisuda",
    title: "Graduation Photography",
    subtitle: "Abadikan Momen Kelulusan & Kebanggaan Bersama",
    description:
      "Pencapaian wisuda adalah buah dari kerja keras dan kebanggaan keluarga. Kami menghadirkan sesi foto wisuda outdoor di lingkungan kampus maupun indoor studio ber-AC dengan berbagai pilihan paket personal, bestie, maupun keluarga besar.",
    highlights: [
      "Pilihan sesi Outdoor Kampus dan Indoor Studio",
      "Bisa foto individual, bersama bestie, sahabat satu kelompok, hingga keluarga",
      "Unlimited shoot selama durasi sesi dengan retouched photos berkualitas",
      "Paket harga terjangkau mulai dari Basic, Premium, Homie, Bestie, hingga Framely",
    ],
    galleryFilter: { kategori: "professional", sub: "outdoor-graduation" },
    pricelistFilter: "Outdoor Graduation",
    whatsappMessage: "Halo kak, saya mau booking sesi Foto Wisuda / Graduation",
  },
  {
    id: "studio",
    tag: "Studio Portrait",
    title: "Studio Professional",
    subtitle: "Pencahayaan Presisi & Sesi Foto Studio Berkualitas Tinggi",
    description:
      "Studio foto Tegoer Sapa dilengkapi peralatan lighting modern dan backdrop pilihan untuk kebutuhan personal branding, foto wisuda indoor, maternity, portrait keluarga, maupun photoshoot grup dengan pengarahan gaya yang profesional dan nyaman.",
    highlights: [
      "Lighting studio terstandar untuk hasil gambar tajam berdimensi",
      "Pilihan background studio elegan dan minimalis",
      "Pengarahan pose yang santai untuk hasil ekspresi natural dan percaya diri",
      "Cetak foto 5R berkualitas lab dan soft file lengkap",
    ],
    galleryFilter: { kategori: "professional", sub: "indoor-graduation" },
    pricelistFilter: "Profesional Studio",
    whatsappMessage: "Halo kak, saya ingin booking sesi Studio Professional Photo",
  },
];

// ─── Detail Kategori Photobooth & Interactive Experience ─────────────────────
export type PhotoboothCategoryDetail = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  galleryFilter: { kategori: string; sub?: string };
  whatsappMessage: string;
  waNumber: string;
};

export const photoboothDetails: PhotoboothCategoryDetail[] = [
  {
    id: "photobooth",
    tag: "Event & Party",
    title: "Photobooth Event",
    subtitle: "Foto Instan Seru & Souvenir Berkesan untuk Para Tamu",
    description:
      "Hadirkan keseruan di pesta pernikahan, ulang tahun, gathering perusahaan, atau konser dengan layanan photobooth instan kami. Tamu berpose dengan properti menarik dan langsung membawa pulang hasil cetak foto berkualitas tinggi dalam hitungan detik.",
    highlights: [
      "Printer dye-sublimation super cepat dengan kualitas warna tajam dan anti luntur",
      "Desain template frame kustom bertuliskan nama acara, logo, atau tema perayaan",
      "Pilihan properti lucu, kacamata unik, bando, dan fun signage",
      "Crew dan operator profesional yang siap memandu tamu selama acara",
    ],
    galleryFilter: { kategori: "photobooth" },
    whatsappMessage: "Halo kak, mau tanya informasi paket Photobooth untuk acara",
    waNumber: "628810805188087",
  },
  {
    id: "photobox",
    tag: "Self-Studio Box",
    title: "Photobox",
    subtitle: "Mesin Foto Mandiri Modern dengan Template Frame Kekinian",
    description:
      "Photobox mandiri dengan sentuhan teknologi modern yang memudahkan siapa saja berfoto bebas tanpa rasa canggung. Lengkap dengan wireless shutter clicker, monitor preview real-time, dan ragam frame desain kolaborasi unik yang estetik.",
    highlights: [
      "Self-timer atau remote clicker untuk kontrol foto mandiri yang leluasa",
      "Pilihan ukuran cetak strip 2x6 dan 4R dengan layout kekinian",
      "Filter warna estetik: natural, black & white, vintage warm, dan vibrant",
      "Soft file langsung dikirim ke smartphone melalui scan QR code instan",
    ],
    galleryFilter: { kategori: "photobox" },
    whatsappMessage: "Halo kak, mau tanya informasi Photobox Tegoer Sapa",
    waNumber: "628810805188087",
  },
  {
    id: "mingle",
    tag: "Roaming Photo",
    title: "Mingle Photobooth",
    subtitle: "Fotografer Keliling Aktif Menjangkau Setiap Sudut Acara",
    description:
      "Fotografer keliling yang menyapa tamu langsung di meja atau area standing party. Mengabadikan momen interaksi spontan tanpa membuat tamu harus mengantre di satu titik booth tertentu.",
    highlights: [
      "Fotografer mobile menjelajah ke seluruh area tamu undangan",
      "Tangkap momen candid, tawa ceria, dan interaksi hangat tanpa jeda",
      "Dukungan mobile printer nirkabel untuk cetak cepat di lokasi",
      "Sangat ideal untuk resepsi pernikahan besar, gala dinner, dan corporate gathering",
    ],
    galleryFilter: { kategori: "photobooth", sub: "event" },
    whatsappMessage: "Halo kak, mau konsultasi Mingle Photobooth untuk event",
    waNumber: "628810805188087",
  },
  {
    id: "barcode",
    tag: "Digital Live Sharing",
    title: "Photo Barcode",
    subtitle: "Unduh Soft File Foto Acara Secara Real-Time via Scan Barcode",
    description:
      "Solusi praktis dan ramah lingkungan bagi tamu acara untuk mengakses seluruh dokumentasi foto mereka. Cukup arahkan kamera smartphone ke QR barcode personal atau display banner untuk mengunduh foto beresolusi tinggi langsung.",
    highlights: [
      "Sistem cloud hosting live yang langsung update begitu foto diambil",
      "Scan QR barcode cepat dari kamera ponsel tanpa perlu download aplikasi",
      "Kualitas file asli (high-definition) siap untuk diunggah ke Instagram Story / Feed",
      "Dashboard gallery acara yang rapi, aman, dan mudah dibagikan",
    ],
    galleryFilter: { kategori: "photobooth" },
    whatsappMessage: "Halo kak, mau tanya layanan Photo Barcode untuk acara kami",
    waNumber: "628810805188087",
  },
];

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

