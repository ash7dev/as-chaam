import type { Metadata } from "next";
import { StartBriefLink } from "@/components/brief/StartBriefLink";
import { BuildAndMeasure } from "@/components/services/BuildAndMeasure";
import { ServiceVerbs } from "@/components/services/ServiceVerbs";
import { SiteShell } from "@/components/SiteShell";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Label } from "@/components/ui/Label";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Lancer, vendre, digitaliser, faire grandir : je conçois, code, mets en ligne et mesure vos produits web.",
};

export default function ServicesPage() {
  return (
    <SiteShell>
      <div className="mx-auto flex max-w-page flex-col px-4 pt-6 pb-28 sm:px-8 lg:px-16 lg:pt-16 lg:pb-32">
        <header className="flex flex-col gap-6 pb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:pb-12">
          <div className="flex flex-col gap-6">
            <Label as="p">Services · {String(services.length).padStart(2, "0")}</Label>
            <h1 className="max-w-4xl text-h1">
              Quatre verbes. Un seul <em>interlocuteur</em>.
            </h1>
          </div>
          <p className="max-w-sm text-intro text-muted">
            Je conçois, je code, je mets en ligne — et je mesure. Choisissez ce que vous voulez faire avancer.
          </p>
        </header>

        <ServiceVerbs services={services} />

        <div className="mt-16 flex flex-col gap-6 lg:mt-24 lg:gap-12">
          <BuildAndMeasure />

          {/* Le seul bloc glacier de la page : la conversion. */}
          <section className="flex flex-col gap-6 rounded-section bg-accent p-7 text-on-accent lg:flex-row lg:items-center lg:justify-between lg:p-12">
            <p className="max-w-3xl font-display text-[2rem] leading-[1.05] tracking-[-0.02em] lg:text-5xl">
              Pas sûr du verbe ? <em className="font-light">Le brief le trouve</em> pour vous.
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
