"use client";

import { KeyboardEvent, useId, useState } from "react";
import { X } from "lucide-react";

type TagInputProps = {
  label: string;
  valeur: string[];
  onChange: (valeur: string[]) => void;
  max?: number;
  placeholder?: string;
  aide?: string;
  erreur?: string;
};

export default function TagInput({
  label,
  valeur,
  onChange,
  max = 10,
  placeholder,
  aide,
  erreur,
}: TagInputProps) {
  const id = useId();
  const [saisie, setSaisie] = useState("");
  const limiteAtteinte = valeur.length >= max;

  function ajouter(brut: string) {
    // On retire les espaces et un éventuel « # » de début
    const mot = brut.trim().replace(/^#+/, "").trim().slice(0, 30);
    if (!mot) return;

    const dejaLa = valeur.some((v) => v.toLowerCase() === mot.toLowerCase());
    if (!dejaLa && !limiteAtteinte) onChange([...valeur, mot]);
    setSaisie("");
  }

  function supprimer(mot: string) {
    onChange(valeur.filter((v) => v !== mot));
  }

  function surTouche(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      // Sans ceci, « Entrée » enverrait tout le formulaire
      e.preventDefault();
      ajouter(saisie);
    } else if (e.key === "Backspace" && saisie === "" && valeur.length > 0) {
      onChange(valeur.slice(0, -1));
    }
  }

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-marron-fonce"
      >
        {label}
      </label>

      <div
        className={`flex flex-wrap items-center gap-2 rounded-xl border bg-white p-2 transition focus-within:border-or focus-within:ring-2 focus-within:ring-or/30 ${
          erreur ? "border-erreur" : "border-bordure"
        }`}
      >
        {valeur.map((mot) => (
          <span
            key={mot}
            className="inline-flex items-center gap-1 rounded-full bg-creme py-1 pl-3 pr-1.5 text-sm text-marron"
          >
            {mot}
            <button
              type="button"
              onClick={() => supprimer(mot)}
              aria-label={`Retirer le mot-clé ${mot}`}
              className="rounded-full p-0.5 text-marron transition hover:bg-or/30"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </span>
        ))}

        <input
          id={id}
          value={saisie}
          onChange={(e) => setSaisie(e.target.value)}
          onKeyDown={surTouche}
          onBlur={() => ajouter(saisie)}
          disabled={limiteAtteinte}
          placeholder={limiteAtteinte ? "Limite atteinte" : placeholder}
          aria-invalid={!!erreur}
          className="min-w-[8rem] flex-1 bg-transparent px-2 py-1.5 text-marron-fonce outline-none placeholder:text-texte-secondary/60 disabled:cursor-not-allowed"
        />
      </div>

      <div className="mt-1 flex justify-between gap-4">
        <div>
          {erreur ? (
            <p role="alert" className="text-sm text-erreur">
              {erreur}
            </p>
          ) : (
            aide && <p className="text-xs text-texte-secondaire">{aide}</p>
          )}
        </div>
        <p className="shrink-0 text-xs text-texte-secondaire">
          {valeur.length} / {max}
        </p>
      </div>
    </div>
  );
}