import type { RoleSlug } from "@/lib/roles";
import type { Profil } from "./types";

export type Onglet = { cle: string; label: string };

// Les onglets changent selon le type de profil. Le premier est celui affiché par défaut.
export const onglets: Record<RoleSlug, Onglet[]> = {
  ecrivain: [
    { cle: "livres", label: "Livres" },
    { cle: "apropos", label: "À propos" },
    { cle: "bibliotheque", label: "Bibliothèque" },
    { cle: "activite", label: "Activité" },
  ],
  lecteur: [
    { cle: "bibliotheque", label: "Bibliothèque" },
    { cle: "avis", label: "Avis" },
    { cle: "apropos", label: "À propos" },
  ],
  "maison-edition": [
    { cle: "catalogue", label: "Catalogue" },
    { cle: "apropos", label: "À propos" },
    { cle: "contact", label: "Contact" },
  ],
  papeterie: [
    { cle: "realisations", label: "Réalisations" },
    { cle: "infos", label: "Informations" },
    { cle: "contact", label: "Contact" },
  ],
};

// Le premier chiffre de la rangée de statistiques (avant Abonnés et Abonnements)
export function statPrincipale(p: Profil): { valeur: number; label: string } {
  switch (p.type) {
    case "ecrivain":
      return { valeur: p.livres.length, label: p.livres.length > 1 ? "Livres" : "Livre" };
    case "lecteur":
      return { valeur: p.stats.livresLus, label: "Livres lus" };
    case "maison-edition":
      return { valeur: p.stats.livresPublies, label: "Livres publiés" };
    case "papeterie":
      return { valeur: p.stats.realisations, label: "Réalisations" };
  }
}

// Le grand bouton doré, propre aux professionnels
export function actionPrincipale(
  p: Profil,
): { label: string; href: string } | undefined {
  if (p.type === "maison-edition" && p.soumission.ouverte) {
    return { label: "Soumettre mon manuscrit", href: "?onglet=contact&objet=manuscrit#contenu" };
  }
  if (p.type === "papeterie") {
    return { label: "Demander un devis", href: "?onglet=contact&objet=devis#contenu" };
  }
  return undefined;
}

// Les réglages qu'on peut passer dans l'adresse : /profil/xxx?onglet=catalogue&genre=Roman
export type ParamsProfil = {
  onglet?: string;
  genre?: string;
  categorie?: string;
  objet?: string;
  ref?: string;
};