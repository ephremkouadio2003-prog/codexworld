import { site } from "@/content/site";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

// Image affichée quand le lien du site est partagé (WhatsApp, LinkedIn, X…).
export const alt = `${site.name} — ${site.tagline}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Abidjan · Afrique · International",
    lines: ["Sites web,", "applis mobiles", "& plateformes SaaS"],
  });
}
