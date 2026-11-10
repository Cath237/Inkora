import Link from "next/link";
import { Clock, CreditCard, MapPin, Printer, Truck, CircleCheck } from "lucide-react";
import BookCover from "@/components/BookCover";
import { formaterMoisAnnee, formaterPrix } from "@/lib/profils/format";
import type { ParamsProfil } from "@/lib/profils/affichage";
import type { ProfilPapeterie, Realisation, SujetContact } from "@/lib/profils/types";
import FiltreChips from "../FiltreChips";
import { bouton } from "../styles";
import ContactSection from "./ContactSection";
import { Bloc, Chips, Etoiles, Fait, Vide } from "./blocs";

const sujets: SujetContact[] = [
  { valeur: "devis", label: "Demander un devis", devis: true },
  { valeur: "commande", label: "Question sur une commande" },
  { valeur: "question", label: "Autre question" },
];

function CarteRealisation({ r, papeterie }: { r: Realisation; papeterie: string }) {
  const specs: [string, string][] = [
    ["Format", r.format],
    ["Pages", r.pages ? String(r.pages) : "—"],
    ["Papier", r.papier],
    ["Reliure", r.reliure],
    ["Quantité", String(r.quantite)],
    ["Délai", r.delai],
  ];

  return (
    <article className="flex h-full flex-col rounded-2xl border border-bordure bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        <BookCover
          titre={r.titre}
          auteur={r.pourAuteur?.nom ?? papeterie}
          teinte={r.teinte}
          className="w-24 shrink-0 sm:w-28"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-texte-secondaire">
            {r.categorie}
          </p>
          <h3 className="mt-0.5 font-medium text-marron-fonce">{r.titre}</h3>
          <p className="mt-1 line-clamp-3 text-sm text-texte-secondaire">{r.description}</p>
          {r.pourAuteur && (
            <p className="mt-2 text-xs text-texte-secondaire">
              Réalisé pour{" "}
              <Link href={`/profil/${r.pourAuteur.slug}`} className="font-medium text-marron hover:underline">
                {r.pourAuteur.nom}
              </Link>
            </p>
          )}
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {specs.map(([label, valeur]) => (
          <div key={label}>
            <dt className="text-xs text-texte-secondaire">{label}</dt>
            <dd className="text-marron-fonce">{valeur}</dd>
          </div>
        ))}
      </dl>

      {/* Le prix, bien visible */}
      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-bordure pt-4">
        <p>
          <span className="block text-xs text-texte-secondaire">Prix</span>
          <span className="text-xl font-semibold text-marron">{formaterPrix(r.prix)}</span>
          {r.prix.unite && (
            <span className="ml-1 text-xs text-texte-secondaire">{r.prix.unite}</span>
          )}
        </p>
        <Link
          href={`?onglet=contact&objet=devis&ref=${r.id}#contenu`}
          className={`${bouton.secondaire} !px-3.5 !py-1.5`}
        >
          Demander un devis<span className="sr-only"> pour {r.titre}</span>
        </Link>
      </div>
    </article>
  );
}

function InfosPapeterie({ profil }: { profil: ProfilPapeterie }) {
  const { adresse } = profil.contact;
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_20rem]">
      <div className="space-y-6">
        <Bloc titre="À propos">
          <div className="space-y-3 text-marron-fonce">
            {profil.apropos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Bloc>

        <Bloc titre="Services proposés">
          <ul className="grid gap-2 sm:grid-cols-2">
            {profil.services.map((s) => (
              <li key={s} className="flex gap-2 text-marron-fonce">
                <CircleCheck size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-or" />
                {s}
              </li>
            ))}
          </ul>
        </Bloc>

        <Bloc titre="Commande et livraison">
          <ul className="space-y-4">
            <li className="flex gap-3">
              <Clock size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-or" />
              <div>
                <p className="text-xs text-texte-secondaire">Délai moyen</p>
                <p className="text-marron-fonce">{profil.delaiMoyen}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Truck size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-or" />
              <div>
                <p className="text-xs text-texte-secondaire">Livraison</p>
                <p className="text-marron-fonce">{profil.livraison}</p>
              </div>
            </li>
            <li className="flex gap-3">
              <CreditCard size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-or" />
              <div>
                <p className="mb-1.5 text-xs text-texte-secondaire">Paiement accepté</p>
                <Chips items={profil.paiements} />
              </div>
            </li>
          </ul>
        </Bloc>
      </div>

      <aside className="space-y-6">
        <Bloc titre="Horaires">
          <dl>
            {profil.horaires.map((h) => (
              <Fait key={h.jours} label={h.jours}>
                {h.heures}
              </Fait>
            ))}
          </dl>
        </Bloc>

        <Bloc titre="En chiffres">
          <dl>
            <Fait label="Réalisations">{profil.stats.realisations}</Fait>
            <Fait label="Avis clients">
              <span className="inline-flex items-center gap-2">
                <Etoiles note={profil.stats.note} />
                {profil.stats.note.toString().replace(".", ",")} ({profil.stats.avis})
              </span>
            </Fait>
            <Fait label="Expérience">{profil.stats.annees} ans</Fait>
            <Fait label="Sur Inkora depuis">{formaterMoisAnnee(profil.membreDepuis)}</Fait>
          </dl>
        </Bloc>

        {adresse && (
          <Bloc titre="Où nous trouver">
            <p className="flex gap-2 text-marron-fonce">
              <MapPin size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-or" />
              {adresse}
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adresse)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-marron underline-offset-2 hover:underline"
            >
              Voir sur la carte
              <span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>
            </a>
          </Bloc>
        )}
      </aside>
    </div>
  );
}

export default function StationerySections({
  profil,
  onglet,
  params,
}: {
  profil: ProfilPapeterie;
  onglet: string;
  params: ParamsProfil;
}) {
  if (onglet === "infos") return <InfosPapeterie profil={profil} />;

  if (onglet === "contact") {
    const reference = profil.realisations.find((r) => r.id === params.ref);
    return (
      <ContactSection
        destinataire={profil.nom}
        contact={profil.contact}
        siteWeb={profil.siteWeb}
        sujets={sujets}
        objet={params.objet}
        messageInitial={
          reference ? `Bonjour, je souhaite un devis similaire à « ${reference.titre} ».` : undefined
        }
      />
    );
  }

  // Réalisations (onglet par défaut), filtrables par catégorie
  const categories = [...new Set(profil.realisations.map((r) => r.categorie))];
  const affichees = params.categorie
    ? profil.realisations.filter((r) => r.categorie === params.categorie)
    : profil.realisations;

  return (
    <div className="space-y-5">
      <p className="rounded-xl bg-creme p-3 text-sm text-texte-secondaire">
        Les prix indiqués sont des exemples de réalisations passées. Demandez un devis pour
        connaître le prix exact de votre projet.
      </p>
      <FiltreChips
        etiquette="catégorie"
        param="categorie"
        onglet="realisations"
        options={categories}
        actuel={params.categorie}
      />
      {affichees.length === 0 ? (
        <Vide icone={Printer} texte="Aucune réalisation dans cette catégorie." />
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {affichees.map((r) => (
            <li key={r.id}>
              <CarteRealisation r={r} papeterie={profil.nom} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}