import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import CrowdCanvas from "@/components/CrowdCanvas";
import ProcessOrbit from "@/components/ProcessOrbit";
import TailwindImageAccordion from "@/components/ui/tailwind-image-accordion";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import { services, site, stack } from "@/content/site";

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
              Vous avez une idée&nbsp;?
              <br />
              <span className="text-violet">On la code.</span>
            </Title>
          </div>
          <p data-reveal className="max-w-sm text-lg leading-relaxed text-ink/70">
            Six façons de donner vie à votre projet. Chaque fois du sur mesure, pensé pour vos utilisateurs et
            construit pour durer.
          </p>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-[2rem] border-2 border-ink bg-ink sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              className="group relative flex flex-col gap-6 bg-paper p-7 transition-colors duration-300 hover:bg-white md:p-8"
            >
              <span className="absolute right-7 top-6 font-display text-sm text-ink/40 transition-colors group-hover:text-violet md:right-8">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Image
                src={s.illustration}
                alt=""
                width={1600}
                height={1200}
                unoptimized
                className="h-auto w-full max-w-[320px] transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-[-1.5deg]"
              />
              <div className="grid gap-4">
                <h3 className="font-display text-2xl uppercase tracking-tight md:text-3xl">{s.title}</h3>
                <p className="leading-relaxed text-ink/70">{s.text}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-ink/30 px-3 py-1 text-xs font-bold uppercase transition-colors group-hover:border-violet group-hover:text-violet"
                    >
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
    <section id="methode" className="bg-ink px-4 py-24 text-paper md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[1fr_auto] md:items-end">
          <div className="grid gap-6">
            <Eyebrow index="03" dark>
              Méthode
            </Eyebrow>
            <Title>
              Quatre étapes,
              <br />
              <span className="text-lime">zéro surprise.</span>
            </Title>
          </div>
          <p data-reveal className="max-w-sm text-lg leading-relaxed text-paper/70">
            Un chemin clair, des points d&apos;étape réguliers et un seul interlocuteur, du premier appel jusqu&apos;à
            la mise en ligne.
          </p>
        </div>

        <ProcessOrbit />

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

        <div data-reveal>
          <TailwindImageAccordion />
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
            Prêt à
            <br />
            <span className="text-lime">décoller&nbsp;?</span>
          </Title>
          <p data-reveal className="max-w-md text-lg leading-relaxed text-paper/70">
            Racontez-nous votre projet en quelques lignes. On revient vers vous avec des questions, des idées et une
            première estimation.
          </p>
          <a
            data-reveal
            href={`mailto:${site.email}`}
            className="justify-self-start border-b-2 border-lime pb-1 font-display text-2xl text-lime transition-colors hover:text-paper md:text-3xl"
          >
            {site.email}
          </a>
          <Image
            data-reveal
            src="/img/codi/codi-06-decollage.webp"
            alt="Codi, la mascotte de Codexworld, en plein décollage"
            width={1024}
            height={1024}
            className="codi-drift hidden w-56 justify-self-start lg:block"
          />
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
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex items-center gap-4">
            <Image src="/img/logo-mark-white.png" alt="" width={90} height={72} />
            <div>
              <p className="max-w-xs text-lg font-bold leading-snug">
                Sites web, applications mobiles & plateformes sur mesure.
              </p>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-paper/30 bg-white/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-paper">
                <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
                Filiale de Peace Agency
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <ul className="flex flex-wrap items-center gap-6">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-extrabold uppercase hover:text-lime"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <Image
              src="/img/codi/codi-01-coucou.webp"
              alt="Codi, la mascotte de Codexworld, fait coucou"
              width={1024}
              height={1024}
              className="hidden w-24 md:block"
            />
          </div>
        </div>

        <Image
          src="/img/logo-word-white.png"
          alt="Codexworld"
          width={694}
          height={115}
          className="mt-16 h-auto w-full max-w-[694px] select-none"
        />

        <div className="mt-8 flex flex-col justify-between gap-4 border-t-2 border-paper/25 pt-6 text-sm font-bold md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>© 2026 Codexworld. Tous droits réservés.</span>
            <span className="hidden opacity-40 md:inline">•</span>
            <span className="text-paper/90">Filiale de Peace Agency</span>
          </div>
          <nav aria-label="Liens légaux" className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link href="/mentions-legales" className="underline decoration-lime underline-offset-4 hover:text-lime">
              Mentions légales
            </Link>
            <span className="hidden opacity-40 md:inline">•</span>
            <Link href="/mentions-legales#donnees" className="underline decoration-lime underline-offset-4 hover:text-lime">
              Politique de confidentialité
            </Link>
          </nav>
        </div>
        <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold">
          <span className="text-paper/80">Fondée par Ephrem Kouadio & Jérémie Kouassi</span>
          <span className="hidden opacity-40 md:inline">•</span>
          <span className="font-extrabold text-lime">Propulsé par Codexworld</span>
        </p>
      </div>
    </footer>
  );
}
