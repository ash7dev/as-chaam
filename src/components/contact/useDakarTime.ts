"use client";

import { useEffect, useState } from "react";

export interface ClockTime {
  hours: number;
  minutes: number;
  seconds: number;
}

const formatter = new Intl.DateTimeFormat("fr-FR", {
  timeZone: "Africa/Dakar",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

function dakarNow(): ClockTime {
  const parts = Object.fromEntries(formatter.formatToParts(new Date()).map(({ type, value }) => [type, Number(value)]));
  return { hours: parts.hour, minutes: parts.minute, seconds: parts.second };
}

/**
 * L'heure de Dakar, mise à jour chaque seconde.
 * `null` au premier rendu : l'heure du serveur (ou du build) serait fausse côté visiteur.
 */
export function useDakarTime(): ClockTime | null {
  const [time, setTime] = useState<ClockTime | null>(null);

  useEffect(() => {
    const tick = () => setTime(dakarNow());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
