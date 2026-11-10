const TYPES_ACCEPTES = ["image/jpeg", "image/png", "image/webp"];
const TAILLE_MAX = 10 * 1024 * 1024; // 10 Mo avant compression
const LARGEUR_MAX = 1200; // pixels

// Prépare une image pour le texte : on la réduit puis on la convertit en WebP.
// AUJOURD'HUI : l'image est stockée dans le texte (adresse « data: »).
// PLUS TARD : cette fonction enverra le fichier vers Cloudflare R2 et renverra son URL.
// Le reste de l'éditeur n'aura pas à changer.
export async function preparerImage(fichier: File): Promise<{ src: string; alt: string }> {
  if (!TYPES_ACCEPTES.includes(fichier.type)) {
    throw new Error("Format non accepté. Utilisez une image JPG, PNG ou WebP.");
  }
  if (fichier.size > TAILLE_MAX) {
    throw new Error("Image trop lourde (10 Mo maximum).");
  }

  const bitmap = await createImageBitmap(fichier);
  const ratio = Math.min(1, LARGEUR_MAX / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * ratio);
  canvas.height = Math.round(bitmap.height * ratio);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Impossible de traiter cette image.");
  }
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  return {
    src: canvas.toDataURL("image/webp", 0.82),
    alt: fichier.name.replace(/\.[^.]+$/, ""),
  };
}