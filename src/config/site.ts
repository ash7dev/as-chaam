/**
 * Réglages du site. Les valeurs propres à l'environnement viennent de `.env.local`
 * (voir `.env.example`).
 */
export const siteConfig = {
  name: "A's CHAAM",
  tagline: "Studio digital",
  city: "Dakar",
  description:
    "Développeur full-stack basé à Dakar : je conçois, code et mets en ligne des produits web pensés pour le marché africain.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Numéro au format international, sans « + » ni espaces. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "221774606330",
  /** Affichage lisible du numéro. */
  whatsappDisplay: "+221 77 460 63 30",
  email: "ashsthiam28@gmail.com",
} as const;

export const mainNav = [
  { href: "/projets", label: "/projets" },
  { href: "/services", label: "/services" },
  { href: "/a-propos", label: "/a-propos" },
] as const;
