"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { ArrowUpIcon } from "@/components/ui/icons";
import { useBriefContext } from "./BriefProvider";

/** Bouton du brief dans la barre de navigation : ramène à la carte du hero, depuis n'importe quelle page. */
export function BriefLauncher() {
  const { hasProgress } = useBriefContext();

  // Sur l'accueil, défilement doux jusqu'à la carte plutôt qu'un saut d'ancre.
  function scrollToBrief(event: MouseEvent<HTMLAnchorElement>) {
    const card = document.getElementById("brief");
    if (!card) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    card.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  return (
    <Link
      href="/#brief"
      onClick={scrollToBrief}
      aria-label={hasProgress ? "Reprendre le brief" : "Démarrer le brief"}
      className="relative grid size-11 shrink-0 place-items-center rounded-pill bg-text text-bg transition-opacity hover:opacity-85"
    >
      <ArrowUpIcon strokeWidth={2.2} />
      {hasProgress && (
        <span aria-hidden="true" className="absolute top-0.5 right-0.5 size-2.5 rounded-pill border-2 border-surface bg-accent" />
      )}
    </Link>
  );
}
