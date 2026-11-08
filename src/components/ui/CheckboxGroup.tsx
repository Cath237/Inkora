import { ComponentProps } from "react";

type CheckboxGroupProps = Omit<
  ComponentProps<"input">,
  "type" | "value" | "id"
> & {
  legende: string;
  options: readonly string[];
  erreur?: string;
};

export default function CheckboxGroup({
  legende,
  options,
  erreur,
  ...props
}: CheckboxGroupProps) {
  return (
    <fieldset>
      <legend className="mb-1.5 block text-sm font-medium text-marron-fonce">
        {legende}
      </legend>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="cursor-pointer">
            {/* La vraie case est cachée visuellement, mais reste accessible au clavier */}
            <input
              type="checkbox"
              value={option}
              className="peer sr-only"
              {...props}
            />
            <span className="inline-flex items-center rounded-full border border-bordure bg-white px-3.5 py-1.5 text-sm text-marron-fonce transition hover:border-or peer-checked:border-marron peer-checked:bg-marron peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-or">
              {option}
            </span>
          </label>
        ))}
      </div>

      {erreur && (
        <p role="alert" className="mt-1 text-sm text-erreur">
          {erreur}
        </p>
      )}
    </fieldset>
  );
}