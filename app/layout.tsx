import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/**
 * Load Montserrat sebagai variable font — sesuai Bagian 7 AGENT.md.
 * Gunakan opsi `variable` agar CSS custom property tersedia di seluruh dokumen.
 * Montserrat adalah variable font sehingga kita tidak perlu mendaftar setiap weight satu per satu.
 */
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tegoer Sapa — Photobooth, Photobox & Professional Photo",
    template: "%s | Tegoer Sapa",
  },
  description:
    "Tegoer Sapa menyediakan layanan photobooth, photobox, dan professional photography untuk wedding, birthday, graduation, dan event corporate di Medan.",
  keywords: [
    "photobooth",
    "photobox",
    "professional photo",
    "wedding photobooth",
    "graduation photo",
    "Tegoer Sapa",
  ],
  openGraph: {
    siteName: "Tegoer Sapa",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={montserrat.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
