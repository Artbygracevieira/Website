// Square connection: not wired up yet.
//
// Plan (see README, "Connecting Square"):
//   1. Every painting lives in the Square Catalog as an item with one variation.
//      Inventory count = 1 while it's available, 0 once it sells (online or at a market).
//   2. getArtworks() below replaces the hand-kept list in lib/artworks.ts by reading
//      the Catalog + Inventory APIs and mapping each item to the Artwork type.
//   3. /api/checkout calls createCheckoutLink() to get a Square-hosted payment page.
//   4. A Square webhook (inventory.count.updated) calls /api/revalidate so a piece that
//      sells at a market disappears from the shop within moments.
//
// Environment variables to add in Vercel when we connect:
//   SQUARE_ACCESS_TOKEN   (from the Square Developer dashboard)
//   SQUARE_LOCATION_ID
//   SQUARE_ENVIRONMENT    "sandbox" while testing, "production" at launch

import { artworks, type Artwork } from "./artworks";

export const squareConnected = () => Boolean(process.env.SQUARE_ACCESS_TOKEN);

export async function getArtworks(): Promise<Artwork[]> {
  // TODO: read from Square Catalog + Inventory once connected.
  return artworks;
}

export async function createCheckoutLink(_slugs: string[]): Promise<string | null> {
  // TODO: POST /v2/online-checkout/payment-links with an order built from the slugs.
  return null;
}
