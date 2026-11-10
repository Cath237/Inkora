import { notFound } from "next/navigation";
import ApercuProfils from "@/components/profil/ApercuProfils";
import ProfileHeader from "@/components/profil/ProfileHeader";
import ProfileTabs from "@/components/profil/ProfileTabs";
import PublisherSections from "@/components/profil/sections/PublisherSections";
import { SectionsLecteur } from "@/components/profil/sections/ReaderSections";
import StationerySections from "@/components/profil/sections/StationerySections";
import WriterSections from "@/components/profil/sections/WriterSections";
import { onglets, type ParamsProfil } from "@/lib/profils/affichage";
import { PROFIL_COURANT, trouverProfil } from "@/lib/profils/mock-data";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const profil = trouverProfil(slug);
  if (!profil) return { title: "Profil introuvable — Inkora" };
  return { title: `${profil.nom} — Inkora`, description: profil.bio };
}

// Une valeur d'adresse peut être un texte ou une liste : on garde le premier texte
const premier = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ProfilPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const brut = await searchParams;

  const profil = trouverProfil(slug);
  if (!profil) notFound();

  const reglages: ParamsProfil = {
    onglet: premier(brut.onglet),
    genre: premier(brut.genre),
    categorie: premier(brut.categorie),
    objet: premier(brut.objet),
    ref: premier(brut.ref),
  };

  // Si l'onglet demandé n'existe pas pour ce type de profil, on prend le premier
  const liste = onglets[profil.type];
  const actif = liste.find((o) => o.cle === reglages.onglet) ?? liste[0];

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pt-4 md:pt-8">
      {process.env.NODE_ENV === "development" && <ApercuProfils actuel={profil.slug} />}

      <ProfileHeader profil={profil} estMonProfil={profil.slug === PROFIL_COURANT} />
      <ProfileTabs onglets={liste} actif={actif.cle} />

      <div className="mt-6">
        {profil.type === "ecrivain" && <WriterSections profil={profil} onglet={actif.cle} />}
        {profil.type === "lecteur" && <SectionsLecteur profil={profil} onglet={actif.cle} />}
        {profil.type === "maison-edition" && (
          <PublisherSections profil={profil} onglet={actif.cle} params={reglages} />
        )}
        {profil.type === "papeterie" && (
          <StationerySections profil={profil} onglet={actif.cle} params={reglages} />
        )}
      </div>
    </main>
  );
}