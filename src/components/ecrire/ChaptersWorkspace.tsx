"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import ChapterEditor from "./editor/ChapterEditor";
import type { Chapitre, StatutChapitre } from "@/lib/ecriture/types";
import { formaterNombre } from "@/lib/ecriture/utils";
import { useLocalStorageState } from "@/lib/use-local-storage-state";

type Etat = { chapitres: Chapitre[]; actifId: string };

const CLE_BROUILLON = "inkora:brouillon:chapitres";

const PREMIER_CHAPITRE: Chapitre = {
  id: "c1",
  titre: "Chapitre 1",
  html: "",
  mots: 0,
  statut: "brouillon",
};

const ETAT_INITIAL: Etat = { chapitres: [PREMIER_CHAPITRE], actifId: PREMIER_CHAPITRE.id };

const couleurStatut: Record<StatutChapitre, string> = {
  brouillon: "bg-texte-secondaire",
  programme: "bg-alerte",
  publie: "bg-succes",
};

const nomStatut: Record<StatutChapitre, string> = {
  brouillon: "brouillon",
  programme: "programmé",
  publie: "publié",
};

export default function ChaptersWorkspace({ langue }: { langue: string }) {
  const [etat, setEtat, charge] = useLocalStorageState<Etat>(CLE_BROUILLON, ETAT_INITIAL);
  const [suppressionDemandee, setSuppressionDemandee] = useState(false);

  // Si le brouillon enregistré est abîmé, on repart du chapitre 1
  const chapitres = Array.isArray(etat.chapitres) && etat.chapitres.length > 0
    ? etat.chapitres
    : ETAT_INITIAL.chapitres;
  const actif = chapitres.find((c) => c.id === etat.actifId) ?? chapitres[0];
  const totalMots = chapitres.reduce((somme, c) => somme + c.mots, 0);

  function modifierChapitre(id: string, modifs: Partial<Chapitre>) {
    setEtat((e) => ({
      ...e,
      chapitres: e.chapitres.map((c) => (c.id === id ? { ...c, ...modifs } : c)),
    }));
  }

  function choisir(id: string) {
    setSuppressionDemandee(false);
    setEtat((e) => ({ ...e, actifId: id }));
  }

  function ajouter() {
    const nouveau: Chapitre = {
      id: crypto.randomUUID(),
      titre: `Chapitre ${chapitres.length + 1}`,
      html: "",
      mots: 0,
      statut: "brouillon",
    };
    setSuppressionDemandee(false);
    setEtat((e) => ({ chapitres: [...e.chapitres, nouveau], actifId: nouveau.id }));
  }

  function supprimer() {
    if (chapitres.length <= 1) return;
    const index = chapitres.findIndex((c) => c.id === actif.id);
    const reste = chapitres.filter((c) => c.id !== actif.id);
    const suivant = reste[Math.max(0, index - 1)];
    setSuppressionDemandee(false);
    setEtat({ chapitres: reste, actifId: suivant.id });
  }

  if (!charge) {
    return (
      <div
        aria-busy="true"
        aria-label="Chargement de vos chapitres"
        className="h-64 animate-pulse rounded-2xl bg-creme/60"
      />
    );
  }

  return (
    <section aria-labelledby="titre-chapitres">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="titre-chapitres" className="font-serif text-2xl text-marron">
          Vos chapitres
        </h2>
        <p className="text-sm text-texte-secondaire">
          {chapitres.length} chapitre{chapitres.length > 1 ? "s" : ""} · {formaterNombre(totalMots)}{" "}
          mots
        </p>
      </div>

      <nav aria-label="Liste des chapitres" className="mt-4">
        <ol className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {chapitres.map((c, i) => {
            const estActif = c.id === actif.id;
            return (
              <li key={c.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => choisir(c.id)}
                  aria-current={estActif ? "true" : undefined}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or ${
                    estActif
                      ? "border-marron bg-marron text-white"
                      : "border-bordure bg-white text-marron hover:border-or"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 shrink-0 rounded-full ring-1 ring-white/70 ${couleurStatut[c.statut]}`}
                  />
                  <span className="max-w-[10rem] truncate">
                    {c.titre.trim() || `Chapitre ${i + 1}`}
                  </span>
                  <span className="sr-only">({nomStatut[c.statut]})</span>
                </button>
              </li>
            );
          })}

          <li className="shrink-0">
            <button
              type="button"
              onClick={ajouter}
              className="flex items-center gap-1.5 rounded-full border border-dashed border-or px-4 py-2 text-sm text-marron transition hover:bg-creme focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
            >
              <Plus size={16} aria-hidden="true" />
              Ajouter un chapitre
            </button>
          </li>
        </ol>
      </nav>

      <div className="mt-6">
        {/* key : un nouvel éditeur est créé à chaque changement de chapitre */}
        <ChapterEditor
          key={actif.id}
          chapitre={actif}
          langue={langue}
          onChange={(modifs) => modifierChapitre(actif.id, modifs)}
          onStatut={(statut, publieLe) => modifierChapitre(actif.id, { statut, publieLe })}
        />
      </div>

      {/* Suppression */}
      <div className="mt-8 flex justify-end border-t border-bordure pt-4">
        {suppressionDemandee ? (
          <div role="alert" className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-marron-fonce">Supprimer définitivement ce chapitre ?</span>
            <button
              type="button"
              onClick={supprimer}
              className="rounded-lg bg-erreur px-3 py-1.5 font-medium text-white hover:opacity-90"
            >
              Oui, supprimer
            </button>
            <button
              type="button"
              onClick={() => setSuppressionDemandee(false)}
              className="rounded-lg border border-bordure px-3 py-1.5 text-marron hover:bg-creme"
            >
              Annuler
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setSuppressionDemandee(true)}
            disabled={chapitres.length <= 1}
            title={chapitres.length <= 1 ? "Un livre doit garder au moins un chapitre" : undefined}
            className="flex items-center gap-1.5 text-sm text-erreur hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
          >
            <Trash2 size={14} aria-hidden="true" />
            Supprimer ce chapitre
          </button>
        )}
      </div>
    </section>
  );
}