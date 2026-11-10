import type { Livre } from "./types";

export const livres: Livre[] = [
  { id: "chaines-du-destin", titre: "Les chaînes du destin", auteur: "Amina K.", note: 4.7, vues: 12400, teinte: "ocre" },
  { id: "ombre-du-pouvoir", titre: "L’ombre du pouvoir", auteur: "D. Evane", note: 4.8, vues: 12500, teinte: "nuit" },
  { id: "eclats-de-lame", titre: "Éclats de l’âme", auteur: "S. Mbetanga", note: 4.8, vues: 8200, teinte: "prune" },
  { id: "secret-des-ancetres", titre: "Le secret des ancêtres", auteur: "N. Bilong", note: 4.7, vues: 10100, teinte: "foret" },
  { id: "prix-du-silence", titre: "Le prix du silence", auteur: "J. M. Elanda", note: 4.6, vues: 6400, teinte: "brun" },
  { id: "voix-du-sang", titre: "La voix du sang", auteur: "D. Evane", note: 4.5, vues: 5300, teinte: "prune" },
  { id: "entre-lumiere-et-ombre", titre: "Entre lumière et ombre", auteur: "A. K.", note: 4.4, vues: 3900, teinte: "ocre" },
  { id: "promesse-oubliee", titre: "La promesse oubliée", auteur: "S. Mbetanga", note: 4.6, vues: 2800, teinte: "foret" },
  { id: "heritier-des-rois", titre: "L’héritier des rois", auteur: "J. M. Elanda", note: 4.3, vues: 1900, teinte: "nuit" },
];

export const livreALaUne = livres[0];
export const livresPopulaires = livres.slice(1, 4);
export const livresNouveaux = livres.slice(4);