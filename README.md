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
- **Foule animée** : `components/CrowdCanvas.tsx` (sprite dans `public/img/peeps.png`, illustrations Open Peeps)
- **Couleurs de marque** : `app/globals.css` (`--ink`, `--violet`, `--lime`, `--paper`)

## À compléter

- Photo de Jérémie : `public/img/jeremie-kouassi.jpg`, puis décommenter `photo` dans `content/site.ts`
- Vrais projets (captures dans `public/img/projets/`)
- E-mail de contact et liens réseaux sociaux
