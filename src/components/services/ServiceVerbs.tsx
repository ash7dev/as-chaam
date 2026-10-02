"use client";

import Link from "next/link";
import { useId, useState, type KeyboardEvent } from "react";
import { StartBriefLink } from "@/components/brief/StartBriefLink";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { Label } from "@/components/ui/Label";
import { serviceTerms } from "@/content/services";
import { cn } from "@/lib/cn";
import { getProjectBySlug } from "@/lib/projects";
import type { Service, ServiceId } from "@/types/service";
import { ServicePartition } from "./ServicePartition";

const pad = (n: number) => String(n).padStart(2, "0");

type Tab = "faits" | "deroule";
const tabs: { id: Tab; label: string }[] = [
  { id: "faits", label: "Ce que je fais" },
  { id: "deroule", label: "Comment ça se déroule" },
];

/** Les quatre verbes : un seul ouvert à la fois, avec ses deux onglets. */
export function ServiceVerbs({ services }: { services: Service[] }) {
  const [openId, setOpenId] = useState<ServiceId>(services[0].id);
  const [tab, setTab] = useState<Tab>("faits");
  const baseId = useId();

  function toggle(id: ServiceId) {
    setOpenId(id);
    setTab("faits");
  }

  // Flèches gauche/droite entre les deux onglets, comme le prévoit le motif ARIA.
  function onTabKeyDown(event: KeyboardEvent) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = tab === "faits" ? "deroule" : "faits";
    setTab(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  }

  return (
    <div className="border-b border-line">
      {services.map((service, index) => {
        const isOpen = service.id === openId;
        const panelId = `${baseId}-${service.id}`;
        return (
          <article key={service.id} className={cn("border-t", isOpen ? "border-line-strong pb-10 lg:pb-12" : "border-line")}>
            <h2>
              <button
                type="button"
                onClick={() => toggle(service.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={cn(
                  "grid w-full grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 py-5 text-left transition-colors lg:grid-cols-[4.5rem_minmax(0,1fr)_21rem] lg:py-6",
                  isOpen ? "text-text" : "text-muted hover:text-text",
                )}
              >
                <span className={cn("order-2 font-mono text-xs lg:order-none", isOpen && "text-accent")}>{pad(index + 1)}</span>
                <span
                  className={cn(
                    "font-display tracking-[-0.05em] transition-[font-size] duration-300",
                    isOpen ? "text-[4.75rem] leading-[0.9] lg:text-[9.25rem]" : "text-[3.25rem] leading-[0.95] lg:text-[6.5rem]",
                  )}
                >
                  {service.verbe}
                  {isOpen && <em className="font-light text-accent not-italic">.</em>}
                </span>
                <span className="order-3 col-span-2 mt-3 font-sans text-base lg:order-none lg:col-span-1 lg:mt-0 lg:justify-self-end lg:text-right lg:text-[17px]">
                  {service.resume}
                </span>
              </button>
            </h2>

            {isOpen && (
              <div id={panelId} className="animate-fade-up flex flex-col gap-8 lg:ml-[4.5rem]">
                <div role="tablist" aria-label={`${service.verbe} : détails`} onKeyDown={onTabKeyDown} className="flex gap-1.5 self-start rounded-pill border border-line bg-surface p-1.5">
                  {tabs.map(({ id, label }) => (
                    <button
                      key={id}
                      id={`${baseId}-tab-${id}`}
                      type="button"
                      role="tab"
                      aria-selected={tab === id}
                      aria-controls={`${panelId}-${id}`}
                      tabIndex={tab === id ? 0 : -1}
                      onClick={() => setTab(id)}
                      className={cn(
                        "min-h-11 rounded-pill px-4 text-sm transition-colors",
                        tab === id ? "bg-text font-semibold text-bg" : "text-muted hover:text-text",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div id={`${panelId}-${tab}`} role="tabpanel" aria-labelledby={`${baseId}-tab-${tab}`}>
                  {tab === "faits" ? <ServiceOverview service={service} /> : <ServicePartition blocks={service.partition} />}
                </div>

                <footer className="flex flex-col gap-5 rounded-card border border-line-strong p-5 sm:flex-row sm:items-center sm:justify-between lg:p-6">
                  <dl className="flex flex-wrap gap-x-8 gap-y-3">
                    <Term label="Délai type" value={serviceTerms.delai} muted />
                    <Term label="Tarif" value={serviceTerms.tarif} />
                    <Term label="Stack" value={service.stack} />
                  </dl>
                  <StartBriefLink goal={service.id} className="justify-between sm:justify-center">
                    Démarrer ce brief
                    <ArrowRightIcon />
                  </StartBriefLink>
                </footer>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function ServiceOverview({ service }: { service: Service }) {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-6">
      <div className="flex flex-col gap-3.5">
        <Label>Ce que je fais</Label>
        <ul>
          {service.faits.map((fait) => (
            <li key={fait} className="border-t border-line py-3 last:border-b">
              {fait}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3.5">
        <Label>Déjà fait</Label>
        {service.preuves.map(({ slug, note }) => {
          const project = getProjectBySlug(slug);
          if (!project) return null;
          return (
            <Link
              key={slug}
              href={`/projets/${slug}`}
              className="group flex items-center gap-3.5 rounded-card border border-line bg-surface p-2.5 transition-colors hover:border-line-strong"
            >
              <span aria-hidden="true" className="bg-dots size-16 shrink-0 rounded-[0.75rem] border border-line bg-bg" />
              <span className="flex flex-1 flex-col gap-1">
                <span className="font-display text-[1.375rem] leading-tight">{project.nom}</span>
                <Label className="text-[10px]">{note}</Label>
              </span>
              <ArrowUpRightIcon className="mr-2 text-muted transition-colors group-hover:text-accent" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Term({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <Label as="dt" className="text-[10px]">
        {label}
      </Label>
      <dd className={cn("font-display text-xl", muted && "text-muted")}>{value}</dd>
    </div>
  );
}
