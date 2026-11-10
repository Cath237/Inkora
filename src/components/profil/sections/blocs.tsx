import { ReactNode } from "react";
import { Star, type LucideIcon } from "lucide-react";
import { formaterPrix } from "@/lib/profils/format";
import type { Prix } from "@/lib/profils/types";

// Une carte blanche avec un titre : la brique de base de tous les onglets
export function Bloc({
  titre,
  children,
  className = "",
}: {
  titre: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-bordure bg-white p-5 shadow-sm sm:p-6 ${className}`}>
      <h2 className="font-serif text-xl text-marron">{titre}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-full bg-creme px-3 py-1 text-sm text-marron">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Etoiles({ note }: { note: number }) {
  const pleines = Math.round(note);
  return (
    <span role="img" aria-label={`Note : ${note} sur 5`} className="inline-flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          aria-hidden="true"
          className={i < pleines ? "fill-or text-or" : "text-bordure"}
        />
      ))}
    </span>
  );
}

export function Vide({ icone: Icone, texte }: { icone: LucideIcon; texte: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-bordure bg-creme/40 px-6 py-12 text-center">
      <Icone size={32} strokeWidth={1.5} aria-hidden="true" className="text-or" />
      <p className="mt-3 text-texte-secondaire">{texte}</p>
    </div>
  );
}

export function PastillePrix({ prix }: { prix?: Prix }) {
  return prix ? (
    <span className="rounded-full bg-creme px-2.5 py-0.5 text-xs font-medium text-marron">
      {formaterPrix(prix)}
    </span>
  ) : (
    <span className="rounded-full bg-succes/10 px-2.5 py-0.5 text-xs font-medium text-succes">
      Gratuit
    </span>
  );
}

// Une ligne « étiquette : valeur »
export function Fait({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex justify-between gap-4 border-b border-bordure py-2.5 last:border-0">
      <dt className="text-sm text-texte-secondaire">{label}</dt>
      <dd className="text-right text-sm font-medium text-marron-fonce">{children}</dd>
    </div>
  );
}