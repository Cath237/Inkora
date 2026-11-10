import Link from "next/link";
import type { Onglet } from "@/lib/profils/affichage";

type ProfileTabsProps = { onglets: Onglet[]; actif: string };

export default function ProfileTabs({ onglets, actif }: ProfileTabsProps) {
  return (
    // id="contenu" : les boutons « Contacter » du haut mènent directement ici
    <nav
      id="contenu"
      aria-label="Sections du profil"
      className="mt-6 scroll-mt-20 border-b border-bordure"
    >
      <ul className="-mb-px flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {onglets.map((onglet) => {
          const estActif = onglet.cle === actif;
          return (
            <li key={onglet.cle} className="shrink-0">
              <Link
                href={`?onglet=${onglet.cle}`}
                scroll={false}
                aria-current={estActif ? "page" : undefined}
                className={`block border-b-2 px-4 py-3 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-or ${
                  estActif
                    ? "border-or text-marron"
                    : "border-transparent text-texte-secondaire hover:text-marron"
                }`}
              >
                {onglet.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}