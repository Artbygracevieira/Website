// Site-wide settings. Edit here, and every page picks it up.

export const site = {
  name: "Art by Grace Vieira",
  tagline: "Crafted by hand, created for you.",
  url: "https://artbygracevieira.com",
  location: "Brooklyn, NY",
  instagram: "https://instagram.com/artbygracevieira",
  instagramHandle: "@artbygracevieira",
  // TODO(Grace): add the email address you want buyers to write to.
  email: "",
};

export const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/past-work", label: "Past Work" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export type Event = {
  name: string;
  place: string;
  date?: string; // ISO date, e.g. "2026-11-14". Leave off if not set yet.
  note?: string;
  link?: string;
  past?: boolean;
};

// Markets and shows. Put upcoming ones first.
export const events: Event[] = [
  {
    name: "Black Girl Art Show",
    place: "Brooklyn, NY",
    past: true,
    note: "Grace's booth, with the Bloom series on the wall.",
  },
];

// Shipping charged on website orders, by type of piece. An order pays the
// highest one in the cart, once (a canvas plus two cards ships for the canvas rate).
// Booth sales don't pay shipping. Amounts in US dollars.
export const shipping = {
  card: 5,
  paper: 12,
  canvas: 25,
} as const;

// The running deal. The discount itself lives in Square (Items > Discounts,
// set to apply automatically), so it works at the booth and on the website.
// This text is only what the site shows. Set to "" to hide it.
export const deal = "Buy 2 cards, get a 3rd free. Applied at checkout.";

// Most cards shown on the website at one time. The newest cards in
// lib/artworks.ts (the ones lowest in the file) show first. When one sells,
// the next card waiting in line takes its spot automatically.
export const maxCardsOnSite = 20;

// Where email signups are saved: the "ABGV email signups" Apps Script web app,
// which adds a row to the "Email Sign ups" Google Sheet. Not a secret.
// The SIGNUP_SHEET_URL environment variable overrides it if set.
export const signupSheetUrl =
  "https://script.google.com/macros/s/AKfycbyJdYM2hKHEK1_xghno-rFQg0UQ6lcdAlCmyLAhiAAt5eCL_S5XhbDRcoEm4SK0wieA/exec";

// Sales tax is set up in Square (Items > Taxes) and added at checkout.
