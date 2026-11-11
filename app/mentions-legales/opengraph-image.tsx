import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Mentions légales de Codexworld";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Informations légales", lines: ["Mentions", "légales"] });
}
