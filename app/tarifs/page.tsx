import type { Metadata } from "next";
import SeoPage from "@/components/SeoPage";
import { pricingPage as page, servicePages, zonePages } from "@/content/seo";
import { site } from "@/content/site";
import { breadcrumbJsonLd, faqJsonLd, ORG_ID, webPageJsonLd } from "@/lib/seo";

const path = "/tarifs";

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  keywords: page.keywords,
  alternates: { canonical: path, languages: { fr: path, "fr-CI": path, "x-default": path } },
  openGraph: { title: page.metaTitle, description: page.metaDescription, url: path, type: "website" },
  twitter: { title: page.metaTitle, description: page.metaDescription },
};

const breadcrumbs = [
  { name: "Accueil", path: "/" },
  { name: "Tarifs", path },
];

// Catalogue de prix en FCFA (XOF) lisible par les moteurs et les assistants IA.
const offersJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Création de site internet et d'application à Abidjan",
  serviceType: "Développement web et mobile",
  url: `${site.url}${path}`,
  provider: { "@id": ORG_ID },
  areaServed: page.areaServed.map((name) => ({ "@type": "Place", name })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tarifs indicatifs 2026",
    itemListElement: page.offers.map((o) => ({
      "@type": "Offer",
      name: o.name,
      // Les prestations « sur devis » n'ont pas de prix publié.
      ...(o.min || o.max
        ? {
            priceCurrency: "XOF",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "XOF",
              ...(o.min ? { minPrice: o.min } : {}),
              ...(o.max ? { maxPrice: o.max } : {}),
            },
          }
        : {}),
    })),
  },
};

export default function TarifsPage() {
  return (
    <SeoPage
      eyebrow={page.eyebrow}
      h1={page.h1}
      intro={page.intro}
      illustration="/img/spots/site-web.svg"
      sections={page.sections}
      faq={page.faq}
      breadcrumbs={breadcrumbs}
      related={[
        ...servicePages.map((p) => ({ label: p.name, href: `/services/${p.slug}`, hint: p.eyebrow })),
        ...zonePages.map((z) => ({ label: `Agence web · ${z.name}`, href: `/agence-web/${z.slug}` })),
      ]}
      jsonLd={[
        webPageJsonLd({ name: page.metaTitle, description: page.metaDescription, path }),
        offersJsonLd,
        breadcrumbJsonLd(breadcrumbs),
        faqJsonLd(page.faq),
      ]}
    />
  );
}
