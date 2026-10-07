# Tegoer Sapa — Website Redesign

> *"Respect The Moment, Every Second Matters"*

Website resmi **Tegoer Sapa** — studio jasa photobooth, photobox, dan professional photography untuk berbagai kebutuhan event (wedding, birthday, graduation, corporate gathering, studio photoshoot, dan Bajaj Photobooth 'Tegoer Keliling').

---

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, Webpack build)
- **Library UI:** [React 19](https://react.dev)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) + Custom CSS Theme Tokens
- **Animasi:** [GSAP 3](https://gsap.com) + `@gsap/react` (ScrollTrigger, Flip)
- **Bahasa:** TypeScript 5

---

## 📁 Struktur Direktori

```text
tegoersapa-website/
├── app/                  # Route & halaman Next.js App Router
│   ├── booking/          # Halaman booking terpadu
│   ├── gallery/          # Halaman galeri foto & filter dinamis
│   ├── kontak/           # Halaman kontak resmi
│   ├── link(s)/          # Tautan cepat / Linktree photobooth & studio
│   ├── photobooth/       # Halaman layanan photobooth & bajaj photobooth
│   ├── photography/      # Halaman layanan fotografi profesional
│   ├── pricelist/        # Halaman daftar harga paket
│   └── tentang/          # Halaman profil & cerita Tegoer Sapa
├── components/           # Komponen React modular
│   ├── layout/           # Navbar, Footer
│   ├── sections/         # Section halaman (Hero, Services, Stories, dll.)
│   └── ui/               # Primitif UI (Button, Cursor, Marquee, dll.)
├── docs/                 # Dokumentasi proyek & referensi harga
│   ├── pricelist.md      # Data paket harga resmi
│   └── references/       # Berkas referensi mentah (katalog PDF)
├── lib/                  # Utilitas, konfigurasi animasi, & data konten
│   ├── content.ts        # Data sentral teks & paket layanan
│   ├── gsap.ts           # Inisialisasi plugin GSAP
│   └── whatsapp.ts       # Generator pesan & deep-link WhatsApp
└── public/               # Asset statis publik
    ├── brand/            # Logo & maskot vektor
    ├── fonts/            # Custom web fonts (Hoss Round)
    └── images/           # Foto galeri, pricelist, & photobooth
```

---

## 🛠️ Menjalankan Proyek Lokal

1. **Instal dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser.

3. **Build untuk produksi:**
   ```bash
   npm run build
   ```

4. **Linting kode:**
   ```bash
   npm run lint
   ```
