import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ScrollEffects from "@/components/ScrollEffects";
import {
  Contact,
  CrowdCTA,
  Footer,
  Marquee,
  Process,
  Projects,
  Services,
  Team,
} from "@/components/Sections";
import { founders, projects, site } from "@/content/site";

// Fiche « organisation » lue par Google (nom, logo, fondateurs, réalisations).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/img/logo-mark.png`,
  description: site.description,
  email: site.email,
  founder: founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role })),
  sameAs: site.socials.map((s) => s.href).filter((h) => h.startsWith("http")),
  subjectOf: projects
    .filter((p) => p.href)
    .map((p) => ({ "@type": "CreativeWork", name: p.title, url: p.href, genre: p.category })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Projects />
        <Process />
        <Team />
        <CrowdCTA />
        <Contact />
      </main>
      <Footer />
      <ScrollEffects />
    </>
  );
}
