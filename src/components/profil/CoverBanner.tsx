import Image from "next/image";
import type { Teinte } from "@/lib/types";

const degrades: Record<Teinte, string> = {
  brun: "from-marron-fonce via-marron to-marron-chaud",
  nuit: "from-[#12142a] via-[#2b2f4a] to-marron-fonce",
  foret: "from-[#14241b] via-[#2f4a3a] to-marron-fonce",
  ocre: "from-marron-fonce via-marron-chaud to-[#c27a2c]",
  prune: "from-[#2a1024] via-[#5a2a4a] to-marron-fonce",
};

// Un motif géométrique très discret, inspiré des tissus wax
const MOTIF =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cg fill='none' stroke='%23E8B84A' stroke-opacity='0.22' stroke-width='1.4'%3E%3Cpath d='M28 6l22 22-22 22L6 28z'/%3E%3Cpath d='M28 17l11 11-11 11-11-11z'/%3E%3Ccircle cx='28' cy='28' r='2.2' fill='%23E8B84A' fill-opacity='0.3'/%3E%3C/g%3E%3C/svg%3E\")";

type CoverBannerProps = {
  teinte: Teinte;
  src?: string; // la photo de couverture, quand elle existera
  className?: string;
};

export default function CoverBanner({ teinte, src, className = "" }: CoverBannerProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-gradient-to-br ${degrades[teinte]} ${className}`}
    >
      {src ? (
        <Image src={src} alt="" fill sizes="100vw" priority className="object-cover" />
      ) : (
        <div className="absolute inset-0" style={{ backgroundImage: MOTIF }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
    </div>
  );
}