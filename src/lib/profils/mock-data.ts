import { livres } from "@/lib/mock-data";
import type {
  AuteurResume,
  LivreCatalogue,
  LivreProfil,
  Profil,
  ProfilEcrivain,
} from "./types";

// Le compte « connecté » pour l'instant. Avec le backend : l'utilisateur de la session.
export const PROFIL_COURANT = "amina-k";

// --- Les auteurs (réutilisés dans les catalogues des maisons et des papeteries)
const amina: AuteurResume = { slug: "amina-k", nom: "Amina K.", ville: "Yaoundé", pays: "Cameroun", teinte: "ocre" };
const evane: AuteurResume = { slug: "d-evane", nom: "D. Evane", ville: "Douala", pays: "Cameroun", teinte: "nuit" };
const mbetanga: AuteurResume = { slug: "s-mbetanga", nom: "S. Mbetanga", ville: "Libreville", pays: "Gabon", teinte: "prune" };
const bilong: AuteurResume = { slug: "n-bilong", nom: "N. Bilong", ville: "Yaoundé", pays: "Cameroun", teinte: "foret" };
const elanda: AuteurResume = { slug: "j-m-elanda", nom: "J. M. Elanda", ville: "Brazzaville", pays: "Congo", teinte: "brun" };

const favorisDe = (...ids: string[]) => livres.filter((l) => ids.includes(l.id));

// --- Un écrivain « léger » : on ne détaille que l'essentiel
function ecrivainSimple(
  a: AuteurResume,
  d: {
    accroche: string;
    bio: string;
    genres: string[];
    abonnes: number;
    abonnements: number;
    membreDepuis: string;
    livres: LivreProfil[];
  },
): ProfilEcrivain {
  const lectures = d.livres.reduce((somme, l) => somme + l.lectures, 0);
  return {
    slug: a.slug,
    type: "ecrivain",
    nom: a.nom,
    verifie: false,
    accroche: d.accroche,
    bio: d.bio,
    apropos: [d.bio],
    ville: a.ville,
    pays: a.pays,
    membreDepuis: d.membreDepuis,
    abonnes: d.abonnes,
    abonnements: d.abonnements,
    teinte: a.teinte,
    genres: d.genres,
    langues: ["Français"],
    liens: [],
    stats: { lectures, votes: Math.round(lectures / 9), commentaires: Math.round(lectures / 40) },
    badges: [],
    livres: d.livres,
    lecture: { enCours: [], listes: [], favoris: [] },
    activite: [],
  };
}

const profilAmina: ProfilEcrivain = {
  slug: "amina-k",
  type: "ecrivain",
  nom: "Amina K.",
  verifie: true,
  accroche: "Écrivaine · Romance & drame",
  bio: "Écrire, c’est transmettre ce que les mots taisent.",
  apropos: [
    "J’écris depuis l’adolescence, d’abord dans des cahiers d’écolier, puis sur Inkora. Mes histoires parlent de liens familiaux, de traditions qui pèsent et de femmes qui choisissent leur propre chemin.",
    "Je publie un nouveau chapitre chaque semaine. Vos commentaires me guident : n’hésitez pas à me dire ce que vous en pensez !",
  ],
  ville: "Yaoundé",
  pays: "Cameroun",
  siteWeb: "https://amina-k.example.com",
  membreDepuis: "2023-03-12",
  abonnes: 45200,
  abonnements: 120,
  teinte: "ocre",
  genres: ["Romance", "Drame", "Fiction contemporaine"],
  langues: ["Français", "English"],
  liens: [
    { label: "Instagram", url: "https://www.instagram.com/" },
    { label: "Facebook", url: "https://www.facebook.com/" },
  ],
  stats: { lectures: 1_250_000, votes: 138_400, commentaires: 24_900 },
  badges: [
    { cle: "trophee", nom: "Auteure à succès", description: "Plus d’un million de lectures" },
    { cle: "flamme", nom: "Série de 30 jours", description: "A publié chaque semaine pendant 30 jours" },
    { cle: "etoile", nom: "Coup de cœur des lecteurs", description: "Note moyenne supérieure à 4,5" },
    { cle: "plume", nom: "Première publication", description: "Membre depuis les débuts d’Inkora" },
  ],
  livres: [
    { id: "chaines-du-destin", titre: "Les chaînes du destin", genre: "Romance", chapitres: 25, statut: "en-cours", note: 4.7, lectures: 412_000, teinte: "ocre" },
    { id: "entre-lumiere-et-ombre", titre: "Entre lumière et ombre", genre: "Drame", chapitres: 18, statut: "termine", note: 4.4, lectures: 236_000, teinte: "prune" },
    { id: "souffle-des-anciens", titre: "Le souffle des anciens", genre: "Fiction contemporaine", chapitres: 32, statut: "termine", note: 4.6, lectures: 301_000, teinte: "foret", prix: { montant: 1500, devise: "XAF" } },
    { id: "nuits-de-yaounde", titre: "Nuits de Yaoundé", genre: "Romance", chapitres: 14, statut: "termine", note: 4.3, lectures: 128_000, teinte: "nuit" },
    { id: "couleur-des-promesses", titre: "La couleur des promesses", genre: "Drame", chapitres: 9, statut: "en-cours", note: 4.5, lectures: 94_000, teinte: "brun", prix: { montant: 2000, devise: "XAF" } },
    { id: "lettres-a-nadia", titre: "Lettres à Nadia", genre: "Romance", chapitres: 21, statut: "termine", note: 4.2, lectures: 79_000, teinte: "ocre" },
  ],
  lecture: {
    enCours: [
      { livre: { id: "ombre-du-pouvoir", titre: "L’ombre du pouvoir", auteur: "D. Evane", teinte: "nuit" }, chapitre: 12, chapitres: 25 },
      { livre: { id: "eclats-de-lame", titre: "Éclats de l’âme", auteur: "S. Mbetanga", teinte: "prune" }, chapitre: 8, chapitres: 20 },
    ],
    listes: [
      { id: "coups-de-coeur", nom: "Coups de cœur 2026", description: "Mes lectures préférées de l’année", nbLivres: 14 },
      { id: "a-lire-cet-hiver", nom: "À lire cet hiver", description: "Pour les longues soirées", nbLivres: 8 },
      { id: "classiques-africains", nom: "Classiques africains", description: "Les grands textes à connaître", nbLivres: 21 },
    ],
    favoris: favorisDe("secret-des-ancetres", "prix-du-silence", "voix-du-sang", "promesse-oubliee"),
  },
  activite: [
    { id: "a1", type: "chapitre", texte: "a publié le chapitre 25 de « Les chaînes du destin »", date: "2026-11-07" },
    { id: "a2", type: "badge", texte: "a obtenu le badge « Auteure à succès »", date: "2026-11-02" },
    { id: "a3", type: "avis", texte: "a noté « L’ombre du pouvoir » 5 étoiles", date: "2026-10-28" },
    { id: "a4", type: "liste", texte: "a créé la liste de lecture « À lire cet hiver »", date: "2026-10-19" },
    { id: "a5", type: "abonnement", texte: "s’est abonnée à D. Evane", date: "2026-10-04" },
  ],
};

const profilLecteur: Profil = {
  slug: "fatou-n",
  type: "lecteur",
  nom: "Fatou N.",
  verifie: false,
  accroche: "Lectrice passionnée",
  bio: "Dévoreuse de romans africains, une histoire à la fois.",
  apropos: [
    "Je lis le soir, dans le bus et parfois même en cuisine. Mon coup de cœur : les récits qui mêlent tradition et modernité.",
    "Sur Inkora, je découvre de nouvelles plumes et j’aime laisser un petit mot aux auteurs.",
  ],
  ville: "Dakar",
  pays: "Sénégal",
  membreDepuis: "2025-01-20",
  abonnes: 312,
  abonnements: 58,
  teinte: "foret",
  genresPreferes: ["Romance", "Drame", "Histoire", "Poésie"],
  stats: { livresLus: 86, avis: 34 },
  lecture: {
    enCours: [
      { livre: { id: "chaines-du-destin", titre: "Les chaînes du destin", auteur: "Amina K.", teinte: "ocre" }, chapitre: 19, chapitres: 25 },
      { livre: { id: "secret-des-ancetres", titre: "Le secret des ancêtres", auteur: "N. Bilong", teinte: "foret" }, chapitre: 5, chapitres: 18 },
    ],
    listes: [
      { id: "mes-prefs", nom: "Mes préférés", description: "Ceux que je relis toujours", nbLivres: 12 },
      { id: "pour-pleurer", nom: "Pour pleurer un bon coup", description: "Prévoir des mouchoirs", nbLivres: 6 },
    ],
    favoris: favorisDe("chaines-du-destin", "eclats-de-lame", "heritier-des-rois", "voix-du-sang"),
  },
  avis: [
    { id: "v1", livre: { id: "chaines-du-destin", titre: "Les chaînes du destin", auteur: "Amina K.", teinte: "ocre" }, note: 5, texte: "Une histoire qui prend aux tripes. J’ai lu les vingt premiers chapitres en deux nuits !", date: "2026-11-05" },
    { id: "v2", livre: { id: "eclats-de-lame", titre: "Éclats de l’âme", auteur: "S. Mbetanga", teinte: "prune" }, note: 4, texte: "Une belle plume, très poétique. J’aurais aimé une fin un peu moins rapide.", date: "2026-10-12" },
    { id: "v3", livre: { id: "prix-du-silence", titre: "Le prix du silence", auteur: "J. M. Elanda", teinte: "brun" }, note: 5, texte: "Poignant et juste. Je le recommande à toutes les personnes de ma famille.", date: "2026-08-30" },
  ],
  auteursSuivis: [amina, evane, mbetanga, bilong],
};

// --- Maison d'édition
const catalogue: LivreCatalogue[] = [
  { id: "prix-du-silence", titre: "Le prix du silence", genre: "Roman", annee: 2026, note: 4.6, teinte: "brun", prix: { montant: 7500, devise: "XAF" }, auteur: elanda },
  { id: "voix-du-sang", titre: "La voix du sang", genre: "Drame", annee: 2026, note: 4.5, teinte: "prune", prix: { montant: 6500, devise: "XAF" }, auteur: evane },
  { id: "heritier-des-rois", titre: "L’héritier des rois", genre: "Roman historique", annee: 2025, note: 4.3, teinte: "nuit", prix: { montant: 8000, devise: "XAF" }, auteur: elanda },
  { id: "secret-des-ancetres", titre: "Le secret des ancêtres", genre: "Fantasy", annee: 2025, note: 4.7, teinte: "foret", prix: { montant: 7000, devise: "XAF" }, auteur: bilong },
  { id: "eclats-de-lame", titre: "Éclats de l’âme", genre: "Poésie", annee: 2025, note: 4.8, teinte: "prune", prix: { montant: 4500, devise: "XAF" }, auteur: mbetanga },
  { id: "promesse-oubliee", titre: "La promesse oubliée", genre: "Nouvelle", annee: 2024, note: 4.6, teinte: "foret", prix: { montant: 5000, devise: "XAF" }, auteur: mbetanga },
  { id: "ombre-du-pouvoir", titre: "L’ombre du pouvoir", genre: "Essai", annee: 2024, note: 4.8, teinte: "nuit", prix: { montant: 9000, devise: "XAF" }, auteur: evane },
  { id: "racines", titre: "Racines", genre: "Roman", annee: 2023, note: 4.4, teinte: "ocre", prix: { montant: 6000, devise: "XAF" }, auteur: evane },
];

const profilMaison: Profil = {
  slug: "editions-nyemba",
  type: "maison-edition",
  nom: "Éditions Nyemba",
  verifie: true,
  accroche: "Maison d’édition indépendante",
  bio: "Nous révélons les voix africaines et les histoires qui inspirent.",
  apropos: [
    "Fondées à Yaoundé, les Éditions Nyemba accompagnent des auteurs africains de la première lecture jusqu’à la librairie : relecture, mise en page, couverture, impression et diffusion.",
    "Nous croyons que chaque continent mérite de lire ses propres histoires, écrites par ceux qui les vivent.",
  ],
  ville: "Yaoundé",
  pays: "Cameroun",
  siteWeb: "https://editions-nyemba.example.com",
  membreDepuis: "2024-02-01",
  abonnes: 8400,
  abonnements: 64,
  teinte: "brun",
  fondeeEn: 2014,
  genres: ["Roman", "Nouvelle", "Poésie", "Essai", "Roman historique", "Fantasy"],
  stats: { livresPublies: 128, auteurs: 36, recompenses: 8 },
  catalogue,
  soumission: {
    ouverte: true,
    delaiReponse: "7 jours ouvrables",
    conditions: [
      "Manuscrit complet, original et inédit (non publié ailleurs)",
      "Entre 25 000 et 120 000 mots",
      "Un résumé d’une page et une courte présentation de l’auteur",
      "Les manuscrits de littérature jeunesse et de poésie sont acceptés",
    ],
  },
  contact: {
    email: "contact@editions-nyemba.example.com",
    telephone: "+237 6 00 00 00 01",
    adresse: "Quartier Bastos, Yaoundé, Cameroun",
  },
};

// --- Papeterie
const profilPapeterie: Profil = {
  slug: "papeterie-inkora",
  type: "papeterie",
  nom: "Papeterie Inkora",
  verifie: true,
  accroche: "Impression à la demande & fournitures",
  bio: "Transformez votre manuscrit en un beau livre papier.",
  apropos: [
    "Nous imprimons et relions vos livres, du simple tirage familial au roman destiné aux librairies. Notre équipe vous conseille sur le format, le papier et la couverture.",
    "Nous vendons aussi des fournitures scolaires et de bureau pour toute la famille.",
  ],
  ville: "Yaoundé",
  pays: "Cameroun",
  siteWeb: "https://papeterie-inkora.example.com",
  membreDepuis: "2024-05-15",
  abonnes: 2150,
  abonnements: 41,
  teinte: "ocre",
  services: [
    "Impression à la demande",
    "Reliure (dos carré collé, spirale, cousue)",
    "Couverture souple ou rigide, pelliculée ou dorée",
    "Mise en page et design de couverture",
    "Photocopie et numérisation",
    "Fournitures scolaires et de bureau",
  ],
  horaires: [
    { jours: "Lundi – Vendredi", heures: "8h00 – 18h00" },
    { jours: "Samedi", heures: "9h00 – 15h00" },
    { jours: "Dimanche", heures: "Fermé" },
  ],
  stats: { realisations: 240, note: 4.8, avis: 112, annees: 9 },
  delaiMoyen: "5 à 10 jours ouvrables",
  livraison: "Retrait en boutique ou livraison dans tout le Cameroun",
  paiements: ["Mobile Money (MTN, Orange)", "Espèces", "Carte bancaire"],
  realisations: [
    { id: "r1", titre: "Les chaînes du destin", categorie: "Roman", description: "Édition brochée d’un roman de 320 pages, couverture souple pelliculée mate.", format: "A5 (14,8 × 21 cm)", pages: 320, papier: "Offset 80 g", reliure: "Couverture souple, dos carré collé", quantite: 10, prix: { montant: 42_500, devise: "XAF", unite: "le lot de 10" }, delai: "5 jours", teinte: "ocre", pourAuteur: amina },
    { id: "r2", titre: "Le prix du silence", categorie: "Roman", description: "Édition reliée avec couverture rigide et jaquette pour les librairies.", format: "A5 (14,8 × 21 cm)", pages: 280, papier: "Bouffant crème 90 g", reliure: "Couverture rigide, jaquette", quantite: 50, prix: { montant: 275_000, devise: "XAF", unite: "le lot de 50" }, delai: "10 jours", teinte: "brun", pourAuteur: elanda },
    { id: "r3", titre: "Éclats de l’âme", categorie: "Recueil de poésie", description: "Recueil de poèmes au format élégant, papier ivoire épais.", format: "14 × 20 cm", pages: 96, papier: "Ivoire 100 g", reliure: "Couverture souple pelliculée", quantite: 100, prix: { montant: 150_000, devise: "XAF", unite: "le lot de 100" }, delai: "7 jours", teinte: "prune", pourAuteur: mbetanga },
    { id: "r4", titre: "Cahiers personnalisés", categorie: "Cahier personnalisé", description: "Cahiers d’écolier avec couverture imprimée au nom de l’établissement.", format: "A4 (21 × 29,7 cm)", pages: 96, papier: "Grands carreaux 70 g", reliure: "Spirale, couverture imprimée", quantite: 500, prix: { montant: 450, devise: "XAF", unite: "l’exemplaire (à partir de 500)" }, delai: "12 jours", teinte: "foret" },
    { id: "r5", titre: "Carnet de notes doré", categorie: "Carnet", description: "Carnet d’écrivain avec dorure à chaud sur la couverture.", format: "A6 (10,5 × 14,8 cm)", pages: 120, papier: "Ivoire 90 g", reliure: "Couverture rigide, dorure à chaud", quantite: 30, prix: { montant: 54_000, devise: "XAF", unite: "le lot de 30" }, delai: "8 jours", teinte: "nuit" },
    { id: "r6", titre: "Mémoires d’un instituteur", categorie: "Autobiographie", description: "Tirage familial d’un récit de vie, offert aux petits-enfants.", format: "A5 (14,8 × 21 cm)", pages: 180, papier: "Offset 80 g", reliure: "Couverture souple", quantite: 20, prix: { montant: 38_000, devise: "XAF", unite: "le lot de 20" }, delai: "4 jours", teinte: "brun" },
  ],
  contact: {
    email: "devis@papeterie-inkora.example.com",
    telephone: "+237 6 00 00 00 02",
    whatsapp: "+237 6 00 00 00 02",
    adresse: "Avenue Kennedy, Bastos, Yaoundé, Cameroun",
  },
};

// --- La « base de données » provisoire
export const profils: Profil[] = [
  profilAmina,
  profilLecteur,
  profilMaison,
  profilPapeterie,
  ecrivainSimple(evane, {
    accroche: "Écrivain · Drame & essai",
    bio: "Je raconte les familles, le pouvoir et ce qu’on n’ose pas dire à voix haute.",
    genres: ["Drame", "Essai"],
    abonnes: 18700,
    abonnements: 35,
    membreDepuis: "2023-06-02",
    livres: [
      { id: "ombre-du-pouvoir", titre: "L’ombre du pouvoir", genre: "Essai", chapitres: 25, statut: "termine", note: 4.8, lectures: 298_000, teinte: "nuit" },
      { id: "voix-du-sang", titre: "La voix du sang", genre: "Drame", chapitres: 22, statut: "termine", note: 4.5, lectures: 154_000, teinte: "prune" },
      { id: "racines", titre: "Racines", genre: "Roman", chapitres: 30, statut: "termine", note: 4.4, lectures: 121_000, teinte: "ocre" },
    ],
  }),
  ecrivainSimple(mbetanga, {
    accroche: "Poétesse & nouvelliste",
    bio: "Des mots simples pour des émotions immenses.",
    genres: ["Poésie", "Nouvelle"],
    abonnes: 9600,
    abonnements: 77,
    membreDepuis: "2024-01-14",
    livres: [
      { id: "eclats-de-lame", titre: "Éclats de l’âme", genre: "Poésie", chapitres: 20, statut: "termine", note: 4.8, lectures: 186_000, teinte: "prune" },
      { id: "promesse-oubliee", titre: "La promesse oubliée", genre: "Nouvelle", chapitres: 18, statut: "termine", note: 4.6, lectures: 64_000, teinte: "foret", prix: { montant: 1000, devise: "XAF" } },
    ],
  }),
  ecrivainSimple(bilong, {
    accroche: "Écrivain · Fantasy africaine",
    bio: "Les contes de mon village, avec de la magie en plus.",
    genres: ["Fantasy", "Contes & légendes"],
    abonnes: 12300,
    abonnements: 52,
    membreDepuis: "2023-09-23",
    livres: [
      { id: "secret-des-ancetres", titre: "Le secret des ancêtres", genre: "Fantasy", chapitres: 18, statut: "en-cours", note: 4.7, lectures: 231_000, teinte: "foret" },
    ],
  }),
  ecrivainSimple(elanda, {
    accroche: "Romancier · Histoire & société",
    bio: "L’histoire de nos pères éclaire ce que nous devenons.",
    genres: ["Roman historique", "Drame"],
    abonnes: 7100,
    abonnements: 29,
    membreDepuis: "2024-04-08",
    livres: [
      { id: "prix-du-silence", titre: "Le prix du silence", genre: "Roman", chapitres: 28, statut: "termine", note: 4.6, lectures: 143_000, teinte: "brun" },
      { id: "heritier-des-rois", titre: "L’héritier des rois", genre: "Roman historique", chapitres: 24, statut: "termine", note: 4.3, lectures: 58_000, teinte: "nuit" },
    ],
  }),
];

export const trouverProfil = (slug: string) => profils.find((p) => p.slug === slug);