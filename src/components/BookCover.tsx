import { Sparkles } from "lucide-react";
import type { Teinte } from "@/lib/types";

const degrades: Record<Teinte, string> = {
  brun: "from-marron-chaud to-marron-fonce",
  nuit: "from-[#2b2f4a] to-[#12142a]",
  foret: "from-[#2f4a3a] to-[#14241b]",
  ocre: "from-[#c27a2c] to-marron",
  prune: "from-[#5a2a4a] to-[#2a1024]",
};

type BookCoverProps = {
  titre: string;
  auteur: string;
  teinte: Teinte;
  className?: string;
};

export default function BookCover({
  titre,
  auteur,
  teinte,
  className = "",
}: BookCoverProps) {
  return (
    // Décoratif : le titre et l'auteur sont déjà écrits à côté, en vrai texte
    <div
      aria-hidden="true"
      className={`relative flex aspect-[2/3] flex-col items-center justify-between overflow-hidden rounded-xl bg-gradient-to-b p-3 text-center shadow-md ${degrades[teinte]} ${className}`}
    >
      <Sparkles size={14} className="text-or" />
      <span className="font-serif text-sm font-semibold uppercase leading-tight tracking-wide text-or-clair">
        {titre}
      </span>
      <span className="text-[10px] uppercase tracking-widest text-or-clair/80">
        {auteur}
      </span>
    </div>
  );
}