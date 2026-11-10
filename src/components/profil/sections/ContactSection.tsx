import { ReactNode } from "react";
import { Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "../ContactForm";
import { Bloc } from "./blocs";
import type { ContactPro, SujetContact } from "@/lib/profils/types";

type ContactSectionProps = {
  destinataire: string;
  contact: ContactPro;
  siteWeb?: string;
  sujets: SujetContact[];
  objet?: string;
  messageInitial?: string;
};

function Ligne({ icone, label, children }: { icone: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 text-or">{icone}</span>
      <div className="min-w-0">
        <p className="text-xs text-texte-secondaire">{label}</p>
        <div className="break-words text-marron-fonce">{children}</div>
      </div>
    </li>
  );
}

const lien = "text-marron underline-offset-2 hover:underline";

export default function ContactSection({
  destinataire,
  contact,
  siteWeb,
  sujets,
  objet,
  messageInitial,
}: ContactSectionProps) {
  const telephone = contact.telephone.replace(/[^\d+]/g, "");
  const whatsapp = contact.whatsapp?.replace(/\D/g, "");

  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
      <Bloc titre="Coordonnées">
        <ul className="space-y-4">
          <Ligne icone={<Phone size={18} aria-hidden="true" />} label="Téléphone">
            <a href={`tel:${telephone}`} className={lien}>
              {contact.telephone}
            </a>
          </Ligne>

          {whatsapp && (
            <Ligne icone={<MessageCircle size={18} aria-hidden="true" />} label="WhatsApp">
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className={lien}>
                Écrire sur WhatsApp
                <span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>
              </a>
            </Ligne>
          )}

          <Ligne icone={<Mail size={18} aria-hidden="true" />} label="Email">
            <a href={`mailto:${contact.email}`} className={lien}>
              {contact.email}
            </a>
          </Ligne>

          {contact.adresse && (
            <Ligne icone={<MapPin size={18} aria-hidden="true" />} label="Adresse">
              <p>{contact.adresse}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.adresse)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${lien} text-sm`}
              >
                Voir sur la carte
                <span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>
              </a>
            </Ligne>
          )}

          {siteWeb && (
            <Ligne icone={<Globe size={18} aria-hidden="true" />} label="Site web">
              <a href={siteWeb} target="_blank" rel="noopener noreferrer" className={lien}>
                {siteWeb.replace(/^https?:\/\//, "")}
                <span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>
              </a>
            </Ligne>
          )}
        </ul>
      </Bloc>

      <Bloc titre={`Écrire à ${destinataire}`}>
        {/* key : si l'adresse change (?objet=devis), le formulaire repart avec les bonnes valeurs */}
        <ContactForm
          key={`${objet ?? ""}-${messageInitial ?? ""}`}
          destinataire={destinataire}
          sujets={sujets}
          sujetInitial={objet}
          messageInitial={messageInitial}
        />
      </Bloc>
    </div>
  );
}