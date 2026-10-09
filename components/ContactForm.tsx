"use client";

import { useState } from "react";
import { site } from "@/content/site";

const TYPES = ["Site web", "E-commerce", "App mobile", "SaaS", "Design", "Autre"];

const field =
  "w-full rounded-2xl border-2 border-paper/25 bg-transparent px-5 py-4 text-paper placeholder:text-paper/40 outline-none transition-all focus:border-lime focus:ring-2 focus:ring-lime/40";

function Chips({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={name}>
      {options.map((o) => {
        const on = value === o;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(on ? "" : o)}
            className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
              on
                ? "border-lime bg-lime text-ink"
                : "border-paper/25 text-paper hover:border-lime"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

// Pas de backend : le formulaire prépare un e-mail dans le logiciel du visiteur.
// Pour recevoir les messages directement, branchez un service (Formspree,
// Resend, une route API…) dans `onSubmit`.
export default function ContactForm() {
  const [type, setType] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = `Nouveau projet${type ? ` — ${type}` : ""} — ${name}`;
    const body = [
      `Nom : ${name}`,
      `E-mail : ${email}`,
      type && `Type de projet : ${type}`,
      "",
      message,
    ]
      .filter((l) => l !== "")
      .join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-bold uppercase tracking-wide text-paper/60">Nom</span>
          <input name="name" required autoComplete="name" placeholder="Votre nom" className={field} />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold uppercase tracking-wide text-paper/60">E-mail</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="vous@exemple.com"
            className={field}
          />
        </label>
      </div>

      <div className="grid gap-3">
        <span className="text-sm font-bold uppercase tracking-wide text-paper/60">Type de projet</span>
        <Chips name="Type de projet" options={TYPES} value={type} onChange={setType} />
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-bold uppercase tracking-wide text-paper/60">Votre projet</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Parlez-nous de votre idée, vos objectifs, vos délais…"
          className={`${field} resize-y`}
        />
      </label>

      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-3 justify-self-start rounded-full border-2 border-lime bg-lime px-8 py-4 font-extrabold uppercase text-ink transition-colors hover:bg-transparent hover:text-lime"
      >
        Envoyer
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </button>
    </form>
  );
}
