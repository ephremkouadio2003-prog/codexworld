import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Les services de Codexworld, agence web à Abidjan";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Services", lines: ["Sites, applis,", "SaaS, e-commerce,", "API & maintenance"] });
}
