/**
 * lib/whatsapp.ts
 * Fungsi reusable untuk generate deep-link WhatsApp "Book Now" — sesuai Bagian 2.4 AGENT.md.
 */
import type { PricePackage } from "./content";

export const WA_NUMBERS = {
  professional: "6282254092927",
  photobooth: "6281350655747",
} as const;

const WA_PROFESSIONAL = WA_NUMBERS.professional;

type TemplateKey =
  | PricePackage["whatsappTemplate"]
  | "photobooth"
  | "photobooth-regular"
  | "bajaj-photobooth"
  | "family"
  | "group"
  | "indoor-graduation"
  | "personal"
  | "prewed"
  | string;

function encodeWAText(text: string): string {
  return encodeURIComponent(text.trim());
}

/**
 * Deteksi nomor WhatsApp tujuan berdasarkan nama layanan / kategori
 */
export function getWhatsAppNumberByService(serviceOrCategory?: string): string {
  if (!serviceOrCategory) return WA_NUMBERS.professional;
  const lower = serviceOrCategory.toLowerCase();
  if (
    lower.includes("photobooth") ||
    lower.includes("photobox") ||
    lower.includes("bajaj") ||
    lower.includes("mingle") ||
    lower.includes("barcode")
  ) {
    return WA_NUMBERS.photobooth;
  }
  return WA_NUMBERS.professional;
}

export function generateWhatsAppLink(
  template: TemplateKey,
  paketNama: string,
  targetPhone?: string
): string {
  let message: string;

  switch (template) {
    case "photobooth":
    case "photobooth-regular":
    case "bajaj-photobooth":
      message = `Halo kak Mau booking Photobooth Tegoer Sapa

Nama :
Tanggal & Waktu :
Lokasi Acara :
Instagram :
Paket : ${paketNama}`;
      break;

    case "outdoor-basic":
    case "outdoor-premium":
    case "outdoor-homie":
    case "outdoor-bestie":
    case "outdoor-unity":
    case "outdoor-framely":
      message = `Halo kak Mau booking Outdoor Graduation

Nama :
Universitas :
Tanggal & Waktu :
Instagram :
Paket : ${paketNama}`;
      break;

    case "family":
    case "group":
    case "indoor-graduation":
      message = `Halo kak Mau booking Profesional Photo

Nama :
Tanggal & Waktu :
Instagram :
Paket : ${paketNama}
Jumlah Orang :`;
      break;

    case "personal":
    case "prewed":
    default:
      message = `Halo kak Mau booking Profesional Photo

Nama :
Tanggal & Waktu :
Instagram :
Paket : ${paketNama}`;
      break;
  }

  const phone =
    targetPhone ||
    (template.includes("photobooth") || template.includes("bajaj")
      ? WA_NUMBERS.photobooth
      : WA_PROFESSIONAL);
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeWAText(message)}`;
}

export function generateServiceBookingLink(
  serviceName: string,
  customText?: string,
  targetPhone?: string
): string {
  const defaultText = `Halo kak Mau booking layanan ${serviceName} di Tegoer Sapa

Nama :
Tanggal & Waktu :
Lokasi / Acara :
Instagram :
Paket : ${serviceName}`;

  const message = customText || defaultText;
  const phone = targetPhone || getWhatsAppNumberByService(serviceName);
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeWAText(message)}`;
}
