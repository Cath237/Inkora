import { useEffect, useRef, useState } from "react";

// Comme useState, mais la valeur (un objet) est aussi gardée dans le navigateur.
// La lecture se fait après l'affichage : « charge » passe à true quand elle est terminée.
export function useLocalStorageState<T extends object>(cle: string, valeurInitiale: T) {
  const initiale = useRef(valeurInitiale);
  const [valeur, setValeur] = useState<T>(valeurInitiale);
  const [charge, setCharge] = useState(false);

  useEffect(() => {
    try {
      const brut = window.localStorage.getItem(cle);
      if (brut !== null) {
        const lu: unknown = JSON.parse(brut);
        if (typeof lu === "object" && lu !== null && !Array.isArray(lu)) {
          setValeur({ ...initiale.current, ...lu });
        }
      }
    } catch {
      // Stockage indisponible ou contenu abîmé : on garde les valeurs par défaut
    }
    setCharge(true);
  }, [cle]);

  useEffect(() => {
    if (!charge) return;
    try {
      window.localStorage.setItem(cle, JSON.stringify(valeur));
    } catch {
      // Stockage plein ou bloqué : l'écriture continue de fonctionner, sans sauvegarde locale
    }
  }, [cle, valeur, charge]);

  return [valeur, setValeur, charge] as const;
}