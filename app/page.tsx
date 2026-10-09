import Link from "next/link";
import Image from "next/image";
import ArtCard from "@/components/ArtCard";
import Flower, { Leaf } from "@/components/Flower";
import { formatPrice } from "@/lib/artworks";
import { getAvailable } from "@/lib/square";
import { events } from "@/lib/site";
import s from "./home.module.css";

export const revalidate = 60;

export default async function Home() {
  const all = await getAvailable();
  const paintings = [...all.filter((a) => a.format === "canvas"), ...all.filter((a) => a.format === "paper")];
  const cards = all.filter((a) => a.format === "card");
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

          <div className={`${s.photoWrap} rise d2`}>
            <Flower className={`${s.f1} spin-slow`} size={130} color="var(--pink)" center="var(--orange)" />
            <Leaf className={s.l1} size={84} rotate={-30} />
            <div className={s.photo}>
              <Image src="/photos/grace-round-paintings.jpg" alt="Grace Vieira, right, with two women holding three of her round paintings at an event"
                fill priority sizes="(max-width: 860px) 90vw, 42vw" style={{ objectPosition: "50% 60%" }} />
            </div>
            <div className={s.sticker}>Grace, <em>right</em>, with three of her round paintings</div>
          </div>
        </div>
      </section>

      {/* PAINTINGS */}
      {paintings.length > 0 && (
        <section className="section">
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
                <p className="lead" style={{ marginTop: 16 }}>Each one is painted by hand, not printed. Ready to frame or give as a gift.</p>
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
            <Image src="/photos/grace-headshot.jpg" alt="Portrait of artist Grace Vieira" fill sizes="(max-width: 860px) 90vw, 40vw" style={{ objectPosition: "50% 35%" }} />
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
