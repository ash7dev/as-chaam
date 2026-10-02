import type { ComponentType } from "react";
import { KollectScene } from "./KollectScene";

/** Scènes animées par projet (slug → composant). Un projet sans scène garde son visuel fixe. */
export const projectScenes: Record<string, ComponentType> = {
  kollect: KollectScene,
};
