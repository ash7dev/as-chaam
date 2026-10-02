"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { slideAnchor } from "@/lib/case-study";
import { cn } from "@/lib/cn";

interface CaseCarouselProps {
  compte: string;
  legende: string;
  slides: { src: string; alt: string }[];
}

const pad = (n: number) => String(n).padStart(2, "0");
const arrowButton =
  "absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-pill border border-line-strong bg-bg/85 text-text backdrop-blur transition-opacity hover:bg-bg disabled:pointer-events-none disabled:opacity-0 sm:grid";

/**
 * Carrousel façon post Instagram : les slides se touchent (panorama continu),
 * on défile au doigt, à la molette ou au clavier, une slide à la fois.
 */
export function CaseCarousel({ compte, legende, slides }: CaseCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const last = slides.length - 1;

  // La slide active suit la position de défilement (arrondie à la slide la plus proche).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActive(Math.round(track!.scrollLeft / track!.clientWidth)));
    }
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: index * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <figure className="-mx-4 flex flex-col self-start overflow-hidden border-y border-line bg-surface sm:mx-0 sm:w-full sm:rounded-[22px_22px_22px_6px] sm:border">
      <header className="flex items-center justify-between gap-3 px-4 py-3">
        <span className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-full border border-line-strong font-display text-sm font-light italic text-accent"
          >
            A
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold leading-none">{compte}</span>
            <span className="label text-[10px]">Carrousel · {slides.length} slides</span>
          </span>
        </span>
        <span className="label rounded-pill border border-line px-2.5 py-1.5 text-[10px] text-text" aria-live="polite">
          {pad(active + 1)} / {pad(slides.length)}
        </span>
      </header>

      <div className="relative">
        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carrousel"
          aria-label={legende}
          tabIndex={0}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
        >
          {slides.map((slide, index) => (
            <div
              key={slide.src}
              id={slideAnchor(index + 1)}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} sur ${slides.length}`}
              // scroll-mt : après « Voir la slide », l'en-tête du carrousel reste visible (sous le sommaire collant en mobile).
              className="relative aspect-4/5 w-full shrink-0 scroll-mt-36 snap-start snap-always lg:scroll-mt-20"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                quality={90}
                priority={index === 0}
                sizes="(min-width: 1024px) 44rem, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Slide précédente" className={cn(arrowButton, "left-3")}>
          <ArrowLeftIcon />
        </button>
        <button type="button" onClick={() => goTo(active + 1)} disabled={active === last} aria-label="Slide suivante" className={cn(arrowButton, "right-3")}>
          <ArrowRightIcon />
        </button>
      </div>

      <div className="flex flex-col gap-3 px-4 pt-3 pb-4">
        <div className="flex justify-center gap-1.5" aria-hidden="true">
          {slides.map((slide, index) => (
            <span
              key={slide.src}
              className={cn("h-1.5 rounded-pill transition-all duration-300", index === active ? "w-5 bg-accent" : "w-1.5 bg-line-strong")}
            />
          ))}
        </div>
        <figcaption className="text-sm leading-relaxed">
          <span className="font-semibold">{compte}</span> <span className="text-muted">{legende}</span>
        </figcaption>
      </div>
    </figure>
  );
}
