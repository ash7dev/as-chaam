import { projects } from "@/content/projects";
import type { Project, ProjectStatus } from "@/types/project";

// Seul point d'accès aux projets : pour passer à Supabase plus tard,
// on ne change que ce fichier.

export function getProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Le projet suivant dans l'ordre d'affichage (revient au premier après le dernier). */
export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

export function shortName(project: Pick<Project, "nom" | "nomCourt">): string {
  return project.nomCourt ?? project.nom;
}

export const statusLabels: Record<ProjectStatus, string> = {
  "en-ligne": "En ligne",
  "en-construction": "En construction",
  "en-cours": "En cours",
};

/** « https://autoloc.sn » → « autoloc.sn » */
export function displayDomain(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
