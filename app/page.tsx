import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ScrollEffects from "@/components/ScrollEffects";
import {
  Contact,
  CrowdCTA,
  Footer,
  HomeFaq,
  Marquee,
  Process,
  Projects,
  Services,
  Team,
} from "@/components/Sections";
import { homeFaq } from "@/content/seo";
import { faqJsonLd, JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      {/* Fiche « agence » (ProfessionalService), site web et FAQ lus par Google. */}
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(), faqJsonLd(homeFaq)]} />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Projects />
        <Process />
        <Team />
        <HomeFaq />
        <CrowdCTA />
        <Contact />
      </main>
      <Footer />
      <ScrollEffects />
    </>
  );
}
