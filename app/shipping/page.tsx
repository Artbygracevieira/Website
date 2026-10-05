import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Shipping and returns",
  description: "Shipping within the US. Paintings ship within one week. All sales are final.",
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
