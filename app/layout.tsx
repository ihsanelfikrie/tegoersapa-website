import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookingProvider } from "@/lib/BookingContext";
import FloatingBookingBar from "@/components/ui/FloatingBookingBar";

/**
 * Font utama: Hoss Round (file lokal di public/fonts).
 * CSS variable --font-montserrat dipertahankan agar token --font-sans tetap bekerja.
 */
const hossRound = localFont({
  src: [
    { path: "../public/fonts/HossRound-Light.otf", weight: "300", style: "normal" },
    { path: "../public/fonts/HossRound-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/HossRound-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/HossRound-Medium.otf", weight: "600", style: "normal" },
    { path: "../public/fonts/HossRound-Bold.otf", weight: "700", style: "normal" },
    { path: "../public/fonts/HossRound-Heavy.otf", weight: "800", style: "normal" },
    { path: "../public/fonts/HossRound-Black.otf", weight: "900", style: "normal" },
  ],
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={hossRound.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <BookingProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingBookingBar />
        </BookingProvider>
      </body>
    </html>
  );
}
