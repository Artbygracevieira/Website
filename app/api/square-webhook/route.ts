import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// Square calls this when something changes (a sale, an item moved to "Sold out",
// a price edit), and the site refreshes right away instead of waiting up to a minute.
//
// Set up in the Square Developer Console: app "New Website" > Webhooks > Subscriptions,
// production, URL https://artbygracevieira.com/api/square-webhook, events
// order.created, order.updated, payment.updated, catalog.version.updated.
//
// All this route does is clear the site's cache, so the next visit asks Square
// again. It never changes anything in Square.
// Optional extra check: copy the subscription's Signature key into Vercel as
// SQUARE_WEBHOOK_SIGNATURE_KEY. Then only calls signed by Square are accepted.

const WEBHOOK_URL = process.env.SQUARE_WEBHOOK_URL || "https://artbygracevieira.com/api/square-webhook";
const MIN_GAP_MS = 10_000; // a burst of events causes one refresh, not dozens
let lastRefresh = 0;

function validSignature(body: string, signature: string | null, key: string): boolean {
  if (!signature) return false;
  const expected = Buffer.from(createHmac("sha256", key).update(WEBHOOK_URL + body).digest("base64"));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export async function POST(req: Request) {
  const body = await req.text();
  const key = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  if (key && !validSignature(body, req.headers.get("x-square-hmacsha256-signature"), key)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const now = Date.now();
  if (now - lastRefresh > MIN_GAP_MS) {
    lastRefresh = now;
    revalidatePath("/", "layout");
  }
  return NextResponse.json({ ok: true });
}
