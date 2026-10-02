"use client";

import type { ReactNode } from "react";
import { Label } from "@/components/ui/Label";
import { DakarClock } from "./DakarClock";
import { useDakarTime } from "./useDakarTime";

const pad = (n: number) => String(n).padStart(2, "0");

/** L'horloge et le titre partagent la même heure : « Il est 14 h 32 à Dakar. » */
export function ContactHero({ children }: { children: ReactNode }) {
  const time = useDakarTime();
  // Espaces insécables : « 19 h 56 » ne se coupe jamais en fin de ligne.
  const spoken = time ? `${time.hours}\u00a0h\u00a0${pad(time.minutes)}` : null;

  return (
    <div className="mx-auto grid max-w-page grid-cols-1 items-center gap-10 px-4 pt-6 pb-28 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24 lg:px-16 lg:pt-12 lg:pb-32">
      <DakarClock time={time} className="mx-auto w-[min(80vw,20rem)] lg:w-full lg:max-w-[35rem]" />

      <div className="flex min-w-0 flex-col gap-6 lg:gap-7">
        <Label as="p">Contact</Label>
        <h1 className="text-[3rem] leading-[0.98] tracking-[-0.04em] lg:text-[5.25rem]" aria-live="off">
          {spoken ? (
            <>
              Il est <em>{spoken}</em> à Dakar.
            </>
          ) : (
            <>
              Écrivez-moi depuis <em>Dakar</em> ou d&apos;ailleurs.
            </>
          )}
        </h1>
        <p className="max-w-lg text-intro text-muted">
          Le bon moment pour parler de votre projet. Choisissez votre canal, je réponds en personne.
        </p>
        {children}
      </div>
    </div>
  );
}
