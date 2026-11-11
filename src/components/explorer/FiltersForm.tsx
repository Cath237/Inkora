import Link from "next/link";
import { genres, langues } from "@/lib/livre-options";
import { construireUrl } from "@/lib/explorer/params";
import type { FiltresExplorer } from "@/lib/explorer/types";

type FiltersFormProps = { filtres: FiltresExplorer; pays: string[] };

const champ =
  "mt-1 h-10 w-full rounded-lg border border-bordure bg-white px-2 text-sm text-marron-fonce outline-none focus:border-or focus:ring-2 focus:ring-or/30";

function Choix({
  nom,
  legende,
  options,
  valeur,
}: {
  nom: string;
  legende: string;
  options: { valeur: string; label: string }[];
  valeur?: string;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-marron-fonce">{legende}</legend>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.valeur} className="cursor-pointer">
            <input
              type="radio"
              name={nom}
              value={o.valeur}
              defaultChecked={(valeur ?? "") === o.valeur}
              className="peer sr-only"
            />
            <span className="block rounded-full border border-bordure bg-white px-3 py-1.5 text-sm text-marron-fonce transition hover:border-or peer-checked:border-marron peer-checked:bg-marron peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-or">
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Case({ nom, label, coche }: { nom: string; label: string; coche: boolean }) {
  return (
    <label className="flex items-center gap-3 text-sm text-marron-fonce">
      <input
        type="checkbox"
        name={nom}
        value="1"
        defaultChecked={coche}
        className="h-5 w-5 shrink-0 accent-marron"
      />
      {label}
    </label>
  );
}

// Un formulaire « GET » : quand on clique sur Appliquer, le navigateur ajoute les choix
// dans l'adresse (/explorer?genre=romance&langue=fr). Aucune ligne de JavaScript nécessaire.
export default function FiltersForm({ filtres, pays }: FiltersFormProps) {
  const reinitialiser = construireUrl({ type: filtres.type, q: filtres.q });

  return (
    <form
      action="/explorer"
      className="space-y-5 rounded-2xl border border-bordure bg-white p-5 shadow-sm"
    >
      {/* Ce qui doit être conservé quand on applique les filtres */}
      {filtres.type !== "livres" && <input type="hidden" name="type" value={filtres.type} />}
      {filtres.q && <input type="hidden" name="q" value={filtres.q} />}
      <input type="hidden" name="tri" value={filtres.tri} />

      <h2 className="font-serif text-lg text-marron">Filtres</h2>

      {filtres.type === "livres" && (
        <>
          <label className="block text-sm font-medium text-marron-fonce">
            Genre
            <select name="genre" defaultValue={filtres.genre ?? ""} className={champ}>
              <option value="">Tous les genres</option>
              {genres.map((g) => (
                <option key={g.slug} value={g.slug}>
                  {g.nom}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-marron-fonce">
            Langue
            <select name="langue" defaultValue={filtres.langue ?? ""} className={champ}>
              <option value="">Toutes les langues</option>
              {langues
                .filter((l) => l.valeur !== "autre")
                .map((l) => (
                  <option key={l.valeur} value={l.valeur}>
                    {l.nom}
                  </option>
                ))}
            </select>
          </label>
        </>
      )}

      <label className="block text-sm font-medium text-marron-fonce">
        {filtres.type === "livres" ? "Pays de l’auteur" : "Pays"}
        <select name="pays" defaultValue={filtres.pays ?? ""} className={champ}>
          <option value="">Tous les pays</option>
          {pays.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>

      {filtres.type === "livres" && (
        <>
          <Choix
            nom="prix"
            legende="Prix"
            valeur={filtres.prix}
            options={[
              { valeur: "", label: "Tous" },
              { valeur: "gratuit", label: "Gratuits" },
              { valeur: "payant", label: "Payants" },
            ]}
          />
          <Choix
            nom="statut"
            legende="Avancement"
            valeur={filtres.statut}
            options={[
              { valeur: "", label: "Tous" },
              { valeur: "en-cours", label: "En cours" },
              { valeur: "termine", label: "Terminés" },
            ]}
          />
        </>
      )}

      {filtres.type !== "livres" && (
        <div className="space-y-3">
          <Case nom="verifie" label="Comptes vérifiés seulement" coche={filtres.verifie} />
          {filtres.type === "maisons" && (
            <Case nom="soumissions" label="Soumissions de manuscrits ouvertes" coche={filtres.soumissions} />
          )}
        </div>
      )}

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-marron-chaud to-marron-fonce px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
        >
          Appliquer
        </button>
        <Link href={reinitialiser} className="text-sm text-marron hover:underline">
          Réinitialiser
        </Link>
      </div>
    </form>
  );
}