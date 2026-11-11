"use client";

import { ReactNode, useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

type FiltresPliablesProps = { nombreActifs: number; children: ReactNode };

// Sur téléphone : un bouton « Filtres » qui ouvre et ferme le panneau.
// Sur grand écran : le panneau est toujours visible, à côté des résultats.
export default function FiltresPliables({ nombreActifs, children }: FiltresPliablesProps) {
  const [ouvert, setOuvert] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOuvert((v) => !v)}
        aria-expanded={ouvert}
        aria-controls="panneau-filtres"
        className="flex w-full items-center justify-between rounded-xl border border-bordure bg-white px-4 py-3 text-sm font-medium text-marron transition hover:border-or focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or lg:hidden"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal size={18} aria-hidden="true" />
          Filtres
          {nombreActifs > 0 && (
            <span className="rounded-full bg-marron px-2 py-0.5 text-xs text-white">
              {nombreActifs}
              <span className="sr-only"> actif{nombreActifs > 1 ? "s" : ""}</span>
            </span>
          )}
        </span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`transition ${ouvert ? "rotate-180" : ""}`}
        />
      </button>

      <div id="panneau-filtres" className={`${ouvert ? "mt-3 block" : "hidden"} lg:mt-0 lg:block`}>
        {children}
      </div>
    </div>
  );
}