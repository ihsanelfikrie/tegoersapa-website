/**
 * lib/whatsapp.ts
 * Fungsi reusable untuk generate deep-link WhatsApp "Book Now" — sesuai Bagian 2.4 AGENT.md.
 */
import type { PricePackage } from "./content";

const WA_PROFESSIONAL = "6282254092927";

type TemplateKey = PricePackage["whatsappTemplate"];

function encodeWAText(text: string): string {
  return encodeURIComponent(text.trim());
}

export function generateWhatsAppLink(template: TemplateKey, paketNama: string): string {
  let message: string;

  switch (template) {
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

  return `https://api.whatsapp.com/send?phone=${WA_PROFESSIONAL}&text=${encodeWAText(message)}`;
}
