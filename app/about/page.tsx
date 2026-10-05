import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Grace",
  description: "Grace Vieira is an independent artist in Brooklyn, NY, known for vibrant botanical and abstract portraits.",
};

export default function About() {
  return (
    <div className="wrap section">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(32px, 6vw, 80px)", alignItems: "start" }}>
        <div style={{ position: "relative", aspectRatio: "3 / 4", borderRadius: 18, overflow: "hidden" }}>
          <Image src="/photos/grace.jpg" alt="Grace Vieira beside her booth sign" fill sizes="(max-width: 700px) 100vw, 45vw" style={{ objectFit: "cover" }} priority />
        </div>
        <div className="prose">
          <div className="eyebrow">About</div>
          <h1 style={{ marginBottom: 28 }}>Grace Vieira</h1>
          <p>
            Grace Vieira is an independent artist based in Brooklyn, NY, known for her vibrant
            botanical and abstract portraits. Born in Jamaica, Grace began painting in 2018,
            starting with watercolor and gouache before finding her stride with acrylics. She also
            experiments with collage and mixed media, bringing depth and texture to her work.
          </p>
          <p>
            Her artistic journey is deeply personal. Inspired by her love of gardening, Grace&apos;s
            early pieces featured bold, expressive florals drawn from her own backyard. Over time,
            she began bringing those botanical elements into faceless portraits, which became her
            signature Bloom series.
          </p>
          <p>
            The Bloom series reflects Grace&apos;s belief that people grow and thrive on their own
            timelines. As a self-described &ldquo;late bloomer,&rdquo; she sees her art as a celebration of
            finding purpose and creativity at any stage of life. Through color, texture, and
            intentional design, her work honors individuality, identity, and the beauty of becoming.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
            <Link href="/shop" className="btn">See available work</Link>
            <Link href="/events" className="btn ghost">Where to find her</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
