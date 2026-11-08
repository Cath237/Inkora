import { BookOpen, Feather, Landmark, Store, type LucideIcon } from "lucide-react";

export type RoleSlug = "ecrivain" | "lecteur" | "maison-edition" | "papeterie";

export type Role = {
  slug: RoleSlug;
  titre: string;
  description: string;
  icone: LucideIcon;
};

export const roles: Role[] = [
  {
    slug: "ecrivain",
    titre: "Écrivain & Lecteur",
    description: "Publier des œuvres, lire, vendre des livres.",
    icone: Feather,
  },
  {
    slug: "lecteur",
    titre: "Lecteur",
    description: "Lire des milliers d'œuvres.",
    icone: BookOpen,
  },
  {
    slug: "maison-edition",
    titre: "Maison d'édition",
    description: "Publier et gérer des auteurs.",
    icone: Landmark,
  },
  {
    slug: "papeterie",
    titre: "Papeterie",
    description: "Vendre livres et fournitures scolaires.",
    icone: Store,
  },
];