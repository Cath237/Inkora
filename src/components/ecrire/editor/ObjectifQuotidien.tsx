import { Check, Target } from "lucide-react";
import { formaterNombre } from "@/lib/ecriture/utils";

const CHOIX = [0, 200, 300, 500, 1000, 2000];

type ObjectifQuotidienProps = {
  ecrits: number;
  objectif: number;
  onObjectif: (valeur: number) => void;
};

export default function ObjectifQuotidien({
  ecrits,
  objectif,
  onObjectif,
}: ObjectifQuotidienProps) {
  const atteint = objectif > 0 && ecrits >= objectif;
  const pourcentage = objectif > 0 ? Math.min(100, Math.round((ecrits / objectif) * 100)) : 0;

  return (
    <section
      aria-labelledby="titre-objectif"
      className="mt-6 rounded-2xl border border-bordure bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          id="titre-objectif"
          className="flex items-center gap-2 font-serif text-lg text-marron"
        >
          <Target size={20} aria-hidden="true" className="text-or" />
          Objectif du jour
        </h2>

        <label className="flex items-center gap-2 text-sm text-texte-secondaire">
          Objectif
          <select
            value={objectif}
            onChange={(e) => onObjectif(Number(e.target.value))}
            className="h-9 rounded-lg border border-bordure bg-white px-2 text-marron-fonce outline-none focus:border-or focus:ring-2 focus:ring-or/30"
          >
            {CHOIX.map((n) => (
              <option key={n} value={n}>
                {n === 0 ? "Aucun" : `${formaterNombre(n)} mots`}
              </option>
            ))}
          </select>
        </label>
      </div>

      {objectif > 0 ? (
        <>
          <div
            role="progressbar"
            aria-label="Progression de l’objectif du jour"
            aria-valuemin={0}
            aria-valuemax={objectif}
            aria-valuenow={Math.min(ecrits, objectif)}
            className="mt-4 h-3 overflow-hidden rounded-full bg-creme"
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                atteint ? "bg-succes" : "bg-gradient-to-r from-or to-or-clair"
              }`}
              style={{ width: `${pourcentage}%` }}
            />
          </div>

          <p className="mt-2 flex items-center gap-2 text-sm text-texte-secondaire">
            {atteint && <Check size={16} aria-hidden="true" className="text-succes" />}
            {atteint
              ? `Objectif atteint, bravo ! ${formaterNombre(ecrits)} mots écrits aujourd’hui.`
              : `${formaterNombre(ecrits)} / ${formaterNombre(objectif)} mots écrits aujourd’hui`}
          </p>
        </>
      ) : (
        <p className="mt-3 text-sm text-texte-secondaire">
          {formaterNombre(ecrits)} mots écrits aujourd’hui. Choisissez un objectif pour suivre
          votre progression.
        </p>
      )}
    </section>
  );
}