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
