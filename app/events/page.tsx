import type { Metadata } from "next";
import Image from "next/image";
import { events, type Event } from "@/lib/site";

export const metadata: Metadata = {
  title: "Events",
  description: "Markets and art shows where you can see Grace Vieira's paintings in person.",
};

const fmt = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" });

function Row({ e }: { e: Event }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "20px 0", borderBottom: "1px solid var(--line)", flexWrap: "wrap" }}>
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
    <div className="wrap section">
      <div className="eyebrow">In person</div>
      <h1>Events</h1>
      <p className="lead" style={{ marginTop: 12, marginBottom: 40 }}>
        Paintings look different in person. Here&apos;s where Grace will be next.
      </p>

      <h2 style={{ fontSize: 34, marginBottom: 8 }}>Upcoming</h2>
      {upcoming.length ? upcoming.map((e) => <Row key={e.name + e.date} e={e} />) : (
        <p style={{ padding: "16px 0 8px", color: "var(--muted)" }}>
          No dates announced yet. The email list hears first.
        </p>
      )}

      {past.length > 0 && (
        <>
          <h2 style={{ fontSize: 34, margin: "56px 0 8px" }}>Past</h2>
          {past.map((e) => <Row key={e.name} e={e} />)}
        </>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginTop: 40 }}>
        {[
          ["/photos/booth.jpg", "Grace's booth at the Black Girl Art Show"],
          ["/photos/jacket.jpg", "A denim jacket with a painted portrait on the back"],
          ["/photos/event.jpg", "Visitors at the Black Girl Art Show in Brooklyn"],
        ].map(([src, alt]) => (
          <div key={src} style={{ position: "relative", aspectRatio: "3 / 4", borderRadius: 16, overflow: "hidden" }}>
            <Image src={src} alt={alt} fill sizes="33vw" style={{ objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
