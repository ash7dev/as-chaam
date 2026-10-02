"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useBrief } from "./useBrief";

type BriefContextValue = ReturnType<typeof useBrief> & {
  /** Le visiteur a déjà répondu au moins une fois. */
  hasProgress: boolean;
};

const BriefContext = createContext<BriefContextValue | null>(null);

export function useBriefContext(): BriefContextValue {
  const value = useContext(BriefContext);
  if (!value) throw new Error("useBriefContext doit être utilisé dans <BriefProvider>.");
  return value;
}

/** Garde la conversation au niveau du site : elle survit à la navigation entre les pages. */
export function BriefProvider({ children }: { children: ReactNode }) {
  const brief = useBrief();
  const value = { ...brief, hasProgress: brief.messages.length > 1 };
  return <BriefContext.Provider value={value}>{children}</BriefContext.Provider>;
}
