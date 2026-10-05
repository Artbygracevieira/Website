import { NextResponse } from "next/server";
import { bySlug } from "@/lib/artworks";
import { createCheckoutLink, squareConnected } from "@/lib/square";

export async function POST(req: Request) {
  const { items } = (await req.json().catch(() => ({}))) as { items?: string[] };
  const slugs = (items ?? []).filter((s) => bySlug(s)?.available);

  if (slugs.length === 0) {
    return NextResponse.json({ message: "Your cart is empty." }, { status: 400 });
  }

  if (!squareConnected()) {
    return NextResponse.json(
      { message: "Online checkout opens soon. In the meantime, send Grace a message to buy this piece." },
      { status: 503 }
    );
  }

  const url = await createCheckoutLink(slugs);
  if (!url) return NextResponse.json({ message: "Checkout isn't available right now." }, { status: 502 });
  return NextResponse.json({ url });
}
