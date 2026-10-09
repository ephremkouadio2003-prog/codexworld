"use client";

import MascotPortfolioHero from "@/components/MascotPortfolioHero";

export default function Hero() {
  return (
    <section id="top" aria-label="Accueil">
      <MascotPortfolioHero
        height="calc(100svh - var(--nav-h))"
        minHeight="520px"
        index="CW/26"
        discipline="Agence digitale"
        tagline="On code vos idées"
        collection={["Projets", "Sélection"]}
        reel={["Portfolio © 2026", "Web · Mobile · SaaS"]}
        year="2026"
        initials="CW"
        badge="Sur mesure"
        line2="Sites web"
        line3="& Applis"
        word="Code"
        verticalTag="World"
        bracketed="X"
        seekingLabel="Un projet ?*"
        seeking="Parlons-en"
        href="#contact"
        services={["Sites web", "Applications mobiles", "SaaS & plateformes", "UI / UX design"]}
        greetings={[
          "Salut ! Moi c'est Ephrem, co-fondateur de Codexworld 👋",
          "On transforme vos idées en code.",
          "Psst — on prend de nouveaux projets.",
          "Ok, tu peux arrêter de me chatouiller :)",
        ]}
        skin="#7b4532"
        hair="#1c1216"
        beard="#2a1d1b"
        glasses="#c9ccd3"
        shirt="#ececef"
        accent="#c8f03d"
        paper="#efeee9"
        ink="#141218"
        srTitle="Codexworld, agence de développement de sites web, applications mobiles et plateformes SaaS"
      />
    </section>
  );
}
