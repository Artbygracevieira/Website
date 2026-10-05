"use client";

import { useState } from "react";

// TODO: connect to the email tool Grace picks (Square Marketing, Kit or Mailchimp).
// Right now the form only shows a thank-you message and does not save the address.

export default function JoinList() {
  const [done, setDone] = useState(false);
  return (
    <section className="join" id="join">
      <div className="wrap">
        <h2>See new work first</h2>
        <p>Sign up to get first access to each release and a deeper look at my process.</p>
        {done ? (
          <p className="done" role="status">Thank you. You're on the list.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
            <label htmlFor="join-email" className="sr-only" style={{ position: "absolute", left: -9999 }}>Email address</label>
            <input id="join-email" type="email" required placeholder="Email address" autoComplete="email" />
            <button className="btn dark" type="submit">Sign up</button>
          </form>
        )}
      </div>
    </section>
  );
}
