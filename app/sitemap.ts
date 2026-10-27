import type { MetadataRoute } from "next";
import { servicePages, zonePages } from "@/content/seo";
import { site } from "@/content/site";

// Date de dernière modification du contenu (à mettre à jour quand les textes changent).
const UPDATED = new Date("2026-10-27");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: UPDATED,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${site.url}/opengraph-image`],
    },
    { url: `${site.url}/services`, lastModified: UPDATED, changeFrequency: "monthly", priority: 0.9 },
    ...servicePages.map((p) => ({
      url: `${site.url}/services/${p.slug}`,
      lastModified: UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...zonePages.map((p) => ({
      url: `${site.url}/agence-web/${p.slug}`,
      lastModified: UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/mentions-legales`, lastModified: UPDATED, changeFrequency: "yearly", priority: 0.2 },
  ];
}
