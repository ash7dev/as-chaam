import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 pour les visuels riches en texte (carrousels d'études de cas), 75 partout ailleurs.
    qualities: [75, 90],
  },
};

export default nextConfig;
