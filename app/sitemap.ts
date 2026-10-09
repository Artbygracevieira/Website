import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getArtworks } from "@/lib/square";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/shop`, changeFrequency: "daily", priority: 0.9 },
    { url: `${site.url}/past-work`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/events`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${site.url}/shipping`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.1 },
  ].map((p) => ({ ...p, lastModified: now }) as MetadataRoute.Sitemap[number]);

  let pieces: Awaited<ReturnType<typeof getArtworks>> = [];
  try {
    pieces = await getArtworks();
  } catch {}
  return [
    ...pages,
    ...pieces.map((a) => ({
      url: `${site.url}/shop/${a.slug}`,
      lastModified: now,
      changeFrequency: (a.available ? "weekly" : "yearly") as "weekly" | "yearly",
      priority: a.available ? 0.8 : 0.4,
      images: [a.image.startsWith("http") ? a.image : `${site.url}${a.image}`],
    })),
  ];
}
