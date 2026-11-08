import { z } from "zod";

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexTelephone = /^\+?[0-9\s().-]{8,18}$/;

export const estEmail = (v: string) => regexEmail.test(v);
export const estTelephone = (v: string) => regexTelephone.test(v);

export const champTexte = (message: string, min = 2) =>
  z.string().trim().min(min, message);

export const champEmail = z
  .string()
  .trim()
  .min(1, "Entrez votre email")
  .refine(estEmail, "Entrez un email valide");

export const champTelephone = z
  .string()
  .trim()
  .min(1, "Entrez votre numéro de téléphone")
  .refine(estTelephone, "Entrez un numéro de téléphone valide");

export const champMotDePasse = z
  .string()
  .min(8, "Au moins 8 caractères")
  .regex(/[A-Za-z]/, "Ajoutez au moins une lettre")
  .regex(/[0-9]/, "Ajoutez au moins un chiffre");

export const champCgu = z
  .boolean()
  .refine((v) => v, "Vous devez accepter les conditions pour continuer");

export const champConfirmation = z
  .string()
  .min(1, "Confirmez votre mot de passe");

// Les deux outils ci-dessous servent à comparer mot de passe et confirmation
export const motsDePasseIdentiques = (d: {
  motDePasse: string;
  confirmation: string;
}) => d.motDePasse === d.confirmation;

export const erreurConfirmation = {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmation"],
};

// Le site web est facultatif : vide = accepté
export const champSiteWeb = z
  .string()
  .trim()
  .refine((v) => {
    if (v === "") return true;
    try {
      const url = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`);
      return url.hostname.includes(".");
    } catch {
      return false;
    }
  }, "Entrez une adresse valide (ex. www.mamaison.com)");