import Link from "next/link";
import { ReactNode } from "react";

type SectionProps = {
  titre: string;
  href?: string;
  children: ReactNode;
};

export default function Section({ titre, href, children }: SectionProps) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-xl text-marron-fonce">{titre}</h2>
        {href && (
          <Link href={href} className="text-sm font-medium text-marron hover:underline">
            Voir tout<span className="sr-only"> : {titre}</span>
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}