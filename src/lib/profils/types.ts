import type { RoleSlug } from "@/lib/roles";
import type { Livre, Teinte } from "@/lib/types";

export type Devise = "XAF" | "XOF" | "NGN" | "GHS" | "EUR" | "USD";

// « unite » précise ce que le prix désigne : « le lot de 10 », « l’exemplaire »…
export type Prix = { montant: number; devise: Devise; unite?: string };

// Le minimum à afficher à côté d'un livre pour présenter son auteur
export type AuteurResume = {
  slug: string;
  nom: string; // nom affiché (le nom de plume pour un écrivain)
  ville: string;
  pays: string;
  teinte: Teinte;
};

export type LienSocial = { label: string; url: string };

export type CleBadge = "flamme" | "trophee" | "livre" | "etoile" | "plume";
export type BadgeProfil = { cle: CleBadge; nom: string; description: string };

export type LivreProfil = {
  id: string;
  titre: string;
  genre: string;
  chapitres: number;
  statut: "en-cours" | "termine";
  note: number;
  lectures: number;
  teinte: Teinte;
  prix?: Prix; // absent = gratuit
};

export type LivreCatalogue = {
  id: string;
  titre: string;
  genre: string;
  annee: number;
  note: number;
  teinte: Teinte;
  prix?: Prix;
  auteur: AuteurResume;
};

export type LectureEnCours = {
  livre: { id: string; titre: string; auteur: string; teinte: Teinte };
  chapitre: number;
  chapitres: number;
};

export type ListeLecture = { id: string; nom: string; description: string; nbLivres: number };

export type Bibliotheque = {
  enCours: LectureEnCours[];
  listes: ListeLecture[];
  favoris: Livre[];
};

export type Activite = {
  id: string;
  type: "chapitre" | "avis" | "liste" | "badge" | "abonnement";
  texte: string;
  date: string; // date ISO
};

export type Avis = {
  id: string;
  livre: { id: string; titre: string; auteur: string; teinte: Teinte };
  note: number;
  texte: string;
  date: string;
};

export type ContactPro = {
  email: string;
  telephone: string;
  whatsapp?: string;
  adresse?: string;
};

export type Realisation = {
  id: string;
  titre: string;
  categorie: string;
  description: string;
  format: string;
  pages?: number;
  papier: string;
  reliure: string;
  quantite: number;
  prix: Prix;
  delai: string;
  teinte: Teinte;
  pourAuteur?: AuteurResume;
};

// --- Ce que tous les profils ont en commun
type ProfilBase = {
  slug: string;
  type: RoleSlug;
  nom: string;
  verifie: boolean;
  accroche: string;
  bio: string;
  apropos: string[]; // présentation longue, un paragraphe par élément
  ville: string;
  pays: string;
  siteWeb?: string;
  membreDepuis: string; // date ISO
  abonnes: number;
  abonnements: number;
  teinte: Teinte;
};

// --- Ce qui change selon le type de compte
export type ProfilEcrivain = ProfilBase & {
  type: "ecrivain";
  genres: string[];
  langues: string[];
  liens: LienSocial[];
  stats: { lectures: number; votes: number; commentaires: number };
  badges: BadgeProfil[];
  livres: LivreProfil[];
  lecture: Bibliotheque;
  activite: Activite[];
};

export type ProfilLecteur = ProfilBase & {
  type: "lecteur";
  genresPreferes: string[];
  stats: { livresLus: number; avis: number };
  lecture: Bibliotheque;
  avis: Avis[];
  auteursSuivis: AuteurResume[];
};

export type ProfilMaison = ProfilBase & {
  type: "maison-edition";
  fondeeEn: number;
  genres: string[];
  stats: { livresPublies: number; auteurs: number; recompenses: number };
  catalogue: LivreCatalogue[];
  soumission: { ouverte: boolean; delaiReponse: string; conditions: string[] };
  contact: ContactPro;
};

export type ProfilPapeterie = ProfilBase & {
  type: "papeterie";
  services: string[];
  horaires: { jours: string; heures: string }[];
  stats: { realisations: number; note: number; avis: number; annees: number };
  delaiMoyen: string;
  livraison: string;
  paiements: string[];
  realisations: Realisation[];
  contact: ContactPro;
};

// L'« union discriminante » : selon la valeur de « type », TypeScript sait quels champs existent
export type Profil = ProfilEcrivain | ProfilLecteur | ProfilMaison | ProfilPapeterie;

// Un choix dans la liste « Sujet » du formulaire de contact
export type SujetContact = { valeur: string; label: string; devis?: boolean };