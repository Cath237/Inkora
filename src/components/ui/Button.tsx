import { ButtonHTMLAttributes } from "react";

type Variante = "primaire" | "secondaire" | "dore";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: Variante;
  pleineLargeur?: boolean;
};

const styles: Record<Variante, string> = {
  primaire:
    "bg-gradient-to-r from-marron-chaud to-marron-fonce text-white shadow-md hover:opacity-90",
  secondaire:
    "border-2 border-marron text-marron bg-transparent hover:bg-marron hover:text-white",
  dore: "border-2 border-or text-marron bg-transparent hover:bg-or/10",
};

export default function Button({
  variante = "primaire",
  pleineLargeur = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-xl px-8 py-3 font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or disabled:pointer-events-none disabled:opacity-50 ${styles[variante]} ${
        pleineLargeur ? "w-full" : ""
      } ${className}`}
      {...props}
    />
  );
}