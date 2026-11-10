import {
  Briefcase,
  Eye,
  Feather,
  Heart,
  Hourglass,
  Smile,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type Categorie = { slug: string; nom: string; icone: LucideIcon };

export const categories: Categorie[] = [
  { slug: "romance", nom: "Romance", icone: Heart },
  { slug: "thriller", nom: "Thriller", icone: Eye },
  { slug: "fantasy", nom: "Fantasy", icone: Sparkles },
  { slug: "business", nom: "Business", icone: Briefcase },
  { slug: "jeunesse", nom: "Jeunesse", icone: Smile },
  { slug: "histoire", nom: "Histoire", icone: Hourglass },
  { slug: "poesie", nom: "Poésie", icone: Feather },
];