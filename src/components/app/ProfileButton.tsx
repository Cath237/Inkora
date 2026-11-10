import Link from "next/link";
import { User } from "lucide-react";
import { boutonRond } from "./styles";

// Aujourd'hui : une icône générique qui mène à /profil.
// Quand le backend sera prêt, ce composant affichera la photo du compte
// connecté (ou renverra vers /connexion si personne n'est connecté).
export default function ProfileButton() {
  return (
    <Link href="/profil" aria-label="Mon profil" className={boutonRond}>
      <User size={20} aria-hidden="true" />
    </Link>
  );
}