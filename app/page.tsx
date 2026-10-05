import Link from "next/link";
import Image from "next/image";
import ArtCard from "@/components/ArtCard";
import Flower, { Leaf } from "@/components/Flower";
import { AddToCart } from "@/components/Cart";
import { formatPrice } from "@/lib/artworks";
import { getAvailable } from "@/lib/square";
import { events } from "@/lib/site";
import s from "./home.module.css";

export const revalidate = 300;

export default async function Home() {
  const all = await getAvailable();
  const paintings = all.filter((a) => a.format === "canvas");
  const cards = all.filter((a) => a.format === "card");
  const featured = paintings[0] ?? all[0];
  const upcoming = events.filter((e) => !e.past);
  const cardPrice = cards.length ? Math.min(...cards.map((c) => c.price)) : null;

  return (
    <>
      {/* HERO */}
      <section className={s.hero}>
        <div className={`wrap ${s.heroGrid}`}>
          <div className={s.heroCopy}>
            <div className="eyebrow rise">Original paintings · Brooklyn, NY</div>
            <h1 className="rise d1">Crafted by hand, created for <em>you.</em></h1>
            <p className="lead rise d2">
              Bold florals and faceless portraits by Grace Vieira. Every piece is an original,
              and once it&apos;s gone, it&apos;s gone.
            </p>
            <div className={`${s.ctas} rise d3`}>
              <Link href="/shop" className="btn">Shop the work <span className="arrow">→</span></Link>
              <Link href="/about" className="btn ghost">Meet Grace</Link>
            </div>
          </div>

          {featured && (
            <div className={`${s.wall} wall-${featured.wall ?? "mustard"} rise d2`}>
              <Flower className={`${s.f1} spin-slow`} size={120} color="var(--pink)" center="var(--orange)" />
              <Leaf className={s.l1} size={80} rotate={-30} />
              <Flower className={`${s.f2} bob`} size={70} color="var(--paper)" center="var(--rose)" petals={6} />
              <Link href={`/shop/${featured.slug}`} className={`${s.hung} ${featured.size.includes("round") ? s.round : ""}`}>
                <span className={s.wire} aria-hidden="true" />
                <span className={s.hungImg}>
                  <Image src={featured.image} alt={featured.title} fill priority sizes="(max-width: 860px) 70vw, 32vw" />
                </span>
              </Link>
              <div className={s.wallLabel}>
                <div className={s.labelTop}>
                  <div>
                    <div className={s.labelTitle}>{featured.title}</div>
                    <div className={s.labelMeta}>Grace Vieira · {featured.size} · {featured.medium.toLowerCase()}</div>
                  </div>
                  <div className={s.labelPrice}>{formatPrice(featured.price)}</div>
                </div>
                <AddToCart slug={featured.slug} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PAINTINGS */}
      {paintings.length > 0 && (
        <section className="section" style={{ paddingTop: 40 }}>
          <div className="wrap">
            <div className={s.head}>
              <div>
                <div className="eyebrow">On the wall now</div>
                <h2>Paintings, <em>ready to hang</em></h2>
              </div>
              <Link href="/shop#paintings" className="link">See all paintings →</Link>
            </div>
            <div className="grid">{paintings.slice(0, 4).map((a, i) => <ArtCard key={a.slug} art={a} priority={i < 2} />)}</div>
          </div>
        </section>
      )}

      {/* CARDS */}
      {cards.length > 0 && (
        <section className={`section ${s.cardsBand}`}>
          <div className="wrap">
            <div className={s.head}>
              <div>
                <div className="eyebrow">Small originals</div>
                <h2>Hand-painted cards{cardPrice ? <>, <em>{formatPrice(cardPrice)} each</em></> : null}</h2>
                <p className="lead" style={{ marginTop: 16 }}>Each one is painted by hand, not printed.</p>
              </div>
              <Link href="/shop#cards" className="link">See all {cards.length} cards →</Link>
            </div>
            <div className={`grid ${s.pinned}`}>{cards.slice(0, 8).map((a) => <ArtCard key={a.slug} art={a} />)}</div>
          </div>
        </section>
      )}

      {/* MEET GRACE */}
      <section className={`${s.meet} wall-sky`}>
        <div className={`wrap ${s.meetGrid}`}>
          <div className={s.arch}>
            <Image src="/photos/grace.jpg" alt="Grace Vieira beside her booth sign" fill sizes="(max-width: 860px) 90vw, 40vw" style={{ objectPosition: "50% 30%" }} />
          </div>
          <div>
            <div className="eyebrow">Meet the artist</div>
            <p className={s.quote}>&ldquo;People grow and thrive on their own <em>timelines.</em>&rdquo;</p>
            <div className="prose" style={{ marginTop: 28 }}>
              <p style={{ color: "var(--ink)" }}>
                Grace was born in Jamaica and lives in Brooklyn. She started painting in 2018, and her first
                pieces were florals from her own backyard garden. Over time the flowers moved into faceless
                portraits, and that became the Bloom series.
              </p>
            </div>
            <Link href="/about" className="btn" style={{ marginTop: 8 }}>Read her story <span className="arrow">→</span></Link>
          </div>
        </div>
        <Flower className={s.meetFlower} size={220} color="var(--paper)" center="var(--mustard)" />
      </section>

      {/* IN PERSON */}
      <section className="section">
        <div className={`wrap ${s.irl}`}>
          <div>
            <div className="eyebrow">In person</div>
            <h2>Come say hi <em>at a market</em></h2>
            <p className="lead" style={{ marginTop: 18 }}>
              {upcoming.length > 0
                ? `Next up: ${upcoming[0].name}, ${upcoming[0].place}.`
                : "Grace brings her paintings to markets and art shows. New dates go to the email list first."}
            </p>
            <p style={{ marginTop: 28 }}><Link href="/events" className="link">See events →</Link></p>
          </div>
          <div className={s.polaroids}>
            <figure style={{ rotate: "-5deg" }}>
              <span><Image src="/photos/booth.jpg" alt="Grace's booth at the Black Girl Art Show" fill sizes="22vw" /></span>
              <figcaption>The booth</figcaption>
            </figure>
            <figure style={{ rotate: "4deg" }}>
              <span><Image src="/photos/jacket.jpg" alt="A denim jacket with a painted portrait on the back" fill sizes="22vw" /></span>
              <figcaption>Black Girl Art Show</figcaption>
            </figure>
            <figure style={{ rotate: "-2deg" }}>
              <span><Image src="/photos/event.jpg" alt="Visitors at the Black Girl Art Show in Brooklyn" fill sizes="22vw" /></span>
              <figcaption>Brooklyn</figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
