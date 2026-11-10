import type { Prix } from "./types";

export function formaterPrix({ montant, devise }: Prix) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: devise,
    maximumFractionDigits: 0,
  }).format(montant);
}

const compact = new Intl.NumberFormat("fr-FR", { notation: "compact", maximumFractionDigits: 1 });
export const formaterCompact = (n: number) => compact.format(n);

const moisAnnee = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" });
export const formaterMoisAnnee = (iso: string) => moisAnnee.format(new Date(iso));

const dateLongue = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" });
export const formaterDateLongue = (iso: string) => dateLongue.format(new Date(iso));

// « il y a 3 jours », « il y a 2 mois »…
const relatif = new Intl.RelativeTimeFormat("fr", { numeric: "auto" });
export function formaterRelatif(iso: string) {
  const jours = Math.round((new Date(iso).getTime() - Date.now()) / 86_400_000);
  const absolu = Math.abs(jours);
  if (absolu < 30) return relatif.format(jours, "day");
  if (absolu < 365) return relatif.format(Math.round(jours / 30), "month");
  return relatif.format(Math.round(jours / 365), "year");
}