import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import CrowdCanvas from "@/components/CrowdCanvas";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import { founders, process, services, site, stack } from "@/content/site";

/* ---------------------------------------------------------------- helpers */

function Eyebrow({ index, children, dark }: { index: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex w-fit justify-self-start items-center gap-3 rounded-full border-2 py-1 pl-1 pr-4 text-xs font-extrabold uppercase tracking-wider ${
        dark ? "border-paper/30 text-paper" : "border-ink"
      }`}
    >
      <b className="rounded-full bg-lime px-3 py-1 text-ink">{index}</b>
      {children}
    </span>
  );
}

function Title({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      data-reveal
      className={`font-display text-[clamp(2.6rem,7vw,6.5rem)] uppercase leading-[0.92] tracking-[-0.04em] ${className}`}
    >
      {children}
    </h2>
  );
}

/* ---------------------------------------------------------------- marquee */

const MARQUEE = ["Sites web", "Applications mobiles", "SaaS", "E-commerce", "UI / UX", "API & Backend"];

export function Marquee() {
  const row = [...MARQUEE, ...MARQUEE];
  return (
    <div className="overflow-hidden border-y-2 border-ink bg-violet py-5 text-lime" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={i} className="flex items-center font-display text-3xl uppercase md:text-5xl">
                <span className="px-6">{w}</span>
                <span className="text-paper">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- services */

export function Services() {
  return (
    <section id="services" className="bg-paper px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[1fr_auto] md:items-end">
          <div className="grid gap-6">
            <Eyebrow index="01">Services</Eyebrow>
            <Title>
              Ce qu&apos;on
              <br />
              <span className="text-violet">construit</span> pour vous
            </Title>
          </div>
          <p data-reveal className="max-w-sm text-lg leading-relaxed text-ink/70">
            Une équipe, un interlocuteur, de l&apos;idée au produit en ligne. On s&apos;occupe du design, du
            code et de tout ce qu&apos;il y a entre les deux.
          </p>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-[2rem] border-2 border-ink bg-ink sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              className="group flex min-h-[300px] flex-col justify-between gap-10 bg-paper p-8 transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-5xl text-violet transition-colors group-hover:text-lime">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-current text-xl transition-transform duration-300 group-hover:-rotate-45 group-hover:bg-lime group-hover:text-ink group-hover:border-lime"
                >
                  →
                </span>
              </div>
              <div className="grid gap-4">
                <h3 className="font-display text-2xl uppercase tracking-tight md:text-3xl">{s.title}</h3>
                <p className="leading-relaxed opacity-75">{s.text}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-full border border-current px-3 py-1 text-xs font-bold uppercase opacity-80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- projects */

export function Projects() {
  return (
    <section id="projets" className="border-t-2 border-ink bg-white px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <div className="grid gap-6">
            <Eyebrow index="02">Projets</Eyebrow>
            <Title>
              Travaux <span className="relative inline-block">choisis<span className="absolute -right-6 top-0 text-violet">*</span></span>
            </Title>
          </div>
          <p data-reveal className="max-w-md text-lg leading-relaxed text-ink/70">
            Une sélection de nos réalisations : plateformes web, applications mobiles et plateformes SaaS développées sur mesure.
          </p>
        </div>

        <div
          data-reveal
          className="relative overflow-hidden rounded-[2.5rem] border-2 border-ink bg-white shadow-[8px_8px_0_var(--ink)]"
        >
          <ProjectsCarousel />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- process */

export function Process() {
  return (
    <section id="process" className="bg-ink px-4 py-24 text-paper md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 grid gap-6 md:mb-20">
          <Eyebrow index="03" dark>
            Process
          </Eyebrow>
          <Title>
            De l&apos;idée
            <br />
            au <span className="text-lime">lancement</span>
          </Title>
        </div>

        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {process.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              className="relative flex flex-col gap-6 rounded-[2rem] border-2 border-paper/20 p-8 transition-colors hover:border-lime"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime font-display text-xl text-ink">
                {i + 1}
              </span>
              <h3 className="font-display text-2xl uppercase">{s.title}</h3>
              <p className="leading-relaxed text-paper/70">{s.text}</p>
            </li>
          ))}
        </ol>

        <div data-reveal className="mt-20 grid gap-6 border-t-2 border-paper/15 pt-10 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
          <span className="text-sm font-extrabold uppercase tracking-wider text-paper/50">Notre stack</span>
          <ul className="flex flex-wrap gap-3">
            {stack.map((t) => (
              <li
                key={t}
                className="rounded-full border-2 border-paper/20 px-4 py-2 text-sm font-bold transition-colors hover:border-violet hover:bg-violet"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- team */

export function Team() {
  return (
    <section id="equipe" className="bg-paper px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[1fr_auto] md:items-end">
          <div className="grid gap-6">
            <Eyebrow index="04">Équipe</Eyebrow>
            <Title>
              Les <span className="text-violet">fondateurs</span>
            </Title>
          </div>
          <p data-reveal className="max-w-sm text-lg leading-relaxed text-ink/70">
            Deux passionnés de code et de produit, réunis pour créer des outils numériques qui comptent.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {founders.map((f, i) => (
            <article key={f.name} data-reveal className="group">
              <div
                className={`relative aspect-[4/5] overflow-hidden rounded-[2rem] border-2 border-ink ${
                  i % 2 ? "bg-violet" : "bg-lime"
                }`}
              >
                {f.photo ? (
                  <Image
                    src={f.photo}
                    alt={`Portrait de ${f.name}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                    <Image src="/img/logo-mark-white.png" alt="" width={180} height={144} className="opacity-90" />
                    <span className="font-display text-[clamp(5rem,14vw,10rem)] leading-none text-lime">
                      {f.initials}
                    </span>
                  </div>
                )}
                <span className="absolute bottom-5 left-5 rounded-full border-2 border-ink bg-paper px-4 py-1.5 text-xs font-extrabold uppercase">
                  {f.role}
                </span>
              </div>
              <h3 className="mt-6 font-display text-4xl uppercase tracking-tight md:text-5xl">{f.name}</h3>
              <p className="mt-3 max-w-md text-lg leading-relaxed text-ink/70">{f.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- crowd CTA */

export function CrowdCTA() {
  return (
    <section
      aria-labelledby="crowd-title"
      className="relative flex flex-col items-center overflow-hidden border-t-2 border-ink bg-white px-4 pt-24 text-center md:pt-32"
    >
      <span className="relative mb-20 max-w-[16ch] text-xs font-extrabold uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:mt-3 after:h-14 after:w-px after:bg-gradient-to-b after:from-white after:to-ink after:content-['']">
        Pour tout le monde
      </span>
      <h2
        id="crowd-title"
        data-reveal
        className="relative z-10 max-w-5xl font-display text-[clamp(2.4rem,6.5vw,6rem)] uppercase leading-[0.92] tracking-[-0.04em]"
      >
        Votre idée mérite
        <br />
        d&apos;être <span className="bg-lime px-3">vue</span> par tous.
      </h2>
      <p data-reveal className="relative z-10 mt-6 max-w-xl text-lg text-ink/70">
        Startups, commerces, associations, indépendants : on crée des produits que les gens ont envie d&apos;utiliser.
      </p>
      <div data-reveal className="relative z-10 mt-8 flex flex-wrap justify-center gap-3">
        <a
          href="#contact"
          className="rounded-full border-2 border-ink bg-violet px-7 py-4 font-extrabold uppercase text-paper transition-colors hover:bg-ink"
        >
          Lancer mon projet
        </a>
        <a
          href="#projets"
          className="rounded-full border-2 border-ink bg-white px-7 py-4 font-extrabold uppercase transition-colors hover:bg-lime"
        >
          Voir nos projets
        </a>
      </div>

      <div className="pointer-events-none relative mt-10 h-[60svh] min-h-[360px] w-screen">
        <CrowdCanvas src="/img/peeps.png" rows={15} cols={7} className="absolute inset-0 h-full w-full" />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- contact */

export function Contact() {
  return (
    <section id="contact" className="bg-ink px-4 py-24 text-paper md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div className="grid content-start gap-8">
          <Eyebrow index="05" dark>
            Contact
          </Eyebrow>
          <Title>
            On
            <br />
            en <span className="text-lime">parle</span> ?
          </Title>
          <p data-reveal className="max-w-md text-lg leading-relaxed text-paper/70">
            Décrivez-nous votre projet en quelques lignes. On revient vers vous rapidement avec des questions et des idées
            pour donner vie à votre projet.
          </p>
          <a
            data-reveal
            href={`mailto:${site.email}`}
            className="justify-self-start border-b-2 border-lime pb-1 font-display text-2xl text-lime transition-colors hover:text-paper md:text-3xl"
          >
            {site.email}
          </a>
        </div>
        <div data-reveal className="rounded-[2rem] border-2 border-paper/15 p-6 md:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- footer */

export function Footer() {
  return (
    <footer className="overflow-hidden bg-violet px-4 pb-8 pt-20 text-paper md:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 md:grid-cols-[1fr_auto]">
          <div className="flex items-center gap-4">
            <Image src="/img/logo-mark-white.png" alt="" width={90} height={72} />
            <p className="max-w-xs text-lg font-bold leading-snug">
              Sites web, applications mobiles & plateformes sur mesure.
            </p>
          </div>
          <ul className="flex flex-wrap gap-6">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="font-extrabold uppercase hover:text-lime">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Image
          src="/img/logo-word-white.png"
          alt="Codexworld"
          width={694}
          height={115}
          className="mt-16 h-auto w-full max-w-[694px] select-none"
        />

        <div className="mt-8 flex flex-col justify-between gap-2 border-t-2 border-paper/25 pt-6 text-sm font-bold md:flex-row">
          <span>© 2026 Codexworld. Tous droits réservés.</span>
          <span>Fondée par Ephrem Kouadio & Jérémie Kouassi</span>
        </div>
      </div>
    </footer>
  );
}
