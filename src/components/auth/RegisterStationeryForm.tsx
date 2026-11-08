"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import Select from "@/components/ui/Select";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import SubmitSection from "./SubmitSection";
import { pays } from "@/lib/countries";
import { services } from "@/lib/options";
import {
  champCgu,
  champConfirmation,
  champEmail,
  champMotDePasse,
  champTelephone,
  champTexte,
  erreurConfirmation,
  motsDePasseIdentiques,
} from "@/lib/validation";

const schema = z
  .object({
    nomBoutique: champTexte("Entrez le nom de la boutique"),
    responsable: champTexte("Entrez le nom du responsable"),
    telephone: champTelephone,
    email: champEmail,
    adresse: champTexte("Entrez l'adresse de la boutique", 5),
    ville: champTexte("Entrez votre ville"),
    pays: z.string().min(1, "Sélectionnez votre pays"),
    services: z.array(z.string()).min(1, "Sélectionnez au moins un service"),
    motDePasse: champMotDePasse,
    confirmation: champConfirmation,
    cgu: champCgu,
  })
  .refine(motsDePasseIdentiques, erreurConfirmation);

type Values = z.infer<typeof schema>;

export default function RegisterStationeryForm() {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      nomBoutique: "",
      responsable: "",
      telephone: "",
      email: "",
      adresse: "",
      ville: "",
      pays: "",
      services: [],
      motDePasse: "",
      confirmation: "",
      cgu: false,
    },
  });

  async function onSubmit(values: Values) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Inscription papeterie :", {
      ...values,
      motDePasse: "***",
      confirmation: "***",
    });
    setMessage("Formulaire valide ! La vraie création de compte viendra plus tard.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Input
        label="Nom de la boutique"
        placeholder="Nom de votre boutique"
        autoComplete="organization"
        erreur={errors.nomBoutique?.message}
        {...register("nomBoutique")}
      />

      <Input
        label="Responsable"
        placeholder="Nom du responsable"
        autoComplete="name"
        erreur={errors.responsable?.message}
        {...register("responsable")}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Téléphone"
          type="tel"
          placeholder="6XX XXX XXX"
          autoComplete="tel"
          erreur={errors.telephone?.message}
          {...register("telephone")}
        />
        <Input
          label="Email"
          type="email"
          placeholder="votre@email.com"
          autoComplete="email"
          erreur={errors.email?.message}
          {...register("email")}
        />
      </div>

      <Input
        label="Adresse"
        placeholder="Adresse de la boutique"
        autoComplete="street-address"
        erreur={errors.adresse?.message}
        {...register("adresse")}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Ville"
          placeholder="Votre ville"
          autoComplete="address-level2"
          erreur={errors.ville?.message}
          {...register("ville")}
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
      </div>

      <CheckboxGroup
        legende="Services proposés"
        options={services}
        erreur={errors.services?.message}
        {...register("services")}
      />

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

      <p className="rounded-xl bg-creme p-3 text-xs text-texte-secondaire">
        Après votre inscription, l&apos;équipe Inkora vérifiera votre boutique
        avant de lui attribuer le badge « Vérifié ».
      </p>

      <SubmitSection
        cgu={register("cgu")}
        erreurCgu={errors.cgu?.message}
        enCours={isSubmitting}
        message={message}
      />
    </form>
  );
}