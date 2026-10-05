import Link from "next/link";
import Image from "next/image";
import { type Artwork, formatPrice } from "@/lib/artworks";

// A piece hung on its own colored wall, with a wall label underneath.
export default function ArtCard({ art, priority = false }: { art: Artwork; priority?: boolean }) {
  return (
    <Link href={`/shop/${art.slug}`} className={`card fmt-${art.format}${art.available ? "" : " sold"}`}>
      <div className={`frame wall-${art.wall ?? "paper"}`}>
        {!art.available && <span className="tag">Collected</span>}
        <div className="canvas">
          <Image src={art.image} alt={art.title} fill sizes="(max-width: 720px) 45vw, 22vw" priority={priority} />
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
