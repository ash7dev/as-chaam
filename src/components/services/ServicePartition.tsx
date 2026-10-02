import { partitionPhases, partitionTracks } from "@/content/services";
import { cn } from "@/lib/cn";
import type { PartitionBlock, PartitionLevel } from "@/types/service";

const levelClass: Record<PartitionLevel, string> = {
  coeur: "bg-text font-semibold text-bg",
  inclus: "border border-text bg-bg",
  option: "border border-dashed border-line-strong bg-bg text-muted",
};

const levelLabel: Record<PartitionLevel, string> = {
  coeur: "Cœur du service",
  inclus: "Inclus",
  option: "En option",
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Le déroulé d'un service : desktop, quatre portées sur cinq mouvements ;
 * mobile, une frise verticale mouvement par mouvement.
 */
export function ServicePartition({ blocks }: { blocks: PartitionBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Desktop : la partition */}
      <div className="hidden lg:block" role="table" aria-label="Partition du service">
        <div role="row" className="grid grid-cols-[9rem_repeat(5,minmax(0,1fr))] gap-x-3 border-b border-line-strong pb-4">
          <span role="columnheader" />
          {partitionPhases.map((phase, index) => (
            <span key={phase} role="columnheader" className="label">
              {pad(index + 1)} · {phase}
            </span>
          ))}
        </div>
        {partitionTracks.map((track) => (
          <div
            key={track}
            role="row"
            className="relative grid h-24 grid-cols-[9rem_repeat(5,minmax(0,1fr))] items-center gap-x-3 border-b border-surface last:border-0"
          >
            {/* La ligne de portée, derrière les blocs */}
            <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-line" />
            <span role="rowheader" className="relative self-stretch bg-bg pr-3 font-display text-[1.375rem] leading-[6rem]">
              {track}
            </span>
            {blocks
              .filter((block) => block.track === track)
              .map((block) => (
                <span
                  key={block.label}
                  role="cell"
                  style={{ gridColumn: `${block.from + 1} / ${block.to + 2}` }}
                  className={cn("relative flex min-h-12 items-center rounded-pill px-4 text-[15px]", levelClass[block.level])}
                >
                  {block.label}
                  {block.level === "option" && <span className="label ml-auto pl-2 text-[9px]">option</span>}
                </span>
              ))}
          </div>
        ))}
      </div>

      {/* Mobile : la frise */}
      <ol className="relative flex flex-col gap-6 pl-7 lg:hidden">
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[0.4rem] w-px bg-line-strong" />
        {partitionPhases.map((phase, index) => {
          // Un bloc qui couvre plusieurs mouvements n'apparaît qu'au premier.
          const phaseBlocks = blocks.filter((block) => block.from === index + 1);
          return (
            <li key={phase} className="relative flex flex-col gap-2.5">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-0.5 -left-[1.65rem] size-3 rounded-pill border",
                  phaseBlocks.some((block) => block.level === "coeur") ? "border-text bg-text" : "border-text bg-bg",
                )}
              />
              <span className="label">
                {pad(index + 1)} · {phase}
              </span>
              {phaseBlocks.map((block) => (
                <span key={block.label} className="flex flex-col items-start gap-1">
                  <span className="label text-[9px]">{block.track}</span>
                  <span className={cn("flex min-h-11 items-center rounded-pill px-4 text-sm", levelClass[block.level])}>{block.label}</span>
                </span>
              ))}
            </li>
          );
        })}
      </ol>

      <ul aria-label="Légende" className="label flex flex-wrap gap-x-6 gap-y-2 border-t border-line-strong pt-4">
        {(Object.keys(levelLabel) as PartitionLevel[]).map((level) => (
          <li key={level} className="inline-flex items-center gap-2">
            <span aria-hidden="true" className={cn("h-2.5 w-5.5 rounded-pill", levelClass[level])} />
            {levelLabel[level]}
          </li>
        ))}
      </ul>
    </div>
  );
}
