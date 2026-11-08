import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { ComponentType } from "react";
import { roles, type RoleSlug } from "@/lib/roles";
import RegisterWriterForm from "@/components/auth/RegisterWriterForm";
import RegisterReaderForm from "@/components/auth/RegisterReaderForm";
import RegisterPublisherForm from "@/components/auth/RegisterPublisherForm";
import RegisterStationeryForm from "@/components/auth/RegisterStationeryForm";

// Chaque type de compte est associé à son formulaire
const formulaires: Record<RoleSlug, ComponentType> = {
  ecrivain: RegisterWriterForm,
  lecteur: RegisterReaderForm,
  "maison-edition": RegisterPublisherForm,
  papeterie: RegisterStationeryForm,
};

type Props = {
  params: Promise<{ role: string }>;
};

export default async function InscriptionRolePage({ params }: Props) {
  const { role: slug } = await params;
  const role = roles.find((r) => r.slug === slug);

  // Si l'URL ne correspond à aucun rôle (ex. /inscription/banane) : page 404
  const Formulaire = formulaires[role.slug];

  return (
    <main className="min-h-screen bg-ivoire px-4 py-8">
      <div className="mx-auto w-full max-w-xl">
        <Link
          href="/inscription"
          className="inline-flex items-center gap-1 text-sm text-marron hover:underline"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Retour
        </Link>

        <header className="mt-4 text-center">
          <h1 className="font-serif text-3xl text-marron">{role.titre}</h1>
          <p className="mt-1 text-texte-secondaire">
            Remplissez le formulaire ci-dessous
          </p>
        </header>

        <div className="mt-6 rounded-2xl border border-bordure bg-white p-6 shadow-sm sm:p-8">
          <Formulaire />
        </div>
      </div>
    </main>
  );
}