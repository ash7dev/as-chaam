import { displayDomain, statusLabels } from "@/lib/projects";
import { cn } from "@/lib/cn";
import type { Project, ProjectStatus } from "@/types/project";

const dotColor: Record<ProjectStatus, string> = {
  "en-ligne": "bg-success",
  "en-construction": "bg-muted",
  "en-cours": "bg-muted",
};

interface StatusBadgeProps {
  project: Pick<Project, "statut" | "lien">;
  /** Affiche le domaine du site en ligne, cliquable. */
  withLink?: boolean;
  className?: string;
}

/** Point de couleur + statut (+ domaine si le projet est en ligne). */
export function StatusBadge({ project, withLink = false, className }: StatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span aria-hidden="true" className={cn("size-1.5 rounded-pill", dotColor[project.statut])} />
      {statusLabels[project.statut]}
      {withLink && project.lien && (
        <>
          {" — "}
          <a href={project.lien} target="_blank" rel="noopener noreferrer" className="link">
            {displayDomain(project.lien)}
          </a>
        </>
      )}
    </span>
  );
}
