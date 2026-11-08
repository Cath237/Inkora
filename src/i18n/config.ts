export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const COOKIE_LOCALE = "NEXT_LOCALE";

// Vérifie qu'une valeur est bien une de nos langues
export function estLocale(valeur: string | undefined): valeur is Locale {
  return locales.some((l) => l === valeur);
}