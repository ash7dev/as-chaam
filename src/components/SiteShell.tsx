import type { ReactNode } from "react";
import { CommandBar } from "@/components/CommandBar";
import { SiteHeader } from "@/components/SiteHeader";

/** Enveloppe commune des pages : halo glacier, en-tête, barre de navigation flottante. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Le halo couvre l'en-tête et le haut de page d'un seul tenant, sans arête visible. */}
      <div className="bg-halo flex flex-1 flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
      </div>
      <CommandBar />
    </>
  );
}
