import Link from "next/link";
import { BookOpen, CircleCheck } from "lucide-react";
import BookCover from "@/components/BookCover";
import { formaterNote } from "@/lib/format";
import { formaterMoisAnnee, formaterPrix } from "@/lib/profils/format";
import type { ParamsProfil } from "@/lib/profils/affichage";
import type { LivreCatalogue, ProfilMaison, SujetContact } from "@/lib/profils/types";
import Avatar from "../Avatar";
import FiltreChips from "../FiltreChips";
import { bouton } from "../styles";
import ContactSection from "./ContactSection";
import { Bloc, Chips, Etoiles, Fait, Vide } from "./blocs";

const sujets: SujetContact[] = [
  { valeur: "manuscrit", label: "Soumettre un manuscrit" },
  { valeur: "partenariat", label: "Proposition de partenariat" },
  { valeur: "question", label: "Question générale" },
];

function CarteCatalogue({ livre }: { livre: LivreCatalogue }) {
  const { auteur } = livre;
  return (
    <article className="flex h-full flex-col rounded-2xl border border-bordure bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        <Link href={`/livre/${livre.id}`} tabIndex={-1} aria-hidden="true" className="shrink-0">
          <BookCover titre={livre.titre} auteur={auteur.nom} teinte={livre.teinte} className="w-24 sm:w-28" />
        </Link>
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 font-medium text-marron-fonce">
            <Link href={`/livre/${livre.id}`} className="hover:underline">
              {livre.titre}
            </Link>
          </h3>
          <p className="mt-0.5 text-xs text-texte-secondaire">
            {livre.genre} · édité en {livre.annee}
          </p>
          <p className="mt-2 flex items-center gap-2 text-xs text-texte-secondaire">
            <Etoiles note={livre.note} />
            {formaterNote(livre.note)}
          </p>
          {livre.prix && (
            <p className="mt-3 font-semibold text-marron">{formaterPrix(livre.prix)}</p>
          )}
        </div>
      </div>

      {/* L'auteur, avec la possibilité de le contacter */}
      <div className="mt-auto flex items-center gap-3 border-t border-bordure pt-4">
        <Link
          href={`/profil/${auteur.slug}`}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
        >
          <Avatar nom={auteur.nom} teinte={auteur.teinte} taille="md" />
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-marron-fonce">{auteur.nom}</span>
            <span className="block truncate text-xs text-texte-secondaire">
              {auteur.ville}, {auteur.pays}
            </span>
          </span>
        </Link>
        <Link href={`/messages?a=${auteur.slug}`} className={`${bouton.secondaire} shrink-0 !px-3.5 !py-1.5`}>
          Contacter<span className="sr-only"> {auteur.nom}</span>
        </Link>
      </div>
    </article>
  );
}

function AProposMaison({ profil }: { profil: ProfilMaison }) {
  const { soumission } = profil;
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

        <Bloc titre="Soumettre un manuscrit">
          <p className="flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                soumission.ouverte ? "bg-succes/10 text-succes" : "bg-alerte/10 text-alerte"
              }`}
            >
              {soumission.ouverte ? "Soumissions ouvertes" : "Soumissions fermées"}
            </span>
            <span className="text-sm text-texte-secondaire">
              Réponse sous {soumission.delaiReponse}
            </span>
          </p>

          <ul className="mt-4 space-y-2">
            {soumission.conditions.map((c) => (
              <li key={c} className="flex gap-2 text-marron-fonce">
                <CircleCheck size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-or" />
                {c}
              </li>
            ))}
          </ul>

          {soumission.ouverte && (
            <Link href="?onglet=contact&objet=manuscrit#contenu" className={`${bouton.dore} mt-5`}>
              Soumettre mon manuscrit
            </Link>
          )}
        </Bloc>
      </div>

      <aside className="space-y-6">
        <Bloc titre="Genres publiés">
          <Chips items={profil.genres} />
        </Bloc>
        <Bloc titre="En chiffres">
          <dl>
            <Fait label="Fondée en">{profil.fondeeEn}</Fait>
            <Fait label="Livres publiés">{profil.stats.livresPublies}</Fait>
            <Fait label="Auteurs">{profil.stats.auteurs}</Fait>
            <Fait label="Récompenses">{profil.stats.recompenses}</Fait>
            <Fait label="Sur Inkora depuis">{formaterMoisAnnee(profil.membreDepuis)}</Fait>
          </dl>
        </Bloc>
      </aside>
    </div>
  );
}

export default function PublisherSections({
  profil,
  onglet,
  params,
}: {
  profil: ProfilMaison;
  onglet: string;
  params: ParamsProfil;
}) {
  if (onglet === "apropos") return <AProposMaison profil={profil} />;

  if (onglet === "contact") {
    return (
      <ContactSection
        destinataire={profil.nom}
        contact={profil.contact}
        siteWeb={profil.siteWeb}
        sujets={sujets}
        objet={params.objet}
      />
    );
  }

  // Catalogue (onglet par défaut), filtrable par genre
  const genres = [...new Set(profil.catalogue.map((l) => l.genre))];
  const affiches = params.genre
    ? profil.catalogue.filter((l) => l.genre === params.genre)
    : profil.catalogue;

  return (
    <div className="space-y-5">
      <FiltreChips
        etiquette="genre"
        param="genre"
        onglet="catalogue"
        options={genres}
        actuel={params.genre}
      />
      {affiches.length === 0 ? (
        <Vide icone={BookOpen} texte="Aucun livre dans cette catégorie." />
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {affiches.map((livre) => (
            <li key={livre.id}>
              <CarteCatalogue livre={livre} />
            </li>
          ))}
        </ul>
      )}
      <p className="text-center text-xs text-texte-secondaire">
        Derniers titres du catalogue ({profil.stats.livresPublies} livres publiés au total).
      </p>
    </div>
  );
}