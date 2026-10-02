import Link from "next/link";
import { Label } from "@/components/ui/Label";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-page items-center justify-between px-4 py-6 sm:px-8 lg:px-16">
      <Link href="/" className="font-display text-2xl tracking-[-0.02em]">
        {siteConfig.name}
      </Link>
      <Label className="hidden sm:inline">Réponse par WhatsApp ou e-mail</Label>
    </header>
  );
}
