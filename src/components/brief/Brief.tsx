import { cn } from "@/lib/cn";
import { BriefPanel } from "./BriefPanel";

/** Le brief en carte, posé dans le hero. */
export function Brief({ className }: { className?: string }) {
  return (
    <section
      id="brief"
      aria-label="Brief de projet"
      className={cn("flex flex-col overflow-hidden rounded-section border border-line bg-surface", className)}
    >
      <BriefPanel />
    </section>
  );
}
