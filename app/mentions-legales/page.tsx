import type { Metadata } from "next";
import Header from "@/components/Header";
import { Footer } from "@/components/Sections";
import { legal, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales et politique de confidentialité du site ${site.url.replace(/^https?:\/\//, "")}, ${site.tagline.toLowerCase()}.`,
  alternates: { canonical: "/mentions-legales" },
};

const SECTIONS = [
  { id: "editeur", title: "Éditeur du site" },
  { id: "publication", title: "Directeur de la publication" },
  { id: "hebergeur", title: "Hébergeur" },
  { id: "propriete", title: "Propriété intellectuelle" },
  { id: "donnees", title: "Données personnelles" },
  { id: "cookies", title: "Cookies" },
  { id: "responsabilite", title: "Responsabilité" },
  { id: "droit", title: "Droit applicable" },
];

const domain = site.url.replace(/^https?:\/\//, "");
function Mail() {
  return (
    <a href={`mailto:${site.email}`} className="font-semibold text-violet underline decoration-lime underline-offset-4">
      {site.email}
    </a>
  );
}

function Facts({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <dl className="grid gap-x-6 gap-y-2 rounded-3xl border-2 border-ink/10 bg-white p-6 sm:grid-cols-[max-content_1fr]">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="font-extrabold">{k}</dt>
          <dd className="mb-2 break-words text-ink/80 sm:mb-0">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Section({
  id,
  index,
  children,
}: {
  id: string;
  index: number;
  children: React.ReactNode;
}) {
  const title = SECTIONS[index].title;
  return (
    <section id={id} className="scroll-mt-28 border-b-2 border-ink/10 pb-10 last:border-0">
      <h2 className="mb-5 flex items-baseline gap-3 font-display text-2xl uppercase tracking-tight md:text-3xl">
        <span className="text-base text-violet">{String(index + 1).padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="grid max-w-[46em] gap-3 leading-relaxed text-ink/75 [&_h3]:mt-4 [&_h3]:font-extrabold [&_h3]:text-ink [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

export default function MentionsLegales() {
  const { company, publisher, host } = legal;
  return (
    <>
      <Header />
      <main className="bg-paper">
        <section className="p-2 md:p-4" aria-labelledby="ml-title">
          <div className="rounded-[2rem] bg-ink px-6 py-16 text-paper md:rounded-[2.5rem] md:px-12 md:py-24">
            <div className="mx-auto max-w-[1400px]">
              <span className="text-sm font-bold uppercase tracking-wider text-lime">Informations légales</span>
              <h1
                id="ml-title"
                className="mt-4 font-display text-[clamp(2.6rem,7vw,6.5rem)] uppercase leading-[0.92] tracking-[-0.04em]"
              >
                Mentions <span className="text-lime">légales.</span>
              </h1>
              <p className="mt-6 max-w-[40em] text-lg text-paper/75">
                Conformément à la loi ivoirienne n° 2013-546 du 30 juillet 2013 relative aux transactions
                électroniques, voici les informations relatives à l&apos;éditeur et à l&apos;hébergeur du site {domain},
                ainsi que notre politique de confidentialité.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-16 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:gap-16 md:px-8 md:py-24">
          <nav aria-label="Sommaire" className="self-start rounded-3xl border-2 border-ink/10 bg-white p-6 md:sticky md:top-24">
            <h2 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-ink/50">Sommaire</h2>
            <ol className="grid list-decimal gap-2 pl-5 text-sm font-semibold">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-violet">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="grid gap-10">
            <Section id="editeur" index={0}>
              <p>
                Le site <strong>{domain}</strong> est édité par :
              </p>
              <Facts
                rows={[
                  ["Nom commercial", company.tradeName],
                  ["Siège social", company.address],
                  ["E-mail", <Mail key="mail" />],
                  [
                    "Téléphone",
                    <span key="tel" className="grid gap-1">
                      {company.phones.map((n) => (
                        <a key={n} href={`tel:${n.replace(/\s/g, "")}`} className="hover:text-violet">
                          {n}
                        </a>
                      ))}
                    </span>,
                  ],
                ]}
              />
              <p>
                {company.tradeName} est une filiale de <strong>{company.parent}</strong>.
              </p>
            </Section>

            <Section id="publication" index={1}>
              <p>
                Le directeur de la publication est <strong>{publisher.name}</strong>, en qualité de {publisher.role},
                joignable à l&apos;adresse <Mail />.
              </p>
            </Section>

            <Section id="hebergeur" index={2}>
              <p>Le site est hébergé par :</p>
              <Facts
                rows={[
                  ["Nom", host.name],
                  ["Adresse", host.address],
                  [
                    "Site web",
                    <a key="host" href={host.website} className="font-semibold text-violet underline underline-offset-4" rel="noopener">
                      {host.website.replace(/^https?:\/\//, "")}
                    </a>,
                  ],
                ]}
              />
            </Section>

            <Section id="propriete" index={3}>
              <p>
                L&apos;ensemble des éléments de ce site (textes, logo, mascotte Codi, illustrations, charte graphique,
                code source) est la propriété exclusive de {company.tradeName}, sauf mention contraire, et est protégé
                par la législation ivoirienne et internationale sur la propriété intellectuelle (notamment l&apos;Accord
                de Bangui révisé de l&apos;OAPI).
              </p>
              <p>
                Toute reproduction, représentation, modification ou adaptation, totale ou partielle, sans autorisation
                écrite préalable est interdite et constitue une contrefaçon.
              </p>
              <p>
                Les projets présentés dans la section « Projets » appartiennent à leurs clients respectifs. Les noms de
                technologies et marques cités appartiennent à leurs propriétaires et sont mentionnés à titre indicatif.
              </p>
            </Section>

            <Section id="donnees" index={4}>
              <p>
                {company.tradeName} s&apos;engage à ce que la collecte et le traitement de vos données soient conformes
                à la loi ivoirienne n° 2013-450 du 19 juin 2013 relative à la protection des données à caractère
                personnel et, pour les visiteurs résidant dans l&apos;Union européenne, au Règlement général sur la
                protection des données (RGPD, règlement UE 2016/679).
              </p>
              <h3>Responsable du traitement</h3>
              <p>
                {company.tradeName}, {company.address}, joignable à <Mail />.
              </p>
              <h3>Données collectées et finalités</h3>
              <p>
                Via le formulaire de contact : nom, adresse e-mail, type de projet, budget indicatif et message. Ces
                données servent uniquement à répondre à votre demande et, le cas échéant, à établir un devis.
              </p>
              <h3>Base légale</h3>
              <p>
                Votre consentement (case à cocher du formulaire) et les mesures précontractuelles prises à votre
                demande.
              </p>
              <h3>Destinataires</h3>
              <p>
                Les données sont destinées à {company.tradeName} uniquement. Elles transitent par le prestataire
                d&apos;envoi de formulaire {legal.formProvider} et sont hébergées par {host.name}. Elles ne sont jamais
                vendues ni cédées.
              </p>
              <h3>Durée de conservation</h3>
              <p>{legal.dataRetention} à compter du dernier contact, sauf relation contractuelle ultérieure.</p>
              <h3>Vos droits</h3>
              <ul>
                <li>droit d&apos;accès, de rectification et d&apos;effacement ;</li>
                <li>droit à la limitation et d&apos;opposition au traitement ;</li>
                <li>droit à la portabilité de vos données ;</li>
                <li>droit de retirer votre consentement à tout moment.</li>
              </ul>
              <p>
                Pour exercer ces droits, écrivez à <Mail />. Vous pouvez également introduire une réclamation auprès de
                l&apos;Autorité de Régulation des Télécommunications/TIC de Côte d&apos;Ivoire (ARTCI, artci.ci) ou, pour
                les résidents de l&apos;Union européenne, auprès de l&apos;autorité de contrôle de votre pays.
              </p>
            </Section>

            <Section id="cookies" index={5}>
              <p>
                Dans sa version actuelle, ce site ne dépose aucun cookie de mesure d&apos;audience ni de publicité.
                Seuls des cookies techniques strictement nécessaires au fonctionnement du site peuvent être utilisés.
              </p>
            </Section>

            <Section id="responsabilite" index={6}>
              <p>
                {company.tradeName} s&apos;efforce de fournir des informations exactes et à jour, sans pouvoir garantir
                l&apos;absence d&apos;erreurs ou d&apos;omissions. {company.tradeName} ne saurait être tenu responsable
                des dommages directs ou indirects résultant de l&apos;accès au site ou de son utilisation, ni du contenu
                des sites tiers vers lesquels des liens pourraient renvoyer.
              </p>
            </Section>

            <Section id="droit" index={7}>
              <p>
                Les présentes mentions légales sont régies par le droit ivoirien. En cas de litige, et à défaut de
                résolution amiable, les tribunaux d&apos;Abidjan seront seuls compétents.
              </p>
              <p>
                <em>Dernière mise à jour : {legal.updatedAt}</em>
              </p>
            </Section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
