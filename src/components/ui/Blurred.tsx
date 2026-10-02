import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BlurredProps {
  children: ReactNode;
  /** Pastille posée sur le flou. */
  label?: string;
  className?: string;
}

/**
 * Texte flouté d'un projet confidentiel. Le contenu passé ici doit être un leurre :
 * le flou CSS se lit dans le code source, la vraie description ne doit jamais arriver jusqu'ici.
 */
export function Blurred({ children, label = "Confidentiel", className }: BlurredProps) {
  return (
    <span className={cn("relative block", className)}>
      <span aria-hidden="true" className="pointer-events-none block blur-[6px] select-none">
        {children}
      </span>
      <span className="absolute inset-0 grid place-items-center">
        <span className="label rounded-pill border border-line-strong bg-bg/80 px-3 py-1.5 text-[10px] not-italic text-text backdrop-blur">
          {label}
        </span>
      </span>
    </span>
  );
}
