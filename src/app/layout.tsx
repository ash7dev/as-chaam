import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Fraunces, Spline_Sans_Mono } from "next/font/google";
import { BriefProvider } from "@/components/brief/BriefProvider";
import { siteConfig } from "@/config/site";
import "./globals.css";

// Titres : 300 à 600, italique 300 pour les mots-clés en glacier.
// L'axe opsz adapte le dessin à la taille : plus fin et contrasté en 96 px.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

// Interface et texte : 400 à 700
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

// Détails : 400, 500
const splineMono = Spline_Sans_Mono({
  variable: "--font-spline-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Domaine définitif : NEXT_PUBLIC_SITE_URL dans .env.local
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "A's CHAAM — Lead Developer & Product Engineer",
    template: "%s — A's CHAAM",
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "fr_SN",
    siteName: siteConfig.name,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

// Barre du navigateur mobile en Espresso
export const viewport: Viewport = {
  themeColor: "#1c1410",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${bricolage.variable} ${splineMono.variable} h-full`}
    >
      {/* Les extensions (Grammarly…) ajoutent des attributs à <body> : sans incidence. */}
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <BriefProvider>{children}</BriefProvider>
      </body>
    </html>
  );
}