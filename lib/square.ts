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
// Square is checked at most once a minute, so a booth sale or a move to the
// "Sold out" category leaves the website within about a minute. If the Square
// webhook is set up (app/api/square-webhook), it's close to instant.
// If Square can't be reached, the site keeps showing the last good version
// instead of putting sold pieces back up.
//
// Environment variables (set in Vercel, and in .env.local for local work):
//   SQUARE_ACCESS_TOKEN   secret, never commit it
//   SQUARE_LOCATION_ID    L0FZND5FRN6MW
//   SQUARE_ENVIRONMENT    "production" or "sandbox"

import "server-only";
import { artworks as all, type Artwork } from "./artworks";
import { maxCardsOnSite, shipping } from "./site";

// Drafts (not yet linked to Square) stay off the site.
const local = all.filter((a) => !a.draft);

/**
 * Keeps at most `maxCardsOnSite` available cards on the site, newest first
 * (newest = lowest in lib/artworks.ts). Cards over the limit are left out
 * completely until a spot opens. Sold cards still show on Past Work.
 */
function limitCards(list: Artwork[]): Artwork[] {
  const order = new Map(all.map((a, i) => [a.slug, i]));
  const showing = new Set(
    list
      .filter((a) => a.format === "card" && a.available)
      .sort((a, b) => order.get(b.slug)! - order.get(a.slug)!)
      .slice(0, maxCardsOnSite)
      .map((a) => a.slug)
  );
  const kept = list.filter((a) => a.format !== "card" || !a.available || showing.has(a.slug));
  // Newest cards first everywhere they are listed.
  const cards = kept.filter((a) => a.format === "card").sort((a, b) => order.get(b.slug)! - order.get(a.slug)!);
  return [...kept.filter((a) => a.format !== "card"), ...cards];
}

const SQUARE_VERSION = "2025-10-16";
const SOLD_OUT_CATEGORY = "Sold out";
const CACHE_SECONDS = 60;

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
  // Look the "Sold out" category up by name directly, so it is found even when
  // Square leaves it out of related_objects.
  const { objects: categories = [] } = await square<{ objects?: CatalogObject[] }>(
    "/v2/catalog/search",
    { object_types: ["CATEGORY"], query: { exact_query: { attribute_name: "name", attribute_value: SOLD_OUT_CATEGORY } } },
    !fresh
  );
  const soldOutCategoryIds = new Set(
    [...related_objects, ...categories]
      .filter((o) => o.type === "CATEGORY" && o.category_data?.name?.trim().toLowerCase() === SOLD_OUT_CATEGORY.toLowerCase())
      .map((o) => o.id)
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
      image: a.localPhoto ? a.image : squareImage ?? a.image,
    };
  });
}

let lastGood: Artwork[] | undefined;

/**
 * All website pieces with live Square data.
 * If Square can't be reached, uses the last good result. With none, it throws,
 * and Vercel keeps serving the previous page, so sold pieces never reappear.
 */
export async function getArtworks(): Promise<Artwork[]> {
  if (!squareConnected()) return limitCards(local);
  try {
    lastGood = limitCards(await load());
    return lastGood;
  } catch (err) {
    console.error("Square unavailable:", err);
    if (lastGood) return lastGood;
    throw err;
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
  const fresh = limitCards(await load(true));
  return fresh.filter((a) => slugs.includes(a.slug) && a.available && a.square);
}

/** Shipping for an order: the highest rate among the pieces, charged once. */
export function shippingFor(pieces: Artwork[]): number {
  return pieces.reduce((n, p) => Math.max(n, shipping[p.format] ?? shipping.canvas), 0);
}

/**
 * Creates a Square-hosted checkout page for these pieces and returns its URL.
 * Square adds sales tax on its own, using the tax set up in the Square dashboard.
 * Discounts are off for website orders (set auto_apply_discounts to true to let
 * Square's automatic discounts apply online too).
 */
export async function createCheckoutLink(pieces: Artwork[], siteUrl: string): Promise<string> {
  const ship = shippingFor(pieces);
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
        pricing_options: { auto_apply_taxes: true, auto_apply_discounts: false },
      },
      checkout_options: {
        ask_for_shipping_address: true,
        redirect_url: `${siteUrl}/thanks`,
        ...(ship > 0 && {
          shipping_fee: { name: "Shipping", charge: { amount: ship * 100, currency: "USD" } },
        }),
      },
    },
    false
  );
  return data.payment_link.url;
}

export type ArchivePiece = { id: string; kind: string; image: string; format: "card" | "paper" | "canvas" };

/** What kind of piece a Square code is, going by Grace's naming (C = card, CF = framed card, numbers = on paper, S/R = canvas). */
function kindFromCode(code: string): { kind: string; format: ArchivePiece["format"] } {
  const c = code.trim().toUpperCase();
  if (/^CF/.test(c)) return { kind: "Framed hand-painted card", format: "card" };
  if (/^C\d/.test(c)) return { kind: "Hand-painted card", format: "card" };
  if (/^\d/.test(c)) return { kind: "Painting on paper", format: "paper" };
  if (/^[SR]\d/.test(c)) return { kind: "Painting on canvas", format: "canvas" };
  return { kind: "Original painting", format: "paper" };
}

/**
 * Pieces Grace has moved to the "Sold out" category in Square that were never
 * listed on the website. Shown on Past Work with their Square photo.
 * Newest first. Returns [] if Square can't be reached.
 */
export async function getSoldOutArchive(): Promise<ArchivePiece[]> {
  if (!squareConnected()) return [];
  try {
    const { objects: categories = [] } = await square<{ objects?: CatalogObject[] }>("/v2/catalog/search", {
      object_types: ["CATEGORY"],
      query: { exact_query: { attribute_name: "name", attribute_value: SOLD_OUT_CATEGORY } },
    });
    const categoryIds = categories.filter((c) => c.type === "CATEGORY").map((c) => c.id);
    if (!categoryIds.length) return [];

    type Item = CatalogObject & { updated_at?: string };
    const items: Item[] = [];
    let cursor: string | undefined;
    do {
      const data = await square<{ items?: Item[]; cursor?: string }>("/v2/catalog/search-catalog-items", {
        category_ids: categoryIds,
        limit: 100,
        cursor,
      });
      items.push(...(data.items ?? []));
      cursor = data.cursor;
    } while (cursor);

    const onSite = new Set(all.map((a) => a.square?.itemId).filter(Boolean));
    const keep = items.filter((i) => !i.is_deleted && !onSite.has(i.id) && i.item_data?.image_ids?.length);

    // Look up the photo URLs, 100 at a time.
    const imageIds = keep.map((i) => i.item_data!.image_ids![0]);
    const urls = new Map<string, string>();
    for (let n = 0; n < imageIds.length; n += 100) {
      const { objects = [] } = await square<{ objects?: CatalogObject[] }>("/v2/catalog/batch-retrieve", {
        object_ids: imageIds.slice(n, n + 100),
      });
      for (const o of objects) if (o.image_data?.url) urls.set(o.id, o.image_data.url);
    }

    return keep
      .sort((a, b) => (b.updated_at ?? "").localeCompare(a.updated_at ?? ""))
      .map((i) => ({ id: i.id, ...kindFromCode(i.item_data!.name), image: urls.get(i.item_data!.image_ids![0]) ?? "" }))
      .filter((p) => p.image);
  } catch (err) {
    console.error("Could not load sold-out archive from Square:", err);
    return [];
  }
}
