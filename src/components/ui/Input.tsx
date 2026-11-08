import { ComponentProps, ReactNode, useId } from "react";

type InputProps = ComponentProps<"input"> & {
  label: string;
  erreur?: string;
  droite?: ReactNode;
};

export default function Input({
  label,
  erreur,
  droite,
  className = "",
  id,
  ...props
}: InputProps) {
  const idAuto = useId();
  const inputId = id ?? idAuto;
  const erreurId = `${inputId}-erreur`;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-1.5 block text-sm font-medium text-marron-fonce"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={inputId}
          aria-invalid={!!erreur}
          aria-describedby={erreur ? erreurId : undefined}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-marron-fonce outline-none transition placeholder:text-texte-secondaire/60 focus:border-or focus:ring-2 focus:ring-or/30 ${
            erreur ? "border-erreur" : "border-bordure"
          } ${droite ? "pr-12" : ""} ${className}`}
          {...props}
        />
        {droite && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {droite}
          </div>
        )}
      </div>

      {erreur && (
        <p id={erreurId} role="alert" className="mt-1 text-sm text-erreur">
          {erreur}
        </p>
      )}
    </div>
  );
}