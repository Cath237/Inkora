import { ComponentProps, ReactNode, useId } from "react";

type CheckboxProps = Omit<ComponentProps<"input">, "type"> & {
  children: ReactNode;
  erreur?: string;
};

export default function Checkbox({
  children,
  erreur,
  id,
  className = "",
  ...props
}: CheckboxProps) {
  const idAuto = useId();
  const inputId = id ?? idAuto;
  const erreurId = `${inputId}-erreur`;

  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={inputId}
          type="checkbox"
          aria-invalid={!!erreur}
          aria-describedby={erreur ? erreurId : undefined}
          className={`mt-0.5 h-5 w-5 shrink-0 accent-marron ${className}`}
          {...props}
        />
        <label htmlFor={inputId} className="text-sm text-texte-secondaire">
          {children}
        </label>
      </div>

      {erreur && (
        <p id={erreurId} role="alert" className="mt-1 text-sm text-erreur">
          {erreur}
        </p>
      )}
    </div>
  );
}