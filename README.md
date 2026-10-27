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
- **Pages SEO** (services `/services/…`, zones `/agence-web/…`, FAQ de l'accueil) : textes dans `content/seo.ts`, gabarit `components/SeoPage.tsx`
- **Données structurées (JSON-LD)** : `lib/seo.tsx` ; adresse, téléphone et zones desservies dans `content/site.ts` (`site.address`, `site.areaServed`)
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

## Référencement (SEO)

Ce qui est en place :

- Balises `title` / `description` par page (template `%s | Codexworld`), mots-clés, canonical, hreflang `fr` / `fr-CI` / `x-default`, balises `geo.*`, Open Graph et Twitter Card avec image générée (`app/opengraph-image.tsx`).
- Données structurées schema.org : `ProfessionalService` (adresse Abidjan, zones desservies, catalogue de services), `WebSite`, `Service`, `BreadcrumbList`, `FAQPage`.
- Pages de contenu : `/services` (hub), 6 pages services (`/services/creation-site-internet`, `/services/application-mobile`, `/services/plateforme-saas`, `/services/site-e-commerce`, `/services/api-integrations`, `/services/maintenance-refonte`) et 3 pages zones (`/agence-web/abidjan`, `/agence-web/afrique`, `/agence-web/international`).
- `sitemap.xml` (mettre à jour la constante `UPDATED` dans `app/sitemap.ts` quand les textes changent), `robots.txt` (indexation uniquement en production Vercel), `manifest.webmanifest`, icônes.

À faire côté comptes (hors code) :

1. **Google Search Console** : ajouter la propriété `codexworld.site`, choisir la vérification par balise HTML, puis définir sur Vercel la variable `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` avec le code fourni (idem `NEXT_PUBLIC_BING_SITE_VERIFICATION` pour Bing Webmaster Tools). Soumettre `https://codexworld.site/sitemap.xml`.
2. **Google Business Profile** : créer la fiche « Codexworld » (catégorie « Agence de développement web »), adresse Abidjan, téléphone, site, horaires, photos. C'est le levier n° 1 pour « agence web Abidjan ».
3. **Réseaux** : renseigner LinkedIn, Instagram, Facebook, X dans `site.socials` (ils alimentent `sameAs` dans le JSON-LD).
4. **Annuaires & backlinks** : Peace Agency (lien vers Codexworld), annuaires d'entreprises ivoiriens, fiches des projets clients (« Site réalisé par Codexworld » en pied de page des sites livrés).
5. **Contenu** : publier régulièrement (études de cas des projets, articles « combien coûte… », guides Mobile Money). Un dossier `app/blog` peut réutiliser `SeoPage`.
6. Vérifier les données structurées avec https://search.google.com/test/rich-results après mise en ligne.

## À compléter

- Liens réseaux sociaux (`site.socials` dans `content/site.ts`)
- Clé Resend (voir ci-dessus)
