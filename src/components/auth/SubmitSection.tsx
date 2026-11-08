import Link from "next/link";
import type { UseFormRegisterReturn } from "react-hook-form";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";

type SubmitSectionProps = {
  cgu: UseFormRegisterReturn;
  erreurCgu?: string;
  enCours: boolean;
  message: string;
};

export default function SubmitSection({
  cgu,
  erreurCgu,
  enCours,
  message,
}: SubmitSectionProps) {
  return (
    <>
      <Checkbox erreur={erreurCgu} {...cgu}>
        J&apos;accepte les{" "}
        <Link
          href="/cgu"
          target="_blank"
          className="text-marron underline hover:no-underline"
        >
          Conditions Générales d&apos;Utilisation
        </Link>
      </Checkbox>

      <Button type="submit" pleineLargeur disabled={enCours}>
        {enCours ? "Création…" : "Créer mon compte"}
      </Button>

      {message && (
        <p
          role="status"
          className="rounded-xl bg-creme p-3 text-center text-sm text-marron"
        >
          {message}
        </p>
      )}

      <p className="pt-2 text-center text-sm text-texte-secondaire">
        Vous avez déjà un compte ?{" "}
        <Link
          href="/connexion"
          className="font-medium text-marron hover:underline"
        >
          Se connecter
        </Link>
      </p>
    </>
  );
}