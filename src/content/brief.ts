import type { BriefNode, BriefNodeId, BriefPlan, PlanKey } from "@/types/brief";

/** Accusés courts, utilisés à tour de rôle quand un choix n'a pas de réaction propre. */
export const briefAcks = ["Noté.", "Parfait.", "Compris.", "Très bien."];

const advertisingOptions = [
  { label: "Oui, Meta Ads", next: "stade" },
  { label: "Des boosts Instagram", next: "stade" },
  { label: "Pas encore", next: "stade" },
] as const;

export const briefTree: Record<BriefNodeId, BriefNode> = {
  start: {
    ask: "Bonjour. Qu'est-ce que vous voulez faire avancer ?",
    key: "Objectif",
    options: [
      {
        label: "Vendre en ligne",
        next: "vendreModele",
        set: { goal: "vendre", plan: "boutique" },
        react: ["Très bien. Vendre en ligne ici, c'est surtout bien gérer Wave, Orange Money et la livraison."],
      },
      {
        label: "Lancer un produit",
        next: "lancerProduit",
        set: { goal: "lancer", plan: "lancer" },
        react: [
          "Bon terrain.",
          "Comptes, rôles, abonnements, tableaux de bord : du MVP à la mise en ligne. Ces briques tournent déjà ici :",
        ],
        proof: { projectSlug: "autoloc", meta: "Comptes · rôles · tableaux de bord · wallets" },
      },
      {
        label: "Digitaliser mon activité",
        next: "digitaliserFriction",
        set: { goal: "digitaliser", plan: "digitaliser" },
        react: [
          "Bonne idée. Un outil bien pensé fait gagner des heures chaque semaine.",
          "C'est ce que j'ai construit pour l'administration d'AutoLoc :",
        ],
        proof: { projectSlug: "autoloc", meta: "Modération · payouts · Broadcast Studio" },
      },
      {
        label: "Faire grandir mes ventes",
        next: "grandirSite",
        set: { goal: "grandir", plan: "grandir" },
        react: ["C'est la partie que je préfère : construire, puis mesurer."],
      },
      {
        label: "Autre chose",
        next: "autreProjet",
        set: { goal: "autre", plan: "autre" },
        react: ["Avec plaisir."],
      },
    ],
  },

  // — Vendre en ligne —
  vendreModele: {
    ask: "Vous vendez vos propres produits, ou vous voulez réunir plusieurs vendeurs ?",
    key: "Modèle",
    options: [
      { label: "Mes produits", next: "boutiqueProduits", react: ["Parfait."] },
      {
        label: "Plusieurs vendeurs",
        next: "marketplaceOffre",
        set: { plan: "marketplace" },
        react: [
          "Une marketplace : c'est exactement mon terrain.",
          "Séquestre, KYC, wallets, paiements Wave et Orange Money : tout ça tourne déjà ici :",
        ],
        proof: { projectSlug: "autoloc", meta: "Marketplace véhicules · séquestre · wallets" },
      },
    ],
  },
  boutiqueProduits: {
    ask: "Qu'est-ce que vous vendez ?",
    key: "Produits",
    options: [
      {
        label: "Mode & accessoires",
        next: "boutiqueCanal",
        react: ["Joli secteur. J'ai construit la boutique de Mamou's Accessories :"],
        proof: { projectSlug: "mamous-accessories", meta: "Bijoux · commande sans compte · Wave" },
      },
      {
        label: "Beauté & parfums",
        next: "boutiqueCanal",
        react: ["J'ai justement une boutique de parfums, oud et encens en cours :"],
        proof: { projectSlug: "maison-adama-tchurayy", meta: "Parfums · Wave · paiement à la livraison" },
      },
      {
        label: "Alimentation",
        next: "boutiqueCanal",
        react: ["Noté. La commande rapide et la livraison seront au cœur du projet."],
      },
      { label: "Autre chose", next: "boutiqueCanal", react: ["Noté."] },
    ],
  },
  boutiqueCanal: {
    ask: "Aujourd'hui, vous vendez où ?",
    key: "Canal actuel",
    options: [
      {
        label: "Instagram / WhatsApp",
        next: "boutiquePaiement",
        react: ["Comme beaucoup de marques ici. On garde WhatsApp comme canal, la boutique fait le reste."],
      },
      {
        label: "En boutique",
        next: "boutiquePaiement",
        react: ["Le site devient votre deuxième vitrine, ouverte jour et nuit."],
      },
      {
        label: "J'ai déjà un site",
        next: "boutiquePaiement",
        react: ["On regardera d'abord ce qui bloque aujourd'hui."],
      },
      {
        label: "Nulle part encore",
        next: "boutiquePaiement",
        react: ["On part de zéro : c'est souvent le plus simple."],
      },
    ],
  },
  boutiquePaiement: {
    ask: "Vos clients paient comment ?",
    key: "Paiement",
    ack: true,
    options: [
      { label: "Wave & Orange Money", next: "stade" },
      { label: "À la livraison", next: "stade" },
      { label: "Les deux", next: "stade" },
    ],
  },
  marketplaceOffre: {
    ask: "Les vendeurs proposent quoi ?",
    key: "Offre",
    options: [
      { label: "Des produits", next: "marketplaceConfiance", react: ["Noté."] },
      {
        label: "Des locations",
        next: "marketplaceConfiance",
        react: ["Comme AutoLoc pour les véhicules et UNKNOWN pour les logements."],
      },
      {
        label: "Des services",
        next: "marketplaceConfiance",
        react: ["Noté. Réservation et paiement sécurisé, alors."],
      },
    ],
  },
  marketplaceConfiance: {
    ask: "Qu'est-ce qui compte le plus pour la confiance ?",
    key: "Confiance",
    ack: true,
    options: [
      { label: "Le paiement sécurisé", next: "stade" },
      { label: "La vérification des vendeurs", next: "stade" },
      { label: "Les deux", next: "stade" },
      { label: "Je ne sais pas encore", next: "stade", react: ["Pas de souci, on le décidera ensemble."] },
    ],
  },

  // — Lancer un produit —
  lancerProduit: {
    ask: "Qu'est-ce que vous lancez ?",
    key: "Produit",
    options: [
      {
        label: "Un SaaS",
        next: "lancerUtilisateurs",
        react: ["Un SaaS : abonnements, espaces clients, tableaux de bord."],
      },
      { label: "Une plateforme", next: "lancerUtilisateurs", react: ["Noté."] },
      {
        label: "Une app mobile",
        next: "lancerUtilisateurs",
        react: ["React Native, mon point fort : une seule base pour iOS et Android."],
      },
    ],
  },
  lancerUtilisateurs: {
    ask: "Qui va l'utiliser ?",
    key: "Utilisateurs",
    ack: true,
    options: [
      { label: "Des entreprises", next: "lancerModele" },
      { label: "Le grand public", next: "lancerModele" },
      { label: "Une équipe interne", next: "lancerModele" },
    ],
  },
  lancerModele: {
    intro: ["Web, app mobile, API, back-office : je porte tout, de la conception à la mise en ligne."],
    ask: "Comment il gagnera de l'argent ?",
    key: "Modèle économique",
    options: [
      { label: "Abonnement", next: "stade" },
      { label: "Commission", next: "stade" },
      { label: "Paiement à l'usage", next: "stade" },
      { label: "Pas encore défini", next: "stade", react: ["On le cadrera ensemble, c'est une étape clé."] },
    ],
  },

  // — Digitaliser —
  digitaliserFriction: {
    ask: "Qu'est-ce qui vous prend le plus de temps aujourd'hui ?",
    key: "Point de friction",
    ack: true,
    options: [
      { label: "Commandes et stock", next: "digitaliserOutil" },
      { label: "Réservations", next: "digitaliserOutil" },
      { label: "Suivi des clients", next: "digitaliserOutil" },
      { label: "Facturation", next: "digitaliserOutil" },
      {
        label: "Les échanges WhatsApp",
        next: "digitaliserOutil",
        react: ["On peut en automatiser une bonne partie, avec des messages envoyés au bon moment."],
      },
    ],
  },
  digitaliserOutil: {
    ask: "Vous gérez ça avec quoi aujourd'hui ?",
    key: "Outil actuel",
    ack: true,
    options: [
      { label: "Excel ou un cahier", next: "digitaliserEquipe" },
      { label: "WhatsApp", next: "digitaliserEquipe" },
      { label: "Un logiciel qui ne suffit plus", next: "digitaliserEquipe" },
    ],
  },
  digitaliserEquipe: {
    intro: ["On peut remplacer ça par un outil fait pour vous."],
    ask: "Combien de personnes l'utiliseront ?",
    key: "Équipe",
    ack: true,
    options: [
      { label: "Juste moi", next: "stade" },
      { label: "2 à 10", next: "stade" },
      { label: "Plus de 10", next: "stade" },
    ],
  },

  // — Faire grandir —
  grandirSite: {
    ask: "Vous avez déjà un site ou une boutique en ligne ?",
    key: "Site",
    options: [
      { label: "Oui", next: "grandirMesure", react: ["Parfait, on part de là."] },
      {
        label: "Non, je vends sur les réseaux",
        next: "grandirPublicite",
        react: ["Alors on commence par une base qui convertit : la pub doit envoyer vers quelque chose qui vend."],
      },
    ],
  },
  grandirMesure: {
    ask: "Vous savez d'où viennent vos ventes ?",
    key: "Mesure",
    options: [
      { label: "Oui, c'est mesuré", next: "grandirPublicite", react: ["Excellent, c'est rare."] },
      {
        label: "Pas vraiment",
        next: "grandirPublicite",
        react: ["C'est là que le tracking change tout : Pixel et Conversions API pour savoir quelle pub rapporte vraiment."],
      },
    ],
  },
  grandirPublicite: {
    ask: "Vous faites déjà de la publicité ?",
    key: "Publicité",
    ack: true,
    options: [...advertisingOptions],
  },

  // — Autre chose : saisie libre, puis directement le plan —
  autreProjet: {
    ask: "Racontez-moi votre projet en quelques mots.",
    key: "Projet",
    input: "text",
    next: "plan",
    react: ["Merci, c'est noté. Je regarde ça de près."],
  },

  // — Tronc commun —
  stade: {
    ask: "Où en êtes-vous ?",
    key: "Stade",
    options: [
      { label: "Une idée", next: "delai", react: ["Le meilleur moment pour bien cadrer."] },
      { label: "Une maquette", next: "delai", react: ["Parfait, on part de là."] },
      { label: "Un produit à refaire", next: "delai", react: ["On garde ce qui marche, on refait le reste."] },
      { label: "Un produit qui doit grandir", next: "delai", react: ["Alors on parle performance et acquisition."] },
    ],
  },
  delai: {
    ask: "Et pour quand ?",
    key: "Délai",
    ack: true,
    options: [
      { label: "Dès que possible", next: "apresDelai" },
      { label: "Dans 1 à 3 mois", next: "apresDelai" },
      { label: "Pas de date fixe", next: "apresDelai" },
    ],
  },
  campagnes: {
    intro: ["Dernière chose."],
    ask: "Pour le lancement, on prévoit aussi les campagnes qui font venir vos premiers clients ?",
    key: "Campagnes",
    options: [
      {
        label: "Oui, ça m'intéresse",
        next: "plan",
        set: { wantsCampaigns: true },
        react: ["Bonne nouvelle : c'est là que je fais la différence."],
      },
      { label: "Plus tard", next: "plan", react: ["Noté, on pourra en reparler."] },
    ],
  },

  // — Fin : le plan, puis le canal —
  plan: {
    intro: ["Voici le plan que je vous proposerais :"],
    showPlan: true,
    ask: "Comment voulez-vous recevoir la suite ?",
    options: [
      { label: "Sur WhatsApp", accent: true, action: "whatsapp", next: "whatsappEnvoye" },
      { label: "Par e-mail", next: "contact" },
    ],
  },
  whatsappEnvoye: {
    intro: ["Parfait. WhatsApp s'ouvre avec votre brief déjà rédigé : il ne reste qu'à appuyer sur Envoyer."],
    showWhatsappPreview: true,
    options: [{ label: "Recommencer", action: "restart" }],
  },
  contact: {
    ask: "Votre nom et votre e-mail, et je vous écris personnellement.",
    input: "contact",
  },
  contactEnvoye: {
    intro: ["C'est envoyé. Je vous réponds en personne, avec une première proposition."],
    options: [{ label: "Recommencer", action: "restart" }],
  },
  contactErreur: {
    intro: ["L'envoi n'a pas abouti, désolé."],
    ask: "On réessaie, ou on passe par WhatsApp ?",
    options: [
      { label: "Réessayer", next: "contact" },
      { label: "Sur WhatsApp", accent: true, action: "whatsapp", next: "whatsappEnvoye" },
    ],
  },
};

export const briefPlans: Record<PlanKey, BriefPlan> = {
  boutique: {
    title: "Une boutique en ligne qui vend",
    proof: "Mamou's Accessories",
    steps: [
      "Boutique sur mesure : catalogue, commande sans compte",
      "Paiements Wave, Orange Money ou à la livraison, back-office des commandes",
      "Mise en ligne, tracking prêt pour vos campagnes",
    ],
  },
  marketplace: {
    title: "Une marketplace de confiance",
    proof: "AutoLoc, UNKNOWN",
    steps: [
      "Cadrage du modèle : commission, rôles, règles",
      "Comptes vendeurs, KYC, séquestre et wallets",
      "Back-office, modération et lancement",
    ],
  },
  lancer: {
    title: "Votre produit, du MVP au lancement",
    proof: "AutoLoc, UNKNOWN",
    steps: [
      "Atelier produit : les fonctions qui comptent pour la première version",
      "Conception et développement : comptes, paiements, tableaux de bord",
      "Mise en ligne, premiers utilisateurs et mesure",
    ],
  },
  digitaliser: {
    title: "Un outil fait pour votre activité",
    proof: "le back-office d'AutoLoc",
    steps: [
      "On cartographie votre façon de travailler",
      "Outil sur mesure : rôles, suivi, notifications",
      "Reprise de vos données et prise en main par l'équipe",
    ],
  },
  grandir: {
    title: "Une croissance mesurée",
    proof: "les campagnes UNKNOWN",
    steps: [
      "Audit du tracking : Pixel et Conversions API",
      "Campagnes Meta Ads ciblées",
      "Lecture des résultats et optimisation continue",
    ],
  },
  autre: {
    title: "Un projet sur mesure",
    proof: "selon votre projet",
    steps: [
      "Un échange pour cadrer votre idée",
      "Une proposition claire : périmètre et étapes",
      "On construit, on lance, on mesure",
    ],
  },
};

export const campaignStep = "Campagnes Meta Ads pour le lancement, mesurées dès le premier jour";
