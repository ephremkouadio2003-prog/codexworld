import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-8 bg-violet px-4 text-center text-paper">
      <Image src="/img/logo-mark-white.png" alt="" width={160} height={128} />
      <h1 className="font-display text-[clamp(5rem,18vw,12rem)] leading-none tracking-[-0.04em] text-lime">404</h1>
      <p className="max-w-md text-xl font-bold">
        Cette page s&apos;est perdue dans l&apos;espace. Revenons sur la planète Codex.
      </p>
      <Link
        href="/"
        className="rounded-full border-2 border-ink bg-lime px-8 py-4 font-extrabold uppercase text-ink transition-colors hover:bg-ink hover:text-lime"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
