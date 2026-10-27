// Contenu des pages de référencement (SEO) : pages « services » et pages
// « zones » (Abidjan / Afrique / International), plus la FAQ de l'accueil.
// Chaque page cible une requête précise (ex. « création de site internet
// Abidjan ») avec un contenu réel et différencié, jamais dupliqué.

export type Faq = { q: string; a: string };
export type SeoSection = { title: string; text: string; bullets?: string[] };

export type ServicePage = {
  slug: string;
  /** Nom court (fil d'Ariane, liens internes). */
  name: string;
  /** Titre H1 de la page, avec le mot-clé principal. */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  illustration: string;
  keywords: string[];
  /** Valeur de `serviceType` dans les données structurées schema.org. */
  serviceType: string;
  sections: SeoSection[];
  faq: Faq[];
  /** Slugs des services liés (maillage interne). */
  related: string[];
};

export type ZonePage = {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  keywords: string[];
  /** Zones desservies, déclarées dans `areaServed` (schema.org). */
  areaServed: string[];
  sections: SeoSection[];
  faq: Faq[];
};

/* ----------------------------------------------------------------- services */

export const servicePages: ServicePage[] = [
  {
    slug: "creation-site-internet",
    name: "Création de site internet",
    h1: "Création de site internet à Abidjan, en Côte d'Ivoire et à l'international",
    metaTitle: "Création de site internet à Abidjan (Côte d'Ivoire)",
    metaDescription:
      "Agence de création de site internet à Abidjan : site vitrine, landing page, site professionnel sur mesure, rapide et optimisé SEO. Clients en Côte d'Ivoire, en Afrique et en Europe.",
    eyebrow: "Sites web",
    intro:
      "Un site internet professionnel est la première chose qu'un client, un partenaire ou un investisseur regarde. Codexworld conçoit des sites vitrines, des landing pages et des sites éditoriaux sur mesure, rapides, élégants et pensés pour être trouvés sur Google.",
    illustration: "/img/spots/site-web.svg",
    keywords: [
      "création site internet Abidjan",
      "création site web Côte d'Ivoire",
      "agence création site internet",
      "site vitrine Abidjan",
      "landing page Côte d'Ivoire",
      "développeur site web Abidjan",
      "site internet professionnel Afrique",
    ],
    serviceType: "Création de site internet",
    sections: [
      {
        title: "Quel type de site internet pour votre activité ?",
        text: "Chaque projet commence par une question simple : que doit faire votre site ? Présenter votre entreprise, générer des demandes de devis, vendre, informer ? Nous adaptons la structure, le contenu et les fonctionnalités à cet objectif.",
        bullets: [
          "Site vitrine pour PME, cabinet, commerce, restaurant, hôtel ou résidence meublée",
          "Landing page pour une campagne, un lancement de produit ou une application",
          "Site éditorial ou média avec gestion de contenu simple",
          "Site institutionnel pour association, ONG, école ou institution",
          "Site de réservation (hébergement, événementiel, services)",
        ],
      },
      {
        title: "Un site rapide, mobile et optimisé pour le référencement",
        text: "En Côte d'Ivoire comme dans toute l'Afrique de l'Ouest, l'immense majorité des visites se fait sur smartphone, souvent en 3G ou 4G. Nous construisons des sites légers, qui s'affichent en moins de deux secondes et restent lisibles sur tous les écrans. Chaque page est structurée pour Google : titres, balises, données structurées, sitemap, vitesse de chargement et accessibilité.",
        bullets: [
          "Technologies modernes : Next.js, React, TypeScript, Tailwind CSS",
          "Hébergement performant avec réseau de diffusion mondial (CDN)",
          "Référencement naturel (SEO) intégré dès la conception",
          "Nom de domaine .ci, .com ou .africa, certificat HTTPS, e-mails professionnels",
          "Intégration WhatsApp Business, Google Maps, formulaires et prise de rendez-vous",
        ],
      },
      {
        title: "Comment se déroule la création de votre site ?",
        text: "Nous travaillons en quatre étapes : atelier et devis, maquettes, développement, mise en ligne. Vous validez chaque étape et vous voyez votre site prendre forme. À la livraison, nous vous formons pour mettre à jour vos textes et vos images vous-même, et nous restons disponibles pour la maintenance.",
      },
      {
        title: "Combien coûte un site internet à Abidjan ?",
        text: "Le prix dépend du nombre de pages, du design et des fonctionnalités. Une landing page ou un site vitrine simple démarre sous 500 000 FCFA ; un site professionnel complet avec design sur mesure, blog et réservation se situe généralement entre 500 000 et 1 500 000 FCFA. Nous envoyons un devis clair et détaillé après un premier échange, sans engagement. Pour les clients hors Côte d'Ivoire, nous facturons en euros ou en dollars.",
      },
    ],
    faq: [
      {
        q: "Combien de temps faut-il pour créer un site internet ?",
        a: "Comptez deux à trois semaines pour une landing page ou un site vitrine, quatre à huit semaines pour un site complet avec design sur mesure. Le délai dépend surtout de la rapidité avec laquelle vous nous transmettez vos contenus (textes, photos, logo).",
      },
      {
        q: "Est-ce que je pourrai modifier mon site moi-même ?",
        a: "Oui. Selon votre besoin, nous intégrons un outil de gestion de contenu simple pour que vous puissiez changer vos textes, images et actualités sans toucher au code. Nous vous formons à la livraison.",
      },
      {
        q: "Mon site sera-t-il visible sur Google ?",
        a: "Nous appliquons les bonnes pratiques de référencement dès la conception : structure des pages, balises, vitesse, version mobile, sitemap et données structurées. Nous pouvons aussi vous accompagner sur la rédaction de contenu et la fiche Google Business Profile pour le référencement local à Abidjan.",
      },
      {
        q: "Vous occupez-vous du nom de domaine et de l'hébergement ?",
        a: "Oui. Nous réservons votre nom de domaine (.ci, .com, .africa…), configurons l'hébergement, le certificat HTTPS et les adresses e-mail professionnelles. Vous restez propriétaire de votre domaine.",
      },
      {
        q: "Travaillez-vous avec des clients hors d'Abidjan ?",
        a: "Oui. Nous accompagnons des clients dans toute la Côte d'Ivoire (Bouaké, Yamoussoukro, San-Pédro, Korhogo…), en Afrique francophone et en Europe. Les échanges se font par visioconférence, WhatsApp et e-mail.",
      },
    ],
    related: ["site-e-commerce", "maintenance-refonte", "plateforme-saas"],
  },
  {
    slug: "application-mobile",
    name: "Application mobile",
    h1: "Développement d'application mobile iOS et Android à Abidjan",
    metaTitle: "Développement d'application mobile iOS & Android à Abidjan",
    metaDescription:
      "Agence de développement d'applications mobiles à Abidjan, Côte d'Ivoire : apps iOS et Android en React Native, publiées sur l'App Store et Google Play. Startups et entreprises en Afrique et à l'international.",
    eyebrow: "Applications mobiles",
    intro:
      "Du prototype aux stores, Codexworld développe des applications mobiles fluides et vraiment natives pour iOS et Android, avec une seule base de code. Idéal pour les startups, les services de livraison, la fintech, l'éducation, la santé ou la gestion interne d'une entreprise.",
    illustration: "/img/spots/app-mobile.svg",
    keywords: [
      "développement application mobile Abidjan",
      "création application mobile Côte d'Ivoire",
      "développeur React Native Abidjan",
      "application Android iOS Afrique",
      "agence mobile Afrique francophone",
      "développement app startup Abidjan",
    ],
    serviceType: "Développement d'application mobile",
    sections: [
      {
        title: "Une application, deux plateformes",
        text: "Nous utilisons React Native et Expo, la technologie choisie par des acteurs comme Shopify ou Discord, pour livrer une application iOS et Android à partir d'un code unique. Vous réduisez les coûts et les délais sans sacrifier la qualité : animations fluides, notifications push, caméra, géolocalisation, paiement et mode hors ligne.",
        bullets: [
          "Applications grand public : livraison, VTC, marketplace, réservation, médias",
          "Fintech et Mobile Money : portefeuille, transferts, épargne, paiement marchand",
          "EdTech : cours, quiz, préparation aux concours, suivi des apprenants",
          "Applications métier : gestion de terrain, agents commerciaux, inventaire, CRM mobile",
          "Santé, agriculture, logistique, immobilier",
        ],
      },
      {
        title: "Pensée pour les réalités du terrain",
        text: "En Côte d'Ivoire et en Afrique, une bonne application doit fonctionner sur des téléphones Android d'entrée de gamme, consommer peu de données et résister aux coupures de réseau. Nous optimisons la taille de l'application, mettons en cache les données et intégrons les moyens de paiement locaux (Orange Money, MTN MoMo, Wave, Moov Money) via des agrégateurs comme CinetPay ou PayDunya, ainsi que les cartes bancaires et Stripe pour l'international.",
      },
      {
        title: "Backend, API et tableau de bord inclus",
        text: "Une application mobile ne vit pas seule. Nous construisons l'API, la base de données, l'authentification (téléphone, e-mail, réseaux sociaux) et le tableau de bord d'administration qui vous permet de suivre vos utilisateurs, vos commandes et vos paiements. Nous nous occupons aussi de la publication sur l'App Store et Google Play et du respect de leurs règles.",
      },
      {
        title: "Combien coûte une application mobile ?",
        text: "Un MVP (version minimale pour tester le marché) se situe généralement entre 1 500 000 et 4 000 000 FCFA. Une application complète avec paiement, backend, administration et notifications se situe entre 4 000 000 et 10 000 000 FCFA ou plus selon le périmètre. Nous découpons le projet en étapes pour que vous puissiez lancer vite et investir progressivement.",
      },
    ],
    faq: [
      {
        q: "Faut-il choisir entre iOS et Android ?",
        a: "Non. Avec React Native, nous livrons les deux versions à partir d'un seul code. En Côte d'Ivoire, Android représente l'essentiel du marché, mais iOS reste indispensable pour la diaspora, les cadres et les clients en Europe ou en Amérique du Nord.",
      },
      {
        q: "Pouvez-vous intégrer Orange Money, MTN MoMo ou Wave ?",
        a: "Oui. Nous intégrons les paiements Mobile Money via des agrégateurs reconnus (CinetPay, PayDunya, Flutterwave…) ou directement via les API des opérateurs quand vous disposez d'un compte marchand.",
      },
      {
        q: "Publiez-vous l'application sur les stores ?",
        a: "Oui, nous créons ou utilisons vos comptes développeur Apple et Google, préparons les captures d'écran, les descriptions et gérons la soumission et les éventuels retours de validation.",
      },
      {
        q: "Que se passe-t-il après le lancement ?",
        a: "Nous proposons un contrat de maintenance : mises à jour iOS et Android, corrections, surveillance des erreurs, sauvegardes et évolutions fonctionnelles.",
      },
      {
        q: "Pouvez-vous reprendre une application existante ?",
        a: "Oui. Nous auditons le code existant, puis nous proposons soit une reprise et une stabilisation, soit une refonte progressive si la base n'est plus maintenable.",
      },
    ],
    related: ["plateforme-saas", "api-integrations", "site-e-commerce"],
  },
  {
    slug: "plateforme-saas",
    name: "Plateforme SaaS",
    h1: "Développement de plateforme SaaS et d'application web sur mesure",
    metaTitle: "Développement SaaS & application web sur mesure en Afrique",
    metaDescription:
      "Codexworld développe des plateformes SaaS et applications web sur mesure depuis Abidjan : comptes utilisateurs, abonnements, tableaux de bord, API. Pour startups et entreprises en Afrique et à l'international.",
    eyebrow: "SaaS & plateformes",
    intro:
      "Vous avez une idée de logiciel en ligne, un processus métier à digitaliser ou un fichier Excel qui ne tient plus la charge ? Nous concevons des plateformes web solides, sécurisées et prêtes à grandir : gestion multi-comptes, abonnements, tableaux de bord et automatisations.",
    illustration: "/img/spots/saas.svg",
    keywords: [
      "développement SaaS Afrique",
      "développement application web Abidjan",
      "plateforme web sur mesure Côte d'Ivoire",
      "logiciel en ligne entreprise Abidjan",
      "startup SaaS Afrique francophone",
      "développeur Next.js Abidjan",
    ],
    serviceType: "Développement de plateforme SaaS",
    sections: [
      {
        title: "Des plateformes pour tous les secteurs",
        text: "Nous avons développé des plateformes de préparation aux concours, de réservation, de commande personnalisée et des outils internes. Le point commun : des utilisateurs qui se connectent, des données à sécuriser et des processus à automatiser.",
        bullets: [
          "Plateformes EdTech : cours en ligne, quiz, mentorat, suivi de progression",
          "Gestion d'entreprise : facturation, stocks, RH, suivi de projets, CRM",
          "Marketplaces et plateformes de mise en relation (B2B, B2C, services)",
          "Portails clients, espaces membres, extranets",
          "Outils de gestion pour immobilier, santé, logistique, agriculture, microfinance",
        ],
      },
      {
        title: "Une architecture pensée pour durer et scaler",
        text: "Nous utilisons une stack moderne et éprouvée : Next.js et React pour l'interface, Node.js et PostgreSQL pour le serveur et les données, hébergement cloud avec sauvegardes automatiques. L'authentification, les rôles et permissions, la facturation récurrente et l'intégration à vos outils existants sont prévus dès le départ.",
        bullets: [
          "Comptes multi-utilisateurs et multi-organisations (multi-tenant)",
          "Abonnements et paiement récurrent (Mobile Money, carte bancaire, Stripe)",
          "Tableaux de bord et exports (PDF, Excel), rapports automatiques",
          "Intégration IA : assistants, génération de contenu, classification, recherche intelligente",
          "Sécurité : chiffrement, journaux d'audit, conformité à la loi ivoirienne sur les données personnelles et au RGPD",
        ],
      },
      {
        title: "Du MVP à la version 10",
        text: "Nous commençons par une version minimale centrée sur votre cœur de métier pour la mettre entre les mains de vrais utilisateurs rapidement. Ensuite, nous itérons par cycles courts : chaque version est testée, mesurée et améliorée. Vous gardez la propriété complète du code source et des données.",
      },
      {
        title: "Budget et modèle de collaboration",
        text: "Une plateforme SaaS se situe généralement entre 4 000 000 et 10 000 000 FCFA pour un MVP et au-delà pour un produit complet. Nous travaillons au forfait par étape ou en équipe dédiée mensuelle pour les startups qui ont besoin d'une équipe technique sur la durée (CTO externalisé).",
      },
    ],
    faq: [
      {
        q: "Qu'est-ce qu'un SaaS ?",
        a: "Un SaaS (Software as a Service) est un logiciel accessible en ligne, par abonnement, sans installation. Vos clients ou vos équipes se connectent depuis un navigateur ou une application mobile, et vous faites évoluer le produit en continu.",
      },
      {
        q: "Serai-je propriétaire du code ?",
        a: "Oui. À chaque livraison, le code source vous est transmis et vous en êtes propriétaire. Vous pouvez le confier à une autre équipe à tout moment.",
      },
      {
        q: "Pouvez-vous accompagner une startup qui n'a pas encore de CTO ?",
        a: "Oui. Nous jouons le rôle d'équipe technique externalisée : choix d'architecture, développement, mise en production, suivi des coûts d'hébergement et recrutement de vos futurs développeurs si besoin.",
      },
      {
        q: "Où sont hébergées les données ?",
        a: "Par défaut sur des infrastructures cloud en Europe ou aux États-Unis (Vercel, AWS, Google Cloud…), avec sauvegardes chiffrées. Si votre secteur l'exige, nous étudions un hébergement souverain ou local.",
      },
      {
        q: "Intégrez-vous l'intelligence artificielle ?",
        a: "Oui, lorsque cela apporte une vraie valeur : assistant conversationnel, génération ou résumé de documents, classification automatique, recherche sémantique, simulateur d'entraînement… Nous intégrons les meilleurs modèles du marché via API.",
      },
    ],
    related: ["application-mobile", "api-integrations", "creation-site-internet"],
  },
  {
    slug: "site-e-commerce",
    name: "Site e-commerce",
    h1: "Création de site e-commerce avec paiement Mobile Money et carte bancaire",
    metaTitle: "Création de site e-commerce à Abidjan, paiement Mobile Money",
    metaDescription:
      "Création de boutique en ligne à Abidjan et en Côte d'Ivoire : catalogue, paiement Orange Money, MTN MoMo, Wave et carte bancaire, livraison, back-office simple. Vendez en Afrique et à l'international.",
    eyebrow: "E-commerce",
    intro:
      "Vendre en ligne en Côte d'Ivoire a ses propres règles : paiement Mobile Money, commande par WhatsApp, livraison par coursier et confiance à construire. Codexworld crée des boutiques en ligne claires, rassurantes et adaptées aux habitudes d'achat locales, tout en restant ouvertes à la clientèle internationale.",
    illustration: "/img/spots/e-commerce.svg",
    keywords: [
      "création site e-commerce Abidjan",
      "boutique en ligne Côte d'Ivoire",
      "site e-commerce Mobile Money",
      "paiement Orange Money site web",
      "vendre en ligne Abidjan",
      "e-commerce Afrique francophone",
    ],
    serviceType: "Création de site e-commerce",
    sections: [
      {
        title: "Une boutique adaptée à votre façon de vendre",
        text: "Mode, cosmétiques, alimentation, électronique, artisanat, produits personnalisés ou services : nous construisons le parcours d'achat qui convient à votre clientèle, du catalogue au suivi de commande.",
        bullets: [
          "Catalogue produits avec variantes (tailles, couleurs), stocks et promotions",
          "Paiement Mobile Money (Orange Money, MTN MoMo, Wave, Moov Money), carte bancaire, paiement à la livraison",
          "Commande et conseil par WhatsApp intégrés",
          "Livraison : zones d'Abidjan, intérieur du pays, expédition internationale",
          "Back-office simple pour gérer commandes, produits et clients depuis votre téléphone",
        ],
      },
      {
        title: "Sur mesure ou Shopify / WooCommerce ?",
        text: "Pour une boutique standard avec un budget limité, nous pouvons configurer Shopify ou WooCommerce et y brancher les paiements locaux. Pour une expérience de marque forte, un catalogue complexe, de la personnalisation de produit ou de gros volumes, nous développons une boutique sur mesure en Next.js, plus rapide, mieux référencée et sans abonnement mensuel contraignant.",
      },
      {
        title: "Vendre à l'international depuis Abidjan",
        text: "Diaspora, clients européens, acheteurs d'Afrique de l'Ouest : votre boutique peut afficher les prix en FCFA, en euros et en dollars, accepter les cartes internationales via Stripe ou PayPal et calculer les frais d'expédition DHL ou poste. Nous gérons aussi la traduction du site en anglais si votre marché l'exige.",
      },
      {
        title: "Référencement et conversion",
        text: "Une boutique ne sert à rien sans visiteurs. Chaque fiche produit est structurée pour Google Shopping et la recherche (données structurées Product, images optimisées, pages catégories), et nous mettons en place les pixels Meta et TikTok ainsi que Google Analytics pour mesurer vos campagnes.",
      },
    ],
    faq: [
      {
        q: "Combien coûte un site e-commerce en Côte d'Ivoire ?",
        a: "Une boutique sur Shopify ou WooCommerce configurée et habillée à votre marque démarre autour de 500 000 FCFA. Une boutique sur mesure avec paiement Mobile Money, livraison et back-office se situe généralement entre 1 500 000 et 4 000 000 FCFA.",
      },
      {
        q: "Comment accepter Orange Money ou Wave sur mon site ?",
        a: "Nous intégrons un agrégateur de paiement (CinetPay, PayDunya, Flutterwave…) qui regroupe Orange Money, MTN MoMo, Wave, Moov Money et les cartes bancaires. Vous ouvrez un compte marchand, nous faisons le reste.",
      },
      {
        q: "Puis-je gérer ma boutique depuis mon téléphone ?",
        a: "Oui. Le back-office est conçu pour mobile : ajout de produits, validation de commandes, suivi des livraisons et des paiements depuis votre smartphone.",
      },
      {
        q: "Faut-il un registre de commerce pour vendre en ligne ?",
        a: "Pour accepter les paiements électroniques via un agrégateur, un statut d'entreprise (entreprise individuelle, SARL…) est en général demandé. Nous vous orientons sur les démarches, mais nous ne sommes pas un cabinet juridique.",
      },
      {
        q: "Pouvez-vous migrer ma boutique existante ?",
        a: "Oui. Nous reprenons vos produits, clients et commandes depuis Shopify, WooCommerce, Wix ou un fichier Excel, et nous mettons en place les redirections pour conserver votre référencement.",
      },
    ],
    related: ["creation-site-internet", "application-mobile", "api-integrations"],
  },
  {
    slug: "api-integrations",
    name: "API & intégrations",
    h1: "Développement d'API et intégrations : connectez vos outils entre eux",
    metaTitle: "Développement d'API, intégrations et automatisation",
    metaDescription:
      "Développement d'API sur mesure, intégration de paiement (Mobile Money, Stripe), CRM, ERP et automatisations depuis Abidjan. Faites communiquer vos outils et gagnez du temps.",
    eyebrow: "API & intégrations",
    intro:
      "Vos outils ne se parlent pas ? Vos équipes ressaisissent les mêmes données dans trois logiciels ? Nous développons des API documentées et des intégrations fiables qui connectent paiement, CRM, ERP, messagerie et automatisations, pour que l'information circule sans effort.",
    illustration: "/img/spots/api.svg",
    keywords: [
      "développement API Abidjan",
      "intégration API paiement Mobile Money",
      "intégration CRM ERP Côte d'Ivoire",
      "automatisation entreprise Abidjan",
      "webhooks intégration",
      "API REST sur mesure",
    ],
    serviceType: "Développement d'API et intégrations",
    sections: [
      {
        title: "Ce que nous intégrons le plus souvent",
        text: "Nous avons l'habitude des API des opérateurs et agrégateurs africains comme des grands services internationaux.",
        bullets: [
          "Paiement : CinetPay, PayDunya, Flutterwave, Orange Money, MTN MoMo, Wave, Stripe, PayPal",
          "Messagerie : WhatsApp Business API, SMS (Orange, Twilio), e-mails transactionnels",
          "CRM et vente : HubSpot, Zoho, Pipedrive, Salesforce",
          "Gestion : ERP, comptabilité, facturation, Google Workspace, Microsoft 365",
          "Données : synchronisation entre bases, import/export, tableaux de bord",
        ],
      },
      {
        title: "Des API sur mesure, documentées et sécurisées",
        text: "Quand vous devez exposer vos propres services à des partenaires, une application mobile ou des revendeurs, nous concevons une API REST propre : authentification par clés ou OAuth, limitation de débit, journalisation, versions et documentation interactive (OpenAPI/Swagger). Vos partenaires s'intègrent en quelques heures, pas en quelques semaines.",
      },
      {
        title: "Automatisation et intelligence artificielle",
        text: "Génération automatique de factures, relances de paiement, synchronisation de stock, alertes WhatsApp, tri de demandes entrantes par IA, rapports hebdomadaires envoyés tout seuls : nous automatisons les tâches répétitives avec des workflows robustes (n8n, Make, scripts sur mesure) et des modèles d'IA quand ils apportent une vraie valeur.",
      },
    ],
    faq: [
      {
        q: "Qu'est-ce qu'une API ?",
        a: "Une API (interface de programmation) permet à deux logiciels d'échanger des données automatiquement. Par exemple, votre site envoie une commande à votre logiciel de facturation, qui renvoie la facture au client par e-mail, sans intervention humaine.",
      },
      {
        q: "Pouvez-vous intégrer un paiement Mobile Money sur un site existant ?",
        a: "Oui, quel que soit le site (WordPress, Shopify, sur mesure). Nous branchons un agrégateur ou l'API de l'opérateur et gérons les notifications de paiement (webhooks) pour mettre à jour vos commandes en temps réel.",
      },
      {
        q: "Comment facturez-vous une intégration ?",
        a: "Au forfait après un court audit de vos outils. Une intégration simple (paiement, formulaire vers CRM) se chiffre en quelques jours de travail ; un projet d'API complet se découpe en étapes avec un devis par étape.",
      },
      {
        q: "Qui maintient l'intégration dans le temps ?",
        a: "Les API évoluent. Nous proposons un suivi avec surveillance des erreurs et mises à jour lorsque les services tiers changent, dans le cadre d'un contrat de maintenance.",
      },
    ],
    related: ["plateforme-saas", "site-e-commerce", "maintenance-refonte"],
  },
  {
    slug: "maintenance-refonte",
    name: "Maintenance & refonte",
    h1: "Maintenance, refonte et évolution de site web ou d'application",
    metaTitle: "Maintenance et refonte de site web ou d'application",
    metaDescription:
      "Maintenance de site web et d'application à Abidjan : mises à jour, sécurité, sauvegardes, correction de bugs, amélioration de vitesse et refonte de site ancien. Suivi mensuel pour entreprises en Afrique et en Europe.",
    eyebrow: "Maintenance & évolution",
    intro:
      "Un site lent, un formulaire qui ne fonctionne plus, une application que personne ne met à jour, un prestataire qui ne répond plus : nous reprenons votre projet, le sécurisons et le faisons évoluer. Et pour les projets que nous livrons, nous restons là après la mise en ligne.",
    illustration: "/img/spots/maintenance-support.svg",
    keywords: [
      "maintenance site web Abidjan",
      "refonte site internet Côte d'Ivoire",
      "mise à jour site web",
      "sécurité site WordPress",
      "reprise projet web",
      "amélioration vitesse site",
    ],
    serviceType: "Maintenance et refonte de site web",
    sections: [
      {
        title: "Maintenance mensuelle : votre projet reste en forme",
        text: "Un contrat de maintenance couvre tout ce qu'il faut pour que votre site ou votre application reste rapide, sûr et à jour.",
        bullets: [
          "Mises à jour de sécurité (framework, dépendances, extensions, serveur)",
          "Sauvegardes automatiques et plan de restauration",
          "Surveillance de disponibilité et des erreurs, alertes",
          "Corrections de bugs et petites évolutions comprises dans le forfait",
          "Rapport mensuel : trafic, performance, incidents traités",
        ],
      },
      {
        title: "Refonte : repartir sur de bonnes bases",
        text: "Votre site date de plusieurs années, n'est pas adapté au mobile, se charge lentement ou ne reflète plus votre marque ? Nous auditons l'existant (contenu, référencement, technique), puis nous proposons une refonte qui conserve ce qui fonctionne, notamment vos positions Google grâce à un plan de redirections, et modernise le reste : design, vitesse, accessibilité, outils de gestion.",
      },
      {
        title: "Reprise de projet et audit technique",
        text: "Nous reprenons régulièrement des sites WordPress, des boutiques Shopify, des applications Laravel, Django, React ou React Native développés par d'autres. L'audit initial, livré sous forme de rapport clair, vous indique l'état réel du projet, les risques de sécurité et les actions prioritaires, sans jargon.",
      },
    ],
    faq: [
      {
        q: "Combien coûte la maintenance d'un site web ?",
        a: "Nos forfaits de maintenance mensuels démarrent à quelques dizaines de milliers de FCFA pour un site vitrine et évoluent selon la complexité (e-commerce, application, SaaS). Le devis précise exactement ce qui est inclus.",
      },
      {
        q: "Pouvez-vous reprendre un site fait par un autre prestataire ?",
        a: "Oui, c'est fréquent. Nous demandons les accès (hébergement, domaine, code), nous réalisons un audit, puis nous vous proposons une reprise ou une refonte selon l'état du projet.",
      },
      {
        q: "Une refonte va-t-elle faire perdre mon référencement ?",
        a: "Pas si elle est bien menée. Nous conservons les URL qui fonctionnent, mettons en place des redirections 301 pour celles qui changent, et vérifions l'indexation après la mise en ligne via Google Search Console.",
      },
      {
        q: "Intervenez-vous en urgence ?",
        a: "Oui, pour un site piraté, hors ligne ou un paiement qui ne fonctionne plus, nous intervenons rapidement, en priorité pour nos clients sous contrat de maintenance.",
      },
    ],
    related: ["creation-site-internet", "site-e-commerce", "api-integrations"],
  },
];

/* -------------------------------------------------------------------- zones */

export const zonePages: ZonePage[] = [
  {
    slug: "abidjan",
    name: "Abidjan · Côte d'Ivoire",
    h1: "Agence web à Abidjan, Côte d'Ivoire",
    metaTitle: "Agence web à Abidjan, Côte d'Ivoire : sites, applis & SaaS",
    metaDescription:
      "Codexworld, agence web et mobile basée à Abidjan : création de site internet, application mobile, e-commerce Mobile Money et plateforme SaaS pour les entreprises et startups de Côte d'Ivoire.",
    eyebrow: "Côte d'Ivoire",
    intro:
      "Codexworld est une agence de développement web et mobile fondée à Abidjan par deux ingénieurs ivoiriens. Nous accompagnons les PME, startups, commerces, écoles, cabinets et institutions de Côte d'Ivoire dans la création de leurs outils numériques : site internet, application mobile, boutique en ligne et logiciel sur mesure.",
    keywords: [
      "agence web Abidjan",
      "agence digitale Abidjan",
      "agence web Côte d'Ivoire",
      "création site internet Abidjan",
      "développeur web Abidjan",
      "agence développement mobile Abidjan",
      "agence web Cocody Plateau Marcory",
    ],
    areaServed: ["Abidjan", "Côte d'Ivoire"],
    sections: [
      {
        title: "Une agence qui connaît le marché ivoirien",
        text: "Paiement par Orange Money, MTN MoMo ou Wave, commande par WhatsApp, visiteurs sur smartphone en 4G, nom de domaine .ci, obligations de l'ARTCI en matière de données personnelles : nous concevons des produits adaptés aux usages réels des Ivoiriens, pas des copies de sites européens.",
        bullets: [
          "Intégration des moyens de paiement locaux via CinetPay, PayDunya ou les API opérateurs",
          "Sites et applications légers, rapides même en connexion mobile limitée",
          "Rédaction en français, et en anglais pour les clients internationaux",
          "Conformité à la loi ivoirienne n° 2013-450 sur la protection des données",
          "Facturation en FCFA, devis détaillé et contrat clair",
        ],
      },
      {
        title: "Nos services à Abidjan",
        text: "Nous intervenons dans toutes les communes d'Abidjan (Cocody, Plateau, Marcory, Treichville, Yopougon, Abobo, Koumassi, Port-Bouët, Bingerville…) et dans les autres villes de Côte d'Ivoire : Yamoussoukro, Bouaké, San-Pédro, Korhogo, Daloa, Man. Les rendez-vous se font sur place à Abidjan ou en visioconférence.",
        bullets: [
          "Création de site internet vitrine, landing page et site institutionnel",
          "Développement d'application mobile iOS et Android",
          "Création de boutique en ligne avec paiement Mobile Money",
          "Développement de plateforme SaaS et logiciel de gestion",
          "API, intégrations, automatisation et intelligence artificielle",
          "Maintenance, refonte et reprise de projet",
        ],
      },
      {
        title: "Pour qui travaillons-nous ?",
        text: "Startups en phase de lancement, PME qui veulent digitaliser leur activité, commerces et maisons de couture qui vendent en ligne, résidences et hôtels qui prennent des réservations, écoles et plateformes de formation, studios créatifs, associations et ONG. Nos réalisations récentes incluent une plateforme de préparation aux concours des grandes écoles ivoiriennes, une maison de haute couture entre Abidjan et Paris et un service de personal shopper à Abidjan.",
      },
      {
        title: "Filiale de Peace Agency",
        text: "Codexworld est la filiale technologique de Peace Agency. Cette appartenance nous permet de proposer, au-delà du développement, un accompagnement en communication, image de marque et contenu pour lancer votre produit dans de bonnes conditions.",
      },
    ],
    faq: [
      {
        q: "Où se trouve votre agence à Abidjan ?",
        a: "Nous sommes basés à Abidjan et travaillons principalement à distance, avec des rendez-vous sur place selon les besoins. Contactez-nous par e-mail, WhatsApp ou via le formulaire pour convenir d'un échange.",
      },
      {
        q: "Quel est le prix d'un site internet à Abidjan ?",
        a: "Un site vitrine démarre sous 500 000 FCFA, un site professionnel complet entre 500 000 et 1 500 000 FCFA, une boutique en ligne ou une application mobile à partir de 1 500 000 FCFA. Chaque devis est établi après un échange sur votre projet.",
      },
      {
        q: "Acceptez-vous les paiements en plusieurs fois ?",
        a: "Oui. Nous découpons le projet en étapes (atelier, design, développement, lancement) et chaque étape est facturée à sa validation. Vous ne payez jamais tout d'avance.",
      },
      {
        q: "Travaillez-vous avec les startups ivoiriennes en phase d'amorçage ?",
        a: "Oui. Nous proposons des MVP (versions minimales) pour tester le marché rapidement et un accompagnement technique sur la durée, utile pour les dossiers d'incubateurs et de levée de fonds.",
      },
    ],
  },
  {
    slug: "afrique",
    name: "Afrique",
    h1: "Agence de développement web et mobile en Afrique francophone",
    metaTitle: "Agence web & mobile en Afrique francophone",
    metaDescription:
      "Depuis Abidjan, Codexworld développe sites internet, applications mobiles et plateformes SaaS pour les entreprises et startups d'Afrique francophone : Sénégal, Cameroun, Bénin, Togo, Mali, Burkina Faso, Gabon, RDC…",
    eyebrow: "Afrique",
    intro:
      "Les défis du numérique sont partagés d'un pays africain à l'autre : paiement mobile, connexions variables, clientèle jeune et équipée en smartphones, diaspora à toucher. Depuis Abidjan, nous travaillons avec des clients de toute l'Afrique francophone, et au-delà, qui veulent une équipe technique proche de leur réalité.",
    keywords: [
      "agence web Afrique",
      "agence digitale Afrique francophone",
      "développement application mobile Afrique",
      "agence web Dakar Sénégal",
      "agence web Douala Cameroun",
      "agence web Cotonou Bénin",
      "agence web Lomé Togo",
      "développeur SaaS Afrique de l'Ouest",
    ],
    areaServed: [
      "Côte d'Ivoire",
      "Sénégal",
      "Cameroun",
      "Bénin",
      "Togo",
      "Mali",
      "Burkina Faso",
      "Niger",
      "Guinée",
      "Gabon",
      "Congo",
      "République démocratique du Congo",
      "Maroc",
      "Tunisie",
      "Afrique",
    ],
    sections: [
      {
        title: "Une expertise des paiements et des usages africains",
        text: "Chaque pays a ses opérateurs et ses agrégateurs : Orange Money et Wave au Sénégal, MTN et Orange au Cameroun, MTN MoMo et Moov au Bénin et au Togo, M-Pesa en Afrique de l'Est. Nous intégrons ces moyens de paiement et concevons des interfaces pensées pour le mobile d'abord, avec des données légères et un mode hors ligne quand c'est nécessaire.",
        bullets: [
          "Paiements : Orange Money, Wave, MTN MoMo, Moov Money, M-Pesa, cartes, via CinetPay, PayDunya, Flutterwave, Paystack",
          "SMS et WhatsApp Business intégrés aux parcours clients",
          "Multi-devises (XOF, XAF, EUR, USD, MAD…) et multilingue français/anglais",
          "Hébergement avec réseau de diffusion mondial pour des temps de chargement rapides sur tout le continent",
        ],
      },
      {
        title: "Nos domaines d'intervention",
        text: "Nous accompagnons des projets dans les secteurs qui portent la croissance du continent.",
        bullets: [
          "Fintech et Mobile Money : portefeuilles, paiement marchand, microfinance, tontines digitales",
          "EdTech : plateformes de cours, préparation aux concours, e-learning pour entreprises",
          "E-commerce et logistique : marketplaces, livraison, gestion de flotte",
          "AgriTech, santé, immobilier, tourisme, médias",
          "Outils internes pour PME, groupes et institutions",
        ],
      },
      {
        title: "Travailler avec nous depuis Dakar, Douala, Cotonou ou Kinshasa",
        text: "Nous partageons les mêmes fuseaux horaires (GMT à GMT+2), la même langue et souvent les mêmes contraintes. Les ateliers se tiennent en visioconférence, le suivi se fait par WhatsApp et un espace projet partagé, et vous testez chaque version sur votre téléphone au fur et à mesure. Les devis sont émis en FCFA, en euros ou en dollars selon votre préférence.",
      },
      {
        title: "Pourquoi une agence basée en Afrique ?",
        text: "Travailler avec une équipe qui vit vos réalités change tout : nous savons qu'un formulaire doit accepter un numéro de téléphone sans e-mail, qu'une application doit peser moins de 30 Mo, qu'un client veut parler à un humain sur WhatsApp avant de payer. Et nos tarifs restent compétitifs par rapport aux agences européennes, à qualité technique égale.",
      },
    ],
    faq: [
      {
        q: "Travaillez-vous avec des clients hors Côte d'Ivoire ?",
        a: "Oui. Nous accompagnons des clients au Sénégal, au Cameroun, au Bénin, au Togo, au Mali, au Burkina Faso, au Gabon, en RDC, au Maroc et dans d'autres pays d'Afrique. Tout se fait à distance, avec des déplacements possibles pour les projets importants.",
      },
      {
        q: "Comment se passent la facturation et le paiement ?",
        a: "Nous facturons en FCFA, en euros ou en dollars. Le règlement se fait par virement bancaire, Mobile Money (Orange Money, Wave, MTN MoMo) ou carte bancaire, par étapes du projet.",
      },
      {
        q: "Pouvez-vous intégrer les paiements de mon pays ?",
        a: "Dans la grande majorité des cas, oui, via des agrégateurs panafricains (CinetPay, PayDunya, Flutterwave, Paystack) ou les API des opérateurs. Nous vérifions la disponibilité lors de l'atelier initial.",
      },
      {
        q: "Proposez-vous des sites en anglais ?",
        a: "Oui. Nous livrons des sites et applications bilingues français/anglais, et dans d'autres langues sur demande, pour les pays anglophones ou les marchés internationaux.",
      },
    ],
  },
  {
    slug: "international",
    name: "International",
    h1: "Agence de développement web et mobile pour vos projets à l'international",
    metaTitle: "Agence de développement web & mobile à l'international",
    metaDescription:
      "Codexworld développe sites web, applications mobiles et plateformes SaaS pour des clients en France, en Europe, au Canada et pour la diaspora africaine, depuis Abidjan. Qualité d'agence, tarifs compétitifs, échanges en français.",
    eyebrow: "International",
    intro:
      "Entreprise en France, en Belgique, en Suisse ou au Canada, entrepreneur de la diaspora qui lance un projet entre deux continents, startup qui cherche une équipe technique francophone fiable : Codexworld développe vos produits numériques avec le niveau d'exigence d'une agence européenne et des tarifs qui laissent de la marge pour le reste de votre projet.",
    keywords: [
      "agence web francophone international",
      "développement web offshore francophone",
      "agence développement mobile France Afrique",
      "équipe technique externalisée francophone",
      "développeur Next.js React Native freelance agence",
      "agence web diaspora africaine",
    ],
    areaServed: ["France", "Belgique", "Suisse", "Canada", "Luxembourg", "Europe", "Monde"],
    sections: [
      {
        title: "Une équipe technique francophone, au niveau des standards internationaux",
        text: "Nous travaillons avec les mêmes technologies que les meilleures agences de Paris, Montréal ou Berlin : Next.js, React, TypeScript, React Native, Node.js, PostgreSQL, Figma, Vercel. Code versionné, revues, tests, intégration continue, documentation : vous pouvez faire auditer notre travail à tout moment, et le reprendre avec une autre équipe si vous le souhaitez.",
        bullets: [
          "Sites web et applications conformes au RGPD et aux bonnes pratiques d'accessibilité (WCAG)",
          "Hébergement en Europe sur demande (données des utilisateurs européens)",
          "Paiements Stripe, PayPal, Apple Pay, Google Pay, SEPA",
          "Multilingue : français, anglais et autres langues",
          "Collaboration sur vos outils : Slack, Notion, Jira, GitHub, Figma",
        ],
      },
      {
        title: "Des projets entre deux continents",
        text: "Beaucoup de nos clients ont un pied en Europe et un pied en Afrique : une maison de couture entre Abidjan et Paris, un service d'achat en Europe et en Chine pour des clients à Abidjan, des entrepreneurs de la diaspora qui lancent une activité au pays. Nous savons construire des produits qui acceptent à la fois la carte bancaire européenne et le Mobile Money, qui affichent les prix en euros et en FCFA, et qui parlent aux deux publics.",
      },
      {
        title: "Comment nous travaillons à distance",
        text: "Décalage horaire nul ou faible avec l'Europe (GMT à Abidjan, soit une à deux heures de moins que Paris), échanges en français, points d'avancement hebdomadaires en visioconférence, démonstrations sur un environnement de test à chaque étape. Vous avez un interlocuteur unique, co-fondateur de l'agence, du devis à la mise en ligne.",
      },
      {
        title: "Tarifs et cadre contractuel",
        text: "Nous facturons en euros ou en dollars, sur devis forfaitaire par étape ou en équipe dédiée mensuelle. Un contrat de prestation précise la propriété intellectuelle (le code vous appartient), la confidentialité et les conditions de maintenance. Nos tarifs sont en général 30 à 50 % inférieurs à ceux d'une agence équivalente en Europe de l'Ouest, à périmètre et qualité comparables.",
      },
    ],
    faq: [
      {
        q: "Pouvez-vous facturer une entreprise française ou canadienne ?",
        a: "Oui. Nous émettons des factures en euros ou en dollars, réglables par virement international (SWIFT, Wise) ou carte bancaire. Nous précisons avec vous les aspects de TVA et de retenue à la source selon votre pays.",
      },
      {
        q: "Comment garantissez-vous la qualité et la sécurité du code ?",
        a: "Code versionné sur GitHub avec revues, tests automatisés, dépendances maintenues à jour, en-têtes de sécurité, audit possible par un tiers. Vous avez accès au dépôt dès le début du projet.",
      },
      {
        q: "Vos sites respectent-ils le RGPD ?",
        a: "Oui. Nous intégrons les mentions légales, la politique de confidentialité, la gestion du consentement aux cookies et des formulaires conformes, et nous pouvons héberger les données en Europe.",
      },
      {
        q: "Quel est le décalage horaire avec Abidjan ?",
        a: "Abidjan est à l'heure GMT toute l'année : une heure de moins que Paris en hiver, deux heures en été, et cinq heures de plus que Montréal. Les créneaux communs sont larges.",
      },
      {
        q: "Pouvez-vous renforcer une équipe technique existante ?",
        a: "Oui. Nous intervenons en renfort sur une période donnée (développeurs Next.js, React Native, Node.js) ou comme équipe technique externalisée pour une startup sans CTO.",
      },
    ],
  },
];

/* ------------------------------------------------------------- FAQ accueil */

export const homeFaq: Faq[] = [
  {
    q: "Que fait exactement Codexworld ?",
    a: "Codexworld est une agence de développement web et mobile basée à Abidjan, en Côte d'Ivoire. Nous créons des sites internet, des applications mobiles iOS et Android, des boutiques en ligne et des plateformes SaaS sur mesure, du design au déploiement, puis nous assurons la maintenance.",
  },
  {
    q: "Combien coûte la création d'un site internet ou d'une application ?",
    a: "Un site vitrine ou une landing page démarre sous 500 000 FCFA. Un site professionnel complet se situe entre 500 000 et 1 500 000 FCFA, une boutique en ligne ou une application mobile à partir de 1 500 000 FCFA, une plateforme SaaS à partir de 4 000 000 FCFA. Nous envoyons un devis détaillé après un premier échange gratuit.",
  },
  {
    q: "Travaillez-vous uniquement à Abidjan ?",
    a: "Non. Nous sommes basés à Abidjan, mais nous accompagnons des clients dans toute la Côte d'Ivoire, en Afrique francophone (Sénégal, Cameroun, Bénin, Togo, Mali, Burkina Faso, Gabon, RDC…) ainsi qu'en France, en Europe et au Canada. Tout se fait à distance, en français ou en anglais.",
  },
  {
    q: "Intégrez-vous le paiement Mobile Money (Orange Money, MTN MoMo, Wave) ?",
    a: "Oui. Nous intégrons Orange Money, MTN Mobile Money, Wave, Moov Money et les cartes bancaires via des agrégateurs comme CinetPay ou PayDunya, ainsi que Stripe et PayPal pour les clients internationaux.",
  },
  {
    q: "Quelles technologies utilisez-vous ?",
    a: "Next.js, React et TypeScript pour le web, React Native pour les applications mobiles, Node.js et PostgreSQL pour le serveur, Tailwind CSS et Figma pour le design, Vercel et le cloud pour l'hébergement. Des technologies modernes, performantes et largement utilisées, pour que votre projet reste maintenable.",
  },
  {
    q: "Combien de temps dure un projet ?",
    a: "Deux à trois semaines pour une landing page, quatre à huit semaines pour un site complet, deux à quatre mois pour une application mobile ou une plateforme SaaS en version initiale. Nous livrons par étapes pour que vous puissiez lancer vite.",
  },
  {
    q: "Serai-je propriétaire de mon site et de mon code ?",
    a: "Oui. Le nom de domaine, les comptes d'hébergement et le code source vous appartiennent. Nous vous transmettons tous les accès et la documentation à la livraison.",
  },
];
