import type { Metadata } from "next";
import ArtCard from "@/components/ArtCard";
import PageHead from "@/components/PageHead";
import { getCollected } from "@/lib/square";

export const metadata: Metadata = {
  title: "Past work",
  description: "Original paintings by Grace Vieira that have already been collected.",
};

export const revalidate = 300;

export default async function PastWork() {
  const pieces = await getCollected();
  return (
    <>
      <PageHead wall="pink" eyebrow="Archive" title={<>Past <em>work</em></>}
        lead="These originals already have homes. They stay here so you can see the work over time." />
      <div className="wrap" style={{ padding: "64px var(--px) 96px" }}>
      <div className="grid">{pieces.map((a) => <ArtCard key={a.slug} art={a} />)}</div>
      </div>
    </>
  );
}
