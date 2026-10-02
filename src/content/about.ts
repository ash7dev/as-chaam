export interface SpecRow {
  label: string;
  value: string;
  /** Valeur mise en avant en Fraunces (ex. l'expérience). */
  highlight?: boolean;
}

export const portrait = {
  src: "/profils/portrait.jpg",
  alt: "Portrait d'A's CHAAM, assis, en noir et blanc",
} as const;

/** La fiche technique de /a-propos, ligne par ligne. */
export const specSheet: SpecRow[] = [
  { label: "Fonction", value: "Full-stack · product builder" },
  { label: "Expérience", value: "+2 ans", highlight: true },
  { label: "Mouvements", value: "Produit · Design · Code · Mesure" },
  {
    label: "Matériaux",
    value: "TypeScript, Next.js, React, NestJS, Django, Laravel, PostgreSQL, Prisma, Redis, Supabase, Firebase",
  },
  { label: "Outillage", value: "TanStack Query, Zustand, Tailwind CSS, Docker" },
  { label: "Mobile", value: "React Native, Expo, Flutter" },
  { label: "Mesure", value: "Meta Ads, Pixel, Conversions API, Google Analytics 4, Consent Mode" },
  { label: "Infrastructure", value: "Vercel, Render, Cloudinary, Twilio, Resend, Sentry" },
  { label: "Complications", value: "Wave, Orange Money, KYC, séquestre, wallets, OTP et notifications WhatsApp" },
  { label: "Finitions", value: "Premium, jusqu'aux back-offices et e-mails" },
  { label: "Origine", value: "Dakar, Sénégal" },
  { label: "Hors service", value: "Barcelone & Arsenal" },
];
