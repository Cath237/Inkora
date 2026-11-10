import Link from "next/link";
import { Eye, Star } from "lucide-react";
import BookCover from "@/components/BookCover";
import { formaterNote, formaterVues } from "@/lib/format";
import type { Livre } from "@/lib/types";

export default function BookCard({ livre }: { livre: Livre }) {
  return (
    <Link
      href={`/livre/${livre.id}`}
      className="group block w-36 shrink-0 snap-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-or md:w-44"
    >
      <BookCover
        titre={livre.titre}
        auteur={livre.auteur}
        teinte={livre.teinte}
        className="transition group-hover:-translate-y-1 group-hover:shadow-lg"
      />

      <h3 className="mt-2 line-clamp-2 text-sm font-medium text-marron-fonce">
        {livre.titre}
      </h3>
      <p className="text-xs text-texte-secondaire">{livre.auteur}</p>

      <p className="mt-1 flex items-center gap-3 text-xs text-texte-secondaire">
        <span className="flex items-center gap-1">
          <Star size={12} aria-hidden="true" className="fill-or text-or" />
          <span className="sr-only">Note :</span>
          {formaterNote(livre.note)}
        </span>
        <span className="flex items-center gap-1">
          <Eye size={12} aria-hidden="true" />
          <span className="sr-only">Vues :</span>
          {formaterVues(livre.vues)}
        </span>
      </p>
    </Link>
  );
}