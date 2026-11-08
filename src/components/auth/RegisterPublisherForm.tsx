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
import { genres } from "@/lib/options";
import {
  champCgu,
  champConfirmation,
  champEmail,
  champMotDePasse,
  champSiteWeb,
  champTelephone,
  champTexte,
  erreurConfirmation,
  motsDePasseIdentiques,
} from "@/lib/validation";

const schema = z
  .object({
    nomMaison: champTexte("Entrez le nom de la maison d'édition"),
    responsable: champTexte("Entrez le nom du responsable"),
    email: champEmail,
    telephone: champTelephone,
    pays: z.string().min(1, "Sélectionnez votre pays"),
    ville: champTexte("Entrez votre ville"),
    siteWeb: champSiteWeb,
    genres: z.array(z.string()).min(1, "Sélectionnez au moins un genre"),
    motDePasse: champMotDePasse,
    confirmation: champConfirmation,
    cgu: champCgu,
  })
  .refine(motsDePasseIdentiques, erreurConfirmation);

type Values = z.infer<typeof schema>;

export default function RegisterPublisherForm() {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      nomMaison: "",
      responsable: "",
      email: "",
      telephone: "",
      pays: "",
      ville: "",
      siteWeb: "",
      genres: [],
      motDePasse: "",
      confirmation: "",
      cgu: false,
    },
  });

  async function onSubmit(values: Values) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Inscription maison d'édition :", {
      ...values,
      motDePasse: "***",
      confirmation: "***",
    });
    setMessage("Formulaire valide ! La vraie création de compte viendra plus tard.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Input
        label="Nom de la maison d'édition"
        placeholder="Nom de votre maison d'édition"
        autoComplete="organization"
        erreur={errors.nomMaison?.message}
        {...register("nomMaison")}
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
          label="Email"
          type="email"
          placeholder="contact@maison.com"
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

      <Input
        label="Site web (facultatif)"
        type="url"
        inputMode="url"
        placeholder="www.votremaison.com"
        autoComplete="url"
        erreur={errors.siteWeb?.message}
        {...register("siteWeb")}
      />

      <CheckboxGroup
        legende="Genres publiés"
        options={genres}
        erreur={errors.genres?.message}
        {...register("genres")}
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
        Après votre inscription, l&apos;équipe Inkora vérifiera votre maison
        d&apos;édition avant de lui attribuer le badge « Vérifié ».
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