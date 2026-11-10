import Link from "next/link";
import {
  Award,
  BookMarked,
  Library,
  ListChecks,
  PenLine,
  Star,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import BookCard from "@/components/app/BookCard";
import Rail from "@/components/app/Rail";
import BookCover from "@/components/BookCover";
import Avatar from "../Avatar";
import { Bloc, Chips, Etoiles, Fait, Vide } from "./blocs";
import { formaterCompact, formaterMoisAnnee, formaterRelatif } from "@/lib/profils/format";
import type { Activite, Avis, Bibliotheque, ProfilLecteur } from "@/lib/profils/types";

// --- Bibliothèque (partagée entre le lecteur et l'écrivain)
export function BibliothequeSection({ bibliotheque }: { bibliotheque: Bibliotheque }) {
  const { enCours, listes, favoris } = bibliotheque;

  if (enCours.length === 0 && listes.length === 0 && favoris.length === 0) {
    return <Vide icone={Library} texte="La bibliothèque est vide pour l’instant." />;
  }

  return (
    <div className="space-y-6">
      {enCours.length > 0 && (
        <Bloc titre="En cours de lecture">
          <ul className="grid gap-4 md:grid-cols-2">
            {enCours.map(({ livre, chapitre, chapitres }) => {
              const pourcentage = Math.round((chapitre / chapitres) * 100);
              return (
                <li key={livre.id}>
                  <Link
                    href={`/livre/${livre.id}`}
                    className="flex gap-4 rounded-xl border border-bordure p-3 transition hover:border-or focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
                  >
                    <BookCover
                      titre={livre.titre}
                      auteur={livre.auteur}
                      teinte={livre.teinte}
                      className="w-16 shrink-0"
                    />
                    <div className="min-w-0 flex-1 self-center">
                      <p className="line-clamp-2 font-medium text-marron-fonce">{livre.titre}</p>
                      <p className="text-xs text-texte-secondaire">{livre.auteur}</p>
                      <div
                        role="progressbar"
                        aria-label={`Progression de la lecture de ${livre.titre}`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={pourcentage}
                        className="mt-3 h-2 overflow-hidden rounded-full bg-creme"
                      >
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-or to-or-clair"
                          style={{ width: `${pourcentage}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-texte-secondaire">
                        Chapitre {chapitre} sur {chapitres} · {pourcentage} %
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Bloc>
      )}

      {listes.length > 0 && (
        <Bloc titre="Listes de lecture">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listes.map((liste) => (
              <li
                key={liste.id}
                className="rounded-xl border border-bordure bg-creme/40 p-4"
              >
                <BookMarked size={22} aria-hidden="true" className="text-or" />
                <h3 className="mt-2 font-medium text-marron-fonce">{liste.nom}</h3>
                <p className="text-sm text-texte-secondaire">{liste.description}</p>
                <p className="mt-2 text-xs font-medium text-marron">
                  {liste.nbLivres} livre{liste.nbLivres > 1 ? "s" : ""}
                </p>
              </li>
            ))}
          </ul>
        </Bloc>
      )}

      {favoris.length > 0 && (
        <Bloc titre="Favoris">
          <Rail>
            {favoris.map((livre) => (
              <BookCard key={livre.id} livre={livre} />
            ))}
          </Rail>
        </Bloc>
      )}
    </div>
  );
}

// --- Activité récente (écrivain)
const iconesActivite: Record<Activite["type"], LucideIcon> = {
  chapitre: PenLine,
  avis: Star,
  liste: ListChecks,
  badge: Award,
  abonnement: UserPlus,
};

export function ActiviteSection({ activites }: { activites: Activite[] }) {
  if (activites.length === 0) {
    return <Vide icone={PenLine} texte="Aucune activité récente." />;
  }

  return (
    <Bloc titre="Activité récente">
      <ol className="space-y-4">
        {activites.map((a) => {
          const Icone = iconesActivite[a.type];
          return (
            <li key={a.id} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-creme text-marron">
                <Icone size={16} aria-hidden="true" />
              </span>
              <div>
                <p className="text-marron-fonce">{a.texte}</p>
                <p className="text-xs text-texte-secondaire">{formaterRelatif(a.date)}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Bloc>
  );
}

// --- Avis (lecteur)
export function AvisSection({ avis }: { avis: Avis[] }) {
  if (avis.length === 0) {
    return <Vide icone={Star} texte="Aucun avis publié pour l’instant." />;
  }

  return (
    <ul className="space-y-4">
      {avis.map((a) => (
        <li
          key={a.id}
          className="flex gap-4 rounded-2xl border border-bordure bg-white p-4 shadow-sm sm:p-5"
        >
          <Link href={`/livre/${a.livre.id}`} tabIndex={-1} aria-hidden="true" className="shrink-0">
            <BookCover
              titre={a.livre.titre}
              auteur={a.livre.auteur}
              teinte={a.livre.teinte}
              className="w-16 sm:w-20"
            />
          </Link>
          <div className="min-w-0">
            <h3 className="font-medium text-marron-fonce">
              <Link href={`/livre/${a.livre.id}`} className="hover:underline">
                {a.livre.titre}
              </Link>
              <span className="font-normal text-texte-secondaire"> · {a.livre.auteur}</span>
            </h3>
            <p className="mt-1 flex items-center gap-2 text-xs text-texte-secondaire">
              <Etoiles note={a.note} />
              {formaterRelatif(a.date)}
            </p>
            <p className="mt-2 text-marron-fonce">{a.texte}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

// --- À propos (lecteur)
export function AProposLecteur({ profil }: { profil: ProfilLecteur }) {
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

        {profil.auteursSuivis.length > 0 && (
          <Bloc titre="Auteurs suivis">
            <ul className="grid gap-3 sm:grid-cols-2">
              {profil.auteursSuivis.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/profil/${a.slug}`}
                    className="flex items-center gap-3 rounded-xl border border-bordure p-3 transition hover:border-or focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
                  >
                    <Avatar nom={a.nom} teinte={a.teinte} taille="md" />
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-marron-fonce">{a.nom}</span>
                      <span className="block truncate text-xs text-texte-secondaire">
                        {a.ville}, {a.pays}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Bloc>
        )}
      </div>

      <aside className="space-y-6">
        <Bloc titre="Genres préférés">
          <Chips items={profil.genresPreferes} />
        </Bloc>
        <Bloc titre="En chiffres">
          <dl>
            <Fait label="Livres lus">{formaterCompact(profil.stats.livresLus)}</Fait>
            <Fait label="Avis publiés">{formaterCompact(profil.stats.avis)}</Fait>
            <Fait label="Membre depuis">{formaterMoisAnnee(profil.membreDepuis)}</Fait>
          </dl>
        </Bloc>
      </aside>
    </div>
  );
}

export function SectionsLecteur({ profil, onglet }: { profil: ProfilLecteur; onglet: string }) {
  if (onglet === "avis") return <AvisSection avis={profil.avis} />;
  if (onglet === "apropos") return <AProposLecteur profil={profil} />;
  return <BibliothequeSection bibliotheque={profil.lecture} />;
}