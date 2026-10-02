import type { Project } from "@/types/project";

// Ordre d'affichage des salles. Les champs vides (année, stack, résultats,
// visuels) sont à compléter : l'interface masque ce qui n'est pas renseigné.
export const projects: Project[] = [
  {
    slug: "autoloc",
    nom: "AutoLoc",
    categorie: "Marketplace · location de véhicules",
    statut: "en-ligne",
    role: "Lead developer",
    question: "Comment louer une voiture en confiance ?",
    resume: "La location de voitures entre particuliers au Sénégal, avec vérification et paiement sécurisés.",
    probleme:
      "Louer un véhicule à un inconnu demande de la confiance des deux côtés : identité, acompte, état du véhicule.",
    solution:
      "KYC, acompte Wave, états des lieux photo, dashboard propriétaire, wallets et payouts Wave / Orange Money, administration complète.",
    resultats: [],
    livrables: ["KYC", "Acompte Wave", "États des lieux photo", "Wallets", "Payouts"],
    stack: [],
    cover: "/projets/autoloc/video/poster.webp",
    affiche: "/projets/autoloc/affiche/autoloc-affiche.webp",
    video: { src: "/projets/autoloc/video/autoloc-motion.mp4", poster: "/projets/autoloc/video/poster.webp" },
    captures: [],
    lien: "https://autoloc.sn",
    chapo:
      "La marketplace de location de voitures entre particuliers au Sénégal : le locataire réserve un véhicule vérifié, paie en mobile money, et le propriétaire est payé après la remise des clés.",
    enBref: [
      { label: "Marché", value: "Sénégal : Dakar, régions et aéroport AIBD" },
      { label: "Rôle", value: "Lead developer" },
      { label: "Périmètre", value: "Site locataire, espace propriétaire, back-office admin" },
      { label: "Plateforme", value: "Web responsive · app React Native développée, non publiée" },
      { label: "Paiement", value: "Wave et Orange Money" },
      { label: "Statut", value: "En ligne — autoloc.sn", href: "https://autoloc.sn" },
    ],
    fil: [
      {
        id: "probleme",
        titre: "Le problème",
        messages: [
          { kind: "client", text: "Confier sa voiture à un inconnu, ou payer d'avance quelqu'un qu'on n'a jamais vu ?" },
          { kind: "moi", text: "C'est le blocage de la location entre particuliers au Sénégal, des deux côtés :" },
          {
            kind: "liste",
            items: [
              { label: "Propriétaire", text: "Aucune garantie sur l'identité du locataire, son permis ou le paiement." },
              { label: "Locataire", text: "Peu de visibilité sur l'état réel du véhicule, l'assurance et le prix final." },
              {
                label: "Paiement",
                text: "La carte bancaire est marginale : tout passe par Wave et Orange Money, rarement intégrés proprement.",
              },
            ],
          },
        ],
      },
      {
        id: "solution",
        titre: "La solution",
        messages: [
          {
            kind: "moi",
            text: "AutoLoc sécurise chaque étape, de la recherche au paiement du propriétaire, avec trois espaces : locataire, propriétaire et administration.",
          },
          {
            kind: "etapes",
            titre: "Parcours locataire",
            items: [
              { titre: "Rechercher", text: "Tout Dakar, trajets hors Dakar (régions, Saly) ou livraison à l'aéroport AIBD.", slide: 2 },
              { titre: "Choisir", text: "Un catalogue de véhicules vérifiés, tarif à la journée, assurance comprise.", slide: 3 },
              {
                titre: "Vérifier son identité",
                text: "KYC en quatre étapes, environ 2 minutes, valide à vie : informations, téléphone, CNI ou passeport + selfie, permis.",
                slide: 4,
              },
              { titre: "Payer", text: "Acompte de 30 % en ligne (ou 100 %) via Wave ou Orange Money ; le solde à la remise des clés.", slide: 5 },
              { titre: "Rouler", text: "Check-in et check-out avec états des lieux photo, contrat de location téléchargeable." },
            ],
          },
          {
            kind: "liste",
            titre: "Espace propriétaire",
            slide: 6,
            items: [
              { text: "Création d'annonce guidée en 7 étapes." },
              { text: "Gestion de la flotte : disponibilités, tarifs, statut de publication." },
              { text: "Suivi des réservations : paiement, accord hôte, check-in, check-out." },
              { text: "Revenus détaillés (brut, commission, net) et wallet retirable vers Wave ou Orange Money.", slide: 7 },
            ],
          },
          {
            kind: "liste",
            titre: "Administration",
            items: [
              { text: "Modération des véhicules et des hôtes, contrôle KYC." },
              { text: "Registre des réservations, retraits et virements." },
              { text: "Broadcast Studio : campagnes push, e-mail et WhatsApp." },
            ],
          },
        ],
      },
      {
        id: "choix",
        titre: "Les choix clés",
        messages: [
          { kind: "client", text: "Et comment créer la confiance entre deux inconnus ?" },
          { kind: "moi", text: "Chaque décision a été prise pour ça :" },
          {
            kind: "tableau",
            colonnes: ["Choix", "Pourquoi"],
            lignes: [
              ["Fonds sécurisés jusqu'au check-in", "Le propriétaire est payé seulement quand la location a vraiment commencé."],
              ["Acompte de 30 %", "Réservation garantie sans bloquer tout le budget du locataire."],
              ["KYC valide à vie", "Un seul contrôle d'identité, pas de friction à chaque réservation."],
              ["Coordonnées protégées", "Les contacts ne sont débloqués qu'après confirmation, pour éviter le contournement."],
              ["Wave et Orange Money natifs", "Le moyen de paiement réel du marché, avec retrait propriétaire sans frais."],
              ["Prix détaillé au franc près", "Total, assurance et commission affichés avant le paiement."],
              ["Pas de fausses notes", "Aucun avis n'est affiché sans réservation réelle : les étoiles par défaut ont été retirées."],
            ],
          },
        ],
      },
      {
        id: "design",
        titre: "Le design",
        messages: [
          { kind: "moi", text: "Un système sobre et premium, pensé pour inspirer confiance plutôt que pour vendre fort." },
          {
            kind: "palette",
            couleurs: [
              { nom: "Vert forêt", hex: "#0A3D2E" },
              { nom: "Champagne", hex: "#F1DFB6" },
              { nom: "Blanc chaud", hex: "#F7F4EC" },
            ],
          },
          {
            kind: "tableau",
            colonnes: ["Élément", "Choix"],
            lignes: [
              ["Typographie", "Fraunces pour les titres (jusqu'au SemiBold 600), Inter pour l'interface et les prix."],
              ["Formes", "Boutons et badges en pilule, grille d'espacement de 4 px."],
              ["Navigation", "Capsule centrée sur desktop, dock vert forêt sur mobile."],
            ],
          },
        ],
      },
      {
        id: "demontre",
        titre: "Ce que le projet démontre",
        messages: [
          { kind: "moi", text: "Livrer une marketplace transactionnelle complète, adaptée à un marché local :" },
          {
            kind: "liste",
            items: [
              { label: "Produit", text: "Traduire un problème de confiance en mécanismes concrets : séquestre, KYC, acompte." },
              { label: "Paiement", text: "Intégrer le mobile money de bout en bout, de l'acompte au retrait du propriétaire." },
              { label: "Ampleur", text: "Trois espaces distincts (locataire, propriétaire, admin) sur une même plateforme." },
              { label: "Design", text: "Un système visuel cohérent, du site public jusqu'aux e-mails transactionnels." },
            ],
          },
        ],
      },
      {
        id: "resultat",
        titre: "Le résultat",
        messages: [
          {
            kind: "carrousel",
            compte: "autoloc.sn",
            legende: "AutoLoc en huit écrans : de la recherche au paiement du propriétaire.",
            slides: [
              { src: "/projets/autoloc/carrousel/slide-01.jpg", alt: "AutoLoc : confier sa voiture à un inconnu, en toute confiance" },
              { src: "/projets/autoloc/carrousel/slide-02.jpg", alt: "Trouver : Dakar, régions ou aéroport" },
              { src: "/projets/autoloc/carrousel/slide-03.jpg", alt: "Choisir : des véhicules vérifiés" },
              { src: "/projets/autoloc/carrousel/slide-04.jpg", alt: "Vérifier : un KYC en deux minutes" },
              { src: "/projets/autoloc/carrousel/slide-05.jpg", alt: "Payer : un acompte, le reste aux clés" },
              { src: "/projets/autoloc/carrousel/slide-06.jpg", alt: "Piloter : le côté propriétaire" },
              { src: "/projets/autoloc/carrousel/slide-07.jpg", alt: "Encaisser : Wave et Orange Money" },
              { src: "/projets/autoloc/carrousel/slide-08.jpg", alt: "Lead developer : A's CHAAM" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "unknown",
    nom: "UNKNOWN",
    categorie: "Marketplace · location courte durée",
    annee: 2026,
    statut: "en-construction",
    role: "Fondateur · produit et développement",
    question: "Comment louer sans passer par Airbnb ?",
    resume:
      "La location courte durée au Sénégal, pensée pour les gestionnaires qui travaillent sur WhatsApp.",
    probleme:
      "Au Sénégal, Airbnb et Booking pèsent peu : la plupart des gestionnaires louent uniquement via WhatsApp, sans paiement sécurisé.",
    solution:
      "Une marketplace avec prix net garanti au propriétaire, séquestre jusqu'à la validation du check-in et programme de fidélité Teranga Club.",
    resultats: [],
    livrables: ["Web", "App mobile", "API", "Back-office", "Séquestre"],
    stack: [],
    captures: [],
  },
  {
    slug: "kollect",
    nom: "Kollect",
    categorie: "Marketplace multi-marques",
    statut: "en-construction",
    role: "Fondateur · conception et développement",
    question: "Comment lancer un drop ailleurs qu'en messages privés sur Instagram ?",
    resume: "La marketplace où les créateurs africains lancent leurs drops : une app pour acheter, une app et un back-office pour vendre.",
    probleme:
      "Les jeunes marques streetwear vendent leurs drops sur Instagram, en messages privés, sans boutique ni outil pour suivre leurs ventes.",
    solution: "Trois produits autour du drop : une app pour acheter, une app pour vendre, et un back-office web pour piloter.",
    resultats: [],
    livrables: ["App client", "App marque", "Back-office web", "Creative Studio"],
    stack: ["React Native"],
    cover: "/projets/kollect/scene/vitrine.webp",
    affiche: "/projets/kollect/affiche/kollect-affiche.webp",
    video: { src: "/projets/kollect/video/kollect-motion.mp4", poster: "/projets/kollect/video/poster.webp" },
    captures: [],
    chapo:
      "Kollect est une marketplace multi-marques où les créateurs africains lancent leurs drops : les clients découvrent et achètent dans une app, et chaque marque pilote ses collections, son stock et ses ventes depuis son propre espace.",
    enBref: [
      { label: "Projet", value: "Kollect — marketplace multi-marques" },
      { label: "Marché", value: "Marques streetwear et créateurs africains (ex. West Wood, KeyStreet, Ndaakarou)" },
      { label: "Rôle", value: "Fondateur — conception et développement" },
      { label: "Périmètre", value: "App client, app marque, back-office web des marques" },
      { label: "Plateformes", value: "Mobile (React Native) et web" },
    ],
    fil: [
      {
        id: "defi",
        titre: "Le défi",
        messages: [
          { kind: "client", text: "Comment lancer un drop ailleurs qu'en messages privés sur Instagram ?" },
          {
            kind: "moi",
            text: "Les jeunes marques streetwear vendent leurs drops sur Instagram, en messages privés, sans boutique ni outil pour suivre leurs ventes.",
          },
          {
            kind: "liste",
            items: [
              {
                label: "Les marques",
                text: "Chaque drop se gère à la main (stock, commandes, paiements) et la visibilité dépend uniquement de leurs abonnés.",
              },
              { label: "Les clients", text: "Pas d'endroit unique pour découvrir plusieurs marques locales et acheter en confiance." },
              {
                label: "Le lancement",
                text: "Un drop vit de l'urgence et des stories, deux choses qu'un site e-commerce classique ne sait pas porter.",
              },
            ],
          },
        ],
      },
      {
        id: "solution",
        titre: "La solution",
        messages: [
          {
            kind: "moi",
            text: "Kollect réunit trois produits autour du drop : une app pour acheter, une app pour vendre, et un back-office web pour piloter.",
          },
          {
            kind: "etapes",
            titre: "App client",
            items: [
              { titre: "Les stories de drops", text: "Chaque marque a sa story, comme sur Instagram.", slide: 2 },
              { titre: "Les collections en vedette", text: "Les drops du moment défilent en grand format.", slide: 1 },
              {
                titre: "Les tendances",
                text: "Stock restant affiché (« Plus que 3 ! »), couleurs et tailles disponibles.",
                slide: 3,
              },
              {
                titre: "La fiche produit",
                text: "Photos de campagne, stock en temps réel, ajout au panier ou achat direct.",
                slide: 3,
              },
            ],
          },
          {
            kind: "liste",
            titre: "App marque (espace CEO)",
            slide: 5,
            items: [
              { text: "Ventes, abonnés et taux de conversion de la marque sur 7, 30 ou 90 jours." },
              { text: "Gestion des drops (teasers, actifs) et du catalogue produits." },
            ],
          },
          {
            kind: "liste",
            titre: "Back-office web des marques",
            items: [
              { text: "Chiffre d'affaires, objectif mensuel et répartition des commandes.", slide: 6 },
              { text: "Alertes de stock avant rupture, top produits, dernières commandes." },
              { text: "Page de drop : date de lancement, produits, stock par taille.", slide: 4 },
              {
                label: "Creative Studio",
                text: "Génère la story Instagram d'un produit (nouveau drop, réassort, promotion) avec prix et QR code vers la boutique.",
                slide: 7,
              },
            ],
          },
        ],
      },
      {
        id: "choix",
        titre: "Les choix clés",
        messages: [
          { kind: "moi", text: "Kollect reprend les codes du drop streetwear plutôt que ceux d'un catalogue classique." },
          {
            kind: "tableau",
            colonnes: ["Choix", "Pourquoi"],
            lignes: [
              ["Le drop comme unité centrale", "Une collection a une date, un stock et une fin : c'est ainsi que ces marques vendent."],
              ["Stories de marques dans l'app", "Des codes que les clients connaissent déjà sur Instagram."],
              ["Stock restant visible", "L'urgence fait vendre les pièces en édition limitée."],
              ["Un espace séparé par marque", "Chaque créateur garde son identité, ses chiffres et ses clients."],
              ["Creative Studio", "Transformer chaque produit en story prête à publier, sans graphiste."],
              ["Objectif de chiffre d'affaires", "Donner aux marques un cap mensuel, pas seulement un historique."],
            ],
          },
        ],
      },
      {
        id: "design",
        titre: "Le design",
        messages: [
          {
            kind: "moi",
            text: "Une interface neutre qui laisse la place aux photos des marques, avec un rouge d'action fort.",
          },
          {
            kind: "tableau",
            colonnes: ["Élément", "Choix"],
            lignes: [
              ["Logo", "« Kollect » en script élégant"],
              ["Couleurs", "Blanc et noir, rouge pour les actions et les drops"],
              ["App client", "Cartes photo plein cadre, stories rondes, dock flottant sombre"],
              ["Back-office", "Cartes KPI noires et rouges, graphiques sur fond sombre, en-têtes au grand titre fantôme"],
            ],
          },
        ],
      },
      {
        id: "demontre",
        titre: "Ce que le projet démontre",
        messages: [
          {
            kind: "moi",
            text: "Kollect montre la capacité à concevoir une plateforme à plusieurs acteurs, de bout en bout, en tant que fondateur.",
          },
          {
            kind: "liste",
            items: [
              { label: "Multi-marques", text: "Chaque marque a son espace, ses données et ses ventes, sur une même plateforme." },
              { label: "Trois produits", text: "App client, app marque et back-office web, conçus ensemble." },
              {
                label: "Lecture du marché",
                text: "Un modèle bâti sur la façon dont les marques locales vendent déjà, par drops et par stories.",
              },
              { label: "Outils de croissance", text: "Analytics, objectifs et génération de stories intégrés au produit." },
            ],
          },
        ],
      },
      {
        id: "resultat",
        titre: "Le résultat",
        messages: [
          {
            kind: "carrousel",
            compte: "kollect",
            legende: "La plateforme en huit écrans : du drop côté client au pilotage côté marque.",
            slides: [
              { src: "/projets/kollect/carrousel/slide-01.jpg", alt: "Kollect : là où les marques lancent leurs drops" },
              { src: "/projets/kollect/carrousel/slide-02.jpg", alt: "Les stories : chaque marque, ses drops" },
              { src: "/projets/kollect/carrousel/slide-03.jpg", alt: "La fiche : acheter en un geste" },
              { src: "/projets/kollect/carrousel/slide-04.jpg", alt: "Le drop : une date, un stock" },
              { src: "/projets/kollect/carrousel/slide-05.jpg", alt: "L'espace marque : la boutique dans la poche" },
              { src: "/projets/kollect/carrousel/slide-06.jpg", alt: "Le pilotage : ventes et objectifs" },
              { src: "/projets/kollect/carrousel/slide-07.jpg", alt: "Le studio : la story en un clic" },
              { src: "/projets/kollect/carrousel/slide-08.jpg", alt: "Conçu et développé par A's CHAAM" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "mamous-accessories",
    nom: "Mamou's Accessories",
    nomCourt: "Mamou's",
    categorie: "Boutique de bijoux",
    statut: "en-ligne",
    role: "Conception et développement",
    question: "Comment vendre ses bijoux en ligne, même la nuit, sans répondre à chaque message ?",
    resume: "La boutique en ligne d'une créatrice de bijoux à Dakar, de la vitrine aux coulisses.",
    probleme: "Chaque vente passait par des échanges manuels sur Instagram et WhatsApp.",
    solution: "Une vitrine pour vendre, des coulisses pour gérer : commande sans compte, Wave ou espèces, back-office mobile.",
    resultats: [],
    livrables: ["Boutique web et mobile", "Commande sans compte", "Paiement Wave", "Back-office"],
    stack: ["Next.js 15", "Supabase", "Cloudinary", "Tailwind", "shadcn/ui"],
    cover: "/projets/mamou/video/poster.webp",
    affiche: "/projets/mamou/affiche/mamous-affiche.webp",
    video: { src: "/projets/mamou/video/mamous-motion.mp4", poster: "/projets/mamou/video/poster.webp" },
    captures: [],
    lien: "https://mamouaccessories.com",
    chapo:
      "La boutique en ligne d'une créatrice de bijoux à Dakar : une vitrine élégante pour les clientes, et un back-office qui lui permet de gérer seule son catalogue, ses commandes et ses paiements Wave.",
    enBref: [
      { label: "Cliente", value: "Créatrice de bijoux en acier inoxydable et plaqué or, Dakar" },
      { label: "Rôle", value: "Conception et développement" },
      { label: "Stack", value: "Next.js 15, Supabase, Cloudinary, Tailwind, shadcn/ui" },
      { label: "Périmètre", value: "Boutique web et mobile, tunnel de commande, back-office" },
      { label: "Paiement", value: "Wave et espèces à la livraison" },
      { label: "Catalogue", value: "66 bijoux en ligne, 6 collections" },
      { label: "Statut", value: "En ligne — mamouaccessories.com", href: "https://mamouaccessories.com" },
    ],
    fil: [
      {
        id: "defi",
        titre: "Le défi",
        messages: [
          { kind: "client", text: "Comment vendre mes bijoux en ligne, même la nuit, sans répondre à chaque message ?" },
          {
            kind: "moi",
            text: "Tout passait par Instagram et WhatsApp : chaque vente demandait des échanges manuels, et rien ne restait ouvert la nuit. Il fallait répondre à trois besoins :",
          },
          {
            kind: "liste",
            items: [
              { label: "Les clientes", text: "Voir tout le catalogue, les prix et le stock sans devoir écrire pour chaque pièce." },
              { label: "La créatrice", text: "Suivre ses commandes, ses paiements et son stock sans outil technique." },
              {
                label: "La marque",
                text: "Des bijoux d'apparence haut de gamme, présentés avec la même élégance qu'en boutique.",
              },
            ],
          },
        ],
      },
      {
        id: "solution",
        titre: "La solution",
        messages: [
          { kind: "moi", text: "Le projet tient en deux faces : une vitrine pour vendre, et des coulisses pour gérer." },
          {
            kind: "etapes",
            titre: "La vitrine",
            items: [
              {
                titre: "L'accueil",
                text: "Trois pièces vedettes mises en scène, et un parcours résumé en trois mots : « Choisis. Ajoute. Valide. »",
                slide: 2,
              },
              {
                titre: "La boutique",
                text: "66 bijoux, recherche et filtres par collection : boucles d'oreilles, colliers, montres, bracelets, bagues, ensembles.",
              },
              {
                titre: "La fiche produit",
                text: "Photos sur buste, stock restant affiché, partage en story, commande directe ou via WhatsApp.",
                slide: 3,
              },
              {
                titre: "La commande",
                text: "Sans compte, en trois étapes (panier, commande, paiement), livraison à Dakar et en régions, écrin offert.",
                slide: 4,
              },
              {
                titre: "Le paiement",
                text: "Wave, avec un lien de paiement après confirmation, ou espèces à la livraison.",
                slide: 5,
              },
            ],
          },
          {
            kind: "liste",
            titre: "Les coulisses",
            slide: 6,
            items: [
              { text: "Tableau de bord : revenus, produits, commandes et clientes en un regard." },
              {
                text: "Commandes : suivi Reçue → Confirmée → Expédiée → Livrée, contrôle des paiements Wave, contact WhatsApp de la cliente.",
                slide: 7,
              },
              { text: "Catalogue : stock, visibilité et alertes de rupture." },
              { text: "Marketing : reels vidéo, promotions, avis clients et newsletter." },
              { text: "Une version mobile du back-office, pour tout gérer depuis le téléphone." },
            ],
          },
        ],
      },
      {
        id: "choix",
        titre: "Les choix clés",
        messages: [
          { kind: "client", text: "Et mes clientes, elles achètent déjà sur WhatsApp. Ça change quoi pour elles ?" },
          { kind: "moi", text: "Rien de ce qu'elles connaissent : chaque choix part de la façon dont on vend et achète déjà." },
          {
            kind: "tableau",
            colonnes: ["Choix", "Pourquoi"],
            lignes: [
              ["Commande sans compte", "Les clientes achètent comme sur WhatsApp, sans inscription."],
              ["Bouton « Commander via WhatsApp »", "Garder le canal que les clientes connaissent, avec une commande structurée."],
              ["Stock restant affiché (« Plus que 2 pièces »)", "Créer l'urgence sur des pièces en petite quantité."],
              ["Partage en story depuis la fiche", "Faire de chaque produit un contenu Instagram."],
              ["Wave et espèces à la livraison", "Les deux modes de paiement réellement utilisés."],
              ["Machine d'état des commandes", "Chaque commande suit un statut clair, de la réception à la livraison."],
              ["Back-office pensé pour le mobile", "La créatrice gère sa boutique depuis son téléphone."],
            ],
          },
        ],
      },
      {
        id: "design",
        titre: "Le design",
        messages: [
          {
            kind: "moi",
            text: "Deux ambiances pour deux usages : une vitrine claire et féminine, des coulisses sombres et dorées.",
          },
          {
            kind: "tableau",
            colonnes: ["Élément", "Vitrine", "Coulisses"],
            lignes: [
              ["Fond", "Crème chaud", "Brun nuit"],
              ["Accent", "Bronze doré", "Or"],
              ["Ton", "Chic, féminin, intemporel", "Précis, éditorial"],
              ["Signature", "Logo « Mamou's » en italique, labels espacés en capitales", "Cartes sombres, étiquettes en capitales espacées"],
            ],
          },
        ],
      },
      {
        id: "demontre",
        titre: "Ce que le projet démontre",
        messages: [
          {
            kind: "moi",
            text: "Faire passer une créatrice des messages privés à une vraie boutique, sans lui ajouter de complexité :",
          },
          {
            kind: "liste",
            items: [
              { label: "E-commerce complet", text: "Catalogue, panier, commande, paiement et suivi de livraison." },
              { label: "Ancrage local", text: "Wave, espèces à la livraison et WhatsApp intégrés au parcours." },
              { label: "Autonomie", text: "Un back-office que la créatrice utilise seule, sur ordinateur comme sur téléphone." },
              { label: "Marketing intégré", text: "Reels, promotions, avis et partage en story au même endroit." },
            ],
          },
        ],
      },
      {
        id: "resultat",
        titre: "Le résultat",
        messages: [
          {
            kind: "carrousel",
            compte: "mamouaccessories.com",
            legende: "La boutique en huit écrans : de la vitrine aux coulisses.",
            slides: [
              { src: "/projets/mamou/carrousel/slide-01.jpg", alt: "Mamou's Accessories : une boutique de bijoux en ligne, ouverte jour et nuit" },
              { src: "/projets/mamou/carrousel/slide-02.jpg", alt: "La vitrine : l'élégance commence ici" },
              { src: "/projets/mamou/carrousel/slide-03.jpg", alt: "La fiche produit : chaque bijou mis en scène" },
              { src: "/projets/mamou/carrousel/slide-04.jpg", alt: "Le panier : choisis, ajoute, valide" },
              { src: "/projets/mamou/carrousel/slide-05.jpg", alt: "Le paiement : Wave en un geste, ou à la livraison" },
              { src: "/projets/mamou/carrousel/slide-06.jpg", alt: "Les coulisses : le back-office de la créatrice" },
              { src: "/projets/mamou/carrousel/slide-07.jpg", alt: "Les commandes : suivies jusqu'à la porte" },
              { src: "/projets/mamou/carrousel/slide-08.jpg", alt: "Conçu et développé par A's CHAAM" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "maison-adama-tchurayy",
    nom: "Maison Adama Tchurayy",
    nomCourt: "Maison Adama",
    categorie: "E-commerce · parfumerie",
    annee: 2026,
    statut: "en-ligne",
    role: "Conception et développement",
    question: "Comment choisir un parfum sans pouvoir le sentir ?",
    resume: "Une parfumerie en ligne de Dakar pensée comme une maison, de la vitrine au conseil.",
    probleme: "Un parfum se choisit en boutique, en le sentant et en demandant conseil.",
    solution: "Des alcôves, une création du jour, un guide olfactif et une commande sans compte, payée par Wave ou à la livraison.",
    resultats: [],
    livrables: ["Boutique", "Guide olfactif", "Commande sans compte", "Administration"],
    stack: [],
    cover: "/projets/maison/video/poster.webp",
    affiche: "/projets/maison/affiche/maison-adama-affiche.webp",
    video: { src: "/projets/maison/video/maison-adama-motion.mp4", poster: "/projets/maison/video/poster.webp" },
    captures: [],
    lien: "https://maison-adama.vercel.app",
    chapo:
      "Une parfumerie en ligne de Dakar pensée comme une maison : les flacons sont exposés dans des alcôves, un guide aide à trouver son parfum, et la commande se fait sans compte, payée par Wave ou à la livraison.",
    enBref: [
      { label: "Client", value: "Maison de parfums, muscs, huiles, oud et encens à Dakar" },
      { label: "Rôle", value: "Conception et développement" },
      { label: "Périmètre", value: "Boutique, guide olfactif, tunnel de commande, administration" },
      { label: "Paiement", value: "Wave (code marchand) et paiement à la livraison" },
      { label: "Statut", value: "En ligne — maison-adama.vercel.app", href: "https://maison-adama.vercel.app" },
    ],
    fil: [
      {
        id: "defi",
        titre: "Le défi",
        messages: [
          { kind: "client", text: "Comment choisir un parfum sans pouvoir le sentir ?" },
          {
            kind: "moi",
            text: "D'habitude, on le choisit en boutique, en le sentant et en demandant conseil. Le site devait recréer cette expérience, sans l'odeur :",
          },
          {
            kind: "liste",
            items: [
              {
                label: "Le choix",
                text: "Aider une cliente qui ne connaît pas les familles olfactives à trouver un parfum qui lui ressemble.",
              },
              {
                label: "La confiance",
                text: "Une marque au logo doré et à l'image haut de gamme, à faire ressentir dès la première page.",
              },
              {
                label: "Le paiement",
                text: "La clientèle paie surtout par Wave ou en espèces, sans carte bancaire ni compte à créer.",
                slide: 6,
              },
            ],
          },
        ],
      },
      {
        id: "solution",
        titre: "La solution",
        messages: [
          {
            kind: "moi",
            text: "Le site reprend les gestes d'une vraie maison de parfum : la vitrine, le conseil, puis la commande.",
          },
          {
            kind: "etapes",
            titre: "Parcours cliente",
            items: [
              {
                titre: "Les alcôves",
                text: "Sur l'accueil, chaque flacon est exposé dans une niche en arche, comme dans une maison de Saint-Louis.",
                slide: 2,
              },
              {
                titre: "Sous la lampe",
                text: "Chaque jour, une création est mise en lumière avec ses familles et ses matières (Floral : rose, jasmin, fleur d'oranger).",
                slide: 3,
              },
              {
                titre: "Le guide",
                text: "Une roue olfactive (boisé, floral, oriental, ambré, musqué, frais…) et un assistant qui propose une sélection selon les goûts et le budget.",
                slide: 4,
              },
              {
                titre: "La boutique",
                text: "Filtres par univers, prix, contenance, famille olfactive et destinataire ; collections Nouveautés, Best-sellers et Idées cadeaux.",
              },
              {
                titre: "La commande",
                text: "Panier, coordonnées, livraison partout au Sénégal, puis Wave (instructions et QR code) ou paiement à la livraison. Aucun compte à créer.",
                slide: 5,
              },
            ],
          },
          {
            kind: "liste",
            titre: "Administration",
            slide: 7,
            items: [
              { text: "Tableau de bord : chiffre d'affaires encaissé et en attente, activité du jour en direct." },
              { text: "Produits : contenances, stock, statut de publication." },
              { text: "Commandes : à confirmer, à expédier, en livraison, et vérification des paiements Wave." },
              { text: "Promotions, et analyse des horaires de commande pour savoir quand publier ses statuts WhatsApp." },
            ],
          },
        ],
      },
      {
        id: "choix",
        titre: "Les choix clés",
        messages: [
          { kind: "client", text: "Et qu'est-ce qui remplace le vendeur et la boutique ?" },
          { kind: "moi", text: "Chaque choix remplace un geste de la boutique physique, ou supprime un frein à l'achat :" },
          {
            kind: "tableau",
            colonnes: ["Choix", "Pourquoi"],
            lignes: [
              ["Roue olfactive et guide conversationnel", "Remplacer le conseil du vendeur quand on ne peut pas sentir."],
              ["Une création « sous la lampe » chaque jour", "Donner une raison de revenir et mettre en avant le stock."],
              ["Commande sans compte", "Moins d'étapes, plus de commandes abouties ; la Maison rappelle avant d'expédier."],
              ["Wave par code marchand et paiement à la livraison", "Les deux modes réellement utilisés par la clientèle."],
              ["Rayons « bientôt » avec « Être prévenu »", "Muscs, huiles, oud et encens annoncés avant leur arrivée, pour capter les numéros."],
              ["Analyse des horaires de commande", "Publier ses statuts WhatsApp aux bons moments."],
            ],
          },
        ],
      },
      {
        id: "design",
        titre: "Le design",
        messages: [
          {
            kind: "moi",
            text: "La direction « Héritage » ancre la marque dans l'élégance des maisons sénégalaises, autour de l'or de son logo.",
          },
          {
            kind: "palette",
            approximatif: true,
            couleurs: [
              { nom: "Sable", hex: "#ECE0CA" },
              { nom: "Bois d'oud", hex: "#20170F" },
              { nom: "Or MAT", hex: "#B19D6B" },
            ],
          },
          {
            kind: "tableau",
            colonnes: ["Élément", "Choix"],
            lignes: [
              ["Typographie", "Marcellus pour les titres, Schibsted Grotesk pour l'interface."],
              ["Motifs", "Arches et alcôves, lampe dorée, numérotation éditoriale (N° 01, 02, 03)."],
              ["Navigation mobile", "Barre basse : Accueil, Boutique, Mon parfum, La Maison."],
            ],
          },
        ],
      },
      {
        id: "demontre",
        titre: "Ce que le projet démontre",
        messages: [
          { kind: "moi", text: "Transformer l'identité d'une marque en expérience d'achat complète :" },
          {
            kind: "liste",
            items: [
              { label: "Direction artistique", text: "Une identité forte (arches, lampe, or) déclinée de l'accueil jusqu'à l'administration." },
              { label: "Produit", text: "Un parcours de conseil qui compense l'absence d'odeur en ligne." },
              { label: "Conversion", text: "Une commande courte, sans compte, avec les paiements réellement utilisés au Sénégal." },
              { label: "Outil métier", text: "Une administration qui aide la Maison à vendre, pas seulement à gérer." },
            ],
          },
        ],
      },
      {
        id: "resultat",
        titre: "Le résultat",
        messages: [
          {
            kind: "carrousel",
            compte: "maison-adama",
            legende: "La Maison en huit écrans : de l'alcôve à l'administration.",
            slides: [
              { src: "/projets/maison/carrousel/slide-01.jpg", alt: "Maison Adama : une parfumerie en ligne, pensée comme une maison" },
              { src: "/projets/maison/carrousel/slide-02.jpg", alt: "L'alcôve : chaque création a sa niche" },
              { src: "/projets/maison/carrousel/slide-03.jpg", alt: "Sous la lampe : chaque jour, une création en lumière" },
              { src: "/projets/maison/carrousel/slide-04.jpg", alt: "Le guide : trouvez votre sillage" },
              { src: "/projets/maison/carrousel/slide-05.jpg", alt: "La commande : sans compte à créer" },
              { src: "/projets/maison/carrousel/slide-06.jpg", alt: "Le paiement : Wave maintenant, ou à la livraison" },
              { src: "/projets/maison/carrousel/slide-07.jpg", alt: "Côté maison : une administration sobre et précise" },
              { src: "/projets/maison/carrousel/slide-08.jpg", alt: "Conçu et développé par A's CHAAM" },
            ],
          },
        ],
      },
    ],
  },
];
