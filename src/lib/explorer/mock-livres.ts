import type { AuteurResume } from "@/lib/profils/types";
import type { LivreExplorer } from "./types";

const joursAvant = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString();

// La liste des auteurs : une seule fois, réutilisée par les livres et par les profils
export const AUTEURS = {
  "amina-k": { slug: "amina-k", nom: "Amina K.", ville: "Yaoundé", pays: "Cameroun", teinte: "ocre" },
  "d-evane": { slug: "d-evane", nom: "D. Evane", ville: "Douala", pays: "Cameroun", teinte: "nuit" },
  "s-mbetanga": { slug: "s-mbetanga", nom: "S. Mbetanga", ville: "Libreville", pays: "Gabon", teinte: "prune" },
  "n-bilong": { slug: "n-bilong", nom: "N. Bilong", ville: "Yaoundé", pays: "Cameroun", teinte: "foret" },
  "j-m-elanda": { slug: "j-m-elanda", nom: "J. M. Elanda", ville: "Brazzaville", pays: "Congo", teinte: "brun" },
  "ama-mensah": { slug: "ama-mensah", nom: "Ama Mensah", ville: "Accra", pays: "Ghana", teinte: "ocre" },
  "chidi-okafor": { slug: "chidi-okafor", nom: "Chidi Okafor", ville: "Lagos", pays: "Nigeria", teinte: "nuit" },
  "aissatou-diallo": { slug: "aissatou-diallo", nom: "Aïssatou Diallo", ville: "Dakar", pays: "Sénégal", teinte: "prune" },
  "koffi-yao": { slug: "koffi-yao", nom: "Koffi Yao", ville: "Abidjan", pays: "Côte d’Ivoire", teinte: "foret" },
  "wanjiru-kamau": { slug: "wanjiru-kamau", nom: "Wanjiru Kamau", ville: "Nairobi", pays: "Kenya", teinte: "brun" },
} satisfies Record<string, AuteurResume>;

export type SlugAuteur = keyof typeof AUTEURS;

type Brouillon = Omit<LivreExplorer, "auteur" | "publieLe"> & { auteur: SlugAuteur; jours: number };

// « jours » = il y a combien de jours le livre a été publié (pour toujours avoir des nouveautés)
function livre({ auteur, jours, ...reste }: Brouillon): LivreExplorer {
  return { ...reste, auteur: AUTEURS[auteur], publieLe: joursAvant(jours) };
}

export const livresExplorer: LivreExplorer[] = [
  // --- Amina K. (mêmes livres que sur son profil)
  livre({ id: "chaines-du-destin", titre: "Les chaînes du destin", auteur: "amina-k", genre: "romance", langue: "fr", resume: "Dans un royaume où les traditions dictent l’avenir, une jeune femme choisit d’écrire le sien.", motsCles: ["amour interdit", "tradition", "famille"], note: 4.7, vues: 412_000, chapitres: 25, statut: "en-cours", jours: 3, teinte: "ocre" }),
  livre({ id: "entre-lumiere-et-ombre", titre: "Entre lumière et ombre", auteur: "amina-k", genre: "drame", langue: "fr", resume: "Deux sœurs que tout oppose se retrouvent autour d’un héritage.", motsCles: ["sœurs", "héritage", "famille"], note: 4.4, vues: 236_000, chapitres: 18, statut: "termine", jours: 120, teinte: "prune" }),
  livre({ id: "souffle-des-anciens", titre: "Le souffle des anciens", auteur: "amina-k", genre: "drame", langue: "fr", resume: "Un village, une promesse faite aux ancêtres et un secret de famille.", motsCles: ["ancêtres", "village", "secret"], note: 4.6, vues: 301_000, chapitres: 32, statut: "termine", prix: { montant: 1500, devise: "XAF" }, jours: 200, teinte: "foret" }),
  livre({ id: "nuits-de-yaounde", titre: "Nuits de Yaoundé", auteur: "amina-k", genre: "romance", langue: "fr", resume: "Une histoire d’amour au rythme des nuits de la capitale.", motsCles: ["amour", "ville", "musique"], note: 4.3, vues: 128_000, chapitres: 14, statut: "termine", jours: 300, teinte: "nuit" }),
  livre({ id: "couleur-des-promesses", titre: "La couleur des promesses", auteur: "amina-k", genre: "drame", langue: "fr", resume: "Chaque promesse a sa couleur, et certaines finissent par déteindre.", motsCles: ["promesses", "mariage", "famille"], note: 4.5, vues: 94_000, chapitres: 9, statut: "en-cours", prix: { montant: 2000, devise: "XAF" }, jours: 10, teinte: "brun" }),
  livre({ id: "lettres-a-nadia", titre: "Lettres à Nadia", auteur: "amina-k", genre: "romance", langue: "fr", resume: "Des lettres jamais envoyées qui racontent toute une vie.", motsCles: ["lettres", "amour", "regrets"], note: 4.2, vues: 79_000, chapitres: 21, statut: "termine", jours: 400, teinte: "ocre" }),
  // --- D. Evane
  livre({ id: "ombre-du-pouvoir", titre: "L’ombre du pouvoir", auteur: "d-evane", genre: "histoire", langue: "fr", resume: "Comment le pouvoir transforme ceux qui le convoitent.", motsCles: ["pouvoir", "politique", "afrique"], note: 4.8, vues: 298_000, chapitres: 25, statut: "termine", jours: 150, teinte: "nuit" }),
  livre({ id: "voix-du-sang", titre: "La voix du sang", auteur: "d-evane", genre: "thriller", langue: "fr", resume: "Un meurtre, un village et une vérité que personne ne veut entendre.", motsCles: ["enquête", "suspense", "famille"], note: 4.5, vues: 154_000, chapitres: 22, statut: "termine", jours: 90, teinte: "prune" }),
  livre({ id: "racines", titre: "Racines", auteur: "d-evane", genre: "drame", langue: "fr", resume: "Trois générations, une terre, une seule question : rester ou partir ?", motsCles: ["terre", "famille", "exil"], note: 4.4, vues: 121_000, chapitres: 30, statut: "termine", jours: 260, teinte: "ocre" }),
  // --- S. Mbetanga
  livre({ id: "eclats-de-lame", titre: "Éclats de l’âme", auteur: "s-mbetanga", genre: "poesie", langue: "fr", resume: "Des poèmes courts pour dire l’amour, la perte et l’espoir.", motsCles: ["poèmes", "émotions", "amour"], note: 4.8, vues: 186_000, chapitres: 20, statut: "termine", jours: 60, teinte: "prune" }),
  livre({ id: "promesse-oubliee", titre: "La promesse oubliée", auteur: "s-mbetanga", genre: "drame", langue: "fr", resume: "Dix-huit nouvelles sur ce que l’on promet et ce que l’on oublie.", motsCles: ["nouvelles", "promesses", "mémoire"], note: 4.6, vues: 64_000, chapitres: 18, statut: "termine", prix: { montant: 1000, devise: "XAF" }, jours: 45, teinte: "foret" }),
  // --- N. Bilong et J. M. Elanda
  livre({ id: "secret-des-ancetres", titre: "Le secret des ancêtres", auteur: "n-bilong", genre: "fantasy", langue: "fr", resume: "Un jeune chasseur découvre que la forêt garde la mémoire de son peuple.", motsCles: ["magie", "ancêtres", "légendes"], note: 4.7, vues: 231_000, chapitres: 18, statut: "en-cours", jours: 8, teinte: "foret" }),
  livre({ id: "prix-du-silence", titre: "Le prix du silence", auteur: "j-m-elanda", genre: "drame", langue: "fr", resume: "Un journaliste choisit entre la vérité et la sécurité des siens.", motsCles: ["journalisme", "courage", "famille"], note: 4.6, vues: 143_000, chapitres: 28, statut: "termine", jours: 30, teinte: "brun" }),
  livre({ id: "heritier-des-rois", titre: "L’héritier des rois", auteur: "j-m-elanda", genre: "histoire", langue: "fr", resume: "L’histoire oubliée d’un royaume du fleuve Congo.", motsCles: ["royaume", "histoire", "congo"], note: 4.3, vues: 58_000, chapitres: 24, statut: "termine", jours: 500, teinte: "nuit" }),
  // --- Ama Mensah (Ghana)
  livre({ id: "golden-stool", titre: "The Golden Stool’s Whisper", auteur: "ama-mensah", genre: "fantasy", langue: "en", resume: "A young princess discovers that the royal stool chooses its own queen.", motsCles: ["magic", "ashanti", "royalty"], note: 4.6, vues: 88_000, chapitres: 16, statut: "en-cours", prix: { montant: 20, devise: "GHS" }, jours: 5, teinte: "ocre" }),
  livre({ id: "accra-nights", titre: "Accra Nights", auteur: "ama-mensah", genre: "romance", langue: "en", resume: "Two strangers share one taxi and a very long night in Accra.", motsCles: ["love", "city", "night"], note: 4.1, vues: 52_000, chapitres: 12, statut: "termine", jours: 80, teinte: "nuit" }),
  livre({ id: "kente-dreams", titre: "Kente Dreams", auteur: "ama-mensah", genre: "jeunesse", langue: "en", resume: "A weaver’s daughter learns that every thread tells a story.", motsCles: ["children", "weaving", "family"], note: 4.5, vues: 41_000, chapitres: 10, statut: "termine", jours: 140, teinte: "foret" }),
  // --- Chidi Okafor (Nigeria)
  livre({ id: "lagos-2099", titre: "Lagos 2099", auteur: "chidi-okafor", genre: "science-fiction", langue: "en", resume: "In a floating Lagos, one coder finds the code that could free the city.", motsCles: ["afrofuturism", "dystopia", "technology"], note: 4.8, vues: 310_000, chapitres: 30, statut: "en-cours", prix: { montant: 1500, devise: "NGN" }, jours: 2, teinte: "nuit" }),
  livre({ id: "the-last-signal", titre: "The Last Signal", auteur: "chidi-okafor", genre: "thriller", langue: "en", resume: "A radio operator intercepts a message that was never meant to be heard.", motsCles: ["conspiracy", "hacker", "suspense"], note: 4.4, vues: 96_000, chapitres: 20, statut: "termine", jours: 110, teinte: "prune" }),
  livre({ id: "market-of-shadows", titre: "Market of Shadows", auteur: "chidi-okafor", genre: "thriller", langue: "en", resume: "In Balogun Market, nothing is sold without a secret attached.", motsCles: ["crime", "market", "lagos"], note: 4.2, vues: 70_000, chapitres: 15, statut: "termine", prix: { montant: 800, devise: "NGN" }, jours: 220, teinte: "brun" }),
  // --- Aïssatou Diallo (Sénégal)
  livre({ id: "rives-du-fleuve", titre: "Les rives du fleuve", auteur: "aissatou-diallo", genre: "drame", langue: "fr", resume: "Sur les rives du fleuve Sénégal, trois femmes tissent leur destin.", motsCles: ["femmes", "fleuve", "tradition"], note: 4.6, vues: 112_000, chapitres: 22, statut: "termine", prix: { montant: 1000, devise: "XOF" }, jours: 70, teinte: "prune" }),
  livre({ id: "mots-de-sable", titre: "Mots de sable", auteur: "aissatou-diallo", genre: "poesie", langue: "fr", resume: "Des poèmes et des slams écrits entre le désert et l’océan.", motsCles: ["poèmes", "slam", "désert"], note: 4.7, vues: 47_000, chapitres: 30, statut: "termine", jours: 15, teinte: "ocre" }),
  livre({ id: "teranga", titre: "Teranga", auteur: "aissatou-diallo", genre: "romance", langue: "fr", resume: "À Dakar, l’hospitalité d’une famille bouscule un amour naissant.", motsCles: ["amour", "dakar", "hospitalité"], note: 4.3, vues: 60_000, chapitres: 17, statut: "en-cours", jours: 12, teinte: "foret" }),
  // --- Koffi Yao (Côte d'Ivoire)
  livre({ id: "entreprendre-afrique", titre: "Entreprendre en Afrique", auteur: "koffi-yao", genre: "business", langue: "fr", resume: "Les étapes concrètes pour lancer son activité avec peu de moyens.", motsCles: ["entrepreneuriat", "finance", "startup"], note: 4.5, vues: 134_000, chapitres: 14, statut: "termine", prix: { montant: 2000, devise: "XOF" }, jours: 40, teinte: "foret" }),
  livre({ id: "petit-lion", titre: "Le petit lion de Cocody", auteur: "koffi-yao", genre: "jeunesse", langue: "fr", resume: "Un lionceau d’Abidjan apprend le courage grâce à ses amis.", motsCles: ["enfants", "aventure", "amitié"], note: 4.7, vues: 83_000, chapitres: 12, statut: "termine", jours: 95, teinte: "ocre" }),
  livre({ id: "coup-monte", titre: "Coup monté à Abidjan", auteur: "koffi-yao", genre: "thriller", langue: "fr", resume: "Un braquage qui tourne mal, avec beaucoup d’humour et un peu de chance.", motsCles: ["braquage", "humour", "abidjan"], note: 4.0, vues: 39_000, chapitres: 19, statut: "en-cours", jours: 20, teinte: "nuit" }),
  livre({ id: "budget-malin", titre: "Le budget malin", auteur: "koffi-yao", genre: "business", langue: "fr", resume: "Épargner, planifier et protéger l’argent de la famille.", motsCles: ["épargne", "famille", "argent"], note: 4.2, vues: 57_000, chapitres: 10, statut: "termine", prix: { montant: 1500, devise: "XOF" }, jours: 330, teinte: "brun" }),
  // --- Wanjiru Kamau (Kenya)
  livre({ id: "nyota-ya-asubuhi", titre: "Nyota ya Asubuhi", auteur: "wanjiru-kamau", genre: "fantasy", langue: "sw", resume: "Hadithi ya msichana anayefuata nyota ya asubuhi hadi nchi ya mizimu.", motsCles: ["hadithi", "nyota", "uchawi"], note: 4.5, vues: 36_000, chapitres: 14, statut: "termine", jours: 60, teinte: "prune" }),
  livre({ id: "letters-highlands", titre: "Letters from the Highlands", auteur: "wanjiru-kamau", genre: "histoire", langue: "en", resume: "A family’s letters across the years leading to Kenya’s independence.", motsCles: ["colonial", "independence", "letters"], note: 4.6, vues: 71_000, chapitres: 24, statut: "termine", prix: { montant: 2, devise: "USD" }, jours: 180, teinte: "brun" }),
  livre({ id: "savannah-queen", titre: "Savannah Queen", auteur: "wanjiru-kamau", genre: "fantasy", langue: "en", resume: "A warrior queen must unite the clans before the dry season ends.", motsCles: ["queen", "clans", "savannah"], note: 4.3, vues: 45_000, chapitres: 11, statut: "en-cours", jours: 7, teinte: "foret" }),
];