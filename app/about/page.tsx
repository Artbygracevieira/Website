import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Flower, { Leaf } from "@/components/Flower";

export const metadata: Metadata = {
  title: "About Grace Vieira, Brooklyn artist",
  description:
    "Grace Vieira is a Jamaican-born artist in Brooklyn, NY, known for vibrant botanical and abstract portraits. Her Bloom series celebrates growing on your own timeline.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <section className="wall-terracotta" style={{ borderBottom: "1.5px solid var(--ink)", position: "relative", overflow: "hidden" }}>
        <Flower className="spin-slow" size={200} color="var(--pink)" center="var(--mustard)" style={{ position: "absolute", right: "-50px", top: "-50px" }} />
        <Leaf size={90} rotate={-30} style={{ position: "absolute", left: "46%", bottom: "30px" }} />
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(32px, 6vw, 80px)", alignItems: "end", padding: "clamp(56px, 8vw, 104px) var(--px)" }}>
          <div>
            <div className="eyebrow rise">About</div>
            <h1 className="rise d1">Grace <em>Vieira</em></h1>
            <p className="rise d2" style={{ fontFamily: "var(--font-accent), serif", fontStyle: "italic", fontSize: "clamp(26px, 3vw, 38px)", lineHeight: 1.15, marginTop: 22, maxWidth: 520 }}>
              A self-described late bloomer, painting since 2018.
            </p>
          </div>
          <div className="rise d2" style={{ position: "relative", aspectRatio: "4 / 5", maxWidth: 440, width: "100%", justifySelf: "end", borderRadius: "999px 999px 8px 8px", overflow: "hidden", border: "1.5px solid var(--ink)", boxShadow: "10px 10px 0 var(--ink)" }}>
            <Image src="/photos/grace-headshot.jpg" alt="Portrait of artist Grace Vieira" fill sizes="(max-width: 700px) 90vw, 40vw" style={{ objectFit: "cover", objectPosition: "50% 35%" }} priority />
          </div>
        </div>
      </section>

      <div className="wrap section">
        <div className="story-grid">
          <div>
            <div className="eyebrow">Her story</div>
            <p className="pull">&ldquo;People grow and thrive on their own <em>timelines.</em>&rdquo;</p>
          </div>
          <div className="body">
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
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
              <Link href="/shop" className="btn">See available work <span className="arrow">→</span></Link>
              <Link href="/events" className="btn ghost">Where to find her</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
