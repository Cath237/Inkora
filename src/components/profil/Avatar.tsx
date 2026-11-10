import Image from "next/image";
import type { Teinte } from "@/lib/types";

const degrades: Record<Teinte, string> = {
  brun: "from-marron-chaud to-marron-fonce",
  nuit: "from-[#2b2f4a] to-[#12142a]",
  foret: "from-[#2f4a3a] to-[#14241b]",
  ocre: "from-[#c27a2c] to-marron",
  prune: "from-[#5a2a4a] to-[#2a1024]",
};

const tailles = {
  sm: "h-9 w-9 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-20 w-20 text-xl",
  xl: "h-28 w-28 text-3xl sm:h-32 sm:w-32 sm:text-4xl",
};

// « J. M. Elanda » → « JE », « Éditions Nyemba » → « ÉN »
export function initiales(nom: string) {
  const mots = nom.replace(/\./g, " ").split(/\s+/).filter(Boolean);
  if (mots.length === 0) return "?";
  const premier = mots[0][0];
  const dernier = mots.length > 1 ? mots[mots.length - 1][0] : "";
  return (premier + dernier).toUpperCase();
}

type AvatarProps = {
  nom: string;
  teinte: Teinte;
  taille?: keyof typeof tailles;
  src?: string; // la photo de profil, quand elle existera
  className?: string;
};

export default function Avatar({
  nom,
  teinte,
  taille = "md",
  src,
  className = "",
}: AvatarProps) {
  return (
    // Décoratif : le nom est toujours écrit à côté, en vrai texte
    <span
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br font-serif font-semibold text-or-clair ${degrades[teinte]} ${tailles[taille]} ${className}`}
    >
      {src ? (
        <Image src={src} alt="" fill sizes="128px" className="object-cover" />
      ) : (
        initiales(nom)
      )}
    </span>
  );
}