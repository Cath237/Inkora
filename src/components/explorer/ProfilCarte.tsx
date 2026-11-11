import Link from "next/link";
import { BadgeCheck, MapPin, Star } from "lucide-react";
import Avatar from "@/components/profil/Avatar";
import { formaterCompact, formaterPrix } from "@/lib/profils/format";
import type { Profil } from "@/lib/profils/types";

// Une ligne de détail propre à chaque type de profil
function detail(p: Profil): string | null {
  switch (p.type) {
    case "ecrivain":
      return `${p.livres.length} livre${p.livres.length > 1 ? "s" : ""} · ${p.genres.slice(0, 2).join(", ")}`;
    case "maison-edition":
      return `${p.stats.livresPublies} livres publiés · ${p.genres.slice(0, 2).join(", ")}`;
    case "papeterie":
      return `Délai moyen : ${p.delaiMoyen}`;
    default:
      return null;
  }
}

function pastille(p: Profil): { texte: string; ok: boolean } | null {
  if (p.type === "maison-edition") {
    return p.soumission.ouverte
      ? { texte: "Soumissions ouvertes", ok: true }
      : { texte: "Soumissions fermées", ok: false };
  }
  return null;
}

export default function ProfilCarte({ profil }: { profil: Profil }) {
  const ligne = detail(profil);
  const etat = pastille(profil);
  const aPartirDe =
    profil.type === "papeterie" && profil.realisations.length > 0
      ? profil.realisations.reduce((min, r) => (r.prix.montant < min.prix.montant ? r : min)).prix
      : null;

  return (
    <article className="group relative flex gap-4 rounded-2xl border border-bordure bg-white p-4 shadow-sm transition hover:border-or hover:shadow-md">
      <Avatar nom={profil.nom} teinte={profil.teinte} taille="lg" />

      <div className="min-w-0 flex-1">
        <h3 className="flex flex-wrap items-center gap-x-2 font-medium text-marron-fonce">
          <Link
            href={`/profil/${profil.slug}`}
            className="after:absolute after:inset-0 group-hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-or"
          >
            {profil.nom}
          </Link>
          {profil.verifie && (
            <span className="inline-flex items-center gap-1 rounded-full bg-or/15 px-2 py-0.5 text-xs font-medium text-marron">
              <BadgeCheck size={12} aria-hidden="true" className="text-or" />
              Vérifié
            </span>
          )}
        </h3>

        <p className="line-clamp-1 text-sm text-texte-secondaire">{profil.accroche}</p>

        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-texte-secondaire">
          <MapPin size={12} aria-hidden="true" />
          {profil.ville}, {profil.pays}
        </p>

        {ligne && <p className="mt-1 text-xs text-texte-secondaire">{ligne}</p>}

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-creme px-2.5 py-0.5 font-medium text-marron">
            {formaterCompact(profil.abonnes)} abonnés
          </span>
          {profil.type === "papeterie" && (
            <span className="flex items-center gap-1 rounded-full bg-creme px-2.5 py-0.5 font-medium text-marron">
              <Star size={12} aria-hidden="true" className="fill-or text-or" />
              {profil.stats.note.toString().replace(".", ",")}
              <span className="sr-only"> sur 5</span>
            </span>
          )}
          {aPartirDe && (
            <span className="rounded-full bg-creme px-2.5 py-0.5 font-medium text-marron">
              dès {formaterPrix(aPartirDe)}
            </span>
          )}
          {etat && (
            <span
              className={`rounded-full px-2.5 py-0.5 font-medium ${
                etat.ok ? "bg-succes/10 text-succes" : "bg-alerte/10 text-alerte"
              }`}
            >
              {etat.texte}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}