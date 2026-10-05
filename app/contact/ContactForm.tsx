"use client";

import { useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const body = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) setState("sent");
      else { setState("error"); setMsg(data.message); }
    } catch {
      setState("error");
      setMsg("Something went wrong. Please try again.");
    }
  }

  if (state === "sent") return <p className="lead" role="status">Thank you. Your message is on its way.</p>;

  return (
    <form onSubmit={submit}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="field"><label htmlFor="first">First name</label><input id="first" name="first" required autoComplete="given-name" /></div>
        <div className="field"><label htmlFor="last">Last name</label><input id="last" name="last" required autoComplete="family-name" /></div>
      </div>
      <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" /></div>
      <div className="field"><label htmlFor="subject">Subject</label><input id="subject" name="subject" required /></div>
      <div className="field"><label htmlFor="message">Message</label><textarea id="message" name="message" rows={6} required /></div>
      <button className="btn" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending..." : "Send message"}
      </button>
      {state === "error" && <p role="alert" style={{ marginTop: 14, color: "var(--coral-dark)" }}>{msg}</p>}
    </form>
  );
}
