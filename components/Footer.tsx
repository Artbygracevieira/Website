import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="cols">
          <div>
            <div style={{ width: 100, height: 50, position: "relative", filter: "invert(1)" }}>
              <Image src="/logo.png" alt="" fill sizes="100px" style={{ objectFit: "contain" }} />
            </div>
            <p style={{ marginTop: 14, maxWidth: 300 }}>
              Original paintings by Grace Vieira, {site.location}.
            </p>
          </div>
          <div>
            <h4>Art</h4>
            <ul>
              <li><Link href="/shop">Available work</Link></li>
              <li><Link href="/past-work">Past work</Link></li>
              <li><Link href="/events">Events</Link></li>
            </ul>
          </div>
          <div>
            <h4>Info</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/shipping">Shipping and returns</Link></li>
              <li><a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="fine">© {new Date().getFullYear()} Art by Grace Vieira. All artwork and images belong to the artist.</div>
      </div>
    </footer>
  );
}
