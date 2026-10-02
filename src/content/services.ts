import type { PartitionTrack, Service } from "@/types/service";

/** Les cinq mouvements d'un projet, dans l'ordre. */
export const partitionPhases = ["Cadrer", "Concevoir", "Construire", "Lancer", "Faire grandir"] as const;

export const partitionTracks: PartitionTrack[] = ["Produit", "Design", "Code", "Mesure"];

// Délai et tarif communs tant qu'ils ne sont pas fixés : « sur devis ».
export const serviceTerms = { delai: "[à définir]", tarif: "Sur devis" } as const;

export const services: Service[] = [
  {
    id: "lancer",
    verbe: "Lancer",
    resume: "SaaS, plateforme, application web ou mobile — du MVP à la mise en ligne.",
    faits: [
      "Atelier produit : les fonctions qui comptent",
      "Interface conçue directement dans le code",
      "Comptes, rôles, paiements, tableaux de bord",
      "Mise en ligne, premiers utilisateurs, mesure",
    ],
    preuves: [
      { slug: "autoloc", note: "Marketplace · web et mobile" },
      { slug: "unknown", note: "Web · mobile · API" },
    ],
    stack: "Next.js · React Native · NestJS",
    partition: [
      { label: "Atelier produit", track: "Produit", from: 1, to: 1, level: "coeur" },
      { label: "Cadrage du MVP", track: "Produit", from: 2, to: 2, level: "inclus" },
      { label: "Interface conçue dans le code", track: "Design", from: 2, to: 3, level: "inclus" },
      { label: "Web · mobile · API", track: "Code", from: 3, to: 3, level: "coeur" },
      { label: "Back-office · mise en ligne", track: "Code", from: 4, to: 4, level: "inclus" },
      { label: "Pixel + CAPI", track: "Mesure", from: 4, to: 4, level: "inclus" },
      { label: "Campagnes Meta", track: "Mesure", from: 5, to: 5, level: "option" },
    ],
  },
  {
    id: "vendre",
    verbe: "Vendre",
    resume: "Boutique ou marketplace, payée en Wave, Orange Money ou à la livraison.",
    faits: [
      "Catalogue et parcours d'achat pensés mobile",
      "Commande sans compte, en quelques secondes",
      "Paiement Wave, Orange Money ou à la livraison",
      "Back-office et suivi des commandes",
    ],
    preuves: [
      { slug: "mamous-accessories", note: "Bijoux · commande sans compte" },
      { slug: "maison-adama-tchurayy", note: "Parfums · Wave et livraison" },
    ],
    stack: "Next.js · Supabase · Wave",
    partition: [
      { label: "Catalogue et parcours", track: "Produit", from: 1, to: 1, level: "coeur" },
      { label: "Boutique conçue dans le code", track: "Design", from: 2, to: 3, level: "inclus" },
      { label: "Paiement Wave · OM · livraison", track: "Code", from: 3, to: 3, level: "coeur" },
      { label: "Back-office des commandes", track: "Code", from: 4, to: 4, level: "inclus" },
      { label: "Pixel + CAPI", track: "Mesure", from: 4, to: 4, level: "inclus" },
      { label: "Campagnes Meta", track: "Mesure", from: 5, to: 5, level: "option" },
    ],
  },
  {
    id: "digitaliser",
    verbe: "Digitaliser",
    resume: "Outils internes, back-office, automatisations, notifications WhatsApp.",
    faits: [
      "Cartographie de votre façon de travailler",
      "Outil sur mesure : rôles, suivi, notifications",
      "Reprise de vos données existantes",
      "Prise en main par l'équipe",
    ],
    preuves: [{ slug: "autoloc", note: "Administration · Broadcast Studio" }],
    stack: "Next.js · NestJS · Twilio",
    partition: [
      { label: "Cartographie de l'activité", track: "Produit", from: 1, to: 1, level: "coeur" },
      { label: "Interface de l'outil", track: "Design", from: 2, to: 2, level: "inclus" },
      { label: "Outil sur mesure", track: "Code", from: 3, to: 3, level: "coeur" },
      { label: "Reprise des données", track: "Code", from: 4, to: 4, level: "inclus" },
      { label: "Prise en main par l'équipe", track: "Produit", from: 4, to: 4, level: "inclus" },
      { label: "Suivi de l'usage", track: "Mesure", from: 5, to: 5, level: "option" },
    ],
  },
  {
    id: "grandir",
    verbe: "Faire grandir",
    resume: "Meta Ads, Pixel et Conversions API : savoir quelle pub rapporte.",
    faits: [
      "Audit de l'existant : site, tunnel, tracking",
      "Pixel et Conversions API installés proprement",
      "Campagnes Meta Ads ciblées",
      "Lecture des résultats et optimisation continue",
    ],
    preuves: [{ slug: "unknown", note: "Campagnes de lancement" }],
    stack: "Meta Ads · Pixel · Conversions API",
    partition: [
      { label: "Audit de l'existant", track: "Produit", from: 1, to: 1, level: "coeur" },
      { label: "Pages de destination", track: "Design", from: 2, to: 3, level: "option" },
      { label: "Pixel + CAPI", track: "Code", from: 2, to: 2, level: "coeur" },
      { label: "Campagnes Meta Ads", track: "Mesure", from: 3, to: 4, level: "coeur" },
      { label: "Lecture des résultats", track: "Mesure", from: 5, to: 5, level: "inclus" },
    ],
  },
];
