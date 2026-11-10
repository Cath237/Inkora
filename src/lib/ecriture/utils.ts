const nombre = new Intl.NumberFormat("fr-FR");
export const formaterNombre = (n: number) => nombre.format(n);

// Environ 200 mots par minute pour une lecture tranquille
export function formaterTempsLecture(mots: number) {
  if (mots <= 0) return "0 min de lecture";
  return `${Math.max(1, Math.round(mots / 200))} min de lecture`;
}

// « 2026-11-08 » : sert à savoir si on est encore le même jour
export const dateLocale = (d: Date = new Date()) => d.toLocaleDateString("sv-SE");

export const heureLocale = (d: Date = new Date()) =>
  new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(d);

export const formaterDateHeure = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short" }).format(new Date(iso));

// Format attendu par <input type="datetime-local"> : 2026-11-09T10:00
export function versChampDateHeure(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}