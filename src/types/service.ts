import type { Goal } from "@/types/brief";

export type ServiceId = Exclude<Goal, "autre">;

export type PartitionTrack = "Produit" | "Design" | "Code" | "Mesure";

/** cœur du service · inclus · en option */
export type PartitionLevel = "coeur" | "inclus" | "option";

export interface PartitionBlock {
  label: string;
  track: PartitionTrack;
  /** Mouvement de début et de fin, de 1 à 5 (voir `partitionPhases`). */
  from: number;
  to: number;
  level: PartitionLevel;
}

export interface Service {
  id: ServiceId;
  verbe: string;
  resume: string;
  /** Ce que je fais concrètement. */
  faits: string[];
  /** Projets cités comme preuves, par slug. */
  preuves: { slug: string; note: string }[];
  stack: string;
  partition: PartitionBlock[];
}
