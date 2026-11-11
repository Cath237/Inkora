import Link from "next/link";
import { X } from "lucide-react";
import { construireUrl, type FiltreActif } from "@/lib/explorer/params";
import type { FiltresExplorer } from "@/lib/explorer/types";

type ActiveFiltersProps = { filtres: FiltresExplorer; actifs: FiltreActif[] };

// Les pastilles « Romance × » : un clic sur la croix retire ce filtre
export default function ActiveFilters({ filtres, actifs }: ActiveFiltersProps) {
  if (actifs.length === 0) return null;

  return (
    <ul aria-label="Filtres appliqués" className="flex flex-wrap gap-2">
      {actifs.map(({ cle, label }) => (
        <li key={cle}>
          <Link
            href={construireUrl(filtres, { [cle]: cle === "verifie" || cle === "soumissions" ? false : undefined, page: 1 })}
            className="inline-flex items-center gap-1.5 rounded-full bg-creme py-1 pl-3 pr-2 text-sm text-marron transition hover:bg-or/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
          >
            {label}
            <X size={14} aria-hidden="true" />
            <span className="sr-only">Retirer le filtre {label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}