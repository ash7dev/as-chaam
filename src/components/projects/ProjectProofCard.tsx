import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "@/components/projects/StatusBadge";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/cn";
import type { ProjectStatus } from "@/types/project";

interface ProjectProofCardProps {
  name: string;
  /** Ce que le projet prouve ici (« Comptes · rôles · wallets »). */
  note: string;
  href: string;
  /** Affiche 16:9 du projet ; à défaut, le nom sur fond pointillé. */
  image?: string;
  status: ProjectStatus;
  sizes?: string;
  className?: string;
}

/** Carte d'un projet cité en preuve (brief, services) : visuel horizontal, nom, preuve, statut. */
export function ProjectProofCard({ name, note, href, image, status, sizes = "24rem", className }: ProjectProofCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group @container flex flex-col overflow-hidden rounded-inner border border-line bg-bg transition-colors hover:border-line-strong",
        className,
      )}
    >
      <span className="relative aspect-video w-full overflow-hidden border-b border-line bg-surface">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <span aria-hidden="true" className="bg-dots grid size-full place-items-center font-display text-2xl font-light italic text-muted">
            {name}
          </span>
        )}
      </span>
      <span className="flex items-end justify-between gap-3 p-3.5">
        <span className="flex min-w-0 flex-col gap-1.5">
          <span className="font-display text-[19px] leading-tight">{name}</span>
          <Label className="text-[10px] leading-relaxed">{note}</Label>
          <StatusBadge project={{ statut: status }} className="text-xs text-muted" />
        </span>
        <span className="flex shrink-0 items-center gap-1 text-xs text-muted transition-colors group-hover:text-accent">
          {/* Libellé affiché seulement si la carte est assez large (container query). */}
          <span className="sr-only @[21rem]:not-sr-only">Étude de cas</span>
          <ArrowUpRightIcon />
        </span>
      </span>
    </Link>
  );
}
