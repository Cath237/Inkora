"use client";

import { ReactNode, useRef } from "react";
import { useEditorState, type Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Highlighter,
  ImagePlus,
  Italic,
  List,
  ListOrdered,
  Maximize2,
  Minimize2,
  Minus,
  Quote,
  Redo2,
  RemoveFormatting,
  Settings2,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";
import { POLICES, POLICE_PAR_DEFAUT } from "./polices";

type OutilProps = {
  label: string;
  actif?: boolean;
  desactive?: boolean;
  onClick: () => void;
  children: ReactNode;
};

function Outil({ label, actif, desactive, onClick, children }: OutilProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={actif}
      disabled={desactive}
      // Empêche le bouton de « voler » le curseur à l'éditeur
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-or disabled:cursor-not-allowed disabled:opacity-40 ${
        actif ? "bg-marron text-white" : "text-marron hover:bg-creme"
      }`}
    >
      {children}
    </button>
  );
}

function Separateur() {
  return <span aria-hidden="true" className="mx-1 h-6 w-px shrink-0 bg-bordure" />;
}

const styleSelect =
  "h-9 shrink-0 rounded-lg border border-bordure bg-white px-2 text-sm text-marron-fonce outline-none focus:border-or focus:ring-2 focus:ring-or/30";

const alignements = [
  { valeur: "left", label: "Aligner à gauche", icone: AlignLeft },
  { valeur: "center", label: "Centrer", icone: AlignCenter },
  { valeur: "right", label: "Aligner à droite", icone: AlignRight },
  { valeur: "justify", label: "Justifier", icone: AlignJustify },
] as const;

type EditorToolbarProps = {
  editor: Editor;
  onImage: (fichier: File) => void;
  modeFocus: boolean;
  onToggleFocus: () => void;
  affichageOuvert: boolean;
  onToggleAffichage: () => void;
};

export default function EditorToolbar({
  editor,
  onImage,
  modeFocus,
  onToggleFocus,
  affichageOuvert,
  onToggleAffichage,
}: EditorToolbarProps) {
  const champImage = useRef<HTMLInputElement>(null);

  // La barre d'outils se met à jour à chaque déplacement du curseur ou changement de style
  const etat = useEditorState({
    editor,
    selector: ({ editor }) => ({
      peutAnnuler: editor.can().undo(),
      peutRetablir: editor.can().redo(),
      gras: editor.isActive("bold"),
      italique: editor.isActive("italic"),
      souligne: editor.isActive("underline"),
      barre: editor.isActive("strike"),
      surligne: editor.isActive("highlight"),
      liste: editor.isActive("bulletList"),
      listeNumerotee: editor.isActive("orderedList"),
      citation: editor.isActive("blockquote"),
      alignement:
        alignements.find((a) => editor.isActive({ textAlign: a.valeur }))?.valeur ?? "left",
      bloc: editor.isActive("heading", { level: 1 })
        ? "h1"
        : editor.isActive("heading", { level: 2 })
          ? "h2"
          : editor.isActive("heading", { level: 3 })
            ? "h3"
            : "p",
      police: (editor.getAttributes("textStyle").fontFamily as string | undefined) ?? "",
    }),
  });

  function changerPolice(valeur: string) {
    const { empty, from, to } = editor.state.selection;
    const chain = editor.chain().focus();

    // Sans texte sélectionné, la police s'applique à tout le chapitre
    if (empty) chain.selectAll();

    if (valeur === POLICE_PAR_DEFAUT) chain.unsetFontFamily();
    else chain.setFontFamily(valeur);

    if (empty) chain.setTextSelection({ from, to });
    chain.run();
  }

  function changerBloc(valeur: string) {
    const chain = editor.chain().focus();
    if (valeur === "p") chain.setParagraph().run();
    else chain.setHeading({ level: Number(valeur.slice(1)) as 1 | 2 | 3 }).run();
  }

  return (
    <div
      role="toolbar"
      aria-label="Mise en forme du texte"
      className="flex items-center gap-1 overflow-x-auto p-2 [scrollbar-width:none] md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden"
    >
      <Outil
        label="Annuler"
        desactive={!etat.peutAnnuler}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 size={18} aria-hidden="true" />
      </Outil>
      <Outil
        label="Rétablir"
        desactive={!etat.peutRetablir}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 size={18} aria-hidden="true" />
      </Outil>

      <Separateur />

      <select
        aria-label="Police (sans sélection : tout le chapitre)"
        title="Police (sans sélection : tout le chapitre)"
        value={etat.police || POLICE_PAR_DEFAUT}
        onChange={(e) => changerPolice(e.target.value)}
        className={`${styleSelect} w-44`}
      >
        {POLICES.map((p) => (
          <option key={p.valeur} value={p.valeur} style={{ fontFamily: p.valeur }}>
            {p.nom}
          </option>
        ))}
      </select>

      <select
        aria-label="Style du paragraphe"
        title="Style du paragraphe"
        value={etat.bloc}
        onChange={(e) => changerBloc(e.target.value)}
        className={`${styleSelect} w-32`}
      >
        <option value="p">Paragraphe</option>
        <option value="h1">Titre 1</option>
        <option value="h2">Titre 2</option>
        <option value="h3">Titre 3</option>
      </select>

      <Separateur />

      <Outil
        label="Gras"
        actif={etat.gras}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={18} aria-hidden="true" />
      </Outil>
      <Outil
        label="Italique"
        actif={etat.italique}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={18} aria-hidden="true" />
      </Outil>
      <Outil
        label="Souligné"
        actif={etat.souligne}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline size={18} aria-hidden="true" />
      </Outil>
      <Outil
        label="Barré"
        actif={etat.barre}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough size={18} aria-hidden="true" />
      </Outil>
      <Outil
        label="Surligner"
        actif={etat.surligne}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        <Highlighter size={18} aria-hidden="true" />
      </Outil>

      <Separateur />

      {alignements.map(({ valeur, label, icone: Icone }) => (
        <Outil
          key={valeur}
          label={label}
          actif={etat.alignement === valeur}
          onClick={() => editor.chain().focus().setTextAlign(valeur).run()}
        >
          <Icone size={18} aria-hidden="true" />
        </Outil>
      ))}

      <Separateur />

      <Outil
        label="Liste à puces"
        actif={etat.liste}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={18} aria-hidden="true" />
      </Outil>
      <Outil
        label="Liste numérotée"
        actif={etat.listeNumerotee}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={18} aria-hidden="true" />
      </Outil>
      <Outil
        label="Citation"
        actif={etat.citation}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote size={18} aria-hidden="true" />
      </Outil>
      <Outil
        label="Séparateur de scène"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus size={18} aria-hidden="true" />
      </Outil>

      <Separateur />

      <Outil label="Insérer une image" onClick={() => champImage.current?.click()}>
        <ImagePlus size={18} aria-hidden="true" />
      </Outil>
      <input
        ref={champImage}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        onChange={(e) => {
          Array.from(e.target.files ?? []).forEach(onImage);
          e.target.value = ""; // permet de rechoisir le même fichier ensuite
        }}
      />

      <Outil
        label="Effacer la mise en forme"
        onClick={() =>
          editor.chain().focus().unsetAllMarks().clearNodes().unsetTextAlign().run()
        }
      >
        <RemoveFormatting size={18} aria-hidden="true" />
      </Outil>

      {/* Réglages à droite */}
      <div className="ml-auto flex items-center gap-1 pl-2">
        <button
          type="button"
          onClick={onToggleAffichage}
          aria-expanded={affichageOuvert}
          aria-controls="panneau-affichage"
          className={`flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-or ${
            affichageOuvert ? "bg-creme text-marron" : "text-marron hover:bg-creme"
          }`}
        >
          <Settings2 size={16} aria-hidden="true" />
          Affichage
        </button>

        <button
          type="button"
          onClick={onToggleFocus}
          aria-pressed={modeFocus}
          className={`flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-or ${
            modeFocus ? "bg-marron text-white" : "text-marron hover:bg-creme"
          }`}
        >
          {modeFocus ? (
            <Minimize2 size={16} aria-hidden="true" />
          ) : (
            <Maximize2 size={16} aria-hidden="true" />
          )}
          {modeFocus ? "Quitter le focus" : "Mode focus"}
        </button>
      </div>
    </div>
  );
}