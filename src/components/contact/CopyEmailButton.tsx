"use client";

import { useEffect, useState } from "react";
import { buttonClass } from "@/components/ui/Button";

/** Copie l'adresse dans le presse-papiers, avec un retour visible pendant deux secondes. */
export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button type="button" onClick={copy} aria-live="polite" className={buttonClass("ghost", "min-w-28")}>
      {copied ? "Copiée ✓" : "Copier"}
    </button>
  );
}
