import type { AuteurResume, Prix } from "@/lib/profils/types";
import type { Teinte } from "@/lib/types";

export type TypeRecherche = "livres" | "auteurs" | "maisons" | "papeteries";

export type Tri = "pertinence" | "populaires" | "nouveautes" | "notes" | "alphabetique";

// Tout ce qu'on peut demander à la page Explorer (lu depuis l'adresse)
export type FiltresExplorer = {
  type: TypeRecherche;
  q: string;
  genre?: string; // livres : le « slug » du genre
  langue?: string; // livres : le code de la langue (fr, en…)
  pays?: string; // pays de l'auteur ou du professionnel
  prix?: "gratuit" | "payant"; // livres
  statut?: "en-cours" | "termine"; // livres
  verifie: boolean; // profils : seulement les comptes vérifiés
  soumissions: boolean; // maisons : seulement celles qui acceptent des manuscrits
  tri: Tri;
  page: number;
};

export type LivreExplorer = {
  id: string;
  titre: string;
  auteur: AuteurResume;
  genre: string; // « slug » (voir lib/livre-options)
  langue: string;
  resume: string;
  motsCles: string[];
  note: number;
  vues: number;
  chapitres: number;
  statut: "en-cours" | "termine";
  prix?: Prix; // absent = gratuit
  publieLe: string; // date ISO
  teinte: Teinte;
};

export type Resultat<T> = { items: T[]; total: number; page: number; pages: number };