import Link from "next/link";
import { construireUrl, TYPES } from "@/lib/explorer/params";
import type { TypeRecherche } from "@/lib/explorer/types";

type TypeTabsProps = {
  actif: TypeRecherche;
  q: string;
  comptes: Record<TypeRecherche, number>;
};

export default function TypeTabs({ actif, q, comptes }: TypeTabsProps) {
  return (
    <nav aria-label="Que cherchez-vous ?" className="border-b border-bordure">
      <ul className="-mb-px flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TYPES.map(({ cle, label }) => {
          const estActif = cle === actif;
          return (
            <li key={cle} className="shrink-0">
              {/* Changer d'onglet garde les mots cherchés, mais efface les filtres (ils diffèrent) */}
              <Link
                href={construireUrl({ type: cle, q })}
                aria-current={estActif ? "page" : undefined}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-or ${
                  estActif
                    ? "border-or text-marron"
                    : "border-transparent text-texte-secondaire hover:text-marron"
                }`}
              >
                {label}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    estActif ? "bg-or/20 text-marron" : "bg-creme text-texte-secondaire"
                  }`}
                >
                  {comptes[cle]}
                  <span className="sr-only"> résultat{comptes[cle] > 1 ? "s" : ""}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}