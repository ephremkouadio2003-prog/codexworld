import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Manifeste web : nom, couleurs et icônes utilisés par les navigateurs
// (ajout à l'écran d'accueil, onglets, résultats de recherche enrichis).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    lang: "fr",
    background_color: "#efeee9",
    theme_color: "#141218",
    categories: ["business", "productivity", "technology"],
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
