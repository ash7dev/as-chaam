import type { Metadata } from "next";
import Image from "next/image";
import { CalibreMark } from "@/components/about/CalibreMark";
import { SpecSheet } from "@/components/about/SpecSheet";
import { StartBriefLink } from "@/components/brief/StartBriefLink";
import { SiteShell } from "@/components/SiteShell";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Label } from "@/components/ui/Label";
import { portrait, specSheet } from "@/content/about";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "A's CHAAM, développeur full-stack et product builder à Dakar : la fiche technique.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Portrait bord à bord : en tête en mobile, colonne collante sur desktop. */}
        <figure className="relative h-[34rem] lg:sticky lg:top-0 lg:h-svh lg:border-r lg:border-line">
          {/* next/image en « fill » exige un parent positionné (relative), pas « sticky ». */}
          <div className="relative h-full">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-[50%_16%] brightness-[.86] contrast-[1.08] grayscale sepia-[.16]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-44 bg-linear-to-b from-transparent to-bg lg:hidden"
            />
          </div>
          <figcaption className="absolute inset-x-8 bottom-8 hidden items-end justify-between gap-4 rounded-card border border-line bg-bg p-5 lg:flex">
            <span className="flex flex-col gap-1.5">
              <span className="font-display text-[1.625rem] leading-none tracking-[-0.02em]">
                {siteConfig.name}
              </span>
              <span className="text-sm text-muted">
                Full-stack · product builder
              </span>
            </span>
            <Label className="text-[10px]">14°41′N 17°26′W</Label>
          </figcaption>
        </figure>

        <div className="relative -mt-12 flex flex-col px-4 pb-28 sm:px-8 lg:mt-0 lg:px-16 lg:pt-16 lg:pb-32 xl:px-20">
          <div className="flex items-center gap-3.5">
            <CalibreMark />
            <Label as="p">À propos · fiche technique</Label>
          </div>
          <h1 className="mt-6 text-[3.25rem] leading-[0.95] tracking-[-0.045em] lg:mt-7 lg:text-[5.75rem]">
            Calibre <em>{siteConfig.name}</em>.
          </h1>
          <p className="mt-5 max-w-xl text-intro text-muted lg:mt-6">
            Développeur full-stack et product builder. Assemblé à{" "}
            {siteConfig.city}, pensé pour le marché africain.
          </p>

          <div className="mt-8 lg:mt-11">
            <SpecSheet rows={specSheet} />
          </div>

          {/* Le seul bloc glacier de la page : la conversion. */}
          <section className="mt-12 flex flex-col items-start gap-6 rounded-section bg-accent p-7 text-on-accent lg:mt-14 lg:p-10">
            <p className="font-display text-[2rem] leading-[1.05] tracking-[-0.02em] lg:text-[2.625rem]">
              Mettre ce calibre <em className="font-light">au service</em> de
              votre projet.
            </p>
            <StartBriefLink className="bg-bg text-text hover:bg-surface">
              Démarrer le brief
              <ArrowUpRightIcon />
            </StartBriefLink>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
