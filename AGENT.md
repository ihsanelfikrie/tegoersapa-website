# AGENT.md — Project Spec: Tegoer Sapa Website Redesign

> File ini adalah instruksi utama untuk AI coding agent (Antigravity IDE) dalam membangun ulang website tegoersapa.com. Baca dan ikuti seluruh dokumen ini sebelum mulai generate kode apapun.

---

## 1. Ringkasan Proyek

Redesign total website **Tegoer Sapa** — studio jasa photobooth, photobox, dan professional photography untuk event (wedding, birthday, corporate, graduation, dll).

**Tujuan utama:**
- Homepage berfungsi sebagai **hub navigasi**: menampilkan preview singkat dari setiap halaman penting, dengan CTA yang mengarahkan user ke halaman lengkapnya.
- Struktur website rapi, modular, dan mudah dikembangkan (nambah halaman/section di kemudian hari tidak merusak yang lain).
- Animasi menggunakan **GSAP** (lihat panduan di Bagian 6).
- Desain visual (warna, tipografi, mood) **BELUM final** — akan dikirim menyusul. Sampai saat itu, gunakan token desain sementara (Bagian 7) dan bangun semua komponen agar gampang di-restyle tanpa refactor besar.

---

## 2. Site Map (berdasarkan struktur asli tegoersapa.com — sudah diverifikasi langsung dari live site)

> ⚠️ Ini bukan asumsi — struktur di bawah diambil langsung dari route yang benar-benar ada di tegoersapa.com saat ini. Redesign harus mempertahankan seluruh route ini (boleh tambah, jangan hilangkan) supaya link lama/QR code/share link yang sudah beredar tetap jalan.

### 2.1 Struktur Route Lengkap

```
/                                          → Home
/pricelist                                 → Price List (semua paket)
/gallery                                   → Gallery utama (semua foto, semua kategori)
/gallery/professional                      → Gallery kategori: Professional Photo (semua)
/gallery/professional/indoor-graduation    → Sub-kategori: Indoor Graduation
/gallery/professional/outdoor-graduation   → Sub-kategori: Outdoor Graduation
/gallery/professional/prewedding           → Sub-kategori: Pre-Wedding
/gallery/photobooth                        → Gallery kategori: Photobooth (semua)
/gallery/photobooth/event                  → Sub-kategori: Event
/gallery/photobooth/birthday               → Sub-kategori: Birthday
/gallery/photobooth/wedding                → Sub-kategori: Wedding
/gallery/photobooth/corporate              → Sub-kategori: Corporate
/gallery/photobox                          → Gallery kategori: Photobox
```

**✅ KEPUTUSAN FINAL (dikonfirmasi user):** "Tentang" dan "Kontak" dibangun sebagai **halaman penuh terpisah** — `/tentang` dan `/kontak` — bukan anchor/section saja. Homepage tetap punya cuplikan singkat dari masing-masing + tombol "Selengkapnya →" menuju halaman lengkapnya.

Agent boleh mengusulkan halaman tambahan (`/testimoni`, `/faq`) **jika masuk akal**, tapi konfirmasi dulu ke user sebelum dibangun sebagai halaman penuh.

### 2.2 Detail Isi per Halaman

**`/` — Home**
- Hero: judul "TEGOER SAPA" + tagline *"Respect The Moment Every Second Matters"*
- Section Layanan: 3 kartu — Photobooth, Photobox, Professional Photo (deskripsi singkat, lihat Bagian 9)
- Preview Portfolio: cuplikan project dari tiap kategori (contoh dari situs asli: Photobooth–Wedding, Photobooth–Birthday, Photobooth–Event, Photobox–TS x Kean/Sirkem/Aime, Professional–Indoor/Outdoor Graduation, Professional–Pre-Wedding) → tiap cuplikan link ke sub-gallery terkait
- Section Kontak: email + 2 nomor WA (lihat 2.3)
- Section Sosial Media: 3 akun (lihat 2.3)
- Section Tentang singkat (atau link ke `/tentang` jika Opsi B dipakai)

**`/pricelist` — Price List**
Filter kategori: **All / Profesional Studio / Graduation**
Berisi 11 paket (detail lengkap ada di Bagian 9.2), tiap kartu paket punya:
- Foto cover paket
- Nama paket
- List fitur/isi paket
- Harga
- Label kategori (Profesional Studio / Outdoor Graduation)
- Tombol **"Book Now"** → deep-link WhatsApp dengan pesan pre-filled otomatis berisi Nama, Tanggal & Waktu, Instagram, Paket (lihat Bagian 2.4 untuk format pesan)

**`/gallery` + turunannya — Gallery**
- Navigasi kategori di atas: **Professional Photo** (Semua / Indoor Graduation / Outdoor Graduation / Pre-Wedding), **PhotoBooth** (Semua / Event / Birthday / Wedding / Corporate), **PhotoBox**
- `/gallery` (root) menampilkan gabungan semua foto dari semua kategori (di situs asli ada 75 foto total) dalam grid, dengan fitur zoom/lightbox saat foto diklik
- Tiap route kategori/sub-kategori menampilkan grid foto khusus kategori tersebut saja
- **✅ KEPUTUSAN FINAL (dikonfirmasi user):** Gallery dibangun sebagai **satu halaman `/gallery` dengan filter dinamis client-side** (state-based, animasi transisi filter pakai `Flip` dari GSAP). Route lama (`/gallery/photobooth/wedding`, dst.) tetap harus jalan — arahkan via `app/gallery/[kategori]/[sub]/page.tsx` yang redirect ke `/gallery?kategori=...&sub=...` supaya deep-link lama tidak 404.

**Kontak & Tentang** — lihat Bagian 2.1 soal keputusan Opsi A/B.

### 2.3 Data Kontak (gunakan persis, jangan diubah)
- Email: `tegoersapaa@gmail.com`
- WhatsApp Professional Photo: `+62 822-5409-2927`
- WhatsApp Photobooth: `+62 881-0805-18887`
- Instagram: [@tegoersapa.photobooth](https://instagram.com/tegoersapa.photobooth), [@bertegoersapa_](https://instagram.com/bertegoersapa_)
- TikTok: [@tegoersapaa](https://tiktok.com/@tegoersapaa)

### 2.4 Pola Deep-Link WhatsApp "Book Now" (wajib dipertahankan)
Format URL: `https://api.whatsapp.com/send?phone=[NOMOR]&text=[PESAN_ENCODED]`

Contoh pesan untuk paket Personal (Profesional Studio):
```
Halo kak Mau booking Profesional Photo

Nama :
Tanggal & Waktu :
Instagram :
Paket : Personal
```
Untuk paket yang butuh jumlah orang (Family, Group, Indoor Graduation), tambahkan baris `Jumlah Orang :` di akhir. Untuk paket Outdoor Graduation, ganti kalimat pembuka jadi "Mau booking Outdoor Graduation" dan tambahkan baris `Universitas :` setelah Nama. **Buat template pesan ini sebagai fungsi reusable** (mis. `generateWhatsAppLink(paket)`) di `lib/whatsapp.ts`, jangan hardcode string panjang di tiap kartu paket.

### Aturan Homepage sebagai Hub
Homepage **wajib** memuat preview section untuk setiap halaman utama, dengan pola:
```
[Judul singkat section] + [1-2 kalimat/gambar preview] + [Tombol/Link "Lihat semua →"]
```
Contoh: section "Gallery" di homepage cukup tampilkan 6-8 foto pilihan (campuran kategori) + tombol menuju `/gallery` lengkap. Section "Pricelist" cukup tampilkan 2-3 paket favorit + tombol menuju `/pricelist` lengkap. Jangan duplikasi seluruh isi halaman di homepage.

---

## 3. Tech Stack

- **Framework:** Next.js (App Router) — dipilih karena butuh multi-page routing yang rapi dan scalable.
- **Styling:** Tailwind CSS (utility-first, gampang restyle saat token desain final dikirim).
- **Animasi:** GSAP + `@gsap/react` (hook `useGSAP`) + plugin `ScrollTrigger`, `SplitText`, `Flip` sesuai kebutuhan section.
- **Gambar:** `next/image` untuk optimasi otomatis (lazy load, resize, format modern).
- **Deployment target:** Vercel (kompatibel native dengan Next.js).

Jangan ganti stack ini tanpa alasan kuat — jika agent menemukan constraint yang membuat stack ini tidak ideal, **tanyakan dulu ke user**, jangan diam-diam diganti.

---

## 4. Struktur Folder (wajib diikuti)

```
tegoersapa-redesign/
├── app/
│   ├── layout.tsx                          # root layout, navbar + footer global
│   ├── page.tsx                             # Home
│   ├── pricelist/page.tsx
│   ├── gallery/
│   │   ├── page.tsx                         # /gallery — semua foto + filter dinamis
│   │   └── [kategori]/[sub]/page.tsx        # menangani deep-link lama (redirect/filter ke query param)
│   ├── tentang/page.tsx                     # Opsi B — lihat Bagian 2.1
│   └── kontak/page.tsx                      # Opsi B — lihat Bagian 2.1
├── components/
│   ├── layout/                  # Navbar, Footer, MobileMenu
│   ├── sections/                # HeroSection, ServicesPreview, GalleryPreview, dll
│   ├── ui/                      # Button, Card, SectionHeading, dll (reusable)
│   └── animations/              # wrapper komponen GSAP (mis. FadeUpOnScroll.tsx)
├── lib/
│   ├── gsap.ts                  # registerPlugin di satu tempat
│   └── content.ts                # semua teks/copy website disimpan di sini, BUKAN hardcode di JSX
├── public/
│   └── images/                   # aset gambar, dikelompokkan per kategori
├── styles/
│   └── globals.css
├── tailwind.config.ts            # design tokens masuk sini (Bagian 7)
└── AGENT.md                      # file ini
```

**Alasan penting:** semua teks (headline, deskripsi layanan, harga, dll) disimpan di `lib/content.ts` sebagai objek/array, bukan ditulis langsung di JSX. Ini supaya saat user kasih revisi konten, tinggal edit satu file — dan agent tidak perlu menyentuh banyak komponen.

---

## 5. Navigasi — Aturan Wajib

- Navbar global muncul di semua halaman, berisi link ke semua halaman di Bagian 2, plus tombol CTA (misal "Booking Sekarang" → WhatsApp/kontak).
- Navbar harus **responsive**: hamburger menu di mobile, animasi buka/tutup halus (boleh pakai GSAP timeline sederhana).
- Aktifkan **active state** pada link navbar sesuai halaman yang sedang dibuka.
- Setiap preview section di homepage **harus punya link yang benar-benar berfungsi** ke halaman detailnya — jangan buat tombol dummy/`href="#"`.
- Footer juga memuat sitemap ringkas + sosial media + kontak cepat.
- Gunakan `next/link` untuk semua navigasi internal (bukan `<a>` biasa), supaya transisi antar halaman cepat (client-side routing).

---

## 6. Panduan Penggunaan GSAP

- Registrasi plugin **hanya sekali** di `lib/gsap.ts`, lalu import dari situ — jangan register ulang di tiap komponen.
- Gunakan hook `useGSAP()` dari `@gsap/react` di dalam komponen React (bukan `useEffect` manual), supaya animasi otomatis di-cleanup saat komponen unmount — mencegah memory leak & animasi "nyangkut" saat pindah halaman.
- Pola animasi per section (acuan dari demo sebelumnya):
  - **Hero (tiap halaman):** `gsap.timeline()` — text reveal + fade in, jalan sekali saat halaman dimuat.
  - **Section list/grid (Layanan, Gallery preview, dll):** `ScrollTrigger` + `stagger` fade-up.
  - **Gallery filter (`/gallery`):** gunakan plugin `Flip` saat user ganti kategori filter, supaya transisi grid halus.
  - **Hover interaktif:** kartu/gambar di-scale sedikit saat hover (`gsap.to` simple, tanpa ScrollTrigger).
  - **Navbar:** shrink atau ubah background saat scroll (`ScrollTrigger` dengan `toggleClass`).
- Semua ScrollTrigger **wajib** dibersihkan/di-refresh dengan benar saat navigasi antar halaman (App Router bisa unmount/remount komponen) — pastikan tidak ada trigger "hantu" yang nempel ke elemen yang sudah tidak ada.
- Hormati preferensi `prefers-reduced-motion`: jika user OS mengaktifkan reduce motion, animasi kompleks (parallax, pin, dsb) diperlembut/dinonaktifkan.
- Jangan overuse animasi — ikuti prinsip "satu momen orkestrasi yang kuat lebih baik daripada banyak efek kecil yang berantakan".

---

## 7. Design Tokens (FINAL — dari user)

### Palet Warna

| Token | Hex | Peran yang disarankan |
|---|---|---|
| `brand-green` | `#3aaa35` | Warna aksen utama — CTA button, highlight, ikon aktif, link hover |
| `brand-dark` | `#014126` | Hijau tua — background section gelap, footer, navbar solid, atau teks di atas putih |
| `white` | `#ffffff` | Background terang, teks di atas warna gelap |
| `black` | `#000000` | Teks utama di atas background terang, elemen kontras tinggi |

**Panduan pemakaian (agar tidak sembarang campur):**
- Jangan pakai `brand-green` sebagai warna background besar (section penuh) — terlalu terang untuk area luas, bisa melelahkan mata. Gunakan sebagai aksen: tombol, garis bawah, ikon, badge, hover state.
- `brand-dark` (`#014126`) cocok jadi warna dominan section gelap (hero, footer, navbar) — beri kontras nyaman dengan teks putih di atasnya.
- Section terang gunakan `white` sebagai background dan `black`/`brand-dark` untuk teks, dengan `brand-green` sebagai aksen kecil (CTA, ikon, garis).
- Pastikan kontras teks-background selalu lolos WCAG AA (khususnya teks hijau `#3aaa35` di atas putih — kontrasnya pas-pasan, sebaiknya dipakai untuk elemen besar/bold, bukan body text kecil).

### Tipografi
- **Font tunggal:** [Montserrat](https://fonts.google.com/specimen/Montserrat) (Google Fonts) — dipakai untuk heading maupun body, dibedakan lewat **weight**, bukan ganti font:
  - Heading/Hero: `Montserrat` weight 700–800 (Bold/ExtraBold)
  - Subheading: `Montserrat` weight 600 (SemiBold)
  - Body text: `Montserrat` weight 400–500 (Regular/Medium)
- Load via `next/font/google` (bukan `<link>` manual) supaya optimal untuk performa Next.js.

### Implementasi di `tailwind.config.ts`
```ts
theme: {
  extend: {
    colors: {
      brand: {
        green: "#3aaa35",
        dark: "#014126",
      },
    },
    fontFamily: {
      sans: ["var(--font-montserrat)", "sans-serif"],
    },
  },
}
```
Semua warna di komponen **wajib** memakai token ini (`bg-brand-dark`, `text-brand-green`, dll) — jangan hardcode hex di className atau inline style.

---

## 8. Standar Keamanan & Kualitas Kode ("Aman 100%")

Checklist wajib dipenuhi sebelum dianggap selesai:

**Keamanan**
- Semua form (kontak) wajib ada validasi input di sisi client **dan** server (jangan percaya input mentah).
- Tidak ada API key, token, atau kredensial yang di-hardcode di kode frontend — semua rahasia lewat environment variable (`.env.local`, dan pastikan masuk `.gitignore`).
- Link eksternal (WhatsApp, Instagram) pakai `rel="noopener noreferrer"` saat `target="_blank"`.
- Sanitasi semua data dinamis sebelum ditampilkan (cegah XSS), meskipun kontennya dari `lib/content.ts` sendiri.

**Kualitas & Stabilitas**
- Semua komponen harus type-safe (TypeScript, hindari `any`).
- Cek error boundary dasar — halaman tidak boleh blank putih total kalau ada error di satu komponen.
- Gambar wajib pakai `next/image` dengan `alt` text yang deskriptif (aksesibilitas + SEO).
- Uji responsive di 3 breakpoint minimal: mobile (375px), tablet (768px), desktop (1440px).
- Lighthouse score target: Performance & Accessibility ≥ 90.
- Semua halaman punya `<title>` dan `meta description` unik (SEO dasar).

**Proses kerja agent**
- Bangun **section per section**, bukan seluruh halaman sekaligus — commit kecil, mudah direview.
- Jangan menghapus/menimpa konten asli tegoersapa.com secara diam-diam; kalau ada penyesuaian copy, tandai dengan komentar `// content adjusted from original`.
- Kalau ragu soal keputusan struktural (nambah halaman, ubah routing, dsb), **tanyakan ke user dulu**, jangan asumsi sendiri.

---

## 9. Konten Referensi (dari situs asli — sudah lengkap, jangan mengarang data baru)

Gunakan ini sebagai baseline copy di `lib/content.ts`. Boleh dipoles ulang kalimat marketingnya, **tapi jangan ubah angka harga, isi paket, atau data kontak.**

### 9.1 Profil & Layanan
- **Nama brand:** Tegoer Sapa
- **Tagline:** "Respect The Moment Every Second Matters"
- **Tentang:** "Kami adalah penyedia layanan fotografi modern seperti photobooth, photobox, hingga foto profesional untuk berbagai kebutuhan Anda." *(boleh diperpanjang jadi cerita lebih lengkap untuk halaman `/tentang`, tapi tandai bagian yang ditambah dengan komentar `// copy diperluas dari versi asli`)*
- **3 Layanan utama:**
  1. **Photobooth** — "Foto instan di acara dengan properti lucu dan kamera otomatis."
  2. **Photobox** — "Mesin foto di tempat umum yang mencetak foto secara instan dengan berbagai pilihan frame."
  3. **Professional Photo** — "Profesional photographer dengan hasil premium yang ditata dengan gaya."

### 9.2 Price List Lengkap (11 paket — data pasti, jangan diubah)

**Kategori: Profesional Studio**

| Paket | Isi | Harga |
|---|---|---|
| Personal | 1 kostum, 1 background, 20 menit sesi, 15 foto edit, 5 lembar 5R, semua soft file | Rp 300.000 |
| Family | 3–5 orang, 20 menit sesi, 15 foto edit, 5 lembar 5R, semua soft file (+Rp35.000/orang tambahan) | Rp 400.000 |
| Group | 3 orang, 1 background, 20 menit sesi, 15 foto edit, foto 5R per orang, semua soft file (+Rp35.000/orang tambahan) | Rp 350.000 |
| Indoor Graduation | 3 orang, 1 background, 20 menit sesi, 15 foto edit, foto 5R per orang, semua soft file (+Rp35.000/orang tambahan) | Rp 350.000 |
| Prewed/Poswed | 1 kostum, 1 background, 30 menit sesi, 15 foto edit, 5 lembar 5R, semua soft file | Rp 750.000 |

**Kategori: Outdoor Graduation**

| Paket | Isi | Harga |
|---|---|---|
| Basic | 1 graduate, family & friend, unlimited shoot, 20 menit sesi, 20 foto edit, semua soft file | Rp 350.000 |
| Premium | 1 graduate, family & friend, unlimited shoot, 50 menit sesi, 50 foto edit, semua soft file | Rp 450.000 |
| Homie | 2 graduate, family & friend, unlimited shoot, 50 menit sesi, 20 foto edit, semua soft file | Rp 600.000 |
| Bestie | 2 graduate, family & friend, unlimited shoot, 80 menit sesi, 50 foto edit, semua soft file | Rp 725.000 |
| Unity | 3–5 graduate, personal & group shoot, family & friend, unlimited shoot, 50 menit sesi, 20 foto edit, semua soft file | Rp 750.000 |
| Framely | 3–5 graduate, personal & group shoot, family & friend, unlimited shoot, 80 menit sesi, 50 foto edit, semua soft file | Rp 1.000.000 |

> Simpan sebagai array of objects di `lib/content.ts` (mis. `pricelistPackages`), dengan field: `id`, `nama`, `kategori`, `fitur[]`, `harga`, `whatsappTemplate`. Ini supaya render kartu + filter kategori (All/Profesional Studio/Graduation) cukup satu komponen `<PricelistCard>` yang di-loop.

### 9.3 Taksonomi Gallery (75 foto asli, dikelompokkan)
- **Professional** → Indoor Graduation, Outdoor Graduation, Pre-Wedding
- **Photobooth** → Event, Birthday, Wedding, Corporate
- **Photobox** → (tanpa sub-kategori)

Contoh project yang ditampilkan sebagai preview di homepage (situs asli): Photobooth×Wedding, Photobooth×Birthday, Photobooth×Event, Photobox×"TS x Kean", Photobox×"TS x Sirkem", Photobox×"TS x Aime", Professional×Indoor Graduation, Professional×Outdoor Graduation, Professional×Pre-Wedding.

> Nama file foto asli sudah terstruktur rapi per kategori (contoh: `Wedding/PB-WED-1.webp`, `birthday/BD-1.webp`, `corporate/COR-1.webp`, `event/EVENT-1.webp`, `PreWedding/PREWED-1.webp`, `inGraduation/INGRAD-1.webp`, `outGraduation/OUTGRAD-1.webp`, `Photobox/Photobox-1.webp`) — ikuti pola penamaan ini untuk foto baru yang di-upload biar konsisten dan gampang di-generate array-nya secara terprogram (bukan ditulis manual satu-satu).

### 9.4 Kontak
Lihat Bagian 2.3 — data kontak final, gunakan persis.

---

## 10. Definition of Done

Sebuah halaman/section dianggap selesai jika:
1. Responsive di semua breakpoint.
2. Semua link navigasi berfungsi, tidak ada dead link.
3. Animasi GSAP berjalan mulus tanpa flicker/jump saat reload atau navigasi antar halaman.
4. Tidak ada warna/font hardcode di luar token system.
5. Lolos checklist keamanan & kualitas di Bagian 8.
6. Direview dan dikonfirmasi user sebelum lanjut ke section berikutnya.

---

*Update log:*
*v1.0 — dibuat sebelum design tokens final dikirim user.*
*v1.1 — Bagian 7 diupdate: palet warna final (`#3aaa35`, `#014126`, putih, hitam) dan font Montserrat.*
*v1.2 — Bagian 2 & 9 diupdate dengan site map dan konten lengkap hasil verifikasi langsung dari tegoersapa.com (route asli, 11 paket pricelist, taksonomi 75 foto gallery, format deep-link WhatsApp).*
*v1.3 — Keputusan struktural dikunci: Tentang & Kontak jadi halaman penuh, Gallery pakai filter dinamis satu halaman.*
