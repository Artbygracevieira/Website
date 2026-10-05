import Link from "next/link";
import Image from "next/image";
import ArtCard from "@/components/ArtCard";
import { getAvailable } from "@/lib/square";
import { events } from "@/lib/site";
import styles from "./home.module.css";

export const revalidate = 300;

export default async function Home() {
  const all = await getAvailable();
  const pieces = [...all.filter((a) => a.format === "canvas"), ...all.filter((a) => a.format === "card")];
  const upcoming = events.filter((e) => !e.past);

  return (
    <>
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div>
            <div className="eyebrow">Original paintings, Brooklyn NY</div>
            <h1>Crafted by hand, created for <em>you.</em></h1>
            <p className="lead">
              Bold florals and faceless portraits by Grace Vieira. Every painting is an
              original, and once it&apos;s gone, it&apos;s gone.
            </p>
            <div className={styles.ctas}>
              <Link href="/shop" className="btn">Shop available work</Link>
              <Link href="/about" className="btn ghost">Meet Grace</Link>
            </div>
          </div>
          <div className={styles.collage}>
            <div className={styles.a}><Image src="/art/built-in-bloom.jpg" alt="Built in Bloom" fill sizes="(max-width: 860px) 70vw, 30vw" priority /></div>
            <div className={styles.b}><Image src="/art/in-full-bloom.jpg" alt="In Full Bloom" fill sizes="20vw" /></div>
            <div className={styles.c}><Image src="/art/crowned-in-confidence.jpg" alt="Crowned in Confidence" fill sizes="20vw" /></div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className={styles.head}>
            <div>
              <div className="eyebrow">Available now</div>
              <h2>Ready for a new home</h2>
            </div>
            <Link href="/shop" className="link">See all</Link>
          </div>
          {pieces.length > 0 ? (
            <div className="grid">{pieces.slice(0, 4).map((a) => <ArtCard key={a.slug} art={a} />)}</div>
          ) : (
            <p className="lead">Everything has found a home for now. Join the list below to hear about the next release.</p>
          )}
        </div>
      </section>

      <section className={`section ${styles.meet}`}>
        <div className={`wrap ${styles.meetGrid}`}>
          <div className={styles.photo}>
            <Image src="/photos/grace.jpg" alt="Grace Vieira beside her booth sign" fill sizes="(max-width: 860px) 100vw, 45vw" style={{ objectPosition: "50% 30%" }} />
          </div>
          <div className="prose">
            <div className="eyebrow">Meet the artist</div>
            <h2 style={{ marginBottom: 22 }}>A late bloomer</h2>
            <p>
              Grace was born in Jamaica and lives in Brooklyn. She started painting in 2018,
              first with watercolor and gouache, then acrylics.
            </p>
            <p>
              Her early pieces were florals from her own backyard garden. Over time the
              flowers moved into faceless portraits, and that became the Bloom series.
            </p>
            <p className={styles.quote}>People grow and thrive on their own timelines.</p>
            <Link href="/about" className="btn dark">Read her story</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`wrap ${styles.irl}`}>
          <div className={styles.pics}>
            <div><Image src="/photos/jacket.jpg" alt="A denim jacket with a painted portrait on the back" fill sizes="25vw" /></div>
            <div><Image src="/photos/booth.jpg" alt="Grace's booth at the Black Girl Art Show" fill sizes="25vw" /></div>
            <div><Image src="/photos/event.jpg" alt="Visitors at the Black Girl Art Show in Brooklyn" fill sizes="25vw" /></div>
          </div>
          <div>
            <div className="eyebrow">In person</div>
            <h2>Find Grace at a market</h2>
            {upcoming.length > 0 ? (
              <p className="lead" style={{ marginTop: 14 }}>Next up: {upcoming[0].name}, {upcoming[0].place}.</p>
            ) : (
              <p className="lead" style={{ marginTop: 14 }}>
                Grace brings her paintings to markets and art shows. New dates go to the email list first.
              </p>
            )}
            <p style={{ marginTop: 24 }}><Link href="/events" className="link">Events</Link></p>
          </div>
        </div>
      </section>
    </>
  );
}
