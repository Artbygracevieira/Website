"use client";

import { useState } from "react";
import Flower, { Leaf } from "./Flower";

// TODO: connect to the email tool Grace picks (Square Marketing, Kit or Mailchimp).
// Right now the form only shows a thank-you message and does not save the address.

export default function JoinList() {
  const [done, setDone] = useState(false);
  return (
    <section className="join wall-pink" id="join">
      <Flower className="deco spin-slow" size={180} color="var(--rose)" center="var(--mustard)" style={{ left: "-40px", top: "30px" }} />
      <Leaf className="deco" size={110} rotate={-35} style={{ left: "110px", top: "170px" }} />
      <Flower className="deco bob" size={120} color="var(--paper)" center="var(--orange)" petals={6} style={{ right: "6%", bottom: "40px" }} />
      <Leaf className="deco" size={90} rotate={40} style={{ right: "4%", top: "40px" }} />
      <div className="wrap" style={{ position: "relative" }}>
        <div className="eyebrow">The list</div>
        <h2>See new work <em>before</em> anyone else</h2>
        <p>Sign up to get first access to each release and a deeper look at my process.</p>
        {done ? (
          <p className="done" role="status">Thank you. You&apos;re on the list.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
            <label htmlFor="join-email" className="sr-only">Email address</label>
            <input id="join-email" type="email" required placeholder="Your email" autoComplete="email" />
            <button className="btn" type="submit">Sign up</button>
          </form>
        )}
      </div>
    </section>
  );
}
