"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";

import { estEmail, estTelephone } from "@/lib/validation";

// Les règles de validation, écrites une seule fois
const schema = z.object({
  identifiant: z
    .string()
    .trim()
    .min(1, "Entrez votre email ou votre numéro de téléphone")
    .refine(
      (v) => estEmail(v) || estTelephone(v),
      "Entrez un email ou un numéro de téléphone valide",
    ),
  motDePasse: z.string().min(1, "Entrez votre mot de passe"),
  souvenir: z.boolean(),
});

// TypeScript déduit automatiquement le type des valeurs à partir du schéma
type LoginValues = z.infer<typeof schema>;

export default function LoginForm() {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { identifiant: "", motDePasse: "", souvenir: false },
  });

  async function onSubmit(values: LoginValues) {
    // Simulation : la vraie connexion (Auth.js) viendra plus tard
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Connexion :", values);
    setMessage("Formulaire valide ! La vraie connexion viendra avec Auth.js.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <Input
        label="Email ou téléphone"
        placeholder="Entrez votre email ou téléphone"
        autoComplete="username"
        erreur={errors.identifiant?.message}
        {...register("identifiant")}
      />

      <PasswordInput
        label="Mot de passe"
        placeholder="Entrez votre mot de passe"
        autoComplete="current-password"
        erreur={errors.motDePasse?.message}
        {...register("motDePasse")}
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-texte-secondaire">
          <input
            type="checkbox"
            className="h-4 w-4 accent-marron"
            {...register("souvenir")}
          />
          Se souvenir de moi
        </label>
        <Link href="/mot-de-passe-oublie" className="text-marron hover:underline">
          Mot de passe oublié ?
        </Link>
      </div>

      <Button type="submit" pleineLargeur disabled={isSubmitting}>
        {isSubmitting ? "Connexion…" : "Connexion"}
      </Button>

      {message && (
        <p role="status" className="rounded-xl bg-creme p-3 text-center text-sm text-marron">
          {message}
        </p>
      )}
    </form>
  );
}