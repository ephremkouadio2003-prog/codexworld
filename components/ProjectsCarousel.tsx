"use client";

import DiscCascadeCarousel, {
  type DiscCascadeItem,
  type DiscPattern,
} from "@/components/DiscCascadeCarousel";
import { projects } from "@/content/site";

const DISC_PATTERNS: DiscPattern[] = [
  "horizon",
  "rings",
  "eclipse",
  "sunburst",
  "mosaic",
  "halftone",
];

const DISC_PALETTES: [string, string, string][] = [
  ["#141218", "#c8f03d", "#5b3df5"],
  ["#5b3df5", "#c8f03d", "#efeee9"],
  ["#182a1d", "#c8f03d", "#dce8d8"],
  ["#23192f", "#f08ad5", "#c8f03d"],
  ["#16192b", "#7fa7ff", "#f5f3ec"],
  ["#2e1f14", "#f59b4c", "#fff1e3"],
];

const REVIEWS_BY_PROJECT: Record<string, { quote1: string; quote2: string }> = {
  ISITRAFIC: {
    quote1: "Covoiturage et réservation de bus en temps réel avec Mobile Money.",
    quote2: "Fluidité des trajets et suivi temps réel à travers la Côte d'Ivoire.",
  },
  "Kwiyiah Style": {
    quote1: "Maison de création d'exception entre Abidjan et Paris.",
    quote2: "Robes de gala sur-mesure et catalogue digital haute définition.",
  },
  SuccessPrepa: {
    quote1: "Préparation d'élite aux concours des grandes écoles INP-HB et ESATIC.",
    quote2: "Simulateur intelligent et mentorat sur-mesure pour les candidats.",
  },
  "People Connect Become": {
    quote1: "Révéler les bâtisseurs et créateurs d'Afrique et de la diaspora.",
    quote2: "Portraits éditoriaux immersifs et documentaires inspirants.",
  },
  "BFG Moment": {
    quote1: "Studio visuel haut de gamme et captation drone 4K.",
    quote2: "Sublimer les célébrations uniques avec une signature cinématographique.",
  },
  "Peace Magazine": {
    quote1: "Magazines personnalisés de 24 pages pour immortaliser vos moments clés.",
    quote2: "Parcours de création simple, impression de luxe et livraison soignée.",
  },
};

const DISC_ITEMS: DiscCascadeItem[] = projects.map((p, idx) => {
  const reviews = REVIEWS_BY_PROJECT[p.title] ?? {
    quote1: p.text,
    quote2: `${p.category} — développé par Codexworld.`,
  };

  return {
    title: p.title,
    src: p.image,
    alt: `Projet ${p.title} - ${p.category}`,
    label: p.title,
    labelStyle: "arc",
    pattern: DISC_PATTERNS[idx % DISC_PATTERNS.length],
    palette: DISC_PALETTES[idx % DISC_PALETTES.length],
    credits: [
      { label: "Domaine", value: p.category },
      { label: "Année", value: p.year },
      { label: "Studio", value: "Codexworld" },
      { label: "Statut", value: p.href ? "En ligne" : "Production" },
    ],
    reviews: [
      {
        source: p.category,
        quote: reviews.quote1,
        stars: 5,
      },
      {
        source: "Codexworld Studio",
        quote: reviews.quote2,
        stars: 5,
      },
    ],
    fine: `${p.title} · ${p.category} · CODEXWORLD ARCHIVE · ${p.year}`,
    href: p.href,
  };
});

export default function ProjectsCarousel() {
  const handleSelect = (item: DiscCascadeItem) => {
    if (item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <DiscCascadeCarousel
      items={DISC_ITEMS}
      defaultIndex={0}
      height="clamp(580px, 82svh, 780px)"
      discSize="clamp(190px, min(48vmin, 36vw), 410px)"
      brand="CODEXWORLD"
      indexLabel="PROJETS"
      hint="Glisser · Cliquer pour visiter"
      ariaLabel="Catalogue de projets Codexworld"
      background="#ffffff"
      color="var(--ink)"
      frame={true}
      controls={true}
      details={true}
      reviews={true}
      loop={true}
      onSelect={handleSelect}
      fontHref="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
      serif='"Instrument Serif", "Bodoni Moda", Didot, serif'
      sans='var(--font-inter), "Inter", ui-sans-serif, system-ui, sans-serif'
      display='var(--font-archivo), "Archivo Black", "Oswald", Impact, sans-serif'
      className="w-full"
    />
  );
}
