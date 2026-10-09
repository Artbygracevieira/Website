import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import { shipping } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping and returns",
  description:
    "How Art by Grace Vieira ships original paintings and cards within the US, shipping costs, and the returns policy.",
  alternates: { canonical: "/shipping" },
};

export default function Shipping() {
  return (
    <>
      <PageHead wall="paper" eyebrow="Info" title={<>Shipping <em>and returns</em></>} />
      <div className="wrap section">
        <div className="policy">
          <section>
            <h2>Where we ship</h2>
            <p>We ship within the United States only.</p>
          </section>

          <section>
            <h2>What shipping costs</h2>
            <p>
              Cards ship for ${shipping.card}, paintings on paper for ${shipping.paper}, and canvases for ${shipping.canvas}.
              You pay one shipping charge per order, at the rate of the largest piece in your cart.
              NY sales tax is added at checkout.
            </p>
          </section>

          <section>
            <h2>When it ships</h2>
            <p>
              Paintings ship within one week of purchase. Each one is packed by hand,
              and you&apos;ll get an email from Square when your order is placed.
            </p>
          </section>

          <section>
            <h2>Returns</h2>
            <p>
              All sales are final. Every piece is one of a kind, so we don&apos;t accept returns
              or exchanges. If you have a question about a piece before you buy it,{" "}
              <Link href="/contact" className="link">get in touch</Link> and Grace will answer.
            </p>
          </section>

          <section>
            <h2>If something arrives damaged</h2>
            <p>
              Please <Link href="/contact" className="link">contact us</Link> as soon as it arrives,
              with a photo of the piece and the packaging.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
