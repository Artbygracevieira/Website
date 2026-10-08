"use client";

import { useState, type FormEvent } from "react";
import Flower, { Leaf } from "./Flower";

// Signups are saved to Grace's Google Sheet through /api/signup.

export default function JoinList() {
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setState("busy");
    setMsg("");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.get("firstName"),
          lastName: form.get("lastName"),
          email: form.get("email"),
          website: form.get("website"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) return setState("done");
      setMsg(data.message || "Something went wrong. Please try again.");
    } catch {
      setMsg("Something went wrong. Please try again.");
    }
    setState("idle");
  }

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
        {state === "done" ? (
          <p className="done" role="status">Thank you. You&apos;re on the list.</p>
        ) : (
          <form onSubmit={submit}>
            <div className="names">
              <label htmlFor="join-first" className="sr-only">First name</label>
              <input id="join-first" name="firstName" type="text" required placeholder="First name" autoComplete="given-name" maxLength={60} />
              <label htmlFor="join-last" className="sr-only">Last name</label>
              <input id="join-last" name="lastName" type="text" required placeholder="Last name" autoComplete="family-name" maxLength={60} />
            </div>
            <div className="pill">
              <label htmlFor="join-email" className="sr-only">Email address</label>
              <input id="join-email" name="email" type="email" required placeholder="Your email" autoComplete="email" />
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999 }} />
              <button className="btn" type="submit" disabled={state === "busy"}>
                {state === "busy" ? "Saving..." : "Sign up"}
              </button>
            </div>
          </form>
        )}
        {msg && <p role="alert" style={{ marginTop: 10 }}>{msg}</p>}
      </div>
    </section>
  );
}
