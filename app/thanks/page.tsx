import type { Metadata } from "next";
import Link from "next/link";
import ClearCart from "./ClearCart";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

export default function Thanks() {
  return (
    <div className="wrap section" style={{ textAlign: "center", maxWidth: 680 }}>
      <ClearCart />
      <div className="eyebrow">Order received</div>
      <h1>Thank you</h1>
      <p className="lead" style={{ margin: "16px auto 30px" }}>
        Your receipt is on its way to your email. Grace will be in touch when your piece ships.
      </p>
      <Link href="/shop" className="btn ghost">Back to the shop</Link>
    </div>
  );
}
