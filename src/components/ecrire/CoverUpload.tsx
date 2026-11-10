"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { ImagePlus, Trash2 } from "lucide-react";

const TYPES_ACCEPTES = ["image/jpeg", "image/png", "image/webp"];
const TAILLE_MAX = 5 * 1024 * 1024; // 5 Mo

type CoverUploadProps = {
  onChange?: (fichier: File | null) => void;
};

export default function CoverUpload({ onChange }: CoverUploadProps) {
 const [apercu, setApercu] = useState<string | null>(null);
  const [erreur, setErreur] = useState("");

  // Libère la mémoire quand l'aperçu change ou quand le composant disparaît
  useEffect(() => {
    return () => {
      if (apercu) URL.revokeObjectURL(apercu);
    };
  }, [apercu]);

  function choisir(e: ChangeEvent<HTMLInputElement>) {
    const fichier = e.target.files?.[0];
    e.target.value = ""; // permet de rechoisir le même fichier ensuite
    if (!fichier) return;

    if (!TYPES_ACCEPTES.includes(fichier.type)) {
      setErreur("Format non accepté. Utilisez une image JPG, PNG ou WebP.");
      return;
    }
    if (fichier.size > TAILLE_MAX) {
      setErreur("Image trop lourde (5 Mo maximum).");
      return;
    }

    setErreur("");
    setApercu(URL.createObjectURL(fichier));
    onChange?.(fichier);
  }

  function retirer() {
    setApercu(null);
    setErreur("");
    onChange?.(null);
  }

  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-marron-fonce">Couverture</p>

      <label className="block cursor-pointer">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={choisir}
          aria-label={apercu ? "Changer la couverture" : "Importer la couverture"}
          className="peer sr-only"
        />
        <span className="relative flex aspect-[2/3] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-bordure bg-creme/50 p-4 text-center transition hover:border-or peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-or">
          {apercu ? (
            <Image
              src={apercu}
              alt="Aperçu de la couverture"
              fill
              unoptimized
              sizes="208px"
              className="object-cover"
            />
          ) : (
            <>
              <ImagePlus
                size={32}
                strokeWidth={1.5}
                aria-hidden="true"
                className="text-or"
              />
              <span className="mt-3 text-sm font-medium text-marron">
                Importer la couverture
              </span>
              <span className="mt-1 text-xs text-texte-secondaire">
                JPG, PNG ou WebP · 5 Mo max
              </span>
            </>
          )}
        </span>
      </label>

      {apercu ? (
        <button
          type="button"
          onClick={retirer}
          className="mt-2 inline-flex items-center gap-1.5 text-sm text-erreur hover:underline"
        >
          <Trash2 size={14} aria-hidden="true" />
          Retirer la couverture
        </button>
      ) : (
        <p className="mt-2 text-xs text-texte-secondaire">
          Format conseillé : 2:3 (ex. 1600 × 2400 px).
        </p>
      )}

      {erreur && (
        <p role="alert" className="mt-1 text-sm text-erreur">
          {erreur}
        </p>
      )}
    </div>
  );
}