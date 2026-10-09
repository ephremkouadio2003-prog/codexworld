// Tout le contenu éditable du site est ici.
// Modifiez ce fichier pour changer textes, projets, équipe et coordonnées.

export const site = {
  name: "Codexworld",
  tagline: "Agence de développement web & mobile",
  // TODO: remplacer par le vrai nom de domaine (sans / final).
  url: "https://codexworld.com",
  description:
    "Codexworld conçoit et développe des sites web, applications mobiles et plateformes SaaS sur mesure — du design au déploiement.",
  // TODO: remplacer par l'adresse de contact réelle de l'agence.
  email: "contact@codexworld.com",
  socials: [
    // TODO: renseigner les vrais liens.
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
  ],
}

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projets" },
  { label: "Process", href: "#process" },
  { label: "Équipe", href: "#equipe" },
]

export const services = [
  {
    title: "Sites web & vitrines",
    text: "Des sites rapides, élégants et optimisés pour le référencement, qui donnent envie de vous contacter.",
    tags: ["Next.js", "SEO", "CMS"],
  },
  {
    title: "E-commerce",
    text: "Boutiques en ligne pensées pour convertir : catalogue, paiement, livraison et back-office simple.",
    tags: ["Paiement", "Stocks", "Analytics"],
  },
  {
    title: "Applications mobiles",
    text: "Apps iOS et Android fluides, avec une seule base de code et une expérience vraiment native.",
    tags: ["React Native", "iOS", "Android"],
  },
  {
    title: "SaaS & plateformes",
    text: "Tableaux de bord, outils métier et plateformes multi-utilisateurs, solides et prêts à grandir.",
    tags: ["API", "Auth", "Cloud"],
  },
  {
    title: "UI / UX design",
    text: "Maquettes, prototypes et design systems : on dessine l'expérience avant d'écrire une ligne de code.",
    tags: ["Figma", "Prototype", "Design system"],
  },
  {
    title: "Maintenance & évolution",
    text: "Hébergement, mises à jour, nouvelles fonctionnalités : on reste à vos côtés après le lancement.",
    tags: ["Support", "Monitoring", "Évolutions"],
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
}[] = [
  {
    title: "ISITRAFIC",
    category: "Mobilité & Transport",
    year: "2026",
    text: "Plateforme de covoiturage et réservation de bus en Côte d'Ivoire avec paiement Mobile Money et suivi en direct.",
    color: "ink",
    image: "/img/projets/isitrafic.png",
    href: "https://isitrafic.com",
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
    title: "People Connect Become",
    category: "Média & Réseau",
    year: "2026",
    text: "Média digital et réseau humain révélant les talents d'Afrique et de la diaspora via portraits éditoriaux et vidéos.",
    color: "paper",
    image: "/img/projets/pcb.jpg",
    href: "https://www.peopleconnectbecome.com",
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
];

export const process = [
  {
    title: "Découverte",
    text: "On écoute votre besoin, vos objectifs et vos utilisateurs. Vous repartez avec un devis clair.",
  },
  {
    title: "Design",
    text: "Maquettes et prototype cliquable : vous voyez votre produit avant qu'il soit codé.",
  },
  {
    title: "Développement",
    text: "Sprints courts, démos régulières, code propre et testé. Vous suivez l'avancement en direct.",
  },
  {
    title: "Lancement & suivi",
    text: "Mise en ligne, formation, puis maintenance et évolutions au rythme de votre croissance.",
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
}[] = [
  {
    name: "Ephrem Kouadio",
    role: "Co-fondateur",
    bio: "Co-fondateur de Codexworld, il accompagne les clients de l'idée jusqu'au produit livré.",
    quote: "Accompagner chaque projet de l'étincelle initiale jusqu'à un produit livré avec exigence et finesse.",
    photo: "/img/ephrem-kouadio.jpg",
    initials: "EK",
  },
  {
    name: "Jérémie Kouassi",
    role: "Co-fondateur",
    bio: "Co-fondateur de Codexworld, il veille à ce que chaque projet soit solide, rapide et bien construit.",
    quote: "Bâtir des architectures robustes, ultra-performantes et pensées pour durer et scaler.",
    photo: "/img/jeremie-kouassi.jpg",
    initials: "JK",
  },
]

