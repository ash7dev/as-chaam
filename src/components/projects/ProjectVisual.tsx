import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/project";
import { ProjectVideo } from "./ProjectVideo";
import { projectScenes } from "./scenes";

interface ProjectVisualProps {
  project: Pick<Project, "slug" | "nom" | "cover" | "video">;
  sizes: string;
  /** Rectangle (par défaut) ou disque, pour le centre du cadran. */
  shape?: "rect" | "disc";
  /** Joue la vidéo du projet, sinon sa scène animée, si elles existent (salles de l'accueil). */
  animated?: boolean;
  className?: string;
}

/**
 * Visuel d'un projet : sa vidéo ou sa scène animée si demandées, sinon sa couverture,
 * sinon une plaque typographique à son nom.
 */
export function ProjectVisual({ project, sizes, shape = "rect", animated = false, className }: ProjectVisualProps) {
  const video = animated ? project.video : undefined;
  const Scene = animated ? projectScenes[project.slug] : undefined;

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-line bg-surface",
        shape === "disc" ? "rounded-full" : "rounded-section",
        className,
      )}
    >
      {video ? (
        <ProjectVideo src={video.src} poster={video.poster} label={`${project.nom} en vidéo`} />
      ) : Scene ? (
        <Scene />
      ) : project.cover ? (
        <Image src={project.cover} alt={`Aperçu de ${project.nom}`} fill sizes={sizes} className="object-cover" />
      ) : (
        <div aria-hidden="true" className="bg-dots absolute inset-0 grid place-items-center p-8">
          <span className="text-center font-display text-5xl font-light italic tracking-[-0.03em] text-muted sm:text-7xl">
            {project.nom}
          </span>
        </div>
      )}
    </div>
  );
}
