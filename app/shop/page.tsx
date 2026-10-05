import type { Metadata } from "next";
import Link from "next/link";
import ArtCard from "@/components/ArtCard";
import { available } from "@/lib/artworks";

export const metadata: Metadata = {
  title: "Shop original paintings",
  description: "Original paintings by Grace Vieira that are available now. Each one is one of one.",
};

export default function Shop() {
  const pieces = available();
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <div style={{ padding: "56px 0 36px", borderBottom: "1px solid var(--line)", marginBottom: 36 }}>
        <div className="eyebrow">Shop</div>
        <h1>Available work</h1>
        <p className="lead" style={{ marginTop: 12 }}>
          Every painting here is an original. There is only one of each.
        </p>
      </div>
      {pieces.length > 0 ? (
        <div className="grid">{pieces.map((a) => <ArtCard key={a.slug} art={a} />)}</div>
      ) : (
        <p className="lead">Everything has found a home for now. Join the list to hear about the next release.</p>
      )}
      <p style={{ marginTop: 56 }}>
        Looking for a piece you saw before? <Link href="/past-work" className="link">See past work</Link>
      </p>
    </div>
  );
}
