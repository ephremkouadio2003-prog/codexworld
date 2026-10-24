import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Sections";

// Étoiles générées de façon déterministe (même rendu serveur et client).
function stars(count: number) {
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  return Array.from({ length: count }, (_, i) => ({
    cx: (rnd() * 1000).toFixed(1),
    cy: (rnd() * 600).toFixed(1),
    r: (rnd() * 1.3 + 0.5).toFixed(2),
    opacity: (rnd() * 0.6 + 0.3).toFixed(2),
    twinkle: i % 3 === 0,
    delay: `${(-rnd() * 4).toFixed(2)}s`,
  }));
}

const STARS = stars(70);

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100svh-var(--nav-h))] flex-col bg-paper p-2 md:p-4">
        <section
          aria-labelledby="nf-title"
          className="relative isolate flex flex-1 flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-center text-paper md:rounded-[2.5rem] md:py-24"
        >
          {/* Motif du kit d'illustrations, en fond */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 opacity-40"
            style={{ backgroundImage: "url(/img/pattern-tile.svg)", backgroundSize: "720px" }}
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 -z-10 h-full w-full"
          >
            {STARS.map((s, i) => (
              <circle
                key={i}
                cx={s.cx}
                cy={s.cy}
                r={s.r}
                fill="#fff"
                opacity={s.opacity}
                className={s.twinkle ? "star-twinkle" : undefined}
                style={s.twinkle ? { animationDelay: s.delay } : undefined}
              />
            ))}
          </svg>

          <Image
            src="/img/codi/codi-05-dodo.webp"
            alt="Codi, la mascotte de Codexworld, endormie et perdue dans l'espace"
            width={1024}
            height={1024}
            priority
            className="codi-drift w-[min(300px,62vw)]"
          />
          <p className="mt-2 text-sm font-bold uppercase tracking-wider text-lime">Erreur 404 · page introuvable</p>
          <h1
            id="nf-title"
            className="mt-4 font-display text-[clamp(2.8rem,9vw,7.5rem)] uppercase leading-[0.9] tracking-[-0.04em]"
          >
            Perdu dans
            <br />
            <span className="text-lime">l&apos;espace&nbsp;?</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-paper/75">
            Cette page n&apos;existe pas ou a changé d&apos;orbite. Pas de panique, on vous ramène à bon port.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-full border-2 border-lime bg-lime px-7 py-4 font-extrabold uppercase text-ink transition-colors hover:bg-transparent hover:text-lime"
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/#contact"
              className="rounded-full border-2 border-paper px-7 py-4 font-extrabold uppercase text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              Nous contacter
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
