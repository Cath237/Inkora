export type Teinte = "brun" | "nuit" | "foret" | "ocre" | "prune";

export type Livre = {
  id: string;
  titre: string;
  auteur: string;
  note: number;
  vues: number;
  teinte: Teinte;
};