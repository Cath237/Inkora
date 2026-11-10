import Link from "next/link";

const exemples = [
  { slug: "amina-k", label: "Écrivain" },
  { slug: "fatou-n", label: "Lecteur" },
  { slug: "editions-nyemba", label: "Maison d’édition" },
  { slug: "papeterie-inkora", label: "Papeterie" },
];

// Visible seulement pendant le développement : permet de tester les 4 profils sans compte
export default function ApercuProfils({ actuel }: { actuel: string }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-dashed border-or bg-creme/60 px-4 py-2 text-xs text-marron">
      <span className="font-medium">Aperçu (développement) :</span>
      {exemples.map((e) => (
        <Link
          key={e.slug}
          href={`/profil/${e.slug}`}
          aria-current={e.slug === actuel ? "true" : undefined}
          className={`rounded-full px-2.5 py-1 ${
            e.slug === actuel ? "bg-marron text-white" : "bg-white hover:bg-or/20"
          }`}
        >
          {e.label}
        </Link>
      ))}
    </div>
  );
}