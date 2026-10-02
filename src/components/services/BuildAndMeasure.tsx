import { Label } from "@/components/ui/Label";

const trackedEvents = ["PageView", "ViewContent", "AddToCart", "Purchase"];

/** Le différenciant : le site sort avec son tracking prêt pour les campagnes. */
export function BuildAndMeasure() {
  return (
    <section aria-labelledby="build-measure" className="grid overflow-hidden rounded-section border border-line lg:grid-cols-2">
      <div className="flex flex-col gap-4 bg-surface p-6 lg:p-10">
        <Label>Ce qui me distingue</Label>
        <h2 id="build-measure" className="text-[2.25rem] leading-none tracking-[-0.03em] lg:text-[3.25rem]">
          Je construis, <em>puis</em> je mesure.
        </h2>
        <p className="text-muted lg:text-[17px]">
          Un site livré sans mesure, c&apos;est une boutique sans caisse. Chaque projet sort avec son tracking prêt pour vos
          campagnes.
        </p>
      </div>
      <ol className="border-t border-line p-6 font-mono text-[13px] lg:border-t-0 lg:border-l lg:p-10 lg:text-sm">
        {trackedEvents.map((event) => (
          <li key={event} className="flex justify-between border-t border-line py-3.5 last:border-b lg:py-4">
            <span>{event}</span>
            <span className="text-muted">Pixel + CAPI</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
