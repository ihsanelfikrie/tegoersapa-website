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
        href: "/photography/traditional",
        description: "Dokumentasi prosesi adat & tradisi budaya autentik",
      },
      {
        label: "Wedding Documentation",
        href: "/photography/wedding",
        description: "Visual sinematik & sakral untuk hari pernikahan",
      },
      {
        label: "Graduation",
        href: "/photography/graduation",
        description: "Abadikan momen kelulusan indoor & outdoor kampus",
      },
      {
        label: "Studio Professional",
        href: "/photography/studio",
        description: "Sesi foto studio eksklusif dengan tata cahaya presisi",
      },
    ],
  },
  {
    label: "Photobooth",
    href: "/photobooth",
    subItems: [
      {
        label: "Photobooth Reguler",
        href: "/photobooth#pricing",
        description: "Cetak instan & properti seru di lokasi acara",
      },
      {
        label: "Bajaj Photobooth",
        href: "/photobooth#bajaj-photobooth",
        description: "Armada ikonik Tegoer Keliling unik & viral",
      },
      {
        label: "Daftar Harga Photobooth",
        href: "/pricelist?tab=photobooth",
        description: "Pricelist resmi No Print & Unlimited Print (2–6 Jam)",
      },
      {
        label: "Photobox & Upcoming (Mingle / Barcode)",
        href: "/photobooth#services",
        description: "Photobox instan & layanan inovasi coming soon",
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
    src: "/images/pricelist/outdoor-framely.webp",
    alt: "Outdoor Graduation moment oleh Tegoer Sapa",
    category: "Graduation",
    placeholder: false,
  },
  {
    id: "hero-photo-2",
    src: "/images/pricelist/prewed-poswed.webp",
    alt: "Sesi foto prewedding romantis oleh Tegoer Sapa",
    category: "Pre-Wedding",
    placeholder: false,
  },
  {
    id: "hero-photo-3",
    src: "/images/pricelist/photobooth-open-space.webp",
    alt: "Photobooth open space event oleh Tegoer Sapa",
    category: "Photobooth",
    placeholder: false,
  },
  {
    id: "hero-photo-4",
    src: "/images/pricelist/family.webp",
    alt: "Sesi foto studio keluarga hangat oleh Tegoer Sapa",
    category: "Family Studio",
    placeholder: false,
  },
];

// ─── Layanan ─────────────────────────────────────────────────────────────────
export const services = [
  {
    id: "traditional-photography",
    title: "Traditional Photography",
    description:
      "Dokumentasi prosesi adat dan tradisi budaya dengan sentuhan fotografi yang autentik dan penuh makna.",
    href: "/photography/traditional",
  },
  {
    id: "wedding-documentation",
    title: "Wedding Documentation",
    description:
      "Abadikan setiap detik sakral dan momen romantis pernikahan Anda dengan visual sinematik dan berkelas.",
    href: "/photography/wedding",
  },
  {
    id: "graduation",
    title: "Graduation",
    description:
      "Rayakan kelulusan dan kebanggaan momen wisuda bersama keluarga dan sahabat dengan hasil foto yang memukau.",
    href: "/photography/graduation",
  },
  {
    id: "studio-professional",
    title: "Studio Professional",
    description:
      "Sesi foto studio berkualitas tinggi dengan tata cahaya presisi dan pengarahan gaya profesional.",
    href: "/photography/studio",
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
    title: "Mingle Photobooth (Coming Soon)",
    description:
      "Fotografer keliling interaktif di tengah tamu undangan dengan cetak instan atau digital sharing langsung di tempat (Segera Hadir).",
    href: "/photobooth#services",
  },
  {
    id: "photo-barcode",
    title: "Photo Barcode (Coming Soon)",
    description:
      "Solusi akses dan unduh hasil foto acara secara cepat, praktis, dan instan via scan barcode personal (Segera Hadir).",
    href: "/photobooth#services",
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
      "Fotografer berpengalaman mendampingi prosesi budaya di Banjarbaru & sekitarnya",
      "Color grading elegan yang mempertahankan keaslian warna busana tradisional",
    ],
    galleryFilter: { kategori: "professional" },
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
    whatsappMessage: "Halo kak, saya ingin tanya paket Wedding Documentation / Prewedding",
  },
  {
    id: "graduation",
    tag: "Kelulusan & Wisuda",
    title: "Graduation Photography",
    subtitle: "Abadikan Momen Kelulusan & Kebanggaan Bersama",
    description:
      "Pencapaian wisuda adalah buah dari kerja keras dan kebanggaan keluarga. Kami menghadirkan sesi foto wisuda outdoor di lingkungan kampus dengan berbagai pilihan paket personal, bestie, maupun keluarga besar.",
    highlights: [
      "Pilihan sesi Outdoor Kampus",
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
  isUpcoming?: boolean;
  upcomingBadge?: string;
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
    waNumber: "6281350655747",
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
    waNumber: "6281350655747",
  },
  {
    id: "bajaj-photobooth",
    tag: "Mobile Iconic Booth",
    title: "Bajaj Photobooth",
    subtitle: "Tegoer Keliling — Photobooth Unik di Dalam Armada Bajaj",
    description:
      "Sensasi berfoto seru dan instagramable langsung di dalam kabin armada Bajaj ikonik Tegoer Sapa. Menghadirkan daya tarik visual yang sangat viral dan memorable untuk tamu pesta Anda.",
    highlights: [
      "Armada Bajaj hijau khas Tegoer Keliling yang disulap menjadi photo booth",
      "Setup kamera profesional, monitor live preview, dan lighting studio terstandar",
      "Opsi cetak instan unlimited dan soft file via scan QR code cepat",
      "Sangat cocok untuk outdoor wedding, festival musik, bazaar, dan pesta ulang tahun",
    ],
    galleryFilter: { kategori: "photobooth", sub: "event" },
    whatsappMessage: "Halo kak, mau konsultasi Bajaj Photobooth (Tegoer Keliling) untuk event",
    waNumber: "6281350655747",
  },
  {
    id: "mingle",
    tag: "Roaming Photo",
    title: "Mingle Photobooth",
    subtitle: "Fotografer Keliling Aktif Menjangkau Setiap Sudut Acara",
    isUpcoming: true,
    upcomingBadge: "Coming Soon",
    description:
      "Fotografer keliling yang menyapa tamu langsung di meja atau area standing party. Mengabadikan momen interaksi spontan tanpa membuat tamu harus mengantre di satu titik booth tertentu (Segera Hadir).",
    highlights: [
      "Fotografer mobile menjelajah ke seluruh area tamu undangan",
      "Tangkap momen candid, tawa ceria, dan interaksi hangat tanpa jeda",
      "Dukungan mobile printer nirkabel untuk cetak cepat di lokasi",
      "Sangat ideal untuk resepsi pernikahan besar, gala dinner, dan corporate gathering",
    ],
    galleryFilter: { kategori: "photobooth", sub: "event" },
    whatsappMessage: "Halo kak, mau tanya informasi layanan Mingle Photobooth yang akan segera hadir",
    waNumber: "6281350655747",
  },
  {
    id: "barcode",
    tag: "Digital Live Sharing",
    title: "Photo Barcode",
    subtitle: "Unduh Soft File Foto Acara Secara Real-Time via Scan Barcode",
    isUpcoming: true,
    upcomingBadge: "Coming Soon",
    description:
      "Solusi praktis dan ramah lingkungan bagi tamu acara untuk mengakses seluruh dokumentasi foto mereka. Cukup arahkan kamera smartphone ke QR barcode personal atau display banner untuk mengunduh foto beresolusi tinggi langsung (Segera Hadir).",
    highlights: [
      "Sistem cloud hosting live yang langsung update begitu foto diambil",
      "Scan QR barcode cepat dari kamera ponsel tanpa perlu download aplikasi",
      "Kualitas file asli (high-definition) siap untuk diunggah ke Instagram Story / Feed",
      "Dashboard gallery acara yang rapi, aman, dan mudah dibagikan",
    ],
    galleryFilter: { kategori: "photobooth" },
    whatsappMessage: "Halo kak, mau tanya informasi layanan Photo Barcode yang akan segera hadir",
    waNumber: "6281350655747",
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
      number: "+62 813-5065-5747",
      raw: "6281350655747",
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

// ─── Photobooth Catalog & Price List (Sesuai Katalog Resmi No Brand) ─────────
export type PhotoboothDurationTier = {
  duration: string; // "2 Jam", "3 Jam", dst
  hours: number;
  harga: string;
  numericPrice: number;
};

export type PhotoboothPackage = {
  id: string;
  nama: string;
  category: "Photobooth Reguler" | "Bajaj Photobooth";
  type: "print" | "no-print";
  badge?: string;
  isBestDeal?: boolean;
  description: string;
  fitur: string[];
  durations: PhotoboothDurationTier[];
  additionalHourRate: string;
  additionalHourNumeric: number;
  image?: string;
};

export const photoboothPackages: PhotoboothPackage[] = [
  // ── 1. Photobooth Reguler - No Print ──
  {
    id: "pb-reg-noprint",
    nama: "Photobooth Reguler (No Print)",
    category: "Photobooth Reguler",
    type: "no-print",
    description:
      "Layanan photobooth digital interaktif dengan kamera & lightning profesional, soft file langsung unduh tanpa cetak fisik.",
    image: "/images/pricelist/photobooth-open-space.webp",
    fitur: [
      "Profesional Camera & Lightning",
      "Unlimited Photo",
      "Free Photo Frame Digital",
      "Free GIF Animation",
      "Backdrop Selection (5 Pilihan Warna)",
      "Free to Use Property / Aksesoris Lucu",
      "QR Code Share File (Scan & Unduh Langsung)",
      "Special Custom Design Layout Overlay",
    ],
    durations: [
      { duration: "2 Jam", hours: 2, harga: "Rp 1.500.000", numericPrice: 1500000 },
      { duration: "3 Jam", hours: 3, harga: "Rp 1.700.000", numericPrice: 1700000 },
      { duration: "4 Jam", hours: 4, harga: "Rp 1.900.000", numericPrice: 1900000 },
      { duration: "5 Jam", hours: 5, harga: "Rp 2.200.000", numericPrice: 2200000 },
      { duration: "6 Jam", hours: 6, harga: "Rp 2.500.000", numericPrice: 2500000 },
    ],
    additionalHourRate: "Rp 600.000 / jam",
    additionalHourNumeric: 600000,
  },
  // ── 2. Photobooth Reguler - Print (Best Deal) ──
  {
    id: "pb-reg-print",
    nama: "Photobooth Reguler (Print)",
    category: "Photobooth Reguler",
    type: "print",
    badge: "Best Deal",
    isBestDeal: true,
    description:
      "Paket terfavorit! Cetak foto instan tanpa batas (Unlimited Print) kualitas prima yang bisa langsung dibawa pulang tamu.",
    image: "/images/pricelist/photobooth-packages-preview.webp",
    fitur: [
      "Profesional Camera & Lightning",
      "Unlimited Photo",
      "Unlimited Print (Cetak Instan Tanpa Batas)",
      "Free Photo Frame Fisik & Digital",
      "Free GIF Animation",
      "Backdrop Selection (5 Pilihan Warna)",
      "Free to Use Property / Aksesoris Lengkap",
      "QR Code Share File (Scan & Unduh Langsung)",
      "Pilihan Cetak STRIP (2 pcs) atau 4R (1 pcs)",
      "Special Custom Design Layout Overlay",
    ],
    durations: [
      { duration: "2 Jam", hours: 2, harga: "Rp 2.300.000", numericPrice: 2300000 },
      { duration: "3 Jam", hours: 3, harga: "Rp 2.800.000", numericPrice: 2800000 },
      { duration: "4 Jam", hours: 4, harga: "Rp 3.500.000", numericPrice: 3500000 },
      { duration: "5 Jam", hours: 5, harga: "Rp 4.200.000", numericPrice: 4200000 },
      { duration: "6 Jam", hours: 6, harga: "Rp 4.900.000", numericPrice: 4900000 },
    ],
    additionalHourRate: "Rp 600.000 / jam",
    additionalHourNumeric: 600000,
  },
  // ── 3. Bajaj Photobooth - No Print ──
  {
    id: "pb-bajaj-noprint",
    nama: "Bajaj Photobooth (No Print)",
    category: "Bajaj Photobooth",
    type: "no-print",
    description:
      "Photobooth unik di dalam armada Bajaj hijau 'Tegoer Keliling' dengan pengalaman foto digital yang sangat viral & seru.",
    image: "/images/photobooth/bajaj-photobooth.webp",
    fitur: [
      "Armada Ikonik Bajaj 'Tegoer Keliling'",
      "Profesional Camera & Lightning",
      "Unlimited Photo",
      "Free Photo Frame Digital",
      "Free GIF Animation",
      "Backdrop Selection",
      "Free to Use Property",
      "QR Code Share File (Scan & Unduh Langsung)",
      "Special Custom Design Layout Overlay",
    ],
    durations: [
      { duration: "2 Jam", hours: 2, harga: "Rp 1.800.000", numericPrice: 1800000 },
      { duration: "3 Jam", hours: 3, harga: "Rp 2.000.000", numericPrice: 2000000 },
      { duration: "4 Jam", hours: 4, harga: "Rp 2.200.000", numericPrice: 2200000 },
      { duration: "5 Jam", hours: 5, harga: "Rp 2.500.000", numericPrice: 2500000 },
      { duration: "6 Jam", hours: 6, harga: "Rp 2.800.000", numericPrice: 2800000 },
    ],
    additionalHourRate: "Rp 600.000 / jam",
    additionalHourNumeric: 600000,
  },
  // ── 4. Bajaj Photobooth - Print (Best Deal) ──
  {
    id: "pb-bajaj-print",
    nama: "Bajaj Photobooth (Print)",
    category: "Bajaj Photobooth",
    type: "print",
    badge: "Best Deal",
    isBestDeal: true,
    description:
      "Pengalaman lengkap photobooth keliling di dalam Bajaj dengan hasil cetak instan unlimited untuk kenangan terbaik tamu.",
    image: "/images/photobooth/bajaj-photobooth.webp",
    fitur: [
      "Armada Ikonik Bajaj 'Tegoer Keliling'",
      "Profesional Camera & Lightning",
      "Unlimited Photo",
      "Unlimited Print (Cetak Instan Tanpa Batas)",
      "Free Photo Frame Fisik & Digital",
      "Free GIF Animation",
      "Backdrop Selection",
      "Free to Use Property Lengkap",
      "QR Code Share File (Scan & Unduh Langsung)",
      "Pilihan Cetak STRIP (2 pcs) atau 4R (1 pcs)",
      "Special Custom Design Layout Overlay",
    ],
    durations: [
      { duration: "2 Jam", hours: 2, harga: "Rp 2.600.000", numericPrice: 2600000 },
      { duration: "3 Jam", hours: 3, harga: "Rp 3.100.000", numericPrice: 3100000 },
      { duration: "4 Jam", hours: 4, harga: "Rp 3.800.000", numericPrice: 3800000 },
      { duration: "5 Jam", hours: 5, harga: "Rp 4.500.000", numericPrice: 4500000 },
      { duration: "6 Jam", hours: 6, harga: "Rp 5.200.000", numericPrice: 5200000 },
    ],
    additionalHourRate: "Rp 600.000 / jam",
    additionalHourNumeric: 600000,
  },
];

// Pilihan Warna Backdrop
export type PhotoboothBackdrop = {
  id: string;
  name: string;
  colorHex: string;
  previewBg: string;
};

export const photoboothBackdrops: PhotoboothBackdrop[] = [
  { id: "merah", name: "Merah", colorHex: "#991B1B", previewBg: "from-red-800 to-red-950" },
  { id: "hijau", name: "Hijau", colorHex: "#064E3B", previewBg: "from-emerald-800 to-emerald-950" },
  { id: "biru-highschool", name: "Biru High School", colorHex: "#1D4ED8", previewBg: "from-blue-600 to-sky-900" },
  { id: "biru-navy", name: "Biru Navy", colorHex: "#0F172A", previewBg: "from-slate-900 to-indigo-950" },
  { id: "cream", name: "Cream", colorHex: "#E2D9C8", previewBg: "from-amber-100 to-stone-300" },
];

// Pilihan Layout Overlay
export type PhotoboothLayout = {
  id: string;
  name: string;
  size: string;
  pieces: string;
  description: string;
  templates: string[];
};

export const photoboothLayouts: PhotoboothLayout[] = [
  {
    id: "strip",
    name: "STRIP Photo Print",
    size: "2R Strip",
    pieces: "2 pcs per cetak",
    description:
      "Kami menyediakan berbagai pilihan template overlay yang dapat disesuaikan dengan tema acara atau preferensi pribadi Anda. Banyak variasi layout vertikal & horizontal.",
    templates: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
  },
  {
    id: "4r",
    name: "4R Photo Print",
    size: "4R Postcard",
    pieces: "1 pcs per cetak",
    description:
      "Template overlay ukuran 4R yang dapat disesuaikan dengan kebutuhan Anda, menampilkan detail foto lebih lapang dengan variasi layout kotak dan collage.",
    templates: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"],
  },
];

// Ketentuan Order & Payment Photobooth
export const photoboothOrderTerms = [
  {
    no: "01",
    title: "Form Order",
    desc: "Klien mengisi form reservasi yang dikirimkan oleh admin untuk pendataan jadwal, lokasi, dan detail kebutuhan acara.",
  },
  {
    no: "02",
    title: "Down Payment (DP 30%)",
    desc: "Admin akan mengirimkan invoice resmi, kemudian klien melakukan pembayaran DP minimal 30% dari total harga yang tertera pada invoice untuk mengunci jadwal.",
  },
  {
    no: "03",
    title: "Material Collection",
    desc: "Admin mengumpulkan informasi kebutuhan materi overlay design (nama acara, tanggal, logo, tema warna, dan hal-hal yang diperlukan).",
  },
  {
    no: "04",
    title: "Repayment & Canceling",
    desc: "Pelunasan dilakukan H-1 Event. Apabila klien membatalkan order secara sepihak sebelum H-10 maka DP 30% tidak dapat dikembalikan. Perubahan tanggal event dapat berakibat pembatalan order apabila jadwal Tegoer Sapa Photobooth sudah terisi pada tanggal tersebut.",
  },
];

// 6 Keunggulan Photobooth Tegoer Sapa (Sesuai Katalog Halaman 7)
export const photoboothAdvantages = [
  {
    title: "Print Instan dan Berkualitas",
    desc: "Setiap foto yang diambil langsung bisa dicetak dengan kualitas terbaik dalam hitungan detik. Momen indah bisa langsung dibawa pulang oleh tamu Anda.",
    icon: "⚡",
  },
  {
    title: "Portabel dan Fleksibel",
    desc: "Photobooth Tegoer Sapa dapat dipindahkan dengan mudah ke berbagai lokasi, baik di dalam maupun di luar ruangan — dari pesta pernikahan hingga acara kantor.",
    icon: "🔄",
  },
  {
    title: "Pengalaman Seru dan Interaktif",
    desc: "Bukan sekadar tempat berfoto, tetapi menghadirkan pengalaman menyenangkan bagi tamu. Mereka bisa berkreasi dengan beragam pose dan properti menarik.",
    icon: "🎉",
  },
  {
    title: "Kualitas Layanan Profesional",
    desc: "Tim operator ramah dan profesional siap membantu dari awal hingga akhir acara, memastikan setiap detik berharga terabadikan dengan sempurna.",
    icon: "🤝",
  },
  {
    title: "Personalisasi Sesuai Tema Acara",
    desc: "Desain frame foto bisa disesuaikan dengan tema acara, membuat setiap gambar lebih spesial dan berkesan sesuai suasana hati dan cerita di balik acara.",
    icon: "🎨",
  },
  {
    title: "Kenangan Abadi dalam Genggaman",
    desc: "Setiap foto yang dihasilkan adalah kenangan abadi yang bisa diingat sepanjang waktu. Tersedia dalam cetak fisik dan soft file digital instan via QR code.",
    icon: "✨",
  },
];

// ─── Pricelist ───────────────────────────────────────────────────────────────
// Tipe data paket
export type PricePackage = {
  id: string;
  nama: string;
  kategori: "Outdoor Graduation";
  fitur: string[];
  harga: string;
  image?: string;
  /** key untuk generateWhatsAppLink() */
  whatsappTemplate: "outdoor-basic" | "outdoor-premium" | "outdoor-homie" | "outdoor-bestie" | "outdoor-unity" | "outdoor-framely";
};

export const pricelistPackages: PricePackage[] = [
  // ── Outdoor Graduation (Lengkap sesuai pricelist.md) ───────────────────
  {
    id: "outdoor-basic",
    nama: "Basic",
    kategori: "Outdoor Graduation",
    image: "/images/pricelist/outdoor-basic.webp",
    fitur: [
      "1 Graduate + Family & Friend",
      "20 Menit Sesi",
      "Unlimited Shoot",
      "20 Photo Edit",
      "All Soft File",
    ],
    harga: "Rp 350.000",
    whatsappTemplate: "outdoor-basic",
  },
  {
    id: "outdoor-premium",
    nama: "Premium",
    kategori: "Outdoor Graduation",
    image: "/images/pricelist/outdoor-premium.webp",
    fitur: [
      "1 Graduate + Family & Friend",
      "50 Menit Sesi",
      "Unlimited Shoot",
      "50 Photo Edit",
      "All Soft File",
    ],
    harga: "Rp 450.000",
    whatsappTemplate: "outdoor-premium",
  },
  {
    id: "outdoor-homie",
    nama: "Homie",
    kategori: "Outdoor Graduation",
    image: "/images/pricelist/outdoor-homie.webp",
    fitur: [
      "2 Graduate + Family & Friend",
      "50 Menit Sesi",
      "Unlimited Shoot",
      "20 Photo Edit",
      "All Soft File",
    ],
    harga: "Rp 600.000",
    whatsappTemplate: "outdoor-homie",
  },
  {
    id: "outdoor-bestie",
    nama: "Bestie",
    kategori: "Outdoor Graduation",
    image: "/images/pricelist/outdoor-bestie.webp",
    fitur: [
      "2 Graduate + Family & Friend",
      "80 Menit Sesi",
      "Unlimited Shoot",
      "50 Photo Edit",
      "All Soft File",
    ],
    harga: "Rp 725.000",
    whatsappTemplate: "outdoor-bestie",
  },
  {
    id: "outdoor-unity",
    nama: "Unity",
    kategori: "Outdoor Graduation",
    image: "/images/pricelist/outdoor-unity.webp",
    fitur: [
      "3–5 Graduate (Personal & Group Shoot)",
      "+ Family & Friend",
      "50 Menit Sesi",
      "Unlimited Shoot",
      "20 Photo Edit",
      "All Soft File",
    ],
    harga: "Rp 750.000",
    whatsappTemplate: "outdoor-unity",
  },
  {
    id: "outdoor-framely",
    nama: "Framely",
    kategori: "Outdoor Graduation",
    image: "/images/pricelist/outdoor-framely.webp",
    fitur: [
      "3–5 Graduate (Personal & Group Shoot)",
      "+ Family & Friend",
      "80 Menit Sesi",
      "Unlimited Shoot",
      "50 Photo Edit",
      "All Soft File",
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

// ─── Portfolio Preview & Gallery Photos ─────────────────────────────────────
import rawGalleryPhotos from "./galleryData.json";

export type GalleryPhotoItem = {
  id: string;
  category: "Professional" | "Photobooth" | "Photobox";
  subCategory: string;
  categorySlug: "professional" | "photobooth" | "photobox";
  subCategorySlug: string;
  title: string;
  image: string; // path relatif dari public, contoh: /images/gallery/inGraduation/INGRAD-1.webp
  width: number;
  height: number;
  aspectRatio: "portrait" | "landscape" | "square";
  alt: string;
};

export const galleryPhotos = rawGalleryPhotos as GalleryPhotoItem[];

export type PortfolioPreviewItem = {
  id: string;
  category: string;
  subCategory: string;
  title: string;
  image: string; // path relatif dari public
  href: string; // link internal ke gallery dengan filter query param
  width?: number;
  height?: number;
  aspectRatio?: "portrait" | "landscape" | "square";
  alt?: string;
};

export const portfolioPreview: PortfolioPreviewItem[] = galleryPhotos.map((photo) => ({
  id: photo.id,
  category: photo.category,
  subCategory: photo.subCategory,
  title: photo.title,
  image: photo.image,
  href: `/gallery?kategori=${photo.categorySlug}&sub=${photo.subCategorySlug}`,
  width: photo.width,
  height: photo.height,
  aspectRatio: photo.aspectRatio,
  alt: photo.alt,
}));

// ─── Data Khusus Halaman Detail Layanan Photography ─────────────────────────
export type ServicePagePackage = {
  id: string;
  nama: string;
  harga: string;
  image?: string;
  kategori?: string;
  badge?: string;
  isPopular?: boolean;
  isPlaceholder?: boolean;
  placeholderNote?: string;
  fitur: string[];
  whatsappUrl: string;
};

export type ServicePageGalleryItem = {
  id: string;
  title: string;
  category: string;
  subCategory: string;
  image?: string;
};

export type ServiceAddOn = {
  id: string;
  nama: string;
  harga: string;
  keterangan?: string;
  whatsappUrl?: string;
};

export type ServiceDetailPageData = {
  id: "traditional" | "wedding" | "graduation" | "studio";
  slug: string;
  tag?: string;
  title: string;
  subtitle: string;
  description: string;
  heroBadge: string;
  tagline?: string;
  studioAddress?: string;
  highlights: string[];
  galleryItems: ServicePageGalleryItem[];
  packageCategories?: readonly string[];
  packages: ServicePagePackage[];
  addOns?: readonly ServiceAddOn[];
  cta: {
    badge: string;
    title: string;
    description: string;
    buttonLabel: string;
    bookingUrl: string;
  };
};

export const photographyDetailPages: Record<
  "traditional" | "wedding" | "graduation" | "studio",
  ServiceDetailPageData
> = {
  traditional: {
    id: "traditional",
    slug: "traditional",
    tag: "Adat & Budaya",
    title: "Traditional Photography",
    subtitle: "Dokumentasi Prosesi Adat yang Autentik, Khidmat & Penuh Makna",
    description:
      "Setiap tradisi menyimpan nilai sakral dan cerita turun-temurun. Kami mendokumentasikan setiap prosesi adat nusantara dengan kepekaan budaya tinggi, menangkap detail busana tradisional, ekspresi penuh makna, dan kebersamaan keluarga besar.",
    heroBadge: "Autentik & Sakral",
    highlights: [
      "Dokumentasi urutan prosesi adat secara menyeluruh tanpa terlewat",
      "Penangkapan detail ornamen, motif busana adat, dan tata rias tradisional",
      "Fotografer berpengalaman mendampingi prosesi budaya di Banjarbaru & sekitarnya",
      "Color grading elegan yang mempertahankan keaslian warna busana tradisional",
    ],
    galleryItems: [
      {
        id: "trad-1",
        title: "Kebaya Wisuda Nusantara",
        category: "Traditional",
        subCategory: "Kebaya & Batik",
        image: "/images/pricelist/group.webp",
      },
      {
        id: "trad-2",
        title: "Pesona Harmoni Kebaya Nusantara",
        category: "Traditional",
        subCategory: "Busana Tradisional",
        image: "/images/pricelist/outdoor-unity.webp",
      },
      {
        id: "trad-3",
        title: "Potret Anggun Kebaya Modern",
        category: "Traditional",
        subCategory: "Kebaya Solo",
        image: "/images/pricelist/outdoor-basic.webp",
      },
      {
        id: "trad-4",
        title: "Detail Ornamen & Selempang",
        category: "Traditional",
        subCategory: "Detail Ornamen",
        image: "/images/pricelist/outdoor-homie.webp",
      },
    ],
    packages: [
      {
        id: "trad-halfday",
        nama: "Half-Day Traditional",
        harga: "Konsultasi / Custom",
        badge: "Favorit Adat",
        isPlaceholder: false,
        placeholderNote: "Paket kustom tersedia — konsultasikan detail rundown acara adat Anda",
        fitur: [
          "Liputan prosesi adat hingga 4 jam",
          "1 Fotografer profesional + 1 Asisten",
          "Unlimited shoot momen prosesi sakral",
          "30 foto pilihan edit & color grade",
          "Seluruh soft file resolusi tinggi via Google Drive",
          "+ Penyesuaian lokasi prosesi di Banjarbaru & sekitarnya",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Traditional%20Photography%0A%0ANama%20%3A%0ATanggal%20%26%20Waktu%20%3A%0ALokasi%20Acara%20%3A%0AJenis%20Adat%20%3A%0APaket%20%3A%20Half-Day%20Traditional",
      },
      {
        id: "trad-fullday",
        nama: "Full-Day Traditional",
        harga: "Konsultasi / Custom",
        badge: "Liputan Lengkap",
        isPlaceholder: false,
        placeholderNote: "Paket kustom tersedia — konsultasikan detail rundown acara adat Anda",
        fitur: [
          "Liputan prosesi adat penuh (hingga 8 jam)",
          "2 Fotografer profesional berpengalaman",
          "Dokumentasi persiapan, ritual adat, hingga perjamuan",
          "60 foto pilihan diedit eksklusif",
          "Cetak album kolase eksklusif / opsi 5R",
          "Flashdisk / Cloud link all high-resolution files",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Traditional%20Photography%0A%0ANama%20%3A%0ATanggal%20%26%20Waktu%20%3A%0ALokasi%20Acara%20%3A%0AJenis%20Adat%20%3A%0APaket%20%3A%20Full-Day%20Traditional",
      },
      {
        id: "trad-custom",
        nama: "Custom Cultural Event",
        harga: "Konsultasi Khusus",
        isPlaceholder: false,
        placeholderNote: "Paket kustom tersedia — konsultasikan detail rundown acara adat Anda",
        fitur: [
          "Konsultasi pra-acara & penyusunan rundown dokumentasi adat",
          "Penyesuaian jumlah tim foto & video sesuai skala acara",
          "Opsi cetak kanvas & pigura elegan",
          "Dukungan dokumentasi multi-hari atau luar kota",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20konsultasi%20paket%20Custom%20Traditional%20Photography%0A%0ANama%20%3A%0ATanggal%20Acara%20%3A%0ACatatan%20%3A",
      },
    ],
    cta: {
      badge: "Reservasi Tanggal",
      title: "Rencanakan Dokumentasi Prosesi Adat Anda",
      description:
        "Diskusikan rundown prosesi, waktu, dan konsep dokumentasi budaya Anda bersama tim fotografer Tegoer Sapa.",
      buttonLabel: "Book Now via WhatsApp",
      bookingUrl:
        "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%2C%20saya%20ingin%20konsultasi%20dokumentasi%20Traditional%20Photography",
    },
  },

  wedding: {
    id: "wedding",
    slug: "wedding",
    title: "Wedding Documentation",
    subtitle: "Setiap detik punya cerita.\nKami mengabadikannya untuk selamanya.",
    description: "Wedding • Pre-Wedding • Post-Wedding • Ceremonial",
    heroBadge: "Warm & Meaningful",
    highlights: [
      "6–8 Jam Dokumentasi",
      "Professional Photo & Video",
      "Cinematic Video + Album",
      "Full Master Files",
    ],
    galleryItems: [
      {
        id: "wed-1",
        title: "Pre-Wedding Studio Romance",
        category: "Wedding",
        subCategory: "Pre-Wedding",
        image: "/images/pricelist/prewed-poswed.webp",
      },
      {
        id: "wed-2",
        title: "Wedding Photobooth Lounge",
        category: "Wedding",
        subCategory: "Photobooth Resepsi",
        image: "/images/pricelist/photobooth-open-space.webp",
      },
      {
        id: "wed-3",
        title: "Outdoor Couple Session",
        category: "Wedding",
        subCategory: "Couple Portrait",
        image: "/images/pricelist/outdoor-bestie.webp",
      },
      {
        id: "wed-4",
        title: "Fun Photobox Couple Moment",
        category: "Wedding",
        subCategory: "Photobox Celebration",
        image: "/images/pricelist/photobox-reguler.webp",
      },
    ],
    packageCategories: [
      "Semua",
      "Wedding Photo",
      "Wedding Video",
      "Wedding Photo & Video",
      "Pre-Wedding Photo",
      "Pre-Wedding Video",
    ],
    packages: [
      // ── WEDDING PHOTO ───────────────────────────────────────────────────
      {
        id: "wedding-janji",
        nama: "Janji",
        harga: "Rp 3.750.000",
        kategori: "Wedding Photo",
        badge: "Wedding Photo",
        fitur: [
          "6–8 Jam Dokumentasi (Akad & Resepsi/Pemberkatan)",
          "2 Photographer",
          "120 Foto Edited",
          "1 Album Magazine",
          "Semua File dalam Flashdisk",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Paket%20Wedding%20Tegoer%20Sapa%0A%0ANama%20%3A%0ATanggal%20%26%20Waktu%20%3A%0ALokasi%20Acara%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Janji%20(Wedding%20Photo%20-%20Rp%203.750.000)",
      },
      {
        id: "wedding-selaras",
        nama: "Selaras",
        harga: "Rp 4.750.000",
        kategori: "Wedding Photo",
        badge: "Wedding Photo Lengkap",
        fitur: [
          "6–8 Jam Dokumentasi (Akad & Resepsi/Pemberkatan)",
          "2 Photographer + 1 Additional Crew",
          "200 Foto Edited",
          "1 Album Magazine",
          "1 Album Magnetik + 120 Foto Cetak",
          "Semua File dalam Flashdisk",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Paket%20Wedding%20Tegoer%20Sapa%0A%0ANama%20%3A%0ATanggal%20%26%20Waktu%20%3A%0ALokasi%20Acara%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Selaras%20(Wedding%20Photo%20-%20Rp%204.750.000)",
      },

      // ── WEDDING VIDEO ───────────────────────────────────────────────────
      {
        id: "wedding-kenang",
        nama: "Kenang",
        harga: "Rp 2.000.000",
        kategori: "Wedding Video",
        badge: "Wedding Video",
        fitur: [
          "6–8 Jam Dokumentasi (Akad & Resepsi/Pemberkatan)",
          "1 Videographer",
          "1 Video Sinematik (1–2 Menit)",
          "File dalam Flashdisk",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Paket%20Wedding%20Tegoer%20Sapa%0A%0ANama%20%3A%0ATanggal%20%26%20Waktu%20%3A%0ALokasi%20Acara%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Kenang%20(Wedding%20Video%20-%20Rp%202.000.000)",
      },

      // ── WEDDING PHOTO & VIDEO ───────────────────────────────────────────
      {
        id: "wedding-langkah",
        nama: "Langkah",
        harga: "Rp 5.250.000",
        kategori: "Wedding Photo & Video",
        badge: "Photo & Video",
        fitur: [
          "6–8 Jam Dokumentasi (Akad & Resepsi/Pemberkatan)",
          "2 Photographer",
          "1 Videographer",
          "120 Foto Edited",
          "1 Video Sinematik (1–2 Menit)",
          "1 Album Magazine",
          "File dalam Flashdisk",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Paket%20Wedding%20Tegoer%20Sapa%0A%0ANama%20%3A%0ATanggal%20%26%20Waktu%20%3A%0ALokasi%20Acara%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Langkah%20(Wedding%20Photo%20%26%20Video%20-%20Rp%205.250.000)",
      },
      {
        id: "wedding-bersama",
        nama: "Bersama",
        harga: "Rp 6.950.000",
        kategori: "Wedding Photo & Video",
        badge: "All-in-One Exclusive",
        fitur: [
          "6–8 Jam Dokumentasi (Akad & Resepsi/Pemberkatan)",
          "2 Photographer",
          "2 Videographer",
          "1 Additional Crew",
          "200 Foto Edited",
          "1 Video Sinematik (1–2 Menit)",
          "1 Album Magazine",
          "1 Album Magnetik + 120 Foto Cetak",
          "File dalam Flashdisk",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Paket%20Wedding%20Tegoer%20Sapa%0A%0ANama%20%3A%0ATanggal%20%26%20Waktu%20%3A%0ALokasi%20Acara%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Bersama%20(Wedding%20Photo%20%26%20Video%20-%20Rp%206.950.000)",
      },

      // ── PRE-WEDDING PHOTO ───────────────────────────────────────────────
      {
        id: "prewed-tetap",
        nama: "Tetap",
        harga: "Rp 1.500.000",
        kategori: "Pre-Wedding Photo",
        badge: "Prewed Photo",
        fitur: [
          "1 Konsep Outfit",
          "Sesi Foto 3–4 Jam",
          "1 Photographer + 1 Crew",
          "20 Foto Edited",
          "File dalam Flashdisk",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Paket%20Pre-Wedding%20Tegoer%20Sapa%0A%0ANama%20%3A%0ATanggal%20%26%20Waktu%20%3A%0ALokasi%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Tetap%20(Pre-Wedding%20Photo%20-%20Rp%201.500.000)",
      },
      {
        id: "prewed-awal",
        nama: "Awal",
        harga: "Rp 2.250.000",
        kategori: "Pre-Wedding Photo",
        badge: "Prewed Photo 2 Konsep",
        fitur: [
          "2 Konsep Outfit",
          "Sesi Foto 4–5 Jam",
          "2 Photographer + 1 Crew",
          "40 Foto Edited",
          "File dalam Flashdisk",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Paket%20Pre-Wedding%20Tegoer%20Sapa%0A%0ANama%20%3A%0ATanggal%20%26%20Waktu%20%3A%0ALokasi%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Awal%20(Pre-Wedding%20Photo%20-%20Rp%202.250.000)",
      },

      // ── PRE-WEDDING VIDEO ───────────────────────────────────────────────
      {
        id: "prewed-suara",
        nama: "Suara",
        harga: "Rp 1.750.000",
        kategori: "Pre-Wedding Video",
        badge: "Prewed Video",
        fitur: [
          "1 Videographer + 1 Crew",
          "1 Video Sinematik (1–2 Menit)",
          "File dalam Flashdisk",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Paket%20Pre-Wedding%20Tegoer%20Sapa%0A%0ANama%20%3A%0ATanggal%20%26%20Waktu%20%3A%0ALokasi%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Suara%20(Pre-Wedding%20Video%20-%20Rp%201.750.000)",
      },
      {
        id: "prewed-kita",
        nama: "Kita",
        harga: "Rp 3.550.000",
        kategori: "Pre-Wedding Video",
        badge: "Photo & Video Prewed",
        fitur: [
          "2 Konsep Outfit",
          "Sesi Foto & Video 4–5 Jam",
          "2 Photographer",
          "1 Videographer",
          "1 Crew",
          "40 Foto Edited",
          "1 Video Sinematik (1–2 Menit)",
          "File dalam Flashdisk",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Paket%20Pre-Wedding%20Tegoer%20Sapa%0A%0ANama%20%3A%0ATanggal%20%26%20Waktu%20%3A%0ALokasi%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Kita%20(Pre-Wedding%20Photo%20%26%20Video%20-%20Rp%203.550.000)",
      },
    ],
    addOns: [
      {
        id: "extra-hour-photo",
        nama: "Extra Hour Photo (3 Jam)",
        harga: "Rp 800.000",
        keterangan: "Tambahan waktu pemotretan foto hingga 3 jam",
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20tanya%20Add-On%20Wedding%3A%20Extra%20Hour%20Photo%20(3%20Jam)%20-%20Rp%20800.000",
      },
      {
        id: "extra-hour-video",
        nama: "Extra Hour Video (3 Jam)",
        harga: "Rp 800.000",
        keterangan: "Tambahan waktu perekaman video hingga 3 jam",
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20tanya%20Add-On%20Wedding%3A%20Extra%20Hour%20Video%20(3%20Jam)%20-%20Rp%20800.000",
      },
      {
        id: "extra-day-photo",
        nama: "Extra Day Photo",
        harga: "Rp 1.500.000",
        keterangan: "Dokumentasi foto ekstra untuk hari terpisah (prosesi adat/malam bainai)",
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20tanya%20Add-On%20Wedding%3A%20Extra%20Day%20Photo%20-%20Rp%201.500.000",
      },
      {
        id: "extra-day-video",
        nama: "Extra Day Video",
        harga: "Rp 1.500.000",
        keterangan: "Dokumentasi video ekstra untuk hari terpisah",
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20tanya%20Add-On%20Wedding%3A%20Extra%20Day%20Video%20-%20Rp%201.500.000",
      },
      {
        id: "extra-day-photo-video",
        nama: "Extra Day Photo & Video",
        harga: "Rp 2.500.000",
        keterangan: "Dokumentasi lengkap foto dan video untuk hari terpisah",
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20tanya%20Add-On%20Wedding%3A%20Extra%20Day%20Photo%20%26%20Video%20-%20Rp%202.500.000",
      },
      {
        id: "magazine-album-20",
        nama: "Magazine Album 20 Sheets",
        harga: "Rp 1.500.000",
        keterangan: "Album magazine cetak lab eksklusif 20 lembar kualitas premium tahan lama",
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20tanya%20Add-On%20Wedding%3A%20Magazine%20Album%2020%20Sheets%20-%20Rp%201.500.000",
      },
      {
        id: "photo-prints-14rj",
        nama: "Photo Prints 14RJ + Minimalist Frame",
        harga: "Rp 250.000",
        keterangan: "Cetak foto 14RJ premium lengkap dengan pigura minimalis modern",
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20tanya%20Add-On%20Wedding%3A%20Photo%20Prints%2014RJ%20%2B%20Minimalist%20Frame%20-%20Rp%20250.000",
      },
      {
        id: "photo-prints-16rj",
        nama: "Photo Prints 16RJ + Minimalist Frame",
        harga: "Rp 250.000",
        keterangan: "Cetak foto 16RJ premium lengkap dengan pigura minimalis modern",
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20tanya%20Add-On%20Wedding%3A%20Photo%20Prints%2016RJ%20%2B%20Minimalist%20Frame%20-%20Rp%20250.000",
      },
      {
        id: "photo-scan-barcode",
        nama: "Photo Scan Barcode (6 Jam)",
        harga: "Rp 1.500.000",
        keterangan: "Live cloud access scan QR barcode untuk unduh foto acara langsung selama 6 jam",
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20tanya%20Add-On%20Wedding%3A%20Photo%20Scan%20Barcode%20(6%20Jam)%20-%20Rp%201.500.000",
      },
    ],
    cta: {
      badge: "Amankan Tanggal Bahagia",
      title: "Abadikan Hari Spesial Anda Bersama Tegoer Sapa",
      description:
        "Setiap detik pernikahan begitu berharga. Booking tanggal pernikahan Anda sekarang sebelum jadwal terisi penuh.",
      buttonLabel: "Book Now via WhatsApp",
      bookingUrl:
        "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%2C%20saya%20ingin%20booking%20paket%20Wedding%20Documentation%20Tegoer%20Sapa",
    },
  },

  graduation: {
    id: "graduation",
    slug: "graduation",
    tag: "Wisuda & Kelulusan",
    title: "Graduation Photography",
    subtitle: "Abadikan Momen Kelulusan & Kebanggaan Bersama",
    description:
      "Pencapaian wisuda adalah buah dari kerja keras dan kebanggaan keluarga. Kami menghadirkan sesi foto wisuda outdoor di lingkungan kampus maupun indoor studio ber-AC dengan berbagai pilihan paket personal, bestie, maupun keluarga besar.",
    heroBadge: "Indoor & Outdoor",
    highlights: [
      "Pilihan sesi Outdoor Kampus dan Indoor Studio ber-AC",
      "Bisa foto individual, bersama bestie, sahabat satu kelompok, hingga keluarga",
      "Unlimited shoot selama durasi sesi dengan retouched photos berkualitas",
      "Paket harga terjangkau mulai dari Basic, Premium, Homie, Bestie, hingga Framely",
    ],
    galleryItems: [
      {
        id: "grad-1",
        title: "Solo Campus Milestone",
        category: "Graduation",
        subCategory: "Outdoor Kampus",
        image: "/images/pricelist/outdoor-basic.webp",
      },
      {
        id: "grad-2",
        title: "Indoor Graduation Studio",
        category: "Graduation",
        subCategory: "Studio Portrait",
        image: "/images/pricelist/indoor-graduation.webp",
      },
      {
        id: "grad-3",
        title: "Wisuda Duo & Bestie Moment",
        category: "Graduation",
        subCategory: "Bestie & Couple",
        image: "/images/pricelist/outdoor-bestie.webp",
      },
      {
        id: "grad-4",
        title: "Framely Creative Star Formation",
        category: "Graduation",
        subCategory: "Creative Squad",
        image: "/images/pricelist/outdoor-framely.webp",
      },
    ],
    packages: [
      {
        id: "outdoor-basic",
        nama: "Basic (Outdoor)",
        harga: "Rp 350.000",
        image: "/images/pricelist/outdoor-basic.webp",
        kategori: "Outdoor Graduation",
        isPlaceholder: false,
        fitur: [
          "1 graduate",
          "Family & friend",
          "Unlimited shoot",
          "20 menit sesi",
          "20 foto edit",
          "Semua soft file",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Outdoor%20Graduation%0A%0ANama%20%3A%0AUniversitas%20%3A%0ATanggal%20%26%20Waktu%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Basic",
      },
      {
        id: "outdoor-premium",
        nama: "Premium (Outdoor)",
        harga: "Rp 450.000",
        image: "/images/pricelist/outdoor-premium.webp",
        kategori: "Outdoor Graduation",
        badge: "Paling Populer",
        isPlaceholder: false,
        fitur: [
          "1 graduate",
          "Family & friend",
          "Unlimited shoot",
          "50 menit sesi",
          "50 foto edit",
          "Semua soft file",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Outdoor%20Graduation%0A%0ANama%20%3A%0AUniversitas%20%3A%0ATanggal%20%26%20Waktu%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Premium",
      },
      {
        id: "outdoor-homie",
        nama: "Homie (Outdoor)",
        harga: "Rp 600.000",
        image: "/images/pricelist/outdoor-homie.webp",
        kategori: "Outdoor Graduation",
        isPlaceholder: false,
        fitur: [
          "2 graduate",
          "Family & friend",
          "Unlimited shoot",
          "50 menit sesi",
          "20 foto edit",
          "Semua soft file",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Outdoor%20Graduation%0A%0ANama%20%3A%0AUniversitas%20%3A%0ATanggal%20%26%20Waktu%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Homie",
      },
      {
        id: "outdoor-bestie",
        nama: "Bestie (Outdoor)",
        harga: "Rp 725.000",
        image: "/images/pricelist/outdoor-bestie.webp",
        kategori: "Outdoor Graduation",
        badge: "Favorit Bestie",
        isPlaceholder: false,
        fitur: [
          "2 graduate",
          "Family & friend",
          "Unlimited shoot",
          "80 menit sesi",
          "50 foto edit",
          "Semua soft file",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Outdoor%20Graduation%0A%0ANama%20%3A%0AUniversitas%20%3A%0ATanggal%20%26%20Waktu%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Bestie",
      },
      {
        id: "outdoor-unity",
        nama: "Unity (Outdoor)",
        harga: "Rp 750.000",
        image: "/images/pricelist/outdoor-unity.webp",
        kategori: "Outdoor Graduation",
        isPlaceholder: false,
        fitur: [
          "3–5 graduate",
          "Personal & group shoot",
          "Family & friend",
          "Unlimited shoot",
          "50 menit sesi",
          "20 foto edit",
          "Semua soft file",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Outdoor%20Graduation%0A%0ANama%20%3A%0AUniversitas%20%3A%0ATanggal%20%26%20Waktu%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Unity",
      },
      {
        id: "outdoor-framely",
        nama: "Framely (Outdoor)",
        harga: "Rp 1.000.000",
        image: "/images/pricelist/outdoor-framely.webp",
        kategori: "Outdoor Graduation",
        badge: "Paling Lengkap",
        isPlaceholder: false,
        fitur: [
          "3–5 graduate",
          "Personal & group shoot",
          "Family & friend",
          "Unlimited shoot",
          "80 menit sesi",
          "50 foto edit",
          "Semua soft file",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Outdoor%20Graduation%0A%0ANama%20%3A%0AUniversitas%20%3A%0ATanggal%20%26%20Waktu%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Framely",
      },
      {
        id: "indoor-grad",
        nama: "Indoor Graduation (Studio)",
        harga: "Rp 350.000",
        image: "/images/pricelist/indoor-graduation.webp",
        kategori: "Profesional Studio",
        badge: "Indoor Studio",
        isPlaceholder: false,
        fitur: [
          "3 orang",
          "1 background studio",
          "20 menit sesi",
          "15 foto edit",
          "Foto 5R per orang",
          "Semua soft file",
          "+Rp35.000/orang tambahan",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Profesional%20Photo%0A%0ANama%20%3A%0ATanggal%20%26%20Waktu%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Indoor%20Graduation%0AJumlah%20Orang%20%3A",
      },
    ],
    cta: {
      badge: "Slot Terbatas",
      title: "Booking Jadwal Foto Wisuda Anda Sekarang",
      description:
        "Slot sesi foto wisuda cepat penuh pada periode kelulusan kampus di Banjarbaru & sekitarnya. Amankan tanggal dan waktu Anda sekarang!",
      buttonLabel: "Book Now via WhatsApp",
      bookingUrl:
        "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%2C%20saya%20mau%20booking%20sesi%20Foto%20Wisuda%20%2F%20Graduation",
    },
  },

  studio: {
    id: "studio",
    slug: "studio",
    tag: "Studio Portrait",
    title: "Studio Professional",
    subtitle: "Pencahayaan Presisi & Sesi Foto Studio Berkualitas Tinggi",
    description:
      "Studio foto Tegoer Sapa dilengkapi peralatan lighting modern dan backdrop pilihan untuk kebutuhan personal branding, foto wisuda indoor, maternity, portrait keluarga, maupun photoshoot grup dengan pengarahan gaya yang profesional dan nyaman.",
    heroBadge: "Lighting Presisi",
    highlights: [
      "Lighting studio terstandar untuk hasil gambar tajam berdimensi",
      "Pilihan background studio elegan dan minimalis",
      "Pengarahan pose santai untuk hasil ekspresi natural dan percaya diri",
      "Cetak foto 5R berkualitas lab dan seluruh soft file lengkap",
    ],
    galleryItems: [
      {
        id: "stu-1",
        title: "Indoor Graduation Studio",
        category: "Studio",
        subCategory: "Wisuda Studio",
        image: "/images/pricelist/indoor-graduation.webp",
      },
      {
        id: "stu-2",
        title: "Personal Executive Portrait",
        category: "Studio",
        subCategory: "Personal Studio",
        image: "/images/pricelist/personal.webp",
      },
      {
        id: "stu-3",
        title: "Family Studio & Birthday Celebration",
        category: "Studio",
        subCategory: "Family Moment",
        image: "/images/pricelist/family.webp",
      },
      {
        id: "stu-4",
        title: "Kebaya Squad Studio Session",
        category: "Studio",
        subCategory: "Group Wisuda",
        image: "/images/pricelist/group.webp",
      },
    ],
    packages: [
      {
        id: "personal",
        nama: "Personal",
        harga: "Hubungi Admin",
        image: "/images/pricelist/personal.webp",
        badge: "Single Shoot",
        isPlaceholder: false,
        fitur: [
          "1 Orang, 1 Kostum, 1 Background",
          "20 Menit Sesi",
          "15 Photo Edit",
          "5 Lembar Cetak 5R",
          "All Soft File",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Profesional%20Photo%0A%0ANama%20%3A%0ATanggal%20%26%20Waktu%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Personal",
      },
      {
        id: "family",
        nama: "Family",
        harga: "Hubungi Admin",
        image: "/images/pricelist/family.webp",
        badge: "Favorit Keluarga",
        isPlaceholder: false,
        fitur: [
          "3–5 Orang (bisa tambah orang)",
          "20 Menit Sesi",
          "15 Photo Edit",
          "5 Lembar Cetak 5R",
          "All Soft File",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Profesional%20Photo%0A%0ANama%20%3A%0ATanggal%20%26%20Waktu%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Family%0AJumlah%20Orang%20%3A",
      },
      {
        id: "group",
        nama: "Group",
        harga: "Hubungi Admin",
        image: "/images/pricelist/group.webp",
        isPlaceholder: false,
        fitur: [
          "3 Orang, 1 Background (bisa tambah orang)",
          "20 Menit Sesi",
          "15 Photo Edit",
          "Cetak 5R per Orang",
          "All Soft File",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Profesional%20Photo%0A%0ANama%20%3A%0ATanggal%20%26%20Waktu%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Group%0AJumlah%20Orang%20%3A",
      },
      {
        id: "indoor-graduation",
        nama: "Indoor Graduation",
        harga: "Hubungi Admin",
        image: "/images/pricelist/indoor-graduation.webp",
        isPlaceholder: false,
        fitur: [
          "3 Orang, 1 Background (bisa tambah orang)",
          "20 Menit Sesi",
          "15 Photo Edit",
          "Cetak 5R per Orang",
          "All Soft File",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Profesional%20Photo%0A%0ANama%20%3A%0ATanggal%20%26%20Waktu%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Indoor%20Graduation%0AJumlah%20Orang%20%3A",
      },
      {
        id: "prewed",
        nama: "Prewed / Poswed",
        harga: "Hubungi Admin",
        image: "/images/pricelist/prewed-poswed.webp",
        isPlaceholder: false,
        fitur: [
          "Pasangan, 1 Kostum, 1 Background",
          "30 Menit Sesi",
          "15 Photo Edit",
          "5 Lembar Cetak 5R",
          "All Soft File",
        ],
        whatsappUrl:
          "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%20Mau%20booking%20Profesional%20Photo%0A%0ANama%20%3A%0ATanggal%20%26%20Waktu%20%3A%0AInstagram%20%3A%0APaket%20%3A%20Prewed%2FPoswed",
      },
    ],
    cta: {
      badge: "Sesi Eksklusif",
      title: "Reservasi Sesi Foto Studio Anda",
      description:
        "Nikmati pengalaman foto studio eksklusif dengan tata cahaya terstandar dan arahan pose yang nyaman bersama tim Tegoer Sapa.",
      buttonLabel: "Book Now via WhatsApp",
      bookingUrl:
        "https://api.whatsapp.com/send?phone=6282254092927&text=Halo%20kak%2C%20saya%20ingin%20booking%20sesi%20Studio%20Professional%20Photo",
    },
  },
};

