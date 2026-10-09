import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ArtCard from "@/components/ArtCard";
import { AddToCart } from "@/components/Cart";
import { artworks, formatPrice } from "@/lib/artworks";
import { getAvailable, getBySlug } from "@/lib/square";
import s from "./piece.module.css";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export function generateStaticParams() {
  return artworks.filter((a) => !a.draft).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const art = await getBySlug((await params).slug);
  if (!art) return {};
  const kind = art.format === "card" ? "hand-painted card" : art.format === "paper" ? "original painting on paper" : "original painting";
  const lead = art.story[0]?.split(". ")[0] ?? "";
  const description = `${art.title}, a one-of-one ${kind} by Brooklyn artist Grace Vieira. ${art.size}, ${art.medium.toLowerCase()}. ${lead}${lead.endsWith(".") ? "" : "."}`.slice(0, 300);
  const alt = `${art.title}, ${kind} by Grace Vieira`;
  return {
    title: art.available ? `${art.title}, ${kind}` : `${art.title} (collected)`,
    description,
    alternates: { canonical: `/shop/${art.slug}` },
    openGraph: { type: "website", title: `${art.title} by Grace Vieira`, description, images: [{ url: art.image, alt }] },
    twitter: { card: "summary_large_image", title: `${art.title} by Grace Vieira`, description, images: [art.image] },
  };
}

export default async function Piece({ params }: Props) {
  const art = await getBySlug((await params).slug);
  if (!art) notFound();
  const more = (await getAvailable()).filter((a) => a.slug !== art.slug && a.format === art.format).slice(0, 4);
  const round = art.size.includes("round");
  const kind = art.format === "card" ? "hand-painted card" : art.format === "paper" ? "original painting on paper" : "original painting";
  const imageUrl = art.image.startsWith("http") ? art.image : `${site.url}${art.image}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Product", "VisualArtwork"],
        name: art.title,
        description: art.story.join(" "),
        image: imageUrl,
        url: `${site.url}/shop/${art.slug}`,
        sku: art.square?.code,
        brand: { "@type": "Brand", name: site.name },
        creator: { "@type": "Person", name: "Grace Vieira", "@id": `${site.url}/#grace` },
        artMedium: art.medium,
        artform: art.format === "card" ? "Card" : "Painting",
        size: art.size,
        offers: {
          "@type": "Offer",
          price: art.price.toFixed(2),
          priceCurrency: "USD",
          availability: art.available ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
          itemCondition: "https://schema.org/NewCondition",
          url: `${site.url}/shop/${art.slug}`,
          seller: { "@id": `${site.url}/#store` },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
          },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "US",
            returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
          art.available
            ? { "@type": "ListItem", position: 2, name: "Shop", item: `${site.url}/shop` }
            : { "@type": "ListItem", position: 2, name: "Past work", item: `${site.url}/past-work` },
          { "@type": "ListItem", position: 3, name: art.title, item: `${site.url}/shop/${art.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className={s.layout}>
        <div className={s.wall}>
          <nav className={s.crumb} aria-label="Breadcrumb">
            <Link href={art.available ? "/shop" : "/past-work"}>← {art.available ? "Shop" : "Past work"}</Link>
          </nav>
          <div className={`${s.hung} ${art.format !== "canvas" ? s.card : ""} ${round ? s.round : ""}`}>
            <Image src={art.image} alt={`${art.title}, ${kind} by Grace Vieira`} fill sizes="(max-width: 900px) 80vw, 40vw" priority />
          </div>
        </div>

        <div className={s.info}>
          {art.series && <div className="eyebrow">The {art.series} series</div>}
          <h1 className={s.title}>{art.title}</h1>
          <div className={s.by}>Grace Vieira</div>

          <div className={s.label}>
            {art.available ? (
              <>
                <div className={s.priceRow}>
                  <span className={s.price}>{formatPrice(art.price)}</span>
                  <span className={s.one}>One of one</span>
                </div>
                <AddToCart slug={art.slug} />
                <p className={s.small}>
                  {art.format === "card" ? "Hand-painted original card, not a print." : "Original painting, not a print."}{" "}
                  Payment is handled securely by Square.
                </p>
              </>
            ) : (
              <p className={s.sold}>
                This piece has been collected. <Link href="/shop" className="link">See available work</Link>
              </p>
            )}
          </div>

          <div className={`prose ${s.story}`}>
            {art.story.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <dl className={s.specs}>
            <div><dt>Size</dt><dd>{art.size}</dd></div>
            <div><dt>Medium</dt><dd>{art.medium}</dd></div>
            {art.details?.map((d) => <div key={d}><dt>Detail</dt><dd>{d}</dd></div>)}
          </dl>

          {art.available && (
            <p className={s.small} style={{ marginTop: 22 }}>
              Questions about this piece? <Link href="/contact" className="link">Get in touch</Link>.
              Shipping details are on the <Link href="/shipping" className="link">shipping page</Link>.
            </p>
          )}
        </div>
      </div>

      {more.length > 0 && (
        <section className="section" style={{ borderTop: "1.5px solid var(--ink)" }}>
          <div className="wrap">
            <h2 style={{ marginBottom: 36 }}>{art.format === "card" ? <>More <em>cards</em></> : art.format === "paper" ? <>More <em>paintings on paper</em></> : <>More <em>paintings</em></>}</h2>
            <div className="grid">{more.map((a) => <ArtCard key={a.slug} art={a} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
