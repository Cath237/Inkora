export type StatutChapitre = "brouillon" | "programme" | "publie";

export type Chapitre = {
  id: string;
  titre: string;
  html: string;
  mots: number;
  statut: StatutChapitre;
  publieLe?: string; // date ISO (publication ou programmation)
};