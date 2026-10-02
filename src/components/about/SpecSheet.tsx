import type { SpecRow } from "@/content/about";
import { cn } from "@/lib/cn";

/**
 * Fiche technique façon calibre de montre. Desktop : libellé et valeur
 * reliés par des pointillés. Mobile : le libellé au-dessus de la valeur.
 */
export function SpecSheet({ rows }: { rows: SpecRow[] }) {
  return (
    <dl className="border-b border-line">
      {rows.map(({ label, value, highlight }, index) => (
        <div
          key={label}
          className={cn(
            "flex flex-col gap-1 border-t py-3.5 sm:flex-row sm:items-baseline sm:gap-3 sm:py-4",
            index === 0 ? "border-line-strong" : "border-line",
          )}
        >
          <dt className="label text-[10px] sm:text-[11px]">{label}</dt>
          <span aria-hidden="true" className="hidden min-w-6 flex-1 -translate-y-1.5 border-b border-dotted border-line-strong sm:block" />
          <dd className={cn("sm:max-w-[26rem] sm:text-right", highlight ? "font-display text-[1.375rem] leading-tight" : "text-[15px] sm:text-base")}>
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
