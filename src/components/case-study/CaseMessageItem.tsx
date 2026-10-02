import Image from "next/image";
import { projectScenes } from "@/components/projects/scenes";
import { Blurred } from "@/components/ui/Blurred";
import { slideAnchor } from "@/lib/case-study";
import { CaseCarousel } from "./CaseCarousel";
import { Label } from "@/components/ui/Label";
import type { CaseMessage } from "@/types/project";

/** Carte côté A's CHAAM pour les contenus structurés (listes, étapes, tableaux). */
const myCard = "w-full self-start rounded-[22px_22px_22px_6px] border border-line bg-surface p-5 sm:w-[82%] sm:p-6";

/** Renvoi vers la slide du carrousel qui illustre ce qui est dit. */
function SlideLink({ slide }: { slide: number }) {
  return (
    <a
      href={`#${slideAnchor(slide)}`}
      className="label inline-flex min-h-8 items-center gap-1.5 self-start text-[10px] text-text transition-colors hover:text-accent"
    >
      Voir la slide {String(slide).padStart(2, "0")} →
    </a>
  );
}

const myBubble =
  "max-w-[90%] self-start rounded-[22px_22px_22px_6px] border border-line bg-surface px-4 py-3.5 text-[15px] leading-relaxed sm:max-w-[82%] sm:px-5 sm:text-[17px]";

/** Un message du fil : le client à droite (comme dans le brief), A's CHAAM à gauche. */
export function CaseMessageItem({ message }: { message: CaseMessage }) {
  switch (message.kind) {
    case "client":
      return (
        <p className="max-w-[86%] self-end rounded-[22px_22px_6px_22px] bg-text px-4 py-3.5 font-display text-xl leading-snug text-bg sm:max-w-[78%] sm:px-5 sm:text-[1.625rem]">
          {message.flou ? <Blurred>{message.text}</Blurred> : message.text}
        </p>
      );

    case "moi":
      return <p className={myBubble}>{message.flou ? <Blurred>{message.text}</Blurred> : message.text}</p>;

    case "briques":
      return (
        <ul className="grid w-full gap-2 self-start sm:w-[82%] sm:grid-cols-3">
          {message.items.map((item) => (
            <li key={item.valeur} className="flex items-baseline justify-between gap-3 rounded-card border border-line bg-surface p-4 sm:flex-col sm:items-start sm:justify-start sm:gap-2">
              <span className="font-display text-xl sm:order-2 sm:text-[1.375rem]">{item.valeur}</span>
              <Label className="text-[10px]">{item.label}</Label>
            </li>
          ))}
        </ul>
      );

    case "capture":
      return (
        <figure className="relative flex aspect-16/10 w-full items-end justify-end self-start overflow-hidden rounded-[22px_22px_22px_6px] border border-line bg-surface p-4 sm:w-[82%] sm:p-5">
          {message.src ? (
            <Image src={message.src} alt={message.legende} fill sizes="(min-width: 1024px) 40rem, 100vw" className="object-cover" />
          ) : (
            <span aria-hidden="true" className="bg-dots absolute inset-0" />
          )}
          <figcaption className="label relative rounded-pill border border-line bg-bg/90 px-3 py-1.5 text-[10px]">Capture · {message.legende}</figcaption>
        </figure>
      );

    case "scene": {
      const Scene = projectScenes[message.slug];
      if (!Scene) return null;
      return (
        <figure className="relative aspect-16/10 w-full self-start overflow-hidden rounded-[22px_22px_22px_6px] border border-line bg-surface sm:w-[82%]">
          <Scene />
        </figure>
      );
    }

    case "liste":
      return (
        <div className={myCard}>
          {message.titre && (
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4">
              <p className="font-display text-[1.375rem] leading-tight">{message.titre}</p>
              {message.slide && <SlideLink slide={message.slide} />}
            </div>
          )}
          <ul>
            {message.items.map((item) => (
              <li
                key={item.text}
                className="flex flex-col gap-1 border-t border-line py-3 first:border-t-0 first:pt-0 last:pb-0 sm:flex-row sm:gap-5"
              >
                {item.label && <span className="label shrink-0 pt-1 text-[10px] sm:w-28">{item.label}</span>}
                <span className="flex flex-col gap-1">
                  <span className="text-[15px] leading-relaxed sm:text-base">{item.text}</span>
                  {item.slide && <SlideLink slide={item.slide} />}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "etapes":
      return (
        <div className={myCard}>
          {message.titre && <p className="mb-4 font-display text-[1.375rem] leading-tight">{message.titre}</p>}
          <ol className="flex flex-col">
            {message.items.map((step, index) => (
              <li key={step.titre} className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-3 border-t border-line py-3.5 first:border-t-0 first:pt-0 last:pb-0">
                <span className="font-display text-[1.75rem] leading-none tracking-[-0.03em] text-accent">{index + 1}</span>
                <span className="flex flex-col gap-1">
                  <span className="font-display text-lg leading-snug">{step.titre}</span>
                  <span className="text-[15px] leading-relaxed text-muted">{step.text}</span>
                  {step.slide && <SlideLink slide={step.slide} />}
                </span>
              </li>
            ))}
          </ol>
        </div>
      );

    case "tableau": {
      // Deux colonnes : intitulé étroit, explication large. Au-delà : colonnes égales après l'intitulé.
      const [, ...valueColumns] = message.colonnes;
      const columns =
        valueColumns.length === 1 ? "minmax(0,2fr) minmax(0,3fr)" : `minmax(0,1.3fr) repeat(${valueColumns.length}, minmax(0,2fr))`;
      return (
        <div className={myCard}>
          <div className="label hidden gap-5 pb-3 text-[10px] sm:grid" style={{ gridTemplateColumns: columns }}>
            {message.colonnes.map((colonne) => (
              <span key={colonne}>{colonne}</span>
            ))}
          </div>
          <dl>
            {message.lignes.map(([terme, ...valeurs]) => (
              <div
                key={terme}
                className="flex flex-col gap-1 border-t border-line py-3.5 last:pb-0 sm:grid sm:gap-5"
                style={{ gridTemplateColumns: columns }}
              >
                <dt className="font-display text-lg leading-snug">{terme}</dt>
                {valeurs.map((valeur, index) => (
                  <dd key={index} className="text-[15px] leading-relaxed text-muted">
                    {/* En mobile, l'en-tête est masqué : chaque valeur rappelle sa colonne s'il y en a plusieurs. */}
                    {valueColumns.length > 1 && <span className="label mr-2 text-[10px] sm:hidden">{valueColumns[index]}</span>}
                    {valeur}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </div>
      );
    }

    case "palette":
      return (
        <ul className="grid w-full grid-cols-3 gap-2 self-start sm:w-[82%]">
          {message.couleurs.map((couleur) => (
            <li key={couleur.hex} className="flex flex-col overflow-hidden rounded-card border border-line bg-surface">
              {/* Liseré : une teinte proche du fond (bois d'oud, vert forêt) reste lisible. */}
              <span aria-hidden="true" className="m-2 mb-0 h-20 rounded-inner border border-line-strong sm:h-24" style={{ background: couleur.hex }} />
              <span className="flex flex-col gap-1 p-3">
                <span className="font-display text-base leading-tight">{couleur.nom}</span>
                {!message.approximatif && <span className="label text-[10px]">{couleur.hex}</span>}
              </span>
            </li>
          ))}
        </ul>
      );

    case "carrousel":
      return <CaseCarousel compte={message.compte} legende={message.legende} slides={message.slides} />;

    case "a-completer":
      return <p className={`${myBubble} border-dashed border-line-strong bg-transparent text-muted`}>[{message.text}]</p>;
  }
}
