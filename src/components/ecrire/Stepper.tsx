import { Check } from "lucide-react";

const etapes = ["Informations", "Chapitres"];

export default function Stepper({ etape }: { etape: 1 | 2 }) {
  return (
    <div>
      <p className="sr-only">
        Étape {etape} sur {etapes.length}
      </p>
      <ol className="flex items-center">
        {etapes.map((nom, i) => {
          const numero = i + 1;
          const actif = numero === etape;
          const fait = numero < etape;
          const dernier = i === etapes.length - 1;

          return (
            <li
              key={nom}
              aria-current={actif ? "step" : undefined}
              className={`flex items-center ${dernier ? "" : "flex-1"}`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  actif || fait
                    ? "bg-marron text-white"
                    : "border-2 border-bordure text-texte-secondaire"
                }`}
              >
                {fait ? <Check size={16} aria-hidden="true" /> : numero}
              </span>
              <span
                className={`ml-2 text-sm ${
                  actif ? "font-medium text-marron" : "text-texte-secondaire"
                }`}
              >
                {nom}
              </span>
              {!dernier && (
                <span
                  aria-hidden="true"
                  className={`mx-3 h-0.5 flex-1 rounded ${
                    fait ? "bg-or" : "bg-bordure"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}