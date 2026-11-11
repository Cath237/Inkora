import { genres, langues } from "@/lib/livre-options";
import type { FiltresExplorer, Tri, TypeRecherche } from "./types";

export const TYPES: { cle: TypeRecherche; label: string }[] = [
  { cle: "livres", label: "Livres" },
  { cle: "auteurs", label: "Auteurs" },
  { cle: "maisons", label: "Maisons d’édition" },
  { cle: "papeteries", label: "Papeteries" },
];

export const LIBELLES_TRI: Record<Tri, string> = {
  pertinence: "Pertinence",
  populaires: "Populaires",
  nouveautes: "Nouveautés",
  notes: "Mieux notés",
  alphabetique: "A – Z",
};

// Les tris permis pour chaque type de recherche
export const TRIS_PAR_TYPE: Record<TypeRecherche, Tri[]> = {
  livres: ["pertinence", "populaires", "nouveautes", "notes"],
  auteurs: ["populaires", "nouveautes", "alphabetique"],
  maisons: ["populaires", "nouveautes", "alphabetique"],
  papeteries: ["populaires", "nouveautes", "alphabetique"],
};

export function triParDefaut(type: TypeRecherche, q: string): Tri {
  return type === "livres" && q ? "pertinence" : "populaires";
}

type Brut = Record<string, string | string[] | undefined>;

// Une valeur d'adresse peut être un texte ou une liste : on garde le premier texte
const premier = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

// L'adresse vient de l'extérieur : on ne lui fait JAMAIS confiance.
// Chaque valeur est vérifiée ; ce qui est inconnu est simplement ignoré.
export function parseFiltres(brut: Brut): FiltresExplorer {
  const typeBrut = premier(brut.type);
  const type: TypeRecherche =
    TYPES.find((t) => t.cle === typeBrut)?.cle ?? "livres";

  const q = (premier(brut.q) ?? "").trim().slice(0, 100);

  const genreBrut = premier(brut.genre);
  const langueBrut = premier(brut.langue);
  const prixBrut = premier(brut.prix);
  const statutBrut = premier(brut.statut);
  const paysBrut = (premier(brut.pays) ?? "").trim().slice(0, 60);

  const triBrut = premier(brut.tri) as Tri | undefined;
  let tri: Tri =
    triBrut && TRIS_PAR_TYPE[type].includes(triBrut) ? triBrut : triParDefaut(type, q);
  if (tri === "pertinence" && !q) tri = triParDefaut(type, q);

  const pageBrut = Number.parseInt(premier(brut.page) ?? "1", 10);

  return {
    type,
    q,
    genre: genres.some((g) => g.slug === genreBrut) ? genreBrut : undefined,
    langue: langues.some((l) => l.valeur === langueBrut) ? langueBrut : undefined,
    pays: paysBrut || undefined,
    prix: prixBrut === "gratuit" || prixBrut === "payant" ? prixBrut : undefined,
    statut: statutBrut === "en-cours" || statutBrut === "termine" ? statutBrut : undefined,
    verifie: premier(brut.verifie) === "1",
    soumissions: premier(brut.soumissions) === "1",
    tri,
    page: Number.isFinite(pageBrut) ? Math.min(Math.max(pageBrut, 1), 1000) : 1,
  };
}

// Fabrique une adresse /explorer?... à partir des filtres, avec d'éventuelles modifications.
// On n'écrit dans l'adresse que ce qui n'est pas la valeur par défaut : des liens courts et propres.
export function construireUrl(
  filtres: Partial<FiltresExplorer>,
  modifs: Partial<FiltresExplorer> = {},
): string {
  const m = { ...filtres, ...modifs };
  const type = m.type ?? "livres";
  const q = m.q ?? "";

  const p = new URLSearchParams();
  if (type !== "livres") p.set("type", type);
  if (q) p.set("q", q);
  if (m.genre) p.set("genre", m.genre);
  if (m.langue) p.set("langue", m.langue);
  if (m.pays) p.set("pays", m.pays);
  if (m.prix) p.set("prix", m.prix);
  if (m.statut) p.set("statut", m.statut);
  if (m.verifie) p.set("verifie", "1");
  if (m.soumissions) p.set("soumissions", "1");

  let tri = m.tri;
  if (tri === "pertinence" && !q) tri = undefined;
  if (tri && tri !== triParDefaut(type, q)) p.set("tri", tri);

  if (m.page && m.page > 1) p.set("page", String(m.page));

  const texte = p.toString();
  return texte ? `/explorer?${texte}` : "/explorer";
}

export type FiltreActif = { cle: "genre" | "langue" | "pays" | "prix" | "statut" | "verifie" | "soumissions"; label: string };

// La liste des filtres actuellement appliqués, avec leur texte (pour les pastilles « × »)
export function filtresActifs(f: FiltresExplorer): FiltreActif[] {
  const liste: FiltreActif[] = [];
  if (f.type === "livres") {
    if (f.genre) liste.push({ cle: "genre", label: genres.find((g) => g.slug === f.genre)?.nom ?? f.genre });
    if (f.langue) liste.push({ cle: "langue", label: langues.find((l) => l.valeur === f.langue)?.nom ?? f.langue });
    if (f.prix) liste.push({ cle: "prix", label: f.prix === "gratuit" ? "Gratuits" : "Payants" });
    if (f.statut) liste.push({ cle: "statut", label: f.statut === "termine" ? "Terminés" : "En cours" });
  }
  if (f.pays) liste.push({ cle: "pays", label: f.pays });
  if (f.type !== "livres" && f.verifie) liste.push({ cle: "verifie", label: "Vérifiés" });
  if (f.type === "maisons" && f.soumissions) liste.push({ cle: "soumissions", label: "Soumissions ouvertes" });
  return liste;
}