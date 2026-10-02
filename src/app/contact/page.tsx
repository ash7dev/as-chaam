import type { Metadata } from "next";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactHero } from "@/components/contact/ContactHero";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Contact",
  description: "Écrire à A's CHAAM sur WhatsApp ou par e-mail, ou démarrer le brief guidé.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <ContactHero>
        <ContactChannels />
      </ContactHero>
    </SiteShell>
  );
}
