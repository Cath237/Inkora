"use client";

import { ComponentType, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { FlagEN, FlagFR } from "@/components/Flags";
import { locales, type Locale } from "@/i18n/config";
import { setLocale } from "@/i18n/actions";

// Le nom d'une langue s'écrit toujours dans cette langue : on ne le traduit pas
const langues: Record<
  Locale,
  { nom: string; sousTitre: string; Drapeau: ComponentType }
> = {
  fr: { nom: "Français", sousTitre: "Continuer en français", Drapeau: FlagFR },
  en: { nom: "English", sousTitre: "Continue in English", Drapeau: FlagEN },
};

export default function LanguageChoice() {
  const t = useTranslations("Langue");
  const router = useRouter();
  const localeActuelle = useLocale() as Locale;

  const [choix, setChoix] = useState<Locale>(localeActuelle);
  const [enCours, startTransition] = useTransition();

  function continuer() {
    startTransition(async () => {
      await setLocale(choix); // enregistre le cookie
      router.push("/onboarding");
    });
  }

  return (
    <div>
      <fieldset>
        <legend className="sr-only">{t("titre")}</legend>

        <div className="space-y-4">
          {locales.map((code) => {
            const { nom, sousTitre, Drapeau } = langues[code];
            const actif = choix === code;

            return (
              <label key={code} className="block cursor-pointer">
                <input
                  type="radio"
                  name="langue"
                  value={code}
                  checked={actif}
                  onChange={() => setChoix(code)}
                  className="peer sr-only"
                />
                <span className="flex items-center gap-4 rounded-2xl border-2 border-bordure bg-white p-4 shadow-sm transition hover:border-or/60 peer-checked:border-or peer-checked:bg-creme/50 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-or">
                  <Drapeau />
                  <span className="flex-1">
                    <span className="block font-medium text-marron-fonce">
                      {nom}
                    </span>
                    <span className="block text-sm text-texte-secondaire">
                      {sousTitre}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                      actif ? "border-or text-or" : "border-bordure"
                    }`}
                  >
                    {actif && <Check size={14} strokeWidth={3} />}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <Button
        onClick={continuer}
        disabled={enCours}
        pleineLargeur
        className="mt-8"
      >
        {enCours ? t("enCours") : t("continuer")}
      </Button>
    </div>
  );
}