import Link from "next/link";
import { Brief } from "@/components/brief/Brief";
import { Label } from "@/components/ui/Label";
import { siteConfig } from "@/config/site";
import { getProjects } from "@/lib/projects";

/**
 * Mobile : accroche → brief → preuves.
 * Desktop : texte et preuves à gauche, carte du brief à droite sur toute la hauteur.
 */
export function Hero() {
  const projects = getProjects();

  return (
    <section>
      <div className="mx-auto grid max-w-page grid-cols-1 items-start gap-10 px-4 pt-6 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-10 lg:px-16 lg:pt-14 lg:pb-24">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-6 lg:gap-8 lg:pt-10">
          <Label as="p">
            {siteConfig.tagline} · {siteConfig.city}
          </Label>
          <h1 className="text-h1">
            Dites-moi ce que vous voulez lancer. Je m&apos;occupe du <em>reste</em>.
          </h1>
          <p className="max-w-prose text-intro text-muted">
            <span className="hidden lg:inline">
              SaaS, marketplaces, sites qui vendent, outils internes, apps mobiles — et l&apos;acquisition pour les
              faire grandir.{" "}
            </span>
            Quelques clics, et je vous montre le plan que je vous proposerais.
          </p>
        </div>

        {/* Mobile : la carte suit son contenu, puis le fil défile à l'intérieur au-delà de 80 % de l'écran. */}
        <Brief className="max-h-[80svh] scroll-mt-6 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:h-[45rem] lg:max-h-none" />

        <div className="flex min-w-0 flex-col gap-3 border-t border-line pt-4 lg:col-span-6 lg:row-start-2">
          <Label>Déjà lancé</Label>
          {/* Mobile : capsules qui défilent à l'horizontale, jusqu'aux bords de l'écran */}
          <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:-mx-8 sm:px-8 lg:hidden">
            {projects.map((project) => (
              <li key={project.slug} className="shrink-0">
                <Link
                  href={`/projets/${project.slug}`}
                  className="flex min-h-11 items-center whitespace-nowrap rounded-pill border border-line px-4 font-display text-base text-muted transition-colors hover:border-line-strong hover:text-text"
                >
                  {project.nom}
                </Link>
              </li>
            ))}
          </ul>
          <p className="hidden font-display text-[22px] leading-snug tracking-[-0.01em] lg:block">
            {projects.map((project) => project.nom).join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}
