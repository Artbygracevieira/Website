// Reads live price, photo and availability from Grace's Square account, and
// creates Square-hosted checkout links.
//
// How "available" is decided (Square doesn't track stock counts for these items):
//   A piece is SOLD if any of these is true in Square:
//     - it appears in a paid order (a market sale on the POS app, or a website sale)
//     - it's marked "Sold out" at the location
//     - it's in the "Sold out" category
//     - it was deleted from the catalog
//   Pieces marked available: false in lib/artworks.ts (sold on the old Squarespace
//   site) always stay sold.
//
// Results are cached for 5 minutes, so a market sale leaves the website within
// about 5 minutes. A Square webhook can make that instant later.
//
// Environment variables (set in Vercel, and in .env.local for local work):
//   SQUARE_ACCESS_TOKEN   secret, never commit it
//   SQUARE_LOCATION_ID    L0FZND5FRN6MW
//   SQUARE_ENVIRONMENT    "production" or "sandbox"

import "server-only";
import { artworks as local, type Artwork } from "./artworks";

const SQUARE_VERSION = "2025-10-16";
const SOLD_OUT_CATEGORY = "Sold out";
const CACHE_SECONDS = 300;

const base = () =>
  process.env.SQUARE_ENVIRONMENT === "sandbox"
    ? "https://connect.squareupsandbox.com"
    : "https://connect.squareup.com";

export const squareConnected = () =>
  Boolean(process.env.SQUARE_ACCESS_TOKEN && process.env.SQUARE_LOCATION_ID);

async function square<T>(path: string, body?: unknown, cache = true): Promise<T> {
  const res = await fetch(base() + path, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
      "Square-Version": SQUARE_VERSION,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    ...(cache ? { next: { revalidate: CACHE_SECONDS, tags: ["square"] } } : { cache: "no-store" as const }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Square ${path} ${res.status}: ${JSON.stringify(data.errors ?? data)}`);
  return data as T;
}

type CatalogObject = {
  id: string;
  type: string;
  is_deleted?: boolean;
  item_data?: {
    name: string;
    image_ids?: string[];
    categories?: { id: string }[];
    variations?: {
      id: string;
      item_variation_data: {
        price_money?: { amount: number };
        location_overrides?: { location_id: string; sold_out?: boolean }[];
      };
    }[];
  };
  image_data?: { url?: string };
  category_data?: { name?: string };
};

type Order = {
  state: string;
  tenders?: unknown[];
  line_items?: { catalog_object_id?: string }[];
};

/** Variation IDs that show up in any paid order at Grace's location. */
async function soldVariationIds(fresh = false): Promise<Set<string>> {
  const sold = new Set<string>();
  let cursor: string | undefined;
  do {
    const data = await square<{ orders?: Order[]; cursor?: string }>(
      "/v2/orders/search",
      { location_ids: [process.env.SQUARE_LOCATION_ID], limit: 500, cursor },
      !fresh
    );
    for (const o of data.orders ?? []) {
      const paid = o.state === "COMPLETED" || (o.state === "OPEN" && (o.tenders?.length ?? 0) > 0);
      if (!paid) continue;
      for (const li of o.line_items ?? []) if (li.catalog_object_id) sold.add(li.catalog_object_id);
    }
    cursor = data.cursor;
  } while (cursor);
  return sold;
}

async function load(fresh = false): Promise<Artwork[]> {
  const linked = local.filter((a) => a.square);
  const { objects = [], related_objects = [] } = await square<{
    objects?: CatalogObject[];
    related_objects?: CatalogObject[];
  }>(
    "/v2/catalog/batch-retrieve",
    { object_ids: linked.map((a) => a.square!.itemId), include_related_objects: true, include_deleted_objects: true },
    !fresh
  );
  const byId = new Map([...objects, ...related_objects].map((o) => [o.id, o]));
  const soldOutCategoryIds = new Set(
    related_objects.filter((o) => o.type === "CATEGORY" && o.category_data?.name === SOLD_OUT_CATEGORY).map((o) => o.id)
  );
  const sold = await soldVariationIds(fresh);
  const location = process.env.SQUARE_LOCATION_ID;

  return local.map((a) => {
    if (!a.square) return a;
    const item = byId.get(a.square.itemId);
    if (!item?.item_data) return { ...a, available: false };
    const variation = item.item_data.variations?.find((v) => v.id === a.square!.variationId);
    const vd = variation?.item_variation_data;
    const soldOut =
      item.is_deleted ||
      !variation ||
      sold.has(a.square.variationId) ||
      Boolean(vd?.location_overrides?.some((l) => l.location_id === location && l.sold_out)) ||
      Boolean(item.item_data.categories?.some((c) => soldOutCategoryIds.has(c.id)));
    const imageId = item.item_data.image_ids?.[0];
    const squareImage = imageId ? byId.get(imageId)?.image_data?.url : undefined;
    return {
      ...a,
      price: vd?.price_money ? vd.price_money.amount / 100 : a.price,
      available: a.available && !soldOut,
      image: squareImage ?? a.image,
    };
  });
}

/** All website pieces with live Square data. Falls back to lib/artworks.ts if Square is unreachable. */
export async function getArtworks(): Promise<Artwork[]> {
  if (!squareConnected()) return local;
  try {
    return await load();
  } catch (err) {
    console.error("Square unavailable, using local data:", err);
    return local;
  }
}

export async function getAvailable() {
  return (await getArtworks()).filter((a) => a.available);
}
export async function getCollected() {
  return (await getArtworks()).filter((a) => !a.available);
}
export async function getBySlug(slug: string) {
  return (await getArtworks()).find((a) => a.slug === slug);
}

/** Checks Square with no cache, so a piece sold minutes ago can't be bought twice. */
export async function stillAvailable(slugs: string[]): Promise<Artwork[]> {
  const fresh = await load(true);
  return fresh.filter((a) => slugs.includes(a.slug) && a.available && a.square);
}

/** Creates a Square-hosted checkout page for these pieces and returns its URL. */
export async function createCheckoutLink(pieces: Artwork[], siteUrl: string): Promise<string> {
  const data = await square<{ payment_link: { url: string } }>(
    "/v2/online-checkout/payment-links",
    {
      idempotency_key: crypto.randomUUID(),
      order: {
        location_id: process.env.SQUARE_LOCATION_ID,
        line_items: pieces.map((p) => ({
          catalog_object_id: p.square!.variationId,
          quantity: "1",
          note: p.title, // website title, so Grace sees both the code and the name
        })),
      },
      checkout_options: {
        ask_for_shipping_address: true,
        redirect_url: `${siteUrl}/thanks`,
        // TODO(Grace): add a shipping fee once the shipping policy is set, e.g.
        // shipping_fee: { name: "Shipping", charge: { amount: 800, currency: "USD" } },
      },
    },
    false
  );
  return data.payment_link.url;
}
