"use client";

import { useEffect, useRef, useState } from "react";
import { ProjectCartel } from "@/components/projects/ProjectCartel";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { shortName } from "@/lib/projects";
import type { Project } from "@/types/project";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Les projets présentés comme des salles d'exposition : un défilement horizontal
 * aimanté, un plan des salles et une progression.
 */
export function ProjectRooms({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const roomRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // La salle active est celle qui occupe le plus le cadre.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;
        const best = visible.reduce((a, b) => (b.intersectionRatio > a.intersectionRatio ? b : a));
        setActive(roomRefs.current.indexOf(best.target as HTMLElement));
      },
      { root: track, threshold: [0.5, 0.75, 1] },
    );
    roomRefs.current.forEach((room) => room && observer.observe(room));
    return () => observer.disconnect();
  }, [projects.length]);

  function goTo(index: number) {
    const track = trackRef.current;
    const room = roomRefs.current[index];
    if (!track || !room) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: room.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  const current = projects[active];
  const next = projects[active + 1];

  return (
    <section aria-labelledby="rooms-title" className="flex flex-col gap-10 border-t border-line pt-14 pb-10">
      <div className="mx-auto flex w-full max-w-page flex-col gap-6 px-4 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-16">
        <div className="flex flex-col gap-5">
          <p className="label text-text" aria-live="polite">
            Salle {pad(active + 1)} sur {pad(projects.length)} — {current?.nom}
          </p>
          <h2 id="rooms-title" className="max-w-3xl text-h2">
            Des questions auxquelles j&apos;ai déjà <em>répondu</em>.
          </h2>
        </div>
        <nav aria-label="Plan des salles" className="hidden gap-0.5 rounded-pill border border-line bg-surface p-1.5 lg:flex">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => goTo(index)}
              aria-current={index === active ? "true" : undefined}
              className={cn(
                "flex min-h-11 flex-col items-center justify-center gap-1.5 rounded-pill px-3.5 text-[13px] transition-colors",
                index === active ? "bg-line font-semibold text-text" : "text-muted hover:text-text",
              )}
            >
              <span aria-hidden="true" className={cn("h-0.75 w-5.5 rounded-pill", index <= active ? "bg-text" : "bg-line-strong")} />
              {shortName(project)}
            </button>
          ))}
        </nav>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="Salles des projets"
        tabIndex={0}
        className="relative flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-4 px-4 pb-4 sm:scroll-px-8 sm:px-8 lg:gap-12 lg:scroll-px-16 lg:px-16"
      >
        {projects.map((project, index) => (
          <div
            key={project.slug}
            ref={(element) => {
              roomRefs.current[index] = element;
            }}
            aria-label={`Salle ${pad(index + 1)} : ${project.nom}`}
            role="group"
            className={cn(
              "grid w-[86vw] shrink-0 snap-start items-end gap-5 transition-opacity duration-300 sm:w-[78vw] lg:w-[min(68rem,80vw)] lg:grid-cols-[minmax(0,1fr)_18.75rem] lg:gap-12",
              index !== active && "opacity-50",
            )}
          >
            <ProjectVisual
              project={project}
              sizes="(min-width: 1024px) 60vw, 86vw"
              animated
              className="aspect-16/10"
            />
            <ProjectCartel project={project} />
          </div>
        ))}
      </div>

      <div className="mx-auto flex w-full max-w-page items-end gap-6 px-4 sm:px-8 lg:gap-10 lg:px-16">
        <p className="flex items-baseline gap-2.5" aria-hidden="true">
          <span className="font-display text-7xl leading-[0.85] tracking-[-0.05em] lg:text-[7.5rem]">{pad(active + 1)}</span>
          <span className="font-mono text-[13px] text-muted">/ {pad(projects.length)}</span>
        </p>
        <div aria-hidden="true" className="mb-3.5 hidden flex-1 gap-2 sm:flex">
          {projects.map((project, index) => (
            <span key={project.slug} className={cn("h-0.5 flex-1", index <= active ? "bg-text" : "bg-line")} />
          ))}
        </div>
        <div className="ml-auto flex gap-2 sm:ml-0">
          <Button variant="ghost" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Salle précédente" className="px-3.5 disabled:opacity-40">
            <ArrowLeftIcon />
          </Button>
          <Button
            variant="ghost"
            onClick={() => goTo(next ? active + 1 : 0)}
            aria-label={next ? `Salle suivante : ${next.nom}` : "Revenir à la première salle"}
            className="px-3.5 sm:px-6"
          >
            <span className="hidden sm:inline">{next ? `Suivante : ${shortName(next)}` : "Revenir au début"}</span>
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </section>
  );
}
