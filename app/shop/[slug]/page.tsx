import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ArtCard from "@/components/ArtCard";
import { AddToCart } from "@/components/Cart";
import { artworks, formatPrice } from "@/lib/artworks";
import { getAvailable, getBySlug } from "@/lib/square";
import styles from "./piece.module.css";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const art = await getBySlug((await params).slug);
  if (!art) return {};
  return {
    title: art.title,
    description: `${art.title}, an original by Grace Vieira. ${art.size}, ${art.medium.toLowerCase()}.`,
    openGraph: { images: [art.image] },
  };
}

export default async function Piece({ params }: Props) {
  const art = await getBySlug((await params).slug);
  if (!art) notFound();
  const more = (await getAvailable()).filter((a) => a.slug !== art.slug && a.format === art.format).slice(0, 4);

  return (
    <div className="wrap">
      <nav className={styles.crumb} aria-label="Breadcrumb">
        <Link href={art.available ? "/shop" : "/past-work"}>{art.available ? "Shop" : "Past work"}</Link>
        <span> / </span>
        {art.title}
      </nav>

      <div className={styles.layout}>
        <div className={styles.image} style={art.format === "card" ? { aspectRatio: "4 / 5" } : undefined}>
          <Image src={art.image} alt={art.title} fill sizes="(max-width: 860px) 100vw, 55vw" priority />
        </div>

        <div>
          {art.series && <div className="eyebrow">The {art.series} series</div>}
          <h1 className={styles.title}>{art.title}</h1>

          {art.available ? (
            <>
              <div className={styles.price}>{formatPrice(art.price)}</div>
              <div className={styles.one}>{art.format === "card" ? "Hand-painted original card. There is only one." : "Original painting. There is only one."}</div>
              <AddToCart slug={art.slug} />
            </>
          ) : (
            <div className={styles.sold}>
              This piece has been collected. <Link href="/shop" className="link">See available work</Link>
            </div>
          )}

          <div className={`prose ${styles.story}`}>
            {art.story.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <dl className={styles.specs}>
            <div><dt>Size</dt><dd>{art.size}</dd></div>
            <div><dt>Medium</dt><dd>{art.medium}</dd></div>
            {art.details?.map((d) => <div key={d}><dt>Detail</dt><dd>{d}</dd></div>)}
          </dl>

          {art.available && (
            <p className={styles.small}>
              Questions about this piece? <Link href="/contact" className="link">Get in touch</Link>.
              Shipping details are on the <Link href="/shipping" className="link">shipping page</Link>.
            </p>
          )}
        </div>
      </div>

      {more.length > 0 && (
        <section className="section" style={{ borderTop: "1px solid var(--line)" }}>
          <h2 style={{ marginBottom: 28 }}>{art.format === "card" ? "More cards" : "More paintings"}</h2>
          <div className="grid">{more.map((a) => <ArtCard key={a.slug} art={a} />)}</div>
        </section>
      )}
    </div>
  );
}
