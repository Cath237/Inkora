import Link from "next/link";
import { Eye, Star } from "lucide-react";
import BookCover from "@/components/BookCover";
import { PastillePrix } from "@/components/profil/sections/blocs";
import { formaterNote } from "@/lib/format";
import { genres, langues } from "@/lib/livre-options";
import type { LivreExplorer } from "@/lib/explorer/types";
import { formaterCompact } from "@/lib/profils/format";

const JOURS_NOUVEAU = 21;

export default function LivreCarte({ livre }: { livre: LivreExplorer }) {
  const nouveau = Date.now() - new Date(livre.publieLe).getTime() < JOURS_NOUVEAU * 86_400_000;
  const genre = genres.find((g) => g.slug === livre.genre)?.nom ?? livre.genre;
  const langue = langues.find((l) => l.valeur === livre.langue)?.nom ?? livre.langue;

  return (
    <article className="group relative">
      <div className="relative">
        <BookCover
          titre={livre.titre}
          auteur={livre.auteur.nom}
          teinte={livre.teinte}
          className="w-full transition group-hover:-translate-y-1 group-hover:shadow-lg"
        />
        {nouveau && (
          <span className="absolute left-2 top-2 rounded-full bg-or px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-marron-fonce">
            Nouveau
          </span>
        )}
      </div>

      <h3 className="mt-2 line-clamp-2 text-sm font-medium text-marron-fonce">
        {/* Le lien couvre toute la carte grâce à ::after */}
        <Link
          href={`/livre/${livre.id}`}
          className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-or"
        >
          {livre.titre}
        </Link>
      </h3>
      <p className="text-xs text-texte-secondaire">
        {livre.auteur.nom} · {livre.auteur.pays}
      </p>
      <p className="text-xs text-texte-secondaire">
        {genre} · {langue}
      </p>

      <p className="mt-1.5 flex items-center gap-3 text-xs text-texte-secondaire">
        <span className="flex items-center gap-1">
          <Star size={12} aria-hidden="true" className="fill-or text-or" />
          <span className="sr-only">Note :</span>
          {formaterNote(livre.note)}
        </span>
        <span className="flex items-center gap-1">
          <Eye size={12} aria-hidden="true" />
          <span className="sr-only">Lectures :</span>
          {formaterCompact(livre.vues)}
        </span>
      </p>

      <div className="mt-2 flex flex-wrap gap-1.5">
        <PastillePrix prix={livre.prix} />
        {livre.statut === "en-cours" && (
          <span className="rounded-full bg-alerte/10 px-2.5 py-0.5 text-xs font-medium text-alerte">
            En cours
          </span>
        )}
      </div>
    </article>
  );
}