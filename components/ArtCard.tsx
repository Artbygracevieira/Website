import Link from "next/link";
import Image from "next/image";
import { type Artwork, formatPrice } from "@/lib/artworks";

export default function ArtCard({ art }: { art: Artwork }) {
  return (
    <Link href={`/shop/${art.slug}`} className={`card fmt-${art.format}`}>
      <div className="ph">
        <Image src={art.image} alt={art.title} fill sizes="(max-width: 720px) 50vw, 25vw" />
        {!art.available && <span className="tag collected">Collected</span>}
      </div>
      <div className="meta">
        <div>
          <h3>{art.title}</h3>
          <div className="sub">{art.size}, {art.medium.toLowerCase()}</div>
        </div>
        {art.available && <div className="price">{formatPrice(art.price)}</div>}
      </div>
    </Link>
  );
}
