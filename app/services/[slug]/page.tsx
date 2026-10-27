import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoPage from "@/components/SeoPage";
import { servicePages, zonePages } from "@/content/seo";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo";

// Pages « service » générées statiquement à partir de content/seo.ts. Les slugs inconnus renvoient 404 (notFound).

// Route entièrement statique : les slugs connus sont prérendus au build,
// un slug inconnu produit un vrai 404 (statut HTTP) plutôt qu'un « soft 404 ».
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

function getPage(slug: string) {
  return servicePages.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  const path = `/services/${page.slug}`;
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

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();

  const path = `/services/${page.slug}`;
  const breadcrumbs = [
    { name: "Accueil", path: "/" },
    { name: "Services", path: "/services" },
    { name: page.name, path },
  ];
  const related = [
    ...page.related
      .map((s) => servicePages.find((p) => p.slug === s))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .map((p) => ({ label: p.name, href: `/services/${p.slug}`, hint: p.eyebrow })),
    ...zonePages.map((z) => ({ label: `Agence web · ${z.name}`, href: `/agence-web/${z.slug}` })),
  ];

  return (
    <SeoPage
      eyebrow={page.eyebrow}
      h1={page.h1}
      intro={page.intro}
      illustration={page.illustration}
      sections={page.sections}
      faq={page.faq}
      breadcrumbs={breadcrumbs}
      related={related}
      jsonLd={[
        webPageJsonLd({ name: page.metaTitle, description: page.metaDescription, path }),
        serviceJsonLd({
          name: page.name,
          serviceType: page.serviceType,
          description: page.metaDescription,
          path,
        }),
        breadcrumbJsonLd(breadcrumbs),
        faqJsonLd(page.faq),
      ]}
    />
  );
}
