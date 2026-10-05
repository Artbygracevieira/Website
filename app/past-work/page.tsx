import type { Metadata } from "next";
import ArtCard from "@/components/ArtCard";
import { collected } from "@/lib/artworks";

export const metadata: Metadata = {
  title: "Past work",
  description: "Original paintings by Grace Vieira that have already been collected.",
};

export default function PastWork() {
  return (
    <div className="wrap" style={{ paddingBottom: 96 }}>
      <div style={{ padding: "56px 0 36px", borderBottom: "1px solid var(--line)", marginBottom: 36 }}>
        <div className="eyebrow">Archive</div>
        <h1>Past work</h1>
        <p className="lead" style={{ marginTop: 12 }}>
          These originals already have homes. They stay here so you can see the work over time.
        </p>
      </div>
      <div className="grid">{collected().map((a) => <ArtCard key={a.slug} art={a} />)}</div>
    </div>
  );
}
