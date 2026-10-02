"use client";

import { useEffect, useRef, useState } from "react";

interface ProjectVideoProps {
  src: string;
  poster: string;
  label: string;
}

type NetworkInformation = { saveData?: boolean };

/**
 * Vidéo de présentation : téléchargée seulement à l'approche, jouée muette en boucle
 * quand elle est visible, en pause sinon. Image d'attente seule si le visiteur
 * réduit les animations ou économise ses données.
 */
export function ProjectVideo({ src, poster, label }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: NetworkInformation }).connection?.saveData;
    if (reduceMotion || saveData) return;

    // Charge un peu avant que la salle n'arrive à l'écran.
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        loader.disconnect();
      },
      { rootMargin: "0px 400px 300px 400px" },
    );

    // Lecture quand au moins un tiers est visible, pause sinon.
    const player = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (!video.currentSrc) return; // pas encore de source : la lecture démarrera au chargement
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );

    loader.observe(video);
    player.observe(video);
    return () => {
      loader.disconnect();
      player.disconnect();
    };
  }, []);

  // Une fois la source posée, on lance la lecture si la salle est déjà à l'écran.
  useEffect(() => {
    if (shouldLoad && isVisible.current) videoRef.current?.play().catch(() => {});
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 size-full object-cover"
    />
  );
}
