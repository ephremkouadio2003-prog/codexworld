// Données structurées schema.org (JSON-LD) partagées par les pages.
// Validation : https://validator.schema.org et https://search.google.com/test/rich-results

import { founders, projects, services, site } from "@/content/site";
import type { Faq } from "@/content/seo";

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

/** Fiche de l'agence : type « ProfessionalService » (sous-type de LocalBusiness). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "Organization"],
    "@id": ORG_ID,
    name: site.name,
    alternateName: "Codex World",
    url: site.url,
    logo: { "@type": "ImageObject", url: `${site.url}/img/logo-mark.png` },
    image: `${site.url}/opengraph-image`,
    description: site.description,
    slogan: "On code vos idées.",
    email: site.email,
    telephone: site.phone,
    foundingDate: site.foundingYear,
    founder: founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role })),
    parentOrganization: { "@type": "Organization", name: site.parent },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.address.lat, longitude: site.address.lng },
    areaServed: [
      { "@type": "City", name: "Abidjan" },
      { "@type": "Country", name: "Côte d'Ivoire" },
      { "@type": "Continent", name: "Afrique" },
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Place", name: "International" },
    ],
    knowsLanguage: ["fr", "en"],
    currenciesAccepted: "XOF, EUR, USD",
    paymentAccepted: "Virement bancaire, Mobile Money, carte bancaire",
    priceRange: "$$",
    sameAs: site.socials.map((s) => s.href).filter((h) => h.startsWith("http")),
    knowsAbout: [
      "Création de site internet",
      "Développement d'application mobile",
      "Plateforme SaaS",
      "E-commerce Mobile Money",
      "Next.js",
      "React Native",
      "UI/UX design",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de développement web et mobile",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.text },
      })),
    },
    subjectOf: projects
      .filter((p) => p.href && !p.locked)
      .map((p) => ({ "@type": "CreativeWork", name: p.title, url: p.href, genre: p.category })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: "fr",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export function faqJsonLd(faq: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceJsonLd(opts: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: `${site.url}${opts.path}`,
    provider: { "@id": ORG_ID },
    areaServed: (opts.areaServed ?? site.areaServed).map((name) => ({ "@type": "Place", name })),
    availableLanguage: ["fr", "en"],
  };
}

export function webPageJsonLd(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: `${site.url}${opts.path}`,
    inLanguage: "fr",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
  };
}

/** Balise <script type="application/ld+json">, « < » échappé contre l'injection. */
export function JsonLd({ data }: { data: object | object[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
