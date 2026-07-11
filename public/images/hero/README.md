# 📸 Cara Mengganti Foto Hero Section

## Letak File
Taruh foto kamu di folder:
```
public/images/hero/
```

## Nama File yang Diharapkan
| Slot | Nama file | Posisi di mosaic |
|------|-----------|-----------------|
| Slot 1 | `hero-1.webp` | Besar kiri (portrait, 2 baris) |
| Slot 2 | `hero-2.webp` | Kecil kanan atas |
| Slot 3 | `hero-3.webp` | Kecil kanan bawah |
| Slot 4 | `hero-4.webp` | *(reserved — bisa dipakai nanti)* |

## Format Foto yang Disarankan
- **Format:** `.webp` (paling optimal) atau `.jpg` / `.png`
- **Slot 1 (besar):** Rasio portrait ~3:4 atau 2:3, resolusi minimal 800×1000px
- **Slot 2 & 3 (kecil):** Rasio landscape ~4:3 atau square, resolusi minimal 600×450px

## Langkah Aktivasi
Setelah taruh foto, buka `lib/content.ts` dan ubah `placeholder: true` → `placeholder: false` untuk slot yang sudah ada fotonya:

```ts
// SEBELUM (placeholder aktif)
{
  id: "hero-photo-1",
  src: "/images/hero/hero-1.webp",
  alt: "Tulis deskripsi fotonya di sini",
  category: "Wedding",
  placeholder: true,   // ← ini
},

// SESUDAH (foto nyata tampil)
{
  id: "hero-photo-1",
  src: "/images/hero/hero-1.webp",
  alt: "Momen pernikahan di Tegoer Sapa",
  category: "Wedding",
  placeholder: false,  // ← ubah ini
},
```

## Kustomisasi Kategori Badge
Field `category` pada setiap slot adalah label badge hijau di pojok foto.
Bisa diubah bebas, misalnya: `"Wedding"`, `"Graduation"`, `"Photobooth"`, `"Birthday"`, dll.
