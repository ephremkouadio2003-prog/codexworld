import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Prix d'un site internet à Abidjan en 2026, par Codexworld";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Tarifs 2026", lines: ["Prix d'un site", "internet à Abidjan", "en 2026"] });
}
