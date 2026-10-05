import Link from "next/link";
import { site } from "@/lib/site";
import Flower from "./Flower";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="cols">
          <div>
            <p style={{ maxWidth: 340, fontSize: 17 }}>
              Original paintings and hand-painted cards by Grace Vieira, made in {site.location}.
            </p>
            <p style={{ marginTop: 16 }}>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="link">{site.instagramHandle}</a>
            </p>
          </div>
          <div>
            <h4>Art</h4>
            <ul>
              <li><Link href="/shop">Shop</Link></li>
              <li><Link href="/past-work">Past work</Link></li>
              <li><Link href="/events">Events</Link></li>
            </ul>
          </div>
          <div>
            <h4>Info</h4>
            <ul>
              <li><Link href="/about">About Grace</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/shipping">Shipping and returns</Link></li>
              <li><Link href="/privacy">Privacy policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="big" aria-hidden="true">
          Grace <em>Vieira</em>{" "}
          <Flower size={90} color="var(--pink)" center="var(--mustard)" style={{ display: "inline-block", verticalAlign: "middle" }} className="spin-slow" />
        </div>
        <div className="fine">© {new Date().getFullYear()} Art by Grace Vieira. All artwork and images belong to the artist.</div>
      </div>
    </footer>
  );
}
