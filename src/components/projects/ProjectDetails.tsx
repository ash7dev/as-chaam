import Image from "next/image";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Label } from "@/components/ui/Label";
import type { Project } from "@/types/project";
import { ProjectVisual } from "./ProjectVisual";
import { StatusBadge } from "./StatusBadge";

/** Le projet placé sous le repère du cadran. En mobile, son visuel s'affiche au-dessus. */
export function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="animate-fade-up flex flex-col gap-4 lg:gap-5">
      {project.affiche ? (
        // L'affiche porte son propre texte : on garde son format 16:9 pour ne rien rogner.
        <div className="relative aspect-video overflow-hidden rounded-section border border-line lg:hidden">
          <Image src={project.affiche} alt={`Affiche du projet ${project.nom}`} fill sizes="100vw" className="object-cover" />
        </div>
      ) : (
        <ProjectVisual project={project} sizes="100vw" className="aspect-16/10 lg:hidden" />
      )}
      <p className="font-display text-xl font-light italic leading-snug text-muted lg:text-[1.375rem]">« {project.question} »</p>
      <h2 className="text-h2 lg:text-[2.75rem]">{project.nom}</h2>
      <hr className="hidden border-line lg:block" />
      <dl className="hidden flex-col gap-3.5 text-sm lg:flex">
        <DetailRow term="Rôle">{project.role}</DetailRow>
        <DetailRow term="Livré">{project.livrables.join(", ")}</DetailRow>
        <DetailRow term="Statut">
          <StatusBadge project={project} withLink />
        </DetailRow>
      </dl>
      <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-stretch">
        <StatusBadge project={project} className="font-mono text-[10px] uppercase tracking-[0.08em] lg:hidden" />
        <ButtonLink href={`/projets/${project.slug}`} className="lg:justify-between">
          Lire l&apos;étude de cas
          <ArrowRightIcon />
        </ButtonLink>
      </div>
    </div>
  );
}

function DetailRow({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <Label as="dt" className="text-[10px]">
        {term}
      </Label>
      <dd>{children}</dd>
    </div>
  );
}
