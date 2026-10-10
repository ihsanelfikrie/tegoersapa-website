import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookingProvider } from "@/lib/BookingContext";
import FloatingBookingBar from "@/components/ui/FloatingBookingBar";
import GlobalButtonFlair from "@/components/ui/GlobalButtonFlair";

/**
 * Font utama: Hoss Round (file lokal di public/fonts).
 * CSS variable --font-montserrat dipertahankan agar token --font-sans tetap bekerja.
 */
const hossRound = localFont({
  src: [
    { path: "../public/fonts/HossRound-Light.otf", weight: "300", style: "normal" },
    { path: "../public/fonts/HossRound-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/HossRound-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/HossRound-Bold.otf", weight: "700", style: "normal" },
    { path: "../public/fonts/HossRound-Heavy.otf", weight: "800", style: "normal" },
    { path: "../public/fonts/HossRound-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#8cd2f5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://tegoersapa.com"),
  title: {
    default: "Tegoer Sapa — Photobooth, Photobox & Professional Photo",
    template: "%s | Tegoer Sapa",
  },
  description:
    "Tegoer Sapa menyediakan layanan photobooth, photobox, dan professional photography untuk wedding, birthday, graduation, dan event corporate di Banjarbaru, Kalimantan Selatan.",
  keywords: [
    "photobooth banjarbaru",
    "photobox banjarbaru",
    "sewa photobooth banjarbaru",
    "photobooth banjarmasin",
    "fotografer banjarbaru",
    "fotografer wisuda banjarbaru",
    "foto wisuda banjarbaru",
    "wedding photography banjarbaru",
    "fotografer kalimantan selatan",
    "studio foto banjarbaru",
    "Tegoer Sapa",
    "tegoersapa",
    "photobooth event banjarbaru",
  ],
  authors: [{ name: "Tegoer Sapa" }],
  creator: "Tegoer Sapa",
  publisher: "Tegoer Sapa",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Tegoer Sapa — Respect The Moment Every Second Matters",
    description:
      "Layanan photobooth, photobox, dan dokumentasi foto profesional untuk berbagai momen berharga di Banjarbaru, Kalimantan Selatan.",
    url: "https://tegoersapa.com",
    siteName: "Tegoer Sapa",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Tegoer Sapa Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tegoer Sapa — Photobooth & Professional Photo",
    description: "Respect The Moment Every Second Matters.",
    images: ["/icon.png"],
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
  alternates: {
    canonical: "https://tegoersapa.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PhotographyBusiness",
  name: "Tegoer Sapa",
  image: "https://tegoersapa.com/icon.png",
  description:
    "Layanan photobooth, photobox, dan professional photography untuk wedding, graduation, birthday, dan corporate event di Banjarbaru, Kalimantan Selatan.",
  url: "https://tegoersapa.com",
  telephone: "+6282254092927",
  priceRange: "Rp300.000 - Rp2.500.000",
  currenciesAccepted: "IDR",
  paymentAccepted: "Cash, QRIS, Bank Transfer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Banjarbaru",
    addressRegion: "Kalimantan Selatan",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -3.4402,
    longitude: 114.8302,
  },
  areaServed: [
    { "@type": "City", name: "Banjarbaru" },
    { "@type": "City", name: "Banjarmasin" },
    { "@type": "City", name: "Martapura" },
    { "@type": "AdministrativeArea", name: "Kalimantan Selatan" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+6282254092927",
      contactType: "customer service",
      contactOption: "WhatsApp",
      availableLanguage: ["id", "en"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+628810805188087",
      contactType: "sales",
      contactOption: "WhatsApp",
      availableLanguage: ["id", "en"],
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
  ],
  sameAs: [
    "https://instagram.com/tegoersapa.photobooth",
    "https://instagram.com/bertegoersapa_",
    "https://tiktok.com/@tegoersapaa",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={hossRound.variable} suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://api.whatsapp.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://maps.app.goo.gl" />
        <link rel="dns-prefetch" href="https://share.google" />
        <link rel="preconnect" href="https://api.whatsapp.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Anti-extension DOM mutation guard (menetralisir atribut bis_skin_checked dari ekstensi pihak ketiga agar tidak memicu console error saat hidrasi) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var o=Element.prototype.setAttribute;Element.prototype.setAttribute=function(n,v){if(n==='bis_skin_checked')return;return o.apply(this,arguments)};var c=function(){var els=document.querySelectorAll('[bis_skin_checked]');for(var i=0;i<els.length;i++){els[i].removeAttribute('bis_skin_checked')}};c();if(typeof MutationObserver!=='undefined'){new MutationObserver(function(m){for(var i=0;i<m.length;i++){if(m[i].type==='attributes'&&m[i].attributeName==='bis_skin_checked'&&m[i].target){m[i].target.removeAttribute('bis_skin_checked')}}}).observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:['bis_skin_checked'])}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased overflow-x-hidden" suppressHydrationWarning>
        <BookingProvider>
          <GlobalButtonFlair />
          <Navbar />
          <main className="flex-1 w-full overflow-x-hidden">{children}</main>
          <Footer />
          <FloatingBookingBar />
        </BookingProvider>
      </body>
    </html>
  );
}
