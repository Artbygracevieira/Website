// Every piece Grace has listed online, with her own descriptions.
//
// This file is the stand-in for Square. When Square is connected, the same
// shape gets filled from the Square Catalog + Inventory APIs (see lib/square.ts)
// and this list can be deleted.
//
// To add a piece by hand for now: copy one entry, give it a new slug,
// drop the photo in /public/art/<slug>.jpg, and set available: true.

export type Format = "canvas" | "card";

export type Artwork = {
  slug: string;
  title: string;
  price: number; // US dollars
  available: boolean; // false = already collected
  format: Format;
  size: string;
  medium: string;
  series?: string;
  story: string[]; // paragraphs, in Grace's words
  details?: string[];
  image: string;
  // Squarespace URL this piece used to live at, so old links keep working
  oldPath?: string;
};

export const artworks: Artwork[] = [
  {
    slug: "built-in-bloom",
    title: "Built in Bloom",
    price: 500,
    available: true,
    format: "canvas",
    size: '16" round',
    medium: "Acrylic on canvas",
    series: "Bloom",
    story: [
      "This portrait is fully layered in hand-painted florals, with every inch of the silhouette filled with color and detail. Outlined in yellow and set against a muted terracotta background, the figure feels grounded yet vibrant.",
      "Built in Bloom is about becoming who you are through everything you've grown through, and standing confidently in that truth.",
    ],
    image: "/art/built-in-bloom.jpg",
    oldPath: "/store/p/floral-crown",
  },
  {
    slug: "rooted-in-radiance",
    title: "Rooted in Radiance",
    price: 350,
    available: true,
    format: "canvas",
    size: "12 x 12 in",
    medium: "Acrylic on canvas",
    series: "Bloom",
    story: [
      "A striking portrait of quiet strength and blooming self-love, Rooted in Radiance features a faceless figure crowned and cloaked in brilliant florals. Her smooth, bald head glows against a soft pink background, letting every color bloom brighter. Gold accents in her jewelry add a regal touch, honoring her dignity and depth.",
      "This piece is a reminder that beauty doesn't need permission. It blossoms from within.",
    ],
    details: ["Ready to hang", "One-of-a-kind original"],
    image: "/art/rooted-in-radiance.jpg",
    oldPath: "/store/p/rooted-in-radiance",
  },
  {
    slug: "in-full-bloom",
    title: "In Full Bloom",
    price: 350,
    available: true,
    format: "canvas",
    size: "12 x 12 in",
    medium: "Acrylic on canvas",
    series: "Bloom",
    story: [
      "With a backdrop of playful pink and white stripes, In Full Bloom is a joyful tribute to individuality. Bursting with colorful blossoms and crowned with confidence, this faceless figure invites viewers to see themselves in her. The contrast between the bright floral palette and her bold red lips makes this piece both soft and striking.",
    ],
    details: ["Ready to hang", "One-of-a-kind original"],
    image: "/art/in-full-bloom.jpg",
    oldPath: "/store/p/in-full-bloom",
  },
  {
    slug: "crowned-in-confidence",
    title: "Crowned in Confidence",
    price: 350,
    available: true,
    format: "canvas",
    size: "12 x 12 in",
    medium: "Acrylic on canvas",
    story: [
      "With her head held high and adorned with delicate hair ties and a golden crown, Crowned in Confidence honors the quiet strength and bold beauty of Black girlhood. Her eyes speak volumes: resilient, soft, and self-assured. Vibrant orange and red florals bloom around her like an offering of grace.",
      "Set against a rich teal background, this piece invites viewers to remember the power of presence and the importance of being seen.",
    ],
    details: ["Ready to hang", "One-of-a-kind original"],
    image: "/art/crowned-in-confidence.jpg",
    oldPath: "/store/p/crowned-in-confidence",
  },
  {
    slug: "flourish",
    title: "Flourish",
    price: 350,
    available: false,
    format: "canvas",
    size: "12 x 12 in",
    medium: "Acrylic on canvas",
    series: "Bloom",
    story: [
      "A bold celebration of Black beauty and blooming identity, Flourish features a faceless silhouette adorned with vibrant hand-painted florals. Each petal is an expression of joy, each leaf a whisper of growth. Set against a calming sky-blue background, this piece evokes both peace and power.",
      "Flourish reminds us that home is where we grow into ourselves.",
    ],
    image: "/art/flourish.jpg",
    oldPath: "/store/p/flourish",
  },
  {
    slug: "its-my-time",
    title: "It's My Time",
    price: 500,
    available: false,
    format: "canvas",
    size: '16" round',
    medium: "Acrylic on canvas",
    series: "Bloom",
    story: [
      "Floral patterns crown this faceless figure, with gold earrings and a necklace adding a subtle sense of elegance. Set against a rich pink background, It's My Time is about strength, softness, and growing into your full self.",
    ],
    image: "/art/its-my-time.jpg",
    oldPath: "/store/p/built-in-bloom",
  },
  {
    slug: "surviving-corporate-america",
    title: "Surviving Corporate America",
    price: 500,
    available: false,
    format: "canvas",
    size: '16" round',
    medium: "Acrylic on canvas",
    story: [
      "A bright yellow backdrop makes this portrait glow. Swirls of teal, orange, and purple move across the figure's face and chest, adding energy and rhythm to the piece.",
    ],
    image: "/art/surviving-corporate-america.jpg",
    oldPath: "/store/p/be-the-light",
  },
  {
    slug: "fully-seen",
    title: "Fully Seen",
    price: 500,
    available: false,
    format: "canvas",
    size: '16" round',
    medium: "Acrylic on canvas",
    story: [
      "A faceless Black figure with long painted lashes, bold red lips, and a single flower over the heart, set against a bright orange background. Fully Seen is about presence. It's a reminder that you don't need to explain yourself to be powerful. You just need to show up.",
    ],
    image: "/art/fully-seen.jpg",
    oldPath: "/store/p/fully-seen",
  },
  {
    slug: "bright-and-grounded",
    title: "Bright and Grounded",
    price: 30,
    available: false,
    format: "card",
    size: "5 x 7 in card",
    medium: "Acrylic on paper",
    story: [
      "A faceless figure in front of a vibrant, abstract background. Delicate blue and orange flowers grow from the chest. This piece blends boldness with calm, and is meant to bring color and care into small moments.",
    ],
    image: "/art/bright-and-grounded.jpg",
    oldPath: "/store/p/76watsn2q4p3lggyn1vz725kp1scuy",
  },
  {
    slug: "every-side-of-me",
    title: "Every Side of Me",
    price: 30,
    available: false,
    format: "card",
    size: "5 x 7 in card",
    medium: "Acrylic on paper",
    story: [
      "A colorful face split into bold shapes and sections. This card is about embracing every part of yourself: the loud, the quiet, the serious, the playful.",
    ],
    image: "/art/every-side-of-me.jpg",
    oldPath: "/store/p/every-side-of-me",
  },
  {
    slug: "layered-beauty",
    title: "Layered Beauty",
    price: 30,
    available: false,
    format: "card",
    size: "5 x 7 in card",
    medium: "Acrylic on paper",
    story: [
      "A floral-covered silhouette set against a layered, textured background. Made for anyone who finds power in their softness.",
    ],
    image: "/art/layered-beauty.jpg",
    oldPath: "/store/p/layered-beauty",
  },
  {
    slug: "family-unit",
    title: "Family Unit",
    price: 30,
    available: false,
    format: "card",
    size: "5 x 7 in card",
    medium: "Watercolor on paper",
    story: [
      "A minimalist portrait of three faceless figures side by side. The simple shapes and soft tones reflect closeness, love, and identity within a family.",
    ],
    image: "/art/family-unit.jpg",
    oldPath: "/store/p/family-unit",
  },
];

export const available = () => artworks.filter((a) => a.available);
export const collected = () => artworks.filter((a) => !a.available);
export const bySlug = (slug: string) => artworks.find((a) => a.slug === slug);

export const formatPrice = (n: number) =>
  `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
