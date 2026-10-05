import type { Metadata } from "next";
import Link from "next/link";
import ClearCart from "./ClearCart";
import Flower from "@/components/Flower";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

export default function Thanks() {
  return (
    <div className="wrap section" style={{ textAlign: "center", maxWidth: 680 }}>
      <ClearCart />
      <Flower size={110} color="var(--pink)" center="var(--mustard)" className="spin-slow" style={{ margin: "0 auto 24px", display: "block" }} />
      <div className="eyebrow">Order received</div>
      <h1>Thank <em>you</em></h1>
      <p className="lead" style={{ margin: "16px auto 30px" }}>
        Your receipt is on its way to your email. Grace will be in touch when your piece ships.
      </p>
      <Link href="/shop" className="btn ghost">Back to the shop</Link>
    </div>
  );
}
