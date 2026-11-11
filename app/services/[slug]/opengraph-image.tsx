import { servicePages } from "@/content/seo";
import { ogContentType, ogSize, renderOg, splitLines } from "@/lib/og";

export const alt = "Codexworld, agence web à Abidjan";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = servicePages.find((p) => p.slug === slug);
  return renderOg({
    eyebrow: page ? `Services · ${page.eyebrow}` : "Services",
    lines: splitLines(page?.metaTitle ?? "Agence web à Abidjan"),
  });
}
