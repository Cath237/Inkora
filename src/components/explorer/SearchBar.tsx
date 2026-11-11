import { Search } from "lucide-react";
import type { TypeRecherche } from "@/lib/explorer/types";

type SearchBarProps = { q: string; type: TypeRecherche };

// Un formulaire HTML tout simple : il envoie vers /explorer?q=... même sans JavaScript
export default function SearchBar({ q, type }: SearchBarProps) {
  return (
    <form action="/explorer" role="search" className="relative">
      {type !== "livres" && <input type="hidden" name="type" value={type} />}
      <label htmlFor="recherche-explorer" className="sr-only">
        Rechercher sur Inkora
      </label>
      <Search
        size={20}
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-texte-secondaire"
      />
      <input
        id="recherche-explorer"
        name="q"
        type="search"
        defaultValue={q}
        maxLength={100}
        placeholder="Rechercher un livre, un auteur, un genre…"
        className="w-full rounded-full border border-bordure bg-white py-3.5 pl-12 pr-28 text-marron-fonce outline-none transition placeholder:text-texte-secondaire focus:border-or focus:ring-2 focus:ring-or/30"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-marron-chaud to-marron-fonce px-5 py-2 text-sm font-medium text-white transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
      >
        Chercher
      </button>
    </form>
  );
}