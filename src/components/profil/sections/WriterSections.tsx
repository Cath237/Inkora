import Link from "next/link";
import { Eye, Feather, Flame, MessageSquare, Star, Trophy, BookOpen, type LucideIcon } from "lucide-react";
import BookCover from "@/components/BookCover";
import { formaterNote } from "@/lib/format";
import { formaterCompact, formaterMoisAnnee } from "@/lib/profils/format";
import type { CleBadge, LivreProfil, ProfilEcrivain } from "@/lib/profils/types";
import { ActiviteSection, BibliothequeSection } from "./ReaderSections";
import { Bloc, Chips, Fait, PastillePrix, Vide } from "./blocs";

function CarteLivre({ livre, auteur }: { livre: LivreProfil; auteur: string }) {
  const termine = livre.statut === "termine";
  return (
    <Link
      href={`/livre/${livre.id}`}
      className="group flex gap-4 rounded-2xl border border-bordure bg-white p-3 shadow-sm transition hover:border-or hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or sm:p-4"
    >
      <BookCover
        titre={livre.titre}
        auteur={auteur}
        teinte={livre.teinte}
        className="w-24 shrink-0 sm:w-28"
      />
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 font-medium text-marron-fonce group-hover:underline">
          {livre.titre}
        </h3>
        <p className="mt-0.5 text-xs text-texte-secondaire">
          {livre.genre} · {livre.chapitres} chapitres
        </p>

        <p className="mt-2 flex items-center gap-3 text-xs text-texte-secondaire">
          <span className="flex items-center gap-1">
            <Star size={12} aria-hidden="true" className="fill-or text-or" />
            <span className="sr-only">Note :</span>
            {formaterNote(livre.note)}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={12} aria-hidden="true" />
            <span className="sr-only">Lectures :</span>
            {formaterCompact(livre.lectures)}
          </span>
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              termine ? "bg-succes/10 text-succes" : "bg-alerte/10 text-alerte"
            }`}
          >
            {termine ? "Terminé" : "En cours"}
          </span>
          <PastillePrix prix={livre.prix} />
        </div>
      </div>
    </Link>
  );
}

const iconesBadges: Record<CleBadge, LucideIcon> = {
  flamme: Flame,
  trophee: Trophy,
  livre: BookOpen,
  etoile: Star,
  plume: Feather,
};

function AProposEcrivain({ profil }: { profil: ProfilEcrivain }) {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_20rem]">
      <div className="space-y-6">
        <Bloc titre="À propos">
          <div className="space-y-3 text-marron-fonce">
            {profil.apropos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Bloc>

        {profil.badges.length > 0 && (
          <Bloc titre="Badges et réalisations">
            <ul className="grid gap-3 sm:grid-cols-2">
              {profil.badges.map((b) => {
                const Icone = iconesBadges[b.cle];
                return (
                  <li
                    key={b.nom}
                    className="flex gap-3 rounded-xl border border-bordure bg-creme/40 p-3"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-or/20 text-marron">
                      <Icone size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-medium text-marron-fonce">{b.nom}</p>
                      <p className="text-xs text-texte-secondaire">{b.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Bloc>
        )}
      </div>

      <aside className="space-y-6">
        <Bloc titre="En chiffres">
          <dl className="grid grid-cols-3 gap-2 text-center">
            {[
              { icone: Eye, valeur: profil.stats.lectures, label: "Lectures" },
              { icone: Star, valeur: profil.stats.votes, label: "Votes" },
              { icone: MessageSquare, valeur: profil.stats.commentaires, label: "Avis" },
            ].map(({ icone: Icone, valeur, label }) => (
              <div key={label} className="flex flex-col-reverse items-center">
                <dt className="text-xs text-texte-secondaire">{label}</dt>
                <dd className="flex items-center gap-1 font-serif text-lg text-marron">
                  <Icone size={14} aria-hidden="true" className="text-or" />
                  {formaterCompact(valeur)}
                </dd>
              </div>
            ))}
          </dl>
        </Bloc>

        <Bloc titre="Genres">
          <Chips items={profil.genres} />
        </Bloc>

        <Bloc titre="Informations">
          <dl>
            <Fait label="Langues">{profil.langues.join(", ")}</Fait>
            <Fait label="Membre depuis">{formaterMoisAnnee(profil.membreDepuis)}</Fait>
          </dl>
          {profil.liens.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {profil.liens.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-bordure px-3 py-1 text-sm text-marron transition hover:border-or"
                  >
                    {l.label}
                    <span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Bloc>
      </aside>
    </div>
  );
}

export default function WriterSections({
  profil,
  onglet,
}: {
  profil: ProfilEcrivain;
  onglet: string;
}) {
  if (onglet === "apropos") return <AProposEcrivain profil={profil} />;
  if (onglet === "bibliotheque") return <BibliothequeSection bibliotheque={profil.lecture} />;
  if (onglet === "activite") return <ActiviteSection activites={profil.activite} />;

  if (profil.livres.length === 0) {
    return <Vide icone={Feather} texte="Aucun livre publié pour l’instant." />;
  }
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {profil.livres.map((livre) => (
        <li key={livre.id}>
          <CarteLivre livre={livre} auteur={profil.nom} />
        </li>
      ))}
    </ul>
  );
}