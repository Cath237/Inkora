import { ComponentProps, ReactNode, useId } from "react";

type TextareaProps = ComponentProps<"textarea"> & {
  label: string;
  erreur?: string;
  compteur?: ReactNode;
};

export default function Textarea({
  label,
  erreur,
  compteur,
  className = "",
  id,
  ...props
}: TextareaProps) {
  const idAuto = useId();
  const textareaId = id ?? idAuto;
  const erreurId = `${textareaId}-erreur`;

  return (
    <div>
      <label
        htmlFor={textareaId}
        className="mb-1.5 block text-sm font-medium text-marron-fonce"
      >
        {label}
      </label>

      <textarea
        id={textareaId}
        aria-invalid={!!erreur}
        aria-describedby={erreur ? erreurId : undefined}
        className={`w-full resize-y rounded-xl border bg-white px-4 py-3 text-marron-fonce outline-none transition placeholder:text-texte-secondary/60 focus:border-or focus:ring-2 focus:ring-or/30 ${
          erreur ? "border-erreur" : "border-bordure"
        } ${className}`}
        {...props}
      />

      <div className="mt-1 flex justify-between gap-4">
        <div>
          {erreur && (
            <p id={erreurId} role="alert" className="text-sm text-erreur">
              {erreur}
            </p>
          )}
        </div>
        {compteur && (
          <p className="shrink-0 text-xs text-texte-secondaire">{compteur}</p>
        )}
      </div>
    </div>
  );
}