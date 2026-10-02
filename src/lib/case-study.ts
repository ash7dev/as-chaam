import type { CaseChapter, Project } from "@/types/project";

/** Ancre d'une slide du carrousel (une seule par étude de cas) : « slide-04 ». */
export function slideAnchor(slide: number): string {
  return `slide-${String(slide).padStart(2, "0")}`;
}

/**
 * Le fil de l'étude de cas : celui rédigé à la main s'il existe,
 * sinon un fil déduit de la fiche (question, problème, solution, livrables).
 */
export function getCaseStudy(project: Project): CaseChapter[] {
  if (project.fil?.length) return project.fil;

  return [
    {
      id: "besoin",
      titre: "Le besoin",
      messages: [
        { kind: "client", text: project.question, flou: project.confidentiel },
        { kind: "moi", text: project.probleme, flou: project.confidentiel },
      ],
    },
    {
      id: "choix",
      titre: "Les choix",
      messages: [
        { kind: "moi", text: project.solution, flou: project.confidentiel },
        ...(project.livrables.length
          ? [{ kind: "briques" as const, items: project.livrables.map((valeur, index) => ({ label: String(index + 1).padStart(2, "0"), valeur })) }]
          : []),
      ],
    },
    {
      id: "resultat",
      titre: "Le résultat",
      messages: project.resultats.length
        ? project.resultats.map((text) => ({ kind: "moi" as const, text }))
        : [{ kind: "a-completer", text: "Résultats à ajouter." }],
    },
  ];
}
