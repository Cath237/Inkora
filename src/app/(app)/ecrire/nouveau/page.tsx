import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NewBookWizard from "@/components/ecrire/NewBookWizard";

export const metadata = { title: "Nouveau livre — Inkora" };

export default function NouveauLivrePage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pt-6 md:pt-10">
      <Link
        href="/ecrire"
        className="inline-flex items-center gap-1 text-sm text-marron hover:underline"
      >
        <ArrowLeft size={18} aria-hidden="true" />
        Retour au studio
      </Link>

      <h1 className="mt-4 font-serif text-3xl text-marron">Nouveau livre</h1>
      <p className="mt-1 text-texte-secondaire">
        Donnez vie à votre histoire. Tout pourra être modifié plus tard.
      </p>

      <div className="mt-8">
        <NewBookWizard />
      </div>
    </main>
  );
}