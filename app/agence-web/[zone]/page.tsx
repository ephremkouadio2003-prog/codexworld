import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoPage from "@/components/SeoPage";
import { servicePages, zonePages } from "@/content/seo";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo";

// Pages « zones » (Abidjan / Afrique / International), statiques. Les slugs inconnus renvoient 404 (notFound).

// Route entièrement statique : les slugs connus sont prérendus au build,
// un slug inconnu produit un vrai 404 (statut HTTP) plutôt qu'un « soft 404 ».
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return zonePages.map((p) => ({ zone: p.slug }));
}

function getPage(zone: string) {
  return zonePages.find((p) => p.slug === zone);
}

export async function generateMetadata({ params }: PageProps<"/agence-web/[zone]">): Promise<Metadata> {
  const { zone } = await params;
  const page = getPage(zone);
  if (!page) return {};
  const path = `/agence-web/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: path, languages: { fr: path, "fr-CI": path, "x-default": path } },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: path,
      type: "website",
    },
    twitter: { title: page.metaTitle, description: page.metaDescription },
  };
}

export default async function ZonePage({ params }: PageProps<"/agence-web/[zone]">) {
  const { zone } = await params;
  const page = getPage(zone);
  if (!page) notFound();

  const path = `/agence-web/${page.slug}`;
  const breadcrumbs = [
    { name: "Accueil", path: "/" },
    { name: "Services", path: "/services" },
    { name: page.name, path },
  ];
  const related = [
    ...servicePages.map((p) => ({ label: p.name, href: `/services/${p.slug}`, hint: p.eyebrow })),
    ...zonePages
      .filter((z) => z.slug !== page.slug)
      .map((z) => ({ label: `Agence web · ${z.name}`, href: `/agence-web/${z.slug}` })),
  ];

  return (
    <SeoPage
      eyebrow={page.eyebrow}
      h1={page.h1}
      intro={page.intro}
      sections={page.sections}
      faq={page.faq}
      breadcrumbs={breadcrumbs}
      related={related}
      jsonLd={[
        webPageJsonLd({ name: page.metaTitle, description: page.metaDescription, path }),
        serviceJsonLd({
          name: `Agence de développement web et mobile — ${page.name}`,
          serviceType: "Développement web et mobile",
          description: page.metaDescription,
          path,
          areaServed: page.areaServed,
        }),
        breadcrumbJsonLd(breadcrumbs),
        faqJsonLd(page.faq),
      ]}
    />
  );
}
