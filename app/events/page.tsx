import type { Metadata } from "next";
import Image from "next/image";
import { events, type Event } from "@/lib/site";
import PageHead from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Events and markets",
  description:
    "Markets and art shows in Brooklyn and New York where you can see and buy Grace Vieira's original paintings in person.",
  alternates: { canonical: "/events" },
};

const fmt = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" });

function Row({ e }: { e: Event }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "20px 0", borderBottom: "1.5px solid var(--ink)", flexWrap: "wrap" }}>
      <div>
        <h3 style={{ fontSize: 26 }}>{e.name}</h3>
        <div style={{ color: "var(--muted)", fontSize: 15 }}>
          {e.date ? `${fmt(e.date)}, ` : ""}{e.place}
        </div>
        {e.note && <p style={{ marginTop: 6, fontSize: 15 }}>{e.note}</p>}
      </div>
      {e.link && <a href={e.link} className="link" target="_blank" rel="noreferrer">Details</a>}
    </div>
  );
}

export default function Events() {
  const upcoming = events.filter((e) => !e.past);
  const past = events.filter((e) => e.past);
  return (
    <>
    <PageHead wall="orange" eyebrow="In person" title={<>Come see it <em>in person</em></>}
      lead="Paintings look different in person. Here's where Grace will be next." />
    <div className="wrap section">

      <h2 style={{ fontSize: 44, marginBottom: 8 }}>Upcoming</h2>
      {upcoming.length ? upcoming.map((e) => <Row key={e.name + e.date} e={e} />) : (
        <p style={{ padding: "16px 0 8px", color: "var(--muted)" }}>
          No dates announced yet. The email list hears first.
        </p>
      )}

      {past.length > 0 && (
        <>
          <h2 style={{ fontSize: 44, margin: "64px 0 8px" }}>Past</h2>
          {past.map((e) => <Row key={e.name} e={e} />)}
        </>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginTop: 40 }}>
        {[
          ["/photos/booth.jpg", "Grace's booth at the Black Girl Art Show"],
          ["/photos/jacket.jpg", "A denim jacket with a painted portrait on the back"],
          ["/photos/event.jpg", "Visitors at the Black Girl Art Show in Brooklyn"],
        ].map(([src, alt]) => (
          <div key={src} style={{ position: "relative", aspectRatio: "3 / 4", borderRadius: 4, overflow: "hidden", border: "1.5px solid var(--ink)" }}>
            <Image src={src} alt={alt} fill sizes="33vw" style={{ objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
