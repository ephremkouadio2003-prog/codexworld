"use client";

import Link from "next/link";
import { useState } from "react";
import { budgets, projectTypes, site } from "@/content/site";

// Envoi du formulaire :
// - si NEXT_PUBLIC_FORMSPREE_ID est défini (ex. « abcdwxyz », depuis https://formspree.io),
//   le message est envoyé à Formspree et arrive directement par e-mail ;
// - sinon, le formulaire ouvre la messagerie du visiteur avec le message pré-rempli.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Status = { kind: "ok" | "err"; text: string } | null;

const field =
  "w-full rounded-2xl border-2 border-paper/25 bg-transparent px-5 py-4 text-paper placeholder:text-paper/40 outline-none transition-all focus:border-lime focus:ring-2 focus:ring-lime/40";
const select = `${field} select-chevron cursor-pointer appearance-none pr-12 [&>option]:bg-ink [&>option]:text-paper`;
const label = "text-sm font-bold uppercase tracking-wide text-paper/60";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus(null);

    if (!form.checkValidity()) {
      setStatus({
        kind: "err",
        text: "Merci de remplir les champs obligatoires : nom, e-mail valide, type de projet, message et consentement.",
      });
      form.querySelector<HTMLElement>(":invalid")?.focus();
      return;
    }

    const data = new FormData(form);
    // Piège anti-spam : un champ invisible qu'un humain ne remplit jamais.
    if (String(data.get("_gotcha") ?? "") !== "") return;

    const name = String(data.get("nom") ?? "");
    const email = String(data.get("email") ?? "");
    const type = String(data.get("type_de_projet") ?? "");
    const budget = String(data.get("budget") ?? "") || "non précisé";
    const message = String(data.get("message") ?? "");

    if (!FORMSPREE_ID) {
      const subject = `Nouveau projet : ${type} — ${name}`;
      const body = `Nom : ${name}\nE-mail : ${email}\nType de projet : ${type}\nBudget : ${budget}\n\n${message}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus({
        kind: "ok",
        text: `Votre messagerie va s'ouvrir avec votre message pré-rempli. Sinon, écrivez-nous à ${site.email}.`,
      });
      return;
    }

    setSending(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus({ kind: "ok", text: "Merci ! Votre message est bien parti. On vous répond très vite." });
    } catch {
      setStatus({ kind: "err", text: `L'envoi n'a pas fonctionné. Écrivez-nous directement à ${site.email}.` });
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <input type="hidden" name="_subject" value={`Nouveau projet via ${site.url.replace(/^https?:\/\//, "")}`} />
      {/* Honeypot : masqué aux humains, ignoré des lecteurs d'écran, sans tabindex. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Ne pas remplir
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className={label}>Nom</span>
          <input name="nom" required autoComplete="name" placeholder="Votre nom" className={field} />
        </label>
        <label className="grid gap-2">
          <span className={label}>E-mail</span>
          <input name="email" type="email" required autoComplete="email" placeholder="vous@exemple.com" className={field} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className={label}>Type de projet</span>
          <select name="type_de_projet" required defaultValue="" className={select}>
            <option value="" disabled>
              Choisir…
            </option>
            {projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2">
          <span className={label}>
            Budget envisagé <span className="normal-case tracking-normal text-paper/40">(indicatif)</span>
          </span>
          <select name="budget" defaultValue="" className={select}>
            <option value="">Choisir…</option>
            {budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2">
        <span className={label}>Votre projet</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Votre idée, vos objectifs, vos délais…"
          className={`${field} resize-y`}
        />
      </label>

      <label className="flex items-start gap-3 text-sm text-paper/70">
        <input
          name="consentement"
          type="checkbox"
          required
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-md border-2 border-paper/40 bg-transparent transition-colors checked:border-lime checked:bg-lime checked:bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27none%27 stroke=%27%23141218%27 stroke-width=%273%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27M3 8.5l3 3 7-7%27/%3E%3C/svg%3E')] checked:bg-center checked:bg-no-repeat focus-visible:ring-2 focus-visible:ring-lime/60"
        />
        <span>
          J&apos;accepte que mes informations soient utilisées pour être recontacté au sujet de mon projet. Voir la{" "}
          <Link href="/mentions-legales#donnees" className="underline decoration-lime underline-offset-4 hover:text-lime">
            politique de confidentialité
          </Link>
          .
        </span>
      </label>

      <p
        role="status"
        aria-live="polite"
        className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
          !status ? "hidden" : status.kind === "ok" ? "bg-lime/15 text-lime" : "bg-red-500/15 text-red-200"
        }`}
      >
        {status?.text}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <small className="text-sm text-paper/50">
          Ou écrivez-nous directement :{" "}
          <a href={`mailto:${site.email}`} className="underline decoration-lime underline-offset-4 hover:text-lime">
            {site.email}
          </a>
        </small>
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex items-center justify-center gap-3 rounded-full border-2 border-lime bg-lime px-8 py-4 font-extrabold uppercase text-ink transition-colors hover:bg-transparent hover:text-lime disabled:cursor-wait disabled:opacity-60"
        >
          {sending ? "Envoi…" : "Envoyer"}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </form>
  );
}
