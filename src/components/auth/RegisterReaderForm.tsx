"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import Select from "@/components/ui/Select";
import SubmitSection from "./SubmitSection";
import { pays } from "@/lib/countries";
import {
  champCgu,
  champConfirmation,
  champEmail,
  champMotDePasse,
  champTexte,
  erreurConfirmation,
  motsDePasseIdentiques,
} from "@/lib/validation";

const schema = z
  .object({
    nomComplet: champTexte("Entrez votre nom complet"),
    email: champEmail,
    pays: z.string().min(1, "Sélectionnez votre pays"),
    motDePasse: champMotDePasse,
    confirmation: champConfirmation,
    cgu: champCgu,
  })
  .refine(motsDePasseIdentiques, erreurConfirmation);

type Values = z.infer<typeof schema>;

export default function RegisterReaderForm() {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      nomComplet: "",
      email: "",
      pays: "",
      motDePasse: "",
      confirmation: "",
      cgu: false,
    },
  });

  async function onSubmit(values: Values) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Inscription lecteur :", {
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
        label="Email"
        type="email"
        placeholder="votre@email.com"
        autoComplete="email"
        erreur={errors.email?.message}
        {...register("email")}
      />

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

      <SubmitSection
        cgu={register("cgu")}
        erreurCgu={errors.cgu?.message}
        enCours={isSubmitting}
        message={message}
      />
    </form>
  );
}