import Link from "next/link";
import { construireUrl, LIBELLES_TRI, TRIS_PAR_TYPE } from "@/lib/explorer/params";
import type { FiltresExplorer } from "@/lib/explorer/types";

export default function SortLinks({ filtres }: { filtres: FiltresExplorer }) {
  // « Pertinence » n'a de sens que s'il y a des mots cherchés
  const tris = TRIS_PAR_TYPE[filtres.type].filter((t) => t !== "pertinence" || filtres.q);

  return (
    <nav aria-label="Trier les résultats" className="flex flex-wrap items-center gap-2 text-sm">
      <span className="text-texte-secondaire">Trier par</span>
      {tris.map((tri) => {
        const actif = tri === filtres.tri;
        return (
          <Link
            key={tri}
            href={construireUrl(filtres, { tri, page: 1 })}
            aria-current={actif ? "true" : undefined}
            className={`rounded-full px-3 py-1 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or ${
              actif ? "bg-marron text-white" : "text-marron hover:bg-creme"
            }`}
          >
            {LIBELLES_TRI[tri]}
          </Link>
        );
      })}
    </nav>
  );
}