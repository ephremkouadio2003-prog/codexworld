import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// On n'autorise l'indexation que sur le déploiement de production.
// Les URLs de prévisualisation Vercel (*.vercel.app) renvoient alors un
// robots.txt qui bloque tout, pour éviter le contenu dupliqué et
// l'exposition de l'environnement de preview dans les moteurs de recherche.
const isProduction = process.env.VERCEL_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
