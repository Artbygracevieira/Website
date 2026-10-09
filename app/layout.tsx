import type { Metadata } from "next";
import { Gloock, Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinList from "@/components/JoinList";
import { CartProvider } from "@/components/Cart";
import { site } from "@/lib/site";
import { getArtworks } from "@/lib/square";
import JsonLd from "@/components/JsonLd";

const display = Gloock({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const accent = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-accent" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Art by Grace Vieira | Original Floral Portrait Paintings, Brooklyn", template: "%s | Art by Grace Vieira" },
  description:
    "Original floral portrait paintings and hand-painted cards by Brooklyn artist Grace Vieira. Bold color, faceless figures and hand-painted florals. Every piece is one of one.",
  keywords: [
    "Grace Vieira",
    "Brooklyn artist",
    "original paintings",
    "floral portrait painting",
    "Black art",
    "hand-painted cards",
    "faceless portrait art",
    "original art for sale",
  ],
  authors: [{ name: "Grace Vieira", url: site.url }],
  creator: "Grace Vieira",
  alternates: { canonical: "/" },
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
    url: site.url,
    images: [{ url: "/art/built-in-bloom.jpg", alt: "Built in Bloom, an original floral portrait painting by Grace Vieira" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#grace`,
      name: "Grace Vieira",
      jobTitle: "Artist",
      url: `${site.url}/about`,
      image: `${site.url}/photos/grace-headshot.jpg`,
      sameAs: [site.instagram],
      address: { "@type": "PostalAddress", addressLocality: "Brooklyn", addressRegion: "NY", addressCountry: "US" },
    },
    {
      "@type": "Organization",
      "@id": `${site.url}/#store`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/icon.png`,
      sameAs: [site.instagram],
      founder: { "@id": `${site.url}/#grace` },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      publisher: { "@id": `${site.url}/#store` },
      inLanguage: "en-US",
    },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pieces = await getArtworks();
  return (
    <html lang="en" className={`${display.variable} ${accent.variable} ${body.variable}`}>
      <body>
        <JsonLd data={siteSchema} />
        <CartProvider pieces={pieces}>
          <Header />
          <main>{children}</main>
          <JoinList />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
