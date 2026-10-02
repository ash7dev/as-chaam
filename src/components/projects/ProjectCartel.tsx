import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/project";
import { StatusBadge } from "./StatusBadge";

/** Le cartel de musée d'un projet : la question du client, puis la réponse livrée. */
export function ProjectCartel({ project, className }: { project: Project; className?: string }) {
  return (
    <article className={cn("flex flex-col gap-4 rounded-inner border border-line-strong p-5", className)}>
      <p className="font-display text-xl font-light italic leading-snug text-muted">« {project.question} »</p>
      <h3 className="text-h3">{project.nom}</h3>
      <hr className="border-line" />
      <dl className="flex flex-col gap-3 text-sm">
        <CartelRow term="Rôle">{project.role}</CartelRow>
        <CartelRow term="Réponse">{project.livrables.join(", ")}</CartelRow>
        {project.stack.length > 0 && <CartelRow term="Technique">{project.stack.join(", ")}</CartelRow>}
        <CartelRow term="Statut">
          <StatusBadge project={project} withLink />
        </CartelRow>
      </dl>
      <ButtonLink href={`/projets/${project.slug}`} variant="ghost" className="justify-between">
        Étude de cas
        <ArrowRightIcon />
      </ButtonLink>
    </article>
  );
}

function CartelRow({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <Label as="dt" className="text-[10px]">
        {term}
      </Label>
      <dd>{children}</dd>
    </div>
  );
}
