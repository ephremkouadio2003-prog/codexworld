"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { nav } from "@/content/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-[var(--nav-h)] border-b-2 border-ink bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Codexworld — accueil">
          <Image src="/img/logo-mark.png" alt="" width={44} height={35} priority />
          <Image
            src="/img/logo-word.png"
            alt="Codexworld"
            width={140}
            height={23}
            priority
            className="hidden sm:block"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm font-extrabold uppercase tracking-wide after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-lime after:transition-transform hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="rounded-full border-2 border-ink bg-lime px-5 py-2 text-sm font-extrabold uppercase transition-colors hover:bg-ink hover:text-paper"
          >
            Démarrer un projet
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 top-0 h-[2px] w-5 bg-ink transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[2px] w-5 bg-ink transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-b-2 border-ink bg-paper px-4 pb-6 pt-2 md:hidden"
          aria-label="Navigation mobile"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-ink/15 py-4 font-display text-3xl uppercase"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-6 block rounded-full border-2 border-ink bg-lime px-5 py-3 text-center font-extrabold uppercase"
          >
            Démarrer un projet
          </Link>
        </nav>
      )}
    </header>
  );
}
