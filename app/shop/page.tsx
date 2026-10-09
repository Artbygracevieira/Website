import type { Metadata } from "next";
import Link from "next/link";
import ArtCard from "@/components/ArtCard";
import PageHead from "@/components/PageHead";
import { formatPrice } from "@/lib/artworks";
import { getAvailable } from "@/lib/square";

export const metadata: Metadata = {
  title: "Shop original paintings and hand-painted cards",
  description:
    "Shop one-of-one floral portrait paintings, paintings on paper and hand-painted cards by Brooklyn artist Grace Vieira. Ships within the US.",
  alternates: { canonical: "/shop" },
};

export const revalidate = 60;

export default async function Shop() {
  const pieces = await getAvailable();
  const paintings = pieces.filter((a) => a.format === "canvas");
  const onPaper = pieces.filter((a) => a.format === "paper");
  const cards = pieces.filter((a) => a.format === "card");
  const cardPrice = cards.length ? Math.min(...cards.map((c) => c.price)) : null;

  return (
    <>
      <PageHead
        wall="teal"
        eyebrow="Shop"
        title={<>Available <em>work</em></>}
        lead="Everything here is an original, painted by hand. There is only one of each."
      >
        {[paintings, onPaper, cards].filter((g) => g.length).length > 1 && (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {paintings.length > 0 && <a href="#paintings" className="btn light">Paintings ({paintings.length})</a>}
            {onPaper.length > 0 && <a href="#paper" className="btn light">On paper ({onPaper.length})</a>}
            {cards.length > 0 && <a href="#cards" className="btn light">Cards ({cards.length})</a>}
          </div>
        )}
      </PageHead>

      <div className="wrap" style={{ paddingBottom: 96 }}>
        {pieces.length === 0 && (
          <p className="lead" style={{ padding: "64px 0" }}>Everything has found a home for now. Join the list to hear about the next release.</p>
        )}

        {paintings.length > 0 && (
          <section id="paintings" style={{ paddingTop: 64, scrollMarginTop: 100 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 16, flexWrap: "wrap", marginBottom: 36 }}>
              <h2>Paintings</h2>
              <p style={{ color: "var(--muted)" }}>Acrylic on canvas, ready to hang.</p>
            </div>
            <div className="grid">{paintings.map((a, i) => <ArtCard key={a.slug} art={a} priority={i < 4} />)}</div>
          </section>
        )}

        {onPaper.length > 0 && (
          <section id="paper" style={{ paddingTop: 96, scrollMarginTop: 100 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 16, flexWrap: "wrap", marginBottom: 36 }}>
              <h2>Paintings <em>on paper</em></h2>
              <p style={{ color: "var(--muted)" }}>Originals painted on heavy paper, ready to frame.</p>
            </div>
            <div className="grid">{onPaper.map((a) => <ArtCard key={a.slug} art={a} />)}</div>
          </section>
        )}

        {cards.length > 0 && (
          <section id="cards" style={{ paddingTop: 96, scrollMarginTop: 100 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 16, flexWrap: "wrap", marginBottom: 36 }}>
              <h2>Cards{cardPrice ? <>, <em>{formatPrice(cardPrice)} each</em></> : null}</h2>
              <p style={{ color: "var(--muted)" }}>Small originals, hand-painted on paper. Ready to frame or give as a gift.</p>
            </div>
            <div className="grid">{cards.map((a) => <ArtCard key={a.slug} art={a} />)}</div>
          </section>
        )}

        <p style={{ marginTop: 72, fontSize: 18 }}>
          Looking for a piece you saw before? <Link href="/past-work" className="link">See past work</Link>
        </p>
      </div>
    </>
  );
}
