"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/site";
import { CartButton } from "./Cart";

const notes = [
  "Every piece is one of one",
  "Painted by hand in Brooklyn",
  "New work goes to the email list first",
  "Find Grace at markets and art shows",
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const isOn = (href: string) => path === href || path.startsWith(href + "/");

  return (
    <>
      <div className="marquee" aria-label="Announcements">
        <div className="track">
          {[...notes, ...notes, ...notes, ...notes].map((n, i) => <span key={i} aria-hidden={i >= notes.length}>{n}</span>)}
        </div>
      </div>
      <header className="header">
        <div className="wrap">
          <Link href="/" className="wordmark" aria-label="Art by Grace Vieira, home">
            <span className="g"><em>Grace</em></span>
            <span className="rest">Art by Grace Vieira</span>
          </Link>
          <nav className="nav" aria-label="Main">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={isOn(n.href) ? "page" : undefined}>{n.label}</Link>
            ))}
          </nav>
          <div className="header-actions">
            <button className="menu-btn" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
            <CartButton />
          </div>
        </div>
        <nav className={`mobile-nav${open ? " open" : ""}`} aria-label="Mobile">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>
          ))}
        </nav>
      </header>
    </>
  );
}
