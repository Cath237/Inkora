const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or";

// Des styles de boutons pour les liens et les boutons de la page de profil
export const bouton = {
  primaire: `${base} bg-gradient-to-r from-marron-chaud to-marron-fonce text-white shadow-md hover:opacity-90`,
  secondaire: `${base} border-2 border-marron text-marron hover:bg-marron hover:text-white`,
  dore: `${base} bg-gradient-to-r from-or-clair to-or text-marron-fonce hover:opacity-90`,
};