"use client";

import { useId, useState, type FormEvent } from "react";
import { buttonClass } from "@/components/ui/Button";
import { ArrowUpIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { BriefNode, BriefOption } from "@/types/brief";
import type { ContactFields } from "./useBrief";

interface BriefRepliesProps {
  node: BriefNode;
  onChoose: (option: BriefOption) => void;
  onText: (text: string) => void;
  onContact: (fields: ContactFields) => void;
}

/** Ce que le visiteur peut répondre : nos propositions, ou une saisie libre. */
export function BriefReplies({ node, onChoose, onText, onContact }: BriefRepliesProps) {
  if (node.input === "text") return <TextReply onSubmit={onText} />;
  if (node.input === "contact") return <ContactReply onSubmit={onContact} />;
  if (!node.options?.length) return null;

  return (
    <div role="group" aria-label="Réponses proposées" className="flex flex-wrap justify-end gap-2">
      {node.options.map((option) => (
        <button
          key={option.label}
          type="button"
          onClick={() => onChoose(option)}
          className={option.accent ? buttonClass("accent") : optionChipClass}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

/** Capsule de réponse proposée (hors bouton de conversion). */
export const optionChipClass =
  "min-h-11 rounded-pill border border-line-strong px-4 text-sm transition-colors hover:border-muted";

const inputClass =
  "min-h-11 rounded-pill border border-line-strong bg-bg px-4 text-text placeholder:text-muted/70 focus-visible:border-accent focus-visible:outline-none";

function TextReply({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = useState("");
  const id = useId();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(text);
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <label htmlFor={id} className="sr-only">
        Votre projet en quelques mots
      </label>
      <input
        id={id}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Votre projet en quelques mots…"
        maxLength={300}
        className={cn(inputClass, "min-w-0 flex-1")}
      />
      <button
        type="submit"
        aria-label="Envoyer"
        disabled={!text.trim()}
        className="grid size-11 shrink-0 place-items-center rounded-pill bg-text text-bg disabled:opacity-40"
      >
        <ArrowUpIcon strokeWidth={2.2} />
      </button>
    </form>
  );
}

function ContactReply({ onSubmit }: { onSubmit: (fields: ContactFields) => void }) {
  const id = useId();
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      website: String(data.get("website") ?? ""),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor={`${id}-name`} className="sr-only">
        Votre nom
      </label>
      <input id={`${id}-name`} name="name" autoComplete="name" placeholder="Votre nom" maxLength={120} className={inputClass} />
      <div className="flex gap-2">
        <label htmlFor={`${id}-email`} className="sr-only">
          Votre e-mail
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="vous@exemple.com"
          maxLength={200}
          className={cn(inputClass, "min-w-0 flex-1")}
        />
        <button type="submit" className={buttonClass("primary")}>
          Envoyer
        </button>
      </div>
      {/* Piège à robots : invisible et ignoré par les lecteurs d'écran. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
    </form>
  );
}
