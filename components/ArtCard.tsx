import Link from "next/link";
import Image from "next/image";
import { type Artwork, formatPrice } from "@/lib/artworks";

// A piece on a plain, light mat so the art itself is the only color on the card.
export default function ArtCard({ art, priority = false }: { art: Artwork; priority?: boolean }) {
  const round = art.size.toLowerCase().includes("round");
  return (
    <Link href={`/shop/${art.slug}`} className={`card fmt-${art.format}${round ? " is-round" : ""}${art.available ? "" : " sold"}`}>
      <div className="frame">
        {!art.available && <span className="tag">Collected</span>}
        <div className="canvas">
          <Image src={art.image} alt={`${art.title}, ${art.format === "card" ? "hand-painted card" : "original painting"} by Grace Vieira`} fill sizes="(max-width: 720px) 45vw, 22vw" priority={priority} />
        </div>
      </div>
      <div className="label">
        <div>
          <h3>{art.title}</h3>
          <div className="sub">{art.size} · {art.medium.toLowerCase()}</div>
        </div>
        {art.available && <span className="price-tag">{formatPrice(art.price)}</span>}
      </div>
    </Link>
  );
}
