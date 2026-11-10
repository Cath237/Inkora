import Link from "next/link";
import { Feather, Plus } from "lucide-react";

export const metadata = { title: "Studio d’écriture — Inkora" };

const lienBouton =
  "inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-marron-chaud to-marron-fonce px-6 py-3 font-medium text-white shadow-md transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or";

export default function EcrirePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pt-6 md:pt-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-marron">Studio d’écriture</h1>
          <p className="mt-1 text-texte-secondaire">
            Écrivez, publiez et suivez vos livres.
          </p>
        </div>
        <Link href="/ecrire/nouveau" className={lienBouton}>
          <Plus size={18} aria-hidden="true" />
          Nouveau livre
        </Link>
      </header>

      <section aria-labelledby="mes-livres" className="mt-10">
        <h2 id="mes-livres" className="font-serif text-xl text-marron-fonce">
          Mes livres
        </h2>

        <div className="mt-4 flex flex-col items-center rounded-3xl border-2 border-dashed border-bordure bg-creme/40 px-6 py-14 text-center">
          <Feather size={40} strokeWidth={1.5} aria-hidden="true" className="text-or" />
          <p className="mt-4 font-medium text-marron-fonce">
            Vous n’avez pas encore de livre
          </p>
          <p className="mt-1 max-w-sm text-sm text-texte-secondaire">
            Vos brouillons et vos œuvres publiées apparaîtront ici.
          </p>
          <Link href="/ecrire/nouveau" className={`${lienBouton} mt-6`}>
            Écrire mon premier livre
          </Link>
        </div>
      </section>
    </main>
  );
}