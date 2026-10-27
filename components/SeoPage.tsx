import Image from "next/image";
import Link from "next/link";
import Faq from "@/components/Faq";
import Header from "@/components/Header";
import { Footer } from "@/components/Sections";
import type { Faq as FaqItem, SeoSection } from "@/content/seo";
import { site } from "@/content/site";
import { JsonLd } from "@/lib/seo";

export type Crumb = { name: string; path: string };
export type RelatedLink = { label: string; href: string; hint?: string };

type Props = {
  eyebrow: string;
  h1: string;
  intro: string;
  illustration?: string;
  sections: SeoSection[];
  faq: FaqItem[];
  breadcrumbs: Crumb[];
  related: RelatedLink[];
  jsonLd: object[];
};

// Gabarit des pages de référencement (services, zones) : bandeau sombre,
// fil d'Ariane, sections rédigées, FAQ, liens internes et appel à l'action.
export default function SeoPage({
  eyebrow,
  h1,
  intro,
  illustration,
  sections,
  faq,
  breadcrumbs,
  related,
  jsonLd,
}: Props) {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Header />
      <main className="bg-paper">
        <section className="p-2 md:p-4" aria-labelledby="seo-title">
          <div className="rounded-[2rem] bg-ink px-6 py-16 text-paper md:rounded-[2.5rem] md:px-12 md:py-24">
            <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <nav aria-label="Fil d'Ariane" className="mb-6 text-sm font-bold text-paper/60">
                  <ol className="flex flex-wrap items-center gap-2">
                    {breadcrumbs.map((c, i) => {
                      const last = i === breadcrumbs.length - 1;
                      return (
                        <li key={c.path} className="flex items-center gap-2">
                          {last ? (
                            <span aria-current="page" className="text-paper">
                              {c.name}
                            </span>
                          ) : (
                            <Link href={c.path} className="hover:text-lime">
                              {c.name}
                            </Link>
                          )}
                          {!last && <span aria-hidden="true">/</span>}
                        </li>
                      );
                    })}
                  </ol>
                </nav>
                <span className="text-sm font-bold uppercase tracking-wider text-lime">{eyebrow}</span>
                <h1 className="mt-4 max-w-[18ch] font-display text-[clamp(2.2rem,5.5vw,5rem)] uppercase leading-[0.95] tracking-[-0.04em]">
                  {h1}
                </h1>
                <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-paper/75">{intro}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/#contact"
                    className="rounded-full border-2 border-lime bg-lime px-7 py-4 font-extrabold uppercase text-ink transition-colors hover:bg-transparent hover:text-lime"
                  >
                    Demander un devis
                  </Link>
                  <Link
                    href="/#projets"
                    className="rounded-full border-2 border-paper px-7 py-4 font-extrabold uppercase text-paper transition-colors hover:bg-paper hover:text-ink"
                  >
                    Voir nos projets
                  </Link>
                </div>
              </div>
              {illustration && (
                <Image
                  src={illustration}
                  alt=""
                  width={1600}
                  height={1200}
                  unoptimized
                  priority
                  className="hidden h-auto w-[360px] md:block"
                />
              )}
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-[1400px] gap-16 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="grid gap-12">
            {sections.map((s, i) => (
              <section key={s.title} className="border-b-2 border-ink/10 pb-12 last:border-0">
                <h2 className="mb-5 flex items-baseline gap-3 font-display text-2xl uppercase tracking-tight md:text-3xl">
                  <span className="text-base text-violet">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                <p className="max-w-[62ch] leading-relaxed text-ink/75">{s.text}</p>
                {s.bullets && (
                  <ul className="mt-5 grid max-w-[62ch] gap-2 pl-5 leading-relaxed text-ink/80 marker:text-violet">
                    {s.bullets.map((b) => (
                      <li key={b} className="list-disc">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section aria-labelledby="faq-title">
              <h2 id="faq-title" className="mb-6 font-display text-2xl uppercase tracking-tight md:text-3xl">
                Questions fréquentes
              </h2>
              <Faq items={faq} />
            </section>
          </article>

          <aside className="grid content-start gap-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border-2 border-ink bg-violet p-6 text-paper shadow-[6px_6px_0_var(--ink)]">
              <p className="font-display text-xl uppercase leading-tight">Un projet en tête&nbsp;?</p>
              <p className="mt-3 text-sm leading-relaxed text-paper/85">
                Racontez-nous votre idée : on revient vers vous avec des questions, des pistes et une première
                estimation. Réponse sous 48&nbsp;h.
              </p>
              <Link
                href="/#contact"
                className="mt-5 inline-block rounded-full border-2 border-ink bg-lime px-5 py-3 text-sm font-extrabold uppercase text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Démarrer un projet
              </Link>
              <p className="mt-4 text-sm font-bold">
                <a href={`mailto:${site.email}`} className="underline decoration-lime underline-offset-4 hover:text-lime">
                  {site.email}
                </a>
              </p>
            </div>
            <nav aria-label="Pages liées" className="rounded-3xl border-2 border-ink/10 bg-white p-6">
              <h2 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-ink/50">À découvrir aussi</h2>
              <ul className="grid gap-3 text-sm font-semibold">
                {related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="hover:text-violet">
                      {r.label}
                    </Link>
                    {r.hint && <span className="block text-xs font-normal text-ink/50">{r.hint}</span>}
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
