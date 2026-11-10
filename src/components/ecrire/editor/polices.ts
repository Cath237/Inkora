// Chaque import ci-dessous charge une police auto-hébergée (aucune requête vers Google).
// Le navigateur ne télécharge le fichier d'une police que si elle est réellement utilisée.
import "@fontsource-variable/lora";
import "@fontsource-variable/lora/wght-italic.css";
import "@fontsource-variable/merriweather";
import "@fontsource-variable/merriweather/wght-italic.css";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "@fontsource-variable/inter";
import "@fontsource-variable/nunito";
import "@fontsource-variable/nunito/wght-italic.css";
import "@fontsource-variable/caveat";

export const POLICES = [
  { valeur: "Lora Variable, Georgia, serif", nom: "Lora — Classique" },
  { valeur: "Merriweather Variable, Georgia, serif", nom: "Merriweather — Confort" },
  { valeur: "Playfair Display Variable, Georgia, serif", nom: "Playfair — Élégante" },
  { valeur: "Inter Variable, system-ui, sans-serif", nom: "Inter — Moderne" },
  { valeur: "Nunito Variable, system-ui, sans-serif", nom: "Nunito — Arrondie" },
  { valeur: "Caveat Variable, cursive", nom: "Caveat — Manuscrite" },
] as const;

export const POLICE_PAR_DEFAUT: string = POLICES[0].valeur;