import { getTranslations } from "next-intl/server";
import Logo from "@/components/Logo";
import LanguageChoice from "@/components/LanguageChoice";

export async function generateMetadata() {
  const t = await getTranslations("Langue");
  return { title: `${t("titre")} — Inkora` };
}

export default async function LanguePage() {
  const t = await getTranslations("Langue");

  return (
    <main className="flex min-h-screen items-center justify-center bg-ivoire px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex justify-center">
          <Logo largeur={90} priority />
        </div>

        <header className="mt-6 text-center">
          <h1 className="font-serif text-3xl text-marron">{t("titre")}</h1>
          <p className="mt-2 text-texte-secondaire">{t("sousTitre")}</p>
        </header>

        <div className="mt-8">
          <LanguageChoice />
        </div>
      </div>
    </main>
  );
}