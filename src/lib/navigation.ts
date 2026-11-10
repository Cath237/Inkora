import { House, Library, Search, SquarePen, User, type LucideIcon } from "lucide-react";

export type ItemNav = {
  href: string;
  label: string;
  icone: LucideIcon;
  mobileSeulement?: boolean;
};

export const navigation: ItemNav[] = [
  { href: "/accueil", label: "Accueil", icone: House },
  { href: "/explorer", label: "Explorer", icone: Search },
  { href: "/ecrire", label: "Écrire", icone: SquarePen },
  { href: "/bibliotheque", label: "Bibliothèque", icone: Library },
  // Sur ordinateur, le profil est dans le bouton rond de l'en-tête
  { href: "/profil", label: "Profil", icone: User, mobileSeulement: true },
];