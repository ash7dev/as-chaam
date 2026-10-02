"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface ChapterNavProps {
  chapters: { id: string; titre: string }[];
}

/** Sommaire du fil : liste à gauche sur desktop, capsules collantes en mobile. Suit la lecture. */
export function ChapterNav({ chapters }: ChapterNavProps) {
  const [active, setActive] = useState(chapters[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      // Un chapitre devient actif quand il passe dans le tiers haut de l'écran.
      { rootMargin: "-20% 0px -70% 0px" },
    );
    chapters.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <nav
      aria-label="Chapitres"
      className="sticky top-0 z-10 -mx-4 border-b border-line bg-bg/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none"
    >
      <p className="label mb-3 hidden lg:block">Le fil</p>
      <ul className="flex gap-1.5 overflow-x-auto lg:flex-col lg:gap-1">
        {chapters.map(({ id, titre }) => {
          const isActive = id === active;
          return (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex min-h-11 items-center gap-3 whitespace-nowrap rounded-pill px-4 text-sm transition-colors lg:rounded-none lg:px-0 lg:text-[15px]",
                  isActive
                    ? "bg-text font-semibold text-bg lg:bg-transparent lg:text-text"
                    : "border border-line text-muted hover:text-text lg:border-0",
                )}
              >
                <span aria-hidden="true" className={cn("hidden h-px w-4.5 lg:block", isActive ? "h-0.5 bg-accent" : "bg-line-strong")} />
                {titre}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
