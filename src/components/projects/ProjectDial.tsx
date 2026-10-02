"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/cn";
import { shortName } from "@/lib/projects";
import type { Project } from "@/types/project";
import { ProjectDetails } from "./ProjectDetails";
import { ProjectVisual } from "./ProjectVisual";

const pad = (n: number) => String(n).padStart(2, "0");
const SWIPE_THRESHOLD = 40; // px
const WHEEL_COOLDOWN = 450; // ms : un cran de cadran par geste de molette

/**
 * Le cadran des projets. Desktop : cercle complet (molette, glisser, flèches).
 * Mobile : demi-cadran sous le pouce, on le fait glisser.
 * Le projet placé sous le repère glacier s'affiche en détail.
 */
export function ProjectDial({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const dialRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);
  const activeRef = useRef(active);
  const last = projects.length - 1;

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const go = useCallback((index: number) => setActive(Math.min(Math.max(index, 0), last)), [last]);
  const turn = useCallback((delta: number) => setActive((current) => Math.min(Math.max(current + delta, 0), last)), [last]);

  // Molette : listener natif non passif pour pouvoir bloquer le défilement de la page,
  // sauf aux butées, où la page reprend la main.
  useEffect(() => {
    const dial = dialRef.current;
    if (!dial) return;
    let cooling = false;
    function onWheel(event: WheelEvent) {
      const direction = Math.sign(event.deltaY);
      const current = activeRef.current;
      const atStop = (direction < 0 && current === 0) || (direction > 0 && current === last);
      if (!direction || atStop) return;
      event.preventDefault();
      if (cooling) return;
      cooling = true;
      setTimeout(() => (cooling = false), WHEEL_COOLDOWN);
      setActive(current + direction);
    }
    dial.addEventListener("wheel", onWheel, { passive: false });
    return () => dial.removeEventListener("wheel", onWheel);
  }, [last]);

  function onKeyDown(event: KeyboardEvent) {
    const moves: Record<string, () => void> = {
      ArrowRight: () => turn(1),
      ArrowDown: () => turn(1),
      ArrowLeft: () => turn(-1),
      ArrowUp: () => turn(-1),
      Home: () => go(0),
      End: () => go(last),
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    move();
  }

  function onPointerDown(event: PointerEvent) {
    swipeStart.current = event.clientX;
  }

  function onPointerUp(event: PointerEvent) {
    if (swipeStart.current === null) return;
    const dx = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) >= SWIPE_THRESHOLD) turn(dx < 0 ? 1 : -1);
  }

  const current = projects[active];

  return (
    <div className="mx-auto grid max-w-page grid-cols-1 gap-8 px-4 pt-2 pb-28 sm:px-8 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-12 lg:items-center lg:gap-6 lg:px-16 lg:pb-32">
      <header className="flex flex-col gap-6 lg:col-span-3">
        <Label as="p">
          Projets · {pad(active + 1)} / {pad(projects.length)}
        </Label>
        <h1 className="sr-only lg:not-sr-only lg:text-[4.75rem] lg:leading-[0.98] lg:tracking-[-0.04em]">
          Tournez le <em>cadran</em>.
        </h1>
        <p className="hidden text-intro text-muted lg:block">
          Le projet du dessus s&apos;ouvre. Molette, glisser ou flèches du clavier.
        </p>
        <div className="hidden gap-2 lg:flex">
          <Button variant="ghost" onClick={() => turn(-1)} disabled={active === 0} aria-label="Projet précédent" className="px-3.5 disabled:opacity-40">
            <ArrowLeftIcon />
          </Button>
          <Button variant="ghost" onClick={() => turn(1)} disabled={active === last} aria-label="Projet suivant" className="px-3.5 disabled:opacity-40">
            <ArrowRightIcon />
          </Button>
        </div>
      </header>

      <section aria-live="polite" aria-label="Projet sélectionné" className="lg:order-3 lg:col-span-3">
        <ProjectDetails key={current.slug} project={current} />
      </section>

      {/* Mobile : seul le haut du cadran dépasse, sous le pouce. Desktop : cercle complet. */}
      <div className="relative -mx-4 h-80 overflow-hidden sm:-mx-8 lg:order-2 lg:col-span-6 lg:mx-0 lg:h-auto lg:overflow-visible">
        <div
          ref={dialRef}
          role="group"
          aria-roledescription="cadran"
          aria-label="Cadran des projets : flèches pour tourner"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (swipeStart.current = null)}
          style={{ "--active": active, "--count": projects.length } as CSSProperties}
          className="dial absolute top-10 left-1/2 aspect-square w-[38.75rem] -translate-x-1/2 touch-pan-y select-none rounded-full lg:relative lg:top-auto lg:left-auto lg:mx-auto lg:w-full lg:max-w-[40rem] lg:translate-x-0"
        >
          {/* Lunette : graduations et noms tournent ensemble, les noms restent droits. */}
          <div className="dial-ring absolute inset-0">
            <span aria-hidden="true" className="dial-ticks absolute inset-0 rounded-full" />
            <span aria-hidden="true" className="absolute inset-0 rounded-full border border-line" />
            {projects.map((project, index) => {
              const offset = index - active;
              return (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => go(index)}
                  aria-current={offset === 0 ? "true" : undefined}
                  aria-label={`${pad(index + 1)} · ${project.nom}`}
                  style={{ "--index": index } as CSSProperties}
                  className={cn(
                    "dial-label absolute top-1/2 left-1/2 flex min-h-11 flex-col items-center justify-center gap-0.5 whitespace-nowrap px-2",
                    offset === 0 ? "text-text" : "text-muted hover:text-text",
                    // Mobile : seuls le projet courant et ses deux voisins restent sur l'arc visible.
                    Math.abs(offset) > 1 && "max-lg:pointer-events-none max-lg:opacity-0",
                  )}
                >
                  <span className={cn("font-mono text-[10px]", offset === 0 && "text-accent")}>{pad(index + 1)}</span>
                  <span className={cn("font-display", offset === 0 ? "text-[1.375rem]" : "text-lg")}>{shortName(project)}</span>
                </button>
              );
            })}
          </div>

          <span aria-hidden="true" className="absolute -top-5 left-1/2 h-8 w-0.5 -translate-x-1/2 rounded-pill bg-accent" />

          <ProjectVisual
            project={current}
            shape="disc"
            sizes="(min-width: 1024px) 26rem, 0px"
            className="absolute inset-[17%] max-lg:hidden"
          />
          <p aria-hidden="true" className="label absolute inset-x-0 top-[30%] text-center lg:hidden">
            ← glissez le cadran →
          </p>
        </div>
      </div>
    </div>
  );
}
