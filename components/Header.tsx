"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/site";
import { CartButton } from "./Cart";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const isOn = (href: string) => path === href || path.startsWith(href + "/");

  return (
    <>
      <div className="announce">
        New work goes to the email list first. <a href="#join">Join the list</a>
      </div>
      <header className="header">
        <div className="wrap">
          <Link href="/" className="logo" aria-label="Art by Grace Vieira, home">
            <Image src="/logo.png" alt="Grace, Art by Grace Vieira" fill sizes="108px" style={{ objectFit: "contain" }} priority />
          </Link>
          <nav className="nav" aria-label="Main">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={isOn(n.href) ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <button className="menu-btn" aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? "Close" : "Menu"}
            </button>
            <CartButton />
          </div>
        </div>
        <nav className={`mobile-nav${open ? " open" : ""}`} aria-label="Mobile">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
