// Tout le contenu éditable du site est ici.
// Modifiez ce fichier pour changer textes, projets, équipe et coordonnées.

export const site = {
  name: "Codexworld",
  tagline: "Agence de développement web & mobile",
  // TODO: remplacer par le vrai nom de domaine (sans / final).
  url: "https://codexworld.site",
  description:
    "Codexworld conçoit et développe des sites web, applications mobiles et plateformes SaaS sur mesure — du design au déploiement.",
  // TODO: remplacer par l'adresse de contact réelle de l'agence.
  email: "contact@codexworld.site",
  socials: [
    { label: "TikTok", href: "https://www.tiktok.com/@codexworld__" },
    // TODO: renseigner les autres réseaux quand ils existent.
  ],
}

// Liens absolus (« /#… ») pour fonctionner aussi depuis les autres pages (404, mentions légales).
export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Projets", href: "/#projets" },
  { label: "Méthode", href: "/#methode" },
  { label: "Équipe", href: "/#equipe" },
]

export const services: {
  title: string;
  text: string;
  tags: string[];
  /** Illustration « spot » du kit (public/img/spots). */
  illustration: string;
}[] = [
  {
    title: "Sites web",
    text: "Sites vitrines, landing pages et sites éditoriaux rapides, élégants, optimisés pour le référencement et faciles à mettre à jour.",
    tags: ["Vitrine", "Landing", "SEO"],
    illustration: "/img/spots/site-web.svg",
  },
  {
    title: "Applications mobiles",
    text: "Apps iOS et Android fluides, avec une seule base de code et une expérience vraiment native, du prototype aux stores.",
    tags: ["React Native", "iOS", "Android"],
    illustration: "/img/spots/app-mobile.svg",
  },
  {
    title: "SaaS & plateformes",
    text: "Comptes utilisateurs, abonnements, tableaux de bord : on bâtit votre logiciel en ligne, solide et prêt à grandir.",
    tags: ["Multi-comptes", "Abonnements", "Dashboard"],
    illustration: "/img/spots/saas.svg",
  },
  {
    title: "E-commerce",
    text: "Boutiques en ligne claires et rassurantes : catalogue, paiement Mobile Money et carte, livraison et back-office simple.",
    tags: ["Catalogue", "Mobile Money", "Livraison"],
    illustration: "/img/spots/e-commerce.svg",
  },
  {
    title: "API & intégrations",
    text: "On connecte vos outils entre eux : paiement, CRM, ERP, automatisations et API sur mesure, documentées.",
    tags: ["REST", "Webhooks", "Automatisation"],
    illustration: "/img/spots/api.svg",
  },
  {
    title: "Maintenance & évolution",
    text: "Mises à jour, sécurité, sauvegardes et nouvelles fonctionnalités : votre projet reste en forme après le lancement.",
    tags: ["Sécurité", "Suivi", "Évolutions"],
    illustration: "/img/spots/maintenance-support.svg",
  },
]

export const projects: {
  title: string;
  category: string;
  year: string;
  text: string;
  color: "violet" | "lime" | "ink" | "paper";
  image?: string;
  href?: string;
  /** Projet sous embargo : cadenas, aucune information ni lien affichés. */
  locked?: boolean;
}[] = [
  {
    title: "Projet en cours",
    category: "Confidentiel",
    year: "2026",
    text: "Projet sous embargo : on vous en dit plus au lancement.",
    color: "ink",
    image: "/img/projets/confidentiel.svg",
    locked: true,
  },
  {
    title: "Kwiyiah Style",
    category: "Haute Couture & E-commerce",
    year: "2026",
    text: "Maison de couture d'exception (Abidjan – Paris) : robes de gala sur-mesure, catalogue raffiné et commandes WhatsApp.",
    color: "violet",
    image: "/img/projets/kwiyiah.webp",
    href: "https://kwiyiah.vercel.app",
  },
  {
    title: "SuccessPrepa",
    category: "EdTech & Plateforme",
    year: "2026",
    text: "Plateforme de préparation aux concours des grandes écoles (INP-HB, ESATIC, CME) avec simulateur IA et mentorat.",
    color: "lime",
    image: "/img/projets/succesprepa.webp",
    href: "https://succesprepa.com",
  },
  {
    title: "Projet en cours",
    category: "Confidentiel",
    year: "2026",
    text: "Projet sous embargo : on vous en dit plus au lancement.",
    color: "paper",
    image: "/img/projets/confidentiel.svg",
    locked: true,
  },
  {
    title: "BFG Moment",
    category: "Production Vidéo & Photo",
    year: "2026",
    text: "Studio de cinématographie et photographie haut de gamme : captation drone 4K, mariages et réservation sur-mesure.",
    color: "ink",
    image: "/img/projets/bfg-moments.jpg",
    href: "https://bfg-moments.vercel.app",
  },
  {
    title: "Peace Magazine",
    category: "E-commerce & Personnalisation",
    year: "2026",
    text: "Boutique en ligne de magazines personnalisés de luxe (24 pages) pour immortaliser les célébrations uniques.",
    color: "violet",
    image: "/img/projets/peacemagazine.webp",
    href: "https://peacemagazine.shop",
  },
  {
    title: "Palm Aura",
    category: "Tourisme & Réservation",
    year: "2026",
    text: "Résidences meublées de prestige à Jacqueville : présentation des villas, réservation en ligne et séjours entre mer et lagune.",
    color: "lime",
    image: "/img/projets/palmaura.jpg",
    href: "https://www.palmaura-residences.com",
  },
  {
    title: "Panbi",
    category: "E-commerce & Personal Shopper",
    year: "2026",
    text: "Service de personal shopper à Abidjan : achat sécurisé en Europe et en Chine, devis ferme en 24-48h et livraison à domicile.",
    color: "ink",
    image: "/img/projets/panbi.webp",
    href: "https://panbi.vercel.app",
  },
];

// Les quatre étapes de la méthode. `at` : progression (0 → 1) du scroll à
// laquelle l'étape s'allume dans la frise.
export const process = [
  {
    title: "Idée",
    text: "On écoute votre projet, vos objectifs et vos contraintes, puis on vous propose un plan clair et un devis.",
    tag: "atelier · devis",
    at: 0.05,
  },
  {
    title: "Design",
    text: "Maquettes, parcours utilisateur et identité visuelle : vous voyez votre produit avant qu'il existe.",
    tag: "UX/UI · prototype",
    at: 0.35,
  },
  {
    title: "Code",
    text: "Développement sur mesure, par petites étapes que vous testez au fur et à mesure.",
    tag: "dev · recette",
    at: 0.62,
  },
  {
    title: "Lancement",
    text: "Mise en ligne, formation et suivi. Votre projet est lancé, et on reste là.",
    tag: "mise en ligne · suivi",
    at: 0.9,
  },
]

export const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "React Native",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "Figma",
  "Vercel",
]

export const founders: {
  name: string
  role: string
  bio: string
  quote?: string
  photo?: string
  initials: string
  tags?: string[]
}[] = [
  {
    name: "Ephrem Kouadio",
    role: "Co-fondateur & Tech Lead · IA & Produit",
    bio: "Co-fondateur de Codexworld, il pilote l'architecture technique, l'intégration IA, l'automatisation, la communication et le produit.",
    quote: "Accompagner chaque vision de l'idée initiale jusqu'à un produit livré avec exigence et finesse.",
    photo: "/img/ephrem-kouadio.jpg",
    initials: "EK",
    tags: [
      "Architecture",
      "Fullstack",
      "Next.js",
      "Performance Cloud",
      "Marketing",
      "IA",
      "Automatisation",
      "Communication",
      "Produit",
      "Design UI/UX",
      "Stratégie",
      "Web & Mobile",
    ],
  },
  {
    name: "Jérémie Kouassi",
    role: "Co-fondateur & Tech Lead · Produit",
    bio: "Co-fondateur de Codexworld, il veille à ce que chaque projet soit solide, rapide, parfaitement conçu et taillé pour scaler.",
    quote: "Bâtir des architectures robustes, ultra-performantes et pensées pour durer et scaler.",
    photo: "/img/jeremie-kouassi.jpg",
    initials: "JK",
    tags: [
      "Architecture",
      "Fullstack",
      "Next.js",
      "Performance Cloud",
      "Produit",
      "Design UI/UX",
      "Stratégie",
      "Web & Mobile",
    ],
  },
]


/* ------------------------------------------------------------ formulaire */

export const projectTypes = [
  "Site web (vitrine, landing page)",
  "Application mobile",
  "Application web",
  "Plateforme SaaS",
  "E-commerce",
  "API & intégrations",
  "Maintenance / refonte",
  "Autre",
]

// Fourchettes indicatives, en francs CFA (XOF).
export const budgets = [
  "Moins de 500 000 FCFA",
  "500 000 – 1 500 000 FCFA",
  "1 500 000 – 4 000 000 FCFA",
  "4 000 000 – 10 000 000 FCFA",
  "Plus de 10 000 000 FCFA",
  "Je ne sais pas encore",
]

/* -------------------------------------------------------- mentions légales */

export const legal = {
  updatedAt: "24 octobre 2026",
  company: {
    tradeName: site.name,
    address: "Abidjan, Côte d'Ivoire",
    phones: ["+225 07 07 11 48 18", "+33 7 75 76 35 79", "+33 7 59 53 57 85"],
    parent: "Peace Agency",
  },
  publisher: { name: "Ephrem Kouadio", role: "co-fondateur" },
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    website: "https://vercel.com",
  },
  dataRetention: "3 ans",
  formProvider: "Formspree",
}
