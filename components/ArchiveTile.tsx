import Image from "next/image";
import type { ArchivePiece } from "@/lib/square";

// A collected piece from Square's "Sold out" category. No page of its own, just the photo.
export default function ArchiveTile({ piece }: { piece: ArchivePiece }) {
  return (
    <figure className={`card fmt-${piece.format} sold`} style={{ margin: 0 }}>
      <div className="frame">
        <span className="tag">Collected</span>
        <div className="canvas">
          <Image src={piece.image} alt={`${piece.kind} by Grace Vieira, collected`} fill sizes="(max-width: 720px) 45vw, 22vw" loading="lazy" />
        </div>
      </div>
      <figcaption className="label">
        <div className="sub">{piece.kind}</div>
      </figcaption>
    </figure>
  );
}
