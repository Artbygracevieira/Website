import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// Square calls this when something changes (a sale, an item moved to "Sold out",
// a price edit), and the site refreshes right away instead of waiting up to a minute.
//
// Setup, once: in the Square Developer Dashboard, open the app whose access token
// the site uses > Webhooks > Subscriptions > Add subscription.
//   URL:    https://artbygracevieira.com/api/square-webhook
//   Events: order.created, order.updated, payment.updated, catalog.version.updated
// Then copy the subscription's Signature key into Vercel as SQUARE_WEBHOOK_SIGNATURE_KEY
// (and SQUARE_WEBHOOK_URL if the URL above ever changes).

const WEBHOOK_URL = process.env.SQUARE_WEBHOOK_URL || "https://artbygracevieira.com/api/square-webhook";

function validSignature(body: string, signature: string | null): boolean {
  const key = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  if (!key || !signature) return false;
  const expected = createHmac("sha256", key).update(WEBHOOK_URL + body).digest("base64");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  const body = await req.text();
  if (!validSignature(body, req.headers.get("x-square-hmacsha256-signature"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  // Throw away the cached pages and Square data so the next visit shows what Square says now.
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
