import Link from "next/link";
import type { ReactNode } from "react";
import { buttonClass } from "@/components/ui/Button";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Label } from "@/components/ui/Label";
import { siteConfig } from "@/config/site";
import { CopyEmailButton } from "./CopyEmailButton";

const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Bonjour A's CHAAM, ")}`;

/** Les trois canaux : WhatsApp (la conversion, en glacier), l'e-mail, le brief guidé. */
export function ContactChannels() {
  return (
    <ul className="mt-2 border-b border-line">
      <Channel label="WhatsApp" first>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="font-display text-xl hover:text-accent lg:text-[1.625rem]">
          {siteConfig.whatsappDisplay}
        </a>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={buttonClass("accent")}>
          Écrire
          <ArrowUpRightIcon />
        </a>
      </Channel>
      <Channel label="E-mail">
        <a href={`mailto:${siteConfig.email}`} className="min-w-0 font-display text-lg [overflow-wrap:anywhere] hover:text-accent sm:text-xl lg:text-[1.625rem]">
          {siteConfig.email}
        </a>
        <CopyEmailButton email={siteConfig.email} />
      </Channel>
      <Channel label="Brief guidé">
        <span className="font-display text-xl lg:text-[1.625rem]">Votre plan en quelques clics</span>
        <Link href="/#brief" className={buttonClass("ghost")}>
          Démarrer
        </Link>
      </Channel>
    </ul>
  );
}

function Channel({ label, first = false, children }: { label: string; first?: boolean; children: ReactNode }) {
  return (
    <li
      className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5 border-t py-4 sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:gap-x-5 lg:py-5 ${first ? "border-line-strong" : "border-line"}`}
    >
      <Label className="col-span-2 text-[10px] sm:col-span-1 sm:text-[11px]">{label}</Label>
      {children}
    </li>
  );
}
