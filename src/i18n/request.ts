import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { COOKIE_LOCALE, defaultLocale, estLocale } from "./config";

export default getRequestConfig(async () => {
  const store = await cookies();
  const valeur = store.get(COOKIE_LOCALE)?.value;
  const locale = estLocale(valeur) ? valeur : defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});