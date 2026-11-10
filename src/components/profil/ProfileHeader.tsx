import { BadgeCheck, Calendar, Globe, MapPin } from "lucide-react";
import Avatar from "./Avatar";
import CoverBanner from "./CoverBanner";
import ProfileSocial from "./ProfileSocial";
import { actionPrincipale, statPrincipale } from "@/lib/profils/affichage";
import { formaterMoisAnnee } from "@/lib/profils/format";
import type { Profil } from "@/lib/profils/types";
import { roles } from "@/lib/roles";

type ProfileHeaderProps = { profil: Profil; estMonProfil: boolean };

export default function ProfileHeader({ profil, estMonProfil }: ProfileHeaderProps) {
  const Icone = roles.find((r) => r.slug === profil.type)?.icone;
  const estPro = profil.type === "maison-edition" || profil.type === "papeterie";
  const site = profil.siteWeb;

  return (
    <header className="overflow-hidden rounded-3xl border border-bordure bg-white shadow-sm">
      <CoverBanner teinte={profil.teinte} className="h-36 sm:h-52" />

      <div className="px-5 pb-6 sm:px-8">
        {/* La photo chevauche la couverture */}
        <div className="-mt-14 w-fit rounded-full bg-white p-1.5 shadow-sm sm:-mt-16">
          <Avatar nom={profil.nom} teinte={profil.teinte} taille="xl" />
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-serif text-2xl text-marron sm:text-3xl">{profil.nom}</h1>
            {profil.verifie && (
              <span className="inline-flex items-center gap-1 rounded-full bg-or/15 px-2.5 py-0.5 text-xs font-medium text-marron">
                <BadgeCheck size={14} aria-hidden="true" className="text-or" />
                Vérifié
              </span>
            )}
          </div>

          <p className="mt-1 flex items-center gap-1.5 text-texte-secondaire">
            {Icone && <Icone size={16} aria-hidden="true" className="text-or" />}
            {profil.accroche}
          </p>

          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-texte-secondaire">
            <li className="flex items-center gap-1.5">
              <MapPin size={14} aria-hidden="true" />
              {profil.ville}, {profil.pays}
            </li>
            <li className="flex items-center gap-1.5">
              <Calendar size={14} aria-hidden="true" />
              Membre depuis {formaterMoisAnnee(profil.membreDepuis)}
            </li>
            {site && (
              <li className="flex items-center gap-1.5">
                <Globe size={14} aria-hidden="true" />
                <a
                  href={site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-marron hover:underline"
                >
                  {site.replace(/^https?:\/\//, "")}
                  <span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>
                </a>
              </li>
            )}
          </ul>

          <p className="mt-4 max-w-2xl text-marron-fonce">{profil.bio}</p>
        </div>

        <ProfileSocial
          slug={profil.slug}
          nom={profil.nom}
          abonnes={profil.abonnes}
          abonnements={profil.abonnements}
          principale={statPrincipale(profil)}
          estMonProfil={estMonProfil}
          estPro={estPro}
          action={actionPrincipale(profil)}
        />
      </div>
    </header>
  );
}