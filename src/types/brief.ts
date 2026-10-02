import type { ProjectStatus } from "@/types/project";

export type Goal = "vendre" | "lancer" | "digitaliser" | "grandir" | "autre";

export type PlanKey = "boutique" | "marketplace" | "lancer" | "digitaliser" | "grandir" | "autre";

export type BriefNodeId =
  | "start"
  | "vendreModele"
  | "boutiqueProduits"
  | "boutiqueCanal"
  | "boutiquePaiement"
  | "marketplaceOffre"
  | "marketplaceConfiance"
  | "lancerProduit"
  | "lancerUtilisateurs"
  | "lancerModele"
  | "digitaliserFriction"
  | "digitaliserOutil"
  | "digitaliserEquipe"
  | "grandirSite"
  | "grandirMesure"
  | "grandirPublicite"
  | "autreProjet"
  | "stade"
  | "delai"
  | "campagnes"
  | "plan"
  | "whatsappEnvoye"
  | "contact"
  | "contactEnvoye"
  | "contactErreur";

/** Destination d'une réponse : un nœud, ou une étape résolue selon le contexte. */
export type BriefTarget = BriefNodeId | "apresDelai";

/** Un projet du portfolio cité comme preuve dans la conversation. */
export interface BriefProof {
  projectSlug: string;
  meta: string;
}

export interface BriefContext {
  goal?: Goal;
  plan?: PlanKey;
  wantsCampaigns: boolean;
}

export interface BriefOption {
  label: string;
  next?: BriefTarget;
  /** Messages envoyés à la suite juste après ce choix. */
  react?: string[];
  proof?: BriefProof;
  set?: Partial<BriefContext>;
  /** Bouton de conversion (glacier) : un seul par écran. */
  accent?: boolean;
  action?: "whatsapp" | "restart";
}

export interface BriefNode {
  /** La question, affichée en Fraunces. */
  ask?: string;
  /** Intitulé court de la réponse dans le récapitulatif (« Objectif », « Délai »…). */
  key?: string;
  /** Messages qui précèdent la question. */
  intro?: string[];
  /** Répond par un accusé court (« Noté. ») quand le choix n'a pas de réaction propre. */
  ack?: boolean;
  options?: BriefOption[];
  /** Saisie libre plutôt que des propositions. */
  input?: "text" | "contact";
  next?: BriefTarget;
  react?: string[];
  showPlan?: boolean;
  showWhatsappPreview?: boolean;
}

export interface BriefPlan {
  title: string;
  proof: string;
  steps: string[];
}

export interface BriefAnswer {
  question: string;
  answer: string;
}

export type BriefMessage =
  | { id: number; kind: "bot"; text: string }
  | { id: number; kind: "ask"; text: string }
  | { id: number; kind: "user"; text: string }
  | {
      id: number;
      kind: "proof";
      name: string;
      meta: string;
      href: string;
      /** Visuel du projet (affiche 16:9, sinon image de la vidéo ou couverture). */
      image?: string;
      status: ProjectStatus;
    }
  | { id: number; kind: "plan"; plan: BriefPlan }
  | { id: number; kind: "whatsapp"; answers: BriefAnswer[]; planTitle: string };

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

/** Message pas encore numéroté : l'identifiant est attribué à l'affichage. */
export type DraftMessage = DistributiveOmit<BriefMessage, "id">;
