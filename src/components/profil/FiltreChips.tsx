import Link from "next/link";

type FiltreChipsProps = {
  etiquette: string; // ex. « genre » : sert au texte pour les lecteurs d'écran
  param: string; // le nom dans l'adresse : ?genre=Roman
  onglet: string;
  options: string[];
  actuel?: string;
};

export default function FiltreChips({
  etiquette,
  param,
  onglet,
  options,
  actuel,
}: FiltreChipsProps) {
  const lien = (valeur?: string) =>
    `?onglet=${onglet}${valeur ? `&${param}=${encodeURIComponent(valeur)}` : ""}`;

  const style = (actif: boolean) =>
    `block rounded-full border px-3.5 py-1.5 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or ${
      actif
        ? "border-marron bg-marron text-white"
        : "border-bordure bg-white text-marron hover:border-or"
    }`;

  return (
    <nav aria-label={`Filtrer par ${etiquette}`}>
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href={lien()}
            scroll={false}
            aria-current={!actuel ? "true" : undefined}
            className={style(!actuel)}
          >
            Tous
          </Link>
        </li>
        {options.map((option) => (
          <li key={option}>
            <Link
              href={lien(option)}
              scroll={false}
              aria-current={actuel === option ? "true" : undefined}
              className={style(actuel === option)}
            >
              {option}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}