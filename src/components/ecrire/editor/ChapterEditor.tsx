"use client";

import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FontFamily, TextStyle } from "@tiptap/extension-text-style";
import { Highlight } from "@tiptap/extension-highlight";
import { TextAlign } from "@tiptap/extension-text-align";
import { Image as ImageExtension } from "@tiptap/extension-image";
import { CharacterCount } from "@tiptap/extension-character-count";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Check, Cloud } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import EditorToolbar from "./EditorToolbar";
import ObjectifQuotidien from "./ObjectifQuotidien";
import PanneauAffichage, {
  PREFERENCES_PAR_DEFAUT,
  type Preferences,
} from "./PanneauAffichage";
import { preparerImage } from "@/lib/ecriture/images";
import type { Chapitre, StatutChapitre } from "@/lib/ecriture/types";
import {
  dateLocale,
  formaterDateHeure,
  formaterNombre,
  formaterTempsLecture,
  heureLocale,
  versChampDateHeure,
} from "@/lib/ecriture/utils";
import { useLocalStorageState } from "@/lib/use-local-storage-state";

const MIN_MOTS_PUBLICATION = 50;
const DELAI_SAUVEGARDE = 1000; // millisecondes après la dernière frappe

type ObjectifEtat = { date: string; ecrits: number; objectif: number };

type Message = { type: "ok" | "erreur"; texte: string };

type ChapterEditorProps = {
  chapitre: Chapitre;
  langue: string;
  onChange: (modifs: Partial<Pick<Chapitre, "titre" | "html" | "mots">>) => void;
  onStatut: (statut: StatutChapitre, publieLe?: string) => void;
};

function libelleStatut(c: Chapitre) {
  if (c.statut === "publie" && c.publieLe) return `Publié le ${formaterDateHeure(c.publieLe)}`;
  if (c.statut === "programme" && c.publieLe)
    return `Programmé pour le ${formaterDateHeure(c.publieLe)}`;
  return "Brouillon";
}

export default function ChapterEditor({
  chapitre,
  langue,
  onChange,
  onStatut,
}: ChapterEditorProps) {
  const [titre, setTitre] = useState(chapitre.titre);
  const [modeFocus, setModeFocus] = useState(false);
  const [affichageOuvert, setAffichageOuvert] = useState(false);
  const [statutSauvegarde, setStatutSauvegarde] = useState<"propre" | "modifie" | "enregistre">(
    "propre",
  );
  const [heureSauvegarde, setHeureSauvegarde] = useState("");
  const [erreurImage, setErreurImage] = useState("");
  const [programmer, setProgrammer] = useState(false);
  const [dateProgrammation, setDateProgrammation] = useState("");
  const [message, setMessage] = useState<Message | null>(null);

  const [prefs, setPrefs] = useLocalStorageState<Preferences>(
    "inkora:ecriture:affichage",
    PREFERENCES_PAR_DEFAUT,
  );
  const [objectifEtat, setObjectifEtat] = useLocalStorageState<ObjectifEtat>(
    "inkora:ecriture:objectif",
    { date: "", ecrits: 0, objectif: 500 },
  );

  // --- Références : des valeurs « toujours à jour » lisibles depuis les fonctions ci-dessous
  const titreRef = useRef(chapitre.titre);
  const motsRef = useRef(0);
  const minuterie = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onChangeRef = useRef(onChange);
  const editorRef = useRef<ReturnType<typeof useEditor>>(null);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // --- Sauvegarde automatique
  const sauvegarder = useCallback(() => {
    const ed = editorRef.current;
    if (!ed || ed.isDestroyed) return;
    minuterie.current = null;
    onChangeRef.current({
      titre: titreRef.current,
      html: ed.getHTML(),
      mots: ed.storage.characterCount.words(),
    });
    setHeureSauvegarde(heureLocale());
    setStatutSauvegarde("enregistre");
  }, []);

  const planifierSauvegarde = useCallback(() => {
    setStatutSauvegarde("modifie");
    if (minuterie.current) clearTimeout(minuterie.current);
    minuterie.current = setTimeout(sauvegarder, DELAI_SAUVEGARDE);
  }, [sauvegarder]);

  const enregistrerMaintenant = useCallback(() => {
    if (minuterie.current) clearTimeout(minuterie.current);
    sauvegarder();
  }, [sauvegarder]);

  // --- Objectif quotidien : on compte les mots ajoutés aujourd'hui
  const ajouterMots = useCallback(
    (n: number) => {
      setObjectifEtat((e) => {
        const jour = dateLocale();
        return e.date === jour
          ? { ...e, ecrits: e.ecrits + n }
          : { ...e, date: jour, ecrits: n };
      });
    },
    [setObjectifEtat],
  );

  // --- L'éditeur
  const editor = useEditor({
    immediatelyRender: false, // indispensable avec Next.js (évite les erreurs d'hydratation)
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] }, link: false }),
      TextStyle,
      FontFamily,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      // allowBase64 : nécessaire tant que les images sont stockées dans le texte
      ImageExtension.configure({ allowBase64: true }),
      Placeholder.configure({ placeholder: "Commencez à écrire votre histoire…" }),
      CharacterCount,
    ],
    content: chapitre.html,
    editorProps: {
      attributes: {
        role: "textbox",
        "aria-multiline": "true",
        "aria-label": "Texte du chapitre",
      },
    },
    onCreate({ editor }) {
      motsRef.current = editor.storage.characterCount.words();
    },
    onUpdate({ editor }) {
      const mots: number = editor.storage.characterCount.words();
      const ajoutes = mots - motsRef.current;
      motsRef.current = mots;
      if (ajoutes > 0) ajouterMots(ajoutes);
      planifierSauvegarde();
    },
  });

  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  // Compteur de mots, mis à jour à chaque frappe (0 tant que l'éditeur n'est pas prêt)
  const motsAffiches =
    useEditorState({
      editor,
      selector: ({ editor }) => (editor ? (editor.storage.characterCount.words() as number) : 0),
    }) ?? 0;

  // --- Sauvegarde de secours : quand on change de chapitre ou qu'on quitte l'onglet
  useEffect(() => {
    function surVisibilite() {
      if (document.visibilityState === "hidden" && minuterie.current) enregistrerMaintenant();
    }
    document.addEventListener("visibilitychange", surVisibilite);
    return () => {
      document.removeEventListener("visibilitychange", surVisibilite);
      if (minuterie.current) {
        try {
          enregistrerMaintenant();
        } catch {
          // l'éditeur est déjà détruit : rien de plus à faire
        }
      }
    };
  }, [enregistrerMaintenant]);

  // --- Mode focus : Échap pour sortir, et on bloque le défilement de la page derrière
  useEffect(() => {
    if (!modeFocus) return;
    function surTouche(e: KeyboardEvent) {
      if (e.key === "Escape") setModeFocus(false);
    }
    document.addEventListener("keydown", surTouche);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", surTouche);
      document.body.style.overflow = "";
    };
  }, [modeFocus]);

  const fermerAffichage = useCallback(() => setAffichageOuvert(false), []);

  // --- Actions
  async function insererImage(fichier: File) {
    if (!editor) return;
    try {
      const { src, alt } = await preparerImage(fichier);
      editor.chain().focus().setImage({ src, alt }).run();
      setErreurImage("");
    } catch (e) {
      setErreurImage(e instanceof Error ? e.message : "Impossible d’insérer cette image.");
    }
  }

  function changerTitre(valeur: string) {
    setTitre(valeur);
    titreRef.current = valeur;
    planifierSauvegarde();
  }

  function mettreEnBrouillon() {
    enregistrerMaintenant();
    onStatut("brouillon");
    setProgrammer(false);
    setMessage({ type: "ok", texte: "Chapitre enregistré comme brouillon." });
  }

  function publier() {
    const mots = editor ? (editor.storage.characterCount.words() as number) : 0;
    if (titreRef.current.trim().length < 2) {
      setMessage({ type: "erreur", texte: "Donnez un titre à votre chapitre avant de le publier." });
      return;
    }
    if (mots < MIN_MOTS_PUBLICATION) {
      setMessage({
        type: "erreur",
        texte: `Un chapitre doit contenir au moins ${MIN_MOTS_PUBLICATION} mots pour être publié (il en contient ${mots}).`,
      });
      return;
    }
    enregistrerMaintenant();
    onStatut("publie", new Date().toISOString());
    setProgrammer(false);
    setMessage({
      type: "ok",
      texte: "Chapitre publié (simulation : la vraie publication viendra avec la base de données).",
    });
  }

  function confirmerProgrammation() {
    const date = new Date(dateProgrammation);
    if (!dateProgrammation || Number.isNaN(date.getTime()) || date.getTime() <= Date.now()) {
      setMessage({ type: "erreur", texte: "Choisissez une date et une heure dans le futur." });
      return;
    }
    if (titreRef.current.trim().length < 2) {
      setMessage({ type: "erreur", texte: "Donnez un titre à votre chapitre avant de le programmer." });
      return;
    }
    enregistrerMaintenant();
    onStatut("programme", date.toISOString());
    setProgrammer(false);
    setMessage({
      type: "ok",
      texte: `Chapitre programmé pour le ${formaterDateHeure(date.toISOString())} (simulation).`,
    });
  }

  // --- Valeurs d'affichage
  const jour = dateLocale();
  const ecritsAujourdhui = objectifEtat.date === jour ? objectifEtat.ecrits : 0;

  const texteSauvegarde =
    statutSauvegarde === "modifie"
      ? "Modifications en cours…"
      : statutSauvegarde === "enregistre"
        ? `Enregistré à ${heureSauvegarde}`
        : "";

  return (
    <div className={modeFocus ? "fixed inset-0 z-[60] overflow-y-auto bg-ivoire px-4 pb-16" : ""}>
      <div className={modeFocus ? "mx-auto max-w-4xl pt-4" : ""}>
        <Input
          label="Titre du chapitre"
          placeholder="Ex. Chapitre 1 — Un nouveau départ"
          maxLength={120}
          value={titre}
          onChange={(e) => changerTitre(e.target.value)}
        />

        {/* Barre d'outils (collée en haut quand on fait défiler) */}
        <div className={`sticky z-30 mt-4 ${modeFocus ? "top-2" : "top-16"}`}>
          <div className="rounded-xl border border-bordure bg-white/95 shadow-sm backdrop-blur">
            {editor && (
              <EditorToolbar
                editor={editor}
                onImage={insererImage}
                modeFocus={modeFocus}
                onToggleFocus={() => setModeFocus((v) => !v)}
                affichageOuvert={affichageOuvert}
                onToggleAffichage={() => setAffichageOuvert((v) => !v)}
              />
            )}
          </div>

          {affichageOuvert && (
            <PanneauAffichage prefs={prefs} onChange={setPrefs} onFermer={fermerAffichage} />
          )}
        </div>

        {erreurImage && (
          <p role="alert" className="mt-2 text-sm text-erreur">
            {erreurImage}
          </p>
        )}

        {/* La « page » */}
        <div
          className="inkora-editor mt-4 rounded-2xl border border-bordure bg-white px-5 py-8 shadow-sm sm:px-12 sm:py-12"
          style={
            {
              "--ed-taille": `${prefs.taille}px`,
              "--ed-interligne": String(prefs.interligne),
            } as CSSProperties
          }
          lang={langue === "autre" ? undefined : langue}
          spellCheck={prefs.correcteur}
        >
          {editor ? (
            <EditorContent editor={editor} />
          ) : (
            <div aria-busy="true" className="min-h-[60vh] animate-pulse rounded-xl bg-creme/50" />
          )}
        </div>

        {/* Compteur et état de sauvegarde */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-texte-secondaire">
          <p>
            {formaterNombre(motsAffiches)} mots · {formaterTempsLecture(motsAffiches)}
          </p>
          <p className="flex items-center gap-1.5">
            {statutSauvegarde === "enregistre" ? (
              <Check size={14} aria-hidden="true" className="text-succes" />
            ) : (
              <Cloud size={14} aria-hidden="true" />
            )}
            {texteSauvegarde || "Sauvegarde automatique activée"}
          </p>
        </div>

        {!modeFocus && (
          <>
            <ObjectifQuotidien
              ecrits={ecritsAujourdhui}
              objectif={objectifEtat.objectif}
              onObjectif={(valeur) => setObjectifEtat((e) => ({ ...e, objectif: valeur }))}
            />

            {/* Publication */}
            <section
              aria-labelledby="titre-publication"
              className="mt-6 rounded-2xl border border-bordure bg-white p-5 shadow-sm sm:p-6"
            >
              <h2 id="titre-publication" className="font-serif text-lg text-marron">
                Publication
              </h2>
              <p className="mt-1 text-sm text-texte-secondaire">
                Statut : <span className="font-medium text-marron-fonce">{libelleStatut(chapitre)}</span>
              </p>

              <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button type="button" variante="secondaire" onClick={mettreEnBrouillon}>
                  Brouillon
                </Button>
                <Button
                  type="button"
                  variante="dore"
                  aria-expanded={programmer}
                  onClick={() => setProgrammer((v) => !v)}
                >
                  Programmer
                </Button>
                <Button type="button" onClick={publier}>
                  Publier le chapitre
                </Button>
              </div>

              {programmer && (
                <div className="mt-4 flex flex-wrap items-end gap-3 rounded-xl bg-creme/60 p-4">
                  <div className="min-w-[14rem] flex-1">
                    <Input
                      label="Date et heure de publication"
                      type="datetime-local"
                      min={versChampDateHeure(new Date())}
                      value={dateProgrammation}
                      onChange={(e) => setDateProgrammation(e.target.value)}
                    />
                  </div>
                  <Button type="button" onClick={confirmerProgrammation}>
                    Confirmer
                  </Button>
                </div>
              )}

              {message && (
                <p
                  role={message.type === "erreur" ? "alert" : "status"}
                  className={`mt-4 rounded-xl p-3 text-sm ${
                    message.type === "erreur" ? "bg-erreur/10 text-erreur" : "bg-creme text-marron"
                  }`}
                >
                  {message.texte}
                </p>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}