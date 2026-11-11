import { genres } from "@/lib/livre-options";
import { profils } from "@/lib/profils/mock-data";
import type { Profil } from "@/lib/profils/types";
import { livresExplorer } from "./mock-livres";
import type { FiltresExplorer, LivreExplorer, Resultat, TypeRecherche } from "./types";

// Tout ce fichier est « la recherche ». Aujourd'hui elle lit des données de démonstration ;
// plus tard, ces fonctions interrogeront Meilisearch et la base de données.
// Le reste de l'application ne changera pas : il appelle toujours les mêmes fonctions.

export const TAILLE_PAGE = 12;

// « Éclats de l'âme » et « eclats de l ame » doivent se valoir : on retire accents et majuscules
export function normaliser(texte: string) {
  return texte
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/œ/gi, "oe")
    .toLowerCase();
}

const mots = (q: string) => normaliser(q).split(/\s+/).filter(Boolean);

const nomGenre = (slug: string) => genres.find((g) => g.slug === slug)?.nom ?? slug;

function paginer<T>(items: T[], page: number): Resultat<T> {
  const pages = Math.max(1, Math.ceil(items.length / TAILLE_PAGE));
  const courante = Math.min(Math.max(page, 1), pages);
  const debut = (courante - 1) * TAILLE_PAGE;
  return { items: items.slice(debut, debut + TAILLE_PAGE), total: items.length, page: courante, pages };
}

// --- Livres

// Renvoie -1 si un mot n'est trouvé nulle part ; sinon un score (plus il est haut, plus c'est pertinent)
function scoreLivre(l: LivreExplorer, tokens: string[]): number {
  if (tokens.length === 0) return 0;
  const titre = normaliser(l.titre);
  const auteur = normaliser(l.auteur.nom);
  const tags = l.motsCles.map(normaliser);
  const genre = normaliser(nomGenre(l.genre));
  const resume = normaliser(l.resume);

  let total = 0;
  for (const t of tokens) {
    let s = 0;
    if (titre.includes(t)) s += 5;
    if (auteur.includes(t)) s += 3;
    if (tags.some((x) => x.includes(t))) s += 3;
    if (genre.includes(t)) s += 2;
    if (resume.includes(t)) s += 1;
    if (s === 0) return -1;
    total += s;
  }
  return total;
}

export async function rechercherLivres(f: FiltresExplorer): Promise<Resultat<LivreExplorer>> {
  const tokens = mots(f.q);

  let liste = livresExplorer
    .map((livre) => ({ livre, score: scoreLivre(livre, tokens) }))
    .filter((x) => x.score >= 0)
    .filter(({ livre: l }) => {
      if (f.genre && l.genre !== f.genre) return false;
      if (f.langue && l.langue !== f.langue) return false;
      if (f.pays && l.auteur.pays !== f.pays) return false;
      if (f.prix === "gratuit" && l.prix) return false;
      if (f.prix === "payant" && !l.prix) return false;
      if (f.statut && l.statut !== f.statut) return false;
      return true;
    });

  liste = [...liste].sort((a, b) => {
    switch (f.tri) {
      case "pertinence":
        return b.score - a.score || b.livre.vues - a.livre.vues;
      case "nouveautes":
        return b.livre.publieLe.localeCompare(a.livre.publieLe);
      case "notes":
        return b.livre.note - a.livre.note || b.livre.vues - a.livre.vues;
      default:
        return b.livre.vues - a.livre.vues;
    }
  });

  return paginer(liste.map((x) => x.livre), f.page);
}

// --- Auteurs, maisons d'édition, papeteries

const TYPE_DU_PROFIL: Record<Exclude<TypeRecherche, "livres">, Profil["type"]> = {
  auteurs: "ecrivain",
  maisons: "maison-edition",
  papeteries: "papeterie",
};

// Tout ce qu'on peut chercher dans un profil, mis bout à bout
function texteDuProfil(p: Profil): string {
  const base = [p.nom, p.accroche, p.bio, p.ville, p.pays];
  switch (p.type) {
    case "ecrivain":
      return [...base, ...p.genres, ...p.livres.map((l) => l.titre)].join(" ");
    case "maison-edition":
      return [...base, ...p.genres, ...p.catalogue.map((l) => l.titre)].join(" ");
    case "papeterie":
      return [...base, ...p.services, ...p.realisations.flatMap((r) => [r.titre, r.categorie])].join(" ");
    default:
      return base.join(" ");
  }
}

function profilsDuType(type: Exclude<TypeRecherche, "livres">) {
  return profils.filter((p) => p.type === TYPE_DU_PROFIL[type]);
}

function correspond(p: Profil, tokens: string[]) {
  if (tokens.length === 0) return true;
  const texte = normaliser(texteDuProfil(p));
  return tokens.every((t) => texte.includes(t));
}

export async function rechercherProfils(f: FiltresExplorer): Promise<Resultat<Profil>> {
  if (f.type === "livres") return paginer([], 1);
  const tokens = mots(f.q);

  const liste = profilsDuType(f.type)
    .filter((p) => correspond(p, tokens))
    .filter((p) => !f.pays || p.pays === f.pays)
    .filter((p) => !f.verifie || p.verifie)
    .filter((p) => !(f.type === "maisons" && f.soumissions) || (p.type === "maison-edition" && p.soumission.ouverte))
    .sort((a, b) => {
      if (f.tri === "alphabetique") return a.nom.localeCompare(b.nom, "fr");
      if (f.tri === "nouveautes") return b.membreDepuis.localeCompare(a.membreDepuis);
      return b.abonnes - a.abonnes;
    });

  return paginer(liste, f.page);
}

// --- Les nombres affichés sur les onglets (selon les mots cherchés seulement)
export async function compter(q: string): Promise<Record<TypeRecherche, number>> {
  const tokens = mots(q);
  const nombre = (type: Exclude<TypeRecherche, "livres">) =>
    profilsDuType(type).filter((p) => correspond(p, tokens)).length;

  return {
    livres: livresExplorer.filter((l) => scoreLivre(l, tokens) >= 0).length,
    auteurs: nombre("auteurs"),
    maisons: nombre("maisons"),
    papeteries: nombre("papeteries"),
  };
}

// --- Les pays proposés dans le filtre « Pays »
export function paysDisponibles(type: TypeRecherche): string[] {
  const pays =
    type === "livres"
      ? livresExplorer.map((l) => l.auteur.pays)
      : profilsDuType(type).map((p) => p.pays);
  return [...new Set(pays)].sort((a, b) => a.localeCompare(b, "fr"));
}