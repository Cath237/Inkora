import { useEffect } from "react";

export type Preferences = {
  taille: number;
  interligne: number;
  correcteur: boolean;
};

export const PREFERENCES_PAR_DEFAUT: Preferences = {
  taille: 18,
  interligne: 1.75,
  correcteur: true,
};

const style =
  "h-9 w-full rounded-lg border border-bordure bg-white px-2 text-sm text-marron-fonce outline-none focus:border-or focus:ring-2 focus:ring-or/30";

type PanneauAffichageProps = {
  prefs: Preferences;
  onChange: (prefs: Preferences) => void;
  onFermer: () => void;
};

export default function PanneauAffichage({ prefs, onChange, onFermer }: PanneauAffichageProps) {
  // La touche Échap ferme le panneau
  useEffect(() => {
    function surTouche(e: KeyboardEvent) {
      if (e.key === "Escape") onFermer();
    }
    document.addEventListener("keydown", surTouche);
    return () => document.removeEventListener("keydown", surTouche);
  }, [onFermer]);

  return (
    <div
      id="panneau-affichage"
      className="absolute right-0 top-full z-40 mt-2 w-72 max-w-full space-y-4 rounded-xl border border-bordure bg-white p-4 shadow-lg"
    >
      <p className="text-xs text-texte-secondaire">
        Ces réglages changent seulement l’affichage de votre écran, pas votre livre.
      </p>

      <label className="block text-sm font-medium text-marron-fonce">
        Taille du texte
        <select
          value={prefs.taille}
          onChange={(e) => onChange({ ...prefs, taille: Number(e.target.value) })}
          className={`${style} mt-1`}
        >
          <option value={16}>Petite</option>
          <option value={18}>Moyenne</option>
          <option value={20}>Grande</option>
          <option value={22}>Très grande</option>
        </select>
      </label>

      <label className="block text-sm font-medium text-marron-fonce">
        Interligne
        <select
          value={prefs.interligne}
          onChange={(e) => onChange({ ...prefs, interligne: Number(e.target.value) })}
          className={`${style} mt-1`}
        >
          <option value={1.5}>Serré</option>
          <option value={1.75}>Normal</option>
          <option value={2}>Aéré</option>
        </select>
      </label>

      <label className="flex items-start gap-3 text-sm text-marron-fonce">
        <input
          type="checkbox"
          checked={prefs.correcteur}
          onChange={(e) => onChange({ ...prefs, correcteur: e.target.checked })}
          className="mt-0.5 h-5 w-5 shrink-0 accent-marron"
        />
        <span>
          Correcteur orthographique
          <span className="block text-xs text-texte-secondaire">
            Souligne les fautes en rouge (celui de votre navigateur).
          </span>
        </span>
      </label>
    </div>
  );
}