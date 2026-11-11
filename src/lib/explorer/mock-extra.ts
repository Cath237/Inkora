import { AUTEURS, livresExplorer, type SlugAuteur } from "@/lib/explorer/mock-livres";
import { genres as genresOptions } from "@/lib/livre-options";
import type {
  LivreCatalogue,
  LivreProfil,
  Profil,
  ProfilEcrivain,
  ProfilMaison,
  ProfilPapeterie,
  Realisation,
} from "./types";

// Des profils supplémentaires pour que l'Explorer ait de quoi chercher et filtrer.
const nomGenre = (slug: string) => genresOptions.find((g) => g.slug === slug)?.nom ?? slug;

const livresDe = (slug: string): LivreProfil[] =>
  livresExplorer
    .filter((l) => l.auteur.slug === slug)
    .map((l) => ({
      id: l.id,
      titre: l.titre,
      genre: nomGenre(l.genre),
      chapitres: l.chapitres,
      statut: l.statut,
      note: l.note,
      lectures: l.vues,
      teinte: l.teinte,
      prix: l.prix,
    }));

const catalogueDe = (slugs: SlugAuteur[]): LivreCatalogue[] =>
  livresExplorer
    .filter((l) => (slugs as string[]).includes(l.auteur.slug))
    .map((l) => ({
      id: l.id,
      titre: l.titre,
      genre: nomGenre(l.genre),
      annee: new Date(l.publieLe).getFullYear(),
      note: l.note,
      teinte: l.teinte,
      prix: l.prix,
      auteur: l.auteur,
    }));

function ecrivain(
  slug: SlugAuteur,
  d: {
    accroche: string;
    bio: string;
    genres: string[];
    langues: string[];
    abonnes: number;
    abonnements: number;
    membreDepuis: string;
    verifie?: boolean;
  },
): ProfilEcrivain {
  const a = AUTEURS[slug];
  const livres = livresDe(slug);
  const lectures = livres.reduce((somme, l) => somme + l.lectures, 0);
  return {
    slug,
    type: "ecrivain",
    nom: a.nom,
    verifie: d.verifie ?? false,
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
    langues: d.langues,
    liens: [],
    stats: { lectures, votes: Math.round(lectures / 9), commentaires: Math.round(lectures / 40) },
    badges: [],
    livres,
    lecture: { enCours: [], listes: [], favoris: [] },
    activite: [],
  };
}

function maison(d: {
  slug: string;
  nom: string;
  ville: string;
  pays: string;
  accroche: string;
  bio: string;
  fondeeEn: number;
  genres: string[];
  auteurs: SlugAuteur[];
  livresPublies: number;
  recompenses: number;
  abonnes: number;
  abonnements: number;
  membreDepuis: string;
  teinte: ProfilMaison["teinte"];
  ouverte: boolean;
  delaiReponse: string;
  telephone: string;
  verifie: boolean;
}): ProfilMaison {
  return {
    slug: d.slug,
    type: "maison-edition",
    nom: d.nom,
    verifie: d.verifie,
    accroche: d.accroche,
    bio: d.bio,
    apropos: [d.bio],
    ville: d.ville,
    pays: d.pays,
    siteWeb: `https://${d.slug}.example.com`,
    membreDepuis: d.membreDepuis,
    abonnes: d.abonnes,
    abonnements: d.abonnements,
    teinte: d.teinte,
    fondeeEn: d.fondeeEn,
    genres: d.genres,
    stats: { livresPublies: d.livresPublies, auteurs: d.auteurs.length, recompenses: d.recompenses },
    catalogue: catalogueDe(d.auteurs),
    soumission: {
      ouverte: d.ouverte,
      delaiReponse: d.delaiReponse,
      conditions: ["Manuscrit complet, original et inédit", "Un résumé d’une page et une courte biographie"],
    },
    contact: {
      email: `contact@${d.slug}.example.com`,
      telephone: d.telephone,
      adresse: `${d.ville}, ${d.pays}`,
    },
  };
}

function papeterie(d: {
  slug: string;
  nom: string;
  ville: string;
  pays: string;
  accroche: string;
  bio: string;
  services: string[];
  stats: ProfilPapeterie["stats"];
  abonnes: number;
  abonnements: number;
  membreDepuis: string;
  teinte: ProfilPapeterie["teinte"];
  delaiMoyen: string;
  telephone: string;
  realisations: Realisation[];
  verifie: boolean;
}): ProfilPapeterie {
  return {
    slug: d.slug,
    type: "papeterie",
    nom: d.nom,
    verifie: d.verifie,
    accroche: d.accroche,
    bio: d.bio,
    apropos: [d.bio],
    ville: d.ville,
    pays: d.pays,
    siteWeb: `https://${d.slug}.example.com`,
    membreDepuis: d.membreDepuis,
    abonnes: d.abonnes,
    abonnements: d.abonnements,
    teinte: d.teinte,
    services: d.services,
    horaires: [
      { jours: "Lundi – Vendredi", heures: "8h00 – 17h30" },
      { jours: "Samedi", heures: "9h00 – 13h00" },
      { jours: "Dimanche", heures: "Fermé" },
    ],
    stats: d.stats,
    delaiMoyen: d.delaiMoyen,
    livraison: "Retrait en boutique ou livraison dans la ville",
    paiements: ["Mobile Money", "Espèces", "Carte bancaire"],
    realisations: d.realisations,
    contact: {
      email: `devis@${d.slug}.example.com`,
      telephone: d.telephone,
      whatsapp: d.telephone,
      adresse: `${d.ville}, ${d.pays}`,
    },
  };
}

export const profilsExtra: Profil[] = [
  ecrivain("ama-mensah", { accroche: "Writer · Fantasy & romance", bio: "I write about kings, queens and ordinary people in Accra.", genres: ["Fantasy", "Romance", "Jeunesse"], langues: ["English"], abonnes: 21400, abonnements: 88, membreDepuis: "2024-02-11" }),
  ecrivain("chidi-okafor", { accroche: "Writer · Sci-fi & thrillers", bio: "Building the Lagos of tomorrow, one chapter at a time.", genres: ["Science-fiction", "Thriller"], langues: ["English", "Igbo"], abonnes: 33800, abonnements: 40, membreDepuis: "2023-08-30", verifie: true }),
  ecrivain("aissatou-diallo", { accroche: "Poétesse & romancière", bio: "Entre le fleuve et l’océan, j’écris ce que la vie m’apprend.", genres: ["Drame", "Poésie", "Romance"], langues: ["Français", "Wolof"], abonnes: 14900, abonnements: 120, membreDepuis: "2024-03-05" }),
  ecrivain("koffi-yao", { accroche: "Auteur · Business & jeunesse", bio: "Des livres utiles pour entreprendre, et des histoires pour les enfants.", genres: ["Business", "Jeunesse", "Thriller"], langues: ["Français"], abonnes: 11200, abonnements: 64, membreDepuis: "2024-06-18" }),
  ecrivain("wanjiru-kamau", { accroche: "Mwandishi · Fantasy & histoire", bio: "Hadithi za zamani, kwa watoto wa leo. Old stories for today’s readers.", genres: ["Fantasy", "Histoire"], langues: ["Kiswahili", "English"], abonnes: 8700, abonnements: 53, membreDepuis: "2025-01-09" }),

  maison({ slug: "editions-baobab", nom: "Éditions Baobab", ville: "Dakar", pays: "Sénégal", accroche: "Maison d’édition · Afrique de l’Ouest", bio: "Nous publions la poésie, le roman et le récit de société d’Afrique de l’Ouest.", fondeeEn: 2009, genres: ["Roman", "Poésie", "Drame"], auteurs: ["aissatou-diallo"], livresPublies: 214, recompenses: 14, abonnes: 12600, abonnements: 71, membreDepuis: "2024-03-20", teinte: "foret", ouverte: true, delaiReponse: "10 jours ouvrables", telephone: "+221 7 00 00 00 03", verifie: true }),
  maison({ slug: "harmattan-books", nom: "Harmattan Books", ville: "Lagos", pays: "Nigeria", accroche: "Independent publisher · Science fiction & thrillers", bio: "We publish bold fiction from Nigeria and the diaspora.", fondeeEn: 2016, genres: ["Science-fiction", "Thriller", "Fantasy"], auteurs: ["chidi-okafor", "ama-mensah"], livresPublies: 63, recompenses: 3, abonnes: 6900, abonnements: 25, membreDepuis: "2025-02-02", teinte: "nuit", ouverte: false, delaiReponse: "30 jours", telephone: "+234 8 00 000 0004", verifie: false }),
  maison({ slug: "editions-du-fleuve", nom: "Éditions du Fleuve", ville: "Brazzaville", pays: "Congo", accroche: "Maison d’édition · Histoire & société", bio: "Des livres qui racontent l’histoire et les sociétés d’Afrique centrale.", fondeeEn: 2011, genres: ["Histoire", "Essai", "Roman historique"], auteurs: ["j-m-elanda"], livresPublies: 87, recompenses: 5, abonnes: 4300, abonnements: 33, membreDepuis: "2024-09-14", teinte: "brun", ouverte: true, delaiReponse: "14 jours ouvrables", telephone: "+242 0 00 00 00 05", verifie: true }),

  papeterie({ slug: "imprimerie-sahel", nom: "Imprimerie Sahel", ville: "Dakar", pays: "Sénégal", accroche: "Imprimerie · Livres & brochures", bio: "Tirages de livres, brochures et supports pour auteurs et éditeurs.", services: ["Impression à la demande", "Reliure cousue", "Couverture pelliculée", "Livraison à Dakar"], stats: { realisations: 130, note: 4.6, avis: 58, annees: 12 }, abonnes: 3400, abonnements: 22, membreDepuis: "2024-07-01", teinte: "prune", delaiMoyen: "7 à 12 jours ouvrables", telephone: "+221 7 00 00 00 06", verifie: true, realisations: [
    { id: "s1", titre: "Les rives du fleuve", categorie: "Roman", description: "Tirage broché de 100 exemplaires pour un lancement en librairie.", format: "A5 (14,8 × 21 cm)", pages: 260, papier: "Offset 80 g", reliure: "Couverture souple", quantite: 100, prix: { montant: 320_000, devise: "XOF", unite: "le lot de 100" }, delai: "10 jours", teinte: "prune" },
    { id: "s2", titre: "Mots de sable", categorie: "Recueil de poésie", description: "Petit recueil au format carré, papier ivoire.", format: "15 × 15 cm", pages: 80, papier: "Ivoire 100 g", reliure: "Dos carré collé", quantite: 50, prix: { montant: 110_000, devise: "XOF", unite: "le lot de 50" }, delai: "7 jours", teinte: "ocre" },
  ] }),
  papeterie({ slug: "graphix-print", nom: "Graphix Print", ville: "Lagos", pays: "Nigeria", accroche: "Print shop · Books & notebooks", bio: "Fast, affordable printing for self-published authors.", services: ["Print on demand", "Hardcover binding", "Custom notebooks", "Cover design"], stats: { realisations: 310, note: 4.7, avis: 141, annees: 7 }, abonnes: 5200, abonnements: 30, membreDepuis: "2025-01-25", teinte: "nuit", delaiMoyen: "3 to 7 days", telephone: "+234 8 00 000 0007", verifie: true, realisations: [
    { id: "g1", titre: "Lagos 2099", categorie: "Roman", description: "Hardcover edition with a metallic foil cover.", format: "A5 (14,8 × 21 cm)", pages: 410, papier: "Cream 90 g", reliure: "Couverture rigide, dorure à chaud", quantite: 25, prix: { montant: 175_000, devise: "NGN", unite: "le lot de 25" }, delai: "7 jours", teinte: "nuit" },
    { id: "g2", titre: "Carnets d’auteur", categorie: "Carnet", description: "Notebooks with a custom cover for a writers’ club.", format: "A5 (14,8 × 21 cm)", pages: 100, papier: "Dot grid 80 g", reliure: "Spirale, couverture imprimée", quantite: 40, prix: { montant: 96_000, devise: "NGN", unite: "le lot de 40" }, delai: "4 jours", teinte: "ocre" },
  ] }),
];