"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import Select from "@/components/ui/Select";
import Checkbox from "@/components/ui/Checkbox";
import { pays } from "@/lib/countries";
import {
  champCgu,
  champEmail,
  champMotDePasse,
  champTelephone,
  champTexte,
} from "@/lib/validation";

const schema = z
  .object({
    nomComplet: champTexte("Entrez votre nom complet"),
    nomDePlume: champTexte("Entrez votre nom de plume"),
    email: champEmail,
    telephone: champTelephone,
    pays: z.string().min(1, "Sélectionnez votre pays"),
    ville: champTexte("Entrez votre ville"),
    motDePasse: champMotDePasse,
    confirmation: z.string().min(1, "Confirmez votre mot de passe"),
    cgu: champCgu,
  })
  // Règle qui compare deux champs entre eux
  .refine((donnees) => donnees.motDePasse === donnees.confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmation"],
  });

type Values = z.infer<typeof schema>;

export default function RegisterWriterForm() {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      nomComplet: "",
      nomDePlume: "",
      email: "",
      telephone: "",
      pays: "",
      ville: "",
      motDePasse: "",
      confirmation: "",
      cgu: false,
    },
  });

  async function onSubmit(values: Values) {
    // Simulation : la vraie création de compte viendra avec la base de données
    await new Promise((resolve) => setTimeout(resolve, 800));
    // On ne montre jamais un mot de passe, même dans la console
    console.log("Inscription :", {
      ...values,
      motDePasse: "***",
      confirmation: "***",
    });
    setMessage("Formulaire valide ! La vraie création de compte viendra plus tard.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Input
        label="Nom complet"
        placeholder="Entrez votre nom complet"
        autoComplete="name"
        erreur={errors.nomComplet?.message}
        {...register("nomComplet")}
      />

      <Input
        label="Nom de plume"
        placeholder="Votre nom de plume"
        erreur={errors.nomDePlume?.message}
        {...register("nomDePlume")}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Email"
          type="email"
          placeholder="votre@email.com"
          autoComplete="email"
          erreur={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Téléphone"
          type="tel"
          placeholder="6XX XXX XXX"
          autoComplete="tel"
          erreur={errors.telephone?.message}
          {...register("telephone")}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Pays"
          autoComplete="country-name"
          erreur={errors.pays?.message}
          {...register("pays")}
        >
          <option value="">Sélectionnez votre pays</option>
          {pays.map((nom) => (
            <option key={nom} value={nom}>
              {nom}
            </option>
          ))}
        </Select>
        <Input
          label="Ville"
          placeholder="Votre ville"
          autoComplete="address-level2"
          erreur={errors.ville?.message}
          {...register("ville")}
        />
      </div>

      <PasswordInput
        label="Mot de passe"
        placeholder="Créez un mot de passe"
        autoComplete="new-password"
        erreur={errors.motDePasse?.message}
        {...register("motDePasse")}
      />
      <p className="-mt-2 text-xs text-texte-secondaire">
        Au moins 8 caractères, avec une lettre et un chiffre.
      </p>

      <PasswordInput
        label="Confirmation"
        placeholder="Confirmez votre mot de passe"
        autoComplete="new-password"
        erreur={errors.confirmation?.message}
        {...register("confirmation")}
      />

      <Checkbox erreur={errors.cgu?.message} {...register("cgu")}>
        J&apos;accepte les{" "}
        <Link
          href="/cgu"
          target="_blank"
          className="text-marron underline hover:no-underline"
        >
          Conditions Générales d&apos;Utilisation
        </Link>
      </Checkbox>

      <Button type="submit" pleineLargeur disabled={isSubmitting}>
        {isSubmitting ? "Création…" : "Créer mon compte"}
      </Button>

      {message && (
        <p
          role="status"
          className="rounded-xl bg-creme p-3 text-center text-sm text-marron"
        >
          {message}
        </p>
      )}

      <p className="pt-2 text-center text-sm text-texte-secondaire">
        Vous avez déjà un compte ?{" "}
        <Link
          href="/connexion"
          className="font-medium text-marron hover:underline"
        >
          Se connecter
        </Link>
      </p>
    </form>
  );
}