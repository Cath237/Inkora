import Link from "next/link";
import Logo from "@/components/Logo";
import LoginForm from "@/components/auth/LoginForm";
import SocialButtons from "@/components/auth/SocialButtons";

export const metadata = { title: "Connexion — Inkora" };

export default function ConnexionPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ivoire px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link href="/" aria-label="Accueil Inkora" className="inline-block">
            <Logo largeur={110} priority />
          </Link>
          <p className="mt-2 text-texte-secondaire">
            Connectez-vous à votre compte
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-bordure bg-white p-6 shadow-sm sm:p-8">
          {/* Onglets */}
          <div className="mb-6 grid grid-cols-2 rounded-xl bg-creme p-1 text-center text-sm font-medium">
            <span
              aria-current="page"
              className="rounded-lg bg-white py-2 text-marron shadow-sm"
            >
              Connexion
            </span>
            <Link
              href="/inscription"
              className="rounded-lg py-2 text-texte-secondaire transition hover:text-marron"
            >
              Inscription
            </Link>
          </div>

          <LoginForm />

          <div className="my-6 flex items-center gap-3 text-xs text-texte-secondaire">
            <span className="h-px flex-1 bg-bordure" />
            ou continuer avec
            <span className="h-px flex-1 bg-bordure" />
          </div>

          <SocialButtons />
        </div>

        <p className="mt-6 text-center text-sm text-texte-secondaire">
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-medium text-marron hover:underline">
            S&apos;inscrire
          </Link>
        </p>
      </div>
    </main>
  );
}