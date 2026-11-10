"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import type { SujetContact } from "@/lib/profils/types";

const schema = z.object({
  sujet: z.string().min(1, "Choisissez un sujet"),
  // Facultatif : vide = accepté
  quantite: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || (Number.isInteger(Number(v)) && Number(v) >= 1),
      "Entrez un nombre d’exemplaires valide",
    ),
  message: z
    .string()
    .trim()
    .min(10, "Votre message doit contenir au moins 10 caractères")
    .max(2000, "2 000 caractères maximum"),
});

type Values = z.infer<typeof schema>;

type ContactFormProps = {
  destinataire: string;
  sujets: SujetContact[];
  sujetInitial?: string;
  messageInitial?: string;
};

export default function ContactForm({
  destinataire,
  sujets,
  sujetInitial,
  messageInitial,
}: ContactFormProps) {
  const [confirmation, setConfirmation] = useState("");

  const sujetDepart = sujets.some((s) => s.valeur === sujetInitial)
    ? (sujetInitial as string)
    : sujets[0].valeur;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { sujet: sujetDepart, quantite: "", message: messageInitial ?? "" },
  });

  // Le champ « nombre d'exemplaires » n'apparaît que pour une demande de devis
  const sujetChoisi = sujets.find((s) => s.valeur === watch("sujet"));

  async function onSubmit(valeurs: Values) {
    // Simulation : la vraie messagerie viendra avec le backend
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Message à", destinataire, valeurs);
    setConfirmation(
      `Votre message a bien été préparé pour ${destinataire} (simulation : la messagerie arrive avec le backend).`,
    );
    reset({ sujet: valeurs.sujet, quantite: "", message: "" });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Select label="Sujet" erreur={errors.sujet?.message} {...register("sujet")}>
        {sujets.map((s) => (
          <option key={s.valeur} value={s.valeur}>
            {s.label}
          </option>
        ))}
      </Select>

      {sujetChoisi?.devis && (
        <Input
          label="Nombre d’exemplaires (facultatif)"
          type="number"
          inputMode="numeric"
          min={1}
          placeholder="Ex. 50"
          erreur={errors.quantite?.message}
          {...register("quantite")}
        />
      )}

      <Textarea
        label="Votre message"
        rows={6}
        placeholder="Écrivez votre message…"
        erreur={errors.message?.message}
        {...register("message")}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Envoi…" : "Envoyer le message"}
      </Button>

      {confirmation && (
        <p role="status" className="rounded-xl bg-creme p-3 text-sm text-marron">
          {confirmation}
        </p>
      )}
    </form>
  );
}