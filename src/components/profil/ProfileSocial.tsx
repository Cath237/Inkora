"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, MessageCircle, Pencil, Plus } from "lucide-react";
import { formaterCompact } from "@/lib/profils/format";
import { bouton } from "./styles";

type ProfileSocialProps = {
  slug: string;
  nom: string;
  abonnes: number;
  abonnements: number;
  principale: { valeur: number; label: string };
  estMonProfil: boolean;
  estPro: boolean;
  action?: { label: string; href: string };
};

function Stat({ valeur, label, direct }: { valeur: string; label: string; direct?: boolean }) {
  return (
    <div className="flex flex-col-reverse px-5 first:pl-0">
      <dt className="text-sm text-texte-secondaire">{label}</dt>
      <dd aria-live={direct ? "polite" : undefined} className="font-serif text-2xl text-marron">
        {valeur}
      </dd>
    </div>
  );
}

export default function ProfileSocial({
  slug,
  nom,
  abonnes,
  abonnements,
  principale,
  estMonProfil,
  estPro,
  action,
}: ProfileSocialProps) {
  // Pour l'instant, le « suivi » n'est qu'une simulation (rien n'est enregistré)
  const [suivi, setSuivi] = useState(false);

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-5 border-t border-bordure pt-5">
      <dl className="flex divide-x divide-bordure">
        <Stat valeur={formaterCompact(principale.valeur)} label={principale.label} />
        <Stat valeur={formaterCompact(abonnes + (suivi ? 1 : 0))} label="Abonnés" direct />
        <Stat valeur={formaterCompact(abonnements)} label="Abonnements" />
      </dl>

      <div className="flex flex-wrap gap-3">
        {estMonProfil ? (
          <Link href="/profil/modifier" className={bouton.secondaire}>
            <Pencil size={16} aria-hidden="true" />
            Modifier le profil
          </Link>
        ) : (
          <>
            <button
              type="button"
              aria-pressed={suivi}
              aria-label={`Suivre ${nom}`}
              onClick={() => setSuivi((v) => !v)}
              className={suivi ? bouton.secondaire : bouton.primaire}
            >
              {suivi ? (
                <Check size={16} aria-hidden="true" />
              ) : (
                <Plus size={16} aria-hidden="true" />
              )}
              {suivi ? "Abonné" : "Suivre"}
            </button>

            <Link
              href={estPro ? "?onglet=contact#contenu" : `/messages?a=${slug}`}
              className={bouton.secondaire}
            >
              <MessageCircle size={16} aria-hidden="true" />
              {estPro ? "Contacter" : "Message"}
            </Link>

            {action && (
              <Link href={action.href} className={bouton.dore}>
                {action.label}
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}