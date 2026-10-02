export type ProjectStatus = "en-ligne" | "en-construction" | "en-cours";

/** Un message du fil de l'étude de cas. */
export type CaseMessage =
  | { kind: "client"; text: string }
  | { kind: "moi"; text: string }
  /** Les briques livrées : « Identité → KYC ». */
  | { kind: "briques"; items: { label: string; valeur: string }[] }
  | { kind: "capture"; legende: string; src?: string }
  /** La scène animée du projet (voir components/projects/scenes). */
  | { kind: "scene"; slug: string }
  /**
   * Liste à puces, avec un intitulé facultatif par ligne (« Propriétaire : … »).
   * `slide` : numéro de la slide du carrousel qui illustre la liste ou la ligne.
   */
  | { kind: "liste"; titre?: string; slide?: number; items: { label?: string; text: string; slide?: number }[] }
  /** Parcours numéroté, étape par étape. */
  | { kind: "etapes"; titre?: string; items: { titre: string; text: string; slide?: number }[] }
  /** Tableau : la première colonne nomme la ligne (« Choix → Pourquoi », « Élément → Vitrine / Coulisses »). */
  | { kind: "tableau"; colonnes: string[]; lignes: string[][] }
  /** Nuancier du design du projet. `approximatif` : teintes relevées sur les visuels, codes non affichés. */
  | { kind: "palette"; approximatif?: boolean; couleurs: { nom: string; hex: string }[] }
  /** Carrousel façon post Instagram, défilé slide par slide. */
  | { kind: "carrousel"; compte: string; legende: string; slides: { src: string; alt: string }[] }
  | { kind: "a-completer"; text: string };

export interface CaseChapter {
  id: string;
  titre: string;
  messages: CaseMessage[];
}

export interface Project {
  slug: string;
  nom: string;
  /** Nom raccourci pour les espaces étroits (cadran, plan des salles). */
  nomCourt?: string;
  categorie: string;
  annee?: number;
  statut: ProjectStatus;
  /** Rôle tenu sur le projet (ex. « Lead developer »). */
  role: string;
  /** La question du client à laquelle le projet répond — titre du cartel. */
  question: string;
  resume: string;
  probleme: string;
  solution: string;
  resultats: string[];
  /** Ce qui a été livré : affiché comme « Réponse » sur le cartel. */
  livrables: string[];
  stack: string[];
  cover?: string;
  /** Affiche 16:9 du projet (titre et composition d'écrans) : détail mobile de /projets. */
  affiche?: string;
  /** Vidéo de présentation (salles de l'accueil), avec son image d'attente. */
  video?: { src: string; poster: string };
  captures: string[];
  /** Adresse publique, uniquement si le projet est en ligne. */
  lien?: string;
  /** Fil de l'étude de cas rédigé à la main ; sinon il est déduit des champs ci-dessus. */
  fil?: CaseChapter[];
  /** Chapeau de l'étude de cas, sous la question. */
  chapo?: string;
  /** Fiche « En bref » de l'étude de cas ; remplace les infos par défaut de l'en-tête. */
  enBref?: { label: string; value: string; href?: string }[];
}
