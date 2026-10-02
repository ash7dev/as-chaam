"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import styles from "./KollectScene.module.css";

const base = "/projets/kollect/scene";

const desktopShots = [
  { src: `${base}/vitrine.webp`, alt: "Kollect : la vitrine des créateurs", className: styles.vitrine },
  { src: `${base}/dashboard.webp`, alt: "Kollect : le tableau de bord vendeur", className: styles.dashboard },
  { src: `${base}/studio.webp`, alt: "Kollect : le Creative Studio", className: styles.studio },
];

const phones = [
  { src: `${base}/app-accueil.webp`, alt: "Kollect : l'accueil de l'app mobile", className: styles.phoneA },
  { src: `${base}/app-produit.webp`, alt: "Kollect : une fiche produit dans l'app", className: styles.phoneB },
];

const chapters = [
  { title: "La vitrine des créateurs", detail: "Drops exclusifs, découverte, boutique" },
  { title: "L'app mobile", detail: "Les drops des marques, achat depuis la fiche" },
  { title: "Le tableau de bord vendeur", detail: "Chiffre d'affaires, objectifs, commandes" },
  { title: "Le Creative Studio", detail: "Des stories prêtes à partager, avec QR code" },
];

/**
 * Scène animée de Kollect : un motion design codé, en boucle.
 * Elle ne joue que lorsqu'elle est à l'écran.
 */
export function KollectScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const scene = ref.current;
    if (!scene) return;
    const observer = new IntersectionObserver(([entry]) => setPlaying(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Kollect en quatre temps : la vitrine des créateurs, l'app mobile, le tableau de bord vendeur et le Creative Studio."
      data-playing={playing || undefined}
      className={styles.scene}
    >
      <span aria-hidden="true" className={styles.title}>
        Kollect
      </span>

      <div className={styles.browser}>
        <div aria-hidden="true" className={styles.bar}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.screen}>
          {desktopShots.map((shot) => (
            <div key={shot.src} className={cn(styles.shot, shot.className)}>
              <Image src={shot.src} alt="" fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover object-top" />
            </div>
          ))}
        </div>
      </div>

      {phones.map((phone) => (
        <div key={phone.src} className={cn(styles.phone, phone.className)}>
          <div className={styles.phoneScreen}>
            <Image src={phone.src} alt="" fill sizes="(min-width: 1024px) 13vw, 30vw" className="object-cover object-top" />
          </div>
        </div>
      ))}

      <span aria-hidden="true" className={styles.ring} />

      <div aria-hidden="true" className={styles.captions}>
        {chapters.map((chapter, index) => (
          <p key={chapter.title} className={styles.caption}>
            <span className={styles.captionNumber}>{String(index + 1).padStart(2, "0")}</span>
            <span>
              <span className={styles.captionTitle}>{chapter.title}</span>
              <span className={styles.captionDetail}>{chapter.detail}</span>
            </span>
          </p>
        ))}
      </div>

      <div aria-hidden="true" className={styles.progress}>
        <span className="label text-[10px]">Kollect</span>
        <span className={styles.progressTrack} />
      </div>
    </div>
  );
}
