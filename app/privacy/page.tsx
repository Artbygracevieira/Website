import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What information Art by Grace Vieira collects, why, and how it is used.",
};

const updated = "October 5, 2026";

export default function Privacy() {
  return (
    <>
      <PageHead wall="paper" eyebrow="Info" title={<>Privacy <em>policy</em></>} />
      <div className="wrap section">
        <div className="policy">
          <p className="updated">Last updated {updated}</p>

          <section>
            <p>
              This page explains what information Art by Grace Vieira collects when you visit
              artbygracevieira.com or buy something here, and what we do with it. The short
              version: we only collect what we need to fill your order and answer your messages,
              and we never sell it.
            </p>
          </section>

          <section>
            <h2>What we collect</h2>
            <ul>
              <li>
                <strong>When you buy something:</strong> your name, email, phone number and shipping
                address, so we can ship your order and send you updates about it.
              </li>
              <li>
                <strong>When you contact us:</strong> your name, email and whatever you write in your
                message.
              </li>
              <li>
                <strong>When you join the email list:</strong> your email address.
              </li>
            </ul>
          </section>

          <section>
            <h2>Payments</h2>
            <p>
              Checkout is handled by Square. Your card details go straight to Square and never
              reach us. Square&apos;s use of your information is covered by the{" "}
              <a href="https://squareup.com/us/en/legal/general/privacy" target="_blank" rel="noreferrer" className="link">Square privacy notice</a>.
            </p>
          </section>

          <section>
            <h2>How we use it</h2>
            <ul>
              <li>To ship your order and contact you about it.</li>
              <li>To reply when you write to us.</li>
              <li>To send email updates about new work and events, if you signed up. Every email has an unsubscribe link.</li>
            </ul>
            <p>We don&apos;t sell, rent or trade your information to anyone.</p>
          </section>

          <section>
            <h2>Who else sees it</h2>
            <p>
              Only the services that help run the shop: Square for payments and orders, the
              shipping carrier that delivers your package, and the company that hosts this website.
              They only get what they need to do that job.
            </p>
          </section>

          <section>
            <h2>Cookies and your browser</h2>
            <p>
              The site remembers what&apos;s in your cart using your browser&apos;s local storage, so it&apos;s
              still there if you leave and come back. Clearing your browser data removes it. We
              don&apos;t use advertising trackers.
            </p>
          </section>

          <section>
            <h2>Your choices</h2>
            <p>
              You can ask to see, correct or delete the information we have about you at any
              time. Just <Link href="/contact" className="link">send us a note</Link>.
            </p>
          </section>

          <section>
            <h2>Changes</h2>
            <p>
              If this policy changes, we&apos;ll update it here and change the date at the top.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
