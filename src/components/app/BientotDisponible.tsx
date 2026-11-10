import { Hourglass } from "lucide-react";

export default function BientotDisponible({ titre }: { titre: string }) {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col items-center justify-center px-4 text-center">
      <Hourglass size={40} strokeWidth={1.5} aria-hidden="true" className="text-or" />
      <h1 className="mt-4 font-serif text-3xl text-marron">{titre}</h1>
      <p className="mt-2 text-texte-secondaire">Cette page arrive bientôt.</p>
    </main>
  );
}
