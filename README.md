# Art by Grace Vieira

The website for [artbygracevieira.com](https://artbygracevieira.com): original paintings by Grace Vieira, Brooklyn, NY.

Built with Next.js and hosted on Vercel; every push to `main` goes live. Prices, photos, availability and checkout come from Grace's Square account.

## Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
cp .env.example .env.local   # then paste the Square access token into .env.local
npm install
npm run dev
```

Then open http://localhost:3000. Without a token the site still runs, using the backup prices and photos in `lib/artworks.ts`, and checkout stays off.

## Where things live

| What | Where |
| --- | --- |
| Which pieces are on the site, their website titles and stories, and their Square codes | `lib/artworks.ts` |
| Square connection (prices, photos, sold or not, checkout) | `lib/square.ts` |
| Painting photos | `public/art/<slug>.jpg` |
| Site name, Instagram, email, events | `lib/site.ts` |
| Event and booth photos | `public/photos/` |
| Pages | `app/` (one folder per page) |
| Shared pieces (header, footer, cart, email signup) | `components/` |
| Colors and fonts | `app/globals.css` (top of the file) and `app/layout.tsx` |
| The colored "wall" each piece hangs on | `wall` on each entry in `lib/artworks.ts` |
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

**A piece sold.** Nothing to do. Ring it up in Square as usual (C236, R4 and so on). Within about 5 minutes it leaves the shop and moves to Past Work. Marking an item "Sold out" in Square, or putting it in the "Sold out" category, does the same.

**Change a price or photo.** Change it in Square. The site picks it up within about 5 minutes.

**Put a new piece on the site.** In `lib/artworks.ts`, copy an entry and fill in the website title, slug, story, size, and its Square `code`, `itemId` and `variationId`. Square keeps its short code; visitors only see the website title. Save a backup photo as `public/art/<slug>.jpg`.

**A new event.** Add it to the top of `events` in `lib/site.ts` with a `date` like `"2026-11-14"`. Set `past: true` after it happens.

## Writing on the site

The canvas descriptions and the About page are Grace's own words from her original site. The card titles and descriptions are new and should get Grace's OK. Either way:

- Write the way Grace talks about her work. Plain, warm, specific.
- Describe what's in the painting (colors, flowers, the figure) and what it means to her.
- Skip filler like "elevate your space," "stunning statement piece," or "curated collection."
- No em dashes. Use a comma, period, colon, or parentheses.
- Everything Grace sells is an original. There are no prints and no commissions, so don't mention them.

## Still to do

- [ ] Place one real test order through checkout, then refund it in Square.
- [ ] Add a shipping fee in `createCheckoutLink()` (`lib/square.ts`) once the shipping policy is set.
- [ ] Upgrade Vercel to Pro, then point artbygracevieira.com at the Vercel project.
- [ ] Hook the email signup (`components/JoinList.tsx`) to the email tool Grace picks.
- [ ] Hook the contact form (`app/api/contact/route.ts`) to Grace's inbox, and add her email in `lib/site.ts`.
- [ ] Fill in the shipping and returns page with Grace's real policy.
- [ ] Re-photograph available paintings, cropped to the canvas.
- [ ] Add upcoming events.

## How Square is connected

- Every piece on the site points at an item in Square by its code (C236, S5, R4...). Square keeps those codes for the booth; the website shows its own titles.
- **Price and photo** come from Square.
- **Sold or not:** Square isn't tracking stock counts, so the site treats a piece as sold if it shows up in any paid Square order (booth or website), is marked "Sold out", is in the "Sold out" category, or was deleted. Square is checked every 5 minutes, and again right before checkout so nothing can be bought twice.
- **Checkout** creates a Square-hosted payment page. The order lands in Square with the code and the website title on each line.
- In Vercel, add these environment variables: `SQUARE_ACCESS_TOKEN` (secret), `SQUARE_LOCATION_ID` = `L0FZND5FRN6MW`, `SQUARE_ENVIRONMENT` = `production`. Never commit the token.
