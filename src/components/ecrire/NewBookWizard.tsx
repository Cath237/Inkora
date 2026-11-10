"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import BookDetailsForm from "./BookDetailsForm";
import ChaptersWorkspace from "./ChaptersWorkspace";
import Stepper from "./Stepper";
import { genres } from "@/lib/livre-options";
import type { LivreValues } from "@/lib/schemas/livre";

export default function NewBookWizard() {
  const [etape, setEtape] = useState<1 | 2>(1);
  const [livre, setLivre] = useState<LivreValues | null>(null);

  function continuer(valeurs: LivreValues) {
    setLivre(valeurs);
    setEtape(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const genre = genres.find((g) => g.slug === livre?.genre);

  return (
    <div>
      <div className="mx-auto max-w-3xl">
        <Stepper etape={etape} />
      </div>

      {/* L'étape 1 reste affichée en mémoire, juste masquée : rien n'est perdu au retour */}
      <div className={etape === 1 ? "mx-auto mt-8 max-w-3xl" : "hidden"}>
        <BookDetailsForm onContinue={continuer} />
      </div>

      {etape === 2 && livre && (
        <div className="mt-8 space-y-8">
          <section className="rounded-2xl border border-bordure bg-white p-5 shadow-sm sm:p-6">
            <h2 className="font-serif text-xl text-marron">Récapitulatif</h2>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-texte-secondaire">Titre</dt>
                <dd className="font-medium text-marron-fonce">{livre.titre}</dd>
              </div>
              <div>
                <dt className="text-texte-secondaire">Genre</dt>
                <dd className="font-medium text-marron-fonce">
                  {genre?.nom}
                  {livre.sousGenres.length > 0 && ` · ${livre.sousGenres.join(", ")}`}
                </dd>
              </div>
              <div>
                <dt className="text-texte-secondaire">Type d’œuvre</dt>
                <dd className="font-medium text-marron-fonce">
                  {livre.format === "serie"
                    ? `Saga « ${livre.nomSerie} » — tome ${livre.numeroTome}${
                        livre.nombreTomes ? ` sur ${livre.nombreTomes}` : ""
                      }`
                    : "Livre unique"}
                </dd>
              </div>
              <div>
                <dt className="text-texte-secondaire">Mots-clés</dt>
                <dd className="font-medium text-marron-fonce">
                  {livre.motsCles.length > 0 ? livre.motsCles.join(", ") : "—"}
                </dd>
              </div>
            </dl>
          </section>

          <ChaptersWorkspace langue={livre.langue} />

          <Button
            variante="secondaire"
            onClick={() => setEtape(1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Modifier les informations
          </Button>
        </div>
      )}
    </div>
  );
}