import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import type { ClockTime } from "./useDakarTime";

interface HandProps {
  angle: number;
  className: string;
}

/** Aiguille partant du centre ; la rotation se fait autour du centre du cadran. */
function Hand({ angle, className }: HandProps) {
  return (
    <span
      aria-hidden="true"
      style={{ "--angle": `${angle}deg` } as CSSProperties}
      className={cn("clock-hand absolute left-1/2 rounded-pill", className)}
    />
  );
}

/** Le cadran de l'horloge de Dakar : graduations, aiguilles Lait, trotteuse glacier. */
export function DakarClock({ time, className }: { time: ClockTime | null; className?: string }) {
  const { hours = 0, minutes = 0, seconds = 0 } = time ?? {};
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  return (
    <div className={cn("relative aspect-square", className)}>
      <span aria-hidden="true" className="clock-ticks absolute inset-0 rounded-full" />
      <span aria-hidden="true" className="clock-ticks-hours absolute inset-0 rounded-full" />
      <span aria-hidden="true" className="absolute inset-0 rounded-full border border-line" />
      <span aria-hidden="true" className="absolute inset-[11%] rounded-full border border-line bg-surface" />
      <span aria-hidden="true" className="label absolute inset-x-0 top-[28%] text-center text-[10px]">
        Dakar · GMT+0
      </span>

      {/* Les aiguilles n'apparaissent qu'une fois l'heure du visiteur connue. */}
      <div className={cn("absolute inset-0 transition-opacity duration-500", time ? "opacity-100" : "opacity-0")}>
        <Hand angle={hourAngle} className="bottom-1/2 h-[24%] w-1.5 bg-text" />
        <Hand angle={minuteAngle} className="bottom-1/2 h-[37%] w-1 bg-text" />
        <Hand angle={secondAngle} className="clock-hand-second bottom-[44%] h-[46%] w-0.5 bg-accent" />
        <span aria-hidden="true" className="absolute top-1/2 left-1/2 size-4 -translate-1/2 rounded-full border-2 border-accent bg-bg" />
      </div>
    </div>
  );
}
