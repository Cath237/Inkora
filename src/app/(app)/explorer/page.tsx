import Link from "next/link";
import { SearchX } from "lucide-react";
import ActiveFilters from "@/components/explorer/ActiveFilters";
import FiltersForm from "@/components/explorer/FiltersForm";
import FiltresPliables from "@/components/explorer/FiltresPliables";
import LivreCarte from "@/components/explorer/LivreCarte";
import Pagination from "@/components/explorer/Pagination";
import ProfilCarte from "@/components/explorer/ProfilCarte";
import SearchBar from "@/components/explorer/SearchBar";
import SortLinks from "@/components/explorer/SortLinks";
import TypeTabs from "@/components/explorer/TypeTabs";
import { categories } from "@/lib/categories";
import { construireUrl, filtresActifs, parseFiltres } from "@/lib/explorer/params";
import { compter, paysDisponibles, rechercherLivres, rechercherProfils } from "@/lib/explorer/recherche";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ searchParams }: Props) {
  const filtres = parseFiltres(await searchParams);
  const filtre = filtresActifs(filtres).length > 0 || filtres.page > 1;

  return {
    title: filtres.q ? `Résultats pour « ${filtres.q} » — Inkora` : "Explorer — Inkora",
    description: "Découvrez des livres, des auteurs, des maisons d’édition et des papeteries.",
    // Une page de recherche n'a pas à apparaître dans Google ; la page /explorer de base, si
    ...(filtres.q || filtre ? { robots: { index: false, follow: true } } : {}),
  };
}

const pluriel = (n: number, mot: string) => `${n} ${mot}${n > 1 ? "s" : ""}`;

export default async function ExplorerPage({ searchParams }: Props) {
  const filtres = parseFiltres(await searchParams);
  const actifs = filtresActifs(filtres);

  // Les deux recherches se font en parallèle : plus rapide
  const [livres, profils, comptes] = await Promise.all([
    filtres.type === "livres" ? rechercherLivres(filtres) : null,
    filtres.type !== "livres" ? rechercherProfils(filtres) : null,
    compter(filtres.q),
  ]);

  const resultat = livres ?? profils!;
  const nom = { livres: "livre", auteurs: "auteur", maisons: "maison d’édition", papeteries: "papeterie" }[filtres.type];
  const lien = (page: number) => construireUrl(filtres, { page });

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pt-4 md:pt-8">
      <h1 className="sr-only">Explorer</h1>

      <SearchBar q={filtres.q} type={filtres.type} />

      <div className="mt-5">
        <TypeTabs actif={filtres.type} q={filtres.q} comptes={comptes} />
      </div>

      {/* Raccourcis par genre (livres seulement) */}
      {filtres.type === "livres" && (
        <nav aria-label="Genres" className="mt-4">
          <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <li className="shrink-0">
              <Link
                href={construireUrl(filtres, { genre: undefined, page: 1 })}
                aria-current={!filtres.genre ? "true" : undefined}
                className={`block rounded-full border px-3.5 py-1.5 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or ${
                  !filtres.genre ? "border-marron bg-marron text-white" : "border-bordure bg-white text-marron hover:border-or"
                }`}
              >
                Tous
              </Link>
            </li>
            {categories.map(({ slug, nom: nomCat, icone: Icone }) => {
              const actif = filtres.genre === slug;
              return (
                <li key={slug} className="shrink-0">
                  <Link
                    href={construireUrl(filtres, { genre: slug, page: 1 })}
                    aria-current={actif ? "true" : undefined}
                    className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or ${
                      actif ? "border-marron bg-marron text-white" : "border-bordure bg-white text-marron hover:border-or"
                    }`}
                  >
                    <Icone size={14} aria-hidden="true" />
                    {nomCat}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[17rem_1fr]">
        <aside aria-label="Filtres">
          <FiltresPliables nombreActifs={actifs.length}>
            <FiltersForm filtres={filtres} pays={paysDisponibles(filtres.type)} />
          </FiltresPliables>
        </aside>

        <section aria-labelledby="titre-resultats">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="titre-resultats" className="font-serif text-xl text-marron">
              {pluriel(resultat.total, nom)}
              {filtres.q && (
                <span className="font-sans text-base font-normal text-texte-secondaire">
                  {" "}pour « {filtres.q} »
                </span>
              )}
            </h2>
            <SortLinks filtres={filtres} />
          </div>

          <div className="mt-3">
            <ActiveFilters filtres={filtres} actifs={actifs} />
          </div>

          {resultat.total === 0 ? (
            <div className="mt-6 flex flex-col items-center rounded-2xl border-2 border-dashed border-bordure bg-creme/40 px-6 py-14 text-center">
              <SearchX size={36} strokeWidth={1.5} aria-hidden="true" className="text-or" />
              <p className="mt-3 font-medium text-marron-fonce">Aucun résultat</p>
              <p className="mt-1 max-w-sm text-sm text-texte-secondaire">
                Essayez avec d’autres mots, vérifiez l’orthographe ou retirez certains filtres.
              </p>
              {(actifs.length > 0 || filtres.q) && (
                <Link
                  href={construireUrl({ type: filtres.type })}
                  className="mt-5 rounded-xl border-2 border-marron px-5 py-2 text-sm font-medium text-marron transition hover:bg-marron hover:text-white"
                >
                  Tout réinitialiser
                </Link>
              )}
            </div>
          ) : livres ? (
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-4">
              {livres.items.map((livre) => (
                <li key={livre.id}>
                  <LivreCarte livre={livre} />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-5 grid gap-4 md:grid-cols-2">
              {profils!.items.map((p) => (
                <li key={p.slug}>
                  <ProfilCarte profil={p} />
                </li>
              ))}
            </ul>
          )}

          <Pagination page={resultat.page} pages={resultat.pages} lien={lien} />
        </section>
      </div>
    </main>
  );
}