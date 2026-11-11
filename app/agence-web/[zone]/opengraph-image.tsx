import { zonePages } from "@/content/seo";
import { ogContentType, ogSize, renderOg, splitLines } from "@/lib/og";

export const alt = "Codexworld, agence web à Abidjan";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return zonePages.map((p) => ({ zone: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ zone: string }> }) {
  const { zone } = await params;
  const page = zonePages.find((p) => p.slug === zone);
  return renderOg({
    eyebrow: page ? `Agence web · ${page.eyebrow}` : "Agence web",
    lines: splitLines(page?.metaTitle ?? "Agence web à Abidjan"),
  });
}
