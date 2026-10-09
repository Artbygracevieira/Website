import type { Metadata } from "next";
import ArtCard from "@/components/ArtCard";
import ArchiveTile from "@/components/ArchiveTile";
import PageHead from "@/components/PageHead";
import { getCollected, getSoldOutArchive } from "@/lib/square";

export const metadata: Metadata = {
  title: "Past work",
  description:
    "Original paintings and hand-painted cards by Brooklyn artist Grace Vieira that have already found homes. A look at her work over time.",
  alternates: { canonical: "/past-work" },
};

export const revalidate = 60;

export default async function PastWork() {
  const [pieces, archive] = await Promise.all([getCollected(), getSoldOutArchive()]);
  return (
    <>
      <PageHead wall="pink" eyebrow="Archive" title={<>Past <em>work</em></>}
        lead="These originals already have homes. They stay here so you can see the work over time." />
      <div className="wrap" style={{ padding: "64px var(--px) 96px" }}>
        <div className="grid">
          {pieces.map((a) => <ArtCard key={a.slug} art={a} />)}
          {archive.map((p) => <ArchiveTile key={p.id} piece={p} />)}
        </div>
      </div>
    </>
  );
}
