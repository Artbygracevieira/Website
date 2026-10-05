import { NextResponse } from "next/server";
import { createCheckoutLink, squareConnected, stillAvailable } from "@/lib/square";

export async function POST(req: Request) {
  const { items } = (await req.json().catch(() => ({}))) as { items?: string[] };
  const slugs = Array.isArray(items) ? items.filter((s) => typeof s === "string") : [];

  if (slugs.length === 0) {
    return NextResponse.json({ message: "Your cart is empty." }, { status: 400 });
  }
  if (!squareConnected()) {
    return NextResponse.json(
      { message: "Online checkout opens soon. In the meantime, send Grace a message to buy this piece." },
      { status: 503 }
    );
  }

  try {
    const pieces = await stillAvailable(slugs);
    const gone = slugs.filter((s) => !pieces.some((p) => p.slug === s));
    if (gone.length) {
      return NextResponse.json(
        { message: "Sorry, something in your cart was just collected. Please remove it and try again.", gone },
        { status: 409 }
      );
    }
    const url = await createCheckoutLink(pieces, new URL(req.url).origin);
    return NextResponse.json({ url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Checkout isn't available right now. Please try again." }, { status: 502 });
  }
}
