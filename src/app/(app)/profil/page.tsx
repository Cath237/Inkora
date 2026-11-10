import { redirect } from "next/navigation";
import { PROFIL_COURANT } from "@/lib/profils/mock-data";

// « Mon profil » : mène vers le profil du compte connecté.
// Avec le backend : si personne n'est connecté, on enverra vers /connexion.
export default function MonProfilPage() {
  redirect(`/profil/${PROFIL_COURANT}`);
}