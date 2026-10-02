import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface LabelProps {
  children: ReactNode;
  as?: "span" | "p" | "dt";
  className?: string;
}

/** Étiquette mono en capitales : rubriques, dates, stack. */
export function Label({ children, as: Tag = "span", className }: LabelProps) {
  return <Tag className={cn("label", className)}>{children}</Tag>;
}
