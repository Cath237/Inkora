import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  pages: number;
  lien: (page: number) => string;
};

// 1 … 4 [5] 6 … 12 : on montre le début, la fin et les pages voisines
export function numerosAffiches(page: number, pages: number): (number | "…")[] {
  const voulus = new Set([1, pages, page - 1, page, page + 1]);
  const liste = [...voulus].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
  const resultat: (number | "…")[] = [];
  liste.forEach((n, i) => {
    if (i > 0 && n - liste[i - 1] > 1) resultat.push("…");
    resultat.push(n);
  });
  return resultat;
}

const base =
  "flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or";

export default function Pagination({ page, pages, lien }: PaginationProps) {
  if (pages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-8">
      <ul className="flex flex-wrap items-center justify-center gap-1">
        <li>
          {page > 1 ? (
            <Link href={lien(page - 1)} className={`${base} text-marron hover:bg-creme`}>
              <ChevronLeft size={18} aria-hidden="true" />
              <span className="sr-only">Page précédente</span>
            </Link>
          ) : (
            <span aria-hidden="true" className={`${base} text-bordure`}>
              <ChevronLeft size={18} />
            </span>
          )}
        </li>

        {numerosAffiches(page, pages).map((n, i) =>
          n === "…" ? (
            <li key={`trou-${i}`} aria-hidden="true" className="px-1 text-texte-secondaire">
              …
            </li>
          ) : (
            <li key={n}>
              <Link
                href={lien(n)}
                aria-current={n === page ? "page" : undefined}
                className={`${base} ${
                  n === page ? "bg-marron font-medium text-white" : "text-marron hover:bg-creme"
                }`}
              >
                <span className="sr-only">Page </span>
                {n}
              </Link>
            </li>
          ),
        )}

        <li>
          {page < pages ? (
            <Link href={lien(page + 1)} className={`${base} text-marron hover:bg-creme`}>
              <ChevronRight size={18} aria-hidden="true" />
              <span className="sr-only">Page suivante</span>
            </Link>
          ) : (
            <span aria-hidden="true" className={`${base} text-bordure`}>
              <ChevronRight size={18} />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}