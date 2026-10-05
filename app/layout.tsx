import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinList from "@/components/JoinList";
import { CartProvider } from "@/components/Cart";
import { site } from "@/lib/site";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], variable: "--font-display" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Art by Grace Vieira | Original paintings, Brooklyn", template: "%s | Art by Grace Vieira" },
  description: "Original botanical and abstract portraits by Brooklyn artist Grace Vieira. Every piece is one of one.",
  openGraph: { siteName: site.name, type: "website", images: ["/art/built-in-bloom.jpg"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <JoinList />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
