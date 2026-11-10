"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import TagInput from "@/components/ui/TagInput";
import Textarea from "@/components/ui/Textarea";
import CoverUpload from "./CoverUpload";
import { genres, langues, publicsCibles } from "@/lib/livre-options";
import { Controller, useForm, type FieldErrors } from "react-hook-form";
import {
  livreSchema,
  valeursParDefaut,
  type LivreValues,
} from "@/lib/schemas/livre";

const typesOeuvre = [
  {
    valeur: "unique",
    titre: "Livre unique",
    texte: "Une histoire complète en un seul volume",
  },
  {
    valeur: "serie",
    titre: "Saga / série",
    texte: "Une histoire qui s’étend sur plusieurs tomes",
  },
] as const;

const carte = "rounded-2xl border border-bordure bg-white p-5 shadow-sm sm:p-6";
const titreCarte = "font-serif text-xl text-marron";

type BookDetailsFormProps = {
  // Servira aussi pour « Modifier un livre » : on y passera les valeurs existantes
  valeursInitiales?: Partial<LivreValues>;
  onContinue: (valeurs: LivreValues) => void;
};

export default function BookDetailsForm({
  valeursInitiales,
  onContinue,
}: BookDetailsFormProps) {
  const [message, setMessage] = useState("");
  const [erreurGlobale, setErreurGlobale] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<LivreValues>({
    resolver: zodResolver(livreSchema),
    defaultValues: { ...valeursParDefaut, ...valeursInitiales },
  });

  // « watch » permet de réagir en direct à la valeur d'un champ
  const genre = watch("genre");
  const format = watch("format");
  const resume = watch("resume");
  const sousGenresDisponibles =
    genres.find((g) => g.slug === genre)?.sousGenres ?? [];

    // Appelée quand « Continuer » est refusé : on dit clairement pourquoi
function surErreurs(erreurs: FieldErrors<LivreValues>) {
  const noms: Record<string, string> = {
    titre: "Titre",
    resume: "Résumé",
    langue: "Langue",
    publicCible: "Public visé",
    genre: "Genre",
    sousGenres: "Sous-genres",
    motsCles: "Mots-clés",
    format: "Type d’œuvre",
    nomSerie: "Nom de la saga",
    numeroTome: "Numéro du tome",
    nombreTomes: "Nombre de tomes",
    droits: "Droits d’auteur",
    conditions: "Conditions de publication",
  };
  const champs = Object.keys(erreurs).map((cle) => noms[cle] ?? cle);
  console.warn(
    "Fiche du livre refusée :",
    Object.fromEntries(Object.entries(erreurs).map(([cle, e]) => [cle, e?.message])),
  );
  setErreurGlobale(`Impossible de continuer. À corriger : ${champs.join(", ")}.`);
}

function envoyer(valeurs: LivreValues) {
  setErreurGlobale("");
  onContinue(valeurs);
}

  async function enregistrerBrouillon() {
    // Pour un brouillon, seul le titre est obligatoire
    const ok = await trigger("titre");
    setMessage(
      ok
        ? "Brouillon enregistré (simulation : la vraie sauvegarde viendra avec la base de données)."
        : "",
    );
  }

  return (
    <form
      onSubmit={handleSubmit(envoyer, surErreurs)}
      noValidate
      className="space-y-6"
    >
      {/* 1. L'essentiel */}
      <section className={carte}>
        <h2 className={titreCarte}>L’essentiel</h2>
        <div className="mt-5 grid gap-6 md:grid-cols-[13rem_1fr]">
          <CoverUpload />

          <div className="space-y-4">
            <Input
              label="Titre du livre"
              placeholder="Entrez le titre du livre"
              erreur={errors.titre?.message}
              {...register("titre")}
            />
            <Textarea
              label="Résumé"
              rows={8}
              placeholder="Décrivez votre histoire en quelques lignes…"
              compteur={`${resume.length} / 1000`}
              erreur={errors.resume?.message}
              {...register("resume")}
            />
          </div>
        </div>
      </section>

      {/* 2. Classement */}
      <section className={carte}>
        <h2 className={titreCarte}>Classement</h2>
        <div className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Langue du livre"
              erreur={errors.langue?.message}
              {...register("langue")}
            >
              {langues.map((l) => (
                <option key={l.valeur} value={l.valeur}>
                  {l.nom}
                </option>
              ))}
            </Select>

            <Select
              label="Public visé"
              erreur={errors.publicCible?.message}
              {...register("publicCible")}
            >
              {publicsCibles.map((p) => (
                <option key={p.valeur} value={p.valeur}>
                  {p.nom}
                </option>
              ))}
            </Select>
          </div>

          <Select
            label="Genre"
            erreur={errors.genre?.message}
            // Quand le genre change, les sous-genres choisis n'ont plus de sens
            {...register("genre", { onChange: () => setValue("sousGenres", []) })}
          >
            <option value="">Sélectionnez un genre</option>
            {genres.map((g) => (
              <option key={g.slug} value={g.slug}>
                {g.nom}
              </option>
            ))}
          </Select>

          {sousGenresDisponibles.length > 0 && (
            <CheckboxGroup
              key={genre}
              legende="Sous-genres (3 maximum)"
              options={sousGenresDisponibles}
              erreur={errors.sousGenres?.message}
              {...register("sousGenres")}
            />
          )}

          <Controller
            name="motsCles"
            control={control}
            render={({ field }) => (
              <TagInput
                label="Mots-clés"
                placeholder="Ajouter un mot-clé, puis Entrée"
                aide="Aident les lecteurs à trouver votre livre (ex. amour, enquête, Afrique)."
                valeur={field.value}
                onChange={field.onChange}
                erreur={errors.motsCles?.message}
              />
            )}
          />
        </div>
      </section>

      {/* 3. Livre unique ou saga */}
      <section className={carte}>
        <h2 className={titreCarte}>Type d’œuvre</h2>

        <fieldset className="mt-5">
          <legend className="sr-only">Type d’œuvre</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {typesOeuvre.map((type) => (
              <label key={type.valeur} className="block cursor-pointer">
                <input
                  type="radio"
                  value={type.valeur}
                  className="peer sr-only"
                  {...register("format")}
                />
                <span className="block h-full rounded-2xl border-2 border-bordure bg-white p-4 transition hover:border-or/60 peer-checked:border-or peer-checked:bg-creme/50 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-or">
                  <span className="block font-medium text-marron-fonce">
                    {type.titre}
                  </span>
                  <span className="mt-0.5 block text-sm text-texte-secondaire">
                    {type.texte}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {format === "serie" && (
          <div className="mt-5 space-y-4 rounded-2xl bg-creme/60 p-4">
            <Input
              label="Nom de la saga ou de la série"
              placeholder="Ex. Les Gardiens du fleuve"
              erreur={errors.nomSerie?.message}
              {...register("nomSerie")}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Ce livre est le tome n°"
                type="number"
                inputMode="numeric"
                min={1}
                max={99}
                erreur={errors.numeroTome?.message}
                {...register("numeroTome")}
              />
              <Input
                label="Nombre total de tomes"
                type="number"
                inputMode="numeric"
                min={1}
                max={99}
                placeholder="Pas encore défini"
                erreur={errors.nombreTomes?.message}
                {...register("nombreTomes")}
              />
            </div>
            <p className="text-xs text-texte-secondaire">
              Vous pourrez modifier ces informations à tout moment, par exemple
              quand votre saga s’agrandit.
            </p>
          </div>
        )}
      </section>

      {/* 4. Droits d'auteur */}
      <section className={carte}>
        <div className="flex items-center gap-2">
          <ShieldCheck size={22} aria-hidden="true" className="text-or" />
          <h2 className={titreCarte}>Droits d’auteur</h2>
        </div>
        <div className="mt-5 space-y-4">
          <Checkbox erreur={errors.droits?.message} {...register("droits")}>
            Je certifie être l’auteur de cette œuvre, ou détenir tous les droits
            nécessaires pour la publier sur Inkora.
          </Checkbox>

          <Checkbox
            erreur={errors.conditions?.message}
            {...register("conditions")}
          >
            J’accepte les{" "}
            <Link
              href="/conditions-publication"
              target="_blank"
              className="text-marron underline hover:no-underline"
            >
              conditions de publication
            </Link>{" "}
            d’Inkora.
          </Checkbox>

          <p className="rounded-xl bg-creme p-3 text-xs text-texte-secondaire">
            Les œuvres copiées ou publiées sans autorisation peuvent être
            retirées, et le compte concerné suspendu.
          </p>
        </div>
      </section>

      {erreurGlobale && (
        <p role="alert" className="rounded-xl bg-erreur/10 p-3 text-sm text-erreur">
            {erreurGlobale}
        </p>
        )}

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variante="secondaire"
          onClick={enregistrerBrouillon}
        >
          Enregistrer le brouillon
        </Button>
        <Button type="submit" className="flex items-center justify-center gap-2">
          Continuer
          <ArrowRight size={18} aria-hidden="true" />
        </Button>
      </div>

      {message && (
        <p
          role="status"
          className="rounded-xl bg-creme p-3 text-center text-sm text-marron"
        >
          {message}
        </p>
      )}
    </form>
  );
}