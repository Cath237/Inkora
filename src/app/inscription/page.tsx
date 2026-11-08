import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { roles } from "@/lib/roles";

export const metadata = { title: "Créer un compte — Inkora" };

export default function InscriptionPage() {
  return (
    <main className="min-h-screen bg-ivoire px-4 py-8">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/connexion"
          className="inline-flex items-center gap-1 text-sm text-marron hover:underline"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Retour
        </Link>

        <header className="mt-4 text-center">
          <h1 className="font-serif text-3xl text-marron">Créer un compte</h1>
          <p className="mt-1 text-texte-secondaire">
            Choisissez le type de compte qui vous correspond
          </p>
        </header>

        <ul className="mt-8 grid grid-cols-2 gap-4">
          {roles.map((role) => {
            const Icone = role.icone;
            return (
              <li key={role.slug}>
                <Link
                  href={`/inscription/${role.slug}`}
                  className="flex h-full flex-col items-center rounded-2xl border border-bordure bg-white p-5 text-center shadow-sm transition hover:border-or hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or sm:p-8"
                >
                  <Icone
                    size={36}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="text-marron"
                  />
                  <span className="mt-3 font-medium text-marron-fonce">
                    {role.titre}
                  </span>
                  <span className="mt-1 text-sm text-texte-secondaire">
                    {role.description}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}