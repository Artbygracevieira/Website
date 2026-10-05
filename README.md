# Art by Grace Vieira

The website for [artbygracevieira.com](https://artbygracevieira.com): original paintings by Grace Vieira, Brooklyn, NY.

Built with Next.js. Hosting (Vercel) and payments (Square) get connected in the next phase.

## Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where things live

| What | Where |
| --- | --- |
| Every painting (title, price, size, story, sold or not) | `lib/artworks.ts` |
| Painting photos | `public/art/<slug>.jpg` |
| Site name, Instagram, email, events | `lib/site.ts` |
| Event and booth photos | `public/photos/` |
| Pages | `app/` (one folder per page) |
| Shared pieces (header, footer, cart, email signup) | `components/` |
| Colors and fonts | `app/globals.css` (top of the file) |
| Old Squarespace links that redirect to new pages | `next.config.ts` |

### Pages

- `/` home
- `/shop` available originals only
- `/shop/<slug>` one page per painting
- `/past-work` paintings that have been collected
- `/events` markets and shows
- `/about` Grace's story
- `/contact` contact form
- `/shipping` shipping and returns (needs Grace's real policy)

## Common changes

**A painting sold.** In `lib/artworks.ts`, set `available: false`. It moves from the shop to Past Work. (Once Square is connected this happens on its own.)

**A new painting.** Copy an entry in `lib/artworks.ts`, give it a new `slug` (lowercase, dashes), and save the photo as `public/art/<slug>.jpg`. Square photos work best: straight on, cropped to the canvas, good daylight.

**A new event.** Add it to the top of `events` in `lib/site.ts` with a `date` like `"2026-11-14"`. Set `past: true` after it happens.

## Writing on the site

All painting descriptions and the About page are Grace's own words from her original site. Keep it that way:

- Write the way Grace talks about her work. Plain, warm, specific.
- Describe what's in the painting (colors, flowers, the figure) and what it means to her.
- Skip filler like "elevate your space," "stunning statement piece," or "curated collection."
- No em dashes. Use a comma, period, colon, or parentheses.
- Everything Grace sells is an original. There are no prints and no commissions, so don't mention them.

## Still to do

- [ ] Connect Square (catalog, inventory, hosted checkout). Notes are in `lib/square.ts`.
- [ ] Connect the repo to Vercel and point the domain at it.
- [ ] Hook the email signup (`components/JoinList.tsx`) to the email tool Grace picks.
- [ ] Hook the contact form (`app/api/contact/route.ts`) to Grace's inbox, and add her email in `lib/site.ts`.
- [ ] Fill in the shipping and returns page with Grace's real policy.
- [ ] Re-photograph available paintings, cropped to the canvas.
- [ ] Add upcoming events.

## Connecting Square (next phase)

1. Make a Square developer app at [developer.squareup.com](https://developer.squareup.com) using Grace's Square account.
2. Add each painting in Square as an item with one variation, stock count 1.
3. Add `SQUARE_ACCESS_TOKEN`, `SQUARE_LOCATION_ID` and `SQUARE_ENVIRONMENT` in Vercel (see `.env.example`).
4. Fill in `getArtworks()` and `createCheckoutLink()` in `lib/square.ts`.
5. Add a Square webhook for inventory changes so a painting sold at a market leaves the shop right away.

Once this is done, Grace only manages paintings in Square. The website and the market booth share one inventory.
