import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Sections";
import { servicePages, zonePages } from "@/content/seo";
import { site } from "@/content/site";
import { breadcrumbJsonLd, JsonLd, webPageJsonLd } from "@/lib/seo";

const title = "Nos services : site internet, application mobile, SaaS, e-commerce";
const description =
  "Tous les services de Codexworld, agence web à Abidjan : création de site internet, développement d'application mobile, plateforme SaaS, e-commerce Mobile Money, API et maintenance. Côte d'Ivoire, Afrique, international.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services", languages: { fr: "/services", "fr-CI": "/services", "x-default": "/services" } },
  openGraph: { title, description, url: "/services", type: "website" },
  twitter: { title, description },
};

const breadcrumbs = [
  { name: "Accueil", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesIndex() {
  return (
    <>
      <JsonLd
        data={[webPageJsonLd({ name: title, description, path: "/services" }), breadcrumbJsonLd(breadcrumbs)]}
      />
      <Header />
      <main className="bg-paper">
        <section className="p-2 md:p-4" aria-labelledby="services-title">
          <div className="rounded-[2rem] bg-ink px-6 py-16 text-paper md:rounded-[2.5rem] md:px-12 md:py-24">
            <div className="mx-auto max-w-[1400px]">
              <span className="text-sm font-bold uppercase tracking-wider text-lime">Services</span>
              <h1
                id="services-title"
                className="mt-4 max-w-[20ch] font-display text-[clamp(2.4rem,6vw,5.5rem)] uppercase leading-[0.95] tracking-[-0.04em]"
              >
                Ce qu&apos;on <span className="text-lime">code</span> pour vous
              </h1>
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-paper/75">
                {site.name} est une agence de développement web et mobile basée à Abidjan. Sites internet,
                applications mobiles, boutiques en ligne, plateformes SaaS, API et maintenance : six services, un
                seul interlocuteur, pour la Côte d&apos;Ivoire, l&apos;Afrique et l&apos;international.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24" aria-labelledby="liste-services">
          <h2 id="liste-services" className="sr-only">
            Liste des services
          </h2>
          <ul className="grid gap-px overflow-hidden rounded-[2rem] border-2 border-ink bg-ink sm:grid-cols-2 lg:grid-cols-3">
            {servicePages.map((p, i) => (
              <li key={p.slug} className="group relative flex flex-col gap-5 bg-paper p-7 transition-colors hover:bg-white md:p-8">
                <span className="absolute right-7 top-6 font-display text-sm text-ink/40 group-hover:text-violet">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Image src={p.illustration} alt="" width={1600} height={1200} unoptimized className="h-auto w-full max-w-[280px]" />
                <h3 className="font-display text-2xl uppercase tracking-tight">
                  <Link href={`/services/${p.slug}`} className="after:absolute after:inset-0">
                    {p.name}
                  </Link>
                </h3>
                <p className="leading-relaxed text-ink/70">{p.metaDescription}</p>
                <span className="mt-auto text-sm font-extrabold uppercase text-violet">En savoir plus →</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-[1400px] px-4 pb-20 md:px-8 md:pb-28" aria-labelledby="zones-title">
          <h2 id="zones-title" className="mb-8 font-display text-3xl uppercase tracking-tight md:text-4xl">
            Où nous <span className="text-violet">intervenons</span>
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {zonePages.map((z) => (
              <li key={z.slug}>
                <Link
                  href={`/agence-web/${z.slug}`}
                  className="block h-full rounded-3xl border-2 border-ink bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--ink)]"
                >
                  <span className="text-xs font-extrabold uppercase tracking-wider text-violet">{z.eyebrow}</span>
                  <span className="mt-2 block font-display text-xl uppercase leading-tight">{z.h1}</span>
                  <span className="mt-3 block text-sm leading-relaxed text-ink/70">{z.metaDescription}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
