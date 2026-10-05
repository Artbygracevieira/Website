import type { Metadata } from "next";
import { Gloock, Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinList from "@/components/JoinList";
import { CartProvider } from "@/components/Cart";
import { site } from "@/lib/site";
import { getArtworks } from "@/lib/square";

const display = Gloock({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const accent = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-accent" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Art by Grace Vieira | Original paintings, Brooklyn", template: "%s | Art by Grace Vieira" },
  description: "Original botanical and abstract portraits by Brooklyn artist Grace Vieira. Every piece is one of one.",
  openGraph: { siteName: site.name, type: "website", images: ["/art/built-in-bloom.jpg"] },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pieces = await getArtworks();
  return (
    <html lang="en" className={`${display.variable} ${accent.variable} ${body.variable}`}>
      <body>
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
