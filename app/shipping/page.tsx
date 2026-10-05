import type { Metadata } from "next";

import PageHead from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Shipping and returns",
};

// TODO(Grace): replace every [bracketed] line with your real policy before launch.

export default function Shipping() {
  return (
    <>
    <PageHead wall="paper" eyebrow="Info" title={<>Shipping <em>and returns</em></>} />
    <div className="wrap section prose" style={{ maxWidth: 760 }}>

      <h2 style={{ fontSize: 30, margin: "8px 0 12px" }}>How paintings ship</h2>
      <p>[How you pack originals, which carrier you use, and how long it takes to ship after an order.]</p>

      <h2 style={{ fontSize: 30, margin: "28px 0 12px" }}>Where you ship</h2>
      <p>[US only, or international too. Local pickup in Brooklyn, if you offer it.]</p>

      <h2 style={{ fontSize: 30, margin: "28px 0 12px" }}>Returns</h2>
      <p>[Whether originals can be returned, the time window, and who pays return shipping.]</p>

      <h2 style={{ fontSize: 30, margin: "28px 0 12px" }}>If something arrives damaged</h2>
      <p>[What the buyer should do and how quickly to contact you.]</p>
    </div>
    </>
  );
}
