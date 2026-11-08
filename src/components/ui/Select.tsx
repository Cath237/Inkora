import { ComponentProps, useId } from "react";
import { ChevronDown } from "lucide-react";

type SelectProps = ComponentProps<"select"> & {
  label: string;
  erreur?: string;
};

export default function Select({
  label,
  erreur,
  className = "",
  id,
  children,
  ...props
}: SelectProps) {
  const idAuto = useId();
  const selectId = id ?? idAuto;
  const erreurId = `${selectId}-erreur`;

  return (
    <div>
      <label
        htmlFor={selectId}
        className="mb-1.5 block text-sm font-medium text-marron-fonce"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={selectId}
          aria-invalid={!!erreur}
          aria-describedby={erreur ? erreurId : undefined}
          className={`w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-marron-fonce outline-none transition focus:border-or focus:ring-2 focus:ring-or/30 ${
            erreur ? "border-erreur" : "border-bordure"
          } ${className}`}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-texte-secondaire"
        />
      </div>

      {erreur && (
        <p id={erreurId} role="alert" className="mt-1 text-sm text-erreur">
          {erreur}
        </p>
      )}
    </div>
  );
}