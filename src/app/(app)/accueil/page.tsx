import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import BookCover from "@/components/BookCover";
import BookCard from "@/components/app/BookCard";
import Rail from "@/components/app/Rail";
import Section from "@/components/app/Section";
import { categories } from "@/lib/categories";
import {
  livreALaUne,
  livresNouveaux,
  livresPopulaires,
} from "@/lib/mock-data";

export const metadata = { title: "Accueil — Inkora" };

export default function AccueilPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pt-4 md:pt-8">
      <h1 className="sr-only">Accueil</h1>

      {/* Recherche : un formulaire HTML classique, qui envoie vers /explorer?q=... */}
      <form action="/explorer" role="search" className="relative">
        <label htmlFor="recherche" className="sr-only">
          Rechercher un livre ou un auteur
        </label>
        <Search
          size={20}
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-texte-secondaire"
        />
        <input
          id="recherche"
          name="q"
          type="search"
          placeholder="Rechercher un livre, un auteur…"
          className="w-full rounded-full border border-bordure bg-white py-3 pl-12 pr-4 text-marron-fonce outline-none transition placeholder:text-texte-secondaire focus:border-or focus:ring-2 focus:ring-or/30"
        />
      </form>

      {/* Livre à la une */}
      <section
        aria-label="À la une"
        className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-marron-fonce via-marron to-marron-chaud p-6 text-white md:p-12"
      >
        <Sparkles
          size={28}
          aria-hidden="true"
          className="absolute right-6 top-6 text-or-clair/70"
        />

        <div className="relative max-w-md">
          <span className="inline-block rounded-full bg-or/20 px-3 py-1 text-xs font-semibold tracking-widest text-or-clair">
            À LA UNE
          </span>
          <h2 className="mt-4 font-serif text-3xl uppercase leading-tight md:text-5xl">
            {livreALaUne.titre}
          </h2>
          <p className="mt-2 text-white/80">{livreALaUne.auteur}</p>
          <Link
            href={`/livre/${livreALaUne.id}`}
            className="mt-6 inline-block rounded-xl bg-gradient-to-r from-or-clair to-or px-6 py-3 font-medium text-marron-fonce transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Découvrir
          </Link>
        </div>

        {/* La couverture n'apparaît que sur grand écran */}
        <div className="absolute right-16 top-1/2 hidden w-44 -translate-y-1/2 rotate-3 md:block">
          <BookCover
            titre={livreALaUne.titre}
            auteur={livreALaUne.auteur}
            teinte={livreALaUne.teinte}
          />
        </div>
      </section>

      <Section titre="Catégories" href="/explorer">
        <Rail>
          {categories.map(({ slug, nom, icone: Icone }) => (
            <Link
              key={slug}
              href={`/explorer?genre=${slug}`}
              className="group flex w-16 shrink-0 snap-start flex-col items-center gap-2 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-creme text-marron transition group-hover:bg-or/20">
                <Icone size={24} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="text-xs text-marron-fonce">{nom}</span>
            </Link>
          ))}
        </Rail>
      </Section>

      <Section titre="Populaires cette semaine" href="/explorer?tri=populaires">
        <Rail>
          {livresPopulaires.map((livre) => (
            <BookCard key={livre.id} livre={livre} />
          ))}
        </Rail>
      </Section>

      <Section titre="Nouveautés" href="/explorer?tri=nouveautes">
        <Rail>
          {livresNouveaux.map((livre) => (
            <BookCard key={livre.id} livre={livre} />
          ))}
        </Rail>
      </Section>
    </main>
  );
}