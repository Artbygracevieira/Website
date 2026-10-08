import { NextResponse } from "next/server";
import { signupSheetUrl } from "@/lib/site";

// Saves an email signup to Grace's Google Sheet.
// The sheet has a small Apps Script attached (integrations/google-sheet-signup.gs)
// that adds a row for each signup. Its web app URL is in lib/site.ts
// (the SIGNUP_SHEET_URL environment variable overrides it).

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  const { firstName, lastName, email, website } = (await req.json().catch(() => ({}))) as {
    firstName?: string;
    lastName?: string;
    email?: string;
    website?: string;
  };
  // "website" is a hidden field people never fill in. Bots do, so quietly ignore them.
  if (website) return NextResponse.json({ ok: true });

  const name = (v?: string) => String(v ?? "").trim().replace(/\s+/g, " ").slice(0, 60);
  const first = name(firstName);
  const last = name(lastName);
  if (!first || !last) {
    return NextResponse.json({ message: "Please add your first and last name." }, { status: 400 });
  }

  const clean = (email ?? "").trim().toLowerCase();
  if (!EMAIL.test(clean) || clean.length > 254) {
    return NextResponse.json({ message: "Please check your email address." }, { status: 400 });
  }

  const url = process.env.SIGNUP_SHEET_URL || signupSheetUrl;
  if (!url) {
    console.error("SIGNUP_SHEET_URL is not set, signup not saved:", clean);
    return NextResponse.json({ message: "Sign up isn't working right now. Please try again later." }, { status: 503 });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName: first, lastName: last, email: clean, source: req.headers.get("referer") ?? "", secret: process.env.SIGNUP_SHEET_SECRET ?? "" }),
      redirect: "follow",
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.ok === false) throw new Error(`Sheet said ${res.status}: ${JSON.stringify(data)}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Signup failed:", err);
    return NextResponse.json({ message: "Something went wrong. Please try again." }, { status: 502 });
  }
}
