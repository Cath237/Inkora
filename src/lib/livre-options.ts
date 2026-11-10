export type GenreLivre = {
  slug: string;
  nom: string;
  sousGenres: string[];
};

export const genres: GenreLivre[] = [
  {
    slug: "romance",
    nom: "Romance",
    sousGenres: ["Romance contemporaine", "Romance historique", "Romance sombre", "Dark romance","Romance Universitaire", "Amour interdit", "Romance dramatique"],
  },
  {
    slug: "thriller",
    nom: "Thriller & policier",
    sousGenres: ["Polar", "Suspense", "Enquête", "Espionnage", "Thriller psychologique"],
  },
  {
    slug: "fantasy",
    nom: "Fantasy",
    sousGenres: ["Fantasy africaine", "Contes & légendes", "Magie", "Mythologie", "Épique"],
  },
  {
    slug: "science-fiction",
    nom: "Science-fiction",
    sousGenres: ["Afrofuturisme", "Dystopie", "Anticipation", "Space opera"],
  },
  {
    slug: "drame",
    nom: "Drame & société",
    sousGenres: ["Drame familial", "Récit de vie", "Société & politique", "Tradition & modernité"],
  },
  {
    slug: "histoire",
    nom: "Histoire",
    sousGenres: ["Roman historique", "Colonisation & indépendance", "Biographie", "Mémoires"],
  },
  {
    slug: "jeunesse",
    nom: "Jeunesse",
    sousGenres: ["Contes pour enfants", "Aventure", "Premiers romans", "Humour"],
  },
  {
    slug: "horreur",
    nom: "Horreur & paranormal",
    sousGenres: ["Épouvante", "Surnaturel", "Légendes urbaines"],
  },
  {
    slug: "poesie",
    nom: "Poésie & théâtre",
    sousGenres: ["Poésie libre", "Slam", "Théâtre"],
  },
  {
    slug: "business",
    nom: "Business & développement personnel",
    sousGenres: ["Entrepreneuriat", "Finance personnelle", "Leadership", "Bien-être"],
  },
  {
    slug: "spiritualite",
    nom: "Spiritualité & religion",
    sousGenres: ["Foi & témoignages", "Méditation", "Philosophie"],
  },
];

export const publicsCibles = [
  { valeur: "tout-public", nom: "Tout public" },
  { valeur: "ados", nom: "Adolescents (13 ans et +)" },
  { valeur: "adultes", nom: "Adultes (16 ans et +)" },
  { valeur: "adultes-avertis", nom: "Adultes avertis (18 ans et +)" },
];

// Le nom d'une langue s'écrit dans cette langue
export const langues = [
  { valeur: "fr", nom: "Français" },
  { valeur: "en", nom: "English" },
  { valeur: "pt", nom: "Português" },
  { valeur: "sw", nom: "Kiswahili" },
  { valeur: "wo", nom: "Wolof" },
  { valeur: "ln", nom: "Lingála" },
  { valeur: "dua", nom: "Duálá" },
  { valeur: "bas", nom: "Basàa" },
  { valeur: "ewo", nom: "Ewondo" },
  { valeur: "ff", nom: "Fulfulde" },
  { valeur: "ha", nom: "Hausa" },
  { valeur: "yo", nom: "Yorùbá" },
  { valeur: "ig", nom: "Igbo" },
  { valeur: "autre", nom: "Autre langue" },
];