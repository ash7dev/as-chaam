"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { buttonClass, type ButtonVariant } from "@/components/ui/Button";
import type { Goal } from "@/types/brief";
import { useBriefContext } from "./BriefProvider";

interface StartBriefLinkProps {
  /** Objectif à choisir d'emblée ; sans objectif, on rejoint simplement le brief. */
  goal?: Goal;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

/** Mène au brief de l'accueil, déjà lancé sur le bon objectif. */
export function StartBriefLink({ goal, variant = "primary", className, children }: StartBriefLinkProps) {
  const { startWith } = useBriefContext();
  return (
    <Link href="/#brief" onClick={() => goal && startWith(goal)} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}
