import type { NextConfig } from "next";
import { artworks } from "./lib/artworks";

// Old Squarespace links (from Google, Instagram, texts) keep working after the move.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/store", destination: "/shop", permanent: true },
      { source: "/cart", destination: "/shop", permanent: true },
      ...artworks
        .filter((a) => a.oldPath)
        .map((a) => ({ source: a.oldPath!, destination: `/shop/${a.slug}`, permanent: true })),
    ];
  },
};

export default nextConfig;
