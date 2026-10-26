# Codexworld — site portfolio

Next.js 16 · React 19 · Tailwind CSS 4 · GSAP

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production
```

## Où modifier quoi

- **Textes, services, projets, équipe, e-mail** : `content/site.ts`
- **Hero (mascotte)** : `components/Hero.tsx` (textes et couleurs passés en props)
- **Sections** : `components/Sections.tsx`
- **Méthode (4 étapes, orbite au scroll)** : `components/ProcessOrbit.tsx`, textes dans `content/site.ts`
- **Formulaire de contact** (types de projet, budgets en FCFA) : `components/ContactForm.tsx`, listes dans `content/site.ts`
- **Mentions légales / confidentialité** : `app/mentions-legales/page.tsx`, coordonnées dans `content/site.ts` (`legal`)
- **Page 404** : `app/not-found.tsx`
- **Foule animée** : `components/CrowdCanvas.tsx` (sprite dans `public/img/peeps.png`, illustrations Open Peeps)
- **Kit d'illustrations Codi** : stickers `public/img/codi/*.webp`, spots des services `public/img/spots/*.svg`, motif `public/img/pattern-tile.svg`
- **Couleurs de marque** : `app/globals.css` (`--ink`, `--violet`, `--lime`, `--paper`)

## Formulaire de contact

Le formulaire envoie un e-mail via [Resend](https://resend.com) depuis la route `app/api/contact/route.ts`.
Variables d'environnement à définir sur Vercel (Settings → Environment Variables) :

| Variable         | Valeur (phase temporaire)                              |
| ---------------- | ------------------------------------------------------ |
| `RESEND_API_KEY` | clé API créée sur resend.com (compte ephr.kouadio@gmail.com) |
| `CONTACT_TO`     | `ephr.kouadio@gmail.com`                               |
| `CONTACT_FROM`   | `Codexworld <onboarding@resend.dev>`                   |

Quand le domaine sera actif : vérifier `codexworld.site` dans Resend (Domains), puis passer
`CONTACT_FROM` à `Codexworld <contact@codexworld.site>` et `CONTACT_TO` à l'adresse de l'agence.

Sans `RESEND_API_KEY`, le bouton « Envoyer » ouvre la messagerie du visiteur avec le message pré-rempli.

## À compléter

- Liens réseaux sociaux (`site.socials` dans `content/site.ts`)
- Clé Resend (voir ci-dessus)
