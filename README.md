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

Sans configuration, le bouton « Envoyer » ouvre la messagerie du visiteur avec le message pré-rempli.
Pour recevoir les messages directement par e-mail :

1. Créer un formulaire gratuit sur https://formspree.io (adresse du type `https://formspree.io/f/abcdwxyz`).
2. Définir la variable d'environnement `NEXT_PUBLIC_FORMSPREE_ID=abcdwxyz` (sur Vercel : Settings → Environment Variables).

## À compléter

- Mentions légales : les champs `[entre crochets]` de `legal` dans `content/site.ts` (raison sociale, RCCM, adresse, téléphone…). Un rappel s'affiche sur la page tant qu'il en reste.
- Liens réseaux sociaux (`site.socials` dans `content/site.ts`)
- Identifiant Formspree (voir ci-dessus)
