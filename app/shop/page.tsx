import type { Metadata } from "next";
import Link from "next/link";
import ArtCard from "@/components/ArtCard";
import { getAvailable } from "@/lib/square";

export const metadata: Metadata = {
  title: "Shop original paintings and cards",
  description: "Original paintings and hand-painted cards by Grace Vieira that are available now. Each one is one of one.",
};

export const revalidate = 300;

export default async function Shop() {
  const pieces = await getAvailable();
  const paintings = pieces.filter((a) => a.format === "canvas");
  const cards = pieces.filter((a) => a.format === "card");

  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <div style={{ padding: "56px 0 28px" }}>
        <div className="eyebrow">Shop</div>
        <h1>Available work</h1>
        <p className="lead" style={{ marginTop: 12 }}>
          Everything here is an original, painted by hand. There is only one of each.
        </p>
        {paintings.length > 0 && cards.length > 0 && (
          <p style={{ marginTop: 22, display: "flex", gap: 24 }}>
            <a href="#paintings" className="link">Paintings</a>
            <a href="#cards" className="link">Cards</a>
          </p>
        )}
      </div>

      {pieces.length === 0 && (
        <p className="lead">Everything has found a home for now. Join the list to hear about the next release.</p>
      )}

      {paintings.length > 0 && (
        <section id="paintings" style={{ borderTop: "1px solid var(--line)", paddingTop: 36, scrollMarginTop: 90 }}>
          <h2 style={{ fontSize: 40, marginBottom: 6 }}>Paintings</h2>
          <p style={{ color: "var(--muted)", marginBottom: 28 }}>Acrylic on canvas, ready to hang.</p>
          <div className="grid">{paintings.map((a) => <ArtCard key={a.slug} art={a} />)}</div>
        </section>
      )}

      {cards.length > 0 && (
        <section id="cards" style={{ borderTop: "1px solid var(--line)", paddingTop: 36, marginTop: 64, scrollMarginTop: 90 }}>
          <h2 style={{ fontSize: 40, marginBottom: 6 }}>Cards</h2>
          <p style={{ color: "var(--muted)", marginBottom: 28 }}>Small originals, hand-painted on paper. $30 each.</p>
          <div className="grid">{cards.map((a) => <ArtCard key={a.slug} art={a} />)}</div>
        </section>
      )}

      <p style={{ marginTop: 56 }}>
        Looking for a piece you saw before? <Link href="/past-work" className="link">See past work</Link>
      </p>
    </div>
  );
}
